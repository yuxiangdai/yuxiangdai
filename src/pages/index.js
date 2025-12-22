import React from 'react'
import styled from 'styled-components'
import { StaticImage } from 'gatsby-plugin-image'
import { Link } from 'gatsby'
import Layout from '../components/layout'
import { Timeline, Event } from '../components/timeline'
import MilkyWayBackground from '../components/MilkyWayBackground'

const Container = styled.div`
  margin: 0 auto;
  max-width: 800px;
  padding: 0 2rem 4rem;
  padding-top: 0;
  position: relative;
  z-index: 1;

  @media (max-width: 768px) {
    padding: 0 1.5rem 3rem;
  }
`

const HeroSection = styled.div`
  position: relative;
  overflow: hidden;
  min-height: 100vh;
  margin-top: -1.45rem;
  margin-left: -2rem;
  margin-right: -2rem;
  padding-left: 2rem;
  padding-right: 2rem;
  z-index: 0;
`

const Logo = styled.div`
  display: block;
  margin-left: auto;
  margin-right: auto;
  margin-top: 8rem;
  margin-bottom: 10rem;
  width: 40%;
  opacity: 0.9;
  position: relative;
  z-index: 1;

  @media (max-width: 768px) {
    margin-top: 4rem;
    margin-bottom: 6rem;
    width: 70%;
  }
`


const SignatureLayer = styled.div`
  position: relative;
  z-index: 2;
  filter: drop-shadow(0 2px 4px rgba(0,0,0,0.3));
`


const AboutSection = styled.div`
  margin-bottom: 8rem;
  padding-bottom: 4rem;
  border-bottom: 1px solid rgba(184, 181, 176, 0.15);

  p {
    color: #e8e6e1;
    font-size: 0.9rem;
    line-height: 1.6;
    margin-bottom: 1.2rem;
  }

  @media (max-width: 768px) {
    margin-bottom: 4rem;
    padding-bottom: 2rem;
  }
`

const ExperienceSection = styled.div`
  margin-bottom: 8rem;
  padding-top: 2rem;

  @media (max-width: 768px) {
    margin-bottom: 4rem;
    padding-top: 1rem;
  }
`

const IndexPage = () => (
  <Layout>
    <HeroSection>
      <MilkyWayBackground
        starDensity={1200}
        bandStrength={0.8}
        twinkleSpeed={0.6}
        driftSpeed={0.5}
        maxDpr={1.5}
      />
      <Container>
        <Logo>
          <SignatureLayer>
            <StaticImage
              src="../images/Yuxiang_Signature_White.png"
              alt="Yuxiang Dai signature"
              placeholder="none"
              layout="constrained"
              width={500}
            />
          </SignatureLayer>
        </Logo>
      </Container>
    </HeroSection>
    <Container>
      <AboutSection>
        <h1>about</h1>
        <p>
          I currently work at Symbolica AI.
        </p>
        <p>
          I was previously working on generative AI products at Ideogram and Supply Chain Forecasting at Amazon.
        </p>
        <p>
          I studied Robotics Engineering at the University of Toronto's Engineering Science program.
        </p>
        <p>
          Outside of work, I enjoy <Link to="/photos/" style={{ color: '#5a9fd4', textDecoration: 'none', borderBottom: '1px solid rgba(90, 159, 212, 0.3)', transition: 'border-color 0.2s ease' }}>photography</Link>, hiking, classical music and visiting art museums.
        </p>
      </AboutSection>
      <ExperienceSection>
        <h1>experience</h1>
        <Timeline>
          <Event
            year={'now'}
            title={'Symbolica AI'}
            subtitle={'software engineer'}
          ></Event>
          <Event
            year={2024}
            title={'Ideogram'}
            subtitle={'member of technical staff'}
          ></Event>
          <Event
            year={2020}
            title={'Amazon'}
            subtitle={'software development engineer'}
          ></Event>
        </Timeline>
      </ExperienceSection>
    </Container>
  </Layout>
)

export default IndexPage
