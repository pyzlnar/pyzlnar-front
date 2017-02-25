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
      const action = {
        type: types.fetched,
        projects: [ {code: 'myproject'}, {code: 'other'} ],
      }
      const state  = { isFetching: true, projects: []}
      deepFreeze(state)

      const expected = {
        isFetching: false,
        projects: [ {code: 'myproject'}, {code: 'other'} ],
        foldedProjects: { myproject: true, other: true }
      }

      const result = reducer(state, action)

      expect(result).to.deep.equal(expected)
    })
  })

  describe(`when receiving action ${types.fetchError}`, () => {
    it('resets the state and sets the fetchFailed flag to true', () => {
      const action = { type: types.fetchError }
      const state  = { something: 'awful' }
      deepFreeze(state)

      const expected = {
        isFetching: false,
        fetchFailed: true,
        projects: [],
        featured: { dismissed: false }
      }

      const result = reducer(state, action)

      expect(result).to.deep.equal(expected)
    })
  })

  describe(`when receiving action ${types.setFeatured}`, () => {
    it('sets the featured project to null if theres no projects', () => {
      const action = { type: types.setFeatured }
      const state  = { projects: [], featured: {} }
      deepFreeze(state)

      const expected = { projects: [], featured: { project: null } }

      const result = reducer(state, action)

      expect(result).to.deep.equal(expected)
    })

    it('sets the featured project to null if featured was dimissed', () => {
      const action = { type: types.setFeatured }
      const state  = {
        projects: [ { code: 'one' } ],
        featured: { dismissed: true }
      }
      deepFreeze(state)

      const expected = {
        projects: [ { code: 'one' } ],
        featured: { dismissed: true, project: null }
      }

      const result = reducer(state, action)

      expect(result).to.deep.equal(expected)
    })

    it('finds the project if it the action contains a selected', () => {
      const action = { type: types.setFeatured, selected: 'this' }
      const state  = {
        projects: [ { code: 'one' }, { code: 'this' } ],
        featured: { dismissed: false }
      }
      deepFreeze(state)

      const expected = {
        projects: [ { code: 'one' }, { code: 'this' } ],
        featured: { dismissed: false, project: { code: 'this' } }
      }

      const result = reducer(state, action)

      expect(result).to.deep.equal(expected)
    })

    it('features a random project if neither of the above applies', () => {
      const action = { type: types.setFeatured }
      const state  = {
        projects: [ { code: 'one' } ],
        featured: { dismissed: false }
      }
      deepFreeze(state)

      const expected = {
        projects: [ { code: 'one' } ],
        featured: { dismissed: false, project: { code: 'one' } }
      }

      const result = reducer(state, action)

      expect(result).to.deep.equal(expected)
    })
  })

  describe(`when receiving action ${types.dismissFeatured}`, () => {
    it('cleans the featured object and sets dismissed to true', () => {
      const action = { type: types.dismissFeatured }
      const state  = { featured: { project: {}, dismissed: false } }
      deepFreeze(state)

      const expected = { featured: { dismissed: true } }

      const result = reducer(state, action)

      expect(result).to.deep.equal(expected)
    })
  })

  describe(`when receiving action ${types.toggleFold}`, () => {
    it('toggles the fold variable for the respective project', () => {
      const action = { type: types.toggleFold, code: 'myproject' }
      const state  = { foldedProjects: { myproject: true, other: true } }
      deepFreeze(state)

      const expected  = { foldedProjects: { myproject: false, other: true } }

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

