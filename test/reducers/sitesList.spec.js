import deepFreeze from 'deep-freeze'
import { types } from './../../src/action-creators/sitesList'
import reducer   from './../../src/reducers/sitesList'

describe('Reducer: sitesList', () => {
  describe(`when receiving action ${types.selectorClicked}`, () => {
    it('assigns the display with the received action selector', () => {
      const action = { type: types.selectorClicked, selector: 'new' }
      const state  = { display: 'previous' }
      deepFreeze(state)

      const expected = { display: 'new' }

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
