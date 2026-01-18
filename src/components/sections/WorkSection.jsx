import React, { useEffect, useRef, useState, useCallback } from 'react'
import styled from 'styled-components'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { theme } from '../../styles/tokens'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

// Animated title components for each company
const TitleWrapper = styled.span`
  display: inline-block;
  cursor: default;
`

const ScrambleChar = styled.span`
  display: inline-block;
  font-family: ${theme.fonts.display};
`

const IdeogramChar = styled.span`
  display: inline-block;
  transition: all 0.3s ease;
`

const AmazonWrapper = styled.span`
  display: inline-block;
  position: relative;

  &::after {
    content: '';
    position: absolute;
    bottom: -4px;
    left: 0;
    width: var(--underline-width, 0%);
    height: 3px;
    background: #ff9900;
    border-radius: 2px;
    transform-origin: left;
  }
`

// Symbolica AI - Text scramble effect
const SymbolicaTitle = ({ text }) => {
  const [displayText, setDisplayText] = useState(text)
  const wrapperRef = useRef(null)
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*<>[]{}αβγδεζηθλμξπσφψω∑∏∫∂∇'
  const intervalRef = useRef(null)
  const hasPlayedRef = useRef(false)

  const playScramble = useCallback(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    let iteration = 0
    const originalText = text

    clearInterval(intervalRef.current)

    intervalRef.current = setInterval(() => {
      setDisplayText(
        originalText
          .split('')
          .map((char, index) => {
            if (char === ' ') return ' '
            if (index < iteration) return originalText[index]
            return chars[Math.floor(Math.random() * chars.length)]
          })
          .join('')
      )

      iteration += 1/3

      if (iteration >= originalText.length) {
        clearInterval(intervalRef.current)
        setDisplayText(originalText)
      }
    }, 30)
  }, [text])

  const handleMouseLeave = useCallback(() => {
    clearInterval(intervalRef.current)
    setDisplayText(text)
  }, [text])

  // ScrollTrigger to play animation on scroll
  useEffect(() => {
    if (typeof window === 'undefined' || !wrapperRef.current) return

    const trigger = ScrollTrigger.create({
      trigger: wrapperRef.current,
      start: 'top 40%',
      end: 'bottom 60%',
      onEnter: () => {
        playScramble()
      },
      onEnterBack: () => {
        playScramble()
      },
    })

    return () => {
      clearInterval(intervalRef.current)
      trigger.kill()
    }
  }, [playScramble])

  return (
    <TitleWrapper ref={wrapperRef} onMouseEnter={playScramble} onMouseLeave={handleMouseLeave}>
      {displayText.split('').map((char, i) => (
        <ScrambleChar key={i}>{char === ' ' ? '\u00A0' : char}</ScrambleChar>
      ))}
    </TitleWrapper>
  )
}

// Ideogram - Creative font morphing effect
const IdeogramTitle = ({ text }) => {
  const wrapperRef = useRef(null)
  const charsRef = useRef([])
  const hasPlayedRef = useRef(false)
  const fonts = [
    'Georgia, serif',
    'Brush Script MT, cursive',
    'Impact, sans-serif',
    'Courier New, monospace',
    theme.fonts.display,
  ]

  const playAnimation = useCallback(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    charsRef.current.forEach((char, i) => {
      if (!char) return

      // Cycle through fonts with stagger
      gsap.to(char, {
        fontFamily: fonts[Math.floor(Math.random() * (fonts.length - 1))],
        scale: 1 + Math.random() * 0.3,
        rotation: (Math.random() - 0.5) * 15,
        color: `hsl(${Math.random() * 360}, 70%, 60%)`,
        duration: 0.3,
        delay: i * 0.03,
        ease: 'power2.out',
      })
    })
  }, [])

  const handleMouseLeave = useCallback(() => {
    charsRef.current.forEach((char, i) => {
      if (!char) return
      gsap.to(char, {
        fontFamily: theme.fonts.display,
        scale: 1,
        rotation: 0,
        color: theme.colors.text,
        duration: 0.3,
        delay: i * 0.02,
        ease: 'power2.out',
      })
    })
  }, [])

  // ScrollTrigger to play animation on scroll
  useEffect(() => {
    if (typeof window === 'undefined' || !wrapperRef.current) return

    const trigger = ScrollTrigger.create({
      trigger: wrapperRef.current,
      start: 'top 40%',
      end: 'bottom 60%',
      onEnter: () => {
        playAnimation()
        // Reset after a delay
        setTimeout(() => {
          handleMouseLeave()
        }, 1500)
      },
      onEnterBack: () => {
        playAnimation()
        // Reset after a delay
        setTimeout(() => {
          handleMouseLeave()
        }, 1500)
      },
    })

    return () => trigger.kill()
  }, [playAnimation, handleMouseLeave])

  return (
    <TitleWrapper ref={wrapperRef} onMouseEnter={playAnimation} onMouseLeave={handleMouseLeave}>
      {text.split('').map((char, i) => (
        <IdeogramChar key={i} ref={el => charsRef.current[i] = el}>
          {char === ' ' ? '\u00A0' : char}
        </IdeogramChar>
      ))}
    </TitleWrapper>
  )
}

// Amazon - Delivery box animation (letters arrive like packages)
const AmazonTitle = ({ text }) => {
  const wrapperRef = useRef(null)
  const charsRef = useRef([])
  const hasPlayedRef = useRef(false)

  const playAnimation = useCallback(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    // Animate the smile underline
    gsap.to(wrapperRef.current, {
      '--underline-width': '100%',
      duration: 0.6,
      ease: 'power2.out',
    })

    // Letters "arrive" with a bounce
    charsRef.current.forEach((char, i) => {
      if (!char) return
      gsap.fromTo(char,
        { y: -20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.4,
          delay: i * 0.05,
          ease: 'bounce.out',
        }
      )
    })
  }, [])

  const handleMouseLeave = useCallback(() => {
    gsap.to(wrapperRef.current, {
      '--underline-width': '0%',
      duration: 0.3,
      ease: 'power2.in',
    })

    charsRef.current.forEach((char) => {
      if (!char) return
      gsap.to(char, {
        y: 0,
        opacity: 1,
        duration: 0.2,
      })
    })
  }, [])

  // ScrollTrigger to play animation on scroll
  useEffect(() => {
    if (typeof window === 'undefined' || !wrapperRef.current) return

    const trigger = ScrollTrigger.create({
      trigger: wrapperRef.current,
      start: 'top 40%',
      end: 'bottom 60%',
      onEnter: () => {
        playAnimation()
        // Reset after a delay
        setTimeout(() => {
          handleMouseLeave()
        }, 2000)
      },
      onEnterBack: () => {
        playAnimation()
        // Reset after a delay
        setTimeout(() => {
          handleMouseLeave()
        }, 2000)
      },
    })

    return () => trigger.kill()
  }, [playAnimation, handleMouseLeave])

  return (
    <AmazonWrapper
      ref={wrapperRef}
      onMouseEnter={playAnimation}
      onMouseLeave={handleMouseLeave}
      style={{ '--underline-width': '0%' }}
    >
      {text.split('').map((char, i) => (
        <IdeogramChar key={i} ref={el => charsRef.current[i] = el}>
          {char === ' ' ? '\u00A0' : char}
        </IdeogramChar>
      ))}
    </AmazonWrapper>
  )
}

// Map company names to their animated components
const AnimatedTitles = {
  'Symbolica AI': SymbolicaTitle,
  'Ideogram': IdeogramTitle,
  'Amazon': AmazonTitle,
}

const Section = styled.section`
  padding: ${theme.space[8]}px ${theme.space[5]}px;
  max-width: ${theme.layout.maxWidth};
  margin: 0 auto;
  scroll-margin-top: 80px;

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
`

const WorkList = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
`

const WorkItem = styled.li`
  padding: ${theme.space[5]}px 0;
  border-bottom: 1px solid ${theme.colors.border};
  transition: transform ${theme.motion.duration} ${theme.motion.easing};
  opacity: 0;
  transform: translateY(30px);

  &:first-child {
    padding-top: 0;
  }

  &:last-child {
    border-bottom: none;
  }

  &:hover {
    transform: translateX(4px);
  }

  @media (prefers-reduced-motion: reduce) {
    &:hover {
      transform: none;
    }
  }
`

const WorkTitle = styled.h3`
  font-family: ${theme.fonts.display};
  font-size: ${theme.typography.h2.size};
  font-weight: ${theme.typography.h2.weight};
  line-height: ${theme.typography.h2.lineHeight};
  color: ${theme.colors.text};
  margin: 0 0 ${theme.space[2]}px 0;
`

const WorkSummary = styled.p`
  font-family: ${theme.fonts.body};
  font-size: ${theme.typography.body.size};
  font-weight: ${theme.typography.body.weight};
  line-height: ${theme.typography.body.lineHeight};
  color: ${theme.colors.textMuted};
  margin: 0 0 ${theme.space[3]}px 0;
`

const WorkDetails = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${theme.space[2]}px ${theme.space[4]}px;
`

const DetailItem = styled.span`
  font-family: ${theme.fonts.body};
  font-size: ${theme.typography.small.size};
  color: ${theme.colors.textMuted};
  opacity: 0.8;
`

const work = [
  {
    title: 'Symbolica AI',
    summary: 'Building next-generation AI reasoning systems.',
    details: ['Software Engineer', 'Core infrastructure', 'Current']
  },
  {
    title: 'Ideogram',
    summary: 'Shipped key features for creative generative AI.',
    details: ['Member of Technical Staff', 'Product engineering', '2024']
  },
  {
    title: 'Amazon',
    summary: 'Built supply chain forecasting systems at scale.',
    details: ['Software Engineer', 'ML infrastructure', '2020-2024']
  }
]

const WorkSection = () => {
  const sectionRef = useRef(null)
  const titleRef = useRef(null)
  const itemRefs = useRef([])

  useEffect(() => {
    if (typeof window === 'undefined') return

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (prefersReducedMotion) {
      gsap.set(titleRef.current, { opacity: 1 })
      itemRefs.current.forEach(item => {
        if (item) gsap.set(item, { opacity: 1, y: 0 })
      })
      return
    }

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 70%',
        end: 'top 20%',
        toggleActions: 'play none none reverse',
      }
    })

    // Title fades in
    tl.to(titleRef.current, {
      opacity: 1,
      duration: 0.5,
      ease: 'power2.out',
    })

    // Work items slide up with stagger
    tl.to(itemRefs.current, {
      y: 0,
      opacity: 1,
      duration: 0.6,
      stagger: 0.15,
      ease: 'power3.out',
    }, '-=0.2')

    return () => {
      tl.kill()
    }
  }, [])

  return (
    <Section id="work" ref={sectionRef}>
      <SectionTitle ref={titleRef}>Work Experience</SectionTitle>
      <WorkList>
        {work.map((item, index) => (
          <WorkItem key={index} ref={el => itemRefs.current[index] = el}>
            <WorkTitle>
              {AnimatedTitles[item.title]
                ? React.createElement(AnimatedTitles[item.title], { text: item.title })
                : item.title
              }
            </WorkTitle>
            <WorkSummary>{item.summary}</WorkSummary>
            <WorkDetails>
              {item.details.map((detail, i) => (
                <DetailItem key={i}>{detail}</DetailItem>
              ))}
            </WorkDetails>
          </WorkItem>
        ))}
      </WorkList>
    </Section>
  )
}

export default WorkSection
