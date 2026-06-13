/**
 * Implement Gatsby's SSR (Server Side Rendering) APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/ssr-apis/
 */
const React = require('react')

exports.onRenderBody = ({ setHeadComponents }) => {
  setHeadComponents([
    React.createElement('link', {
      key: 'preload-inter',
      rel: 'preload',
      href: '/fonts/inter-400-latin.woff2',
      as: 'font',
      type: 'font/woff2',
      crossOrigin: 'anonymous',
    }),
    React.createElement('link', {
      key: 'preload-crimson-400',
      rel: 'preload',
      href: '/fonts/crimson-text-400-latin.woff2',
      as: 'font',
      type: 'font/woff2',
      crossOrigin: 'anonymous',
    }),
  ])
}
