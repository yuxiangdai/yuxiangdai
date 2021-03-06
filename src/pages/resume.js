import React from 'react'
import { Link } from 'gatsby'

import Layout from '../components/layout'
import Image from '../components/image'

const ResumePage = () => (
  <Layout>
    <h1>resume</h1>
    <iframe
      src="https://drive.google.com/file/d/1pLyV-JBoSXRU-M6xu7SDHmrDfegQ0Ed2/preview"
      width="80%"
      style={{
        margin: '0 10%',
      }}
      height="1100px"
    />
  </Layout>
)

export default ResumePage
