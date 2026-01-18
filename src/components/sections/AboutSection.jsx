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
  font-family: ${theme.fonts.body};
  font-size: ${theme.typography.body.size};
  font-weight: 400;
  line-height: ${theme.typography.body.lineHeight};
  color: ${theme.colors.textMuted};
  margin: 0 0 ${theme.space[4]}px 0;

  &:last-child {
    margin-bottom: 0;
  }
`

const StyledLink = styled(Link)`
  color: ${theme.colors.accent};
  text-decoration: none;
  transition: all ${theme.motion.duration} ${theme.motion.easing};
  position: relative;
  display: inline-block;

  &::after {
    content: '';
    position: absolute;
    bottom: -2px;
    left: 0;
    width: 0;
    height: 2px;
    background: ${theme.colors.accent};
    transition: width 0.3s ease;
  }

  &:hover {
    color: ${theme.colors.text};
    transform: translateY(-1px);
    
    &::after {
      width: 100%;
    }
  }

  &:focus {
    outline: 2px solid ${theme.colors.accent};
    outline-offset: 4px;
  }
`

// Interactive word elements
const InteractiveWord = styled.span`
  display: inline-block;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  
  &.hiking:hover {
    color: ${theme.colors.text};
    animation: hiking-bounce 0.6s infinite;
  }
  
  &.music:hover {
    color: ${theme.colors.text};
    animation: music-pulse 0.8s infinite;
  }
  
  &.museums:hover {
    background: linear-gradient(90deg, ${theme.colors.text} 0%, ${theme.colors.accent} 50%, ${theme.colors.text} 100%);
    background-size: 300% 100%;
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    animation: color-wipe 3s ease-in-out infinite;
  }
  
  @keyframes hiking-bounce {
    0%, 100% { transform: translateY(0); }
    25% { transform: translateY(-3px) rotate(-2deg); }
    50% { transform: translateY(0); }
    75% { transform: translateY(-2px) rotate(1deg); }
  }
  
  @keyframes music-pulse {
    0%, 100% { transform: scale(1); opacity: 1; }
    50% { transform: scale(1.05); opacity: 0.8; }
  }
  
  @keyframes color-wipe {
    0% { background-position: 100% 0%; }
    35% { background-position: 0% 0%; }
    65% { background-position: 100% 0%; }
    100% { background-position: 100% 0%; }
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

    // Set initial state for animation
    gsap.set(titleRef.current, { x: -50, opacity: 0 })
    paragraphRefs.current.forEach(p => {
      if (p) gsap.set(p, { x: -30, opacity: 0 })
    })

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 75%',
        end: 'top 25%',
        toggleActions: 'play none none reverse',
      }
    })

    // Title slides in from left with a fun bounce
    tl.to(titleRef.current, {
      x: 0,
      opacity: 1,
      rotation: 0,
      duration: 1,
      ease: 'elastic.out(1, 0.5)',
    })

    // Paragraphs slide in with stagger and fun effects
    tl.to(paragraphRefs.current, {
      x: 0,
      opacity: 1,
      rotation: 0,
      duration: 0.6,
      stagger: 0.15,
      ease: 'back.out(1.7)',
    }, '-=0.4')

    return () => {
      tl.kill()
    }
  }, [])

  const handleWordClick = (hobby) => {
    // Fun little interaction for each hobby
    const messages = {
      photography: '📸 Capturing moments one frame at a time!',
      hiking: '🥾 Finding peace in mountain trails!',
      music: '🎵 Where math meets emotion!',
      museums: '🎨 Getting lost in brushstrokes and history!'
    }
    
    // You could show a toast notification or update state here
    console.log(messages[hobby] || '🎉 Thanks for clicking!')
  }

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
          Outside of work, I enjoy{' '}
          <StyledLink to="/photos/">photography</StyledLink>
          {', '}
          <InteractiveWord 
            className="hiking" 
            onClick={() => handleWordClick('hiking')}
          >
            hiking
          </InteractiveWord>
          {', '}
          <InteractiveWord 
            className="music" 
            onClick={() => handleWordClick('music')}
          >
            classical music
          </InteractiveWord>
          {' and '}
          <InteractiveWord 
            className="museums" 
            onClick={() => handleWordClick('museums')}
          >
            visiting art museums
          </InteractiveWord>
          .
        </p>
      </BioText>
    </Section>
  )
}

export default AboutSection
