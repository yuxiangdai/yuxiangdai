import React from 'react'
import { Link } from 'gatsby'
import Helmet from 'react-helmet'
import styled from 'styled-components'
import Layout from './layout'
import AlpineBackground from './alpine-background'

const Shell = styled.div`
  --ink: #f5f4ec;
  --gutter: clamp(1.25rem, 2.65vw, 3.5rem);
  position: relative;
  isolation: isolate;
  min-height: 100svh;
  padding: 0 var(--gutter) 3rem;
  color: var(--ink);
  font-family: 'Crimson Text', Georgia, 'Times New Roman', serif;
  letter-spacing: -0.015em;

  h1,
  h2,
  p {
    margin: 0;
    color: inherit;
    letter-spacing: inherit;
  }
  h2 {
    font-family: inherit;
    font-weight: 400;
  }
  a {
    color: inherit;
    text-decoration: none;
  }
  a:hover,
  [aria-current='page'] {
    text-decoration: underline;
    text-underline-offset: 0.2em;
  }
  a:focus-visible {
    outline: 2px solid currentColor;
    outline-offset: 6px;
  }
`

const TopBar = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 0.5rem 2rem;
  padding: 0.8rem 0 0.3rem;
  font-size: clamp(1.1rem, 1.4vw, 1.4rem);
  line-height: 1.3;
  text-shadow: 0 1px 8px #10232b;
  nav {
    display: flex;
    gap: clamp(1.25rem, 2.2vw, 2.5rem);
  }
  a {
    display: inline-block;
    padding: 0.25rem 0;
  }
  @media (max-width: 760px) {
    padding: 1rem 0 0.5rem;
    font-size: 1rem;
    nav {
      gap: 1rem;
    }
  }
`

const SiteName = styled(Link)`
  font-family: 'Inter', 'Helvetica Neue', sans-serif;
  font-weight: 400;
  letter-spacing: -0.075em;
`

const Content = styled.div`
  width: min(100%, 54rem);
  margin: clamp(2rem, 7svh, 5rem) auto 0;
  h1 {
    margin-bottom: clamp(1.5rem, 4svh, 3rem);
    font-family: 'Inter', 'Helvetica Neue', sans-serif;
    font-size: clamp(3rem, 7vw, 5.5rem);
    font-weight: 400;
    line-height: 1.08;
    letter-spacing: -0.075em;
  }
`

export const AlpinePanel = styled.div`
  padding: clamp(1.5rem, 4vw, 3rem);
  background: rgba(24, 48, 59, 0.96);
  box-shadow: 0 4px 18px rgba(5, 16, 22, 0.24);
`

const AlpinePage = ({ title, description, children }) => (
  <Layout showHeader={false}>
    <Helmet>
      <title>{title} — Yuxiang Dai</title>
      <meta name="description" content={description} />
    </Helmet>
    <Shell>
      <AlpineBackground />
      <TopBar>
        <SiteName to="/">Yuxiang Dai</SiteName>
        <nav aria-label="Main navigation">
          <Link to="/photos/">Photography</Link>
          <Link to="/writing/">Writing</Link>
          <Link to="/about/">About</Link>
        </nav>
      </TopBar>
      <Content>
        <h1>{title}</h1>
        <AlpinePanel>{children}</AlpinePanel>
      </Content>
    </Shell>
  </Layout>
)

export default AlpinePage
