import sample from 'lodash.sample'
import { types } from './../action-creators/sites'

const initialState = {
  isFetching:  false,
  fetchFailed: false,
  sites: [],
  display: 'grid',
  featured: { dismissed: false }
}

export default (state = initialState, action = {}) => {
  switch(action.type) {
    case types.fetching:
      return {...state, isFetching: true,  sites: [] }
    case types.fetched:
      return setFetchedState(state, action)
    case types.fetchError:
      return {...initialState, fetchFailed: true }
    case types.setFeatured:
      return setFeatured(state, action)
    case types.dismissFeatured:
      return {...state, featured: { dismissed: true } }
    case types.toggleDisplay:
      return {...state, display: action.display }
    case types.toggleFold:
      return toggleFold(state, action)
    case types.reset:
      return initialState
    default:
      return state
  }
}

const setFetchedState = (state, action) => {
  let foldedSites = {}
  action.sites.forEach(site => foldedSites[site.code] = true)
  return {
    ...state,
    isFetching:  false,
    sites:       action.sites,
    foldedSites: foldedSites
  }
}

const setFeatured = (state, action) => {
  let site
  if (state.sites.length === 0 || state.featured.dismissed) {
    site = null
  } else if (action.selected) {
    site = state.sites.find(site => site.code === action.selected)
  } else {
    site = sample(state.sites)
  }
  return {
    ...state,
    featured: {
      ...state.featured,
      site: site
    }
  }
}

const toggleFold = (state, action) => {
  const code = action.code
  const foldedSites = state.foldedSites
  return {
    ...state,
    foldedSites: {
      ...foldedSites,
      [code]: !foldedSites[code]
    }
  }
}
