module.exports = {
  siteMetadata: {
    title: 'Chumba Casino',
    description :'Description',
    author : 'Chumba Casino'
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
    'gatsby-plugin-netlify', // make sure to keep it last in the array
  ],
}
