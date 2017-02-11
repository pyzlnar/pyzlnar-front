import { push } from 'react-router-redux'
import {
  onItemClick,
  onMenuMouseEnter,
  onMenuMouseLeave
} from './../../src/action-creators/navbar'

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
    it('returns IS_ENTERING_MENU action', () => {
      const name = 'dummy'
      const expected = {
        type: 'IS_ENTERING_MENU',
        name: name
      }

      const result = onMenuMouseEnter(name)
      expect(result).to.deep.equal(expected)
    })
  })

  describe('onMenuMouseLeave(name)', () => {
    it('returns IS_LEAVING_MENU action', () => {
      const name = 'dummy'
      const expected = {
        type: 'IS_LEAVING_MENU',
        name: name
      }

      const result = onMenuMouseLeave(name)
      expect(result).to.deep.equal(expected)
    })
  })
})
