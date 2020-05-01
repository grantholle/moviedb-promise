import axios, { AxiosResponse } from 'axios'
import {
  isEmpty,
  isObject,
  isString,
  merge,
  omit
} from 'lodash'
import {
  HttpMethod,
  AuthenticationToken,
  RequestOptions,
  RequestParams,
  SessionRequestParams,
  SessionResponse,
} from './types'

export class MovieDb {
  private apiKey: string
  private token: AuthenticationToken
  public baseUrl: string
  public sessionId: string

  constructor (
    apiKey: string,
    baseUrl: string = 'https://api.themoviedb.org/3/'
  ) {
    this.apiKey = apiKey
    this.baseUrl = baseUrl
  }

  /**
   * Gets an api token using an api key
   *
   * @returns {Promise}
   */
  async requestToken (): Promise<AuthenticationToken> {
    if (!this.token || Date.now() > new Date(this.token.expires_at).getTime()) {
      this.token = await this.makeRequest(HttpMethod.Get, 'authentication/token/new')
    }

    return this.token
  }

  /**
   * Gets the session id
   */
  async retrieveSession (): Promise<string> {
    const token = await this.requestToken()
    const request: SessionRequestParams = {
      request_token: token.request_token
    }

    const res: SessionResponse = await this.makeRequest(
      HttpMethod.Get, 'authentication/session/new', request
    )

    this.sessionId = res.session_id

    return this.sessionId
  }

  /**
   * Compiles the endpoint based on the params
   */
  private getEndpoint (endpoint: string, params: RequestParams = {}): string {
    return Object.keys(params).reduce((compiled, key) => {
      return compiled.replace(`:${key}`, params[key])
    }, endpoint)
  }

  /**
   * Normalizes a request into a RequestParams object
   */
  private normalizeParams (
    endpoint: string,
    params: string|number|RequestParams = {}
  ): RequestParams {
    if (isObject(params)) {
      return params
    }

    const matches = endpoint.match(/:[a-z]*/g) || []

    if (matches.length === 1) {
      return matches.reduce((obj, match) => {
        obj[match.substr(1)] = params

        return obj
      }, {})
    }

    return {}
  }

  /**
   * Normalizes request options
   */
  private normalizeOptions (options: string|RequestOptions = {}): RequestOptions {
    if (isString(options)) {
      return { appendToResponse: options }
    }

    return options
  }

  /**
   * Compiles the data/query data to send with the request
   */
  private getParams (
    endpoint: string,
    params: RequestParams = {},
    options: RequestOptions = {}
  ): RequestParams {
    // Merge default parameters with the ones passed in
    const compiledParams: RequestParams = merge({
      api_key: this.apiKey,
      ...(this.sessionId && { session_id: this.sessionId }),
      ...(options.appendToResponse && { append_to_response: options.appendToResponse })
    }, params)

    // Some endpoints have an optional account_id parameter (when there's a session).
    // If it's not included, assume we want the current user's id,
    // which is setting it to '{account_id}'
    if (endpoint.includes(':id') && !compiledParams.id && this.sessionId) {
      compiledParams.id = '{account_id}'
    }

    return compiledParams
  }

  /**
   * Performs the request to the server
   */
  private async makeRequest (
    method: HttpMethod,
    endpoint: string,
    params: string|number|RequestParams = {},
    options: string|RequestOptions = {}
  ): Promise<any> {
    const normalizedParams: RequestParams = this.normalizeParams(endpoint, params)
    const normalizedOptions: RequestOptions = this.normalizeOptions(options)

    // Get the full query/data object
    const fullQuery: RequestParams = this.getParams(endpoint, normalizedParams, normalizedOptions)

    // Get the params that are needed for the endpoint
    // to remove from the data/params of the request
    const omittedProps = (endpoint.match(/:[a-z]*/gi) || [])
      .map(prop => prop.substr(1))

    // Prepare the query
    const query = omit(fullQuery, omittedProps)

    const request = {
      method,
      url: this.baseUrl + this.getEndpoint(endpoint, fullQuery),
      ...(method === HttpMethod.Get && { params: query }),
      ...(method !== HttpMethod.Get && { data: query }),
      ...(normalizedOptions.timeout && { timeout: normalizedOptions.timeout })
    }

    const response: AxiosResponse = await axios.request(request)

    return response.data
  }
}
