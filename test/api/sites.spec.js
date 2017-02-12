import * as helper    from '../../src/api/ApiHelper'
import { fetchSites } from '../../src/api/sites'
import {
  fetchingSites,
  fetchSuccess,
  fetchError
} from '../../src/action-creators/sites'

describe('Api: sites', () => {
  describe('fetchSites()', () => {
    it('returns a function', () => {
      expect(fetchSites()).to.be.a('function')
    })

    describe('returned function', () => {
      let f, dispatch, request

      beforeEach(() => {
        f        = fetchSites()
        dispatch = sinon.spy()
        request  = sinon.stub(helper, 'request')
        request.returnsPromise()
        request.resolves('PROMISE_RESPONSE')
      })

      afterEach(() => {
        request.restore()
      })

      it('doesnt call anything when sites is not empty', () => {
        const getState = () => {
          return { sites: { sites: ['something'] } }
        }

        f(dispatch, getState)

        expect(dispatch).not.called
        expect(request).not.called
      })

      it('calls several dispatches when sites is empty', () => {
        const getState = () => {
          return { sites: { sites: [] } }
        }

        f(dispatch, getState)

        expect(dispatch).calledWith(fetchingSites())
        const requestArgs = ['api/sites', { success: fetchSuccess, error: fetchError }]
        expect(request).calledWith(...requestArgs)
        expect(dispatch).calledWith('PROMISE_RESPONSE')
      })
    })
  })
})
