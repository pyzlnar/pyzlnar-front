import deepFreeze from 'deep-freeze'
import { types } from '../../src/action-creators/networkError'
import reducer   from '../../src/reducers/networkError'

describe('Reducer: networkError', () => {
  describe(`when receiving action ${types.startSpin}`, () => {
    it('sets the spin boolean to true', () => {
      const action = { type: types.startSpin }
      const state  = { spin: false }
      deepFreeze(state)

      const expected = { spin: true }

      const result = reducer(state, action)

      expect(result).to.deep.equal(expected)
    })
  })

  describe(`when receiving action ${types.stopSpin}`, () => {
    it('sets the spin boolean to false', () => {
      const action = { type: types.stopSpin }
      const state  = { spin: true }
      deepFreeze(state)

      const expected = { spin: false }

      const result = reducer(state, action)

      expect(result).to.deep.equal(expected)
    })
  })

  describe(`when receiving an unknown action`, () => {
    it('returns the state as received', () => {
      const action = { type: 'ONOZ' }
      const state  = { badgers: 'A random state' }
      deepFreeze(state)
      const expected = state

      const result = reducer(state, action)

      expect(result).to.deep.equal(expected)
    })
  })

})
