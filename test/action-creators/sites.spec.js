import {
  types,
  fetchingSites,
  fetchSuccess,
  fetchError,
  setFeatured,
  dismissFeatured,
  toggleDisplay,
  toggleFold
} from '../../src/action-creators/sites'

describe('ActionCreator: sites', () => {
  describe('fetchingSites()', () => {
    it(`returns ${types.fetching} action`, () => {
      const expected = { type: types.fetching }
      const result = fetchingSites()

      expect(result).to.deep.equal(expected)
    })
  })

  describe('fetchSuccess(json)', () => {
    it(`returns ${types.fetched} action with the received argument`, () => {
      const arg = 'something'
      const expected = {
        type:  types.fetched,
        sites: arg
      }
      const result = fetchSuccess(arg)

      expect(result).to.deep.equal(expected)
    })
  })

  describe('fetchError(response)', () => {
    it(`returns ${types.fetchError} action`, () => {
      const expected = { type: types.fetchError }
      const result = fetchError()

      expect(result).to.deep.equal(expected)
    })
  })

  describe('setFeatured(selected)', () => {
    it(`returns ${types.setFeatured} action with the received argument`, () => {
      const expected = { type: types.setFeatured, selected: 'thisone' }
      const result = setFeatured('thisone')

      expect(result).to.deep.equal(expected)
    })
  })

  describe('dismissFeatured()', () => {
    it(`returns ${types.dismissFeatured} action`, () => {
      const expected = { type: types.dismissFeatured }
      const result = dismissFeatured()

      expect(result).to.deep.equal(expected)
    })
  })

  describe('toggleDisplay(display)', () => {
    it(`returns ${types.toggleDisplay} action with the received argument`, () => {
      const expected = { type: types.toggleDisplay, display: 'grid' }
      const result = toggleDisplay('grid')

      expect(result).to.deep.equal(expected)
    })
  })

  describe('toggleFold(code)', () => {
    it(`returns ${types.toggleFold} action with the received argument`, () => {
      const expected = { type: types.toggleFold, code: 'fold' }
      const result = toggleFold('fold')

      expect(result).to.deep.equal(expected)
    })
  })
})
