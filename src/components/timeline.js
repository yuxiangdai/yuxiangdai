import React from 'react'

import s from './timelineStyle'

export const Timeline = ({ children }) => (
  <div className={s.container}>
    <ul className={s.timeline}>{children}</ul>
  </div>
)

export const Event = ({ title, subtitle, interval, year, children }) => (
  <li className={s.event}>
    <p className={s.year}>{year}</p>
    <label className={s.icon} />
    <div className={s.body}>
      <h3>{title}</h3>
      {subtitle && <h4>{subtitle}</h4>}
      <div className={s.description}>{children}</div>
    </div>
  </li>
)
