import { request } from './ApiHelper'
import {
  fetchingSites,
  fetchSuccess,
  fetchError,
  setFeatured
} from './../action-creators/sites'

export const fetchSites = selected => {
  return (dispatch, getState) => {
    const sites = getState().sites.sites
    if (sites.length === 0) {
      dispatch(fetchingSites())
      request('/api/sites', { success: fetchSuccess, error: fetchError })
        .then(action => {
          dispatch(action)
          dispatch(setFeatured(selected))
        })
    }
  }
}