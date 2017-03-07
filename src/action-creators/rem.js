// Action Creators for Rem

export const types = {
  prevImage: 'rem/PREV_IMAGE',
  nextImage: 'rem/NEXT_IMAGE'
}

export const prevImage = () => {
  return { type: types.prevImage }
}

export const nextImage = () => {
  return { type: types.nextImage }
}
