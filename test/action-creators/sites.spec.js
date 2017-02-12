import {
  types,
  fetchingSites,
  fetchSuccess,
  fetchError
} from './../../src/action-creators/sites'

describe('ActionCreator: sites', () => {
  describe('fetchingSites()', () => {
    it(`returns ${types.fetching} action`, () => {
      const expected = { type: types.fetching }
      const result = fetchingSites()

      expect(result).to.deep.equal(expected)
    })
  })

  describe('fetchSuccess(json)', () => {
    it(`returns ${types.fetched} action with the recieved argument`, () => {
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
      const expected = { type: types.fetchError, response: 'irrelevant' }
      const result = fetchError('irrelevant')

      expect(result).to.deep.equal(expected)
    })
  })
})
