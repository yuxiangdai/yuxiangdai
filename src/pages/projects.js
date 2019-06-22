import React from 'react'
import { Link } from 'gatsby'

import Layout from '../components/layout'
import styles from '../styles/projects.module.css'
// import Image from '../components/image'
import logo from '../images/site.png'

const SecondPage = () => (
  <Layout>
    <h1 className={styles.headerText}>projects</h1>
    <div className={styles.container}>
      <div className={styles.row}>
        <div className={styles.projectItem}>
          <h2>This Website</h2>
          <img src={logo} alt="Yuxiang Dai" />
          <p>
            I made this website as an experiment in using the React framework
            GatsbyJS (the reason why switching between tabs is so fast) and
            GraphQL. I first designed the website in Sketch and then replicated
            the features I wanted in code
          </p>
        </div>
        <div className={styles.projectItem}>
          <h2>This Two</h2>
          <p>test</p>
        </div>
        {/* </div>
      <div className={styles.row}> */}
        <div className={styles.projectItem}>
          <h2>This Three</h2>
          <p>test</p>
        </div>
        <div className={styles.projectItem}>
          <h2>This Four</h2>
          <p>test</p>
        </div>
      </div>
    </div>
  </Layout>
)

export default SecondPage
