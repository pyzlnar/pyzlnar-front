import 'isomorphic-fetch'
import deepMerge from 'deepmerge'
import fetchMock from 'fetch-mock'
import {
  defaultOptions,
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

  describe('defaultOptions()', () => {
    it('returns the expected deafault options', () => {
      const expected = {
        credentials: 'same-origin',
        headers: { 'Content-Type': 'application/json' }
      }

      const result = defaultOptions()
      expect(result).to.deep.equal(expected)
    })
  })
})
