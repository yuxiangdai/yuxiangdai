import React, { useEffect, useRef } from 'react'
import styled from 'styled-components'
import { Link } from 'gatsby'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { theme } from '../../styles/tokens'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

const Section = styled.section`
  padding: ${theme.space[8]}px ${theme.space[5]}px;
  max-width: ${theme.layout.maxWidth};
  margin: 0 auto;
  scroll-margin-top: 80px;
  overflow: hidden;

  @media (max-width: 768px) {
    padding: ${theme.space[7]}px ${theme.space[4]}px;
  }
`

const SectionTitle = styled.h2`
  font-family: ${theme.fonts.body};
  font-size: ${theme.typography.small.size};
  font-weight: 500;
  color: ${theme.colors.textMuted};
  text-transform: uppercase;
  letter-spacing: 0.1em;
  margin: 0 0 ${theme.space[6]}px 0;
  opacity: 0;
  transform: translateX(-50px);
`

const BioText = styled.div`
  max-width: 640px;

  p {
    font-family: ${theme.fonts.body};
    font-size: ${theme.typography.body.size};
    line-height: ${theme.typography.body.lineHeight};
    color: ${theme.colors.textMuted};
    margin: 0 0 ${theme.space[4]}px 0;
    opacity: 0;
    transform: translateX(-30px);

    &:last-child {
      margin-bottom: 0;
    }
  }
`

const StyledLink = styled(Link)`
  color: ${theme.colors.accent};
  text-decoration: none;
  border-bottom: 1px solid rgba(45, 90, 135, 0.3);
  transition: border-color ${theme.motion.duration} ${theme.motion.easing};

  &:hover {
    border-color: ${theme.colors.accent};
  }
`

const AboutSection = () => {
  const sectionRef = useRef(null)
  const titleRef = useRef(null)
  const paragraphRefs = useRef([])

  useEffect(() => {
    if (typeof window === 'undefined') return

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (prefersReducedMotion) {
      gsap.set(titleRef.current, { opacity: 1, x: 0 })
      paragraphRefs.current.forEach(p => {
        if (p) gsap.set(p, { opacity: 1, x: 0 })
      })
      return
    }

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 75%',
        end: 'top 25%',
        toggleActions: 'play none none reverse',
      }
    })

    // Title slides in from left
    tl.to(titleRef.current, {
      x: 0,
      opacity: 1,
      duration: 0.8,
      ease: 'power3.out',
    })

    // Paragraphs slide in with stagger
    tl.to(paragraphRefs.current, {
      x: 0,
      opacity: 1,
      duration: 0.6,
      stagger: 0.1,
      ease: 'power3.out',
    }, '-=0.4')

    return () => {
      tl.kill()
    }
  }, [])

  return (
    <Section id="about" ref={sectionRef}>
      <SectionTitle ref={titleRef}>About</SectionTitle>
      <BioText>
        <p ref={el => paragraphRefs.current[0] = el}>
          I currently work at Symbolica AI.
        </p>
        <p ref={el => paragraphRefs.current[1] = el}>
          I was previously working on generative AI products at Ideogram and Supply Chain Forecasting at Amazon.
        </p>
        <p ref={el => paragraphRefs.current[2] = el}>
          I studied Robotics Engineering at the University of Toronto's Engineering Science program.
        </p>
        <p ref={el => paragraphRefs.current[3] = el}>
          Outside of work, I enjoy <StyledLink to="/photos/">photography</StyledLink>, hiking, classical music and visiting art museums.
        </p>
      </BioText>
    </Section>
  )
}

export default AboutSection
