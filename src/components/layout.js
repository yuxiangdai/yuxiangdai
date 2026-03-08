import React from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import { graphql, StaticQuery } from 'gatsby'

import './layout.css'
import Header from './header'

const Layout = ({ children, showHeader }) => (
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
          title={data.site.siteMetadata.title}
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
        {showHeader ? <Header siteTitle="yuxiang dai" /> : null}
        <main>
          {children}
        </main>
      </>
    )}
  />
)

Layout.propTypes = {
  children: PropTypes.node.isRequired,
  showHeader: PropTypes.bool,
}

Layout.defaultProps = {
  showHeader: true,
}

export default Layout
