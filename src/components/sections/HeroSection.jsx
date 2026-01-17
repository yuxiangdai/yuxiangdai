import React from 'react'
import styled, { keyframes } from 'styled-components'
import { theme } from '../../styles/tokens'

// Entrance animations
const fadeInUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`

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

  /* Entrance animation */
  opacity: 0;
  animation: ${fadeInUp} 0.8s ${theme.motion.easing} forwards;
  animation-delay: 0.1s;
`

const Subtitle = styled.p`
  font-family: ${theme.fonts.body};
  font-size: ${theme.typography.body.size};
  font-weight: ${theme.typography.body.weight};
  line-height: ${theme.typography.body.lineHeight};
  color: ${theme.colors.textMuted};
  margin: 0 0 ${theme.space[3]}px 0;
  max-width: 540px;

  /* Entrance animation */
  opacity: 0;
  animation: ${fadeInUp} 0.8s ${theme.motion.easing} forwards;
  animation-delay: 0.25s;
`

const Microline = styled.p`
  font-family: ${theme.fonts.body};
  font-size: ${theme.typography.small.size};
  font-weight: ${theme.typography.small.weight};
  line-height: ${theme.typography.small.lineHeight};
  color: ${theme.colors.textMuted};
  margin: 0;

  /* Entrance animation */
  opacity: 0;
  animation: ${fadeIn} 0.8s ${theme.motion.easing} forwards;
  animation-delay: 0.45s;
`

const HeroSection = () => (
  <Section id="hero">
    <Name>Yuxiang Dai</Name>
    <Subtitle>
      Senior software engineer working on systems, agents, and thoughtful tools.
    </Subtitle>
    <Microline>San Francisco · Symbolica AI · ex-Amazon</Microline>
  </Section>
)

export default HeroSection
