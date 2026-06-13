import React from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import { graphql, StaticQuery } from 'gatsby'

import './layout.css'

const Layout = ({ children, pageTitle }) => (
  <StaticQuery
    query={graphql`
      query SiteTitleQuery {
        site {
          siteMetadata {
            title
          }
        }
      }
    `}
    render={(data) => (
      <>
        <Helmet
          title={
            pageTitle
              ? `${pageTitle} — ${data.site.siteMetadata.title}`
              : data.site.siteMetadata.title
          }
          meta={[
            {
              name: 'description',
              content:
                'Yuxiang Dai - Software engineer working on systems, agents, and thoughtful tools. San Francisco.',
            },
            {
              name: 'keywords',
              content: 'yuxiang dai, software engineer, ai, symbolica',
            },
          ]}
        >
          <html lang="en" />
        </Helmet>
        <main>{children}</main>
      </>
    )}
  />
)

Layout.propTypes = {
  children: PropTypes.node.isRequired,
  pageTitle: PropTypes.string,
}

Layout.defaultProps = {
  pageTitle: null,
}

export default Layout
