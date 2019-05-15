import React from 'react'
import { StaticQuery, graphql } from 'gatsby'
import styled from '@emotion/styled'
import Img from 'gatsby-image'

const StyledImg = styled(Img)`
  width: 100%;
  height: 100px;
  background-color:red;
  @media (min-width: 600px) {
    width: 100px;
  }
`
const SectionTestimonialsWrapper = ({ data }) => {
  console.log(data)
  return data.edges.map(({ node }) => (
    <div className="col-sm-12 col-md-4" key={node.id}>
      <div className="card">
        <p className="card-quote">{node.acf.quote}</p>
        <h2 className="card-title">{node.title}</h2>
        <p className="card-footer">{node.acf.footer}</p>
        <div className="card-icon">
          <StyledImg fluid={node.acf.icon.localFile.childImageSharp.fluid} />
        </div>
      </div>
    </div>
  ))
}

export default () => (
  <StaticQuery
    query={graphql`
      query {
        allWordpressWpTestimonials(filter: { status: { eq: "publish" } }) {
          edges {
            node {
              id
              title
              acf {
                quote
                footer
                icon {
                  localFile {
                    childImageSharp {
                      fluid(maxWidth: 100) {
                        ...GatsbyImageSharpFluid_withWebp
                      }
                    }
                  }
                }
                photo {
                  localFile {
                    childImageSharp {
                      fluid(maxWidth: 100) {
                        ...GatsbyImageSharpFluid_withWebp
                      }
                    }
                  }
                }
              }
              status
            }
          }
        }
      }
    `}
    render={data => (
      <SectionTestimonialsWrapper data={data.allWordpressWpTestimonials} />
    )}
  />
)
