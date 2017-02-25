import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { CoolBox } from './CoolBox'

class DismissableP extends React.Component {
  render() {
    const { title, children } = this.props
    return (
      <CoolBox title={title} controls={this.renderControls()}>
        { children }
      </CoolBox>
    )
  }

  renderControls() {
    const { onDismiss } = this.props
    return <i className='fa fa-window-close text--large' onClick={ ()=> onDismiss() }/>
  }
}

const mapStateToProps = (state, ownState) => {
  return { ...ownState }
}

const mapDispatchToProps = (dispatch, ownState) => {
  if (!ownState.onDimiss) {
    return {}
  }

  return bindActionCreators({ onDimiss: ownState.onDimiss }, dispatch)
}

export const Dismissable = connect(mapStateToProps, mapDispatchToProps)(DismissableP)
