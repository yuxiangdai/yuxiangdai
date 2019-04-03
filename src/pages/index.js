import React from 'react'
import { Link } from 'gatsby'

import Layout from '../components/layout'
import Image from '../components/image'
import logo from '../images/Yuxiang_Signature_White.png'
import styles from '../styles/index.module.css'

const IndexPage = () => (
  <Layout>
    <img className={styles.headerImage} src={logo} alt="Yuxiang Dai" />
    <h1>about</h1>
    <p>I am Yuxiang Dai</p>
    <p>This site is a work in progress</p>
    <div style={{ maxWidth: '300px', marginBottom: '1.45rem' }}>
      {/* <Image /> */}
    </div>
    <Link to="/projects/">Go to my projects</Link>
  </Layout>
)

export default IndexPage
