import { push }    from 'react-router-redux'
import * as helper from '../../src/api/ApiHelper'
import {
  loggedInRedirect,
  onLoadLogin,
  gmailLogin,
  getGmailOptions
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

      it('calls needed dispatches when requests succeeds', () => {
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

      it('calls needed dispatches when requests succeeds', () => {
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
})
