import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import { getMe } from '../api/auth'

import { Header } from './Header'

class AppP extends React.Component {
  componentDidMount() {
    this.props.getMe()
  }

  render() {
    return (
      <div>
        <Header />
        <div className="o-content">
          <div className="o-body">
            { this.props.children }
          </div>
        </div>
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators({ getMe }, dispatch)
}

export const App = connect(null, mapDispatchToProps)(AppP)
