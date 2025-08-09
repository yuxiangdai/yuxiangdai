import React, { useState } from 'react'
import styled from 'styled-components'

import Layout from '../components/layout'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'
import { graphql } from 'gatsby'

const PhotosPageWrapper = styled.div`
  background: #0a0a0a;
  min-height: 100vh;
  overflow-x: hidden;
`

const GalleryContainer = styled.div`
  display: flex;
  overflow-x: auto;
  overflow-y: hidden;
  scroll-snap-type: x mandatory;
  scroll-behavior: smooth;
  height: calc(100vh - 80px);
  width: 100vw;
  position: fixed;
  top: 80px;
  left: 0;
  z-index: 1;
  
  /* Hide scrollbar completely for cleaner look */
  scrollbar-width: none;
  -ms-overflow-style: none;
  &::-webkit-scrollbar {
    display: none;
  }
`

const ImageSlide = styled.div`
  flex: none;
  width: 100vw;
  height: calc(100vh - 80px);
  scroll-snap-align: start;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  padding: 0;
  cursor: pointer;
  overflow: hidden;
  
  /* Ensure the container doesn't constrain child images */
  & > * {
    flex-shrink: 0;
  }
`

const StyledImage = styled(GatsbyImage)`
  width: 100vw !important;
  height: calc(100vh - 80px) !important;
  object-fit: contain !important;
  object-position: center !important;
  
  /* Override any Gatsby image default styles */
  & img {
    width: 100% !important;
    height: 100% !important;
    object-fit: contain !important;
    object-position: center !important;
  }
`

const Caption = styled.div`
  position: absolute;
  bottom: 3rem;
  left: 3rem;
  color: rgba(255, 255, 255, 0.8);
  background: rgba(0, 0, 0, 0.3);
  padding: 0.5rem 1rem;
  border-radius: 4px;
  backdrop-filter: blur(8px);
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  font-size: 0.8rem;
  font-weight: 300;
  letter-spacing: 0.05em;
  text-transform: lowercase;
`

const Lightbox = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.95);
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: ${props => props.isOpen ? 1 : 0};
  visibility: ${props => props.isOpen ? 'visible' : 'hidden'};
  transition: opacity 0.3s ease, visibility 0.3s ease;
`

const LightboxImage = styled(GatsbyImage)`
  max-width: 95vw;
  max-height: 95vh;
  object-fit: contain;
`

const CloseButton = styled.button`
  position: absolute;
  top: 2rem;
  right: 2rem;
  background: none;
  border: none;
  color: white;
  font-size: 2rem;
  cursor: pointer;
  opacity: 0.7;
  transition: opacity 0.2s ease;
  
  &:hover {
    opacity: 1;
  }
`

const NavigationButton = styled.button`
  position: fixed;
  top: 50%;
  transform: translateY(-50%);
  background: rgba(0, 0, 0, 0.5);
  border: 1px solid rgba(255, 255, 255, 0.2);
  color: white;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  cursor: pointer;
  z-index: 200;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0.7;
  transition: all 0.2s ease;
  font-size: 18px;
  
  &:hover {
    opacity: 1;
    background: rgba(0, 0, 0, 0.8);
  }
  
  ${props => props.direction === 'prev' ? 'left: 2rem;' : 'right: 2rem;'}
`

const CountdownContainer = styled.div`
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  z-index: 200;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: rgba(0, 0, 0, 0.4);
  padding: 0.5rem 0.8rem;
  border-radius: 20px;
  backdrop-filter: blur(8px);
  opacity: ${props => props.isVisible ? 0.8 : 0};
  transition: opacity 0.3s ease;
`

const CountdownBar = styled.div`
  width: 40px;
  height: 3px;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 2px;
  overflow: hidden;
  position: relative;
`

const CountdownProgress = styled.div`
  height: 100%;
  background: rgba(255, 255, 255, 0.8);
  border-radius: 2px;
  width: ${props => props.progress}%;
  transition: width 0.1s linear;
`

const CountdownText = styled.span`
  color: rgba(255, 255, 255, 0.8);
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  font-size: 0.7rem;
  font-weight: 300;
  letter-spacing: 0.05em;
  text-transform: lowercase;
`


export default function PhotosPage({ data }) {
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [lightboxImage, setLightboxImage] = useState(null)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAutoScrolling, setIsAutoScrolling] = useState(true)
  const [isPaused, setIsPaused] = useState(false)
  const [countdownProgress, setCountdownProgress] = useState(0)

  const photos = [
    { key: 'image1', caption: 'the black tusk, garibaldi provincial park, british columbia, canada' },
    { key: 'image2', caption: 'university of british columbia, vancouver, british columbia, canada' },
    { key: 'image3', caption: 'garibaldi provincial park, british columbia, canada' },
    { key: 'image4', caption: 'garibaldi provincial park, british columbia, canada' },
    { key: 'image5', caption: 'lands end trail, san francisco, california' },
  ]

  const openLightbox = (imageData, index) => {
    setLightboxImage(imageData)
    setCurrentIndex(index)
    setLightboxOpen(true)
  }

  const closeLightbox = () => {
    setLightboxOpen(false)
    setLightboxImage(null)
  }

  const scrollToImage = (index) => {
    const container = document.querySelector('.gallery-container')
    if (container) {
      container.scrollTo({
        left: index * window.innerWidth,
        behavior: 'smooth'
      })
    }
  }

  const navigatePrev = () => {
    if (currentIndex > 0) {
      const newIndex = currentIndex - 1
      setCurrentIndex(newIndex)
      scrollToImage(newIndex)
    }
  }

  const navigateNext = () => {
    const newIndex = currentIndex < photos.length - 1 ? currentIndex + 1 : 0
    setCurrentIndex(newIndex)
    scrollToImage(newIndex)
  }

  const pauseAutoScroll = () => {
    setIsPaused(true)
    setCountdownProgress(0)
    setTimeout(() => setIsPaused(false), 8000) // Resume after 8 seconds of inactivity
  }

  const handleManualNavigation = (direction) => {
    pauseAutoScroll()
    if (direction === 'prev') {
      navigatePrev()
    } else {
      navigateNext()
    }
  }

  // Auto-scroll timer effect
  React.useEffect(() => {
    if (!isAutoScrolling || isPaused || lightboxOpen) {
      setCountdownProgress(0)
      return
    }

    const duration = 5000 // 5 seconds
    const interval = 50 // Update every 50ms for smooth animation
    let elapsed = 0

    const timer = setInterval(() => {
      elapsed += interval
      const progress = (elapsed / duration) * 100
      setCountdownProgress(progress)

      if (elapsed >= duration) {
        navigateNext()
        setCountdownProgress(0)
        elapsed = 0
      }
    }, interval)

    return () => {
      clearInterval(timer)
      setCountdownProgress(0)
    }
  }, [currentIndex, isAutoScrolling, isPaused, lightboxOpen])

  // Handle keyboard navigation
  React.useEffect(() => {
    const handleKeydown = (e) => {
      if (e.key === 'Escape') {
        closeLightbox()
      }
      if (e.key === 'ArrowLeft') {
        handleManualNavigation('prev')
      }
      if (e.key === 'ArrowRight') {
        handleManualNavigation('next')
      }
      if (e.key === ' ') {
        e.preventDefault()
        setIsAutoScrolling(!isAutoScrolling)
      }
    }

    document.addEventListener('keydown', handleKeydown)

    if (lightboxOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }

    return () => {
      document.removeEventListener('keydown', handleKeydown)
      document.body.style.overflow = 'unset'
    }
  }, [lightboxOpen, currentIndex, isAutoScrolling])


  return (
    <PhotosPageWrapper>
      <Layout>
        <GalleryContainer
          className="gallery-container"
        >
          {photos.map(({ key, caption }, index) => {
            const imageData = data[key];

            return (
              <ImageSlide
                key={index}
                onClick={() => openLightbox(imageData, index)}
              >
                <StyledImage
                  image={getImage(imageData)}
                  alt={caption}
                />
                <Caption>{caption}</Caption>
              </ImageSlide>
            );
          })}
        </GalleryContainer>

        <NavigationButton
          direction="prev"
          onClick={() => handleManualNavigation('prev')}
          style={{ opacity: 0.7 }}
        >
          ←
        </NavigationButton>
        <NavigationButton
          direction="next"
          onClick={() => handleManualNavigation('next')}
          style={{ opacity: 0.7 }}
        >
          →
        </NavigationButton>

        <CountdownContainer isVisible={isAutoScrolling && !isPaused && !lightboxOpen}>
          <CountdownText>next</CountdownText>
          <CountdownBar>
            <CountdownProgress progress={countdownProgress} />
          </CountdownBar>
        </CountdownContainer>

        <Lightbox isOpen={lightboxOpen} onClick={closeLightbox}>
          <CloseButton onClick={closeLightbox}>×</CloseButton>
          {lightboxImage && (
            <LightboxImage
              image={getImage(lightboxImage)}
              alt="Full resolution"
              onClick={(e) => e.stopPropagation()}
            />
          )}
        </Lightbox>
      </Layout>
    </PhotosPageWrapper>
  )
}

export const query = graphql`
  query {
    image1: file(relativePath: { eq: "DSCF2721.jpg" }) {
      childImageSharp {
        gatsbyImageData(width: 1920, quality: 85, placeholder: NONE)
        original {
          width
          height
        }
      }
    }

    image2: file(relativePath: { eq: "DSCF1504.jpg" }) {
      childImageSharp {
        gatsbyImageData(width: 1920, quality: 85, placeholder: NONE)
        original {
          width
          height
        }
      }
    }

    image3: file(relativePath: { eq: "DSCF2770.jpg" }) {
      childImageSharp {
        gatsbyImageData(width: 1920, quality: 85, placeholder: NONE)
        original {
          width
          height
        }
      }
    }

    image4: file(relativePath: { eq: "DSCF2798.jpg" }) {
      childImageSharp {
        gatsbyImageData(width: 1920, quality: 85, placeholder: NONE)
        original {
          width
          height
        }
      }
    }

    image5: file(relativePath: { eq: "_DSC1603.jpg" }) {
      childImageSharp {
        gatsbyImageData(width: 1920, quality: 85, placeholder: NONE)
        original {
          width
          height
        }
      }
    }
  }
`
