import React from 'react'
import { StaticQuery, graphql } from 'gatsby'
import SectionGameGalleryItem from './SectionGameGalleryItem'


// $image = '<div class="col-md-2 col-sm-6 col-6">';
// $image .= '<a href="'.get_permalink().'" class="games-image games-image__small">';
// $image .= getACFResponsiveImage('medium_icon');
// $image .= '</a>';
// $image .= '</div>';

// GalleryItemQuery.defaultProps = {
//   wordpressId: -1,
// }

// GalleryItemQuery.propTypes = {
//   wordpressId: PropTypes.number,
// }

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
