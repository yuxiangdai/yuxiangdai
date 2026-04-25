import React from 'react'
import { graphql, Link } from 'gatsby'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'
import styled from 'styled-components'
import Layout from '../components/layout'

const crimsonTextSemibold = "'Crimson Text', Georgia, 'Times New Roman', serif"
const showBlogSection = false
const aboutRightInset = 'clamp(4rem, 12vw, 18rem)'
const workPanelInset = 'clamp(1rem, 4vw, 5rem)'

const workItems = [
  {
    company: 'Symbolica AI',
    summary: 'building AI agents and next-generation reasoning systems',
    role: 'Software Engineer',
    team: 'Applied AI',
    tenure: '2025 - Current',
  },
  {
    company: 'Ideogram',
    summary: 'shipping creative generative AI products for millions of users',
    role: 'Member of Technical Staff',
    team: 'Product Engineering',
    tenure: '2024 - 2025',
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
    date: 'lorem ipsum',
    title: 'Lorem ipsum dolor sit amet',
    excerpt: 'consectetur adipiscing elit, sed do eiusmod tempor incididunt...',
    href: '/notes/lorem-ipsum/',
    readTime: '5 min',
  },
]

const featuredWritingItem = writingItems[0]
const recentWritingItems = writingItems.slice(1)

const PageShell = styled.div`
  --page-bg: #090909;
  --paper: #d8d8d6;
  --paper-shadow: rgba(0, 0, 0, 0.2);
  --text-dark: #080808;
  --text-light: #f4f1ea;
  --text-soft: rgba(244, 241, 234, 0.78);
  --rule: rgba(255, 255, 255, 0.08);
  background:
    linear-gradient(180deg, rgba(255, 255, 255, 0.02), transparent 16%),
    var(--page-bg);
  color: var(--text-light);
  font-family: 'Crimson Text', Georgia, 'Times New Roman', serif;
  overflow: clip;
`

const IntroSection = styled.section`
  min-height: clamp(28rem, 64vh, 44rem);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: clamp(4.5rem, 8vw, 7.5rem) 1.5rem clamp(1.5rem, 3vw, 2.5rem);

  @media (max-width: 700px) {
    min-height: clamp(24rem, 56vh, 32rem);
    align-items: flex-end;
    padding-top: 5.5rem;
    padding-bottom: 1.25rem;
  }
`

const IntroInner = styled.div`
  text-align: center;
  transform: translateY(clamp(-1rem, -1.8vw, -1.75rem));

  @media (max-width: 700px) {
    transform: translateY(clamp(-0.5rem, -1.2vw, -0.9rem));
  }
`

const Name = styled.h1`
  margin: 0;
  color: inherit;
  font-family: ${crimsonTextSemibold};
  font-size: clamp(3rem, 8.1vw, 5.8rem);
  line-height: 0.92;
  font-weight: 400;
  letter-spacing: normal;

  @media (max-width: 700px) {
    font-size: clamp(2.35rem, 10.5vw, 3.35rem);
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
  padding-right: ${({ $rightOffset }) => $rightOffset || '1rem'};
  margin-bottom: clamp(1.5rem, 4vw, 3rem);

  @media (max-width: 1100px) {
    padding-left: 1rem;
    padding-right: 1rem;
  }
`

const PaperPanel = styled.section`
  max-width: ${({ $maxWidth }) => $maxWidth || '74rem'};
  background: var(--paper);
  color: var(--text-dark);
  box-shadow: 0 24px 80px var(--paper-shadow);
  padding: clamp(1.35rem, 3vw, 2.5rem);
`

const SectionTitle = styled.h2`
  margin: 0 0 clamp(1rem, 3vw, 2rem);
  color: var(--text-dark);
  font-family: ${crimsonTextSemibold};
  font-size: clamp(2.15rem, 5vw, 4.4rem);
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

const ExternalAnchor = styled.a`
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

const BlogPanel = styled(PaperPanel)`
  display: grid;
  grid-template-columns: minmax(9rem, 0.55fr) minmax(0, 1.45fr);
  gap: clamp(1.75rem, 7vw, 9rem);
  align-items: start;
  min-height: clamp(8rem, 15vw, 13.5rem);

  @media (max-width: 760px) {
    grid-template-columns: 1fr;
    gap: 1.4rem;
  }
`

const BlogTitle = styled(SectionTitle)`
  margin: 0;
`

const BlogBody = styled.div`
  display: grid;
  gap: 0.85rem;
  border-left: 1px solid rgba(8, 8, 8, 0.22);
  padding-left: clamp(1.25rem, 3.5vw, 3rem);

  @media (max-width: 760px) {
    border-left: 0;
    border-top: 1px solid rgba(8, 8, 8, 0.22);
    padding-left: 0;
    padding-top: 1.2rem;
  }
`

const FeaturedPost = styled.article`
  padding: 0.15rem 0 1.1rem;
  border-bottom: 1.5px solid rgba(8, 8, 8, 0.25);
`

const FeaturedKicker = styled.p`
  margin: 0 0 0.25rem;
  color: rgba(8, 8, 8, 0.58);
  font-family: ${crimsonTextSemibold};
  font-size: clamp(1rem, 1.2vw, 1.15rem);
  line-height: 1.2;
`

const FeaturedTitle = styled.h3`
  display: inline;
  margin: 0;
  color: var(--text-dark);
  font-family: ${crimsonTextSemibold};
  font-size: clamp(1.55rem, 2.4vw, 2.65rem);
  line-height: 1.06;
  font-weight: 400;
  background-image: linear-gradient(rgba(8, 8, 8, 0.85), rgba(8, 8, 8, 0.85));
  background-repeat: no-repeat;
  background-position: 0 93%;
  background-size: 100% 1px;
`

const FeaturedExcerpt = styled.p`
  max-width: 46rem;
  margin: 0.55rem 0 0;
  color: rgba(8, 8, 8, 0.72);
  font-family: ${crimsonTextSemibold};
  font-size: clamp(1rem, 1.25vw, 1.2rem);
  line-height: 1.28;
`

const BlogLink = styled(Link)`
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

const RecentPosts = styled.div`
  display: grid;
  gap: 0;
`

const RecentPost = styled.article`
  display: grid;
  grid-template-columns: minmax(5.5rem, 8rem) minmax(0, 1fr) auto;
  gap: 0.75rem;
  align-items: baseline;
  padding: 0.45rem 0;
  border-bottom: 1px dotted rgba(8, 8, 8, 0.22);

  &:last-child {
    border-bottom: 0;
  }

  @media (max-width: 680px) {
    grid-template-columns: 1fr;
    gap: 0.15rem;
  }
`

const RecentDate = styled.span`
  color: rgba(8, 8, 8, 0.52);
  font-family: ${crimsonTextSemibold};
  font-size: clamp(0.85rem, 1vw, 1rem);
  font-weight: 600;
  line-height: 1.2;
`

const RecentTitle = styled.h3`
  margin: 0;
  color: var(--text-dark);
  font-family: ${crimsonTextSemibold};
  font-size: clamp(1rem, 1.25vw, 1.2rem);
  font-weight: 600;
  line-height: 1.2;
`

const RecentReadTime = styled.span`
  color: rgba(8, 8, 8, 0.52);
  font-family: ${crimsonTextSemibold};
  font-size: clamp(0.8rem, 0.9vw, 0.95rem);
  font-style: italic;
  line-height: 1.2;
`

const PhotographySection = styled.section`
  position: relative;
  min-height: clamp(14rem, 40vw, 46.5rem);
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

  &,
  & > div,
  picture {
    height: 100%;
  }

  img {
    object-fit: cover !important;
    object-position: center 42% !important;
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
`

const PhotographyTitle = styled.h2`
  margin: 0;
  color: inherit;
  font-family: ${crimsonTextSemibold};
  font-size: clamp(2.45rem, 5.8vw, 5.1rem);
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
  font-size: clamp(1.7rem, 3.2vw, 2.7rem);
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

      <PanelRow $offset="0" $rightOffset={aboutRightInset}>
        <PaperPanel $maxWidth="96rem" id="about">
          <SectionTitle data-node-id="505:22">about</SectionTitle>
          <AboutCopy>
            <p>
              I currently work on Applied AI systems at{' '}
              <ExternalAnchor
                href="https://www.symbolica.ai/"
                target="_blank"
                rel="noreferrer"
              >
                Symbolica AI
              </ExternalAnchor>.
            </p>
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

      <PanelRow $offset={workPanelInset} $rightOffset={workPanelInset}>
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
          <BlogPanel $maxWidth="98rem" id="blog" data-node-id="505:111">
            <BlogTitle data-node-id="505:112">blog</BlogTitle>
            <BlogBody>
              {featuredWritingItem ? (
                <FeaturedPost>
                  <FeaturedKicker>latest · {featuredWritingItem.date}</FeaturedKicker>
                  {featuredWritingItem.href ? (
                    <BlogLink to={featuredWritingItem.href}>
                      <FeaturedTitle>{featuredWritingItem.title}</FeaturedTitle>
                    </BlogLink>
                  ) : (
                    <FeaturedTitle>{featuredWritingItem.title}</FeaturedTitle>
                  )}
                  <FeaturedExcerpt>{featuredWritingItem.excerpt}</FeaturedExcerpt>
                </FeaturedPost>
              ) : null}

              {recentWritingItems.length > 0 ? (
                <RecentPosts>
                  {recentWritingItems.map((item) => (
                    <RecentPost key={`${item.date}-${item.title}`}>
                      <RecentDate>{item.date}</RecentDate>
                      {item.href ? (
                        <BlogLink to={item.href}>
                          <RecentTitle>{item.title}</RecentTitle>
                        </BlogLink>
                      ) : (
                        <RecentTitle>{item.title}</RecentTitle>
                      )}
                      {item.readTime ? <RecentReadTime>{item.readTime}</RecentReadTime> : null}
                    </RecentPost>
                  ))}
                </RecentPosts>
              ) : null}
            </BlogBody>
          </BlogPanel>
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
