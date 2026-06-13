import React from 'react'
import styled from 'styled-components'
import Layout from '../components/layout'

const crimsonText = "'Crimson Text', Georgia, 'Times New Roman', serif"

const resumeFileId = '1pLyV-JBoSXRU-M6xu7SDHmrDfegQ0Ed2'
const resumePreviewUrl = `https://drive.google.com/file/d/${resumeFileId}/preview`
const resumeViewUrl = `https://drive.google.com/file/d/${resumeFileId}/view`

const PageShell = styled.div`
  background: #090909;
  color: #f4f1ea;
  font-family: ${crimsonText};
  min-height: 100vh;
  padding-bottom: clamp(3rem, 6vw, 5rem);
`

const ResumeTitle = styled.h1`
  margin: 0;
  padding: clamp(2.5rem, 6vw, 4.5rem) 1.5rem 0.75rem;
  color: #f4f1ea;
  font-family: ${crimsonText};
  font-size: clamp(3rem, 7vw, 5.5rem);
  font-weight: 400;
  line-height: 0.95;
  letter-spacing: -0.03em;
  text-align: center;
`

const OpenLink = styled.a`
  display: block;
  width: fit-content;
  margin: 0 auto clamp(1.5rem, 3vw, 2.5rem);
  color: #f4f1ea;
  font-family: ${crimsonText};
  font-size: clamp(1.1rem, 1.5vw, 1.4rem);
  text-decoration: underline;
  text-underline-offset: 0.12em;
  transition: opacity 160ms ease;

  &:hover,
  &:focus-visible {
    opacity: 0.72;
  }
`

const ResumeFrame = styled.iframe`
  display: block;
  width: min(94vw, 56rem);
  aspect-ratio: 8.5 / 11;
  margin: 0 auto;
  border: 1px solid rgba(255, 255, 255, 0.15);
  background: #ffffff;
`

const ResumePage = () => (
  <Layout pageTitle="resume">
    <PageShell>
      <ResumeTitle>resume</ResumeTitle>
      <OpenLink href={resumeViewUrl} target="_blank" rel="noreferrer">
        open resume in a new tab
      </OpenLink>
      <ResumeFrame title="Resume PDF" src={resumePreviewUrl} />
    </PageShell>
  </Layout>
)

export default ResumePage
