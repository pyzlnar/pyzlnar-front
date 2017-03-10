import { types } from '../action-creators/networkError'

const initialState = {
  spin: false
}

export default (state = initialState, action = {}) => {
  switch(action.type) {
    case types.startSpin:
      return { spin: true }
    case types.stopSpin:
      return { spin: false }
    default:
      return state
  }
}
