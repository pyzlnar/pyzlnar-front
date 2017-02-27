// Action Creators for Projects Component

export const types = {
  fetching:        'projects/FETCHING',
  fetched:         'projects/FETCHED',
  fetchError:      'projects/FETCH_ERROR',
  toggleFold:      'projects/TOGGLE_FOLD',
  setFeatured:     'projects/SET_FEATURED',
  dismissFeatured: 'projects/DISMISS_FEATURED'
}

export const fetchingProjects = () => {
  return { type: types.fetching }
}

export const fetchSuccess = projects => {
  return { type: types.fetched, projects }
}

export const fetchError = response => {
  return { type: types.fetchError, response }
}

export const toggleFold = code => {
  return { type: types.toggleFold, code }
}

export const setFeatured = selected => {
  return { type: types.setFeatured, selected }
}

export const dismissFeatured = () => {
  return { type: types.dismissFeatured }
}
