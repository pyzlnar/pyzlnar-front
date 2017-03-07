import deepFreeze from 'deep-freeze'
import { types } from '../../src/action-creators/rem'
import reducer   from '../../src/reducers/rem'

describe('Reducer: rem', () => {
  describe(`when receiving action ${types.prevImage}`, () => {
    it('return the previous image', () => {
      const action = { type: types.prevImage }
      const state  = {
        images: ['one', 'two', 'three'],
        current: { image: 'two', index: 1 }
      }
      deepFreeze(state)

      const expected = {
        images: ['one', 'two', 'three'],
        current: { image: 'one', index: 0 }
      }

      const result = reducer(state, action)

      expect(result).to.deep.equal(expected)
    })

    it('is able to handle the beginning of the array', () => {
      const action = { type: types.prevImage }
      const state  = {
        images: ['one', 'two', 'three'],
        current: { image: 'one', index: 0 }
      }
      deepFreeze(state)

      const expected = {
        images: ['one', 'two', 'three'],
        current: { image: 'three', index: 2 }
      }

      const result = reducer(state, action)

      expect(result).to.deep.equal(expected)
    })
  })

  describe(`when receiving action ${types.nextImage}`, () => {
    it('return the next image', () => {
      const action = { type: types.nextImage }
      const state  = {
        images: ['one', 'two', 'three'],
        current: { image: 'two', index: 1 }
      }
      deepFreeze(state)

      const expected = {
        images: ['one', 'two', 'three'],
        current: { image: 'three', index: 2 }
      }

      const result = reducer(state, action)

      expect(result).to.deep.equal(expected)
    })

    it('is able to handle the end of the array', () => {
      const action = { type: types.nextImage }
      const state  = {
        images: ['one', 'two', 'three'],
        current: { image: 'three', index: 2 }
      }
      deepFreeze(state)

      const expected = {
        images: ['one', 'two', 'three'],
        current: { image: 'one', index: 0 }
      }

      const result = reducer(state, action)

      expect(result).to.deep.equal(expected)
    })
  })

  describe(`when receiving an unknown action`, () => {
    it('returns the state as received', () => {
      const action = { type: 'onoz' }
      const state  = { of: 'dissarray' }
      deepFreeze(state)
      const expected = state

      const result = reducer(state, action)

      expect(result).to.deep.equal(expected)
    })
  })
})
