import React from 'react'
import { Link } from 'gatsby'

import Layout from '../components/layout'
import Image from '../components/image'
import logo from '../images/Yuxiang_Signature_White.png'
import styles from '../styles/index.module.css'

const IndexPage = () => (
  <Layout>
    <div
      style={{
        margin: '0 auto',
        maxWidth: 960,
        padding: '0px 1.0875rem 1.45rem',
        paddingTop: 0,
      }}
    >
      <img className={styles.headerImage} src={logo} alt="Yuxiang Dai" />
      <h1>about</h1>
      <p>
        I'm Yuxiang Dai, currently an Engineering Science Student at the
        University of Toronto studying Robotics Engineering
      </p>
      <p>
        My main areas of expertise include Web Development and Mobile App
        Development
      </p>

      <p>Here's a couple technologies I'm familiar with:</p>
      <div style={{ maxWidth: '300px', marginBottom: '1.45rem' }}>
        {/* <Image /> */}
      </div>
      <Link to="/projects/">Go to my projects</Link>
    </div>
  </Layout>
)

export default IndexPage
