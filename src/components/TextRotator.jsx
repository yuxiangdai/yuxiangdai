import React, { useEffect, useRef } from 'react'
import styled from 'styled-components'
import { gsap } from 'gsap'
import { theme } from '../styles/tokens'

const RotatingTextWrapper = styled.span`
  display: inline-block;
  position: relative;
  min-width: ${props => props.$minWidth || '180px'};
  height: 1.2em;
  vertical-align: bottom;
`

const RotatingWord = styled.span`
  display: inline-block;
  position: absolute;
  left: 0;
  bottom: 0;
  opacity: 0;
  transform: translateY(-20px);
  color: ${props => props.$color || theme.colors.accent};
  white-space: nowrap;
`

const TextRotator = ({ words, minWidth, color, holdDuration = 1.5 }) => {
  const wordRefs = useRef([])
  const timelineRef = useRef(null)

  useEffect(() => {
    if (typeof window === 'undefined') return

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const wordElements = wordRefs.current.filter(Boolean)

    if (wordElements.length === 0) return

    if (prefersReducedMotion) {
      gsap.set(wordElements[0], { opacity: 1, y: 0 })
      return
    }

    const tl = gsap.timeline({ repeat: -1 })
    timelineRef.current = tl

    wordElements.forEach((word) => {
      // Fade in from top
      tl.to(word, {
        opacity: 1,
        y: 0,
        duration: 0.5,
        ease: 'power2.out',
      })
      // Hold
      tl.to({}, { duration: holdDuration })
      // Fade out to bottom
      tl.to(word, {
        opacity: 0,
        y: 20,
        duration: 0.5,
        ease: 'power2.in',
      })
    })

    return () => {
      if (timelineRef.current) {
        timelineRef.current.kill()
      }
    }
  }, [words, holdDuration])

  return (
    <RotatingTextWrapper $minWidth={minWidth}>
      {words.map((word, i) => (
        <RotatingWord
          key={word}
          ref={el => wordRefs.current[i] = el}
          $color={color}
        >
          {word}
        </RotatingWord>
      ))}
    </RotatingTextWrapper>
  )
}

export default TextRotator
