import { types } from './../action-creators/projects'

const initialState = {
  isFetching:  false,
  fetchFailed: false,
  projects:    []
}

export default (state = initialState, action = {}) => {
  switch(action.type) {
    case types.fetching:
      return {...state, isFetching: true,  projects: [] }
    case types.fetched:
      return {...state, isFetching: false, projects: action.projects }
    case types.fetchError:
      return {...initialState, fetchFailed: true }
    default:
      return state
  }
}
