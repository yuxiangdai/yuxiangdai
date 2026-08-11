import React from 'react'
import { Link } from 'gatsby'
import Helmet from 'react-helmet'
import styled from 'styled-components'
import Layout from '../../components/layout'

const serif = "'Crimson Text', Georgia, 'Times New Roman', serif"
const sans =
  "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif"

const ArticleShell = styled.div`
  --ink: #11110f;
  --paper: #d8d8d6;
  --night: #090909;
  min-height: 100vh;
  background: var(--night);
  color: var(--ink);
`

const TopBar = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
  max-width: 92rem;
  margin: 0 auto;
  padding: 1.2rem clamp(1.25rem, 4vw, 3.5rem);
  color: #f4f1ea;
  font-family: ${serif};
`

const NavLink = styled(Link)`
  color: inherit;
  font-size: 1.1rem;
  text-decoration: none;

  &:hover,
  &:focus-visible {
    opacity: 0.7;
  }
`

const SectionLink = styled(NavLink)`
  color: rgba(244, 241, 234, 0.68);
  font-size: 1rem;

  &:hover,
  &:focus-visible {
    color: #f4f1ea;
  }
`

const Paper = styled.article`
  width: min(100% - clamp(1rem, 4vw, 4rem), 92rem);
  margin: 0 auto clamp(1rem, 4vw, 4rem);
  background: var(--paper);
  box-shadow: 0 32px 100px rgba(0, 0, 0, 0.34);
`

const Hero = styled.header`
  display: flex;
  align-items: flex-end;
  min-height: clamp(18rem, 38vh, 27rem);
  padding: clamp(1.5rem, 4vw, 4rem);
  border-bottom: 1px solid rgba(17, 17, 15, 0.24);
`

const Title = styled.h1`
  margin: 0;
  color: var(--ink);
  font-family: ${serif};
  font-size: clamp(4rem, 10vw, 10rem);
  font-weight: 400;
  letter-spacing: -0.06em;
  line-height: 0.78;
`

const ArticleBody = styled.div`
  display: grid;
  grid-template-columns: minmax(9rem, 0.28fr) minmax(0, 1fr);
  gap: clamp(2rem, 7vw, 8rem);
  padding: clamp(2.5rem, 5vw, 5rem) clamp(1.5rem, 9vw, 10rem)
    clamp(4rem, 9vw, 9rem);

  @media (max-width: 720px) {
    grid-template-columns: 1fr;
    gap: 2.5rem;
  }
`

const ArticleMeta = styled.aside`
  font-family: ${sans};
  font-size: 0.72rem;
  line-height: 1.5;
  letter-spacing: 0.08em;
  text-transform: uppercase;
`

const MetaLabel = styled.span`
  display: block;
  margin-bottom: 0.25rem;
  color: rgba(17, 17, 15, 0.52);
`

const MetaValue = styled.p`
  margin: 0 0 1.5rem;
  color: var(--ink);
  line-height: inherit;
`

const Prose = styled.div`
  max-width: 42rem;

  p {
    margin: 0 0 1.45em;
    color: var(--ink);
    font-family: ${serif};
    font-size: clamp(1.2rem, 1.7vw, 1.5rem);
    line-height: 1.45;
  }

  p:first-child::first-letter {
    float: left;
    margin: 0.08em 0.1em 0 0;
    font-size: 2.8em;
    line-height: 0.72;
  }
`

const ArticleFooter = styled.footer`
  display: flex;
  justify-content: space-between;
  gap: 1rem;
  padding: 1.5rem clamp(1.5rem, 5vw, 5.5rem);
  border-top: 1px solid rgba(17, 17, 15, 0.24);
  font-family: ${serif};
`

const FooterLink = styled(Link)`
  color: var(--ink);
  text-decoration: none;

  &:hover,
  &:focus-visible {
    opacity: 0.65;
  }
`

const HelloWorldPage = () => (
  <Layout showHeader={false}>
    <Helmet>
      <title>Hello World — Yuxiang Dai</title>
      <meta
        name="description"
        content="An introduction to my personal blog and my transition into research engineering."
      />
    </Helmet>
    <ArticleShell>
      <TopBar aria-label="Article navigation">
        <NavLink to="/">Yuxiang Dai</NavLink>
        <SectionLink to="/#blog">Blog</SectionLink>
      </TopBar>

      <Paper>
        <Hero>
          <Title>Hello World</Title>
        </Hero>

        <ArticleBody>
          <ArticleMeta>
            <MetaLabel>Published</MetaLabel>
            <MetaValue>August 8, 2026</MetaValue>
            <MetaLabel>By</MetaLabel>
            <MetaValue>Yuxiang Dai</MetaValue>
          </ArticleMeta>

          <Prose>
            <p>Hello world! This is my new personal blog.</p>
            <p>
              I&apos;ve recently started a new role at Symbolica as a research
              engineer. This is a place for me to document my transition into
              research engineering and all the things I explore along the way.
            </p>
          </Prose>
        </ArticleBody>

        <ArticleFooter>
          <FooterLink to="/">← Home</FooterLink>
          <FooterLink to="/#blog">All Writing ↑</FooterLink>
        </ArticleFooter>
      </Paper>
    </ArticleShell>
  </Layout>
)

export default HelloWorldPage
