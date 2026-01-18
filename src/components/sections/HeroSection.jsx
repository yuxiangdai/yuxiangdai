import React, { useEffect, useRef } from 'react'
import styled from 'styled-components'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { theme } from '../../styles/tokens'
import * as THREE from 'three'
import TextRotator from '../TextRotator'

// Register ScrollTrigger plugin
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

const DotMatrixCanvas = styled.canvas`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: ${theme.zIndex.background};
  pointer-events: none;
  opacity: 1;
`

const Section = styled.section`
  position: relative;
  z-index: 2;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 0 ${theme.space[5]}px;
  max-width: ${theme.layout.maxWidth};
  margin: 0 auto;
  scroll-margin-top: 80px;

  @media (max-width: 768px) {
    padding: 0 ${theme.space[4]}px;
    min-height: calc(100vh - 60px);
  }
`

const ContentWrapper = styled.div`
  will-change: transform, opacity;
`

const Name = styled.h1`
  font-family: ${theme.fonts.display};
  font-size: ${theme.typography.h1.size};
  font-weight: ${theme.typography.h1.weight};
  line-height: ${theme.typography.h1.lineHeight};
  letter-spacing: ${theme.typography.h1.letterSpacing};
  color: ${theme.colors.text};
  margin: 0 0 ${theme.space[4]}px 0;
  overflow: hidden;
  padding-bottom: 0.1em;
  cursor: default;
`

const NameChar = styled.span`
  display: inline-block;
  opacity: 0;
  transform: translateY(100%);
  will-change: transform;
`

const Subtitle = styled.p`
  font-family: ${theme.fonts.body};
  font-size: ${theme.typography.body.size};
  font-weight: ${theme.typography.body.weight};
  line-height: ${theme.typography.body.lineHeight};
  color: ${theme.colors.textMuted};
  margin: 0 0 ${theme.space[3]}px 0;
  max-width: 540px;
`

const SubtitleWord = styled.span`
  display: inline-block;
  margin-right: 0.3em;
  opacity: 0;
  transform: translateY(20px);

  &:last-child {
    margin-right: 0;
  }
`

const Microline = styled.p`
  font-family: ${theme.fonts.body};
  font-size: ${theme.typography.small.size};
  font-weight: ${theme.typography.small.weight};
  line-height: ${theme.typography.small.lineHeight};
  color: ${theme.colors.textMuted};
  margin: 0;
`

const MicrolinePart = styled.span`
  display: inline-block;
  opacity: 0;
  transform: translateX(-10px);
`

const Separator = styled.span`
  display: inline-block;
  margin: 0 0.5em;
  opacity: 0;
`

const HeroSection = () => {
  const sectionRef = useRef(null)
  const contentRef = useRef(null)
  const nameRef = useRef(null)
  const subtitleRef = useRef(null)
  const microlineRef = useRef(null)
  const nameCharsRef = useRef([])
  const subtitleWordsRef = useRef([])
  const microlinePartsRef = useRef([])
  const separatorsRef = useRef([])
  const canvasRef = useRef(null)
  const mouseRef = useRef({ x: 0.5, y: 0.5, targetX: 0.5, targetY: 0.5 })
  const animationRef = useRef(null)

  const name = 'Yuxiang Dai'
  const subtitlePrefix = 'Senior software engineer working on'
  const subtitleRotatingWords = ['systems.', 'agents.', 'websites.', 'robots.', 'spaghetti code.', 'bugs.', 'coffee breaks.']
  const microlineParts = ['San Francisco', 'Symbolica AI']

  // Dot Matrix Effect
  useEffect(() => {
    if (typeof window === 'undefined') return

    const canvas = canvasRef.current
    if (!canvas) return

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    // Scene setup
    const scene = new THREE.Scene()
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1)

    const renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: true,
    })
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

    // Full-screen quad with shader
    const geometry = new THREE.PlaneGeometry(2, 2)

    const material = new THREE.ShaderMaterial({
      uniforms: {
        uTime: { value: 0 },
        uMouse: { value: new THREE.Vector2(0.5, 0.5) },
        uResolution: { value: new THREE.Vector2(window.innerWidth, window.innerHeight) },
      },
      vertexShader: `
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform float uTime;
        uniform vec2 uMouse;
        uniform vec2 uResolution;
        varying vec2 vUv;

        void main() {
          vec2 uv = vUv;
          float aspect = uResolution.x / uResolution.y;
          vec2 uvAspect = vec2(uv.x * aspect, uv.y);

          // Dot matrix parameters
          float dotSize = 0.02;
          float spacing = 0.025;

          // Calculate grid position
          vec2 gridPos = uvAspect / spacing;
          vec2 gridIndex = floor(gridPos);
          vec2 gridFract = fract(gridPos);

          // Mouse influence with physics
          float mouseDist = distance(uv, uMouse);
          float mouseRadius = 0.3;
          
          // Physics-based displacement - dots move away from mouse with falloff
          vec2 toMouse = uv - uMouse;
          float mouseForce = 1.0 - smoothstep(0.0, mouseRadius, mouseDist);
          
          // Apply displacement to grid position (repelling force)
          vec2 displacedGrid = gridFract;
          if (mouseForce > 0.0) {
            // Dots push away from mouse with physics-based falloff
            float pushStrength = mouseForce * mouseForce; // Quadratic falloff
            displacedGrid += normalize(toMouse) * pushStrength * 0.3;
          }
          
          // Create dots with displaced position
          float dot = distance(displacedGrid, vec2(0.5));
          dot = 1.0 - smoothstep(dotSize, dotSize * 2.0, dot);

          // Mouse-based color and intensity - dark when away from mouse
          vec3 dotColor = vec3(0.05, 0.08, 0.12);
          dotColor.r += mouseForce * 0.4;
          dotColor.g += mouseForce * 0.5;
          dotColor.b += mouseForce * 0.8;



          // Background color
          vec3 backgroundColor = vec3(0.02, 0.025, 0.04);

          // Mix background and dots
          vec3 finalColor = mix(backgroundColor, dotColor, dot);

          gl_FragColor = vec4(finalColor, 1.0);
        }
      `,
      transparent: false,
    })

    const mesh = new THREE.Mesh(geometry, material)
    scene.add(mesh)

    // Mouse tracking
    const handleMouseMove = (e) => {
      mouseRef.current.targetX = e.clientX / window.innerWidth
      mouseRef.current.targetY = 1.0 - (e.clientY / window.innerHeight) // Flip Y for WebGL coordinates
    }

    window.addEventListener('mousemove', handleMouseMove)

    // Handle resize
    const handleResize = () => {
      renderer.setSize(window.innerWidth, window.innerHeight)
      material.uniforms.uResolution.value.set(window.innerWidth, window.innerHeight)
    }

    window.addEventListener('resize', handleResize)

    // Animation loop
    let time = 0
    const animate = () => {
      animationRef.current = requestAnimationFrame(animate)

      // Smooth mouse interpolation
      const easing = 0.08
      mouseRef.current.x += (mouseRef.current.targetX - mouseRef.current.x) * easing
      mouseRef.current.y += (mouseRef.current.targetY - mouseRef.current.y) * easing

    // Update uniforms
      if (!prefersReducedMotion) {
        time += 0.008 // Much slower for calm, pleasant animation
      } else {
        // Still update time for reduced motion, but much slower
        time += 0.001
      }
      material.uniforms.uTime.value = time
      material.uniforms.uMouse.value.set(mouseRef.current.x, mouseRef.current.y) // Fixed Y axis

      renderer.render(scene, camera)
    }

    animate()

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('resize', handleResize)
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
      geometry.dispose()
      material.dispose()
      renderer.dispose()
    }
  }, [])

  // Text Animations
  useEffect(() => {
    // Check for reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (prefersReducedMotion) {
      // Show everything immediately without animation
      nameCharsRef.current.forEach(char => {
        if (char) gsap.set(char, { opacity: 1, y: 0 })
      })
      subtitleWordsRef.current.forEach(word => {
        if (word) gsap.set(word, { opacity: 1, y: 0 })
      })
      microlinePartsRef.current.forEach(part => {
        if (part) gsap.set(part, { opacity: 1, x: 0 })
      })
      separatorsRef.current.forEach(sep => {
        if (sep) gsap.set(sep, { opacity: 1 })
      })
      return
    }

    // Entrance animation timeline
    const entranceTl = gsap.timeline({ defaults: { ease: 'power4.out' } })

    // Animate name characters with stagger
    entranceTl.to(nameCharsRef.current, {
      y: 0,
      opacity: 1,
      duration: 0.8,
      stagger: 0.04,
      ease: 'power3.out',
    })

    // Animate subtitle words with wave effect
    entranceTl.to(subtitleWordsRef.current, {
      y: 0,
      opacity: 1,
      duration: 0.6,
      stagger: 0.03,
      ease: 'power2.out',
    }, '-=0.4')

    // Animate microline parts sliding in
    entranceTl.to(microlinePartsRef.current, {
      x: 0,
      opacity: 1,
      duration: 0.5,
      stagger: 0.1,
      ease: 'power2.out',
    }, '-=0.3')

    // Fade in separators
    entranceTl.to(separatorsRef.current, {
      opacity: 1,
      duration: 0.3,
      stagger: 0.1,
    }, '-=0.3')

    return () => {
      entranceTl.kill()
    }
  }, [])

  // Ripple hover effect on name
  useEffect(() => {
    const nameEl = nameRef.current
    const chars = nameCharsRef.current.filter(Boolean)
    if (!nameEl || chars.length === 0) return

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) return

    let isHovering = false
    let rafId = null

    const handleMouseMove = (e) => {
      if (!isHovering) return

      const rect = nameEl.getBoundingClientRect()
      const mouseX = e.clientX - rect.left

      // Find closest character index based on mouse X position
      let closestIndex = 0
      let closestDist = Infinity

      chars.forEach((char, i) => {
        if (!char) return
        const charRect = char.getBoundingClientRect()
        const charCenter = charRect.left + charRect.width / 2 - rect.left
        const dist = Math.abs(mouseX - charCenter)
        if (dist < closestDist) {
          closestDist = dist
          closestIndex = i
        }
      })

      // Cancel any pending animation frame
      if (rafId) cancelAnimationFrame(rafId)

      // Use RAF to batch animations
      rafId = requestAnimationFrame(() => {
        if (!isHovering) return // Double-check we're still hovering

        // Animate each character based on distance from closest
        chars.forEach((char, i) => {
          if (!char) return
          const distance = Math.abs(i - closestIndex)
          const delay = distance * 0.02
          const yOffset = Math.max(0, 6 - distance * 1.5) * -1 // Closer = more lift

          gsap.to(char, {
            y: yOffset,
            duration: 0.25,
            delay,
            ease: 'power2.out',
            overwrite: true,
          })
        })
      })
    }

    const handleMouseEnter = () => {
      isHovering = true
    }

    const handleMouseLeave = () => {
      isHovering = false
      if (rafId) cancelAnimationFrame(rafId)

      // Kill all ongoing animations and reset all characters
      chars.forEach((char) => {
        if (!char) return
        gsap.killTweensOf(char)
        gsap.to(char, {
          y: 0,
          duration: 0.4,
          ease: 'power2.out',
        })
      })
    }

    nameEl.addEventListener('mouseenter', handleMouseEnter)
    nameEl.addEventListener('mousemove', handleMouseMove)
    nameEl.addEventListener('mouseleave', handleMouseLeave)

    return () => {
      nameEl.removeEventListener('mouseenter', handleMouseEnter)
      nameEl.removeEventListener('mousemove', handleMouseMove)
      nameEl.removeEventListener('mouseleave', handleMouseLeave)
      if (rafId) cancelAnimationFrame(rafId)
    }
  }, [])

  return (
    <>
      <DotMatrixCanvas ref={canvasRef} aria-hidden="true" />
      <Section id="hero" ref={sectionRef}>
        <ContentWrapper ref={contentRef}>
          <Name ref={nameRef}>
            {name.split('').map((char, i) => (
              <NameChar
                key={i}
                ref={el => nameCharsRef.current[i] = el}
              >
                {char === ' ' ? '\u00A0' : char}
              </NameChar>
            ))}
          </Name>
          <Subtitle ref={subtitleRef}>
            {subtitlePrefix.split(' ').map((word, i) => (
              <SubtitleWord
                key={i}
                ref={el => subtitleWordsRef.current[i] = el}
              >
                {word}
              </SubtitleWord>
            ))}
            <SubtitleWord
              ref={el => subtitleWordsRef.current[subtitlePrefix.split(' ').length] = el}
            >
              <TextRotator
                words={subtitleRotatingWords}
                minWidth="160px"
                color={theme.colors.text}
              />
            </SubtitleWord>
          </Subtitle>
          <Microline ref={microlineRef}>
            {microlineParts.map((part, i) => (
              <React.Fragment key={i}>
                <MicrolinePart ref={el => microlinePartsRef.current[i] = el}>
                  {part}
                </MicrolinePart>
                {i < microlineParts.length - 1 && (
                  <Separator ref={el => separatorsRef.current[i] = el}>·</Separator>
                )}
              </React.Fragment>
            ))}
          </Microline>
        </ContentWrapper>
      </Section>
    </>
  )
}

export default HeroSection