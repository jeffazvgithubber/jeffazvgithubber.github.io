import React, { Suspense } from 'react'
import Loadable from 'react-loadable'
import Helmet from 'react-helmet'
// import { Footer } from "@vgw/chu-frontend-shared";
// import JeffFooterTestComponent from 'jefffootertest'

import Navbar from './Navbar'



const JackpotLoadable = Loadable({
  loader : () => import('./JackpotCarousel'),
  loading : () => <div>Loading.asfaf..</div>
})

const Layout = ({ children }) => (
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
    <div className="games games-jackpot">
      <div className="container">
        <div className="row">
          <div className="col-lg-12"><JackpotLoadable /></div>
        </div>
      </div>
    </div>


    {/* <JeffFooterTestComponent /> */}
    {/* <Footer isFb={false} /> */}
  </div>
)

export default Layout
