import { types } from '../action-creators/sitesList'

const initialState = {
  display: 'grid',
  foldedSites: {}
}

export default (state = initialState, action = {}) => {
  switch(action.type) {
    case types.setInitialState:
      return setInitialState(state, action)
    case types.selectorClicked:
      return {...state, display: action.selector }
    case types.foldClick:
      return toggleFold(state, action)
    default:
      return state
  }
}

const setInitialState = (state,  action) => {
  let foldedSites = {}
  action.sites.map(site => {
    foldedSites[site.code] = site.code !== action.selected
  })
  return {
    ...state,
    display:     action.display,
    foldedSites: foldedSites
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
