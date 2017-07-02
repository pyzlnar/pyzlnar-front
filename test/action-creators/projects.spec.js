import {
  types,
  fetchingProjects,
  fetchSuccess,
  fetchError,
  toggleFold,
  setFeatured,
  dismissFeatured
} from '../../src/action-creators/projects'

describe('ActionCreator: projects', () => {
  describe('fetchingProjects()', () => {
    it(`returns ${types.fetching} action`, () => {
      const expected = { type: types.fetching }
      const result = fetchingProjects()

      expect(result).to.deep.equal(expected)
    })
  })

  describe('fetchSuccess(json)', () => {
    it(`returns ${types.fetched} action with the received argument`, () => {
      const arg = 'something'
      const expected = {
        type:     types.fetched,
        projects: arg
      }
      const result = fetchSuccess(arg)

      expect(result).to.deep.equal(expected)
    })
  })

  describe('fetchError(response)', () => {
    it(`returns ${types.fetchError} action`, () => {
      const expected = { type: types.fetchError, response: 'irrelevant' }
      const result = fetchError('irrelevant')

      expect(result).to.deep.equal(expected)
    })
  })

  describe('toggleFold(code)', () => {
    it(`returns ${types.toggleFold} action`, () => {
      const expected = { type: types.toggleFold, code: 'acode' }
      const result = toggleFold('acode')

      expect(result).to.deep.equal(expected)
    })
  })

  describe('setFeatured(selected)', () => {
    it(`returns ${types.setFeatured} action`, () => {
      const expected = { type: types.setFeatured, selected: 'this' }
      const result = setFeatured('this')

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
})
