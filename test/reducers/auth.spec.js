import deepFreeze from 'deep-freeze'
import { types } from '../../src/action-creators/auth'
import reducer   from '../../src/reducers/auth'

describe('Reducer: auth', () => {
  describe(`when receiving action ${types.enableLogin}`, () => {
    it('resets the state and sets the loggingIn flag to false', () => {
      const action = { type: types.enableLogin }
      const state  = { someting: 'irrelevant' }
      deepFreeze(state)

      const expected = {
        loggedIn:    false,
        loggingIn:   false,
        loginFailed: false,
        user:        null
      }

      const result = reducer(state, action)

      expect(result).to.deep.equal(expected)
    })
  })

  describe(`when receiving action ${types.loggingIn}`, () => {
    it('sets the loggingIn booolean to true', () => {
      const action = { type: types.loggingIn }
      const state  = { loggingIn: false }
      deepFreeze(state)

      const expected = { loggingIn: true }

      const result = reducer(state, action)

      expect(result).to.deep.equal(expected)
    })
  })

  describe(`when receiving action ${types.loginSuccess}`, () => {
    it('sets the loggedIn flag to true, the loggingIn to false and the user', () => {
      const action = { type: types.loginSuccess, user: 'user' }
      const state  = { loggedIn: false, loggingIn: true, user: null }
      deepFreeze(state)

      const expected = {
        loggedIn:  true,
        loggingIn: false,
        user:      'user'
      }

      const result = reducer(state, action)

      expect(result).to.deep.equal(expected)
    })
  })

  describe(`when receiving action ${types.loginFailure}`, () => {
    it('resets the state, sets the loggingIn to false and loginFailed to true', () => {
      const action = { type: types.loginFailure }
      const state  = { someting: 'irrelevant' }
      deepFreeze(state)

      const expected = {
        loggedIn:    false,
        loggingIn:   false,
        loginFailed: true,
        user:        null
      }

      const result = reducer(state, action)

      expect(result).to.deep.equal(expected)
    })
  })

  describe(`when receiving an unknown action`, () => {
    it('returns the state as received', () => {
      const action = { type: 'WTF' }
      const state  = { badgers: 'A random state' }
      deepFreeze(state)
      const expected = state

      const result = reducer(state, action)

      expect(result).to.deep.equal(expected)
    })
  })
})

