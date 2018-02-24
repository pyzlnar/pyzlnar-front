import { push }            from 'react-router-redux'
import { SubmissionError } from 'redux-form'
import * as helper from '../../src/api/ApiHelper'
import {
  newProject,
  createProject,
  updateProject,
  deleteProject,
  fetchProjects,
  reloadProjects
} from '../../src/api/projects'
import {
  fetchingProjects,
  fetchSuccess,
  fetchError,
  setFeatured
} from '../../src/action-creators/projects'

describe('Api: projects', () => {
  describe('newProject()', () => {
    it('returns a new project template', () => {
      const expected = {
        code:        '',
        name:        '',
        start_date:  '',
        end_date:    '',
        url:         '',
        status:      '',
        topics:      [],
        short:       '',
        description: ''
      }

      expect(newProject()).to.deep.equal(expected)
    })
  })

  describe('createProject(params)', () => {
    it('returns a function', () => {
      expect(createProject()).to.be.a('function')
    })

    describe('returned function', () => {
      let f, dispatch, request, params

      beforeEach(() => {
        params   = { project: {} }
        f        = createProject(params)
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

        expect(request).calledWith('/api/projects', { method: 'POST', body: params })
        expect(dispatch).calledWith(push('/admin/projects/newcode'))
      })

      it('calls needed dispatches when the request fails', () => {
        const result = { response: 'body', status: 422, json: 'myerrors' }
        request.rejects(result)
        const r = f(dispatch)

        expect(request).calledWith('/api/projects', { method: 'POST', body: params })
        expect(r.rejectValue).to.be.an.instanceOf(SubmissionError)
        expect(r.rejectValue.errors).to.eq('myerrors')
      })
    })
  })

  describe('updateProject(code)', () => {
    it('returns a function', () => {
      expect(updateProject()).to.be.a('function')
      expect(updateProject()()).to.be.a('function')
    })

    describe('returned function', () => {
      let f, dispatch, request, params

      beforeEach(() => {
        params   = { project: {} }
        f        = updateProject('old')(params)
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

        expect(request).calledWith('/api/projects/old', { method: 'PATCH', body: params })
        expect(dispatch).calledWith(push('/admin/projects/newcode'))
      })

      it('calls needed dispatches when the request fails', () => {
        const result = { response: 'body', status: 422, json: 'myerrors' }
        request.rejects(result)
        const r = f(dispatch)

        expect(request).calledWith('/api/projects/old', { method: 'PATCH', body: params })
        expect(r.rejectValue).to.be.an.instanceOf(SubmissionError)
        expect(r.rejectValue.errors).to.eq('myerrors')
      })
    })
  })

  describe('deleteProject(code)', () => {
    it('returns a function', () => {
      expect(deleteProject()).to.be.a('function')
    })

    describe('returned function', () => {
      let f, dispatch, request

      beforeEach(() => {
        f        = deleteProject('delete')
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

        expect(request).calledWith('/api/projects/delete', { method: 'DELETE' })
        expect(dispatch).calledWith(push('/admin/projects'))
      })

      it('calls needed dispatches when the request fails', () => {
        request.rejects()
        f(dispatch)

        expect(request).calledWith('/api/projects/delete', { method: 'DELETE' })
        expect(dispatch).calledWith(push('/admin/projects'))
      })
    })
  })

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
