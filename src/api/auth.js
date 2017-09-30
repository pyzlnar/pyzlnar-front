import { push }    from 'react-router-redux'
import { request } from './ApiHelper'
import {
  enableLogin,
  loggingIn,
  loginSuccess,
  loginFailure
} from '../action-creators/auth'

export const onLoadLogin = () => {
  return (dispatch, getState) => {
    const { auth } = getState()
    const { loggedIn, loggedInRed } = auth
    if (!loggedIn) {
      request('/api/me')
        .then(result => {
          dispatch(loginSuccess(result.json))
          dispatch(push(loggedInRed))
        })
        .catch(() => dispatch(enableLogin()))
    }
  }
}

export const gmailLogin = response => {
  const { tokenObj } = response
  const { id_token } = tokenObj
  return (dispatch, getState) => {
    const loggedInRed = getState().auth.loggedInRed
    dispatch(loggingIn())
    request('/api/auth/login', getGmailOptions(id_token))
      .then(result => {
        dispatch(loginSuccess(result.json))
        dispatch(push(loggedInRed))
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
