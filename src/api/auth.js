import { push }            from 'react-router-redux'
import { SubmissionError } from 'redux-form'

import { formatError, request } from './ApiHelper'
import {
  enableLogin,
  loggingIn,
  loginSuccess,
  loginFailure
} from '../action-creators/auth'


export const clientId          = '558071016672-176f4qq81d1vrm96gafm05se7t08iq2p.apps.googleusercontent.com'
export const loggedInRedirect  = '/'
export const loggedOutRedirect = '/login'

export const authenticate = () => (
  (dispatch, getState) => {
    const { auth: { loggedIn } } = getState()
    if (loggedIn) { return }
    dispatch(push(loggedOutRedirect))
  }
)

export const authorize = () => (
  (dispatch, getState) => {
    const { auth: { loggedIn, user } } = getState()
    if (!loggedIn) {
      dispatch(push(loggedOutRedirect))
      return
    }
    if (!user.role) {
      dispatch(push(loggedInRedirect))
    }
  }
)

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

export const logOut = () => (
  dispatch => {
    request('/api/auth/logout', { method: 'DELETE' })
      .then(() => {
        dispatch(enableLogin())
        dispatch(push(loggedOutRedirect))
      })
      .catch(() => dispatch(push(loggedInRedirect)))
  }
)

export const getMe = () => (
  dispatch => {
    request('/api/me')
      .then(result => {
        dispatch(loginSuccess(result.json))
        dispatch(push(loggedInRedirect))
      })
      .catch(() => dispatch(enableLogin()))
  }
)

export const updateMe = params => (
  dispatch => (
    request('/api/me', { method: 'PATCH', body: params })
      .then(result => {
        dispatch(loginSuccess(result.json))
        dispatch(push('/me'))
      })
      .catch(result => {
        throw new SubmissionError(formatError(result))
      })
  )
)

// Helpers

export const getGmailOptions = id_token => {
  return {
    method: 'POST',
    body: {
      google: { id_token }
    }
  }
}
