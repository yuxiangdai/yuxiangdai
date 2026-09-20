import { Children, isValidElement } from 'react'

const getText = (children) =>
  Children.toArray(children)
    .map((child) => {
      if (typeof child === 'string' || typeof child === 'number') return child
      if (!isValidElement(child)) return ''
      return getText(child.props.children)
    })
    .join(' ')

// An editorial estimate, with optional time for figures or other dense content.
export const getReadingTime = (
  content,
  { wordsPerMinute = 200, additionalMinutes = 0 } = {}
) => {
  const words = getText(content).trim().split(/\s+/).filter(Boolean).length
  return Math.max(1, Math.ceil(words / wordsPerMinute + additionalMinutes))
}
