import React from 'react'
import styled from 'styled-components'

import Layout from '../components/layout'
import Img from 'gatsby-image'
import styles from '../styles/photos.module.css'
import { graphql } from 'gatsby'

const Link = styled.a`
  color: white;
  display: block;
  margin-bottom: 2rem;
  text-decoration: none;
  text-align: center;
  &:hover {
    color: grey;
  }
`

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
  max-width: 2048px;
  justify-content: center;
`

export default function PhotosPage({ data }) {
  console.log(data)

  return (
    <Layout>
      <div
        style={{
          margin: '0 auto',
          maxWidth: 1400,
          padding: '0px 1.0875rem 1.45rem',
          paddingTop: 0,
        }}
      >
        <h1>photos</h1>
        <ImageContainer>
          {Object.keys(data).map((key, index) => (
            <Img
              key={index}
              className={styles.image}
              fluid={data[key].childImageSharp.fluid}
            />
          ))}
        </ImageContainer>
      </div>
    </Layout>
  )
}

export const query = graphql`
  query {
    image1: file(relativePath: { eq: "DSCF2721.jpg" }) {
      childImageSharp {
        # Specify the image processing specifications right in the query.
        # Makes it trivial to update as your page's design changes.
        fluid(maxWidth: 4000, quality: 100) {
          ...GatsbyImageSharpFluid
        }
      }
    }

    image2: file(relativePath: { eq: "DSCF1502.jpg" }) {
      childImageSharp {
        # Specify the image processing specifications right in the query.
        # Makes it trivial to update as your page's design changes.
        fluid(maxWidth: 4000, quality: 100) {
          ...GatsbyImageSharpFluid
        }
      }
    }

    image3: file(relativePath: { eq: "DSCF2603.jpg" }) {
      childImageSharp {
        # Specify the image processing specifications right in the query.
        # Makes it trivial to update as your page's design changes.
        fluid(maxWidth: 4000, quality: 100) {
          ...GatsbyImageSharpFluid
        }
      }
    }

    image4: file(relativePath: { eq: "DSCF2798.jpg" }) {
      childImageSharp {
        # Specify the image processing specifications right in the query.
        # Makes it trivial to update as your page's design changes.
        fluid(maxWidth: 4000, quality: 100) {
          ...GatsbyImageSharpFluid
        }
      }
    }

    image5: file(relativePath: { eq: "DSCF2770.jpg" }) {
      childImageSharp {
        # Specify the image processing specifications right in the query.
        # Makes it trivial to update as your page's design changes.
        fluid(maxWidth: 4000, quality: 100) {
          ...GatsbyImageSharpFluid
        }
      }
    }
  }
`
