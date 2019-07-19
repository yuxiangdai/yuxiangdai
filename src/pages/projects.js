import React from 'react'
import styled from 'styled-components'
import Layout from '../components/layout'
import styles from '../styles/projects.module.css'
// import Image from '../components/image'
import logo from '../images/site.png'
import ball from '../images/ballance.png'
import StyledLink from '../components/StyledLink'
import { graphql } from 'gatsby'
import Img from 'gatsby-image'

const ImageContainer = styled.div`
  display: block;
  margin-left: auto;
  margin-right: auto;
  height: 300px;
  object-fit: scale-down;
`

const Image = styled.img`
  display: block;
  margin-left: auto;
  margin-right: auto;
  height: 300px;
  object-fit: scale-down;
`

const Container = styled.div`
  margin: 0 auto;
  max-width: 960px;
  padding: 0px 1.0875rem 1.45rem;
  padding-top: 0;
`

const ProjectsPage = ({ data }) => (
  <Layout>
    <h1 className={styles.headerText}>projects</h1>
    <Container className={styles.container}>
      <div className={styles.row}>
        <div className={styles.projectItem}>
          <h2>This Website</h2>
          <ImageContainer>
            <Img fluid={data.file.childImageSharp.fluid} />
          </ImageContainer>
          <p>
            I made this website as an experiment in using the React framework
            GatsbyJS and GraphQL. I first designed the website in Sketch then
            replicated the features I wanted in code.
          </p>
        </div>
        <div className={styles.projectItem}>
          <h2>Ballance</h2>
          <Image src={ball} alt="Yuxiang Dai" />
          <p>
            Ballance is a robotics project which uses feedback control and
            computer vision to balance a ping pong ball on a limited flat
            surface. I used OpenCV to create a HSV filter to track the ball
            position based on its color. The position data is sent to an Arduino
            which sends control signals to the servo motors.
          </p>
        </div>
        {/* <div className={styles.projectItem}>
          <h2>This Three</h2>
          <p>test</p>
        </div>
        <div className={styles.projectItem}>
          <h2>This Four</h2>
          <p>test</p>
        </div> */}
      </div>
    </Container>
  </Layout>
)

export const query = graphql`
  query {
    file(relativePath: { eq: "site.png" }) {
      childImageSharp {
        # Specify the image processing specifications right in the query.
        # Makes it trivial to update as your page's design changes.
        fluid(maxWidth: 600, quality: 100) {
          ...GatsbyImageSharpFluid
        }
      }
    }
  }
`

export default ProjectsPage
