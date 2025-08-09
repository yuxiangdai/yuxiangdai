import React from 'react'
import styled from 'styled-components'
import { StaticImage } from 'gatsby-plugin-image'
import Layout from '../components/layout'
import { Timeline, Event } from '../components/timeline'

const Container = styled.div`
  margin: 0 auto;
  max-width: 800px;
  padding: 0 2rem 4rem;
  padding-top: 0;
`

const Logo = styled.div`
  display: block;
  margin-left: auto;
  margin-right: auto;
  margin-top: 8rem;
  margin-bottom: 10rem;
  width: 40%;
  opacity: 0.9;
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
`

const ExperienceSection = styled.div`
  margin-bottom: 8rem;
  padding-top: 2rem;
`

const IndexPage = () => (
  <Layout>
    <Container>
      <Logo>
        <StaticImage
          src="../images/Yuxiang_Signature_White.png"
          alt="Yuxiang Dai signature"
          placeholder="none"
          layout="constrained"
          width={500}
        />
      </Logo>
      <AboutSection>
        <h1>about</h1>
        <p>
          I currently work on generative AI products at Ideogram.
        </p>
        <p>
          I was previously working on Supply Chain Forecasting at Amazon.
        </p>
        <p>
          I studied Robotics Engineering at the University of Toronto's Engineering Science program.
        </p>
        <p>
          Outside of work, I enjoy photography, hiking, classical music and visiting art museums.
        </p>
      </AboutSection>
      <ExperienceSection>
        <h1>experience</h1>
        <Timeline>
          <Event
            year={'now'}
            title={'Ideogram'}
            subtitle={'member of technical staff'}
          ></Event>
          <Event
            year={2022}
            title={'Amazon'}
            subtitle={'software development engineer II'}
          ></Event>
          <Event
            year={2020}
            title={'Amazon'}
            subtitle={'software development engineer'}
          ></Event>
          <Event
            year={2019}
            title={'Mark43'}
            subtitle={'software engineering intern'}
          >
            Web Apps for law enforcement
          </Event>
          <Event title={'Indigo'} subtitle={'mobile developer intern'}>
            Android &amp; iOS Apps for E-commerce, 10K+ daily users
          </Event>
          <Event
            year={2018}
            title={'Indigo'}
            subtitle={'full stack developer intern'}
          >
            Web Apps for load testing & performance monitoring
          </Event>
          <Event year={2017} title={'TD'} subtitle={'developer intern'}>
            Web Apps for cloud architecture diagramming
          </Event>
        </Timeline>
      </ExperienceSection>

    </Container>
  </Layout>
)

export default IndexPage
