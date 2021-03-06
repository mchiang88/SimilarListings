import React, { Component } from 'react';
import styled from 'styled-components';
import { PrevArrow, NextArrow, PrevArrowComp, NextArrowComp } from './Arrows.jsx';
import Stars from './Stars.jsx';
import stylr from './styles/Carousel.css';

const CarouselContainer = styled.div`
  display: flex;
  margin: 0 0;
  transition: ${(props) => props.sliding ? 'none' : 'transform 0.3s ease'};
  transform: ${(props) => {
    if (!props.sliding) return 'translateX(-349.33px)'
    if (props.direction === 'prev') return 'translateX(-698.66px)'
    return 'translateX(0)'
  }};
`

const CarouselSlot = styled.div`
  flex: 1 0 100%;
  flex-basis: 349.33px;
  order: ${(props) => props.order}};
`

class Carousel extends Component {
  constructor(props) {
    super(props);

    this.state = {
      sliding: 0,
      direction: 'prev',
      position: 0
    }

    this.getOrder = this.getOrder.bind(this);
    this.prevSlide = this.prevSlide.bind(this);
    this.nextSlide = this.nextSlide.bind(this);
  }

  doSliding(direction, position) {
    this.setState({
      sliding: this.state.sliding + 1,
      direction,
      position
    });

    setTimeout(() => {
      this.setState({
        sliding: this.state.sliding - 1
      })
    }, 15)
  }

  getOrder(itemIndex) {
    const { position } = this.state;
    const { children } = this.props;
    const numItems = children.length || 1;
    return ((numItems + 1) - position + itemIndex) % numItems;
  }

  prevSlide() {
    const { position } = this.state;
    this.doSliding('prev', position - 1)
  }

  nextSlide() {
    const { position } = this.state;
    this.doSliding('next', position + 1)
  }
  

  render() {
    const { title, children } = this.props;
    return (
      <div>
        <h2>{title}</h2>
        <div className={stylr.list}>
          <PrevArrow hidden={this.state.position === 0 ? true : false}>
            <PrevArrowComp prevSlide={this.prevSlide} />
          </PrevArrow>
          <div className={stylr.wrapper}>
            <CarouselContainer sliding={this.state.sliding} direction={this.state.direction}>
              { children.map((child, i) => (
                <CarouselSlot 
                  key={i}
                  order={this.getOrder(i)}>
                  <div className={stylr.entry}>
                    <div className={stylr.entrypicture} style={{backgroundImage: `url(${child.props.listing.pictures})`}}>
                      <button type="button" className={stylr.button}>
                        <svg viewBox="0 0 32 32" fill="#484848" fillOpacity="0.5" stroke="#ffffff" strokeWidth="2.5" focusable="false" role="img" strokeLinecap="round" strokeLinejoin="round" className={stylr.svg}>
                        <path d="m23.99 2.75c-.3 0-.6.02-.9.05-1.14.13-2.29.51-3.41 1.14-1.23.68-2.41 1.62-3.69 2.94-1.28-1.32-2.46-2.25-3.69-2.94-1.12-.62-2.27-1-3.41-1.14a7.96 7.96 0 0 0 -.9-.05c-1.88 0-7.26 1.54-7.26 8.38 0 7.86 12.24 16.33 14.69 17.95a1 1 0 0 0 1.11 0c2.45-1.62 14.69-10.09 14.69-17.95 0-6.84-5.37-8.38-7.26-8.38"></path></svg>
                      </button>
                    </div>
                    <div style={{paddingTop: "8px"}}>
                      <div className={stylr.typeSize}>{child.props.listing.listingType} · {child.props.listing.numBeds} BEDS</div>
                      <div className={stylr.listingTitle}>{child.props.listing.name}</div>
                      <div className={stylr.listingPrice}>${child.props.listing.price} per night</div>
                    </div>
                    <Stars rating={child.props.listing.rating} numRatings={child.props.listing.numRatings} />
                  </div>
                </CarouselSlot>
              ))}
            </CarouselContainer>
          </div>
          <NextArrow hidden={this.state.position === 9 ? true : false}>
            <NextArrowComp nextSlide={this.nextSlide} />
          </NextArrow>
        </div>
      </div>
    )
  }
}

export default Carousel;