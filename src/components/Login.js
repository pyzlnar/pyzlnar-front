import React                  from 'react'
import { bindActionCreators } from 'redux'
import { connect }            from 'react-redux'
import { push }               from 'react-router-redux'
import GoogleLogin            from 'react-google-login'
import GoogleButton           from 'react-google-button'

import { gmailLogin, loginFailure } from '../api/auth'

import { CoolBox } from './CoolBox'
import { Loading } from './Loading'

class LoginP extends React.Component {
  componentWillMount() {
     const { loggedIn, loggedInRed, push } = this.props
     if (loggedIn) {
       push(loggedInRed)
     }
  }

  shouldRenderButton() {
    const { loggedIn, loggingIn } = this.props
    return !(loggingIn || loggedIn)
  }

  render() {
    const { loginFailed } = this.props
    return (
      <div>
        { loginFailed && this.renderError() }
        <h3>Login</h3>
        { this.renderLogins() }
      </div>
    )
  }

  renderError() {
    return (
      <div className='u-margin-bottom-small'>
        <CoolBox title='There was an error! Please try again.'>
        </CoolBox>
      </div>
    )
  }

  renderLogins() {
    if (this.shouldRenderButton()) {
      return this.renderGoogleLogin()
    } else {
      return <Loading />
    }
  }

  renderGoogleLogin() {
    const { clientId, gmailLogin, loginFailure } = this.props
    return (
      <GoogleLogin
        clientId={clientId}
        tag='a'
        className='c-google'
        onSuccess={gmailLogin}
        onFailure={loginFailure}
      >
        <GoogleButton type='light' />
      </GoogleLogin>
    )
  }
}

const mapStateToProps = state => {
  return { ...state.auth }
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators({
    gmailLogin,
    loginFailure,
    push
  }, dispatch)
}

export const Login = connect(mapStateToProps, mapDispatchToProps)(LoginP)
