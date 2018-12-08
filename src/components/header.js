import { Link } from 'gatsby'
import PropTypes from 'prop-types'
import React from 'react'

const Header = ({ siteTitle }) => (
  <div
    style={{
      background: 'black',
      marginBottom: '1.45rem',
    }}
  >
    <div
      style={{
        display: 'flex',
        margin: '0 auto',
        'justify-content': 'flex-end',
        maxWidth: 960,
        padding: '1.45rem 1.0875rem',
      }}
    >
      <h1 style={{ margin: 0, fontFamily: 'Josefin Sans' }}>
        <Link
          to="/"
          style={{
            color: 'white',
            textDecoration: 'none',
          }}
        >
          {siteTitle}
        </Link>
      </h1>
      <h2
        style={{
          float: 'right',
          marginRight: '0px',
          marginBottom: '0px',
          marginTop: '12px',
          marginLeft: 'auto',
        }}
      >
        <Link
          to="/about/"
          style={{
            color: 'white',
            textDecoration: 'none',
          }}
        >
          About
        </Link>
      </h2>
      <h2
        style={{
          float: 'right',
          marginRight: '0px',
          marginBottom: '0px',
          marginTop: '12px',
          marginLeft: '15px',
        }}
      >
        <Link
          to="/projects/"
          style={{
            color: 'white',
            textDecoration: 'none',
          }}
        >
          Projects
        </Link>
      </h2>
    </div>
  </div>
)

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: '',
}

export default Header
