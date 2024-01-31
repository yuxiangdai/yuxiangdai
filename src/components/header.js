import { Link } from 'gatsby'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import React from 'react'
import styles from './header.module.css'

const Container = styled.div`
  background: black;
  margin-bottom: 1.45rem;
  border-top: 4px solid #fff;
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
        <HeaderSection link="/projects/" text="projects" />
        <HeaderSection link="/resume/" text="resume" />
        <HeaderSection link="/photos/" text="photography" />
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
