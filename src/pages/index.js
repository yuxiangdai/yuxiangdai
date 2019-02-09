import React from 'react'
import { Link } from 'gatsby'

import Layout from '../components/layout'
import Image from '../components/image'
import logo from '../images/Yuxiang_Signature_White2.png'
import styles from '../styles/index.module.css'

const IndexPage = () => (
  <Layout>
    <img className={styles.headerImage} src={logo} alt="Yuxiang Dai" />
    <h1>about</h1>
    <p>I am Yuxiang Dai</p>
    <p>Now go build something great.</p>

    <p>
      Lorem Ipsum is simply dummy text of the printing and typesetting industry.
      Lorem Ipsum has been the industry's standard dummy text ever since the
      1500s, when an unknown printer took a galley of type and scrambled it to
      make a type specimen book. Lorem Ipsum is simply dummy text of the
      printing and typesetting industry. Lorem Ipsum has been the industry's
      standard dummy text ever since the 1500s, when an unknown printer took a
      galley of type and scrambled it to make a type specimen book. Lorem Ipsum
      is simply dummy text of the printing and typesetting industry. Lorem Ipsum
      has been the industry's standard dummy text ever since the 1500s, when an
      unknown printer took a galley of type and scrambled it to make a type
      specimen book. Lorem Ipsum is simply dummy text of the printing and
      typesetting industry. Lorem Ipsum has been the industry's standard dummy
      text ever since the 1500s, when an unknown printer took a galley of type
      and scrambled it to make a type specimen book.
    </p>
    <div style={{ maxWidth: '300px', marginBottom: '1.45rem' }}>
      {/* <Image /> */}
    </div>
    <Link to="/page-2/">Go to page 2</Link>
  </Layout>
)

export default IndexPage
