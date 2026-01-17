import React from 'react'
import styled, { keyframes, css } from 'styled-components'
import { Link } from 'gatsby'
import { theme } from '../../styles/tokens'
import useInView from '../useInView'

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
  ${props => props.$inView && css`
    animation: ${fadeInUp} 0.6s ${theme.motion.easing} forwards;
  `}
`

const BioText = styled.div`
  max-width: 640px;

  p {
    font-family: ${theme.fonts.body};
    font-size: ${theme.typography.body.size};
    line-height: ${theme.typography.body.lineHeight};
    color: ${theme.colors.textMuted};
    margin: 0 0 ${theme.space[4]}px 0;

    &:last-child {
      margin-bottom: 0;
    }

    /* Staggered entrance animation */
    opacity: 0;
    ${props => props.$inView && css`
      animation: ${fadeInUp} 0.6s ${theme.motion.easing} forwards;
    `}

    &:nth-child(1) { animation-delay: 0.1s; }
    &:nth-child(2) { animation-delay: 0.2s; }
    &:nth-child(3) { animation-delay: 0.3s; }
    &:nth-child(4) { animation-delay: 0.4s; }
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
  const [ref, isInView] = useInView({ threshold: 0.1 })

  return (
    <Section id="about" ref={ref}>
      <SectionTitle $inView={isInView}>About</SectionTitle>
      <BioText $inView={isInView}>
        <p>
          I currently work at Symbolica AI.
        </p>
        <p>
          I was previously working on generative AI products at Ideogram and Supply Chain Forecasting at Amazon.
        </p>
        <p>
          I studied Robotics Engineering at the University of Toronto's Engineering Science program.
        </p>
        <p>
          Outside of work, I enjoy <StyledLink to="/photos/">photography</StyledLink>, hiking, classical music and visiting art museums.
        </p>
      </BioText>
    </Section>
  )
}

export default AboutSection
