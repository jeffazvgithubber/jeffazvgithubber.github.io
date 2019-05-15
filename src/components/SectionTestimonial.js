import React from 'react'
import { StaticQuery, graphql } from 'gatsby'
import Img from 'gatsby-image'
import styled from '@emotion/styled'
import SectionTestimonials from './SectionTestimonials';

const StyledImg = styled(Img)`
  width: 100%;
  height: 600px;
  @media (min-width: 600px) {
    width: 600px;
  }
`

const SectionChumbaWrapper = ({ data }) => {
  console.log(data)
  return (
    <div className="section testimonials">
      <div className="container">
        <div className="row">
          <div className="col-lg-4  speech">
            <StyledImg
              fluid={data.icon.localFile.childImageSharp.fluid}
            />
            <div dangerouslySetInnerHTML={{ __html: data.side_text }} />
          </div>
          <div className="col-lg-8">
            <div className="row">
              <SectionTestimonials />
            </div>
          </div>
        </div>
        <div className="footnote" dangerouslySetInnerHTML={{ __html: data.footnote}} />
      </div>
    </div>
  )
}

export default () => (
  <StaticQuery
    query={graphql`
      query {
        allWordpressWpHomeSections(
          filter: {
            categories: { elemMatch: { slug: { eq: "section-testimonials" } } }
          }
        ) {
          edges {
            node {
              guid
              title
              slug
              acf {
                icon {
                  id
                  localFile {
                    childImageSharp {
                      fluid(maxWidth: 500) {
                        ...GatsbyImageSharpFluid_withWebp
                      }
                    }
                  }
                }
                side_text
                footnote
              }
            }
          }
        }
      }
    `}
    render={data => (
      <SectionChumbaWrapper
        data={data.allWordpressWpHomeSections.edges[0].node.acf}
      />
    )}
  />
)
