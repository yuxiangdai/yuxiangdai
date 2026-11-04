import React from 'react'
import { Link } from 'gatsby'
import styled from 'styled-components'
import AlpinePage from '../components/alpine-page'

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
    summary: 'building demand forecasting systems at global scale',
    role: 'Software Engineer',
    team: 'Demand Forecasting',
    tenure: '2020 - 2024',
  },
]

const Bio = styled.div`
  max-width: 36rem;
  font-size: clamp(1.15rem, 2vw, 1.35rem);
  p + p {
    margin-top: 1rem;
  }
  a {
    text-decoration: underline;
    text-underline-offset: 0.2em;
  }
`

const Work = styled.section`
  margin-top: 2.5rem;
  h2 {
    margin-bottom: 1.25rem;
    font-size: 2rem;
  }
  ul {
    margin: 0;
    padding: 0;
    list-style: none;
  }
  li {
    display: grid;
    grid-template-columns: minmax(0, 1fr) auto;
    gap: 0.25rem 1.5rem;
    margin: 0;
    padding: 1rem 0;
    border-top: 1px solid #f5f4ec33;
  }
  h3 {
    margin: 0;
    font: inherit;
    font-size: 1.4rem;
  }
  p {
    font-size: 1rem;
  }
  .tenure {
    color: #d4dedc;
  }
  @media (max-width: 540px) {
    li {
      grid-template-columns: 1fr;
    }
  }
`

const Links = styled.footer`
  display: flex;
  flex-wrap: wrap;
  gap: 1.5rem;
  margin-top: 2rem;
  font-size: 1.1rem;
  a {
    text-decoration: underline;
    text-underline-offset: 0.2em;
  }
`

const AboutPage = () => (
  <AlpinePage
    title="About"
    description="Yuxiang Dai — software engineer in San Francisco."
  >
    <Bio>
      <p>
        I currently work on Applied AI systems at{' '}
        <a href="https://www.symbolica.ai/" target="_blank" rel="noreferrer">
          Symbolica AI
        </a>
        .
      </p>
      <p>
        I was previously working on generative AI products at Ideogram and
        demand forecasting at Amazon.
      </p>
      <p>
        I studied Robotics Engineering at the University of Toronto&apos;s
        Engineering Science program.
      </p>
      <p>
        Outside of work, I enjoy <Link to="/photos/">photography</Link>, hiking,
        classical music, and visiting art museums.
      </p>
    </Bio>
    <Work aria-labelledby="work-title">
      <h2 id="work-title">Work</h2>
      <ul>
        {workItems.map((item) => (
          <li key={item.company}>
            <div>
              <h3>{item.company}</h3>
              <p>
                {item.role} · {item.team}
              </p>
              <p>{item.summary}</p>
            </div>
            <p className="tenure">{item.tenure}</p>
          </li>
        ))}
      </ul>
    </Work>
    <Links aria-label="More about Yuxiang">
      <Link to="/resume/">Résumé</Link>
      <a href="https://www.linkedin.com/in/yuxiangdai/">LinkedIn</a>
      <a href="mailto:yuxiang.dai43@gmail.com">Contact</a>
    </Links>
  </AlpinePage>
)

export default AboutPage
