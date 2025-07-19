import React from 'react'
import styled from 'styled-components'
import { Link } from 'gatsby'
import { StaticImage } from 'gatsby-plugin-image'
import Layout from '../components/layout'
import { Timeline, Event } from '../components/timeline'

const Container = styled.div`
  margin: 0 auto;
  max-width: 960px;
  padding: 0px 1.0875rem 1.45rem;
  padding-top: 0;
`

const Logo = styled.div`
  display: block;
  margin-left: auto;
  margin-right: auto;
  margin-top: 142px;
  margin-bottom: 142px;
  width: 50%;
`

const StyledLink = styled(Link)`
  color: white;
  margin: 100px 0;
  &:hover {
    color: grey;
  }
`

const AboutSection = styled.div`
  margin-bottom: 150px;
  background: rgba(255, 255, 255, 0.03);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 16px;
  padding: 40px;
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.3);
`

const ExperienceSection = styled.div`
  background: rgba(255, 255, 255, 0.03);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 16px;
  padding: 40px;
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.3);
  margin-bottom: 80px;
`

const IndexPage = ({ data }) => (
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
          I'm Yuxiang Dai, currently a Software Developer. I am a
          graduate of the University of Toronto where I majored in Robotics
          Engineering (Engineering Science). At UofT, I studied various topics
          including software development, machine learning, natural language
          processing, systems control, and computer vision. In software
          development, my main areas of expertise have been Full Stack Web
          Development and Mobile App Development.
        </p>
        <p>
          In my free time, I enjoy watching various sports including the NBA,
          Formula One, and PGA Tour. I also used to actively participate in
          hackathons and engineering clubs as a student.
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

      <StyledLink to="/projects/">Go to my projects</StyledLink>
    </Container>
  </Layout>
)

export default IndexPage
