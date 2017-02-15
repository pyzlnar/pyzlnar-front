import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

class Dismissable extends React.Component {
  render() {
    const { title, content, onDismiss } = this.props
    return (
      <div className='c-dismiss'>
        <div className='c-dismiss__toolbar'>
         <i className='c-dismiss__dismiss fa fa-window-close' onClick={ ()=> onDismiss() }/>
         <span className='c-dismiss__title'>{ title }</span>
        </div>
        <div className='c-dismiss__content'>
         { content }
        </div>
      </div>
    )
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

export const DismissableContainer = connect(mapStateToProps, mapDispatchToProps)(Dismissable)
