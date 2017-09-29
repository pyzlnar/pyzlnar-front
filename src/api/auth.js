import { push }    from 'react-router-redux'
import { request } from './ApiHelper'
import {
  loggingIn,
  loginSuccess,
  loginFailure
} from '../action-creators/auth'

export const gmailLogin = response => {
  const { tokenObj } = response
  const { id_token } = tokenObj
  return dispatch => {
    dispatch(loggingIn())
    request('/api/auth/login', getGmailOptions(id_token))
      .then(result => {
        dispatch(loginSuccess(result.json))
        dispatch(push('/'))
      })
      .catch(result => dispatch(loginFailure()))
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
