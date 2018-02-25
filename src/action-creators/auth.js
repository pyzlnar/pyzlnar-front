// Action Creators for authentication

export const types = {
  enableLogin:  'auth/ENABLE_LOGIN',
  loggingIn:    'auth/LOGIN_IN',
  loginSuccess: 'auth/LOGIN_SUCCESS',
  loginFailure: 'auth/LOGIN_FAILURE'
}

// Login in is 'disabled' by default to avoid state issues with the gmail button
// Once the app loads and we guarantee the user is indeed not logged in, we then
// enable the login button.
export const enableLogin = () => {
  return { type: types.enableLogin }
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
