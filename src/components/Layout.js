import React from 'react'
import Helmet from 'react-helmet'
// import { Footer } from "@vgw/chu-frontend-shared";

import Navbar from './Navbar'
import './all.sass'

const TemplateWrapper = ({ children }) => (
  <div>
    <Helmet title="Home | Gatsby + WordPress" />
    <Navbar />
    <div>{children}</div>
    {/* <Footer isFb={false} /> */}
  </div>
)

export default TemplateWrapper
