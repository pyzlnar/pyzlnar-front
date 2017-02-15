import { types } from './../action-creators/sites'

const initialState = {
  isFetching:  false,
  fetchFailed: false,
  sites: []
}

export default (state = initialState, action = {}) => {
  switch(action.type) {
    case types.fetching:
      return {...state, isFetching: true,  sites: [] }
    case types.fetched:
      return {...state, isFetching: false, sites: action.sites }
    case types.fetchError:
      return {...initialState, fetchFailed: true }
    default:
      return state
  }
}
