import React, { Fragment } from 'react'
import Img from 'gatsby-image'
import styled from '@emotion/styled'
import PropTypes from 'prop-types'
import { graphql, Link } from 'gatsby'
import Layout from '../components/Layout'
import SEO from '../components/seo'

const StyledImg = styled(Img)`
  width: 100%;
  height: 600px;
  @media (min-width: 600px) {
    width: 600px;
  }
`
// should not be passing in data object should pass in typed data!
export const GameTemplate = ({ title, data }) => {
  console.log(data)
  return (
    <Fragment>
      <h2
        className="title is-size-3 has-text-weight-bold is-bold-light"
        dangerouslySetInnerHTML={{ __html: title }}
      />
      <Link to="casino-games">Back to Games</Link>
      <div dangerouslySetInnerHTML={{ __html: data.acf.description }} />
      {data.acf.hero_image && (
        <StyledImg
          key={data.slug}
          fluid={data.acf.hero_image.localFile.childImageSharp.fluid}
        />
      )}
      {data.acf.medium_icon && (
        <StyledImg
          key={data.slug}
          fluid={data.acf.medium_icon.localFile.childImageSharp.fluid}
        />
      )}
      {data.acf.game_logo && (
        <StyledImg
          key={data.slug}
          fluid={data.acf.game_logo.localFile.childImageSharp.fluid}
        />
      )}
      {data.acf.game_logo && (
        <StyledImg
          key={data.slug}
          fluid={
            data.acf.jackpot_reel_carousel_image.localFile.childImageSharp.fluid
          }
        />
      )}
      <h3>Paytable</h3>
      {data.acf.paytable &&
        data.acf.paytable.map(paytableObj => (
          <StyledImg
            key={paytableObj.id}
            fluid={paytableObj.localFile.childImageSharp.fluid}
          />
        ))}
      <Link to="casino-games">Back to Games</Link>
    </Fragment>
  )
}

GameTemplate.propTypes = {
  title: PropTypes.string.isRequired,
  data: PropTypes.object.isRequired,
}

const GamePage = ({ data }) => {
  const { wordpressWpGames: page, wordpressWpGames: gameData } = data
  const yoast = page.yoast_meta

  return (
    <Layout>
      <SEO
        title={yoast.yoast_wpseo_title}
        description={yoast.yoast_wpseo_metadesc}
      />
      <GameTemplate title={page.title} data={gameData} />
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
      id
      title
      slug
      custom_permalink
      status
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
      acf {
        name
        hero_image {
          localFile {
            childImageSharp {
              fluid(maxWidth: 500) {
                ...GatsbyImageSharpFluid_withWebp
              }
            }
          }
        }

        description
        hero_subheading
        hero_summary
        jackpot_amount
        play_url
        carousel_hero_image
        rating
        game_name
        jackpot_reel_jackpot_type
        title
        medium_icon {
          localFile {
            childImageSharp {
              fluid(maxWidth: 500) {
                ...GatsbyImageSharpFluid_withWebp
              }
            }
          }
        }
        paytable {
          localFile {
            childImageSharp {
              fluid(maxWidth: 500) {
                ...GatsbyImageSharpFluid_withWebp
              }
            }
          }
        }
        game_logo {
          localFile {
            childImageSharp {
              fluid(maxWidth: 500) {
                ...GatsbyImageSharpFluid_withWebp
              }
            }
          }
        }
        jackpot_reel_carousel_image {
          localFile {
            childImageSharp {
              fluid(maxWidth: 500) {
                ...GatsbyImageSharpFluid_withWebp
              }
            }
          }
        }
      }
    }
  }
`
