import React from 'react'
import styled from '@emotion/styled'
import { StaticQuery, graphql } from 'gatsby'
import Img from 'gatsby-image'
import Layout from '../components/Layout'
import HomeSections from '../components/HomeSections'
import SEO from '../components/seo'


const MainCenteredArea = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`

// I could not get emotion to do this correctly
const StyledImg = styled(Img)`
  width: 100%;
  @media (min-width: 600px) {
    width: 600px;
  }
`

const IndexPage = ({ data }) => {
  return (
    <Layout>
      <SEO
        title={data.edges[0].node.yoast_meta.yoast_wpseo_title}
        keywords={[`gatsby`, `application`, `react`]}
      />

      <MainCenteredArea>
        {/* @todo replace this with carousel   */}

        {data.edges[0].node.acf.jefftestcarousel.map(carouselImage => {
          return (
           
              carouselImage.jimage2 && (
                <div>
                  <div>{carouselImage.jeffscarousel_image_text}</div>              
                  <StyledImg
                    key={carouselImage.jimage2.localFile.id}
                    fluid={carouselImage.jimage2.localFile.childImageSharp.fluid}
                  />
                </div>
              )
          )
        })}
<hr></hr>
        <HomeSections />
      </MainCenteredArea>
    </Layout>
  )
}

export default () => (
  <StaticQuery
    query={graphql`
      query {
        allWordpressPage(
          filter: { template: { eq: "php/page-real-cash-home.php" } }
        ) {
          totalCount
          edges {
            node {
              id
              slug
              type
              path
              acf {
                jefftestcarousel {
                  jimage2 {
                    id
                    localFile {
                      childImageSharp {
                        fluid {
                          ...GatsbyImageSharpFluid_withWebp
                        }
                      }
                    }
                  }
                  jeffscarousel_image_text
                }
              }
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
        }
      }
    `}
    render={data => <IndexPage data={data.allWordpressPage} />}
  />
)
