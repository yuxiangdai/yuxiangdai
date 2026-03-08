import React from 'react'
import styled from 'styled-components'
import Layout from '../components/layout'

const crimsonTextSemibold = "'Crimson Text', Georgia, 'Times New Roman', serif"

const ResumeTitle = styled.h1`
  margin: 0;
  padding: 2rem 10% 1.5rem;
  color: #f4f1ea;
  font-family: ${crimsonTextSemibold};
  font-size: clamp(3rem, 7vw, 5.5rem);
  font-weight: 400;
  line-height: 0.95;
  letter-spacing: -0.03em;
`

const ResumePage = () => (
  <Layout showHeader={false}>
    <ResumeTitle>resume</ResumeTitle>
    <iframe
      title="Resume PDF"
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
