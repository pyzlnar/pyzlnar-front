import {
  types,
  enableLogin,
  loggingIn,
  loginSuccess,
  loginFailure
} from '../../src/action-creators/auth'

describe('ActionCreator: auth', () => {
  describe('enableLogin()', () => {
    it(`returns ${types.enableLogin} action`, () => {
      const expected = { type: types.enableLogin }
      const result = enableLogin()

      expect(result).to.deep.equal(expected)
    })
  })

  describe('loggingIn()', () => {
    it(`returns ${types.loggingIn} action`, () => {
      const expected = { type: types.loggingIn }
      const result = loggingIn()

      expect(result).to.deep.equal(expected)
    })
  })

  describe('loginSucces(user)', () => {
    it(`returns ${types.loginSuccess} action with the received argument`, () => {
      const arg = 'something'
      const expected = {
        type:     types.loginSuccess,
        user: arg
      }
      const result = loginSuccess(arg)

      expect(result).to.deep.equal(expected)
    })
  })

  describe('loginFailure()', () => {
    it(`returns ${types.loginFailure} action`, () => {
      const expected = { type: types.loginFailure }
      const result = loginFailure()

      expect(result).to.deep.equal(expected)
    })
  })
})
