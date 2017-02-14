import { types, startSpin, stopSpin } from '../../src/action-creators/networkError'

describe('ActionCreator: networkError', () => {
  describe('startSpin()', () => {
    it(`returns ${types.startSpin} action`, () => {
      const expected = { type: types.startSpin }
      const result = startSpin()

      expect(result).to.deep.equal(expected)
    })
  })

  describe('stopSpin()', () => {
    it(`returns ${types.stopSpin} action`, () => {
      const expected = { type: types.stopSpin }
      const result = stopSpin()

      expect(result).to.deep.equal(expected)
    })
  })
})
