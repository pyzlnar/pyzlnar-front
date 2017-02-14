export const types = {
  startSpin: 'networkError/START_SPIN',
  stopSpin:  'networkError/STOP_SPIN'
}

export const startSpin = () => {
  return { type: types.startSpin }
}

export const stopSpin = () => {
  return { type: types.stopSpin }
}
