import React, { useEffect, useRef, useState } from 'react'
import styled, { keyframes } from 'styled-components'

const scatter = keyframes`
  0% { opacity: 0; transform: translate(0, 0); }
  15% { opacity: 0.95; }
  65% { opacity: 0.8; }
  100% { opacity: 0; transform: translate(var(--drift-x), var(--drift-y)); }
`

const Letter = styled.span`
  position: relative;
  display: inline-block;

  .ink {
    display: inline-block;
    /* Give the mask room for serifs and descenders outside the tight line height. */
    padding: 0.2em;
    margin: -0.2em;
    mask-size: 100% 100%;
    mask-repeat: no-repeat;
  }

  .particles {
    position: absolute;
    max-width: none;
    overflow: visible;
    pointer-events: none;
    fill: currentColor;
  }

  circle {
    opacity: 0.85;
    animation: ${scatter} var(--duration) linear var(--delay) infinite;
  }

  @media (prefers-reduced-motion: reduce) {
    circle {
      animation: none;
    }
  }
`

// Limit the effect to a few edges, leaving the letterforms solid and readable.
const edges = {
  first: (x, y) => (x < 0.3 && y < 0.24) || (x > 0.25 && x < 0.62 && y > 0.78),
  descender: (x, y) => x > 0.76 && y > 0.5,
  capital: (x, y) => x > 0.76 && y < 0.47,
  last: (x, y) => (x > 0.6 && y > 0.78) || y < 0.19,
}

const makeParticles = (element, edge) => {
  const style = getComputedStyle(element)
  const fontSize = parseFloat(style.fontSize)
  const width = Math.ceil(element.getBoundingClientRect().width)
  const height = Math.ceil(element.getBoundingClientRect().height)
  const inset = parseFloat(style.paddingLeft)
  const padding = Math.ceil(fontSize * 0.2)
  const canvas = document.createElement('canvas')
  canvas.width = width + padding * 2
  canvas.height = height + padding * 2
  const context = canvas.getContext('2d', { willReadFrequently: true })
  if (!context) return null

  context.font = `${style.fontWeight} ${style.fontSize} ${style.fontFamily}`
  const metrics = context.measureText(element.textContent)
  const ascent = metrics.fontBoundingBoxAscent
  const descent = metrics.fontBoundingBoxDescent
  const baseline = (height - ascent - descent) / 2 + ascent
  context.fillText(element.textContent, padding + inset, padding + baseline)
  const { data } = context.getImageData(0, 0, canvas.width, canvas.height)
  const alpha = (x, y) =>
    x < -padding ||
    y < -padding ||
    x >= width + padding ||
    y >= height + padding
      ? 0
      : data[
          ((Math.floor(y) + padding) * canvas.width + Math.floor(x) + padding) *
            4 +
            3
        ]
  const left = inset - metrics.actualBoundingBoxLeft
  const top = baseline - metrics.actualBoundingBoxAscent
  const inkWidth =
    metrics.actualBoundingBoxLeft + metrics.actualBoundingBoxRight
  const inkHeight =
    metrics.actualBoundingBoxAscent + metrics.actualBoundingBoxDescent
  const step = Math.max(1, Math.round(fontSize / 100))
  const candidates = []

  for (let y = -padding; y < height + padding; y += step) {
    for (let x = -padding; x < width + padding; x += step) {
      if (
        !edges[edge]((x - left) / inkWidth, (y - top) / inkHeight) ||
        alpha(x, y) < 180
      )
        continue
      const neighbors = [
        [-step, 0],
        [step, 0],
        [0, -step],
        [0, step],
      ]
      const outside = neighbors.find(([dx, dy]) => alpha(x + dx, y + dy) < 80)
      if (outside)
        candidates.push({ x, y, nx: outside[0] / step, ny: outside[1] / step })
    }
  }

  // A fixed seed keeps the dots stable across renders and avoids flickering noise.
  let seed = element.textContent.charCodeAt(0) * 127
  const random = () => {
    seed = (seed * 16807) % 2147483647
    return (seed - 1) / 2147483646
  }
  const points = []
  const count = Math.min(fontSize < 100 ? 22 : 48, candidates.length)
  for (let i = 0; i < count; i++) {
    const [point] = candidates.splice(
      Math.floor(random() * candidates.length),
      1
    )
    const radius = Math.max(0.55, fontSize * (0.0035 + random() * 0.006))
    const spread = fontSize * (0.006 + random() * 0.04)
    const direction = edge === 'first' ? -1 : 1
    const driftX = direction * (0.045 + random() * 0.075) * fontSize
    const driftY = (point.ny * 0.04 + (random() - 0.5) * 0.1) * fontSize
    points.push({
      ...point,
      radius,
      cx: point.x + point.nx * spread,
      cy: point.y + point.ny * spread,
      driftX,
      driftY,
      duration: 3.5 + random() * 2,
      delay: -random() * 5.5,
    })
  }
  const holes = points
    .map(
      ({ x, y, radius }) =>
        `<circle cx="${x}" cy="${y}" r="${radius}" fill="black"/>`
    )
    .join('')
  const mask = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}"><rect width="100%" height="100%" fill="white"/>${holes}</svg>`
  return {
    width,
    height,
    padding,
    inset,
    points,
    mask: `url("data:image/svg+xml,${encodeURIComponent(mask)}")`,
  }
}

const GrainLetter = ({ children, edge }) => {
  const ink = useRef(null)
  const [field, setField] = useState(null)

  useEffect(() => {
    let disposed = false
    let frame
    const update = () => {
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(() => {
        if (!disposed && ink.current) setField(makeParticles(ink.current, edge))
      })
    }
    const observer = new ResizeObserver(update)
    document.fonts.ready.then(() => {
      if (!disposed) {
        observer.observe(ink.current)
        update()
      }
    })
    return () => {
      disposed = true
      cancelAnimationFrame(frame)
      observer.disconnect()
    }
  }, [edge])

  return (
    <Letter>
      <span
        ref={ink}
        className="ink"
        style={
          field
            ? {
                maskImage: field.mask,
                maskMode: 'luminance',
              }
            : undefined
        }
      >
        {children}
      </span>
      {field && (
        <svg
          className="particles"
          aria-hidden="true"
          focusable="false"
          width={field.width + field.padding * 2}
          height={field.height + field.padding * 2}
          viewBox={`${-field.padding} ${-field.padding} ${field.width + field.padding * 2} ${field.height + field.padding * 2}`}
          style={{
            left: -field.padding - field.inset,
            top: -field.padding - field.inset,
          }}
        >
          {field.points.map((point, index) => (
            <circle
              key={index}
              cx={point.cx}
              cy={point.cy}
              r={point.radius}
              style={{
                '--drift-x': `${point.driftX}px`,
                '--drift-y': `${point.driftY}px`,
                '--duration': `${point.duration}s`,
                '--delay': `${point.delay}s`,
              }}
            />
          ))}
        </svg>
      )}
    </Letter>
  )
}

const ScatteredName = () => (
  <span aria-hidden="true">
    <GrainLetter edge="first">Y</GrainLetter>uxian
    <GrainLetter edge="descender">g</GrainLetter>{' '}
    <GrainLetter edge="capital">D</GrainLetter>a
    <GrainLetter edge="last">i</GrainLetter>
  </span>
)

export default ScatteredName
