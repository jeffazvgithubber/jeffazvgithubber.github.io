import React from 'react'
import Helmet from 'react-helmet'
// import { Footer } from "@vgw/chu-frontend-shared";
// import JeffFooterTestComponent from 'jefffootertest'

import Navbar from './Navbar'
import './all.sass'

const TemplateWrapper = ({ children }) => (
  <div>
    <Helmet title="Home | Gatsby + WordPress" />
    <Navbar />
    <section className="section section--gradient">
      <div className="container">
        <div className="columns">
          <div className="column is-10 is-offset-1">
            <div className="section">{children}</div>
          </div>
        </div>
      </div>
    </section>
    {/* <JeffFooterTestComponent /> */}
    {/* <Footer isFb={false} /> */}
  </div>
)

export default TemplateWrapper
