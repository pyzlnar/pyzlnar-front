import deepFreeze from 'deep-freeze'
import { types } from '../../src/action-creators/sitesList'
import reducer   from '../../src/reducers/sitesList'

describe('Reducer: sitesList', () => {
  describe(`when receiving action ${types.setInitialState}`, () => {
    it('assigns the display and foldedSites', () => {
      const state = {}
      const action = {
        type: types.setInitialState,
        display: 'interesting',
        sites: [ {code: 'one'}, {code: 'two'} ],
        selected: 'two'
      }
      deepFreeze(state)

      const expected = {
        display: 'interesting',
        foldedSites: { one: true, two: false }
      }

      const result = reducer(state, action)

      expect(result).to.deep.equal(expected)
    })

    it('handles correctly when theres no selected', () => {
      const state = {}
      const action = {
        type: types.setInitialState,
        display: 'something',
        sites: [ {code: 'one'}, {code: 'two'} ]
      }
      deepFreeze(state)

      const expected = {
        display: 'something',
        foldedSites: { one: true, two: true }
      }

      const result = reducer(state, action)

      expect(result).to.deep.equal(expected)
    })
  })

  describe(`when receiving action ${types.selectorClicked}`, () => {
    it('assigns the display with the received action selector', () => {
      const state  = { display: 'previous' }
      const action = { type: types.selectorClicked, selector: 'new' }
      deepFreeze(state)

      const expected = { display: 'new' }

      const result = reducer(state, action)

      expect(result).to.deep.equal(expected)
    })
  })

  describe(`when receiving action ${types.foldClick}`, () => {
    it('toggles the selected foldedSite boolean', () => {
      const state  = { foldedSites: { toggle: true, other: true } }
      const action = { type: types.foldClick, code: 'toggle' }
      deepFreeze(state)

      const expected = { foldedSites: { toggle: false, other: true } }

      const result = reducer(state, action)

      expect(result).to.deep.equal(expected)
    })
  })

  describe(`when receiving an unknown action`, () => {
    it('returns the state as received', () => {
      const state  = { badgers: 'A random state' }
      const action = { type: 'ONOZ' }
      deepFreeze(state)
      const expected = state

      const result = reducer(state, action)

      expect(result).to.deep.equal(expected)
    })
  })

})
