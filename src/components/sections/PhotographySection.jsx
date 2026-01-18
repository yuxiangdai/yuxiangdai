import React, { useEffect, useRef } from 'react'
import styled from 'styled-components'
import { Link } from 'gatsby'
import { StaticImage } from 'gatsby-plugin-image'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { theme } from '../../styles/tokens'

// Register ScrollTrigger
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

const Section = styled.section`
  scroll-margin-top: 80px;
`

const SectionTitle = styled.h2`
  font-family: ${theme.fonts.body};
  font-size: ${theme.typography.small.size};
  font-weight: 500;
  color: ${theme.colors.textMuted};
  text-transform: uppercase;
  letter-spacing: 0.1em;
  margin: 0 0 ${theme.space[6]}px 0;
  position: relative;
  z-index: 10;
`

const PhotoContainer = styled.div`
  position: relative;
  height: 100vh;
  width: 100%;
  overflow: hidden;
`

const PhotoStack = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
`

const PhotoFrame = styled.div`
  position: absolute;
  top: calc(50% + 24px);
  left: 50%;
  transform: translate(-50%, -50%);
  width: 70%;
  max-width: 900px;
  aspect-ratio: 3 / 2;
  border-radius: ${theme.radius.md};
  overflow: hidden;
  opacity: 0;

  .gatsby-image-wrapper {
    width: 100%;
    height: 100%;
  }

  .gatsby-image-wrapper img {
    object-fit: cover;
  }

  @media (max-width: 768px) {
    width: 90%;
  }
`

const SectionFooter = styled.div`
  padding: ${theme.space[6]}px ${theme.space[5]}px ${theme.space[8]}px;
  max-width: ${theme.layout.maxWidth};
  margin: 0 auto;
  text-align: center;

  @media (max-width: 768px) {
    padding: ${theme.space[5]}px ${theme.space[4]}px ${theme.space[7]}px;
  }
`

const ViewAllLink = styled(Link)`
  display: inline-block;
  font-family: ${theme.fonts.body};
  font-size: ${theme.typography.body.size};
  font-weight: 500;
  color: ${theme.colors.text};
  text-decoration: none;
  border-bottom: 1px solid ${theme.colors.border};
  padding-bottom: 2px;
  transition: border-color ${theme.motion.duration} ${theme.motion.easing};

  &:hover {
    border-color: ${theme.colors.borderHover};
  }

  &:focus {
    outline: 2px solid ${theme.colors.accent};
    outline-offset: 4px;
  }
`

const PhotographySection = () => {
  const sectionRef = useRef(null)
  const titleRef = useRef(null)
  const containerRef = useRef(null)
  const photoRefs = useRef([])

  useEffect(() => {
    if (typeof window === 'undefined') return

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const photos = photoRefs.current.filter(Boolean)

    if (prefersReducedMotion) {
      photos.forEach((photo, i) => {
        gsap.set(photo, {
          opacity: i === photos.length - 1 ? 1 : 0
        })
      })
      return
    }

    // Pin the title while scrolling through photos
    ScrollTrigger.create({
      trigger: sectionRef.current,
      start: 'top 80px',
      end: `+=${(photos.length * 100) + 100}%`,
      pin: titleRef.current,
      pinSpacing: false,
      onUpdate: (self) => {
        if (self.isActive && titleRef.current) {
          titleRef.current.style.top = `${80 + theme.space[4]}px`
          // Change text color when image expands
          if (self.progress > 0.1) {
            titleRef.current.style.color = 'rgba(255, 255, 255, 0.9)'
          } else {
            titleRef.current.style.color = ''
          }
        }
      },
      onEnter: () => {
        if (titleRef.current) {
          titleRef.current.style.top = `${80 + theme.space[4]}px`
          // Remove background from pin-spacer after it's created
          setTimeout(() => {
            const pinSpacers = document.querySelectorAll('.pin-spacer')
            pinSpacers.forEach(spacer => {
              if (spacer.querySelector('h2')?.textContent?.toLowerCase().includes('photography')) {
                spacer.style.background = 'transparent'
              }
            })
          }, 100)
        }
      },
    })

    // Create pinned scroll animation for photos
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top 80px',
        end: `+=${photos.length * 100}%`,
        pin: true,
        scrub: 0.8,
      }
    })

    // Show first photo immediately
    tl.set(photos[0], { opacity: 1 })

    // Expand first photo to full viewport (overlapping the title)
    tl.to(photos[0], {
      width: '100vw',
      maxWidth: 'none',
      aspectRatio: 'auto',
      height: '100vh',
      top: '0',
      left: '0',
      xPercent: 0,
      yPercent: 0,
      borderRadius: 0,
      duration: 1,
      ease: 'power2.inOut',
    })

    // Hold expanded photo
    tl.to({}, { duration: 0.3 })

    // Crossfade between photos (all at full size)
    for (let i = 0; i < photos.length - 1; i++) {
      // Set next photo to full size before fading in
      tl.set(photos[i + 1], {
        width: '100vw',
        maxWidth: 'none',
        aspectRatio: 'auto',
        height: '100vh',
        top: '0',
        left: '0',
        xPercent: 0,
        yPercent: 0,
        borderRadius: 0,
      })

      tl.to(photos[i], {
        opacity: 0,
        duration: 1,
        ease: 'power2.inOut',
      })
      tl.to(photos[i + 1], {
        opacity: 1,
        duration: 1,
        ease: 'power2.inOut',
      }, '<')

      tl.to({}, { duration: 0.3 })
    }

    return () => {
      tl.kill()
      ScrollTrigger.getAll().forEach(trigger => {
        if (trigger.vars.trigger === containerRef.current ||
            trigger.vars.trigger === sectionRef.current) {
          trigger.kill()
        }
      })
    }
  }, [])

  return (
    <Section id="photography" ref={sectionRef}>
      <div style={{ 
        padding: `${theme.space[4]}px ${theme.space[5]}px`, 
        maxWidth: theme.layout.maxWidth, 
        margin: '0 auto',
        position: 'relative',
        zIndex: 10
      }}>
        <SectionTitle ref={titleRef}>Photography</SectionTitle>
      </div>

      <PhotoContainer ref={containerRef}>
        <PhotoStack>
          <PhotoFrame ref={el => photoRefs.current[0] = el}>
            <StaticImage
              src="../../images/DSCF2721.jpg"
              alt="Photography preview 1"
              placeholder="blurred"
              layout="fullWidth"
              aspectRatio={3/2}
              transformOptions={{ fit: "cover" }}
            />
          </PhotoFrame>
          <PhotoFrame ref={el => photoRefs.current[1] = el}>
            <StaticImage
              src="../../images/DSCF2770.jpg"
              alt="Photography preview 2"
              placeholder="blurred"
              layout="fullWidth"
              aspectRatio={3/2}
              transformOptions={{ fit: "cover" }}
            />
          </PhotoFrame>
          <PhotoFrame ref={el => photoRefs.current[2] = el}>
            <StaticImage
              src="../../images/DSCF2798.jpg"
              alt="Photography preview 3"
              placeholder="blurred"
              layout="fullWidth"
              aspectRatio={3/2}
              transformOptions={{ fit: "cover" }}
            />
          </PhotoFrame>
        </PhotoStack>
      </PhotoContainer>

      <SectionFooter>
        <ViewAllLink to="/photos/">View all photography</ViewAllLink>
      </SectionFooter>
    </Section>
  )
}

export default PhotographySection
