import React, { useRef, useEffect, useState, useCallback } from 'react'
import styled from 'styled-components'
import { theme } from '../styles/tokens'

const Canvas = styled.canvas`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: ${theme.zIndex.background};
  pointer-events: none;
  filter: blur(60px);
`

const OrganicNoiseBackground = () => {
  const canvasRef = useRef(null)
  const animationRef = useRef(null)
  const mouseRef = useRef({ x: 0.5, y: 0.5, targetX: 0.5, targetY: 0.5 })
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)
  const timeRef = useRef(0)
  const lastFrameTime = useRef(0)

  // Check for reduced motion preference
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    setPrefersReducedMotion(mediaQuery.matches)

    const handler = (e) => setPrefersReducedMotion(e.matches)
    mediaQuery.addEventListener('change', handler)
    return () => mediaQuery.removeEventListener('change', handler)
  }, [])

  // No mouse tracking for OrganicNoiseBackground - just static background

  // Animation loop
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    const dpr = Math.min(window.devicePixelRatio || 1, 2)

    const resize = () => {
      const width = window.innerWidth
      const height = window.innerHeight

      canvas.width = width * dpr
      canvas.height = height * dpr
      canvas.style.width = `${width}px`
      canvas.style.height = `${height}px`

      ctx.scale(dpr, dpr)
    }

    resize()
    window.addEventListener('resize', resize)

    const draw = (timestamp) => {
      // Pause when tab is hidden
      if (document.hidden) {
        animationRef.current = requestAnimationFrame(draw)
        return
      }

      // ~60fps for smooth animation
      if (timestamp - lastFrameTime.current < 16) {
        animationRef.current = requestAnimationFrame(draw)
        return
      }
      lastFrameTime.current = timestamp

      const width = window.innerWidth
      const height = window.innerHeight

      // Time progression
      timeRef.current += prefersReducedMotion ? 0 : 1

      // No mouse following needed

      // Clear canvas
      ctx.fillStyle = theme.colors.background
      ctx.fillRect(0, 0, width, height)

// Static blue background with subtle animation (no mouse following)
      const time = timeRef.current * 0.001
      
      // Create subtle animated background gradient
      const gradientX = width * (0.5 + Math.sin(time * 0.3) * 0.2)
      const gradientY = height * (0.5 + Math.cos(time * 0.2) * 0.2)
      const mainRadius = Math.min(width, height) * 0.8

      // Subtle animated blue gradient background
      const mainGradient = ctx.createRadialGradient(
        gradientX, gradientY, 0,
        gradientX, gradientY, mainRadius
      )
      
      // Very subtle blue background
      mainGradient.addColorStop(0, 'rgba(31, 93, 255, 0.1)')
      mainGradient.addColorStop(0.5, 'rgba(45, 90, 135, 0.05)')
      mainGradient.addColorStop(1, 'rgba(10, 11, 14, 0)')

      ctx.fillStyle = mainGradient
      ctx.fillRect(0, 0, width, height)

      // Continue animation
      if (!prefersReducedMotion) {
        animationRef.current = requestAnimationFrame(draw)
      }
    }

    // Draw initial frame
    draw(0)

    if (!prefersReducedMotion) {
      animationRef.current = requestAnimationFrame(draw)
    }

    return () => {
      window.removeEventListener('resize', resize)
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [prefersReducedMotion])

  return <Canvas ref={canvasRef} aria-hidden="true" />
}

export default OrganicNoiseBackground
