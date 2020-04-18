import axios from 'axios'
import isEmpty from 'lodash/isEmpty'
import {
  MovieDbOptions,
  LimitOptions,
  HttpMethod,
  Response,
  AuthenticationToken,
  RequestOptions,
  RequestParams,
} from './types'
import './endpoints'

export default class MovieDb {
  private apiKey: string
  private token: AuthenticationToken
  private limit: LimitOptions
  private requestQueue: Array<any>
  private requestLimitTimeout
  public options: MovieDbOptions
  public sessionId: string

  constructor (apiKey: string, options: MovieDbOptions = { useDefaultLimits: false, baseUrl: 'https://api.themoviedb.org/3/' }) {
    this.apiKey = apiKey
    this.options = options

    if (this.options.useDefaultLimits) {
      this.limit = {
        remaining: 40,
        reset: Date.now() + 10 * 1000
      }
      this.requestQueue = []
      this.requestLimitTimeout = undefined
    }

    this.checkQueue = this.checkQueue.bind(this)
  }

  /**
   * Gets an api token using an api key
   *
   * @returns {Promise}
   */
  async requestToken (): Promise<AuthenticationToken> {
    if (!this.token || Date.now() > new Date(this.token.expires_at).getTime()) {

      this.token = await this.makeRequest(HttpMethod.Get, {}, 'authentication/token/new')
    }

    return this.token
  }

  /**
   * Gets the session id
   *
   * @returns {Promise}
   */
  async session (): Promise<string> {
    // const token = await this.requestToken()

    // const res = await this.makeRequest(HttpMethod.Get, { request_token: token.request_token }, endpoints.authentication.session)

    // this.sessionId = res.session_id
    return this.sessionId
  }

  async checkQueue () {
    // if (!this.requestQueue.length) {
    //   return
    // }

    // clearTimeout(this.requestLimitTimeout)

    // let delay = this.limit.reset - Date.now()

    // if (delay > 0) {
    //   this.requestLimitTimeout = setTimeout(this.checkQueue, delay)
    // } else {
    //   this.limit.remaining = 40
    // }

    // if (this.limit.remaining > 0) {
    //   for (let i = 0; i < this.limit.remaining; i++) {
    //     let sendRequest = this.requestQueue.shift()

    //     if (sendRequest) {
    //       sendRequest.start(sendRequest.resolve, sendRequest.reject)
    //     }
    //   }

    //   setTimeout(this.checkQueue)
    // }
    return this.makeRequest
  }

  /**
   * Makes the request to the api using the configuration from lib/endpoints
   *
   * @param {String} type The http verb
   * @param {String} endpoint The api endpoint relative to the base url
   * @param {Object} params The parameters to pass to the api
   * @param {String|Object} options If a string, then assumed to be append_to_response. If Object, then options object
   * @param {String} options.append_to_response additional argument for the TMDB api's append_to_response query parameter
   * @param {timeout} options.timeout superagent timeout object for request
   */
  async makeRequest (
    method: HttpMethod,
    endpoint: string,
    params: RequestParams = {},
    options: RequestOptions = {}
  ): Promise<AuthenticationToken|Response> {
    if (this.options.useDefaultLimits) {
      if (this.limit.remaining <= 0) {
        // this.requestQueue.push({
        //   start: createAndStartRequest,
        //   resolve,
        //   reject
        // })

        return this.checkQueue()
      }

      this.limit.remaining--
    }

    // Some endpoints have an optional account_id parameter (when there's a session).
    // If it's not included, assume we want the current user's id,
    // which is setting it to '{account_id}'
    if (endpoint.includes(':id') && isEmpty(params) && this.sessionId) {
      params.id = '{account_id}'
    }

    // @TODO this needs to be in the functions that are created on the fly
    // Check params to see if params an object
    // and if there is only one parameter in the endpoint
    // if (typeof params !== 'object' && endpoint.split(':').length === 2) {
    //   const parts = endpoint.split(':')
    //   const index = parts[1].indexOf('/')

    //   endpoint = parts[0] + params + (index === -1 ? '' : parts[1].substr(index))
    // }

  //     // Iterate the keys of params and replace the endpoint sections
  //     if (typeof params === 'object' && params !== null && params !== undefined) {
  //       Object.keys(params).forEach(key => {
  //         endpoint = endpoint.replace(`:${key}`, params[key])
  //       })
  //     }

  //     type = type.toUpperCase()
  //     let req = request(type, this.baseUrl + endpoint)

  //     if (this.apiKey) {
  //       req.query({ api_key: this.apiKey })
  //     }

  //     if (this.sessionId) {
  //       req.query({ session_id: this.sessionId })
  //     }

  //     if (appendToResponse) {
  //       req.query({ append_to_response: appendToResponse })
  //     }

  //     if (timeout) {
  //       req.timeout(timeout)
  //     }

  //     req[type === 'GET' ? 'query' : 'send'](params)

  //     req.end((err, res) => {
  //       if (err) {
  //         if (this.useDefaultLimits && err.status == 429) {
  //           // if we exceed the request limit, we won't receive x-ratelimit-reset anymore
  //           // this is only a fallback and should never happen
  //           if (!this.limit.reset || this.limit.reset < Date.now()) {
  //             let retryAfter = parseInt(res.header['retry-after'])
  //             this.limit.reset = Date.now() + (retryAfter <= 0 ? 0.5 : retryAfter) * 1000
  //           }

  //           this.requestQueue.push({
  //             start: createAndStartRequest,
  //             resolve,
  //             reject
  //           })

  //           return this.checkQueue()
  //         }

  //         return reject(err)
  //       }

  //       if (this.useDefaultLimits) {
  //         this.limit.remaining = parseInt(res.header['x-ratelimit-remaining'])
  //         this.limit.reset = parseInt(res.header['x-ratelimit-reset']) * 1000
  //       }

  //       resolve(res.body, res)
  //     })
  }
}
