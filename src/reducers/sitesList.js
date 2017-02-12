import { types } from '../action-creators/sitesList'

const initialState = {
  display: 'grid'
}

export default (state = initialState, action = {}) => {
  switch(action.type) {
    case types.selectorClicked:
      return {...state, display: action.selector }
    default:
      return state
  }
}
