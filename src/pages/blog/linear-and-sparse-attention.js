import React from 'react'
import { Link } from 'gatsby'
import Helmet from 'react-helmet'
import styled from 'styled-components'
import Layout from '../../components/layout'

const serif = "'Crimson Text', Georgia, 'Times New Roman', serif"
const sans = "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif"

const ArticleShell = styled.div`
  --ink: #11110f;
  --paper: #d8d8d6;
  --paper-deep: #c9c9c6;
  --night: #090909;
  --night-soft: #777773;
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

const HomeLink = styled(Link)`
  color: inherit;
  font-size: 1.15rem;
  text-decoration: none;

  &:hover,
  &:focus-visible {
    opacity: 0.7;
  }
`

const SectionLink = styled(Link)`
  color: rgba(244, 241, 234, 0.68);
  font-size: 1rem;
  text-decoration: none;

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
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(13rem, 0.32fr);
  min-height: clamp(20rem, 42vh, 30rem);
  border-bottom: 1px solid rgba(17, 17, 15, 0.24);

  @media (max-width: 760px) {
    grid-template-columns: 1fr;
    min-height: auto;
  }
`

const HeroCopy = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding: clamp(1.5rem, 4vw, 4rem);

  @media (max-width: 760px) {
    min-height: 17rem;
  }
`

const TitleGroup = styled.div`
  width: 100%;
  margin: 0;
  text-align: left;
`

const Title = styled.h1`
  max-width: 12ch;
  margin: 0;
  color: var(--ink);
  font-family: ${serif};
  font-size: clamp(3rem, 6.5vw, 7rem);
  font-weight: 400;
  letter-spacing: -0.055em;
  line-height: 0.78;
  text-align: left;
`

const Subtitle = styled.p`
  margin: 1.4rem 0 0;
  color: var(--ink);
  font-family: ${serif};
  font-size: clamp(1.25rem, 2vw, 2rem);
  line-height: 1.1;
`

const AttentionMap = styled.div`
  position: relative;
  display: grid;
  grid-template-rows: repeat(12, 1fr);
  min-height: 100%;
  overflow: hidden;
  border-left: 1px solid rgba(17, 17, 15, 0.24);
  background:
    radial-gradient(circle, var(--ink) 0 1.6px, transparent 1.9px) 0 0 / 18px 18px,
    var(--paper-deep);

  &::after {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(
      135deg,
      transparent 0 37%,
      rgba(201, 201, 198, 0.94) 37% 49%,
      transparent 49% 53%,
      rgba(201, 201, 198, 0.98) 53% 67%,
      transparent 67%
    );
  }

  @media (max-width: 760px) {
    min-height: 9rem;
    border-top: 1px solid rgba(17, 17, 15, 0.24);
    border-left: 0;
  }
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
    font-size: clamp(1.05rem, 1.2vw, 1.18rem);
    line-height: 1.5;
    letter-spacing: 0;
  }

  a {
    color: inherit;
    text-decoration-thickness: 1px;
    text-underline-offset: 0.14em;
  }

  a:hover,
  a:focus-visible {
    opacity: 0.65;
  }

  p:first-child::first-letter {
    float: left;
    margin: 0.08em 0.1em 0 0;
    font-size: 4.1em;
    line-height: 0.72;
  }

  h2 {
    margin: 2.2em 0 0.65em;
    color: var(--ink);
    font-family: ${serif};
    font-size: clamp(2rem, 3.5vw, 3.2rem);
    font-weight: 400;
    letter-spacing: -0.035em;
    line-height: 0.95;
  }

  ul {
    margin: -0.45rem 0 1.8rem;
    padding-left: 1.2rem;
    color: var(--ink);
    font-family: ${serif};
    font-size: clamp(1.05rem, 1.2vw, 1.18rem);
    line-height: 1.5;
  }

  li {
    padding-left: 0.35rem;
  }

  li + li {
    margin-top: 0.55rem;
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

const LinearAndSparseAttentionPage = () => (
  <Layout showHeader={false}>
    <Helmet>
      <title>Linear and Sparse Attention — Yuxiang Dai</title>
      <meta
        name="description"
        content="Linear and Sparse Attention, featuring Kimi and Deepseek."
      />
    </Helmet>
    <ArticleShell>
      <TopBar aria-label="Article navigation">
        <HomeLink to="/">Yuxiang Dai</HomeLink>
        <SectionLink to="/#blog">Blog</SectionLink>
      </TopBar>

      <Paper>
        <Hero>
          <HeroCopy>
            <TitleGroup>
              <Title>Linear and Sparse Attention</Title>
              <Subtitle>Featuring Kimi and DeepSeek</Subtitle>
            </TitleGroup>
          </HeroCopy>
          <AttentionMap aria-hidden="true" />
        </Hero>

        <ArticleBody>
          <ArticleMeta>
            <MetaLabel>Published</MetaLabel>
            <MetaValue>August 8, 2026</MetaValue>
            <MetaLabel>By</MetaLabel>
            <MetaValue>Yuxiang Dai</MetaValue>
          </ArticleMeta>

          <Prose>
            <p>
              Attention is at the heart of LLMs, and (as with human nature) we are
              always finding ways to become more efficient with our attention.
            </p>
            <p>
              Linear and sparse attention are two approaches to improving the
              efficiency of LLMs that have recently been popularized by two
              open-source models. Kimi focuses on linear attention with Kimi
              Delta Attention (KDA), whereas DeepSeek has introduced an improved
              sparse-attention mechanism with DeepSeek Sparse Attention (DSA).
            </p>
            <h2>Kimi Delta Attention</h2>
            <p>
              <a
                href="https://www.kimi.com/blog/kimi-k3"
                target="_blank"
                rel="noreferrer"
              >
                Kimi K3
              </a>{' '}
              has recently taken the spotlight as a frontier-approaching open
              source model scaled to 2.8T parameters, with Kimi Delta Attention
              at its heart.
            </p>
            <p>
              Kimi Delta Attention builds on a lineage of linear-attention
              variants that the authors map out in their previous paper,{' '}
              <a
                href="https://arxiv.org/abs/2510.26692"
                target="_blank"
                rel="noreferrer"
              >
                Kimi Linear
              </a>
              . The progression runs from DeltaNet to GatedDeltaNet, and then to
              Kimi Delta Attention.
            </p>
            <h2>DeepSeek Sparse Attention</h2>
            <p>
              Sparse attention is another approach to solving the quadratic
              attention problem. In its simplest form, sparse attention can be
              thought of as a sliding window or filter on the global attention
              mechanism.
            </p>
            <p>
              DeepSeek Sparse Attention (DSA), introduced with{' '}
              <a
                href="https://arxiv.org/abs/2512.02556"
                target="_blank"
                rel="noreferrer"
              >
                DeepSeek-V3.2
              </a>
              , uses a two-stage pipeline:
            </p>
            <ul>
              <li>Lightning indexer: score all tokens for relevance.</li>
              <li>
                Top-k selection: compute attention using only the highest-scoring
                tokens.
              </li>
            </ul>
            <p>
              The increased complexity of sparse selection allows the model to
              learn more context-aware filtering procedures while retaining
              quality.
            </p>

            <h2>DSA in Other Contexts: GLM 5.2</h2>
            <p>
              <a
                href="https://z.ai/blog/glm-5.2"
                target="_blank"
                rel="noreferrer"
              >
                GLM 5.2
              </a>{' '}
              is another open-source model that leverages DSA alongside an
              optimization called IndexShare.
            </p>
            <p>
              Whereas vanilla DSA has an indexer and top-k selection at each
              layer, IndexShare (as the name suggests) shares the indexer across
              layers.
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

export default LinearAndSparseAttentionPage
