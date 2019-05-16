import React from 'react'
import { StaticQuery, graphql, Link} from 'gatsby'
import Img from 'gatsby-image'
import styled from '@emotion/styled'
// I could not get emotion to do this correctly
const StyledImg = styled(Img)`
  width: 100%;
  height: 600px;
  @media (min-width: 600px) {
    width: 600px;
  }
`

const SectionGameGalleryItemWrapper = ({ data, filteredObjectIds }) => {
  //this is a nasty hack to filter them this way but I couldn't find a way to pass string literal variables into static query graphql
  const filteredIds = filteredObjectIds.map(a => a.wordpress_id)
  const filteredResults = data.filter(
    ({ node }) => filteredIds.indexOf(node.wordpress_id) > -1
  )
  //console.log("data.length " + data.length);
  //console.log("filteredResults.length " + filteredResults.length);

  return (
    <div className="col-md-2 col-sm-6 col-6">
      {filteredResults.map(({ node }) => {
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

export default props => {
  console.log('props are ' + props.wordpressIds)
  const filteredObjectIds = props.wordpressIds
  console.log(filteredObjectIds)
  return (
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
        <SectionGameGalleryItemWrapper
          data={data.allWordpressWpGames.edges}
          filteredObjectIds={filteredObjectIds}
        />
      )}
    />
  )
}
