// Action Creators for Sites Component

export const types = {
  fetching:        'sites/FETCHING',
  fetched:         'sites/FETCHED',
  fetchError:      'sites/FETCH_ERROR',
  setFeatured:     'sites/SET_FEATURED',
  dismissFeatured: 'sites/DISMISS_FEATURED',
  toggleDisplay:   'sites/TOGGLE_DISPLAY',
  toggleFold:      'sites/TOGGLE_FOLD'
}

export const fetchingSites = () => {
  return { type: types.fetching }
}

export const fetchSuccess = sites => {
  return { type: types.fetched, sites }
}

export const fetchError = response => {
  return { type: types.fetchError, response }
}

export const setFeatured = selected => {
  return { type: types.setFeatured, selected }
}

export const dismissFeatured = () => {
  return { type: types.dismissFeatured }
}

export const toggleDisplay = display => {
  return { type: types.toggleDisplay, display }
}

export const toggleFold = code => {
  return { type: types.toggleFold, code }
}
