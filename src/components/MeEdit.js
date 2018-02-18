import React                  from 'react'
import { bindActionCreators } from 'redux'
import { connect }            from 'react-redux'

import { updateMe } from '../api/auth'
import { UserForm } from './forms'

class MeEditP extends React.Component {
  render() {
    const { me, updateMe } = this.props
    return (
      <div>
        <h2>Settings</h2>
        <UserForm user={me} onSubmit={updateMe} />
      </div>
    )
  }
}

const mapStateToProps = state => {
  return { me: state.auth.user }
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators({ updateMe }, dispatch)
}

export const MeEdit = connect(mapStateToProps, mapDispatchToProps)(MeEditP)
