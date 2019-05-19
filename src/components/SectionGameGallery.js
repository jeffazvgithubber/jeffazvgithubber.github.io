import React from 'react'
import { StaticQuery, graphql } from 'gatsby'
import SectionGameGalleryItem from './SectionGameGalleryItem'


const SectionGameGalleryWrapper = ({ data }) => {
  console.log(data)
  return (
    <div className="games">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="row">
              <SectionGameGalleryItem wordpressIds={data} />            
            </div>
          </div>
        </div>
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
            categories: { elemMatch: { slug: { eq: "section-game-gallery" } } }
          }
        ) {
          edges {
            node {
              acf {
                games {
                  wordpress_id
                }
              }
            }
          }
        }
      }
    `}
    render={data => (
      <SectionGameGalleryWrapper
        data={data.allWordpressWpHomeSections.edges[0].node.acf.games}
      />
    )}
  />
)
