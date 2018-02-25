// Generic request helper for API
import deepMerge from 'deepmerge'
import serialize from 'serialize-javascript'

export const request = (path, opts = {}) => {
  opts = deepMerge(defaultOptions(opts), opts)
  if (opts.body) {
    // Disabled for now, will come back on a later version
    // deepEscapeHtml(opts.body)
    opts.body = serialize(opts.body)
  }

  return new Promise((resolve, reject) => {
    fetch(path, opts)
      .then(response => {
        if (200 <= response.status && response.status < 300) {
          return response.json()
            .then(json => resolve({ response, status: response.status, json }))
            .catch(()  => resolve({ response, status: response.status, json: {} }))
        } else {
          return response.json()
            .then(json => reject({ response, status: response.status, json }))
            .catch(()  => reject({ response, status: response.status, json: {} }))
        }
      })
  })
}

export const formatError = result => {
  switch(result.status) {
    case 401:
      return { _error: 'Your session has expired!' }
    case 403:
      return { _error: `You're not authorized to complete this request!` }
    case 422:
      return result.json
    default:
      return { _error: 'There was an issue!' }
  }
}

// Helpers

export const defaultOptions = opts => {
  let headers = { 'content-type': 'application/json' }
  if (['POST', 'PUT', 'PATCH', 'DELETE'].includes(opts.method)) {
    headers['x-csrf-token'] = localStorage.getItem('token')
  }
  return { credentials: 'same-origin', headers }
}

const deepEscapeHtml = obj => {
  if (typeof obj === 'object'
    && obj !== null
    && obj.toString() === '[object Object]') {
    if (!Array.isArray(obj)) {
      Object.keys(obj).forEach(key => {
        // This parameters need to go unsanitized, this check is bad as hell
        // but does the work for now
        if (key === 'url') { return }

        const param = obj[key]
        if (typeof param === 'object') {
          deepEscapeHtml(param)
        } else {
          obj[key] = escapeHtml(param)
        }
      })
    }
  }
}

// http://stackoverflow.com/questions/24816/escaping-html-strings-with-jquery
const escapeHtml = string => {
  const entityMap = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    '\'': '&#39;',
    '/': '&#x2F;',
    '`': '&#x60;',
    '=': '&#x3D;'
  }
  return String(string).replace(/[&<>"'`=/]/g, s => entityMap[s])
}
