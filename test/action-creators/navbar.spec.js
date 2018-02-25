import deepFreeze from 'deep-freeze'
import {
  toggleHover
} from '../../src/action-creators/navbar'

describe('ActionCreator: navbar', () => {
  describe('toggleHover(state, which)', () => {
    it('returns a new state with hover active', () => {
      const state = {
        items: [
          { name: 'other', hover: false },
          { name: 'dummy', hover: false }
        ]
      }
      deepFreeze(state)

      const expected = {
        items: [
          { name: 'other', hover: false },
          { name: 'dummy', hover: true  }
        ]
      }

      const result = toggleHover(state, 'dummy')
      expect(result).to.deep.equal(expected)
    })

    it('returns a new state with hover not active', () => {
      const state = {
        items: [
          { name: 'other', hover: true },
          { name: 'dummy', hover: true }
        ]
      }
      deepFreeze(state)

      const expected = {
        items: [
          { name: 'other', hover: true  },
          { name: 'dummy', hover: false }
        ]
      }

      const result = toggleHover(state, 'dummy')
      expect(result).to.deep.equal(expected)
    })
  })
})
