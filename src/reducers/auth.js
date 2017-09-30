import { types } from '../action-creators/auth'

const initialState = {
  loggedIn:    false,
  loggingIn:   true,
  loginFailed: false,
  user:        null
}

export default (state = initialState, action = {}) => {
  switch(action.type) {
    case types.enableLogin:
      return { ...initialState, loggingIn: false }
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
