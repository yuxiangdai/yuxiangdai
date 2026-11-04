import React from 'react'
import { graphql, Link } from 'gatsby'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'
import Helmet from 'react-helmet'
import styled from 'styled-components'
import Layout from '../components/layout'
import AlpineBackground from '../components/alpine-background'

const serif = "'Crimson Text', Georgia, 'Times New Roman', serif"

const PageShell = styled.div`
  --ink: #f5f4ec;
  --page-gutter: clamp(1.25rem, 2.65vw, 3.5rem);
  --composition-width: 110svh;
  isolation: isolate;
  position: relative;
  display: flex;
  flex-direction: column;
  height: 100svh;
  min-height: 0;
  padding: 0 var(--page-gutter);
  color: var(--ink);
  font-family: ${serif};
  font-size: 1.125rem;
  letter-spacing: -0.015em;

  h1,
  h2,
  p,
  figure {
    margin: 0;
    color: inherit;
  }
  h2 {
    font-family: inherit;
  }
  p {
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
  a:focus-visible,
  [tabindex='-1']:focus-visible {
    outline: 2px solid #f5f4ec;
    outline-offset: 6px;
  }
  ::selection {
    background: #302a50;
    color: #fff4df;
  }

  @media (min-width: 761px) and (max-height: 680px) {
    --composition-width: 110svh;
  }

  @media (prefers-reduced-motion: reduce) {
    .gatsby-image-wrapper img {
      transition: none;
    }
  }
`

const TopBar = styled.header`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 1rem;
  padding: 0.8rem 0 0.3rem;
  text-shadow: 0 1px 8px #10232b;
  font-size: clamp(1.1rem, 1.4vw, 1.4rem);
  line-height: 1.3;

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
    gap: 0.75rem;
    nav {
      gap: 1rem;
    }
  }

  @media (max-width: 370px) {
    flex-wrap: wrap;
    nav {
      width: 100%;
      justify-content: flex-end;
    }
  }
`

const SkipLink = styled.a`
  position: absolute;
  top: 0.5rem;
  left: var(--page-gutter);
  padding: 0.5rem 1rem;
  background: #17303a;
  z-index: 5;
  transform: translateY(-200%);
  &:focus {
    transform: translateY(0);
  }
`

const Composition = styled.div`
  display: grid;
  grid-template-rows: auto minmax(0, 1fr) auto;
  width: min(100%, var(--composition-width));
  flex: 1;
  min-height: 0;
  margin: 0 auto;
  padding: 0.5rem 0;
  gap: 1svh;
`

const Name = styled.h1`
  grid-column: 1 / -1;
  font-family: 'Inter', 'Helvetica Neue', sans-serif;
  font-size: clamp(2rem, min(8vw, 9svh), 6rem);
  font-weight: 400;
  line-height: 1.08;
  letter-spacing: -0.075em;
  padding-bottom: 0.1em;
  text-shadow: none;
  z-index: 3;

  @media (max-width: 760px) {
    font-size: min(12vw, 8svh);
    padding-bottom: 0.1em;
  }
`

const PhotoWall = styled.div`
  position: relative;
  min-height: 0;
  container-type: size;

  figure {
    position: absolute;
  }
  a,
  .gatsby-image-wrapper {
    display: block;
  }
  a {
    box-shadow: 0 8px 24px #10232b55;
  }
  .tree a,
  .sunset a,
  .tusk a {
    box-shadow: none;
  }

  .tree a {
    position: relative;
    isolation: isolate;
  }

  /* Gently lift the photo's dark upper corners without changing the asset. */
  .tree a::after {
    content: '';
    position: absolute;
    inset: 0;
    pointer-events: none;
    mix-blend-mode: screen;
    background:
      radial-gradient(ellipse 28% 20% at top left, #ffffff0d, transparent),
      radial-gradient(ellipse 28% 20% at top right, #ffffff0d, transparent);
  }

  /* Size each print against both available dimensions, without cropping. */
  .tree {
    left: 2%;
    top: 0;
    width: min(22cqw, 37cqh);
  }
  .sunset {
    left: 33%;
    top: 6%;
    width: min(22cqw, 37cqh);
  }
  .tusk {
    right: 10%;
    top: 3%;
    width: min(34cqw, 52cqh);
  }
  .ridge {
    left: 8%;
    bottom: 0;
    width: min(37cqw, 48cqh);
  }
  .forest {
    right: 10%;
    bottom: 3%;
    width: min(38cqw, 48cqh);
  }

  @media (max-width: 760px) {
    .tree {
      left: 0;
      top: 0;
      width: min(36cqw, 29cqh);
    }
    .sunset {
      left: auto;
      right: 3%;
      top: 4%;
      width: min(36cqw, 29cqh);
    }
    .ridge {
      left: 0;
      bottom: 25%;
      width: min(53cqw, 32cqh);
    }
    .tusk {
      right: 0;
      top: 49%;
      width: min(40cqw, 27cqh);
    }
    .forest {
      right: 10%;
      bottom: 0;
      width: min(56cqw, 33cqh);
    }
  }
`

const Writing = styled.section`
  justify-self: end;
  padding: 0.5rem 0.8rem;
  background: rgba(24, 48, 59, 0.96);
  box-shadow: 0 4px 18px rgba(5, 16, 22, 0.24);
  display: grid;
  grid-template-columns: auto auto;
  gap: 0.15rem 1.25rem;
  align-items: center;

  h2 {
    grid-column: 1;
    font-size: clamp(1.1rem, 2.5svh, 1.6rem);
    font-weight: 400;
    line-height: 1.15;
    letter-spacing: -0.03em;
  }
  p {
    font-size: 0.85rem;
    line-height: 1.2;
  }
  .read-essay {
    grid-column: 2;
    grid-row: 1 / 4;
    font-size: 0.9rem;
    text-decoration: underline;
    text-decoration-thickness: 1px;
    text-underline-offset: 0.22em;
  }
  #blog {
    position: absolute;
  }

  @media (max-width: 760px) {
    justify-self: stretch;
    gap: 0.15rem 0.6rem;
    padding: 0.4rem 0.6rem;
    h2 {
      font-size: 1rem;
    }
    p,
    .read-essay {
      font-size: 0.75rem;
    }
  }
`

const Footer = styled.footer`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 1rem;
  flex-shrink: 0;
  padding: 0.4rem 0;
  text-shadow: 0 1px 8px #10232b;
  font-size: 1rem;

  @media (min-width: 761px) and (max-height: 680px) {
    padding: 0.5rem 0;
  }

  @media (max-width: 760px) {
    padding: 0.35rem 0 0.6rem;
    font-size: 0.85rem;
  }
`

const IndexPage = ({ data }) => {
  return (
    <Layout showHeader={false}>
      <Helmet>
        <html className="home-page" />
        <meta
          name="description"
          content="Photography and writing by Yuxiang Dai."
        />
        <link
          rel="preload"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
          href="/fonts/inter-400-latin.woff2"
        />
        <link rel="preload" as="image" href="/images/home/alpine.webp" />
      </Helmet>
      <PageShell>
        <AlpineBackground />
        <SkipLink href="#writing">Skip to writing</SkipLink>
        <TopBar>
          <nav aria-label="Main navigation">
            <Link to="/photos/">Photography</Link>
            <Link to="/writing/">Writing</Link>
            <Link to="/resume/">About</Link>
          </nav>
        </TopBar>
        <Composition>
          <Name>Yuxiang Dai</Name>
          <PhotoWall aria-label="Selected photography">
            {[
              [
                'ridge',
                data.landscape,
                'Warm evening light on a mountain ridge, alpine lake, and evergreen forest in Garibaldi Provincial Park.',
              ],
              [
                'tree',
                data.tree,
                'A tall evergreen silhouetted against a blue sky and a small moon.',
              ],
              [
                'sunset',
                data.sunset,
                'A crescent moon above a volcanic lake and mountain ridges at sunset.',
              ],
              [
                'tusk',
                data.blackTusk,
                'Black Tusk above alpine lakes and mountain ridges in Garibaldi Provincial Park.',
              ],
              [
                'forest',
                data.forest,
                'Layers of evergreen forest and mountain ridges beneath a peach evening sky in Garibaldi Provincial Park.',
              ],
            ].map(([position, photo, alt]) => (
              <figure key={position} className={position}>
                <Link
                  to={`/photos/?photo=${encodeURIComponent(
                    photo.relativePath
                  )}`}
                >
                  <GatsbyImage
                    image={getImage(photo)}
                    alt={alt}
                    loading="eager"
                    sizes="(max-width: 760px) 90vw, 55vw"
                    objectFit="contain"
                  />
                </Link>
              </figure>
            ))}
          </PhotoWall>
          <Writing id="writing" aria-labelledby="essay-title" tabIndex={-1}>
            <span id="blog" />
            <p>Writing</p>
            <h2 id="essay-title">
              <Link to="/blog/linear-and-sparse-attention/">
                Linear and Sparse Attention
              </Link>
            </h2>
            <p>Featuring Kimi and DeepSeek</p>
            <Link
              className="read-essay"
              to="/blog/linear-and-sparse-attention/"
            >
              Read essay <span aria-hidden="true">→</span>
            </Link>
          </Writing>
        </Composition>
        <Footer>
          <Link to="/resume/">Résumé</Link>
          <span aria-hidden="true">/</span>
          <a href="mailto:yuxiang.dai43@gmail.com">Contact</a>
        </Footer>
      </PageShell>
    </Layout>
  )
}

export const query = graphql`
  query IndexPageQuery {
    tree: file(relativePath: { eq: "_DSC1603.jpg" }) {
      relativePath
      childImageSharp {
        gatsbyImageData(
          layout: CONSTRAINED
          width: 500
          quality: 90
          placeholder: DOMINANT_COLOR
          formats: [AUTO, WEBP, AVIF]
        )
      }
    }
    sunset: file(relativePath: { eq: "_DSC8263.jpg" }) {
      relativePath
      childImageSharp {
        gatsbyImageData(
          layout: CONSTRAINED
          width: 500
          quality: 90
          placeholder: DOMINANT_COLOR
          formats: [AUTO, WEBP, AVIF]
        )
      }
    }
    landscape: file(relativePath: { eq: "DSCF2770.jpg" }) {
      relativePath
      childImageSharp {
        gatsbyImageData(
          layout: CONSTRAINED
          width: 1600
          quality: 90
          placeholder: DOMINANT_COLOR
          formats: [AUTO, WEBP, AVIF]
        )
      }
    }
    blackTusk: file(relativePath: { eq: "DSCF2721.jpg" }) {
      relativePath
      childImageSharp {
        gatsbyImageData(
          layout: CONSTRAINED
          width: 800
          quality: 90
          placeholder: DOMINANT_COLOR
          formats: [AUTO, WEBP, AVIF]
        )
      }
    }
    forest: file(relativePath: { eq: "DSCF2798.jpg" }) {
      relativePath
      childImageSharp {
        gatsbyImageData(
          layout: CONSTRAINED
          width: 800
          quality: 90
          placeholder: DOMINANT_COLOR
          formats: [AUTO, WEBP, AVIF]
        )
      }
    }
  }
`

export default IndexPage
