module.exports = {
  siteMetadata: {
    title: 'Chumba Casino',
    description :'Description',
    author : 'Chumba Casino',
    siteUrl: `http://10.1.222.150:9000`,
  },
  plugins: [
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-emotion',
    'gatsby-plugin-sass',
    {
      resolve: 'gatsby-source-wordpress',
      options: {
        // The base url to your WP site.
        baseUrl: 'localhost:8000',
        // WP.com sites set to true, WP.org set to false
        hostingWPCOM: false,
        // The protocol. This can be http or https.
        protocol: 'http',
        // Use 'Advanced Custom Fields' Wordpress plugin
        useACF: true,
        auth: {},
        // Set to true to debug endpoints on 'gatsby build'
        verboseOutput: true,
        includedRoutes: [
          "**/games",
          "**/posts",
          "**/pages",
          "**/media",
          "**/tags",
          "**/taxonomies",
          "**/users",
          '**/menus',
          '**/category',
          '**/categories',
          '**/home-sections',
          '**/testimonials',
          
          
        ],
        // searchAndReplaceContentUrls: {
        //   sourceUrl: "http://localhost:8000",
        //   replacementUrl: "http://localhost:8001",
        // }
      },
    },
    'gatsby-plugin-sharp',
    'gatsby-transformer-sharp',    
    {
      // Removes unused css rules
      resolve:'gatsby-plugin-purgecss',
      options: {
        // Activates purging in gatsby develop
        develop: true,
        // Purge only the main css file
        purgeOnly: ['/all.sass'],
      },
    }, // must be after other CSS plugins
    {
      resolve: 'gatsby-plugin-nprogress',
      options: {
        showSpinner: false,
        trickle: false,
        minimum: 0.4,
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Chumba Casino`,
        short_name: `Chumba Casino`,
        start_url: `/`,
        background_color: `#f7f0eb`,
        theme_color: `#a2466c`,
        display: `standalone`,
        icon: `src/img/icon.png`,
      },
    },
    `gatsby-plugin-offline`,
    {
      resolve: `gatsby-plugin-sitemap`,
        options: {
          sitemapSize: 5000
        }
    },
    'gatsby-plugin-netlify', // make sure to keep it last in the array
  ],
}
