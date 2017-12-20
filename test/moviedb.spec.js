'use strict'

/* global describe it */
const assert = require('chai').assert
const apiKey = process.env.MOVIEDB_API_KEY || process.env.npm_config_key
const MovieDb = require('../index.js')

// Include --sesion='{your session id}' to test the watchlist
const sessionId = process.env.MOVIEDB_SESSION_ID || process.env.npm_config_session

const haveValidGenericResponse = res => {
  res.should.be.an('object')
  res.should.have.property('results')
  res.results.should.be.an('array')
}

require('chai').should()
require('colors')

/**
 * Checks for missing API key.
 *
 * The proper way to run the test:
 * npm test --key='{your api key}'
 */
if (!apiKey || apiKey.length === 0) {
  console.log('You have not provided the API key'.red)
  console.log('\tRunning tests:'.cyan)
  console.log('\tnpm test --key="{your api key}"'.cyan)
  throw new Error('Missing API key, please `run npm test --key="{your api key}"`')
}

const api = new MovieDb(apiKey)

describe('moviedb', function () {
  this.timeout(30000)

  // basic movie search
  it('should search for Zoolander', async () => {
    const res = await api.searchMovie({ query: 'Zoolander' })
    haveValidGenericResponse(res)
  })

  it('should get the tv shows airing today', async () => {
    const res = await api.tvAiringToday()
    haveValidGenericResponse(res)
  })

  it('should get the tv shows OnTheAir', async () => {
    const res = await api.tvOnTheAir()
    haveValidGenericResponse(res)
  })

  it('should get the movie release dates', async () => {
    const res = await api.movieReleaseDates({ id: 209112 })
    haveValidGenericResponse(res)
    assert.equal(res.id, 209112)
  })

  it(`should accept a non-object parameter if there's only one endpoint placeholder`, async () => {
    const res = await api.tvInfo(61888)
    res.should.be.an('object')
    res.should.have.property('name')
  })

  if (sessionId) {
    it(`should fetch the user's watchlist without including the account id in the call`, async () => {
      api.sessionId = sessionId

      const res = await api.accountMovieWatchlist()
      haveValidGenericResponse(res)
    })
  }

  it('should not get a rate limit error when a lot of requests are made within 10 seconds', done => {
    const requests = 50
    let finishedRequests = 0
    let i = 0

    // Requests need to be fired asynchronously
    while (i < requests) {
      api.discoverMovie().then(res => {
        console.log(res.total_results)

        if (++finishedRequests === requests) {
          done()
        }
      }).catch(done)

      i++
    }
  })

  it('should get a rate limit error with useDefaultLimits = false', async () => {
    const requests = 50

    const customApi = new MovieDb(apiKey, false)

    try {
      let promises = new Array(requests).fill(0).map(customApi.discoverMovie)
      await Promise.all(promises)
    } catch (error) {
      return
    }
    throw new Error('Should have thrown error')
  })
})
