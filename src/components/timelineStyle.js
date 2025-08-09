import styled from 'styled-components'

export const Container = styled.div`
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  font-size: 1em;
  color: #e8e6e1;
  font-weight: 300;
  line-height: 1.8;
  letter-spacing: 0.02em;
  padding: 2em 0 4em 0;

  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    border: 0;
    font-size: 100%;
    font: inherit;
    vertical-align: baseline;
  }

  p {
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  }
`

export const TimelineUL = styled.ul`
  position: relative;
  max-width: 100%;
  list-style: none;
`

export const EventLI = styled.li`
  position: relative;
  margin: 2rem 0;
  padding: 0.75rem 1.25rem;
  display: flex;
  align-items: flex-start;
`

export const Icon = styled.label`
  display: none;
`

export const Body = styled.div`
  flex: 1;

  h3 {
    color: #ffffff;
    font-size: 1.1em;
    font-weight: 400;
    letter-spacing: 0.02em;
    margin: 0;
    line-height: 1;
  }

  h4 {
    color: #d1cec9;
    font-size: 0.9em;
    font-weight: 300;
    letter-spacing: 0.03em;
    margin-bottom: 0.5rem;
    margin-top: 0.2rem;
  }
`

export const Year = styled.p`
  color: #d1cec9;
  font-size: 0.85em;
  font-weight: 300;
  letter-spacing: 0.05em;
  width: 4em;
  flex-shrink: 0;
  margin-right: 1em;
  line-height: 1;
  margin-top: 0;
`

export const Description = styled.div`
  color: #d1cec9;
  font-size: 0.9em;
  line-height: 1.7;
  letter-spacing: 0.01em;

  strong {
    font-weight: 400;
  }

  p {
    padding-bottom: 1.5em;
  }
`
