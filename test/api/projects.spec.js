import * as helper       from '../../src/api/ApiHelper'
import { fetchProjects } from '../../src/api/projects'
import {
  fetchingProjects,
  fetchSuccess,
  fetchError
} from '../../src/action-creators/projects'

describe('Api: projects', () => {
  describe('fetchProjects()', () => {
    it('returns a function', () => {
      expect(fetchProjects()).to.be.a('function')
    })

    describe('returned function', () => {
      let f, dispatch, request

      beforeEach(() => {
        f        = fetchProjects()
        dispatch = sinon.spy()
        request  = sinon.stub(helper, 'request')
        request.returnsPromise()
        request.resolves('PROMISE_RESPONSE')
      })

      afterEach(() => {
        request.restore()
      })

      it('doesnt call anything when projects is not empty', () => {
        const getState = () => {
          return { projects: { projects: ['something'] } }
        }

        f(dispatch, getState)

        expect(dispatch).not.called
        expect(request).not.called
      })

      it('calls several dispatches when projects is empty', () => {
        const getState = () => {
          return { projects: { projects: [] } }
        }

        f(dispatch, getState)

        expect(dispatch).calledWith(fetchingProjects())
        const requestArgs = ['/api/projects', { success: fetchSuccess, error: fetchError }]
        expect(request).calledWith(...requestArgs)
        expect(dispatch).calledWith('PROMISE_RESPONSE')
      })
    })
  })
})

