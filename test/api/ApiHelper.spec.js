import 'isomorphic-fetch'
import fetchMock   from 'fetch-mock'
import { request } from '../../src/api/ApiHelper'

describe('ApiHelper', () => {
  describe('request()', () => {
    let spy, handlers

    beforeEach(() => {
      const success = sinon.stub()
      const error   = sinon.stub()
      success.returns('Success!')
      error.returns('Error!')

      handlers = { success: success, error: error }
    })

    afterEach(() => {
      fetchMock.restore()
    })

    it('accepts a string as a path', done => {
      const json = { was: 'called with a string' }
      fetchMock.get('/string', json)

      request('/string', handlers).then(result => {
        expect(handlers.success).calledWith(json)
        expect(result).to.equal('Success!')
        done()
      })
    })

    it('accepts an object as a path', done => {
      const json = { was: 'called with an object' }
      fetchMock.get('/obj', json)

      request({path: '/obj', opts: {}}, handlers).then(result => {
        expect(handlers.success).calledWith(json)
        expect(result).to.equal('Success!')
        done()
      })
    })

    it('handles incorrectly parsed json', done => {
      fetchMock.get('/badjson', 'Not a json')

      request('/badjson', handlers).then(result => {
        expect(handlers.error).called
        expect(result).to.equal('Error!')
        done()
      })
    })

    it('handles forbiddens and other fulfilled promise status', done => {
      fetchMock.get('/forbidden', { status: 403 })

      request('/forbidden', handlers).then(result => {
        expect(handlers.error).called
        expect(result).to.equal('Error!')
        done()
      })
    })

    it('handles disconnects and other rejected promise status', done => {
      fetchMock.get('/disconnect', { status: 504 })

      request('/disconnect', handlers).then(result => {
        expect(handlers.error).called
        expect(result).to.equal('Error!')
        done()
      })
    })
  })
})
