import { push }            from 'react-router-redux'
import { SubmissionError } from 'redux-form'
import * as helper    from '../../src/api/ApiHelper'
import {
  newSite,
  createSite,
  updateSite,
  deleteSite,
  fetchSites,
  reloadSites
} from '../../src/api/sites'
import {
  fetchingSites,
  fetchSuccess,
  fetchError,
  setFeatured
} from '../../src/action-creators/sites'

describe('Api: sites', () => {
  describe('newSite()', () => {
    it('returns a new project template', () => {
      const expected = {
        code:        '',
        name:        '',
        url:         '',
        status:      '',
        topics:      [],
        description: ''
      }

      expect(newSite()).to.deep.equal(expected)
    })
  })

  describe('createSite(params)', () => {
    it('returns a function', () => {
      expect(createSite()).to.be.a('function')
    })

    describe('returned function', () => {
      let f, dispatch, request, params

      beforeEach(() => {
        params   = { site: {} }
        f        = createSite(params)
        dispatch = sinon.spy()
        request  = sinon.stub(helper, 'request')
        request.returnsPromise()
      })

      afterEach(() => {
        request.restore()
      })

      it('calls needed dispatches when request succeeds', () => {
        const json = { code: 'newcode' }

        request.resolves({ json })
        f(dispatch)

        expect(request).calledWith('/api/sites', { method: 'POST', body: params })
        expect(dispatch).calledWith(push('/admin/sites/newcode'))
      })

      it('calls needed dispatches when the request fails', () => {
        const result = { response: 'body', status: 422, json: 'myerrors' }
        request.rejects(result)
        const r = f(dispatch)

        expect(request).calledWith('/api/sites', { method: 'POST', body: params })
        expect(r.rejectValue).to.be.an.instanceOf(SubmissionError)
        expect(r.rejectValue.errors).to.eq('myerrors')
      })
    })
  })

  describe('updateSite(code)', () => {
    it('returns a function', () => {
      expect(updateSite()).to.be.a('function')
      expect(updateSite()()).to.be.a('function')
    })

    describe('returned function', () => {
      let f, dispatch, request, params

      beforeEach(() => {
        params   = { site: {} }
        f        = updateSite('old')(params)
        dispatch = sinon.spy()
        request  = sinon.stub(helper, 'request')
        request.returnsPromise()
      })

      afterEach(() => {
        request.restore()
      })

      it('calls needed dispatches when request succeeds', () => {
        const json = { code: 'newcode' }

        request.resolves({ json })
        f(dispatch)

        expect(request).calledWith('/api/sites/old', { method: 'PATCH', body: params })
        expect(dispatch).calledWith(push('/admin/sites/newcode'))
      })

      it('calls needed dispatches when the request fails', () => {
        const result = { response: 'body', status: 422, json: 'myerrors' }
        request.rejects(result)
        const r = f(dispatch)

        expect(request).calledWith('/api/sites/old', { method: 'PATCH', body: params })
        expect(r.rejectValue).to.be.an.instanceOf(SubmissionError)
        expect(r.rejectValue.errors).to.eq('myerrors')
      })
    })
  })

  describe('deleteSite(code)', () => {
    it('returns a function', () => {
      expect(deleteSite()).to.be.a('function')
    })

    describe('returned function', () => {
      let f, dispatch, request

      beforeEach(() => {
        f        = deleteSite('delete')
        dispatch = sinon.spy()
        request  = sinon.stub(helper, 'request')
        request.returnsPromise()
      })

      afterEach(() => {
        request.restore()
      })

      it('calls needed dispatches when request succeeds', () => {
        request.resolves()
        f(dispatch)

        expect(request).calledWith('/api/sites/delete', { method: 'DELETE' })
        expect(dispatch).calledWith(push('/admin/sites'))
      })

      it('calls needed dispatches when the request fails', () => {
        request.rejects()
        f(dispatch)

        expect(request).calledWith('/api/sites/delete', { method: 'DELETE' })
        expect(dispatch).calledWith(push('/admin/sites'))
      })
    })
  })

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
