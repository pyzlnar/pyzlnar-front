// Generic request helper for API
import deepMerge from 'deepmerge'
import serialize from 'serialize-javascript'

export const request = (path, opts = {}) => {
  opts = deepMerge(defaultOptions(), opts)
  if (opts.body) {
    deepEscapeHtml(opts.body)
    opts.body = serialize(opts.body)
  }

  return new Promise((resolve, reject) => {
    fetch(path, opts)
      .then(response => {
        if (200 <= response.status && response.status < 300) {
          return response.json()
            .then(json => resolve({ response, json }))
            .catch(()  => resolve({ response, json: {} }))
        } else {
          return response.json()
            .then(json => reject({ response, json }))
            .catch(()  => reject({ response, json: {} }))
        }
      })
  })
}

// Helpers

export const defaultOptions = () => {
  return {
    credentials: 'same-origin',
    headers: { 'Content-Type': 'application/json' }
  }
}

const deepEscapeHtml = obj => {
  if (typeof obj === 'object'
    && obj !== null
    && obj.toString() === '[object Object]') {
    if (!Array.isArray(obj)) {
      Object.keys(obj).forEach(key => {
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
