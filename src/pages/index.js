import React from 'react'
import { graphql, Link } from 'gatsby'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'
import Helmet from 'react-helmet'
import styled from 'styled-components'
import Layout from '../components/layout'
import SunriseBackground from '../components/sunrise-background'
import ScatteredName from '../components/scattered-name'

const serif = "'Crimson Text', Georgia, 'Times New Roman', serif"

const PageShell = styled.div`
  --ink: #181815;
  --page-gutter: clamp(1.25rem, 2.65vw, 3.5rem);
  --composition-width: 96svh;
  isolation: isolate;
  position: relative;
  display: flex;
  flex-direction: column;
  min-height: 100svh;
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
    outline: 2px solid #302a50;
    outline-offset: 6px;
  }
  ::selection {
    background: #302a50;
    color: #fff4df;
  }

  @media (min-width: 761px) and (max-height: 680px) {
    --composition-width: 88svh;
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
  background: #fff1d9;
  z-index: 5;
  transform: translateY(-200%);
  &:focus {
    transform: translateY(0);
  }
`

const Composition = styled.div`
  --photo-gap: clamp(1rem, 2vw, 2rem);
  display: grid;
  /* Three 3:2 photographs: include the stack's gap when matching their heights. */
  grid-template-columns:
    minmax(0, calc((200% - var(--photo-gap) / 2) / 3))
    minmax(0, 1fr);
  column-gap: var(--photo-gap);
  width: min(100%, var(--composition-width));
  margin: 0 auto;
  padding-top: 0;

  @media (max-width: 760px) {
    display: flex;
    flex-direction: column;
    width: 100%;
    padding-top: 1.5rem;
  }
`

const Name = styled.h1`
  grid-column: 1 / -1;
  grid-row: 1;
  font-family: 'DM Serif Display', 'Times New Roman', serif;
  font-size: min(11vw, 12svh);
  font-weight: 400;
  line-height: 0.82;
  letter-spacing: -0.055em;
  margin-left: clamp(
    -4vw,
    calc((var(--composition-width) - 100vw + 2 * var(--page-gutter)) / 2),
    0px
  ) !important;
  padding-bottom: 0.24em;
  width: max-content;
  z-index: 1;

  @media (min-width: 761px) and (max-height: 680px) {
    font-size: min(11vw, 10svh);
  }

  @media (max-width: 760px) {
    font-size: clamp(2.75rem, 15.4vw, 7.3rem);
    margin-left: 0 !important;
    line-height: 1;
    padding-bottom: 0.35em;
  }
`

const Landscape = styled.figure`
  grid-column: 1;
  grid-row: 2;
  padding-top: 0;

  a,
  .gatsby-image-wrapper {
    display: block;
  }
  figcaption {
    max-width: 44rem;
    padding: 0.6rem 0 0;
    font-size: 0.85rem;
    line-height: 1.35;
    color: #3b3635;
  }
`

const CompanionPhotos = styled.div`
  grid-column: 2;
  grid-row: 2;
  display: grid;
  gap: var(--photo-gap);
  align-self: start;
  z-index: 2;

  a,
  .gatsby-image-wrapper {
    display: block;
  }

  @media (max-width: 760px) {
    width: 86%;
    align-self: flex-end;
    gap: 1.25rem;
    margin: 1.75rem 0 0;
  }
`

const Introduction = styled.section`
  grid-column: 1;
  grid-row: 3;
  width: min(31rem, 72%);
  margin: 1rem 2rem 0 auto;
  scroll-margin-top: 2rem;

  p {
    font-size: clamp(1.1rem, min(1.65vw, 2.8svh), 1.65rem);
    line-height: 1.25;
  }

  @media (max-width: 760px) {
    width: 100%;
    margin: 2rem 0 0;
    padding: 0;
    max-width: 24rem;
    p {
      font-size: 1.5rem;
    }
  }
`

const Writing = styled.section`
  grid-column: 2;
  grid-row: 3;
  margin: 0.5rem 0 0 -3rem;
  scroll-margin-top: 2rem;

  h2 {
    font-size: clamp(1.4rem, min(2.6vw, 3.4svh), 2.8rem);
    font-weight: 600;
    line-height: 1.02;
    letter-spacing: -0.04em;
  }
  p {
    font-size: 1rem;
    line-height: 1.3;
  }
  .read-essay {
    display: inline-block;
    margin-top: 0.65rem;
    text-decoration: underline;
    text-decoration-thickness: 1px;
    text-underline-offset: 0.22em;
  }

  @media (max-width: 760px) {
    margin: 2.25rem 0 0;
    h2 {
      font-size: clamp(2rem, 7.4vw, 3.1rem);
      max-width: 25rem;
    }
  }
`

const Footer = styled.footer`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 1rem;
  margin-top: auto;
  padding: 0.75rem 0;
  font-size: 1rem;

  @media (min-width: 761px) and (max-height: 680px) {
    padding: 0.5rem 0;
  }

  @media (max-width: 760px) {
    padding: 2.5rem 0 1.5rem;
  }
`

const IndexPage = ({ data }) => {
  return (
    <Layout showHeader={false}>
      <Helmet>
        <html className="home-page" />
        <meta
          name="description"
          content="Photographs, hiking, music, art, and things I want to understand. A personal collection by Yuxiang Dai."
        />
        <link
          rel="preload"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
          href="/fonts/dm-serif-display-400-latin.woff2"
        />
        <link rel="preload" as="image" href="/images/home/sunrise.webp" />
      </Helmet>
      <PageShell>
        <SunriseBackground />
        <SkipLink href="#about">Skip to introduction</SkipLink>
        <TopBar>
          <nav aria-label="Main navigation">
            <Link to="/photos/">Photography</Link>
            <Link to="/writing/">Writing</Link>
            <a href="#about">About</a>
          </nav>
        </TopBar>
        <Composition>
          <Name aria-label="Yuxiang Dai">
            <ScatteredName />
          </Name>
          <Landscape>
            <Link to="/photos/" aria-label="Explore the photography collection">
              <GatsbyImage
                image={getImage(data.landscape)}
                alt="Warm evening light on a mountain ridge, alpine lake, and evergreen forest in Garibaldi Provincial Park."
                loading="eager"
                sizes="(max-width: 760px) calc(100vw - 2.5rem), min(63vw, 64svh)"
                objectFit="contain"
              />
            </Link>
            <figcaption>
              Shot on a Fuji X-T20 during a multi-day backpacking trip in
              Garibaldi Provincial Park, near Vancouver, BC.
            </figcaption>
          </Landscape>
          <CompanionPhotos>
            <figure>
              <Link to="/photos/">
                <GatsbyImage
                  image={getImage(data.blackTusk)}
                  alt="Black Tusk above alpine lakes and mountain ridges in Garibaldi Provincial Park."
                  loading="eager"
                  sizes="(max-width: 760px) calc(86vw - 2.15rem), min(31vw, 32svh)"
                  objectFit="contain"
                />
              </Link>
            </figure>
            <figure>
              <Link to="/photos/">
                <GatsbyImage
                  image={getImage(data.forest)}
                  alt="Layers of evergreen forest and mountain ridges beneath a peach evening sky in Garibaldi Provincial Park."
                  loading="eager"
                  sizes="(max-width: 760px) calc(86vw - 2.15rem), min(31vw, 32svh)"
                  objectFit="contain"
                />
              </Link>
            </figure>
          </CompanionPhotos>
          <Introduction id="about" aria-label="About Yuxiang" tabIndex={-1}>
            <p>
              Photographs, hiking, music, art, and things I want to understand.
            </p>
          </Introduction>
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
    landscape: file(relativePath: { eq: "DSCF2770.jpg" }) {
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
