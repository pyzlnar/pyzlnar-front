// Action Creators for authentication

export const types = {
  loggingIn:    'auth/LOGIN_IN',
  loginSuccess: 'auth/LOGIN_SUCCESS',
  loginFailure: 'auth/LOGIN_FAILURE'
}

export const loggingIn = () => {
  return { type: types.loggingIn }
}

export const loginSuccess = user => {
  return { type: types.loginSuccess, user }
}

export const loginFailure = () => {
  return { type: types.loginFailure }
}
