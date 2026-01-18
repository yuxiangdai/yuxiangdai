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
  filter: blur(100px);
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

  // Mouse tracking
  const handleMouseMove = useCallback((e) => {
    if (prefersReducedMotion) return
    mouseRef.current.targetX = e.clientX / window.innerWidth
    mouseRef.current.targetY = e.clientY / window.innerHeight
  }, [prefersReducedMotion])

  useEffect(() => {
    if (prefersReducedMotion) return

    window.addEventListener('mousemove', handleMouseMove)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
    }
  }, [handleMouseMove, prefersReducedMotion])

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

      // Smooth mouse position interpolation (eased follow)
      const easing = 0.08
      mouseRef.current.x += (mouseRef.current.targetX - mouseRef.current.x) * easing
      mouseRef.current.y += (mouseRef.current.targetY - mouseRef.current.y) * easing

      // Clear canvas
      ctx.fillStyle = theme.colors.background
      ctx.fillRect(0, 0, width, height)

      // Main blob that follows the mouse
      const mouseX = mouseRef.current.x * width
      const mouseY = mouseRef.current.y * height
      const mainRadius = Math.min(width, height) * 0.45

      // Primary mouse-following blob (bright blue)
      const mainGradient = ctx.createRadialGradient(
        mouseX, mouseY, 0,
        mouseX, mouseY, mainRadius
      )
      mainGradient.addColorStop(0, 'rgba(31, 93, 255, 0.7)')
      mainGradient.addColorStop(0.3, 'rgba(31, 93, 255, 0.4)')
      mainGradient.addColorStop(0.6, 'rgba(45, 90, 135, 0.2)')
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
