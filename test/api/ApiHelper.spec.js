import 'isomorphic-fetch'
import fetchMock   from 'fetch-mock'
import { request } from '../../src/api/ApiHelper'

describe('ApiHelper', () => {
  describe('request()', () => {
    let spy, handlers

    beforeEach(() => {
      handlers = {
        success: sinon.spy(),
        error:   sinon.spy()
      }
    })

    afterEach(() => {
      fetchMock.restore()
    })

    it('accepts a string as a path', done => {
      const json = { was: 'called with a string' }
      fetchMock.get('/string', json)

      request('/string', handlers).then((action) => {
        expect(handlers.success).calledWith(json)
        done()
      })
    })

    it('accepts an object as a path', done => {
      const json = { was: 'called with an object' }
      fetchMock.get('/obj', json)

      request({path: '/obj', opts: {}}, handlers).then(() => {
        expect(handlers.success).calledWith(json)
        done()
      })
    })

    it('handles incorrectly parsed json', done => {
      fetchMock.get('/badjson', 'Not a json')

      request('/badjson', handlers).then(() => {
        expect(handlers.error).called
        done()
      })
    })

    it('handles forbiddens and other fulfilled promise status', done => {
      fetchMock.get('/forbidden', { status: 404 })

      request('/forbidden', handlers).then(() => {
        expect(handlers.error).called
        done()
      })
    })

    it('handles disconnects and other rejected promise status', done => {
      fetchMock.get('/disconnect', { status: 504 })

      request('/disconnect', handlers).then(() => {
        expect(handlers.error).called
        done()
      })
    })
  })
})
