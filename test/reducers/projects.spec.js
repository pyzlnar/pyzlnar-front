import deepFreeze from 'deep-freeze'
import { types } from '../../src/action-creators/projects'
import reducer   from '../../src/reducers/projects'

describe('Reducer: projects', () => {
  describe(`when receiving action ${types.fetching}`, () => {
    it('sets the isFetching boolean to true, and empties projects', () => {
      const action = { type: types.fetching }
      const state  = { isFetching: false, projects: ['Maybe not empty']}
      deepFreeze(state)

      const expected = { isFetching: true, projects: [] }

      const result = reducer(state, action)

      expect(result).to.deep.equal(expected)
    })
  })

  describe(`when receiving action ${types.fetched}`, () => {
    it('sets the isFetching boolean to false, and assigns projects', () => {
      const action = { type: types.fetched, projects: ['Something new!'] }
      const state  = { isFetching: true, projects: []}
      deepFreeze(state)

      const expected = { isFetching: false, projects: ['Something new!'] }

      const result = reducer(state, action)

      expect(result).to.deep.equal(expected)
    })
  })

  describe(`when receiving action ${types.fetchError}`, () => {
    it('resets the state and sets the fetchFailed flag to true', () => {
      const action = { type: types.fetchError }
      const state  = { something: 'awful' }
      deepFreeze(state)

      const expected = { isFetching: false, fetchFailed: true, projects: [] }

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

