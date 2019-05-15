import React from 'react'
import { Link, StaticQuery, graphql } from 'gatsby'
import logo from '../img/logo.svg'

const Navbar = () => (
  <StaticQuery
    query={graphql`
      query {
        allWordpressWpApiMenusMenusItems(
          filter: { slug: { eq: "chumba-top-menu" } }
        ) {
          edges {
            node {
              name
              count
              items {
                order
                title
                url
                object_slug
                wordpress_children {
                  wordpress_id
                  title
                  url
                  object_slug
                }
              }
            }
          }
        }
      }
    `}
    render={data => (
      <nav className="navbar is-transparent" style={{'backgroundColor':'black'}}>
        <div className="container">
          <div className="navbar-brand">
            <Link to="/" className="navbar-item">
              <figure className="image">
                <img src={logo} alt="Chumba Casino" style={{ width: '88px' }} />
              </figure>
            </Link>
          </div>
          <div className="navbar-start">
            <ul>
              {data.allWordpressWpApiMenusMenusItems.edges[0].node.items.map(
                item => (
                  <li key={item.object_slug}>
                    <Link
                      className="navbar-item"
                      to={item.url.replace('http://localhost:8000','')}
                      key={item.object_slug}
                    >
                      {item.title}
                    </Link>

                    {item.wordpress_children && (
                      <ul>
                        {item.wordpress_children &&
                          item.wordpress_children.map(subitem => (
                            <li key={subitem.wordpress_id}>
                              <Link to={subitem.url.replace('http://localhost:8000','')}>
                                {subitem.title}
                              </Link>
                            </li>
                          ))}
                      </ul>
                    )}
                  </li>
                )
              )}
            </ul>
          </div>
        
        </div>
      </nav>
    )}
  />
)

export default Navbar
