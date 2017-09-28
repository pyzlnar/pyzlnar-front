import * as helper    from '../../src/api/ApiHelper'
import { fetchSites } from '../../src/api/sites'
import {
  fetchingSites,
  fetchSuccess,
  fetchError,
  setFeatured
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
      })

      afterEach(() => {
        request.restore()
      })

      it('calls nothing when sites is not empty', () => {
        const getState = () => {
          return { sites: { sites: ['something'] } }
        }

        f(dispatch, getState)

        expect(dispatch).not.called
        expect(request).not.called
      })

      it('calls needed dispatches when request succeeds', () => {
        const json = { response: 'body' }
        const getState = () => {
          return { sites: { sites: [] } }
        }

        request.resolves({ json })
        f(dispatch, getState)

        expect(dispatch).calledWith(fetchingSites())
        expect(request).calledWith('/api/sites')
        expect(dispatch).calledWith(fetchSuccess(json))
        expect(dispatch).calledWith(setFeatured())
      })

      it('calls need dispatches when request fails', () => {
        const json = { response: 'body' }
        const getState = () => {
          return { sites: { sites: [] } }
        }

        request.rejects({ json })
        f(dispatch, getState)

        expect(dispatch).calledWith(fetchingSites())
        expect(request).calledWith('/api/sites')
        expect(dispatch).calledWith(fetchError())
      })
    })
  })
})
