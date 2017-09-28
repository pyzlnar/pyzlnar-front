import * as helper       from '../../src/api/ApiHelper'
import { fetchProjects } from '../../src/api/projects'
import {
  fetchingProjects,
  fetchSuccess,
  fetchError,
  setFeatured
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
      })

      afterEach(() => {
        request.restore()
      })

      it('calls nothing when projects is not empty', () => {
        const getState = () => {
          return { projects: { projects: ['something'] } }
        }

        f(dispatch, getState)

        expect(dispatch).not.called
        expect(request).not.called
      })

      it('calls needed dispatches when request succeeds', () => {
        const json = { response: 'body' }
        const getState = () => {
          return { projects: { projects: [] } }
        }

        request.resolves({ json })
        f(dispatch, getState)

        expect(dispatch).calledWith(fetchingProjects())
        expect(request).calledWith('/api/projects')
        expect(dispatch).calledWith(fetchSuccess(json))
        expect(dispatch).calledWith(setFeatured())
      })

      it('calls needed dispatches when request fails', () => {
        const json = { response: 'body' }
        const getState = () => {
          return { projects: { projects: [] } }
        }

        request.rejects({ json })
        f(dispatch, getState)

        expect(dispatch).calledWith(fetchingProjects())
        expect(request).calledWith('/api/projects')
        expect(dispatch).calledWith(fetchError())
      })
    })
  })
})

