import { Link } from 'gatsby'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import React from 'react'
import * as styles from './header.module.css'

const Container = styled.div`
  background: rgba(0, 0, 0, 0.8);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  margin-bottom: 1.45rem;
  border-top: 2px solid rgba(255, 255, 255, 0.1);
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.4);
  position: sticky;
  top: 0;
  z-index: 1000;
  transition: all 0.3s ease;
`

const HeaderSection = props => (
  <h2 className={styles.links}>
    <Link to={props.link} className={styles.headerText}>
      {props.text}
    </Link>
  </h2>
)

const Header = ({ siteTitle }) => (
  <Container>
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
        <HeaderSection link="/" text="about" />
        <HeaderSection link="/resume/" text="resume" />
        <HeaderSection link="/photos/" text="photography" />
        <HeaderSection link="/projects/" text="projects" />
        <HeaderSection link="/elsewhere/" text="elsewhere" />
      </div>
    </div>
  </Container>
)

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: '',
}

export default Header
