import { push }            from 'react-router-redux'
import { SubmissionError } from 'redux-form'

import { formatError, request } from './ApiHelper'
import {
  fetchingSites,
  fetchSuccess,
  fetchError,
  resetSites,
  setFeatured
} from '../action-creators/sites'

export const newSite = () => (
  {
    code:        '',
    name:        '',
    url:         '',
    status:      '',
    topics:      [],
    description: ''
  }
)

export const createSite = params => (
  dispatch => (
    request('/api/sites', { method: 'POST', body: params })
      .then(result => {
        const { json: { code } } = result
        dispatch(reloadSites())
        dispatch(push(`/admin/sites/${code}`))
      })
      .catch(result => {
        throw new SubmissionError(formatError(result))
      })
  )
)

export const updateSite = code => (
  params => (
    dispatch => (
      request(`/api/sites/${code}`, { method: 'PATCH', body: params })
        .then(result => {
          const { json: { code } } = result
          dispatch(reloadSites())
          dispatch(push(`/admin/sites/${code}`))
        })
        .catch(result => {
          throw new SubmissionError(formatError(result))
        })
    )
  )
)

export const deleteSite = code => (
  dispatch => (
    request(`/api/sites/${code}`, { method: 'DELETE' })
      .then(result => {
        dispatch(reloadSites())
        dispatch(push('/admin/sites'))
      }).catch(result => {
        dispatch(reloadSites())
        dispatch(push('/admin/sites'))
      })
  )
)

export const fetchSites = selected => {
  return (dispatch, getState) => {
    const sites = getState().sites.sites
    if (sites.length === 0) {
      dispatch(fetchingSites())
      request('/api/sites')
        .then(result => {
          dispatch(fetchSuccess(result.json))
          dispatch(setFeatured(selected))
        })
        .catch(result => dispatch(fetchError()))
    }
  }
}

export const reloadSites = () => (
  (dispatch, getState) => {
    dispatch(resetSites())
    fetchSites()(dispatch, getState)
  }
)
