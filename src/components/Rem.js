import React from 'react'

import {
  getInitialState,
  prevImage,
  nextImage
} from '../action-creators/rem'

import { CoolBox } from './CoolBox'

export class Rem extends React.Component {
  constructor(props) {
    super(props)
    this.state = getInitialState()
  }

  render() {
    return (
      <div>
        { this.renderIntro() }
        { this.renderCarrousel() }
      </div>
    )
  }

  renderIntro() {
    return (
      <div className="o-layout o-layout--reverse">
        <div className="o-layout__item u-1/1 u-1/3@tablet">
          <img className="o-thumbnail" src={'/static/img/home/side.png'} />
        </div>
        <div className="o-layout__item u-1/1 u-2/3@tablet">
          { this.renderContent() }
        </div>
      </div>
    )
  }

  renderContent() {
    return (
      <div>
        <h3>Rem</h3>
        <p>
          Alright, you got me. I'm not sure if you got here by reading the source code or just by
          chance, but hey here you are.
        </p>
        <p>
          I've been watching anime for over 10 years now, so it's actually kind of an unusual thing
          for me to say that Rem is favorite character. I don't know. She's an amazing complete
          character which is super unusual in an ocean of stereotypes with a couple of traits.
        </p>
        <p>
          Whathever the case, it felt appropiate to make a small page for her. Here it is!
        </p>
      </div>
    )
  }

  renderCarrousel() {
    const { image } = this.state.current
    const imageUrl = `/static/img/rem/${image}`
    return (
      <CoolBox>
        <div className='c-carrousel'>
          <div
            className='c-carrousel__float c-carrousel__float--left'
            onClick={ () => this.setState(prevImage(this.state)) }
          >
            <div className='c-carrousel__control'>
              <i className='fa fa-chevron-left fa-3x' />
            </div>
          </div>
          <div
            className='c-carrousel__float c-carrousel__float--right'
            onClick={ () => this.setState(nextImage(this.state)) }
          >
            <div className='c-carrousel__control'>
              <i className='fa fa-chevron-right fa-3x' />
            </div>
          </div>
          <a href={ imageUrl } target='_blank'>
            <img className='c-carrousel__image' src={imageUrl} />
          </a>
        </div>
      </CoolBox>
    )
  }
}
