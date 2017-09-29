import { types } from '../action-creators/auth'

const initialState = {
  clientId:    '558071016672-176f4qq81d1vrm96gafm05se7t08iq2p.apps.googleusercontent.com',
  loggedIn:    false,
  loggingIn:   false,
  loginFailed: false,
  user:        null
}

export default (state = initialState, action = {}) => {
  switch(action.type) {
    case types.loggingIn:
      return { ...state, loggingIn: true }
    case types.loginSuccess:
      return { ...initialState, loggedIn: true, user: action.user }
    case types.loginFailure:
      return { ...initialState, loginFailed: true }
    default:
      return state
  }
}
