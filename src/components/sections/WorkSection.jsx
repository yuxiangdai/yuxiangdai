import React from 'react'
import styled, { keyframes, css } from 'styled-components'
import { theme } from '../../styles/tokens'
import useInView from '../useInView'

const fadeInUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`

const Section = styled.section`
  padding: ${theme.space[8]}px ${theme.space[5]}px;
  max-width: ${theme.layout.maxWidth};
  margin: 0 auto;
  scroll-margin-top: 80px;

  @media (max-width: 768px) {
    padding: ${theme.space[7]}px ${theme.space[4]}px;
  }
`

const SectionTitle = styled.h2`
  font-family: ${theme.fonts.body};
  font-size: ${theme.typography.small.size};
  font-weight: 500;
  color: ${theme.colors.textMuted};
  text-transform: uppercase;
  letter-spacing: 0.1em;
  margin: 0 0 ${theme.space[6]}px 0;

  opacity: 0;
  ${props => props.$inView && css`
    animation: ${fadeInUp} 0.6s ${theme.motion.easing} forwards;
  `}
`

const WorkList = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
`

const WorkItem = styled.li`
  padding: ${theme.space[5]}px 0;
  border-bottom: 1px solid ${theme.colors.border};
  transition: transform ${theme.motion.duration} ${theme.motion.easing};

  &:first-child {
    padding-top: 0;
  }

  &:last-child {
    border-bottom: none;
  }

  &:hover {
    transform: translateX(4px);
  }

  @media (prefers-reduced-motion: reduce) {
    &:hover {
      transform: none;
    }
  }

  /* Staggered entrance animation */
  opacity: 0;
  ${props => props.$inView && css`
    animation: ${fadeInUp} 0.6s ${theme.motion.easing} forwards;
    animation-delay: ${props => props.$index * 0.1 + 0.1}s;
  `}
`

const WorkTitle = styled.h3`
  font-family: ${theme.fonts.display};
  font-size: ${theme.typography.h2.size};
  font-weight: ${theme.typography.h2.weight};
  line-height: ${theme.typography.h2.lineHeight};
  color: ${theme.colors.text};
  margin: 0 0 ${theme.space[2]}px 0;
`

const WorkSummary = styled.p`
  font-family: ${theme.fonts.body};
  font-size: ${theme.typography.body.size};
  font-weight: ${theme.typography.body.weight};
  line-height: ${theme.typography.body.lineHeight};
  color: ${theme.colors.textMuted};
  margin: 0 0 ${theme.space[3]}px 0;
`

const WorkDetails = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${theme.space[2]}px ${theme.space[4]}px;
`

const DetailItem = styled.span`
  font-family: ${theme.fonts.body};
  font-size: ${theme.typography.small.size};
  color: ${theme.colors.textMuted};
  opacity: 0.8;
`

const work = [
  {
    title: 'Symbolica AI',
    summary: 'Building next-generation AI reasoning systems.',
    details: ['Software Engineer', 'Core infrastructure', 'Current']
  },
  {
    title: 'Ideogram',
    summary: 'Shipped key features for creative generative AI.',
    details: ['Member of Technical Staff', 'Product engineering', '2024']
  },
  {
    title: 'Amazon',
    summary: 'Built supply chain forecasting systems at scale.',
    details: ['Software Engineer', 'ML infrastructure', '2020-2024']
  }
]

const WorkSection = () => {
  const [ref, isInView] = useInView({ threshold: 0.1 })

  return (
    <Section id="work" ref={ref}>
      <SectionTitle $inView={isInView}>Work Experience</SectionTitle>
      <WorkList>
        {work.map((item, index) => (
          <WorkItem key={index} $inView={isInView} $index={index}>
            <WorkTitle>{item.title}</WorkTitle>
            <WorkSummary>{item.summary}</WorkSummary>
            <WorkDetails>
              {item.details.map((detail, i) => (
                <DetailItem key={i}>{detail}</DetailItem>
              ))}
            </WorkDetails>
          </WorkItem>
        ))}
      </WorkList>
    </Section>
  )
}

export default WorkSection
