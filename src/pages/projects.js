import React from 'react'
import { Link } from 'gatsby'

import Layout from '../components/layout'
import styles from '../styles/index.module.css'

const SecondPage = () => (
  <Layout>
    <h1>projects</h1>
    <div class="container">
      <div className={styles.row}>
        <div className={styles.projectItem}>
          <p>test</p>
        </div>
        <div className={styles.projectItem}>
          <p>test</p>
        </div>
      </div>
      <div className={styles.row}>
        <div className={styles.projectItem}>
          <p>test</p>
        </div>
        <div className={styles.projectItem}>
          <p>test</p>
        </div>
      </div>
    </div>
    <Link to="/">Go back to the homepage</Link>
  </Layout>
)

export default SecondPage
