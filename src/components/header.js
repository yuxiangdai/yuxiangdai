import { Link } from 'gatsby'
import PropTypes from 'prop-types'
import React from 'react'
import styles from './header.module.css'

console.log(styles)

const Header = ({ siteTitle }) => (
  <div
    style={{
      background: 'black',
      marginBottom: '1.45rem',
    }}
  >
    <div
      className={styles.headerContainer}
      style={{
        display: 'flex',
        margin: '0 auto',
        'justify-content': 'flex-end',
      }}
    >
      <h1 className={styles.title}>
        <Link to="/" className={styles.headerText}>
          {siteTitle}
        </Link>
      </h1>
      <div className={styles.linksContainer}>
        <h2 className={styles.links}>
          <Link to="/" className={styles.headerText}>
            about
          </Link>
        </h2>
        <h2 className={styles.links}>
          <Link to="/projects/" className={styles.headerText}>
            projects
          </Link>
        </h2>
        <h2 className={styles.links}>
          <Link to="/resume/" className={styles.headerText}>
            resume
          </Link>
        </h2>
        <h2 className={styles.links}>
          <Link to="/elsewhere/" className={styles.headerText}>
            elsewhere
          </Link>
        </h2>
      </div>
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
