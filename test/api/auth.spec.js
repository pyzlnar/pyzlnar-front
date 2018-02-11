import { push }            from 'react-router-redux'
import { SubmissionError } from 'redux-form'
import * as helper from '../../src/api/ApiHelper'
import {
  loggedInRedirect,
  loggedOutRedirect,
  onLoadLogin,
  gmailLogin,
  getGmailOptions,
  logOut,
  updateMe
} from '../../src/api/auth'

import {
  enableLogin,
  loggingIn,
  loginSuccess,
  loginFailure
} from '../../src/action-creators/auth'

describe('Api: auth', () => {
  describe('onLoadLogin()', () => {
    it('returns a function', () => {
      expect(onLoadLogin()).to.be.a('function')
    })

    describe('returned function', () => {
      let f, dispatch, request

      beforeEach(() => {
        f        = onLoadLogin()
        dispatch = sinon.spy()
        request  = sinon.stub(helper, 'request')
        request.returnsPromise()
      })

      afterEach(() => {
        request.restore()
      })

      it('calls needed dispatches when request succeeds', () => {
        const json = { response: 'body' }

        request.resolves({ json })
        f(dispatch)

        expect(request).calledWith('/api/me')
        expect(dispatch).calledWith(loginSuccess(json))
        expect(dispatch).calledWith(push(loggedInRedirect))
      })

      it('calls needed dispatches when request fails', () => {
        request.rejects()
        f(dispatch)

        expect(request).calledWith('/api/me')
        expect(dispatch).calledWith(enableLogin())
      })
    })
  })

  describe('gmailLogin()', () => {
    let args

    beforeEach(() => {
      args = { tokenObj: { id_token: 'token' } }
    })

    it('returns a function', () => {
      expect(gmailLogin(args)).to.be.a('function')
    })

    describe('returned function', () => {
      let f, dispatch, request

      beforeEach(() => {
        f        = gmailLogin(args)
        dispatch = sinon.spy()
        request  = sinon.stub(helper, 'request')
        request.returnsPromise()
      })

      afterEach(() => {
        request.restore()
      })

      it('calls needed dispatches when request succeeds', () => {
        const json = { response: 'body' }

        request.resolves({ json })
        f(dispatch)

        expect(dispatch).calledWith(loggingIn())
        expect(request).calledWith('/api/auth/login', getGmailOptions('token'))
        expect(dispatch).calledWith(loginSuccess(json))
        expect(dispatch).calledWith(push(loggedInRedirect))
      })

      it('calls needed dispatches when request fails', () => {
        request.rejects()
        f(dispatch)

        expect(request).calledWith('/api/auth/login', getGmailOptions('token'))
        expect(dispatch).calledWith(loginFailure())
      })
    })
  })

  describe('logOut()', () => {
    it('returns a function', () => {
      expect(logOut()).to.be.a('function')
    })

    describe('returned function', () => {
      let f, dispatch, request

      beforeEach(() => {
        f        = logOut()
        dispatch = sinon.spy()
        request  = sinon.stub(helper, 'request')
        request.returnsPromise()
      })

      afterEach(() => {
        request.restore()
      })

      it('calls needed dispatches when request succeeds', () => {
        const json = { response: 'body' }

        request.resolves({ json })
        f(dispatch)

        expect(request).calledWith('/api/auth/logout', { method: 'DELETE' })
        expect(dispatch).calledWith(enableLogin())
        expect(dispatch).calledWith(push(loggedOutRedirect))
      })

      it('calls needed dispatches when request fails', () => {
        request.rejects()
        f(dispatch)

        expect(request).calledWith('/api/auth/logout', { method: 'DELETE' })
        expect(dispatch).calledWith(push(loggedInRedirect))
      })
    })
  })

  describe('updateMe(params)', () => {
    it('returns a function', () => {
      expect(updateMe()).to.be.a('function')
    })

    describe('returned function', () => {
      let f, dispatch, request, params

      beforeEach(() => {
        params   = { some: 'params' }
        f        = updateMe(params)
        dispatch = sinon.spy()
        request  = sinon.stub(helper, 'request')
        request.returnsPromise()
      })

      afterEach(() => {
        request.restore()
      })

      it('calls needed dispatches when request succeeds', () => {
        const json = { response: 'body' }

        request.resolves({ json })
        f(dispatch)

        expect(request).calledWith('/api/me', { method: 'PATCH', body: params })
        expect(dispatch).calledWith(loginSuccess(json))
      })

      it('calls needed dispatches when request fails with 422', () => {
        const result = { response: 'body', status: 422, json: 'myerrors' }
        request.rejects(result)
        const r = f(dispatch)

        expect(request).calledWith('/api/me', { method: 'PATCH', body: params })
        expect(r.rejectValue).to.eql(new SubmissionError('myerrors'))
      })

      it('calls needed dispatches when request fails with another error', () => {
        const result = { response: 'body', status: 503, json: 'myerrors' }
        request.rejects(result)
        const r = f(dispatch)

        expect(request).calledWith('/api/me', { method: 'PATCH', body: params })
        expect(r.rejectValue).to.not.eql(new SubmissionError('myerrors'))
      })
    })
  })
})
