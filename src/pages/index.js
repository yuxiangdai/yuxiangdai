import React from 'react'
import styled from 'styled-components'
import { Link } from 'gatsby'

import Layout from '../components/layout'
import logo from '../images/Yuxiang_Signature_White.png'

const Container = styled.div`
  margin: 0 auto;
  max-width: 960px;
  padding: 0px 1.0875rem 1.45rem;
  padding-top: 0;
`

const Logo = styled.img`
  display: block;
  margin-left: auto;
  margin-right: auto;
  margin-top: 142px;
  margin-bottom: 142px;
  width: 50%;
`

const IndexPage = () => (
  <Layout>
    <Container>
      <Logo src={logo} alt="Yuxiang Dai" />
      <h1>about</h1>
      <p>
        I'm Yuxiang Dai, currently an Engineering Science Student at the
        University of Toronto studying Robotics Engineering. My main areas of
        expertise are Full Stack Web Development and Mobile App Development.
      </p>
      <Link to="/projects/">Go to my projects</Link>
    </Container>
  </Layout>
)

export default IndexPage
