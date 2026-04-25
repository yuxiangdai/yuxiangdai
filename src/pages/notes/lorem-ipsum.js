import React from 'react'
import { Link } from 'gatsby'
import styled from 'styled-components'
import Layout from '../../components/layout'

const serif = "'Crimson Text', Georgia, 'Times New Roman', serif"
const mono = "'SFMono-Regular', Consolas, 'Liberation Mono', Menlo, monospace"

const Page = styled.div`
  --paper: #f5f5f5;
  --paper-2: #e8e8e8;
  --ink: #1a1a1a;
  --ink-soft: #4a4a4a;
  --ink-faint: #8a8378;
  --rule: #1a1a1a;
  min-height: 100vh;
  background: var(--paper);
  color: var(--ink);
  font-family: ${serif};
  padding: clamp(1.25rem, 4vw, 3.5rem) clamp(1rem, 3vw, 2rem) clamp(5rem, 10vw, 7.5rem);
`

const Frame = styled.div`
  max-width: 80rem;
  margin: 0 auto;
  border: 1.5px solid var(--ink);
  background: #fbfaf6;
  box-shadow: 3px 4px 0 var(--ink), 8px 12px 24px rgba(0, 0, 0, 0.1);
`

const Chrome = styled.div`
  display: flex;
  align-items: center;
  gap: 0.55rem;
  padding: 0.55rem 0.8rem;
  border-bottom: 1.5px solid var(--ink);
  background: var(--paper-2);
  color: var(--ink-soft);
  font-family: ${mono};
  font-size: 0.72rem;
`

const Dot = styled.span`
  width: 0.58rem;
  height: 0.58rem;
  border: 1px solid var(--ink);
  border-radius: 50%;
  background: #fbfaf6;
  flex: 0 0 auto;
`

const Url = styled.span`
  flex: 1;
  min-width: 0;
  padding: 0.25rem 0.6rem;
  border: 1px dashed var(--ink-faint);
  border-radius: 999px;
  background: #fbfaf6;
  text-align: center;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`

const SiteNav = styled.nav`
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: 1.5rem;
  padding: clamp(1rem, 2.4vw, 1.35rem) clamp(1.4rem, 5vw, 4rem);
  border-bottom: 1px dashed rgba(0, 0, 0, 0.18);

  @media (max-width: 700px) {
    align-items: flex-start;
    flex-direction: column;
    gap: 0.7rem;
  }
`

const SiteName = styled(Link)`
  color: var(--ink);
  font-family: ${serif};
  font-size: 1.35rem;
  font-weight: 700;
  text-decoration: none;
`

const NavLinks = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.8rem 1.35rem;
  color: var(--ink-soft);
  font-family: ${serif};
  font-size: 0.95rem;
  font-weight: 600;
`

const NavAnchor = styled.a`
  color: inherit;
  text-decoration: none;

  &[aria-current='page'] {
    color: var(--ink);
    border-bottom: 1.5px solid var(--ink);
  }
`

const NavRoute = styled(Link)`
  color: inherit;
  text-decoration: none;
`

const ArticleGrid = styled.article`
  display: grid;
  grid-template-columns: 12.5rem minmax(0, 1fr) 12.5rem;
  gap: 2.25rem;
  padding: clamp(2rem, 5vw, 3.5rem) clamp(1.4rem, 5vw, 4rem) clamp(3rem, 6vw, 4.5rem);

  @media (max-width: 1100px) {
    grid-template-columns: 1fr;
  }
`

const MarginColumn = styled.aside`
  color: var(--ink-soft);
  font-family: ${serif};
  font-size: 1rem;
  line-height: 1.35;
  padding-top: ${({ $right }) => ($right ? '17.5rem' : '12.5rem')};

  @media (max-width: 1100px) {
    display: none;
  }
`

const MarginNote = styled.div`
  border-top: 1px dashed var(--ink-faint);
  padding: 0.55rem 0 1rem;

  b {
    color: var(--ink);
    font-weight: 700;
  }
`

const ArticleBody = styled.div`
  max-width: 45rem;
  margin: 0 auto;
  min-width: 0;

  p {
    color: var(--ink);
    font-size: 1rem;
    line-height: 1.65;
    margin: 0 0 1rem;
  }

  .lede::first-letter {
    float: left;
    font-size: 3.1rem;
    font-weight: 700;
    line-height: 0.9;
    padding: 0.35rem 0.45rem 0 0;
  }

  ol {
    font-size: 1rem;
    line-height: 1.6;
    margin: 0 0 1.25rem;
    padding-left: 1.35rem;
  }
`

const Kicker = styled.p`
  color: var(--ink-faint) !important;
  font-size: 0.86rem !important;
  font-style: italic;
  letter-spacing: 0.02em;
  margin-bottom: 0.8rem !important;
`

const PostTitle = styled.h1`
  margin: 0 0 0.9rem;
  color: var(--ink);
  font-family: ${serif};
  font-size: clamp(2.6rem, 6vw, 3.5rem);
  font-weight: 700;
  letter-spacing: 0;
  line-height: 1.05;
`

const Dek = styled.p`
  color: var(--ink-soft) !important;
  font-size: clamp(1.2rem, 2.4vw, 1.4rem) !important;
  font-style: italic;
  line-height: 1.4 !important;
  margin-bottom: 1.4rem !important;
`

const Byline = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.65rem 0.9rem;
  align-items: center;
  margin-bottom: 2rem;
  padding-bottom: 1.55rem;
  border-bottom: 1.5px solid var(--ink);
  color: var(--ink-faint);
  font-family: ${serif};
  font-size: 0.78rem;
  letter-spacing: 0.02em;
`

const Pip = styled.span`
  width: 0.24rem;
  height: 0.24rem;
  border-radius: 50%;
  background: var(--ink-faint);
`

const SectionHeading = styled.h2`
  margin: 2.6rem 0 0.85rem;
  padding-top: 1.25rem;
  border-top: 1px solid var(--ink);
  color: var(--ink);
  font-family: ${serif};
  font-size: clamp(1.55rem, 3vw, 1.9rem);
  font-weight: 700;
  letter-spacing: 0;
  line-height: 1.15;
`

const HeadingNumber = styled.span`
  margin-right: 0.65rem;
  color: var(--ink-faint);
  font-family: ${mono};
  font-size: 0.82rem;
  font-weight: 500;
  vertical-align: middle;
`

const InlineCode = styled.code`
  padding: 0.05rem 0.35rem;
  border: 1px solid rgba(0, 0, 0, 0.08);
  border-radius: 3px;
  background: var(--paper-2);
  font-family: ${mono};
  font-size: 0.9em;
`

const CodeFigure = styled.figure`
  margin: 1.4rem 0 1.75rem;
`

const CodeHead = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 1rem;
  padding: 0.4rem 0.75rem;
  border: 1.5px solid var(--ink);
  border-bottom: 0;
  background: var(--paper-2);
  color: var(--ink-soft);
  font-family: ${mono};
  font-size: 0.75rem;
`

const Pre = styled.pre`
  margin: 0;
  padding: 1rem;
  overflow: auto;
  border: 1.5px solid var(--ink);
  background: #1a1a1a;
  color: #f5f5f5;
  font-family: ${mono};
  font-size: 0.82rem;
  line-height: 1.55;
`

const Caption = styled.figcaption`
  margin-top: 0.45rem;
  color: var(--ink-faint);
  font-family: ${serif};
  font-size: 0.82rem;
  font-style: italic;
  text-align: center;
`

const DiagramFigure = styled.figure`
  margin: 1.75rem 0;
`

const Diagram = styled.div`
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  gap: 0.8rem;
  align-items: center;
  padding: 1.4rem 1rem;
  border: 1.5px solid var(--ink);
  background: var(--paper);
  box-shadow: 3px 3px 0 var(--ink);

  @media (max-width: 620px) {
    grid-template-columns: 1fr;
  }
`

const DiagramBox = styled.div`
  padding: 0.8rem;
  border: 1.5px solid var(--ink);
  background: var(--paper-2);
  text-align: center;
  font-size: 0.95rem;
`

const DiagramArrow = styled.span`
  color: var(--ink);
  font-family: ${mono};

  @media (max-width: 620px) {
    transform: rotate(90deg);
    justify-self: center;
  }
`

const PullQuote = styled.blockquote`
  margin: 2rem -1.25rem;
  padding: 1.2rem 1.45rem;
  border-left: 3px solid var(--ink);
  color: var(--ink);
  font-family: ${serif};
  font-size: clamp(1.15rem, 2.3vw, 1.35rem);
  font-style: italic;
  line-height: 1.4;

  cite {
    display: block;
    margin-top: 0.65rem;
    color: var(--ink-faint);
    font-size: 0.82rem;
    font-style: normal;
  }
`

const DataTable = styled.figure`
  margin: 1.75rem 0;
  overflow-x: auto;

  table {
    width: 100%;
    border-collapse: collapse;
    border-top: 1.5px solid var(--ink);
    border-bottom: 1.5px solid var(--ink);
    font-size: 0.95rem;
  }

  th {
    padding: 0.45rem 0.55rem;
    border-bottom: 1px solid var(--ink);
    color: var(--ink);
    font-family: ${mono};
    font-size: 0.68rem;
    letter-spacing: 0.06em;
    text-align: left;
    text-transform: uppercase;
  }

  td {
    padding: 0.5rem 0.55rem;
    border-bottom: 1px dotted rgba(0, 0, 0, 0.2);
    vertical-align: top;
  }

  tr:last-child td {
    border-bottom: 0;
  }
`

const Footnotes = styled.section`
  margin-top: 3rem;
  padding-top: 1rem;
  border-top: 1.5px solid var(--ink);
  color: var(--ink-soft);
  font-size: 0.9rem;
  line-height: 1.5;

  h2 {
    margin: 0 0 0.6rem;
    color: var(--ink);
    font-family: ${mono};
    font-size: 0.72rem;
    letter-spacing: 0.06em;
    text-transform: uppercase;
  }
`

const PostFooter = styled.footer`
  margin-top: 3.5rem;
  padding-top: 1.5rem;
  border-top: 1.5px solid var(--ink);
  text-align: center;
`

const BackLink = styled(Link)`
  color: var(--ink);
  font-family: ${serif};
  font-size: 1rem;
  font-weight: 700;
  text-decoration: none;
  border-bottom: 1.5px solid var(--ink);
`

const LoremIpsumPage = () => (
  <Layout showHeader={false}>
    <Page>
      <Frame>
        <Chrome>
          <Dot />
          <Dot />
          <Dot />
          <Url>yuxiangdai.com/notes/lorem-ipsum</Url>
        </Chrome>

        <SiteNav aria-label="Post navigation">
          <SiteName to="/">yuxiang dai</SiteName>
          <NavLinks>
            <NavAnchor href="/#about">about</NavAnchor>
            <NavAnchor href="/#work">work</NavAnchor>
            <NavAnchor href="/#blog" aria-current="page">
              notes
            </NavAnchor>
            <NavRoute to="/photos/">photography</NavRoute>
          </NavLinks>
        </SiteNav>

        <ArticleGrid>
          <MarginColumn>
            <MarginNote>
              <b>contents</b>
              <br />
              {'->'} 01 lorem ipsum
              <br />
              {'->'} 02 dolor sit
              <br />
              {'->'} 03 amet consectetur
              <br />
              {'->'} 04 adipiscing elit
            </MarginNote>
            <MarginNote>
              <b>est.</b> 5 min read
              <br />
              <b>~</b> draft
            </MarginNote>
          </MarginColumn>

          <ArticleBody>
            <Kicker>notes · draft · lorem ipsum</Kicker>
            <PostTitle>Lorem ipsum dolor sit amet</PostTitle>
            <Dek>
              consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
              dolore magna aliqua.
            </Dek>

            <Byline>
              <span>yuxiang dai</span>
              <Pip />
              <span>5 min read</span>
              <Pip />
              <span>placeholder</span>
              <Pip />
              <span>stub draft</span>
            </Byline>

            <p className="lede">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio.
              Praesent libero. Sed cursus ante dapibus diam. Sed nisi. Nulla quis sem at
              nibh elementum imperdiet.
            </p>

            <p>
              Duis sagittis ipsum. Praesent mauris. Fusce nec tellus sed augue semper
              porta. Mauris massa. Vestibulum lacinia arcu eget nulla. Class aptent
              taciti sociosqu ad litora torquent per conubia nostra.
            </p>

            <SectionHeading>
              <HeadingNumber>01</HeadingNumber>lorem ipsum
            </SectionHeading>
            <p>
              Curabitur sodales ligula in libero. Sed dignissim lacinia nunc. Curabitur
              tortor. Pellentesque nibh. Aenean quam. In scelerisque sem at dolor.
              Placeholder inline code can look like <InlineCode>return lorem</InlineCode>.
            </p>

            <CodeFigure>
              <CodeHead>
                <strong>js</strong>
                <span>placeholder.js</span>
              </CodeHead>
              <Pre>{`export function placeholder() {
  return 'lorem ipsum'
}`}</Pre>
              <Caption>fig. 1 - placeholder code sample.</Caption>
            </CodeFigure>

            <SectionHeading>
              <HeadingNumber>02</HeadingNumber>dolor sit
            </SectionHeading>
            <p>
              Morbi in ipsum sit amet pede facilisis laoreet. Donec lacus nunc, viverra
              nec, blandit vel, egestas et, augue. Vestibulum tincidunt malesuada tellus.
            </p>

            <DiagramFigure>
              <Diagram aria-label="Placeholder diagram">
                <DiagramBox>lorem ipsum</DiagramBox>
                <DiagramArrow>{'->'}</DiagramArrow>
                <DiagramBox>dolor sit amet</DiagramBox>
              </Diagram>
              <Caption>fig. 2 - placeholder diagram.</Caption>
            </DiagramFigure>

            <PullQuote>
              lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
              tempor incididunt ut labore.
              <cite>- placeholder note</cite>
            </PullQuote>

            <SectionHeading>
              <HeadingNumber>03</HeadingNumber>amet consectetur
            </SectionHeading>
            <p>
              Praesent blandit dolor. Sed non quam. In vel mi sit amet augue congue
              elementum. Morbi in ipsum sit amet pede facilisis laoreet.
            </p>

            <DataTable>
              <table>
                <thead>
                  <tr>
                    <th>item</th>
                    <th>state</th>
                    <th>note</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>lorem</td>
                    <td>draft</td>
                    <td>placeholder row</td>
                  </tr>
                  <tr>
                    <td>ipsum</td>
                    <td>draft</td>
                    <td>placeholder row</td>
                  </tr>
                  <tr>
                    <td>dolor</td>
                    <td>draft</td>
                    <td>placeholder row</td>
                  </tr>
                </tbody>
              </table>
              <Caption>tbl. 1 - placeholder table.</Caption>
            </DataTable>

            <SectionHeading>
              <HeadingNumber>04</HeadingNumber>adipiscing elit
            </SectionHeading>
            <p>
              Nulla metus metus, ullamcorper vel, tincidunt sed, euismod in, nibh. Quisque
              volutpat condimentum velit. Class aptent taciti sociosqu ad litora.
            </p>

            <Footnotes>
              <h2>notes</h2>
              <ol>
                <li>Lorem ipsum dolor sit amet.</li>
                <li>Consectetur adipiscing elit.</li>
              </ol>
            </Footnotes>

            <PostFooter>
              <BackLink to="/#blog">← all notes</BackLink>
            </PostFooter>
          </ArticleBody>

          <MarginColumn $right>
            <MarginNote>
              <b>placement.</b> lorem ipsum dolor sit amet.
            </MarginNote>
            <MarginNote>
              <b>code.</b> consectetur adipiscing elit.
            </MarginNote>
            <MarginNote>
              <b>tables.</b> sed do eiusmod tempor.
            </MarginNote>
          </MarginColumn>
        </ArticleGrid>
      </Frame>
    </Page>
  </Layout>
)

export default LoremIpsumPage
