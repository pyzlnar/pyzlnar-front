import { push }  from 'react-router-redux'
import {
  types,
  onItemClick,
  onMenuMouseEnter,
  onMenuMouseLeave
} from '../../src/action-creators/navbar'

describe('ActionCreator: navbar', () => {
  describe('onItemClick(path)', () => {
    it('calls push(path) and returns the result', () => {
      const path = '/random'
      const expected = push(path)
      const result = onItemClick(path)

      expect(result).to.deep.equal(expected)
    })
  })

  describe('onMenuMouseEnter(name)', () => {
    it(`returns ${types.enteringMenu} action`, () => {
      const name = 'dummy'
      const expected = {
        type: types.enteringMenu,
        name: name
      }

      const result = onMenuMouseEnter(name)
      expect(result).to.deep.equal(expected)
    })
  })

  describe('onMenuMouseLeave(name)', () => {
    it(`returns ${types.leavingMenu} action`, () => {
      const name = 'dummy'
      const expected = {
        type: types.leavingMenu,
        name: name
      }

      const result = onMenuMouseLeave(name)
      expect(result).to.deep.equal(expected)
    })
  })
})
