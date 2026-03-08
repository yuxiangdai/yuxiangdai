import React, { useState } from 'react'
import styled from 'styled-components'

import Layout from '../components/layout'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'
import { graphql } from 'gatsby'

const crimsonTextSemibold = "'Crimson Text', Georgia, 'Times New Roman', serif"

const PhotosPageWrapper = styled.div`
  background: #0a0a0a;
  min-height: 100vh;
  overflow: hidden;
  position: relative;
`

const GalleryContainer = styled.div`
  display: flex;
  overflow-x: auto;
  overflow-y: hidden;
  scroll-snap-type: x mandatory;
  scroll-behavior: smooth;
  height: 100vh;
  width: 100vw;
  position: relative;
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
  height: 100vh;
  scroll-snap-align: start;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  padding: 2rem 2rem 4.5rem;
  overflow: hidden;
  
  /* Ensure the container doesn't constrain child images */
  & > * {
    flex-shrink: 0;
  }

  @media (max-width: 700px) {
    padding: 1rem 1rem 4.75rem;
  }
`

const StyledImage = styled(GatsbyImage)`
  max-width: min(94vw, 1800px) !important;
  max-height: calc(100vh - 6.5rem) !important;
  width: auto !important;
  height: auto !important;

  img {
    object-fit: contain !important;
    object-position: center !important;
  }

  @media (max-width: 700px) {
    max-width: calc(100vw - 2rem) !important;
    max-height: calc(100vh - 6rem) !important;
  }
`

const Caption = styled.div`
  position: absolute;
  bottom: 3rem;
  left: 3rem;
  color: rgba(255, 255, 255, 0.8);
  font-family: ${crimsonTextSemibold};
  font-size: 0.8rem;
  font-weight: 400;
  letter-spacing: 0.05em;
  text-transform: lowercase;
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
  font-family: ${crimsonTextSemibold};
  font-size: 0.7rem;
  font-weight: 400;
  letter-spacing: 0.05em;
  text-transform: lowercase;
`

export default function PhotosPage({ data }) {
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
    if (!isAutoScrolling || isPaused) {
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
  }, [currentIndex, isAutoScrolling, isPaused])

  // Handle keyboard navigation
  React.useEffect(() => {
    const handleKeydown = (e) => {
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

    return () => {
      document.removeEventListener('keydown', handleKeydown)
    }
  }, [currentIndex, isAutoScrolling])


  return (
    <PhotosPageWrapper>
  <Layout showHeader={false}>
        <GalleryContainer
          className="gallery-container"
        >
          {photos.map(({ key, caption }, index) => {
            const imageData = data[key];

            return (
              <ImageSlide
                key={index}
              >
                <StyledImage
                  image={getImage(imageData)}
                  alt={caption}
                  loading={index === 0 ? 'eager' : 'lazy'}
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

        <CountdownContainer isVisible={isAutoScrolling && !isPaused}>
          <CountdownText>next</CountdownText>
          <CountdownBar>
            <CountdownProgress progress={countdownProgress} />
          </CountdownBar>
        </CountdownContainer>
      </Layout>
    </PhotosPageWrapper>
  )
}

export const query = graphql`
  query {
    image1: file(relativePath: { eq: "DSCF2721.jpg" }) {
      childImageSharp {
        gatsbyImageData(
          layout: CONSTRAINED
          width: 1800
          quality: 72
          placeholder: BLURRED
          formats: [AUTO, WEBP, AVIF]
        )
      }
    }

    image2: file(relativePath: { eq: "DSCF1504.jpg" }) {
      childImageSharp {
        gatsbyImageData(
          layout: CONSTRAINED
          width: 1800
          quality: 72
          placeholder: BLURRED
          formats: [AUTO, WEBP, AVIF]
        )
      }
    }

    image3: file(relativePath: { eq: "DSCF2770.jpg" }) {
      childImageSharp {
        gatsbyImageData(
          layout: CONSTRAINED
          width: 1800
          quality: 72
          placeholder: BLURRED
          formats: [AUTO, WEBP, AVIF]
        )
      }
    }

    image4: file(relativePath: { eq: "DSCF2798.jpg" }) {
      childImageSharp {
        gatsbyImageData(
          layout: CONSTRAINED
          width: 1800
          quality: 72
          placeholder: BLURRED
          formats: [AUTO, WEBP, AVIF]
        )
      }
    }

    image5: file(relativePath: { eq: "_DSC1603.jpg" }) {
      childImageSharp {
        gatsbyImageData(
          layout: CONSTRAINED
          width: 1800
          quality: 72
          placeholder: BLURRED
          formats: [AUTO, WEBP, AVIF]
        )
      }
    }
  }
`
