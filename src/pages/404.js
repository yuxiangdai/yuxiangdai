import React from 'react'
import Layout from '../components/layout'
import styled from 'styled-components'
import { theme } from '../styles/tokens'
import { Link } from 'gatsby'

const Container = styled.div`
  padding: ${theme.space[8]}px ${theme.space[5]}px;
  max-width: ${theme.layout.maxWidth};
  margin: 0 auto;
  text-align: center;
  min-height: 70vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

const NotFoundTitle = styled.h1`
  font-family: ${theme.fonts.display};
  font-size: ${theme.typography.h1.size};
  font-weight: 700;
  color: ${theme.colors.text};
  margin-bottom: ${theme.space[4]}px;
  line-height: ${theme.typography.h1.lineHeight};
`

const NotFoundText = styled.p`
  font-family: ${theme.fonts.body};
  font-size: ${theme.typography.body.size};
  color: ${theme.colors.textMuted};
  margin-bottom: ${theme.space[6]}px;
  line-height: ${theme.typography.body.lineHeight};
`

const HomeLink = styled(Link)`
  font-family: ${theme.fonts.body};
  font-size: ${theme.typography.body.size};
  color: ${theme.colors.accent};
  text-decoration: none;
  padding: ${theme.space[3]}px ${theme.space[5]}px;
  border: 2px solid ${theme.colors.accent};
  border-radius: ${theme.radius.md};
  transition: all ${theme.motion.duration} ${theme.motion.easing};
  
  &:hover {
    color: ${theme.colors.text};
    border-color: ${theme.colors.borderHover};
    transform: translateY(-2px);
  }
`

const NotFoundPage = () => (
  <Layout>
    <Container>
      <NotFoundTitle>404</NotFoundTitle>
      <NotFoundText>You just hit a route that doesn&#39;t exist... the sadness.</NotFoundText>
      <HomeLink to="/">Go Home</HomeLink>
    </Container>
  </Layout>
)

export default NotFoundPage
