import React from 'react'
import { Link } from 'gatsby'
import Helmet from 'react-helmet'
import styled from 'styled-components'
import Layout from '../components/layout'

const serif = "'Crimson Text', Georgia, 'Times New Roman', serif"

const PageShell = styled.div`
  --ink: #11110f;
  --paper: #d8d8d6;
  --muted: #52524e;
  --gutter: clamp(1.25rem, 4vw, 3.5rem);
  min-height: 100svh;
  padding-bottom: var(--gutter);
  background: #090909;
  color: var(--ink);
  font-family: ${serif};
  letter-spacing: -0.015em;

  h1,
  h2,
  p {
    margin: 0;
    color: inherit;
    font-family: inherit;
    letter-spacing: inherit;
  }

  a {
    color: inherit;
    text-decoration: none;
  }

  a:hover {
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
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 1rem 2rem;
  max-width: 92rem;
  margin: 0 auto;
  padding: 1.2rem var(--gutter);
  color: #f4f1ea;
  font-size: 1.15rem;

  nav {
    display: flex;
    flex-wrap: wrap;
    gap: 1rem clamp(1rem, 2.2vw, 2.5rem);
  }

  [aria-current='page'] {
    text-decoration: underline;
    text-underline-offset: 0.2em;
  }
`

const Paper = styled.div`
  width: min(100% - clamp(1rem, 4vw, 4rem), 92rem);
  min-height: calc(100svh - 8rem);
  margin: 0 auto;
  padding: clamp(2rem, 6vw, 6rem) clamp(1.5rem, 6vw, 6rem);
  background: var(--paper);
`

const Introduction = styled.header`
  padding-bottom: clamp(3rem, 7vw, 6rem);

  h1 {
    font-size: clamp(4rem, 9vw, 8rem);
    font-weight: 400;
    letter-spacing: -0.055em;
    line-height: 0.9;
  }
`

const EssayList = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;
`

const Essay = styled.article`
  display: grid;
  grid-template-columns: minmax(8rem, 0.3fr) minmax(0, 1fr);
  gap: 1.25rem clamp(2rem, 5vw, 5rem);
  padding: clamp(1.75rem, 3.5vw, 3rem) 0;
  border-top: 1px solid #92928c;

  time {
    padding-top: 0.35rem;
    color: var(--muted);
    font-size: 1rem;
    line-height: 1.5;
  }

  h2 {
    max-width: 20ch;
    font-size: clamp(2rem, 3.7vw, 3.5rem);
    font-weight: 400;
    letter-spacing: -0.035em;
    line-height: 1.05;
  }

  .subtitle {
    margin-top: 0.75rem;
    font-size: clamp(1.2rem, 2vw, 1.5rem);
    line-height: 1.3;
  }

  .read-essay {
    display: inline-block;
    margin-top: 1.5rem;
    font-size: 1.15rem;
    text-decoration: underline;
    text-underline-offset: 0.2em;
  }

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
`

const WritingPage = () => (
  <Layout showHeader={false}>
    <Helmet>
      <title>Writing — Yuxiang Dai</title>
      <meta
        name="description"
        content="Essays by Yuxiang Dai, including Linear and Sparse Attention, featuring Kimi and DeepSeek."
      />
    </Helmet>
    <PageShell>
      <TopBar>
        <Link to="/">Yuxiang Dai</Link>
        <nav aria-label="Main navigation">
          <Link to="/photos/">Photography</Link>
          <Link to="/writing/" aria-current="page">
            Writing
          </Link>
          <Link to="/#about">About</Link>
        </nav>
      </TopBar>
      <Paper>
        <Introduction>
          <h1>Writing</h1>
        </Introduction>
        <EssayList aria-label="Essays">
          <li>
            <Essay aria-labelledby="attention-title">
              <time dateTime="2026-08-08">August 8, 2026</time>
              <div>
                <h2 id="attention-title">
                  <Link to="/blog/linear-and-sparse-attention/">
                    Linear and Sparse Attention
                  </Link>
                </h2>
                <p className="subtitle">Featuring Kimi and DeepSeek</p>
                <Link
                  className="read-essay"
                  to="/blog/linear-and-sparse-attention/"
                >
                  Read essay
                </Link>
              </div>
            </Essay>
          </li>
        </EssayList>
      </Paper>
    </PageShell>
  </Layout>
)

export default WritingPage
