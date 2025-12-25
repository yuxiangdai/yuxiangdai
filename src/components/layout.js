import React from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import { StaticQuery, graphql } from 'gatsby'

import Header from './header'
import './layout.css'

const Layout = ({ children }) => (
  <StaticQuery
    query={graphql`
      query SiteMetadataQuery {
        site {
          siteMetadata {
            title
            description
            siteUrl
            author
          }
        }
      }
    `}
    render={(data) => (
      <>
        <Helmet
          title={data.site.siteMetadata.title}
          titleTemplate={`%s | ${data.site.siteMetadata.title}`}
          meta={[
            {
              name: 'description',
              content: data.site.siteMetadata.description,
            },
            { name: 'keywords', content: 'yuxiang dai, software engineer, portfolio' },
            { name: 'robots', content: 'index,follow' },
            { property: 'og:site_name', content: data.site.siteMetadata.title },
            { property: 'og:type', content: 'website' },
            { property: 'og:title', content: data.site.siteMetadata.title },
            {
              property: 'og:description',
              content: data.site.siteMetadata.description,
            },
            { property: 'og:url', content: data.site.siteMetadata.siteUrl },
            { name: 'twitter:card', content: 'summary' },
            { name: 'twitter:title', content: data.site.siteMetadata.title },
            {
              name: 'twitter:description',
              content: data.site.siteMetadata.description,
            },
          ]}
        >
          <html lang="en" />
          <link rel="canonical" href={data.site.siteMetadata.siteUrl} />
          <script type="application/ld+json">
            {JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Person',
              name: data.site.siteMetadata.author,
              url: data.site.siteMetadata.siteUrl,
              description: data.site.siteMetadata.description,
              jobTitle: 'Software Engineer',
              alumniOf: 'University of Toronto',
            })}
          </script>
        </Helmet>
        <Header siteTitle={data.site.siteMetadata.title} />
        <main
          className="body"
          style={{
            margin: '0 auto',
            // maxWidth: 960,
            padding: '0px 1.0875rem 1.45rem',
            paddingTop: '1.45rem',
            position: 'relative',
            zIndex: 10,
          }}
        >
          {children}
        </main>
      </>
    )}
  />
)

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
