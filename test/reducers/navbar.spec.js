import deepFreeze from 'deep-freeze'
import reducer from './../../src/reducers/navbar'

describe('Reducer: navbar', () => {
  describe('when receiving IS_ENTERING_MENU action', () => {
    it('returns a new state with hover active', () => {
      const action = {
        type: 'IS_ENTERING_MENU',
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

  describe('when receiving IS_LEAVING_MENU action', () => {
    it('returns a new state with hover not active', () => {
      const action = {
        type: 'IS_LEAVING_MENU',
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
