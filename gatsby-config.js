module.exports = {
  siteMetadata: {
    title: 'Yuxiang Dai',
    description:
      'Yuxiang Dai is a senior software engineer in San Francisco working on systems, agents, and thoughtful tools.',
    siteUrl: 'https://yuxiangdai.com',
  },
  plugins: [
    {
      resolve: `gatsby-plugin-google-fonts`,
      options: {
        fonts: [
          `Inter:wght@400;500;600;700`
        ],
        display: 'swap'
      },
    },
    'gatsby-plugin-react-helmet',
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    `gatsby-plugin-styled-components`,
    'gatsby-transformer-sharp',
    'gatsby-plugin-sharp',
    'gatsby-plugin-image',
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: 'Yuxiang Dai Portfolio',
        short_name: 'Yuxiang Dai',
        start_url: '/',
        background_color: '#663399',
        theme_color: '#663399',
        display: 'minimal-ui',
        icon: 'src/images/favicon-32x32.png',
      },
    },
  ],
}
