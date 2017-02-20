// Action Creators for Projects Component

export const types = {
  fetching:   'projects/FETCHING',
  fetched:    'projects/FETCHED',
  fetchError: 'projects/FETCH_ERROR'
}

export const fetchingProjects = () => {
  return { type: types.fetching }
}

export const fetchSuccess = json => {
  return { type: types.fetched, projects: json }
}

export const fetchError = response => {
  return { type: types.fetchError, response: response }
}
