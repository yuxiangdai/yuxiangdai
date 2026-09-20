import React, { useEffect, useRef } from 'react'
import styled from 'styled-components'

const ProgressTrack = styled.div`
  position: fixed;
  z-index: 100;
  inset: 0 0 auto;
  height: 4px;
  background: #c9c9c6;
  pointer-events: none;

  &::after {
    content: '';
    display: block;
    height: 100%;
    background: #11110f;
    transform: scaleX(var(--reading-progress, 0));
    transform-origin: left;
  }

  @media print {
    display: none;
  }
`

const ReadingProgress = ({ contentRef }) => {
  const progressRef = useRef(null)

  useEffect(() => {
    const content = contentRef.current
    const bar = progressRef.current
    if (!content || !bar) return

    let frame = null
    const updateProgress = () => {
      frame = null
      const { top, height } = content.getBoundingClientRect()
      // Start at the article header; finish when the article's end is visible.
      const distance = height - window.innerHeight
      const progress =
        distance > 0
          ? Math.min(1, Math.max(0, -top / distance))
          : top + height <= window.innerHeight
            ? 1
            : 0

      bar.style.setProperty('--reading-progress', progress)
      bar.setAttribute('aria-valuenow', Math.round(progress * 100))
    }

    const scheduleUpdate = () => {
      if (frame === null) frame = window.requestAnimationFrame(updateProgress)
    }

    const observer = new ResizeObserver(scheduleUpdate)
    observer.observe(content)
    window.addEventListener('scroll', scheduleUpdate, { passive: true })
    window.addEventListener('resize', scheduleUpdate)
    updateProgress()

    return () => {
      observer.disconnect()
      window.removeEventListener('scroll', scheduleUpdate)
      window.removeEventListener('resize', scheduleUpdate)
      if (frame !== null) window.cancelAnimationFrame(frame)
    }
  }, [contentRef])

  return (
    <ProgressTrack
      ref={progressRef}
      role="progressbar"
      aria-label="Article reading progress"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={0}
    />
  )
}

export default ReadingProgress
