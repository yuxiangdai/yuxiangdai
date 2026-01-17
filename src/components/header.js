import { Link } from 'gatsby'
import styled, { keyframes } from 'styled-components'
import PropTypes from 'prop-types'
import React from 'react'
import { theme } from '../styles/tokens'

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`

const Container = styled.header`
  background: rgba(10, 11, 14, 0.95);
  border-bottom: 1px solid rgba(255, 255, 255, 0.06);
  position: sticky;
  top: 0;
  z-index: ${theme.zIndex.nav};

  /* Entrance animation */
  animation: ${fadeIn} 0.6s ${theme.motion.easing} forwards;
`

const HeaderInner = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  max-width: ${theme.layout.maxWidthWide};
  margin: 0 auto;
  padding: ${theme.space[4]}px ${theme.space[5]}px;

  @media (max-width: 768px) {
    padding: ${theme.space[3]}px ${theme.space[4]}px;
  }
`

const SiteTitle = styled(Link)`
  font-family: ${theme.fonts.body};
  font-style: italic;
  font-size: 1.5rem;
  font-weight: 600;
  color: ${theme.colors.text};
  text-decoration: none;
  transition: color ${theme.motion.duration} ${theme.motion.easing};

  &:hover {
    color: ${theme.colors.textMuted};
  }
`

const Nav = styled.nav`
  display: flex;
  align-items: center;
  gap: ${theme.space[5]}px;

  @media (max-width: 768px) {
    gap: ${theme.space[4]}px;
  }
`

const NavLink = styled.a`
  font-family: ${theme.fonts.body};
  font-size: ${theme.typography.small.size};
  font-weight: 400;
  color: ${theme.colors.textMuted};
  text-decoration: none;
  transition: color ${theme.motion.duration} ${theme.motion.easing};

  &:hover {
    color: ${theme.colors.text};
  }

  &:focus {
    outline: 2px solid ${theme.colors.accent};
    outline-offset: 4px;
  }
`

const NavLinkGatsby = styled(Link)`
  font-family: ${theme.fonts.body};
  font-size: ${theme.typography.small.size};
  font-weight: 400;
  color: ${theme.colors.textMuted};
  text-decoration: none;
  transition: color ${theme.motion.duration} ${theme.motion.easing};

  &:hover {
    color: ${theme.colors.text};
  }

  &:focus {
    outline: 2px solid ${theme.colors.accent};
    outline-offset: 4px;
  }
`

const Header = ({ siteTitle }) => (
  <Container>
    <HeaderInner>
      <SiteTitle to="/#hero">{siteTitle}</SiteTitle>
      <Nav>
        <NavLink href="/#work">Work</NavLink>
        <NavLink href="/#photography">Photography</NavLink>
        <NavLink href="/#about">About</NavLink>
        <NavLinkGatsby to="/resume/">Resume</NavLinkGatsby>
      </Nav>
    </HeaderInner>
  </Container>
)

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: '',
}

export default Header
