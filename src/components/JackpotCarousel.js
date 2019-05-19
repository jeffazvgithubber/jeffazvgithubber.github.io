import React from 'react'
import CarouselItem from '@bit/reactstrap.reactstrap.internal.carousel-item'
import CarouselControl from '@bit/reactstrap.reactstrap.internal.carousel-control'
import CarouselIndicators from '@bit/reactstrap.reactstrap.internal.carousel-indicators'
import Carousel from './Carousel'

import '../scss/chumba.scss'

const items = [
  {
    src:
      'https://www.chumbacasino.com/wp-content/uploads/2019/05/game_curOutReelLongZhiBaoZang-256x400.png',
      src2:'https://www.chumbacasino.com/wp-content/uploads/2019/05/LongZhiBaoZang_title.png',
    altText: 'Slide 1',
    caption: 'Slide 1',
  },
  {
    src:
    'https://www.chumbacasino.com/wp-content/uploads/2018/11/game_cutOutReel-256x400.png',
    src2:'https://www.chumbacasino.com/wp-content/uploads/2018/11/rr_game-logo.png',
    altText: 'Slide 2',
    caption: 'Slide 2',
  },
  {
    src:
      'https://www.chumbacasino.com/wp-content/uploads/2018/11/game_cutOutStamp-256x400.png',
      src2:'https://www.chumbacasino.com/wp-content/uploads/2018/11/stampedethunder_game_logo.png',
    altText: 'Slide 3',
    caption: 'Slide 3',
  },
]

class JackpotCarousel extends React.Component {
  constructor(props) {
    super(props)
    this.state = { activeIndex: 0 }
    this.next = this.next.bind(this)
    this.previous = this.previous.bind(this)
    this.goToIndex = this.goToIndex.bind(this)
    this.onExiting = this.onExiting.bind(this)
    this.onExited = this.onExited.bind(this)
  }

  onExiting() {
    this.animating = true
  }

  onExited() {
    this.animating = false
  }

  next() {
    if (this.animating) return
    const nextIndex =
      this.state.activeIndex === items.length - 1
        ? 0
        : this.state.activeIndex + 1
    this.setState({ activeIndex: nextIndex })
  }

  previous() {
    if (this.animating) return
    const nextIndex =
      this.state.activeIndex === 0
        ? items.length - 1
        : this.state.activeIndex - 1
    this.setState({ activeIndex: nextIndex })
  }

  goToIndex(newIndex) {
    if (this.animating) return
    this.setState({ activeIndex: newIndex })
  }

  render() {
    const { activeIndex } = this.state

    const slides = items.map(item => {
      return (
        <CarouselItem
          onExiting={this.onExiting}
          onExited={this.onExited}
          key={item.src}
        >
          <a href="#">
            <div className="games-leftReel">
                {/* <img src={item.src} alt={item.altText} />					 */}
            </div>

            <div className="games-rightReel">
              <div className="games-rightReel__logo">
                {/* <img
                  data-sizes="auto"
                  src2={item.src}
                  className="responsive"
                  alt=""
                /> */}
              </div>
              <div className="games-jackpot-amount-powerShotGrand">SC$743,733</div>
              <div className="games-rightReel__jp_type games-rightReel__jp_type--fireShot" />
            </div>
          </a>

        </CarouselItem>
      )
    })

    return (
        <Carousel
          activeIndex={activeIndex}
          next={this.next}
          previous={this.previous}
          className="games-gallery carousel gamecarousel slide"
          id="gallery-games"
        >
          <CarouselIndicators
            items={items}
            activeIndex={activeIndex}
            onClickHandler={this.goToIndex}
          />
          {slides}
          <CarouselControl
            direction="prev"
            directionText="Previous"
            onClickHandler={this.previous}
          />
          <CarouselControl
            direction="next"
            directionText="Next"
            onClickHandler={this.next}
          />
        </Carousel>
    )
  }
}

export default JackpotCarousel
