import React from 'react'
import { Link } from 'gatsby'
import styled from 'styled-components'
import AlpinePage from '../components/alpine-page'

const EssayList = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;
`

const Essay = styled.article`
  display: grid;
  grid-template-columns: minmax(8rem, 0.3fr) minmax(0, 1fr);
  gap: 1.25rem clamp(2rem, 5vw, 5rem);
  padding: 0;

  time {
    padding-top: 0.35rem;
    color: #d4dedc;
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
  <AlpinePage
    title="Writing"
    description="Essays by Yuxiang Dai, including Linear and Sparse Attention, featuring Kimi and DeepSeek."
  >
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
              Read
            </Link>
          </div>
        </Essay>
      </li>
    </EssayList>
  </AlpinePage>
)

export default WritingPage
