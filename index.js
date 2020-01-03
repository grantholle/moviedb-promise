'use strict'

const request = require('superagent')
const endpoints = require('./lib/endpoints')

module.exports = class {
  constructor (apiKey, useDefaultLimits = false, baseUrl = 'https://api.themoviedb.org/3/') {
    if (!apiKey) {
      throw new Error('Bad api key')
    }

    this.apiKey = apiKey
    this.baseUrl = baseUrl
    this.useDefaultLimits = useDefaultLimits

    if (this.useDefaultLimits) {
      this.limit = {
        remaining: 40,
        reset: Date.now() + 10 * 1000
      }
      this.requestQueue = []
      this.requestLimitTimeout = undefined
    }

    this.checkQueue = this.checkQueue.bind(this)

    // Create the dynamic api methods using the configuration found in lib/endpoints
    Object.keys(endpoints.methods).forEach(method => {
      const met = endpoints.methods[method]

      Object.keys(met).forEach(m => {
        this[method + m] = async (params = {}, options = {}) => {
          return this.makeRequest(met[m].method, params, met[m].resource, options)
        }
      })
    })
  }

  /**
   * Gets an api token using an api key
   *
   * @returns {Promise}
   */
  requestToken () {
    if (!this.token || Date.now() > new Date(this.token.expires_at).getTime()) {
      this.token = this.makeRequest('get', {}, endpoints.authentication.requestToken)
    }

    return this.token
  }

  /**
   * Gets the session id
   *
   * @returns {Promise}
   */
  async session () {
    const token = await this.requestToken()

    const res = await this.makeRequest('get', { request_token: token.request_token }, endpoints.authentication.session)

    this.sessionId = res.session_id
    return this.sessionId
  }

  async checkQueue () {
    if (!this.requestQueue.length) {
      return
    }

    clearTimeout(this.requestLimitTimeout)

    let delay = this.limit.reset - Date.now()

    if (delay > 0) {
      this.requestLimitTimeout = setTimeout(this.checkQueue, delay)
    } else {
      this.limit.remaining = 40
    }

    if (this.limit.remaining > 0) {
      for (let i = 0; i < this.limit.remaining; i++) {
        let sendRequest = this.requestQueue.shift()

        if (sendRequest) {
          sendRequest.start(sendRequest.resolve, sendRequest.reject)
        }
      }

      setTimeout(this.checkQueue)
    }
  }

  /**
   * Makes the request to the api using the configuration from lib/endpoints
   *
   * @param {String} type The http verb
   * @param {Object} params The parameters to pass to the api
   * @param {String} endpoint The api endpoint relative to the base url
   * @param {String|Object} options If a string, then assumed to be append_to_response. If Object, then options object
   * @param {String} options.append_to_response additional argument for the TMDB api's append_to_response query parameter
   * @param {timeout} options.timeout superagent timeout object for request
   * @returns {Promise}
   */
  async makeRequest (type, params, endpoint, options) {
    const createAndStartRequest = (resolve, reject) => {
      if (this.useDefaultLimits) {
        if (this.limit.remaining <= 0) {
          this.requestQueue.push({
            start: createAndStartRequest,
            resolve,
            reject
          })

          return this.checkQueue()
        }

        this.limit.remaining--
      }

      // Interpret options
      const { append_to_response: appendToResponse, timeout } = (typeof options === 'string' || options instanceof String) ? { append_to_response: options } : options || ''

      // Some endpoints have an optional account_id parameter (when there's a session).
      // If it's not included, assume we want the current user's id,
      // which is setting it to '{account_id}'
      if (endpoint.indexOf(':id') !== -1 && params === {} && this.sessionId) {
        params.id = '{account_id}'
      }

      // Check params to see if params an object
      // and if there is only one parameter in the endpoint
      if (typeof params !== 'object' && endpoint.split(':').length === 2) {
        const parts = endpoint.split(':')
        const index = parts[1].indexOf('/')

        endpoint = parts[0] + params + (index === -1 ? '' : parts[1].substr(index))
      }

      // Iterate the keys of params and replace the endpoint sections
      if (typeof params === 'object' && params !== null && params !== undefined) {
        Object.keys(params).forEach(key => {
          endpoint = endpoint.replace(`:${key}`, params[key])
        })
      }

      type = type.toUpperCase()
      let req = request(type, this.baseUrl + endpoint)

      if (this.apiKey) {
        req.query({ api_key: this.apiKey })
      }

      if (this.sessionId) {
        req.query({ session_id: this.sessionId })
      }

      if (appendToResponse) {
        req.query({ append_to_response: appendToResponse })
      }

      if (timeout) {
        req.timeout(timeout)
      }

      req[type === 'GET' ? 'query' : 'send'](params)

      req.end((err, res) => {
        if (err) {
          if (this.useDefaultLimits && err.status == 429) {
            // if we exceed the request limit, we won't receive x-ratelimit-reset anymore
            // this is only a fallback and should never happen
            if (!this.limit.reset || this.limit.reset < Date.now()) {
              let retryAfter = parseInt(res.header['retry-after'])
              this.limit.reset = Date.now() + (retryAfter <= 0 ? 0.5 : retryAfter) * 1000
            }

            this.requestQueue.push({
              start: createAndStartRequest,
              resolve,
              reject
            })

            return this.checkQueue()
          }

          return reject(err)
        }

        if (this.useDefaultLimits) {
          this.limit.remaining = parseInt(res.header['x-ratelimit-remaining'])
          this.limit.reset = parseInt(res.header['x-ratelimit-reset']) * 1000
        }

        resolve(res.body, res)
      })
    }

    return new Promise(createAndStartRequest)
  }
}
