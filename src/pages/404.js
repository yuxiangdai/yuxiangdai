import React from 'react'
import Layout from '../components/layout'
import styled from 'styled-components'
import { Link } from 'gatsby'

const crimsonText = "'Crimson Text', Georgia, 'Times New Roman', serif"

const Container = styled.div`
  background: #090909;
  color: #f4f1ea;
  font-family: ${crimsonText};
  min-height: 100vh;
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
`

const NotFoundTitle = styled.h1`
  margin: 0 0 1rem;
  color: #f4f1ea;
  font-family: ${crimsonText};
  font-size: clamp(4rem, 12vw, 8rem);
  font-weight: 400;
  line-height: 0.95;
  letter-spacing: -0.03em;
`

const NotFoundText = styled.p`
  margin: 0 0 2rem;
  color: rgba(244, 241, 234, 0.78);
  font-family: ${crimsonText};
  font-size: clamp(1.1rem, 1.6vw, 1.4rem);
  line-height: 1.45;
`

const HomeLink = styled(Link)`
  color: #f4f1ea;
  font-family: ${crimsonText};
  font-size: clamp(1.1rem, 1.5vw, 1.4rem);
  text-decoration: underline;
  text-underline-offset: 0.12em;
  transition: opacity 160ms ease;

  &:hover,
  &:focus-visible {
    opacity: 0.72;
  }
`

const NotFoundPage = () => (
  <Layout pageTitle="page not found">
    <Container>
      <NotFoundTitle>404</NotFoundTitle>
      <NotFoundText>
        You just hit a route that doesn&#39;t exist... the sadness.
      </NotFoundText>
      <HomeLink to="/">back to home</HomeLink>
    </Container>
  </Layout>
)

export default NotFoundPage
