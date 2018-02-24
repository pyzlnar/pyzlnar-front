import { push }            from 'react-router-redux'
import { SubmissionError } from 'redux-form'

import { formatError, request } from './ApiHelper'
import {
  fetchingProjects,
  fetchSuccess,
  fetchError,
  resetProjects,
  setFeatured
} from '../action-creators/projects'

export const newProject = () => (
  {
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
)

export const createProject = params => (
  dispatch => (
    request('/api/projects', { method: 'POST', body: params })
      .then(result => {
        const { json: { code } } = result
        dispatch(reloadProjects())
        dispatch(push(`/admin/projects/${code}`))
      })
      .catch(result => {
        throw new SubmissionError(formatError(result))
      })
  )
)

export const updateProject = code => (
  params => (
    dispatch => (
      request(`/api/projects/${code}`, { method: 'PATCH', body: params })
        .then(result => {
          const { json: { code } } = result
          dispatch(reloadProjects(code))
          dispatch(push(`/admin/projects/${code}`))
        })
        .catch(result => {
          throw new SubmissionError(formatError(result))
        })
    )
  )
)

export const deleteProject = code => (
  dispatch => (
    request(`/api/projects/${code}`, { method: 'DELETE' })
      .then(result => {
        dispatch(reloadProjects())
        dispatch(push('/admin/projects'))
      }).catch(result => {
        dispatch(reloadProjects())
        dispatch(push('/admin/projects'))
      })
  )
)

export const fetchProjects = selected => (
  (dispatch, getState) => {
    const projects = getState().projects.projects
    if (projects.length === 0) {
      dispatch(fetchingProjects())
      request('/api/projects')
        .then(result => {
          dispatch(fetchSuccess(result.json))
          dispatch(setFeatured(selected))
        })
        .catch(result => dispatch(fetchError()))
    }
  }
)

export const reloadProjects = selected => (
  (dispatch, getState) => {
    dispatch(resetProjects())
    fetchProjects(selected)(dispatch, getState)
  }
)
