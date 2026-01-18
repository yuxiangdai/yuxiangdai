import React, { useEffect, useRef } from 'react'
import styled from 'styled-components'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { theme } from '../../styles/tokens'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

const Section = styled.section`
  padding: ${theme.space[8]}px ${theme.space[5]}px ${theme.space[8]}px;
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
  margin: 0 0 ${theme.space[5]}px 0;
  opacity: 0;
  transform: translateX(50px);
`

const LinksContainer = styled.nav`
  display: flex;
  flex-wrap: wrap;
  gap: ${theme.space[4]}px ${theme.space[6]}px;
`

const ExternalLink = styled.a`
  font-family: ${theme.fonts.body};
  font-size: ${theme.typography.body.size};
  font-weight: 400;
  color: ${theme.colors.textMuted};
  text-decoration: none;
  border-bottom: 1px solid transparent;
  padding-bottom: 2px;
  transition: color ${theme.motion.duration} ${theme.motion.easing},
              border-color ${theme.motion.duration} ${theme.motion.easing};
  opacity: 0;
  transform: translateX(30px);

  &:hover {
    color: ${theme.colors.text};
    border-bottom-color: ${theme.colors.border};
  }

  &:focus {
    outline: 2px solid ${theme.colors.accent};
    outline-offset: 4px;
  }
`

const links = [
  { name: 'LinkedIn', url: 'https://www.linkedin.com/in/yuxiangdai/' },
  { name: 'GitHub', url: 'https://github.com/yuxiangdai' },
  { name: '500px', url: 'https://500px.com/yuxiangdai' },
]

const ElsewhereSection = () => {
  const sectionRef = useRef(null)
  const titleRef = useRef(null)
  const linkRefs = useRef([])

  useEffect(() => {
    if (typeof window === 'undefined') return

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (prefersReducedMotion) {
      gsap.set(titleRef.current, { opacity: 1, x: 0 })
      linkRefs.current.forEach(link => {
        if (link) gsap.set(link, { opacity: 1, x: 0 })
      })
      return
    }

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 80%',
        end: 'top 40%',
        toggleActions: 'play none none reverse',
      }
    })

    // Title slides in from right
    tl.to(titleRef.current, {
      x: 0,
      opacity: 1,
      duration: 0.8,
      ease: 'power3.out',
    })

    // Links slide in with stagger
    tl.to(linkRefs.current, {
      x: 0,
      opacity: 1,
      duration: 0.5,
      stagger: 0.1,
      ease: 'power3.out',
    }, '-=0.4')

    return () => {
      tl.kill()
    }
  }, [])

  return (
    <Section id="elsewhere" ref={sectionRef}>
      <SectionTitle ref={titleRef}>Elsewhere</SectionTitle>
      <LinksContainer>
        {links.map((link, index) => (
          <ExternalLink
            key={link.name}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            ref={el => linkRefs.current[index] = el}
          >
            {link.name}
          </ExternalLink>
        ))}
      </LinksContainer>
    </Section>
  )
}

export default ElsewhereSection
