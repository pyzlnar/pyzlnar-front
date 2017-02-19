import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { startSpin, stopSpin } from '../action-creators/networkError'

class NetworkError extends React.Component {
  render() {
    const { retryAction, startSpin, stopSpin, spin } = this.props
    const spinClass = spin ? 'fa-spin' : null

    return (
      <div className='o-layout text--center'>
        <div className='o-layout__item u-1/1'>
          <img src={ 'static/img/stickers/sorry.png' } />
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
            onMouseEnter={ () => startSpin() }
            onMouseLeave={ () => stopSpin()  }
          >
            <i className={ `fa fa-refresh ${spinClass}` } />
            <span> Retry? </span>
          </span>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return { ...state.networkError }
}

const mapDispatchToProps = (dispatch, ownState) => {
  return bindActionCreators(
    { retryAction: ownState.retryAction, startSpin, stopSpin },
    dispatch
  )
}

export const NetworkErrorContainer = connect(mapStateToProps, mapDispatchToProps)(NetworkError)
