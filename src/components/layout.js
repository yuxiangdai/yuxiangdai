import React from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import { StaticQuery, graphql } from 'gatsby'

import Header from './header'
import './layout.css'

const Layout = ({ children }) => (
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
          title={"data.site.siteMetadata.title"}
          meta={[
            {
              name: 'description',
              content:
                'Yuxiang Dai - Senior software engineer working on systems, agents, and thoughtful tools. San Francisco.',
            },
            { name: 'keywords', content: 'yuxiang dai, software engineer, ai, symbolica' },
          ]}
        >
          <html lang="en" />
        </Helmet>
        <Header siteTitle="yuxiang dai" />
        <main>
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
