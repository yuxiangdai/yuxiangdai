import React, { useEffect, useRef } from 'react'
import styled from 'styled-components'
import { gsap } from 'gsap'
import { theme } from '../../styles/tokens'

const Section = styled.section`
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
`

const NameChar = styled.span`
  display: inline-block;
  opacity: 0;
  transform: translateY(100%);
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
  const nameCharsRef = useRef([])
  const subtitleWordsRef = useRef([])
  const microlinePartsRef = useRef([])
  const separatorsRef = useRef([])

  const name = 'Yuxiang Dai'
  const subtitle = 'Senior software engineer working on systems, agents, and thoughtful tools.'
  const microlineParts = ['San Francisco', 'Symbolica AI', 'ex-Amazon']

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

    const tl = gsap.timeline({ defaults: { ease: 'power4.out' } })

    // Animate name characters with stagger
    tl.to(nameCharsRef.current, {
      y: 0,
      opacity: 1,
      duration: 0.8,
      stagger: 0.04,
      ease: 'power3.out',
    })

    // Animate subtitle words with wave effect
    tl.to(subtitleWordsRef.current, {
      y: 0,
      opacity: 1,
      duration: 0.6,
      stagger: 0.03,
      ease: 'power2.out',
    }, '-=0.4')

    // Animate microline parts sliding in
    tl.to(microlinePartsRef.current, {
      x: 0,
      opacity: 1,
      duration: 0.5,
      stagger: 0.1,
      ease: 'power2.out',
    }, '-=0.3')

    // Fade in separators
    tl.to(separatorsRef.current, {
      opacity: 1,
      duration: 0.3,
      stagger: 0.1,
    }, '-=0.3')

    return () => {
      tl.kill()
    }
  }, [])

  return (
    <Section id="hero" ref={sectionRef}>
      <Name>
        {name.split('').map((char, i) => (
          <NameChar
            key={i}
            ref={el => nameCharsRef.current[i] = el}
          >
            {char === ' ' ? '\u00A0' : char}
          </NameChar>
        ))}
      </Name>
      <Subtitle>
        {subtitle.split(' ').map((word, i) => (
          <SubtitleWord
            key={i}
            ref={el => subtitleWordsRef.current[i] = el}
          >
            {word}
          </SubtitleWord>
        ))}
      </Subtitle>
      <Microline>
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
    </Section>
  )
}

export default HeroSection
