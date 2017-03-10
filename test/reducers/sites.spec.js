import deepFreeze from 'deep-freeze'
import { types } from '../../src/action-creators/sites'
import reducer   from '../../src/reducers/sites'

describe('Reducer: sites', () => {
  describe(`when receiving action ${types.fetching}`, () => {
    it('sets the isFetching boolean to true, and empties sites', () => {
      const action = { type: types.fetching }
      const state  = { isFetching: false, sites: ['Maybe not empty']}
      deepFreeze(state)

      const expected = { isFetching: true, sites: [] }

      const result = reducer(state, action)

      expect(result).to.deep.equal(expected)
    })
  })

  describe(`when receiving action ${types.fetched}`, () => {
    it('sets the isFetching boolean to false, and assigns sites', () => {
      const action = { type: types.fetched, sites: [{code: 'site'}] }
      const state  = { isFetching: true, sites: []}
      deepFreeze(state)

      const expected = {
        isFetching: false,
        sites: [ {code: 'site'} ],
        foldedSites: { site: true }
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
        sites: [],
        display: 'grid',
        featured: { dismissed: false }
      }

      const result = reducer(state, action)

      expect(result).to.deep.equal(expected)
    })
  })

  describe(`when receiving action ${types.setFeatured}`, () => {
    it('sets the featured site to null if theres no sites', () => {
      const action = { type: types.setFeatured }
      const state  = { sites: [], featured: {} }
      deepFreeze(state)

      const expected = { sites: [], featured: { site: null } }

      const result = reducer(state, action)

      expect(result).to.deep.equal(expected)
    })

    it('sets the featured site to null if featured was dimissed', () => {
      const action = { type: types.setFeatured }
      const state  = {
        sites: [ { code: 'one' } ],
        featured: { dismissed: true }
      }
      deepFreeze(state)

      const expected = {
        sites: [ { code: 'one' } ],
        featured: { dismissed: true, site: null }
      }

      const result = reducer(state, action)

      expect(result).to.deep.equal(expected)
    })

    it('finds the site if it the action contains a selected', () => {
      const action = { type: types.setFeatured, selected: 'this' }
      const state  = {
        sites: [ { code: 'one' }, { code: 'this' } ],
        featured: { dismissed: false }
      }
      deepFreeze(state)

      const expected = {
        sites: [ { code: 'one' }, { code: 'this' } ],
        featured: { dismissed: false, site: { code: 'this' } }
      }

      const result = reducer(state, action)

      expect(result).to.deep.equal(expected)
    })

    it('features a random site if neither of the above applies', () => {
      const action = { type: types.setFeatured }
      const state  = {
        sites: [ { code: 'one' } ],
        featured: { dismissed: false }
      }
      deepFreeze(state)

      const expected = {
        sites: [ { code: 'one' } ],
        featured: { dismissed: false, site: { code: 'one' } }
      }

      const result = reducer(state, action)

      expect(result).to.deep.equal(expected)
    })
  })

  describe(`when receiving action ${types.dismissFeatured}`, () => {
    it('cleans the featured object and sets dismissed to true', () => {
      const action = { type: types.dismissFeatured }
      const state  = { featured: { site: {}, dismissed: false } }
      deepFreeze(state)

      const expected = { featured: { dismissed: true } }

      const result = reducer(state, action)

      expect(result).to.deep.equal(expected)
    })
  })

  describe(`when receiving action ${types.toggleDisplay}`, () => {
    it('sets the state display with the received display', () => {
      const action = { type: types.toggleDisplay, display: 'list' }
      const state  = { display: 'grid' }
      deepFreeze(state)

      const expected = { display: 'list' }

      const result = reducer(state, action)

      expect(result).to.deep.equal(expected)
    })
  })

  describe(`when receiving action ${types.toggleFold}`, () => {
    it('toggles the fold variable for the respective project', () => {
      const action = { type: types.toggleFold, code: 'mysite' }
      const state  = { foldedSites: { mysite: true, other: true } }
      deepFreeze(state)

      const expected  = { foldedSites: { mysite: false, other: true } }

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
