import React from 'react'
import Layout from '../components/layout'
import HeroSection from '../components/sections/HeroSection'
import WorkSection from '../components/sections/WorkSection'
import PhotographySection from '../components/sections/PhotographySection'
import AboutSection from '../components/sections/AboutSection'
import ElsewhereSection from '../components/sections/ElsewhereSection'

const IndexPage = () => (
  <Layout>
    <HeroSection />
    <AboutSection />
    <WorkSection />
    <PhotographySection />
    <ElsewhereSection />
  </Layout>
)

export default IndexPage
