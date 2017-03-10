// Generic request helper for API

export const request = (request, handlers) => {
  if (typeof(request) === 'object') {
    var { path, opts } = request
  } else {
    var path = request
    var opts = {}
  }

  return fetch(path, opts)
    .then(response => {
      if (response.status === 200) {
        return response.json()
          .then(json => handlers.success(json))
          .catch(err => handlers.error(err))
      } else {
        return handlers.error(response)
      }
    })
}
