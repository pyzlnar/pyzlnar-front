import sample from 'lodash.sample'
import { types } from '../action-creators/projects'

const initialState = {
  isFetching:  false,
  fetchFailed: false,
  projects:    [],
  featured:    { dismissed: false }
}

export default (state = initialState, action = {}) => {
  switch(action.type) {
    case types.fetching:
      return {...state, isFetching: true,  projects: [] }
    case types.fetched:
      return setFetchedState(state, action)
    case types.fetchError:
      return {...initialState, fetchFailed: true }
    case types.setFeatured:
      return setFeatured(state, action)
    case types.dismissFeatured:
      return {...state, featured: { dismissed: true } }
    case types.toggleFold:
      return toggleFold(state, action)
    default:
      return state
  }
}

const setFetchedState = (state, action) => {
  let foldedProjects = {}
  action.projects.forEach(project => foldedProjects[project.code] = true)
  return {
    ...state,
    isFetching:     false,
    projects:       action.projects,
    foldedProjects: foldedProjects
  }
}

const setFeatured = (state, action) => {
  let project
  if (state.projects.length === 0 || state.featured.dismissed) {
    project = null
  } else if (action.selected) {
    project = state.projects.find(project => project.code === action.selected)
  } else {
    project = sample(state.projects)
  }
  return {
    ...state,
    featured: {
      ...state.featured,
      project: project
    }
  }
}

const toggleFold = (state, action) => {
  const code = action.code
  const foldedProjects = state.foldedProjects
  return {
    ...state,
    foldedProjects: {
      ...foldedProjects,
      [code]: !foldedProjects[code]
    }
  }
}
