// Action Creators for Rem
import sample from 'lodash.sample'

export const getInitialState = () => {
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

export const prevImage = state => {
  const length = state.images.length
  const index = (state.current.index + length - 1) % length
  const image = state.images[index]
  return { current: { image, index } }
}

export const nextImage = state => {
  const index = (state.current.index + 1) % state.images.length
  const image = state.images[index]
  return { current: { image, index } }
}
