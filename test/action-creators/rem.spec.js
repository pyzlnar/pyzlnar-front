import deepFreeze from 'deep-freeze'
import {
  getInitialState,
  prevImage,
  nextImage
} from '../../src/action-creators/rem'

describe('ActionCreator: rem', () => {
  describe('getInitialState()', () => {
    it('returns the initialState of the component', () => {
      const state = getInitialState()

      expect(state).to.have.property('images')
      expect(state).to.have.property('current')
    })
  })

  describe('prevImage(state)', () => {
    it('returns the previous image', () => {
      const state  = {
        images: ['one', 'two', 'three'],
        current: { image: 'two', index: 1 }
      }
      deepFreeze(state)

      const expected = {
        current: { image: 'one', index: 0 }
      }

      const result = prevImage(state)
      expect(result).to.deep.equal(expected)
    })

    it('is able to handle the beginning of the array', () => {
      const state  = {
        images: ['one', 'two', 'three'],
        current: { image: 'one', index: 0 }
      }
      deepFreeze(state)

      const expected = {
        current: { image: 'three', index: 2 }
      }

      const result = prevImage(state)
      expect(result).to.deep.equal(expected)
    })
  })

  describe('nextImage(state)', () => {
    it('returns the next image', () => {
      const state  = {
        images: ['one', 'two', 'three'],
        current: { image: 'two', index: 1 }
      }
      deepFreeze(state)

      const expected = {
        current: { image: 'three', index: 2 }
      }

      const result = nextImage(state)
      expect(result).to.deep.equal(expected)
    })

    it('is able to handle the end of the array', () => {
      const state  = {
        images: ['one', 'two', 'three'],
        current: { image: 'three', index: 2 }
      }
      deepFreeze(state)

      const expected = {
        current: { image: 'one', index: 0 }
      }

      const result = nextImage(state)
      expect(result).to.deep.equal(expected)
    })
  })
})
