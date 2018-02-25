import 'isomorphic-fetch'
import deepMerge from 'deepmerge'
import fetchMock from 'fetch-mock'
import {
  defaultOptions,
  formatError,
  request
} from '../../src/api/ApiHelper'

describe('ApiHelper', () => {
  describe('request()', () => {
    let path

    beforeEach(() => {
      path = '/path'
    })

    afterEach(() => {
      fetchMock.restore()
    })

    it('accepts just the path', done => {
      const json = { taco: 'badger' }
      const body = JSON.stringify(json)
      const resp = new Response(body)

      fetchMock.get(path, resp)

      request(path).then(result => {
        expect(result.response).to.equal(resp)
        expect(result.json).to.deep.equal(json)
        done()
      })
    })

    it('accepts path with options', done => {
      const json = { response: 'body' }
      const body = JSON.stringify(json)
      const resp = new Response(body)

      const opts = {
        method: 'POST',
        body: { something: 'irrelevant' }
      }

      fetchMock.post(path, resp)

      request(path, opts).then(result => {
        expect(result.response).to.equal(resp)
        expect(result.json).to.deep.equal(json)
        done()
      })
    })

    it('handles bad json', done => {
      const json = '{'
      const resp = new Response(json)

      fetchMock.get(path, resp)

      request(path).then(result => {
        expect(result.response).to.equal(resp)
        expect(result.json).to.deep.equal({})
        done()
      })
    })

    it('handles non success response status', done => {
      const json = { response: 'body' }
      const body = JSON.stringify(json)
      const resp = new Response(body, { status: 403 })

      fetchMock.get(path, resp)

      request(path).catch(result => {
        expect(result.response).to.equal(resp)
        expect(result.json).to.deep.equal(json)
        done()
      })
    })

    it('handles non success response status with bad json', done => {
      const json = '{'
      const resp = new Response(json, { status: 500 })

      fetchMock.get(path, resp)

      request(path).catch(result => {
        expect(result.response).to.equal(resp)
        expect(result.json).to.deep.equal({})
        done()
      })
    })
  })

  describe('formatError(result)', () => {
    it('returns the proper error with status 401', () => {
      const result   = { status: 401 }
      const expected = { _error: 'Your session has expired!' }

      expect(formatError(result)).to.deep.equal(expected)
    })

    it('returns the proper error with status 403', () => {
      const result   = { status: 403 }
      const expected = { _error: `You're not authorized to complete this request!` }

      expect(formatError(result)).to.deep.equal(expected)
    })

    it('returns the proper error with status 422', () => {
      const result   = { status: 422, json: { errors: 'several' } }
      const expected = { errors: 'several' }

      expect(formatError(result)).to.deep.equal(expected)
    })

    it('returns the proper error with status 500', () => {
      const result   = { status: 500 }
      const expected = { _error: 'There was an issue!' }

      expect(formatError(result)).to.deep.equal(expected)
    })
  })

  describe('defaultOptions(options)', () => {
    it('returns the expected default options when GET method', () => {
      const expected = {
        credentials: 'same-origin',
        headers: { 'content-type': 'application/json' }
      }

      const result = defaultOptions({ method: 'GET' })
      expect(result).to.deep.equal(expected)
    })

    it('returns the expected default options when POST method', () => {
      localStorage.setItem('token', 'csrftoken')
      const expected = {
        credentials: 'same-origin',
        headers: {
          'content-type': 'application/json',
          'x-csrf-token': 'csrftoken'
        }
      }

      const result = defaultOptions({ method: 'POST' })
      expect(result).to.deep.equal(expected)
    })
  })
})
