import { push }            from 'react-router-redux'
import { SubmissionError } from 'redux-form'

import { request } from './ApiHelper'
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

export const logOut = () => {
  return dispatch => {
    request('/api/auth/logout', { method: 'DELETE' })
      .then(() => {
        dispatch(enableLogin())
        dispatch(push(loggedOutRedirect))
      })
      .catch(() => dispatch(push(loggedInRedirect)))
  }
}

export const getMe = () => {
  return dispatch => {
    request('/api/me')
      .then(result => {
        dispatch(loginSuccess(result.json))
        dispatch(push(loggedInRedirect))
      })
      .catch(() => dispatch(enableLogin()))
  }
}

export const updateMe = params => {
  return dispatch => (
    request('/api/me', { method: 'PATCH', body: params })
      .then(result => {
        dispatch(loginSuccess(result.json))
        dispatch(push('/me'))
      })
      .catch(result => {
        if (result.status == 422) {
          throw new SubmissionError(result.json)
        } else {
          throw new SubmissionError({ _error: 'There was an issue!' })
        }
      })
  )
}

// Helpers

export const getGmailOptions = id_token => {
  return {
    method: 'POST',
    body: {
      google: { id_token }
    }
  }
}
