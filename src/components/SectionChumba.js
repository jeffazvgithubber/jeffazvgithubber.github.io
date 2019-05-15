import React from 'react'
import { StaticQuery, graphql } from 'gatsby'

const SectionChumbaWrapper = ({ data }) => {
  console.log(data)
  return (
    <div className="section chumba">
      <div className="container">
        <div className="row">
          <div className="col-lg-4 chumba-headline">
            <h3 className="chumba-title">{data.headline}</h3>
          </div>
          <div className="col-lg-8">
            <div className="row">
              {data.columns.map(({ column }, index) => {
                return (
                  <div className="col-sm-12 col-md-4" key={index}>
                    <div className="chumba-card">
                      <span
                        className="chumba-card-icon"
                        style={{
                          background: `url(${
                            column.icon.localFile.url
                          }) no-repeat center `,
                          backgroundSize: 'contain',
                        }}
                      />
                      <p dangerouslySetInnerHTML={{ __html: column.text }} />
                    </div>
                  </div>
                )
              })}
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
            categories: { elemMatch: { slug: { eq: "section-chumba" } } }
          }
        ) {
          edges {
            node {
              guid
              title
              slug
              acf {
                headline
                columns {
                  column {
                    text
                    icon {
                      id
                      localFile {
                        url
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
      <SectionChumbaWrapper
        data={data.allWordpressWpHomeSections.edges[0].node.acf}
      />
    )}
  />
)
