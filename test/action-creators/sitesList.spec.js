import {
  types,
  setInitialState,
  onSelectorClick,
  onFoldClick,
  onDismiss
} from '../../src/action-creators/sitesList'

describe('ActionCreator: sitesList', () => {
  describe('setInitialState(display, sites, selected)', () => {
    it(`returns ${types.setInitialState} action with the received arguments`, () => {
      const args = ['grid', [], 'one', 'other']
      const expected = {
        type: types.setInitialState,
        display: 'grid',
        sites:    [],
        selected: 'one',
        featured: 'other'
      }

      const result = setInitialState(...args)

      expect(result).to.deep.equal(expected)
    })
  })

  describe('onSelectorClick(selector)', () => {
    it(`returns ${types.selectorClicked} action with the received argument`, () => {
      const selector = 'potato'
      const expected = { type: types.selectorClicked, selector }

      const result = onSelectorClick(selector)

      expect(result).to.deep.equal(expected)
    })
  })

  describe('onFoldClick(code)', () => {
    it(`returns ${types.foldClick} action with the received argument`, () => {
      const code = 'badgers'
      const expected = { type: types.foldClick, code }

      const result = onFoldClick(code)

      expect(result).to.deep.equal(expected)
    })
  })

  describe('onDismiss()', () => {
    it(`returns ${types.dismissed} action with the received argument`, () => {
      const expected = { type: types.dismissed }

      const result = onDismiss()

      expect(result).to.deep.equal(expected)
    })
  })
})
