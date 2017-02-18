import deepFreeze from 'deep-freeze'
import { types } from '../../src/action-creators/navbar'
import reducer   from '../../src/reducers/navbar'

describe('Reducer: navbar', () => {
  describe(`when receiving action ${types.enteringMenu}`, () => {
    it('returns a new state with hover active', () => {
      const action = {
        type: types.enteringMenu,
        name: 'dummy'
      }

      const state = [
        { name: 'other', hover: false },
        { name: 'dummy', hover: false }
      ]
      deepFreeze(state)

      const expected = [
        { name: 'other', hover: false },
        { name: 'dummy', hover: true  }
      ]

      const result = reducer(state, action)

      expect(result).to.deep.equal(expected)
    })
  })

  describe(`when receiving action ${types.leavingMenu}`, () => {
    it('returns a new state with hover not active', () => {
      const action = {
        type: types.leavingMenu,
        name: 'dummy'
      }

      const state = [
        { name: 'other', hover: true },
        { name: 'dummy', hover: true }
      ]
      deepFreeze(state)

      const expected = [
        { name: 'other', hover: true  },
        { name: 'dummy', hover: false }
      ]

      const result = reducer(state, action)

      expect(result).to.deep.equal(expected)
    })
  })

  describe('when receiving an unknown action', () => {
    it('returns the state as received', () => {
      const action = { type: 'UNKNOWN' }
      const state  = ['INITIAL STATE']
      deepFreeze(state)
      const expected = state

      const result = reducer(state, action)

      expect(result).to.deep.equal(expected)
    })
  })
})
