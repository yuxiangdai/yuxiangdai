import React from 'react'
import styled from 'styled-components'
import { Link } from 'gatsby'
import { StaticImage } from 'gatsby-plugin-image'
import { theme } from '../../styles/tokens'

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
`

const PhotoGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: ${theme.space[4]}px;

  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
  }
`

const PhotoCard = styled.div`
  position: relative;
  aspect-ratio: 4 / 5;
  overflow: hidden;
  border-radius: ${theme.radius.md};

  .gatsby-image-wrapper {
    width: 100%;
    height: 100%;
  }

  img {
    transition: transform ${theme.motion.duration} ${theme.motion.easing};
  }

  &:hover img {
    transform: scale(1.02);
  }

  @media (prefers-reduced-motion: reduce) {
    &:hover img {
      transform: none;
    }
  }
`

const ViewAllLink = styled(Link)`
  display: inline-block;
  margin-top: ${theme.space[6]}px;
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

const PhotographySection = () => (
  <Section id="photography">
    <SectionTitle>Photography</SectionTitle>
    <PhotoGrid>
      <PhotoCard>
        <StaticImage
          src="../../images/DSCF2721.jpg"
          alt="Photography preview"
          placeholder="blurred"
          layout="fullWidth"
          aspectRatio={4/5}
          transformOptions={{ fit: "cover" }}
        />
      </PhotoCard>
      <PhotoCard>
        <StaticImage
          src="../../images/DSCF2770.jpg"
          alt="Photography preview"
          placeholder="blurred"
          layout="fullWidth"
          aspectRatio={4/5}
          transformOptions={{ fit: "cover" }}
        />
      </PhotoCard>
      <PhotoCard>
        <StaticImage
          src="../../images/DSCF2798.jpg"
          alt="Photography preview"
          placeholder="blurred"
          layout="fullWidth"
          aspectRatio={4/5}
          transformOptions={{ fit: "cover" }}
        />
      </PhotoCard>
    </PhotoGrid>
    <ViewAllLink to="/photos/">View all photography</ViewAllLink>
  </Section>
)

export default PhotographySection
