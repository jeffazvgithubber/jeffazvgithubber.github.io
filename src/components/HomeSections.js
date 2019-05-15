import React from 'react'
import { StaticQuery, graphql } from 'gatsby'
import SectionChumba from "./SectionChumba"
import SectionTestimonial from "./SectionTestimonial"

import SectionGameGallery from "./SectionGameGallery"

const HomeSectionsWrapper = ({ data }) => {
  console.log(data)
  return (
    <div>
      <h1>Home Section</h1>
      {data.edges.map(({ node: section }) => {
        if (section.slug === 'chumba-section') {
          return <SectionChumba key={section.slug}/>
        } if (section.slug === 'game-gallery') {
          return <SectionGameGallery key={section.slug}/>
        }
        if (section.slug === 'testimonial-section') {
          return <SectionTestimonial key={section.slug}/>
        }
        return <div key={section.slug}>{section.slug}</div>
      })}
    </div>
  )
}

export default () => (
  <StaticQuery
    query={graphql`
      query {
        allWordpressWpHomeSections(sort: { fields: menu_order, order: ASC }) {
          totalCount
          edges {
            node {
              guid
              title
              slug
              categories {
                name
                id
              }
            }
          }
        }
      }
    `}
    render={data => (
      <HomeSectionsWrapper data={data.allWordpressWpHomeSections} />
    )}
  />
)
