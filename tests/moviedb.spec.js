'use strict'

/* global describe it */
require('dotenv').config()
const assert = require('chai').assert
const apiKey = process.env.MOVIEDB_API_KEY || process.env.npm_config_key
const { MovieDb } = require('../dist')

// Include --sesion='{your session id}' to test the watchlist
// or `MOVIEDB_SESSION_ID` in a .env
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
  throw new Error('Missing API key, please run `npm test --key="{your api key}"`')
}


describe('moviedb-promise', function () {
  this.timeout(1200000)
  let api = new MovieDb(apiKey)

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

  it(`should get tv, season 1, season 1 episodes and credit details for Stargate SG-1`, async () => {
    const res = await api.tvInfo({ id: 4629, append_to_response: 'season/1,season/1/credits' })
    res.should.be.an('object')
    res.should.have.property('name')
    res.should.have.property('season/1')
    res.should.have.property('season/1/credits')
  })

  it(`specify all options with a short response (1ms) to force timeout`, async () => {
    try {
      await api.tvInfo({ id: 4629, appendToResponse: 'season/1,season/1/credits' }, { timeout: 1 })
    } catch (error) {
      if (error.message.includes('timeout of 1ms exceeded')) {
        return
      }
    }
    throw new Error('Should have thrown timeout error')
  })

  it(`specify only timeout option`, async () => {
    try {
      await api.tvInfo(4629, { timeout: 1 })
    } catch (error) {
      if (error.message.includes('timeout of 1ms exceeded')) {
        return
      }
    }

    throw new Error('Should have thrown timeout error')
  })

  if (sessionId) {
    it(`should fetch the user's watchlist without including the account id in the call`, async () => {
      api.sessionId = sessionId

      const res = await api.accountMovieWatchlist()
      haveValidGenericResponse(res)
    })
  }

  it(`should not receive an ECONNRESET error from axios`, () => {
    const promises = []

    for (let i = 0; i < 30; i++) {
      promises.push(api.trending({
        media_type: 'all',
        time_window: 'week',
      }))
    }

    return Promise.all(promises)
  })

  it(`should allow strings to perform search requests`, async () => {
    const res = await api.searchMovie('Zoolander')
    haveValidGenericResponse(res)
  })
})
