import React from 'react'
import styled from 'styled-components'
import Layout from '../components/layout'
// import Image from '../components/image'
import logo from '../images/site.png'
import ball from '../images/ballance.png'
import StyledLink from '../components/StyledLink'
import { graphql } from 'gatsby'
import Img from 'gatsby-image'
import styles from '../styles/projects.module.css'

const ImageContainer = styled.div`
  display: block;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 10px;
`

const Container = styled.div`
  margin: 0 auto;
  padding: 0px 1.0875rem 1.45rem;
  padding-top: 0;
  display: flex;
  max-width: 1440px;
  justify-content: center;
`

const ProjectsPage = ({ data }) => (
  <Layout>
    <h1 className={styles.headerText}>projects</h1>
    <Container className={styles.container}>
      <div className={styles.row}>
        <div className={styles.projectItem}>
          <h2>yuxiangdai.com</h2>
          <ImageContainer>
            <Img
              className={styles.image}
              fluid={data.image1.childImageSharp.fluid}
            />
          </ImageContainer>
          <p>
            I made this website as an experiment in using the React framework
            GatsbyJS and GraphQL. I first created a template for the website in
            Sketch, replicated the features I wanted in Javascript, and finally
            setup deployments using Github Pages and TravisCI. The photo above
            shows one of the original Sketch designs I based this site off of in
            the initial first design.
          </p>
        </div>
        <div className={styles.projectItem}>
          <h2>Ballance</h2>
          <ImageContainer>
            <Img
              className={styles.image}
              fluid={data.image2.childImageSharp.fluid}
            />
          </ImageContainer>
          <p>
            Ballance is a robotics project which uses feedback control and
            computer vision to balance a ping pong ball on a limited flat
            surface. I used OpenCV to create a HSV filter to track the ball
            position based on its color. The position data is sent to an Arduino
            which sends control signals to the servo motors.
          </p>
        </div>
        <div className={styles.projectItem}>
          <h2>TellORB</h2>
          <ImageContainer>
            <Img
              className={styles.image}
              fluid={data.tellorb.childImageSharp.fluid}
            />
          </ImageContainer>
          <p>
            TellORB was my final year thesis project. The idea was to use a DJI
            Tello drone to map an unknown indoor environment and allow for
            navigation commands to be sent on a 2D GUI interface using vSLAM
            (visual Simultaneous Localization and Mapping) in the form of
            ORB-SLAM2 and local path planning algorithms. An external Dell XPS13
            computer was used for egomotion estimation and a real-time interface
            to the drone using ROS (Robotics Operating System), UDP, and H264
            video decoding.
          </p>
        </div>
        <div className={styles.projectItem}>
          <h2>Uncanny</h2>
          <ImageContainer>
            <Img
              className={styles.image}
              fluid={data.uncanny.childImageSharp.fluid}
            />
          </ImageContainer>
          <p>
            Uncanny was a soup and pop can sorting robot built upon the
            PIC18F4620 microcontroller. Soup cans were separated from pop cans
            based on their size. Soup cans were then sorted based on whether or
            not they still contained a label using conductive V-shaped
            detectors, which align the can and rotate to drop them into the
            corresponding bins. Pop cans were sorted based on whether or not
            they had pop tabs using a push-pull circular conductive detector
          </p>
        </div>
        <div className={styles.projectItem}>
          <h2>TurtleBot Projects</h2>
          <ImageContainer>
            <Img
              className={styles.image}
              fluid={data.turtlebot3.childImageSharp.fluid}
            />
          </ImageContainer>
          <p>
            Various projects were run on the TurtleBot 2 & 3 platforms. These
            include navigation of unknown environments using laser sensors,
            mapping of point cloud data using particle filters, global A* path
            planning, local obstacle avoidance and image detection & feature
            matching using a Microsoft Kinect sensor.
          </p>
        </div>
        <div className={styles.projectItem}>
          <h2>KUKA Robotic Arm</h2>
          <ImageContainer>
            <Img
              className={styles.image}
              fluid={data.kuka.childImageSharp.fluid}
            />
          </ImageContainer>
          <p>
            Simulations for a 6-axis robotic arm were run on the Robotics
            Toolbox for MATLAB. Solving the inverse kinematics in the simulation
            allowed for fine motor control of a real KUKA robotics arm. On the
            right, the arm is shown drawing various shapes and trajectories with
            a pencil.
          </p>
        </div>
      </div>
    </Container>
  </Layout>
)

export const query = graphql`
  query {
    image1: file(relativePath: { eq: "sketch_site.png" }) {
      childImageSharp {
        # Specify the image processing specifications right in the query.
        # Makes it trivial to update as your page's design changes.
        fluid(maxWidth: 600, quality: 100) {
          ...GatsbyImageSharpFluid
        }
      }
    }

    image2: file(relativePath: { eq: "ballance.png" }) {
      childImageSharp {
        # Specify the image processing specifications right in the query.
        # Makes it trivial to update as your page's design changes.
        fluid(maxWidth: 300, quality: 100) {
          ...GatsbyImageSharpFluid
        }
      }
    }

    uncanny: file(relativePath: { eq: "uncanny.png" }) {
      childImageSharp {
        # Specify the image processing specifications right in the query.
        # Makes it trivial to update as your page's design changes.
        fluid(maxWidth: 300, quality: 100) {
          ...GatsbyImageSharpFluid
        }
      }
    }

    tellorb: file(relativePath: { eq: "tello.png" }) {
      childImageSharp {
        # Specify the image processing specifications right in the query.
        # Makes it trivial to update as your page's design changes.
        fluid(maxWidth: 300, quality: 100) {
          ...GatsbyImageSharpFluid
        }
      }
    }

    kuka: file(relativePath: { eq: "kuka.png" }) {
      childImageSharp {
        # Specify the image processing specifications right in the query.
        # Makes it trivial to update as your page's design changes.
        fluid(maxWidth: 300, quality: 100) {
          ...GatsbyImageSharpFluid
        }
      }
    }

    turtlebot3: file(relativePath: { eq: "turtle.png" }) {
      childImageSharp {
        # Specify the image processing specifications right in the query.
        # Makes it trivial to update as your page's design changes.
        fluid(maxWidth: 300, quality: 100) {
          ...GatsbyImageSharpFluid
        }
      }
    }
  }
`

export default ProjectsPage
