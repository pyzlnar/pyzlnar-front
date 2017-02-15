// Action Creators for SitesContainer Component

export const types = {
  fetching:   'sites/FETCHING',
  fetched:    'sites/FETCHED',
  fetchError: 'sites/FETCH_ERROR'
}

export const fetchingSites = () => {
  return { type: types.fetching }
}

export const fetchSuccess = json => {
  return { type: types.fetched, sites: json }
}

export const fetchError = response => {
  return { type: types.fetchError, response: response }
}
