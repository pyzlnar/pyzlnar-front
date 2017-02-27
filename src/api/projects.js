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
      request('/api/projects', { success: fetchSuccess, error: fetchError })
        .then(action => {
          dispatch(action)
          dispatch(setFeatured(selected))
        })
    }
  }
}
