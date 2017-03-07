import {
  types,
  prevImage,
  nextImage
} from '../../src/action-creators/rem'

describe('ActionCreator: rem', () => {
  describe('prevImage()', () => {
    it(`returns ${types.prevImage} action`, () => {
      const expected = { type: types.prevImage }
      const result = prevImage()

      expect(result).to.deep.equal(expected)
    })
  })

  describe('nextImage()', () => {
    it(`returns ${types.nextImage} action`, () => {
      const expected = { type: types.nextImage }
      const result = nextImage()

      expect(result).to.deep.equal(expected)
    })
  })
})
