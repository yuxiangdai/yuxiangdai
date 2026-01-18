import React, { useEffect, useRef } from 'react'
import styled from 'styled-components'
import * as THREE from 'three'
import { theme } from '../styles/tokens'

const Canvas = styled.canvas`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: ${theme.zIndex.background + 1};
  pointer-events: none;
  opacity: 1;
`

const DotMatrixField = () => {
  const canvasRef = useRef(null)
  const mouseRef = useRef({ x: 0.5, y: 0.5, targetX: 0.5, targetY: 0.5 })
  const animationRef = useRef(null)

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

        // Simple noise function
        float random(vec2 st) {
          return fract(sin(dot(st.xy, vec2(12.9898,78.233))) * 43758.5453123);
        }

        float noise(vec2 st) {
          vec2 i = floor(st);
          vec2 f = fract(st);
          
          float a = random(i);
          float b = random(i + vec2(1.0, 0.0));
          float c = random(i + vec2(0.0, 1.0));
          float d = random(i + vec2(1.0, 1.0));
          
          vec2 u = f * f * (3.0 - 2.0 * f);
          
          return mix(a, b, u.x) + (c - a)* u.y * (1.0 - u.x) + (d - b) * u.x * u.y;
        }

        void main() {
          vec2 uv = vUv;
          float aspect = uResolution.x / uResolution.y;
          vec2 uvAspect = vec2(uv.x * aspect, uv.y);

          // Dot matrix parameters
          float dotSize = 0.008; // Size of each dot
          float spacing = 0.03; // Spacing between dots
          float time = uTime;

          // Calculate grid position
          vec2 gridPos = uvAspect / spacing;
          vec2 gridIndex = floor(gridPos);
          vec2 gridFract = fract(gridPos);

          // Create dots
          float dot = distance(gridFract, vec2(0.5));
          dot = 1.0 - smoothstep(dotSize, dotSize * 2.0, dot);

          // Animate dots with time and mouse influence
          float mouseDist = distance(uv, uMouse);
          float mouseInfluence = 1.0 / (1.0 + mouseDist * 5.0);
          
          // Wave animation based on time
          float wave = sin(time * 2.0 + gridIndex.x * 0.5 + gridIndex.y * 0.3) * 0.5 + 0.5;
          
          // Mouse-based animation
          float mouseWave = sin(time * 3.0 - mouseDist * 10.0) * 0.5 + 0.5;
          
          // Combine animations
          float animation = wave * 0.7 + mouseWave * mouseInfluence * 0.3;
          
          // Add some noise for organic feel
          float noiseValue = noise(gridIndex + time * 0.1);
          animation += noiseValue * 0.1;

          // Color based on animation
          vec3 dotColor = vec3(0.2, 0.4, 0.8); // Blue color
          dotColor.r += animation * 0.3; // Add some red variation
          dotColor.g += animation * 0.2; // Add some green variation
          
          // Apply animation to dot intensity
          dot *= animation;

          // Background color
          vec3 backgroundColor = vec3(0.03, 0.04, 0.06);

          // Create fade effect from edges
          float edgeFade = 1.0 - smoothstep(0.3, 0.6, length(uv - 0.5));
          dot *= edgeFade;

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
      mouseRef.current.targetY = e.clientY / window.innerHeight
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

      // Smooth mouse interpolation - more responsive
      const easing = 0.08
      mouseRef.current.x += (mouseRef.current.targetX - mouseRef.current.x) * easing
      mouseRef.current.y += (mouseRef.current.targetY - mouseRef.current.y) * easing

      // Update uniforms
      if (!prefersReducedMotion) {
        time += 0.03 // Much faster for very visible animation
      } else {
        // Still update time for reduced motion, but much slower
        time += 0.001
      }
      material.uniforms.uTime.value = time
      material.uniforms.uMouse.value.set(mouseRef.current.x, mouseRef.current.y)

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

  return <Canvas ref={canvasRef} aria-hidden="true" />
}

export default DotMatrixField
