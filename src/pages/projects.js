import React from 'react'
import styled from 'styled-components'
import Layout from '../components/layout'
import { graphql, Link } from 'gatsby'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'

const crimsonText = "'Crimson Text', Georgia, 'Times New Roman', serif"

const PageShell = styled.div`
  --page-bg: #090909;
  --paper: #d8d8d6;
  --paper-shadow: rgba(0, 0, 0, 0.2);
  --text-dark: #080808;
  --text-light: #f4f1ea;
  background: var(--page-bg);
  color: var(--text-light);
  font-family: ${crimsonText};
  min-height: 100vh;
  padding-bottom: clamp(3rem, 6vw, 5rem);
`

const PageTitle = styled.h1`
  margin: 0;
  padding: clamp(2.5rem, 6vw, 4.5rem) 1.5rem clamp(1.5rem, 4vw, 2.5rem);
  color: var(--text-light);
  font-family: ${crimsonText};
  font-size: clamp(3rem, 7vw, 5.5rem);
  font-weight: 400;
  line-height: 0.95;
  letter-spacing: -0.03em;
  text-align: center;
`

const PanelRow = styled.div`
  padding: 0 clamp(1rem, 4vw, 5rem);
`

const PaperPanel = styled.section`
  max-width: 74rem;
  margin: 0 auto;
  background: var(--paper);
  color: var(--text-dark);
  box-shadow: 0 24px 80px var(--paper-shadow);
  padding: clamp(1.35rem, 3vw, 2.5rem);
`

const ProjectGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(20rem, 100%), 1fr));
  gap: clamp(1.5rem, 3vw, 2.5rem);
`

const ProjectItem = styled.article`
  min-width: 0;
`

const ProjectTitle = styled.h2`
  margin: 0 0 0.75rem;
  color: var(--text-dark);
  font-family: ${crimsonText};
  font-size: clamp(1.6rem, 2.4vw, 2.2rem);
  line-height: 1.02;
  font-weight: 400;
`

const ProjectImage = styled(GatsbyImage)`
  display: block;
  margin-bottom: 0.8rem;
  width: 100%;
`

const ProjectCopy = styled.p`
  margin: 0;
  color: var(--text-dark);
  font-family: ${crimsonText};
  font-size: clamp(0.98rem, 1.2vw, 1.1rem);
  line-height: 1.45;
`

const BackLink = styled(Link)`
  display: block;
  margin: clamp(2rem, 4vw, 3rem) auto 0;
  width: fit-content;
  color: var(--text-light);
  font-family: ${crimsonText};
  font-size: clamp(1.1rem, 1.5vw, 1.4rem);
  text-decoration: none;
  border-bottom: 1px solid transparent;
  transition:
    border-color 160ms ease,
    opacity 160ms ease;

  &:hover,
  &:focus-visible {
    opacity: 0.72;
    border-color: rgba(255, 255, 255, 0.3);
  }
`

const projects = [
  {
    title: 'yuxiangdai.com',
    image: 'image1',
    alt: 'Website design',
    copy: `I made this website as an experiment in using the React framework
      GatsbyJS and GraphQL. I first created a template for the website in
      Sketch, replicated the features I wanted in Javascript, and finally
      setup deployments using Github Pages and TravisCI. The photo above
      shows one of the original Sketch designs I based this site off of in
      the initial first design.`,
  },
  {
    title: 'ballance',
    image: 'image2',
    alt: 'Ballance project',
    copy: `Ballance is a robotics project which uses feedback control and
      computer vision to balance a ping pong ball on a limited flat
      surface. I used OpenCV to create a HSV filter to track the ball
      position based on its color. The position data is sent to an Arduino
      which sends control signals to the servo motors.`,
  },
  {
    title: 'tellorb',
    image: 'tellorb',
    alt: 'TellORB project',
    copy: `TellORB was my final year thesis project. The idea was to use a DJI
      Tello drone to map an unknown indoor environment and allow for
      navigation commands to be sent on a 2D GUI interface using vSLAM
      (visual Simultaneous Localization and Mapping) in the form of
      ORB-SLAM2 and local path planning algorithms. An external Dell XPS13
      computer was used for egomotion estimation and a real-time interface
      to the drone using ROS (Robotics Operating System), UDP, and H264
      video decoding.`,
  },
  {
    title: 'uncanny',
    image: 'uncanny',
    alt: 'Uncanny project',
    copy: `Uncanny was a soup and pop can sorting robot built upon the
      PIC18F4620 microcontroller. Soup cans were separated from pop cans
      based on their size. Soup cans were then sorted based on whether or
      not they still contained a label using conductive V-shaped
      detectors, which align the can and rotate to drop them into the
      corresponding bins. Pop cans were sorted based on whether or not
      they had pop tabs using a push-pull circular conductive detector.`,
  },
  {
    title: 'turtlebot projects',
    image: 'turtlebot3',
    alt: 'TurtleBot project',
    copy: `Various projects were run on the TurtleBot 2 & 3 platforms. These
      include navigation of unknown environments using laser sensors,
      mapping of point cloud data using particle filters, global A* path
      planning, local obstacle avoidance and image detection & feature
      matching using a Microsoft Kinect sensor.`,
  },
  {
    title: 'kuka robotic arm',
    image: 'kuka',
    alt: 'KUKA robotic arm',
    copy: `Simulations for a 6-axis robotic arm were run on the Robotics
      Toolbox for MATLAB. Solving the inverse kinematics in the simulation
      allowed for fine motor control of a real KUKA robotics arm. On the
      right, the arm is shown drawing various shapes and trajectories with
      a pencil.`,
  },
]

const ProjectsPage = ({ data }) => (
  <Layout pageTitle="projects">
    <PageShell>
      <PageTitle>projects</PageTitle>
      <PanelRow>
        <PaperPanel>
          <ProjectGrid>
            {projects.map((project) => (
              <ProjectItem key={project.title}>
                <ProjectTitle>{project.title}</ProjectTitle>
                <ProjectImage
                  image={getImage(data[project.image])}
                  alt={project.alt}
                />
                <ProjectCopy>{project.copy}</ProjectCopy>
              </ProjectItem>
            ))}
          </ProjectGrid>
        </PaperPanel>
      </PanelRow>
      <BackLink to="/">back to home</BackLink>
    </PageShell>
  </Layout>
)

export const query = graphql`
  query {
    image1: file(relativePath: { eq: "sketch_site.png" }) {
      childImageSharp {
        gatsbyImageData(width: 600, quality: 100, placeholder: NONE)
      }
    }

    image2: file(relativePath: { eq: "ballance.png" }) {
      childImageSharp {
        gatsbyImageData(width: 600, quality: 100, placeholder: NONE)
      }
    }

    uncanny: file(relativePath: { eq: "uncanny.png" }) {
      childImageSharp {
        gatsbyImageData(width: 600, quality: 100, placeholder: NONE)
      }
    }

    tellorb: file(relativePath: { eq: "tello.png" }) {
      childImageSharp {
        gatsbyImageData(width: 600, quality: 100, placeholder: NONE)
      }
    }

    kuka: file(relativePath: { eq: "kuka.png" }) {
      childImageSharp {
        gatsbyImageData(width: 600, quality: 100, placeholder: NONE)
      }
    }

    turtlebot3: file(relativePath: { eq: "turtle.png" }) {
      childImageSharp {
        gatsbyImageData(width: 600, quality: 100, placeholder: NONE)
      }
    }
  }
`

export default ProjectsPage
