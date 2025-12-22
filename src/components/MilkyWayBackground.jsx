import React, { useEffect, useRef } from 'react'
import styled from 'styled-components'

const CanvasContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
  pointer-events: none;
`

const Canvas = styled.canvas`
  width: 100%;
  height: 100%;
  display: block;
`

const MilkyWayBackground = ({
  starDensity = 800,
  bandStrength = 0.6,
  twinkleSpeed = 0.5,
  driftSpeed = 0.3,
  maxDpr = 1.5,
}) => {
  const canvasRef = useRef(null)
  const animationIdRef = useRef(null)
  const starsRef = useRef([])
  const timeRef = useRef(0)
  const isVisibleRef = useRef(true)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d', { alpha: false })
    let width, height, dpr
    let prefersReducedMotion = false

    // Check for reduced motion
    if (typeof window !== 'undefined') {
      const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
      prefersReducedMotion = mediaQuery.matches
    }

    // Resize and initialize
    const resize = () => {
      const rect = canvas.getBoundingClientRect()
      dpr = Math.min(window.devicePixelRatio || 1, maxDpr)
      width = rect.width
      height = rect.height
      canvas.width = width * dpr
      canvas.height = height * dpr
      ctx.scale(dpr, dpr)

      generateStars()
    }

    // Generate stars
    const generateStars = () => {
      const stars = []

      // Create star layers with better distribution
      for (let i = 0; i < starDensity; i++) {
        const x = Math.random() * width
        const y = Math.random() * height
        const size = Math.random() < 0.7 ? 0.5 + Math.random() * 0.8 : 1.0 + Math.random() * 1.5
        const opacity = 0.3 + Math.random() * 0.7
        const twinklePhase = Math.random() * Math.PI * 2
        const twinkleSpeed = 0.5 + Math.random() * 1.5
        const layer = Math.floor(Math.random() * 3)
        const isWarm = Math.random() < 0.05

        stars.push({ x, y, size, opacity, twinklePhase, twinkleSpeed, layer, isWarm })
      }

      starsRef.current = stars
    }

    // Render frame
    const render = () => {
      const time = timeRef.current * 0.01

      // Clear with dark background with subtle blue tint
      ctx.fillStyle = '#0a0b0e'
      ctx.fillRect(0, 0, width, height)

      // Subtle blue ambient sky glow
      const skyGradient = ctx.createRadialGradient(
        width * 0.5, height * 0.3, 0,
        width * 0.5, height * 0.3, height * 1.2
      )
      skyGradient.addColorStop(0, 'rgba(20, 40, 70, 0.08)')
      skyGradient.addColorStop(0.5, 'rgba(15, 30, 55, 0.04)')
      skyGradient.addColorStop(1, 'rgba(10, 20, 35, 0.01)')
      ctx.fillStyle = skyGradient
      ctx.fillRect(0, 0, width, height)

      // Draw Milky Way band - diagonal from top-right to bottom-left
      if (bandStrength > 0) {
        // Main blue/cyan band - more subtle
        const gradient = ctx.createLinearGradient(
          width * 0.9, height * 0.1,
          width * 0.1, height * 0.9
        )

        gradient.addColorStop(0, 'rgba(15, 25, 45, 0.05)')
        gradient.addColorStop(0.2, `rgba(50, 100, 150, ${0.12 * bandStrength})`)
        gradient.addColorStop(0.35, `rgba(70, 130, 190, ${0.22 * bandStrength})`)
        gradient.addColorStop(0.5, `rgba(90, 160, 230, ${0.3 * bandStrength})`)
        gradient.addColorStop(0.65, `rgba(70, 130, 190, ${0.22 * bandStrength})`)
        gradient.addColorStop(0.8, `rgba(50, 100, 150, ${0.12 * bandStrength})`)
        gradient.addColorStop(1, 'rgba(15, 25, 45, 0.05)')

        ctx.fillStyle = gradient
        ctx.fillRect(0, 0, width, height)

        // Cyan core with screen blend mode - more subtle
        ctx.globalCompositeOperation = 'screen'
        const coreGradient = ctx.createLinearGradient(
          width * 0.8, height * 0.2,
          width * 0.2, height * 0.8
        )

        coreGradient.addColorStop(0, 'transparent')
        coreGradient.addColorStop(0.3, `rgba(60, 130, 200, ${0.05 * bandStrength})`)
        coreGradient.addColorStop(0.5, `rgba(80, 160, 230, ${0.12 * bandStrength})`)
        coreGradient.addColorStop(0.7, `rgba(60, 130, 200, ${0.05 * bandStrength})`)
        coreGradient.addColorStop(1, 'transparent')

        ctx.fillStyle = coreGradient
        ctx.fillRect(0, 0, width, height)

        // Add subtle highlights
        const highlightGradient = ctx.createRadialGradient(
          width * 0.55, height * 0.35, 0,
          width * 0.55, height * 0.35, width * 0.4
        )

        highlightGradient.addColorStop(0, `rgba(100, 180, 240, ${0.08 * bandStrength})`)
        highlightGradient.addColorStop(0.4, `rgba(70, 140, 210, ${0.04 * bandStrength})`)
        highlightGradient.addColorStop(1, 'transparent')

        ctx.fillStyle = highlightGradient
        ctx.fillRect(0, 0, width, height)

        ctx.globalCompositeOperation = 'source-over'
      }

      // Draw stars with parallax motion
      const stars = starsRef.current
      for (let i = 0; i < stars.length; i++) {
        const star = stars[i]

        // Parallax drift - moves from right to left
        const drift = time * driftSpeed * (star.layer + 1) * 10
        let x = (star.x + drift) % width
        if (x < 0) x += width

        // Twinkle effect
        const twinkle = prefersReducedMotion
          ? 1
          : 0.7 + 0.3 * Math.sin(time * star.twinkleSpeed * twinkleSpeed + star.twinklePhase)

        const alpha = star.opacity * twinkle

        // Star color
        const color = star.isWarm
          ? `rgba(255, 240, 220, ${alpha})`
          : `rgba(245, 250, 255, ${alpha})`

        ctx.fillStyle = color
        ctx.beginPath()
        ctx.arc(x, star.y, star.size, 0, Math.PI * 2)
        ctx.fill()
      }

      // Subtle horizon glow
      const horizonGradient = ctx.createLinearGradient(0, height * 0.75, 0, height)
      horizonGradient.addColorStop(0, 'transparent')
      horizonGradient.addColorStop(0.7, 'rgba(255, 180, 100, 0.02)')
      horizonGradient.addColorStop(1, 'rgba(255, 160, 80, 0.04)')
      ctx.fillStyle = horizonGradient
      ctx.fillRect(0, height * 0.75, width, height * 0.25)

      // Subtle vignette
      const vignetteGradient = ctx.createRadialGradient(
        width / 2, height * 0.3, height * 0.1,
        width / 2, height * 0.3, height * 0.9
      )
      vignetteGradient.addColorStop(0, 'transparent')
      vignetteGradient.addColorStop(1, 'rgba(10, 10, 10, 0.4)')
      ctx.fillStyle = vignetteGradient
      ctx.fillRect(0, 0, width, height)
    }

    // Animation loop
    const animate = () => {
      if (!isVisibleRef.current || prefersReducedMotion) {
        return
      }

      timeRef.current += 1
      render()
      animationIdRef.current = requestAnimationFrame(animate)
    }

    // Handle visibility change
    const handleVisibilityChange = () => {
      if (typeof document !== 'undefined') {
        isVisibleRef.current = !document.hidden

        if (document.hidden && animationIdRef.current) {
          cancelAnimationFrame(animationIdRef.current)
          animationIdRef.current = null
        } else if (!document.hidden && !prefersReducedMotion && !animationIdRef.current) {
          animate()
        }
      }
    }

    // Initialize
    if (typeof window !== 'undefined') {
      resize()

      console.log('[MilkyWay] Initialized:', {
        width,
        height,
        starCount: starsRef.current.length,
        prefersReducedMotion,
        driftSpeed,
        twinkleSpeed
      })

      // Start animation
      if (!prefersReducedMotion) {
        console.log('[MilkyWay] Starting animation loop')
        animate()
      } else {
        console.log('[MilkyWay] Reduced motion - rendering single frame')
        render() // Single frame for reduced motion
      }

      // Event listeners
      window.addEventListener('resize', resize)
      document.addEventListener('visibilitychange', handleVisibilityChange)
    }

    // Cleanup
    return () => {
      if (animationIdRef.current) {
        cancelAnimationFrame(animationIdRef.current)
      }
      if (typeof window !== 'undefined') {
        window.removeEventListener('resize', resize)
        document.removeEventListener('visibilitychange', handleVisibilityChange)
      }
    }
  }, [starDensity, bandStrength, twinkleSpeed, driftSpeed, maxDpr])

  return (
    <CanvasContainer>
      <Canvas ref={canvasRef} />
    </CanvasContainer>
  )
}

export default MilkyWayBackground
