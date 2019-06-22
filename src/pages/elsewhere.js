import React from 'react'
import { Link } from 'gatsby'

import Layout from '../components/layout'
import Image from '../components/image'
import styles from '../styles/projects.module.css'

const ElsewherePage = () => (
  <Layout>
    <div
      style={{
        margin: '0 auto',
        maxWidth: 960,
        padding: '0px 1.0875rem 1.45rem',
        paddingTop: 0,
      }}
    >
      <h1>elsewhere</h1>
      <p>linkedin</p>
      <p>github</p>
      <p>500px</p>
      <p>behance</p>
    </div>
  </Layout>
)

export default ElsewherePage
