import React, { useRef } from 'react'
import katex from 'katex'
import 'katex/dist/katex.min.css'
import { Link } from 'gatsby'
import Helmet from 'react-helmet'
import styled, { keyframes } from 'styled-components'
import Layout from '../../components/layout'
import ReadingProgress from '../../components/reading-progress'
import attentionHistory from '../../images/kimi-linear-attention-history.png'
import dsaArchitecture from '../../images/deepseek-sparse-attention-architecture.png'

const serif = "'Crimson Text', Georgia, 'Times New Roman', serif"
const sans =
  "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif"

const attentionSweep = keyframes`
  0% {
    opacity: 0;
    mask-position: 135% 50%;
    -webkit-mask-position: 135% 50%;
  }

  12%,
  88% {
    opacity: 1;
  }

  100% {
    opacity: 0;
    mask-position: -35% 50%;
    -webkit-mask-position: -35% 50%;
  }
`

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
    radial-gradient(circle, var(--ink) 0 1.6px, transparent 1.9px) 0 0 / 18px
      18px,
    var(--paper-deep);

  &::before {
    content: '';
    position: absolute;
    z-index: 1;
    inset: 0;
    pointer-events: none;
    background: radial-gradient(circle, #858580 0 1.6px, transparent 1.9px) 0
      0 / 18px 18px;
    mask-image: linear-gradient(
      125deg,
      transparent 28%,
      #000 43%,
      #000 50%,
      transparent 65%
    );
    mask-size: 220% 100%;
    mask-position: 135% 50%;
    mask-repeat: no-repeat;
    -webkit-mask-image: linear-gradient(
      125deg,
      transparent 28%,
      #000 43%,
      #000 50%,
      transparent 65%
    );
    -webkit-mask-size: 220% 100%;
    -webkit-mask-position: 135% 50%;
    -webkit-mask-repeat: no-repeat;
    animation: ${attentionSweep} 6.5s ease-in-out infinite;
  }

  &::after {
    content: '';
    position: absolute;
    z-index: 2;
    inset: 0;
    pointer-events: none;
    background: linear-gradient(
      135deg,
      transparent 0 37%,
      rgba(201, 201, 198, 0.94) 37% 49%,
      transparent 49% 53%,
      rgba(201, 201, 198, 0.98) 53% 67%,
      transparent 67%
    );
  }

  @media (prefers-reduced-motion: reduce) {
    &::before {
      animation: none;
      opacity: 0;
    }
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
  min-width: 0;
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

  > p:first-child::first-letter {
    float: left;
    margin: 0.08em 0.1em 0 0;
    font-size: 4.1em;
    line-height: 0.72;
  }

  h2 {
    margin: 1em 0 0.5em;
    color: var(--ink);
    font-family: ${serif};
    font-size: clamp(2rem, 3.5vw, 3.2rem);
    font-weight: 400;
    letter-spacing: -0.035em;
    line-height: 0.95;
  }

  ul,
  ol {
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

const EquationBlock = styled.div`
  max-width: 100%;
  overflow-x: auto;
  margin: 1.25rem 0 1.75rem;
  padding: 0.25rem 0;
  font-size: clamp(0.85rem, 1.15vw, 1.05rem);

  .katex-display {
    margin: 0.5rem 0;
    text-align: left;
  }
`

const Math = ({ tex }) => (
  <span
    dangerouslySetInnerHTML={{
      __html: katex.renderToString(tex, { throwOnError: true }),
    }}
  />
)

const Equation = ({ tex, label }) => (
  <EquationBlock
    role="region"
    aria-label={label}
    tabIndex={0}
    dangerouslySetInnerHTML={{
      __html: katex.renderToString(tex, {
        displayMode: true,
        throwOnError: true,
      }),
    }}
  />
)

const ArticleFigure = styled.figure`
  margin: 2rem 0 2.5rem;

  > a {
    display: block;
    overflow: hidden;
    aspect-ratio: ${({ $imageRatio }) => $imageRatio};
    cursor: zoom-in;
  }

  > a:hover,
  > a:focus-visible {
    opacity: 1;
  }

  img {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: right center;
  }

  figcaption {
    margin-top: 0.75rem;
    color: rgba(17, 17, 15, 0.75);
    font-family: ${serif};
    font-size: 0.95rem;
    line-height: 1.4;
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

const articleContent = (
  <>
    <p>
      Attention is at the heart of LLMs and (similar to our own human attention
      spans) we are always trying to find ways to become more efficient with it.
    </p>
    <p>
      Linear and sparse attention are two approaches to improving the efficiency
      of LLMs that have recently been implemented by two leading open source
      model labs, Kimi and DeepSeek.
      Kimi focuses on linear attention with Kimi Delta Attention (KDA), whereas
      DeepSeek has introduced an improved sparse-attention mechanism with
      DeepSeek Sparse Attention (DSA).
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
      has recently taken the spotlight as a frontier-approaching open source
      model scaled to 2.8T parameters, with Kimi Delta Attention at its heart.
    </p>
    <p>
      Kimi Delta Attention builds on a lineage of linear-attention variants that
      the authors map out in their previous paper,{' '}
      <a
        href="https://arxiv.org/abs/2510.26692"
        target="_blank"
        rel="noreferrer"
      >
        Kimi Linear
      </a>
      . The progression runs from linear attention to DeltaNet, then Gated
      DeltaNet, and finally Kimi Delta Attention. Below, we go through the
      updates one rule change at a time, highlighting the changes each
      contributes in <span style={{ color: '#b52622' }}>red</span>.
    </p>
    <p>
      First, linear attention accumulates key-value pairs in a matrix-valued
      recurrent state; the query reads an output from that state.
    </p>
    <Equation
      label="Linear attention recurrence and output"
      tex={String.raw`\mathbf{S}_t = \mathbf{S}_{t-1} + \mathbf{k}_t\mathbf{v}_t^\top,\qquad \mathbf{o}_t = \mathbf{S}_t^\top\mathbf{q}_t.`}
    />
    <p>
      DeltaNet changes the additive write into an error-correcting delta rule,
      taking an online gradient step with learning rate{' '}
      <Math tex={String.raw`\beta_t`} /> on the reconstruction loss:
    </p>
    <Equation
      label="DeltaNet reconstruction loss"
      tex={String.raw`\mathcal{L}_t(\mathbf{S}) = \tfrac12\|\mathbf{S}^\top\mathbf{k}_t - \mathbf{v}_t\|^2.`}
    />
    <Equation
      label="DeltaNet gradient descent and delta rule"
      tex={String.raw`\begin{aligned}
        \mathbf{S}_t &= \mathbf{S}_{t-1} - {\color{#b52622}\beta_t\nabla_{\mathbf{S}}\mathcal{L}_t(\mathbf{S}_{t-1})} \\
        &= (\mathbf{I} - {\color{#b52622}\beta_t\mathbf{k}_t\mathbf{k}_t^\top})\mathbf{S}_{t-1} + {\color{#b52622}\beta_t}\mathbf{k}_t\mathbf{v}_t^\top.
      \end{aligned}`}
    />
    <p>
      Gated DeltaNet adds the scalar forget gate{' '}
      <Math tex={String.raw`\color{#b52622}\alpha_t`} />, which decays the
      previous memory uniformly before the delta-rule update.
    </p>
    <Equation
      label="Gated DeltaNet with a scalar forget gate"
      tex={String.raw`\mathbf{S}_t = {\color{#b52622}\alpha_t}(\mathbf{I} - \beta_t\mathbf{k}_t\mathbf{k}_t^\top)\mathbf{S}_{t-1} + \beta_t\mathbf{k}_t\mathbf{v}_t^\top.`}
    />
    <p>
      Finally, Kimi Delta Attention replaces that scalar gate with the
      diagonal gate{' '}
      <Math
        tex={String.raw`\color{#b52622}\operatorname{Diag}(\boldsymbol{\alpha}_t)`}
      />
      , giving each key channel its own forgetting rate before the same
      delta-rule update.
    </p>
    <Equation
      label="Kimi Delta Attention with a channel-wise forget gate and output"
      tex={String.raw`\begin{aligned}
        \mathbf{S}_t &= (\mathbf{I} - \beta_t\mathbf{k}_t\mathbf{k}_t^\top){\color{#b52622}\operatorname{Diag}(\boldsymbol{\alpha}_t)}\mathbf{S}_{t-1} + \beta_t\mathbf{k}_t\mathbf{v}_t^\top \in \mathbb{R}^{d_k\times d_v}; \\
        \mathbf{o}_t &= \mathbf{S}_t^\top\mathbf{q}_t \in \mathbb{R}^{d_v}.
      \end{aligned}`}
    />

    <p>
      TL;DR: starting from linear attention, we make 3 changes to get to KDA:
    </p>
    <ol>
      <li>Replace additive writes with error-correcting updates.</li>
      <li>Add a scalar forget gate.</li>
      <li>Give each key channel its own forgetting rate.</li>
    </ol>
    <ArticleFigure $imageRatio="1336 / 930">
      <a
        href={attentionHistory}
        target="_blank"
        rel="noreferrer"
        aria-label="View the attention mechanisms table at full size (opens in a new tab)"
      >
        <img
          src={attentionHistory}
          alt="Table comparing recurrent and parallel forms of attention, from softmax and linear attention through DeltaNet and gated variants, with KDA highlighted in the final row."
          width={1356}
          height={930}
          loading="lazy"
          decoding="async"
        />
      </a>
      <figcaption>
        The history of attention mechanisms, from the{' '}
        <a href="https://arxiv.org/abs/2510.26692">Kimi Linear paper</a>.
      </figcaption>
    </ArticleFigure>

    <h2>DeepSeek Sparse Attention</h2>
    <p>
      Sparse attention is another approach to solving the quadratic attention
      problem. In its simplest form, sparse attention can be thought of as a
      sliding window or filter on the global attention mechanism.
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
      The increased complexity of sparse selection allows the model to learn
      more context-aware filtering procedures while retaining quality.
    </p>

    <ArticleFigure $imageRatio="1286 / 754">
      <a
        href={dsaArchitecture}
        target="_blank"
        rel="noreferrer"
        aria-label="View the DSA architecture diagram at full size (opens in a new tab)"
      >
        <img
          src={dsaArchitecture}
          alt="DeepSeek-V3.2 attention architecture with DSA under MLA. The green path shows the lightning indexer scoring tokens and the top-k selector choosing key-value entries for core attention."
          width={1310}
          height={754}
          loading="lazy"
          decoding="async"
        />
      </a>
      <figcaption>
        DSA architecture from the{' '}
        <a href="https://arxiv.org/abs/2512.02556">DeepSeek-V3.2 paper</a>.
      </figcaption>
    </ArticleFigure>

    <p>
      DeepSeek has since built on DSA in{' '}
      <a
        href="https://arxiv.org/abs/2606.19348"
        target="_blank"
        rel="noreferrer"
      >
        DeepSeek V4
      </a>
      , combining it with several key upgrades, including token-wise
      compression, to make long-context attention more efficient.
    </p>

    <h2>DSA in Other Contexts: GLM 5.2</h2>
    <p>
      <a href="https://z.ai/blog/glm-5.2" target="_blank" rel="noreferrer">
        GLM 5.2
      </a>{' '}
      is another open-source model that leverages DSA alongside an optimization
      called{' '}
      <a
        href="https://arxiv.org/pdf/2603.12201"
        target="_blank"
        rel="noreferrer"
      >
        IndexCache
      </a>
      .
    </p>
    <p>
      Whereas vanilla DSA has an indexer and top-k selection at each layer,
      IndexCache reuses the indexer’s top-k indices across layers.
    </p>
    <p>
      Specifically, in GLM-5.2, every 4 transformer layers share a lightweight
      indexer. Top-k indices are reused for 4 layers, significantly reducing
      the number of indexer dot product and top-k operations that need be
      performed.
    </p>
    <h2>How Might We Learn?</h2>
    <p>
      For both linear and sparse attention, the goal is the same: make longer
      contexts more useful and less expensive. The approaches raise a shared
      question: what is worth retaining, and what is worth revisiting?
    </p>
    <p>
      I find there are interesting parallels to{' '}
      <a
        href="https://andymatuschak.org/hmwl/"
        target="_blank"
        rel="noreferrer"
      >
        research on how humans learn how to learn
      </a>{' '}
      and the ideas of the trade-off between retention and repetition.
      For humans, too, learning involves a balance between what we commit to
      immediate memory and what we trust we can reconstruct.
    </p>
  </>
)

// Editorial estimate, including time to study the equations and figures.
const readingTime = 8

const LinearAndSparseAttentionPage = () => {
  const contentRef = useRef(null)

  return (
    <Layout showHeader={false}>
      <Helmet>
        <title>Linear and Sparse Attention — Yuxiang Dai</title>
        <meta
          name="description"
          content="Linear and Sparse Attention, featuring Kimi and Deepseek."
        />
      </Helmet>
      <ArticleShell>
        <ReadingProgress contentRef={contentRef} />
        <TopBar aria-label="Article navigation">
          <HomeLink to="/">Yuxiang Dai</HomeLink>
          <SectionLink to="/#blog">Blog</SectionLink>
        </TopBar>

        <Paper ref={contentRef}>
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
              <MetaLabel>Reading time</MetaLabel>
              <MetaValue>{readingTime} mins</MetaValue>
            </ArticleMeta>

            <Prose>{articleContent}</Prose>
          </ArticleBody>

          <ArticleFooter>
            <FooterLink to="/">← Home</FooterLink>
            <FooterLink to="/#blog">All Writing ↑</FooterLink>
          </ArticleFooter>
        </Paper>
      </ArticleShell>
    </Layout>
  )
}

export default LinearAndSparseAttentionPage
