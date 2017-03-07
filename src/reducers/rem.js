import sample from 'lodash.sample'
import { types } from '../action-creators/rem'

const getInitialState = () => {
  const images = [
    'heartpillow.jpg',
    'jacket.jpg',
    'remaids.jpg',
    'remball.jpg',
    'remday.png',
    'remegane.jpg',
    'remegane2.jpg',
    'remegane3.png',
    'remhappy.jpg',
    'rezero.jpg',
    'theworld.jpg'
  ]
  const image = sample(images)
  const index = images.indexOf(image)
  return { images, current: { image, index } }
}

export default (state = getInitialState(), action = {}) => {
  switch(action.type) {
    case types.prevImage:
      return getPrevImage(state)
    case types.nextImage:
      return getNextImage(state)
    default:
      return state
  }
}

const getPrevImage = state => {
  const length = state.images.length
  const index = (state.current.index + length - 1) % length
  const image = state.images[index]
  return { ...state, current: { image, index } }
}

const getNextImage = state => {
  const index = (state.current.index + 1) % state.images.length
  const image = state.images[index]
  return { ...state, current: { image, index } }
}
