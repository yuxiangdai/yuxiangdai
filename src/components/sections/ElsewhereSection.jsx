import React from 'react'
import styled from 'styled-components'
import { theme } from '../../styles/tokens'

const Section = styled.section`
  padding: ${theme.space[8]}px ${theme.space[5]}px ${theme.space[8]}px;
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
  margin: 0 0 ${theme.space[5]}px 0;
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

const ElsewhereSection = () => (
  <Section id="elsewhere">
    <SectionTitle>Elsewhere</SectionTitle>
    <LinksContainer>
      {links.map((link) => (
        <ExternalLink
          key={link.name}
          href={link.url}
          target="_blank"
          rel="noopener noreferrer"
        >
          {link.name}
        </ExternalLink>
      ))}
    </LinksContainer>
  </Section>
)

export default ElsewhereSection
