import React from 'react'
import styled from 'styled-components'

import Layout from '../components/layout'

const Link = styled.a`
  color: white;
  display: block;
  margin-bottom: 2rem;
  text-decoration: none;
  text-align: center;
  &:hover {
    color: grey;
  }
`

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
      <Link href="https://www.linkedin.com/in/yuxiangdai/">linkedin</Link>
      <Link href="https://github.com/yuxiangdai">github</Link>
      <Link href="https://500px.com/yuxiangdai">500px</Link>
      <Link href="https://www.behance.net/yuxiangdai">behance</Link>
      <Link href="https://www.quora.com/profile/Yuxiang-Dai-1?sort=recency">
        quora
      </Link>
    </div>
  </Layout>
)

export default ElsewherePage
