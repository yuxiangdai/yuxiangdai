import React from 'react'
import { Container, TimelineUL, EventLI, Icon, Body, Year, Description } from './timelineStyle'

export const Timeline = ({ children }) => (
  <Container>
    <TimelineUL>{children}</TimelineUL>
  </Container>
)

export const Event = ({ title, subtitle, interval, year, children }) => (
  <EventLI>
    <Year>{year}</Year>
    <Icon />
    <Body>
      <h3>{title}</h3>
      {subtitle && <h4>{subtitle}</h4>}
      <Description>{children}</Description>
    </Body>
  </EventLI>
)
