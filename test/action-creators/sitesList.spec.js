import { types, onSelectorClick } from '../../src/action-creators/sitesList'

describe('ActionCreator: sitesList', () => {
  describe('onSelectorClick(selector)', () => {
    it(`returns ${types.selectorClicked} action with the received argument`, () => {
      const selector = 'potato'
      const expected = { type: types.selectorClicked, selector }

      const result = onSelectorClick(selector)

      expect(result).to.deep.equal(expected)
    })
  })
})
