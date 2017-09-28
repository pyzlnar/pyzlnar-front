import { request } from './ApiHelper'
import {
  fetchingProjects,
  fetchSuccess,
  fetchError,
  setFeatured
} from '../action-creators/projects'

export const fetchProjects = selected => {
  return (dispatch, getState) => {
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
}
