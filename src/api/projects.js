import { request } from './ApiHelper'
import {
  fetchingProjects,
  fetchSuccess,
  fetchError,
  resetProjects,
  setFeatured
} from '../action-creators/projects'

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
