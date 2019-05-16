import React, { Fragment } from 'react'
import styled from '@emotion/styled'
import Img from 'gatsby-image'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import Layout from '../components/Layout'
import SEO from '../components/seo'

const StyledImg = styled(Img)`
  width: 100%;
  height: 600px;
  @media (min-width: 600px) {
    width: 600px;
  }
`

export const PageTemplate = ({ title, content, data }) => {
  return (
    <Fragment>
      <h2 className="title is-size-3 has-text-weight-bold is-bold-light">
        {title}
      </h2>
      <div className="content" dangerouslySetInnerHTML={{ __html: content }} />

      {data.acf && (
        <div>
          {data.acf.content && (
            <div dangerouslySetInnerHTML={{ __html: data.acf.content }} />
          )}

          {data.acf.about_image && data.acf.about_image.localFile && (
            <StyledImg
              key={data.acf.title}
              fluid={data.acf.about_image.localFile.childImageSharp.fluid}
            />
          )}
          <div dangerouslySetInnerHTML={{ __html: data.acf.title }} />
          <div dangerouslySetInnerHTML={{ __html: data.acf.questions }} />
          <div
            dangerouslySetInnerHTML={{
              __html: data.acf.scholarship_hero_title,
            }}
          />
          <div
            dangerouslySetInnerHTML={{
              __html: data.acf.scholarship_hero_subtitle,
            }}
          />
          <div
            dangerouslySetInnerHTML={{ __html: data.acf.scholarship_title }}
          />
          <div dangerouslySetInnerHTML={{ __html: data.acf.about_title }} />
          <div dangerouslySetInnerHTML={{ __html: data.acf.about_content }} />
          <div dangerouslySetInnerHTML={{ __html: data.acf.faq_title }} />
          <div dangerouslySetInnerHTML={{ __html: data.acf.faq_content }} />
          <div dangerouslySetInnerHTML={{ __html: data.acf.content_bottom }} />
        </div>
      )}
    </Fragment>
  )
}

PageTemplate.propTypes = {
  title: PropTypes.string.isRequired,
  content: PropTypes.string,
  data: PropTypes.object.isRequired,
}

const Page = ({ data }) => {
  const { wordpressPage: page } = data
  const { wordpressPage: pageData } = data

  const yoast = page.yoast_meta

  return (
    <Layout>
      <SEO
        title={yoast.yoast_wpseo_title}
        description={yoast.yoast_wpseo_metadesc}
      />
      <PageTemplate title={page.title} content={page.content} data={pageData} />
    </Layout>
  )
}

Page.propTypes = {
  data: PropTypes.object.isRequired,
}

export default Page

export const pageQuery = graphql`
  query PageById($id: String!) {
    wordpressPage(id: { eq: $id }) {
      title
      content
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
        test_comments_field
        tags
        content
        title
        questions
        scholarship_hero_title
        scholarship_hero_subtitle
        scholarship_title
        scholarship_section
        scholarship_status
        closing_date
        scholarship_application_email
        scholarship_application_button
        scholaraship_prizes
        header_text
        category
        about_title
        about_content
        faq_title
        faq_content
        content_bottom
        about_image {
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
