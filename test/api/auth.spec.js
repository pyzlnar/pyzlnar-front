import { push }            from 'react-router-redux'
import { SubmissionError } from 'redux-form'
import * as helper from '../../src/api/ApiHelper'
import {
  authenticate,
  authorize,
  loggedInRedirect,
  loggedOutRedirect,
  getMe,
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
  describe('authenticate()', () => {
    it('returns a function', () => {
      expect(authenticate()).to.be.a('function')
    })

    describe('returned function', () => {
      let f, dispatch

      beforeEach(() => {
        f        = authenticate()
        dispatch = sinon.spy()
      })

      it('does nothing if user is loggedIn', () => {
        const getState = () => ({ auth: { loggedIn: true } })
        f(dispatch, getState)
        expect(dispatch).not.called
      })

      it('redirects if user is not loggedIn', () => {
        const getState = () => ({ auth: { loggedIn: false } })
        f(dispatch, getState)
        expect(dispatch).calledWith(push(loggedOutRedirect))
      })
    })
  })

  describe('authorize()', () => {
    it('returns a function', () => {
      expect(authorize()).to.be.a('function')
    })

    describe('returned function', () => {
      let f, dispatch

      beforeEach(() => {
        f        = authorize()
        dispatch = sinon.spy()
      })

      it('does nothing if user is loggedIn and has roles', () => {
        const getState = () => ({ auth: { loggedIn: true, user: { role: true } } })
        f(dispatch, getState)
        expect(dispatch).not.called
      })

      it('redirects if user is not loggedIn', () => {
        const getState = () => ({ auth: { loggedIn: false } })
        f(dispatch, getState)
        expect(dispatch).calledWith(push(loggedOutRedirect))
      })

      it('redirects if user has no role', () => {
        const getState = () => ({ auth: { loggedIn: true, user: {} } })
        f(dispatch, getState)
        expect(dispatch).calledWith(push(loggedInRedirect))
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
        const user = { name: 'someone' }
        const json = { user, token: 'csrftoken' }

        request.resolves({ json })
        f(dispatch)

        expect(dispatch).calledWith(loggingIn())
        expect(request).calledWith('/api/auth/login', getGmailOptions('token'))
        expect(dispatch).calledWith(loginSuccess(user))
        expect(dispatch).calledWith(push(loggedInRedirect))
        expect(localStorage.getItem('token')).to.equal('csrftoken')
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
        localStorage.setItem('token', 'myToken')

        request.resolves({ json })
        f(dispatch)

        expect(request).calledWith('/api/auth/logout', { method: 'DELETE' })
        expect(dispatch).calledWith(enableLogin())
        expect(dispatch).calledWith(push(loggedOutRedirect))
        expect(localStorage.getItem('token')).to.not.be
      })

      it('calls needed dispatches when request fails', () => {
        request.rejects()
        f(dispatch)

        expect(request).calledWith('/api/auth/logout', { method: 'DELETE' })
        expect(dispatch).calledWith(push(loggedInRedirect))
      })
    })
  })

  describe('getMe()', () => {
    it('returns a function', () => {
      expect(getMe()).to.be.a('function')
    })

    describe('returned function', () => {
      let f, dispatch, request

      beforeEach(() => {
        f        = getMe()
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

      it('calls needed dispatches when the request fails', () => {
        const result = { response: 'body', status: 422, json: 'myerrors' }
        request.rejects(result)
        const r = f(dispatch)

        expect(request).calledWith('/api/me', { method: 'PATCH', body: params })
        expect(r.rejectValue).to.be.an.instanceOf(SubmissionError)
        expect(r.rejectValue.errors).to.eq('myerrors')
      })
    })
  })
})
