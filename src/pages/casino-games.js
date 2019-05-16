import { StaticQuery, graphql, Link } from 'gatsby'
import Img from 'gatsby-image'
import styled from '@emotion/styled'
import React from 'react'
import Layout from '../components/Layout'

const MainCenteredArea = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`

// I could not get emotion to do this correctly
const StyledImg = styled(Img)`
  width: 100%;
  height: 600px;
  @media (min-width: 600px) {
    width: 600px;
  }
`

const AllGamesPage = () => (
  <Layout>
    <MainCenteredArea>      
      <h2 className="title is-size-3 has-text-weight-bold is-bold-light">ALL GAMES PAGE</h2>
      <StaticAllGames />
    </MainCenteredArea>
  </Layout>
)
const SectionGameGalleryItemWrapper = ({ data }) => {
  return (
    <div className="col-md-2 col-sm-6 col-6">
      {data.map(({ node }) => {
        return (
          <Link key={node.slug} to={node.custom_permalink}>
            <StyledImg
              fluid={node.acf.medium_icon.localFile.childImageSharp.fluid}
            />
          </Link>
        )
      })}
    </div>
  )
}
const StaticAllGames = () => (
  <StaticQuery
    query={graphql`
      {
        allWordpressWpGames {
          edges {
            node {
              wordpress_id
              custom_permalink
              template
              slug
              title
              acf {
                name
                hero_summary
                description
                carousel_hero_image
                medium_icon {
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
        }
      }
    `}
    render={data => (
      <SectionGameGalleryItemWrapper data={data.allWordpressWpGames.edges} />
    )}
  />
)

export default AllGamesPage
