import React from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import { graphql, useStaticQuery } from 'gatsby'

import Header from './header'
import './layout.css'

const Layout = ({ children }) => {
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
          description
          siteUrl
        }
      }
    }
  `)

  const { title, description, siteUrl } = data.site.siteMetadata
  const personSchema = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Yuxiang Dai',
    url: siteUrl,
    jobTitle: 'Senior Software Engineer',
    worksFor: {
      '@type': 'Organization',
      name: 'Symbolica AI',
    },
    alumniOf: {
      '@type': 'CollegeOrUniversity',
      name: 'University of Toronto',
    },
    sameAs: [
      'https://www.linkedin.com/in/yuxiangdai/',
      'https://github.com/yuxiangdai',
      'https://500px.com/yuxiangdai',
      'https://www.behance.net/yuxiangdai',
    ],
  }

  return (
    <>
      <Helmet
        title={title}
        meta={[
          {
            name: 'description',
            content: description,
          },
          {
            name: 'keywords',
            content: 'yuxiang dai, software engineer, ai, symbolica',
          },
        ]}
      >
        <html lang="en" />
        <link rel="canonical" href={`${siteUrl}/`} />
        <link
          rel="alternate"
          type="text/plain"
          href={`${siteUrl}/llms.txt`}
          title="LLM profile"
        />
        <link
          rel="alternate"
          type="text/plain"
          href={`${siteUrl}/llms-full.txt`}
          title="LLM extended profile"
        />
        <script type="application/ld+json">
          {JSON.stringify(personSchema)}
        </script>
      </Helmet>
      <Header siteTitle="yuxiang dai" />
      <main>{children}</main>
    </>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
