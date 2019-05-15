import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import Layout from '../components/Layout'
import SEO from "../components/seo"


export const GameTemplate = ({ title}) => {
  return (
    <section className="section section--gradient">
      <div className="container">
        <div className="columns">
          <div className="column is-10 is-offset-1">
            <div className="section">
              <h2 className="title is-size-3 has-text-weight-bold is-bold-light">
                {title}
              </h2>
              
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

GameTemplate.propTypes = {
  title: PropTypes.string.isRequired,
}

const GamePage = ({ data }) => {
  const { wordpressWpGames: page } = data;
  const yoast = page.yoast_meta;

  return (
    <Layout>
      <SEO title={yoast.yoast_wpseo_title} description={yoast.yoast_wpseo_metadesc} />
      <GameTemplate title={page.title} />
    </Layout>
  )
}

GamePage.propTypes = {
  data: PropTypes.object.isRequired,
}

export default GamePage

export const pageQuery = graphql`
  query GamesById($id: String!) {
    wordpressWpGames(id: { eq: $id }) {
      title
      yoast_meta {
        yoast_wpseo_title
        yoast_wpseo_metadesc
        yoast_wpseo_canonical
        yoast_wpseo_facebook_title
        yoast_wpseo_facebook_description
        yoast_wpseo_facebook_type
        yoast_wpseo_facebook_image
        yoast_wpseo_twitter_title
        yoast_wpseo_twitter_description
        yoast_wpseo_twitter_image
        yoast_wpseo_social_url
        yoast_wpseo_company_or_person
        yoast_wpseo_person_name
        yoast_wpseo_company_name
        yoast_wpseo_company_logo
        yoast_wpseo_website_name
      }
    }
  }
`
