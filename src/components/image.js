import React from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'

const Image = () => {
  const data = useStaticQuery(graphql`
    query {
      placeholderImage: file(
        relativePath: { eq: "Yuxiang_Signature_White.png" }
      ) {
        childImageSharp {
          gatsbyImageData(width: 1000, quality: 100, placeholder: NONE)
        }
      }
    }
  `)

  const image = getImage(data.placeholderImage)
  return <GatsbyImage image={image} alt="Yuxiang Dai signature" />
}

export default Image
