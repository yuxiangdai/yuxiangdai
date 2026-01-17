import styled from 'styled-components'
import { theme } from '../styles/tokens'

export const Container = styled.div`
  font-family: ${theme.fonts.body};
  font-size: 1em;
  color: ${theme.colors.text};
  font-weight: 400;
  line-height: 1.8;
  letter-spacing: 0.02em;
  padding: 1em 0 2em 0;

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
    font-family: ${theme.fonts.body};
  }
`

export const TimelineUL = styled.ul`
  position: relative;
  max-width: 100%;
  list-style: none;
`

export const EventLI = styled.li`
  position: relative;
  margin: 1.5rem 0;
  padding: 0.5rem 0;
  display: flex;
  align-items: flex-start;
`

export const Icon = styled.label`
  display: none;
`

export const Body = styled.div`
  flex: 1;

  h3 {
    color: ${theme.colors.text};
    font-family: ${theme.fonts.body};
    font-size: 1.05em;
    font-weight: 500;
    letter-spacing: 0.01em;
    margin: 0;
    line-height: 1.2;
  }

  h4 {
    color: ${theme.colors.textMuted};
    font-family: ${theme.fonts.body};
    font-size: 0.9em;
    font-weight: 400;
    letter-spacing: 0.02em;
    margin-bottom: 0.5rem;
    margin-top: 0.25rem;
  }
`

export const Year = styled.p`
  color: ${theme.colors.textMuted};
  font-family: ${theme.fonts.body};
  font-size: 0.85em;
  font-weight: 400;
  letter-spacing: 0.04em;
  width: 4em;
  flex-shrink: 0;
  margin-right: 1.5em;
  line-height: 1.2;
  margin-top: 0;
`

export const Description = styled.div`
  color: ${theme.colors.textMuted};
  font-size: 0.9em;
  line-height: 1.6;
  letter-spacing: 0.01em;

  strong {
    font-weight: 500;
  }

  p {
    padding-bottom: 1.5em;
  }
`
