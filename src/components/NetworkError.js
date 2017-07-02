import React from 'react'

export class NetworkError extends React.Component {
  constructor(props) {
    super(props)
    this.state = { spin: false }
  }

  render() {
    const { spin } = this.state
    const { retryAction } = this.props
    const spinClass = spin ? 'fa-spin' : null

    return (
      <div className='o-layout text--center'>
        <div className='o-layout__item u-1/1'>
          <img src={ '/static/img/stickers/sorry.png' } />
        </div>
        <div className='o-layout__item u-1/1'>
          <span className='u-h4'>
            There was a network error!
          </span>
        </div>
        <div className='o-layout__item u-1/1'>
          <span
            className='u-clickable u-clickable--light'
            onClick={ () => retryAction() }
            onMouseEnter={ () => this.setState({spin: true}) }
            onMouseLeave={ () => this.setState({spin: false})  }
          >
            <i className={ `fa fa-refresh ${spinClass}` } />
            <span> Retry? </span>
          </span>
        </div>
      </div>
    )
  }
}
