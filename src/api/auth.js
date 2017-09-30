import { push }    from 'react-router-redux'
import { request } from './ApiHelper'
import {
  enableLogin,
  loggingIn,
  loginSuccess,
  loginFailure
} from '../action-creators/auth'

export const clientId = '558071016672-176f4qq81d1vrm96gafm05se7t08iq2p.apps.googleusercontent.com'
export const loggedInRedirect = '/'

export const onLoadLogin = () => {
  return (dispatch, getState) => {
    const { auth } = getState()
    const { loggedIn, loggedInRedirect } = auth
    if (!loggedIn) {
      request('/api/me')
        .then(result => {
          dispatch(loginSuccess(result.json))
          dispatch(push(loggedInRedirect))
        })
        .catch(() => dispatch(enableLogin()))
    }
  }
}

export const gmailLogin = response => {
  const { tokenObj } = response
  const { id_token } = tokenObj
  return dispatch => {
    dispatch(loggingIn())
    request('/api/auth/login', getGmailOptions(id_token))
      .then(result => {
        dispatch(loginSuccess(result.json))
        dispatch(push(loggedInRedirect))
      })
      .catch(() => dispatch(loginFailure()))
  }
}

// Helpers

const getGmailOptions = id_token => {
  return {
    method: 'POST',
    body: {
      google: { id_token }
    }
  }
}
