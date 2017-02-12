import deepFreeze from 'deep-freeze'
import { types } from './../../src/action-creators/sites'
import reducer   from './../../src/reducers/sites'

describe('Reducer: sites', () => {
  describe(`when receiving ${types.fetching} action`, () => {
    it('sets the isFetching boolean to true, and empties sites', () => {
      const action = { type: types.fetching }
      const state  = { isFetching: false, sites: ['Maybe not empty']}
      deepFreeze(state)

      const expected = { isFetching: true, sites: [] }

      const result = reducer(state, action)

      expect(result).to.deep.equal(expected)
    })
  })

  describe(`when receiving ${types.fetched} action`, () => {
    it('sets the isFetching boolean to false, and assigns sites', () => {
      const action = { type: types.fetched, sites: ['Something new!'] }
      const state  = { isFetching: true, sites: []}
      deepFreeze(state)

      const expected = { isFetching: false, sites: ['Something new!'] }

      const result = reducer(state, action)

      expect(result).to.deep.equal(expected)
    })
  })

  describe(`when receiving ${types.fetchError} action`, () => {
    it('resets the state and sets the fetchFailed flag to true', () => {
      const action = { type: types.fetchError }
      const state  = { something: 'awful' }
      deepFreeze(state)

      const expected = { isFetching: false, fetchFailed: true, sites: [] }

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
