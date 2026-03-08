import React from 'react'
import { graphql, Link } from 'gatsby'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'
import styled, { keyframes } from 'styled-components'
import Layout from '../components/layout'

const crimsonTextSemibold = "'Crimson Text', Georgia, 'Times New Roman', serif"
const showBlogSection = false

const workItems = [
  {
    company: 'Symbolica AI',
    summary: 'building next-generation AI reasoning systems',
    role: 'Software Engineer',
    team: 'Core Infrastructure',
    tenure: 'Current',
  },
  {
    company: 'Ideogram',
    summary: 'shipping creative generative AI products for millions of users',
    role: 'Member of Technical Staff',
    team: 'Product Engineering',
    tenure: '2024',
  },
  {
    company: 'Amazon',
    summary: 'building supply chain forecasting systems at global scale',
    role: 'Software Engineer',
    team: 'Forecasting Infrastructure',
    tenure: '2020 - 2024',
  },
]

const writingItems = [
  {
    date: 'March 2026',
    title: 'writing archive coming soon',
    excerpt: 'Long-form teardowns, notes on systems, and build logs will live here.',
  },
]

const riseIn = keyframes`
  from {
    opacity: 0;
    transform: translate3d(0, 26px, 0);
  }

  to {
    opacity: 1;
    transform: translate3d(0, 0, 0);
  }
`

const PageShell = styled.div`
  --page-bg: #090909;
  --paper: #d8d8d6;
  --paper-shadow: rgba(0, 0, 0, 0.2);
  --text-dark: #080808;
  --text-light: #f4f1ea;
  --text-soft: rgba(244, 241, 234, 0.78);
  --rule: rgba(255, 255, 255, 0.08);
  background:
    radial-gradient(circle at top, rgba(255, 255, 255, 0.08), transparent 28%),
    linear-gradient(180deg, rgba(255, 255, 255, 0.02), transparent 16%),
    var(--page-bg);
  color: var(--text-light);
  font-family: 'Crimson Text', Georgia, 'Times New Roman', serif;
  overflow: clip;
`

const IntroSection = styled.section`
  min-height: 82vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: clamp(6rem, 10vw, 10rem) 1.5rem clamp(4rem, 7vw, 6rem);

  @media (max-width: 700px) {
    min-height: 66vh;
    align-items: flex-end;
    padding-top: 7rem;
  }
`

const IntroInner = styled.div`
  text-align: center;
  animation: ${riseIn} 0.9s ease-out both;
`

const Name = styled.h1`
  margin: 0;
  color: inherit;
  font-family: ${crimsonTextSemibold};
  font-size: clamp(4.1rem, 11vw, 8rem);
  line-height: 0.92;
  font-weight: 400;
  letter-spacing: normal;

  @media (max-width: 700px) {
    font-size: clamp(3rem, 14vw, 4.4rem);
  }
`

const Meta = styled.div`
  display: inline-flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 0.85rem clamp(1.25rem, 4vw, 3.5rem);
  margin-top: 0.75rem;
  font-family: ${crimsonTextSemibold};
  font-size: clamp(1.1rem, 2vw, 2rem);
  line-height: 1;
  color: var(--text-light);

  @media (max-width: 700px) {
    font-size: 1rem;
  }
`

const MetaItem = styled.span`
  white-space: nowrap;
`

const PanelRow = styled.div`
  padding-left: ${({ $offset }) => $offset || '0'};
  padding-right: 1rem;
  margin-bottom: clamp(1.5rem, 4vw, 3rem);

  @media (max-width: 1100px) {
    padding-left: 1rem;
  }
`

const PaperPanel = styled.section`
  max-width: ${({ $maxWidth }) => $maxWidth || '74rem'};
  background: var(--paper);
  color: var(--text-dark);
  box-shadow: 0 24px 80px var(--paper-shadow);
  padding: clamp(1.75rem, 4vw, 3.5rem);
  animation: ${riseIn} 0.8s ease-out both;
`

const SectionTitle = styled.h2`
  margin: 0 0 clamp(1rem, 3vw, 2rem);
  color: var(--text-dark);
  font-family: ${crimsonTextSemibold};
  font-size: clamp(3.3rem, 8vw, 7.75rem);
  line-height: 0.9;
  font-weight: 400;
  letter-spacing: -0.04em;
`

const AboutCopy = styled.div`
  max-width: 44rem;
  color: var(--text-dark);
  font-family: ${crimsonTextSemibold};
  font-size: clamp(1rem, 1.3vw, 1.2rem);
  line-height: 1.25;

  p {
    color: var(--text-dark);
    margin: 0;
  }

  p + p {
    margin-top: 0.2rem;
  }
`

const InlineAnchor = styled(Link)`
  color: var(--text-dark);
  text-decoration: underline;
  text-underline-offset: 0.12em;
`

const WorkList = styled.div`
  display: grid;
  gap: clamp(2rem, 4vw, 3.2rem);
`

const WorkItem = styled.article`
  display: grid;
  grid-template-columns: minmax(0, 1.1fr) minmax(12rem, 0.75fr);
  gap: 1.5rem clamp(1.5rem, 4vw, 4rem);
  align-items: start;

  @media (max-width: 820px) {
    grid-template-columns: 1fr;
  }
`

const WorkPrimary = styled.div`
  min-width: 0;
`

const WorkCompany = styled.h3`
  margin: 0 0 0.35rem;
  color: var(--text-dark);
  font-family: ${crimsonTextSemibold};
  font-size: clamp(2rem, 4vw, 3.8rem);
  line-height: 0.98;
  font-weight: 400;
`

const WorkSummary = styled.p`
  margin: 0;
  color: var(--text-dark);
  font-family: ${crimsonTextSemibold};
  font-size: clamp(1.05rem, 1.45vw, 1.4rem);
  line-height: 1.15;
`

const WorkMeta = styled.div`
  text-align: right;
  color: var(--text-dark);
  font-family: ${crimsonTextSemibold};
  font-size: clamp(1rem, 1.3vw, 1.25rem);
  line-height: 1.15;

  @media (max-width: 820px) {
    text-align: left;
  }
`

const WorkRole = styled.p`
  margin: 0;
  color: var(--text-dark);
  font-family: ${crimsonTextSemibold};
  font-size: clamp(1.45rem, 2.3vw, 2.5rem);
  line-height: 1.02;
`

const WorkTeam = styled.p`
  margin: 0.35rem 0 0;
  color: var(--text-dark);
`

const WorkTenure = styled.p`
  margin: 0.15rem 0 0;
  color: var(--text-dark);
`

const WritingList = styled.div`
  display: grid;
  gap: 1.5rem;
`

const WritingItem = styled.article`
  display: grid;
  grid-template-columns: minmax(9rem, 10.5rem) minmax(0, 1fr);
  gap: 1rem clamp(1.25rem, 4vw, 2.5rem);
  align-items: start;

  @media (max-width: 720px) {
    grid-template-columns: 1fr;
    gap: 0.4rem;
  }
`

const WritingDate = styled.p`
  margin: 0;
  color: var(--text-dark);
  font-family: ${crimsonTextSemibold};
  font-size: clamp(1rem, 1.25vw, 1.15rem);
  line-height: 1.1;
`

const WritingContent = styled.div`
  min-width: 0;
`

const WritingTitle = styled.h3`
  margin: 0;
  color: var(--text-dark);
  font-family: ${crimsonTextSemibold};
  font-size: clamp(1.35rem, 2vw, 2.2rem);
  line-height: 1.02;
  font-weight: 400;
`

const WritingExcerpt = styled.p`
  margin: 0.35rem 0 0;
  color: var(--text-dark);
  font-family: ${crimsonTextSemibold};
  font-size: clamp(0.95rem, 1.1vw, 1.05rem);
  line-height: 1.2;
`

const WritingLink = styled(Link)`
  color: inherit;
  text-decoration: none;
  display: inline-block;
  transition: transform 160ms ease, opacity 160ms ease;

  &:hover,
  &:focus-visible {
    opacity: 0.7;
    transform: translateX(4px);
  }
`

const PhotographySection = styled.section`
  position: relative;
  min-height: clamp(32rem, 54vw, 50rem);
  margin-top: clamp(2rem, 5vw, 4rem);
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  overflow: hidden;
`

const PhotographyImage = styled(GatsbyImage)`
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  filter: saturate(1.02);

  img {
    object-fit: cover !important;
    object-position: center !important;
  }
`

const PhotographyOverlay = styled.div`
  position: absolute;
  inset: 0;
  background:
    linear-gradient(90deg, rgba(0, 0, 0, 0.58) 0%, rgba(0, 0, 0, 0.22) 38%, rgba(0, 0, 0, 0.08) 70%),
    linear-gradient(180deg, rgba(0, 0, 0, 0.18), rgba(0, 0, 0, 0.38));
`

const PhotographyContent = styled.div`
  position: relative;
  z-index: 1;
  padding: clamp(1.5rem, 4vw, 2.5rem);
  max-width: 40rem;
  animation: ${riseIn} 0.85s ease-out both;
`

const PhotographyTitle = styled.h2`
  margin: 0;
  color: inherit;
  font-family: ${crimsonTextSemibold};
  font-size: clamp(3.3rem, 8vw, 7.75rem);
  line-height: 0.88;
  font-weight: 400;
  letter-spacing: -0.04em;
  white-space: nowrap;

  @media (max-width: 700px) {
    white-space: normal;
  }
`

const PhotographySubtitle = styled.p`
  margin: 0.65rem 0 0;
  font-family: ${crimsonTextSemibold};
  font-size: clamp(1.1rem, 1.6vw, 1.75rem);
  color: var(--text-light);
`

const ArchiveButton = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 0.65rem;
  margin-top: 1.5rem;
  padding: 0.8rem 1.15rem;
  background: rgba(240, 238, 234, 0.92);
  color: #050505;
  font-family: ${crimsonTextSemibold};
  text-decoration: none;
  font-size: clamp(1rem, 1.25vw, 1.2rem);
  line-height: 1;
  transition: transform 160ms ease, background 160ms ease;

  &::after {
    content: "\\2192";
    font-size: 0.95em;
  }

  &:hover,
  &:focus-visible {
    transform: translateX(5px);
    background: #ffffff;
  }
`

const ResourcesSection = styled.footer`
  padding: clamp(4rem, 9vw, 6rem) 1.5rem clamp(5rem, 10vw, 7rem);
  display: grid;
  justify-items: center;
  gap: 1.5rem;
  text-align: center;
`

const ResourcesTitle = styled.h2`
  margin: 0;
  color: inherit;
  font-family: ${crimsonTextSemibold};
  font-size: clamp(2.2rem, 4.4vw, 3.8rem);
  line-height: 1;
  font-weight: 400;
`

const ResourceList = styled.nav`
  display: grid;
  gap: 0.9rem;
  justify-items: center;
`

const resourceLinkStyles = `
  color: var(--text-light);
  font-family: ${crimsonTextSemibold};
  font-size: clamp(1.2rem, 1.8vw, 1.8rem);
  text-decoration: none;
  border-bottom: 1px solid transparent;
  transition: border-color 160ms ease, opacity 160ms ease;

  &:hover,
  &:focus-visible {
    opacity: 0.72;
    border-color: var(--rule);
  }
`

const ResourceLink = styled.a`${resourceLinkStyles}`

const ResourceRoute = styled(Link)`${resourceLinkStyles}`

const IndexPage = ({ data }) => (
  <Layout showHeader={false}>
    <PageShell data-node-id="502:54">
      <IntroSection>
        <IntroInner>
          <Name data-node-id="503:5">yuxiang dai</Name>
          <Meta>
            <MetaItem data-node-id="504:6">software engineer</MetaItem>
            <MetaItem data-node-id="504:7">san francisco</MetaItem>
          </Meta>
        </IntroInner>
      </IntroSection>

      <PanelRow $offset="0">
        <PaperPanel $maxWidth="96rem" id="about">
          <SectionTitle data-node-id="505:22">about</SectionTitle>
          <AboutCopy>
            <p>I currently work at Symbolica AI.</p>
            <p>
              I was previously working on generative AI products at Ideogram and
              supply chain forecasting at Amazon.
            </p>
            <p>
              I studied Robotics Engineering at the University of Toronto&apos;s
              Engineering Science program.
            </p>
            <p>
              Outside of work, I enjoy <InlineAnchor to="/photos/">photography</InlineAnchor>,
              hiking, classical music, and visiting art museums.
            </p>
          </AboutCopy>
        </PaperPanel>
      </PanelRow>

      <PanelRow $offset="clamp(1rem, 4vw, 5rem)">
        <PaperPanel $maxWidth="104rem" id="work">
          <SectionTitle data-node-id="505:27">work</SectionTitle>
          <WorkList>
            {workItems.map((item) => (
              <WorkItem key={item.company}>
                <WorkPrimary>
                  <WorkCompany>{item.company}</WorkCompany>
                  <WorkSummary>{item.summary}</WorkSummary>
                </WorkPrimary>
                <WorkMeta>
                  <WorkRole>{item.role}</WorkRole>
                  <WorkTeam>{item.team}</WorkTeam>
                  <WorkTenure>{item.tenure}</WorkTenure>
                </WorkMeta>
              </WorkItem>
            ))}
          </WorkList>
        </PaperPanel>
      </PanelRow>

      {showBlogSection ? (
        <PanelRow $offset="clamp(1rem, 9vw, 11.5rem)">
          <PaperPanel $maxWidth="94rem" id="blog">
            <SectionTitle data-node-id="505:112">blog</SectionTitle>
            <WritingList>
              {writingItems.map((item) => (
                <WritingItem key={item.title}>
                  <WritingDate>{item.date}</WritingDate>
                  <WritingContent>
                    {item.href ? (
                      <WritingLink to={item.href}>
                        <WritingTitle>{item.title}</WritingTitle>
                      </WritingLink>
                    ) : (
                      <WritingTitle>{item.title}</WritingTitle>
                    )}
                    <WritingExcerpt>{item.excerpt}</WritingExcerpt>
                  </WritingContent>
                </WritingItem>
              ))}
            </WritingList>
          </PaperPanel>
        </PanelRow>
      ) : null}

      <PhotographySection id="photography">
        <PhotographyImage image={getImage(data.photographyBanner)} alt="" loading="eager" />
        <PhotographyOverlay />
        <PhotographyContent>
          <PhotographyTitle data-node-id="505:40">photography</PhotographyTitle>
          <PhotographySubtitle data-node-id="505:49">a visual archive</PhotographySubtitle>
          <ArchiveButton to="/photos/">view archive</ArchiveButton>
        </PhotographyContent>
      </PhotographySection>

      <ResourcesSection id="resources">
        <ResourcesTitle data-node-id="506:36">resources</ResourcesTitle>
        <ResourceList>
          <ResourceLink
            href="https://www.linkedin.com/in/yuxiangdai/"
            target="_blank"
            rel="noreferrer"
          >
            linkedin
          </ResourceLink>
          <ResourceRoute to="/resume/">resume</ResourceRoute>
        </ResourceList>
      </ResourcesSection>
    </PageShell>
  </Layout>
)

export const query = graphql`
  query IndexPageQuery {
    photographyBanner: file(relativePath: { eq: "DSCF2798.jpg" }) {
      childImageSharp {
        gatsbyImageData(
          layout: FULL_WIDTH
          quality: 72
          placeholder: BLURRED
          formats: [AUTO, WEBP, AVIF]
        )
      }
    }
  }
`

export default IndexPage
