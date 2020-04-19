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
  Response,
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

  constructor (apiKey: string, baseUrl: string = 'https://api.themoviedb.org/3/') {
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
  async session (): Promise<string> {
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
    // Check params to see if params an object
    // and if there is only one parameter in the endpoint
    if (isString(params) && (endpoint.match(/:/g) || []).length === 1) {
      endpoint = endpoint.replace(/:[a-z]*/gi, params)
    }

    // Iterate the keys of params and replace the endpoint sections
    if (isObject(params) && !isEmpty(params)) {
      endpoint = Object.keys(params).reduce((compiled, key) => {
        return compiled.replace(`:${key}`, params[key])
      }, endpoint)
    }

    if (isString(params)) {
      endpoint += (params.startsWith('?') ? '' : '?') + params
    }

    return endpoint
  }

  /**
   * Compiles the data/query data to send with the request
   */
  private getParams (
    endpoint: string,
    params: string|RequestParams = {},
    options: RequestOptions = {}
  ): RequestParams {
    // Merge default parameters with the ones passed in
    const compiledParams: RequestParams = merge({
      api_key: this.apiKey,
      ...(this.sessionId && { session_id: this.sessionId }),
      ...(options.appendToResponse && { append_to_response: options.appendToResponse })
    }, isObject(params) ? params : {})

    // Some endpoints have an optional account_id parameter (when there's a session).
    // If it's not included, assume we want the current user's id,
    // which is setting it to '{account_id}'
    if (endpoint.includes(':id') && isEmpty(params) && this.sessionId) {
      compiledParams.id = '{account_id}'
    }

    // Get the params that were needed for the endpoint
    // to remove from the data/params of the request
    const omittedProps = (endpoint.match(/:[a-z]/gi) || [])
      .map(prop => prop.substr(1))

    // Prepare the query
    return omit(compiledParams, omittedProps)
  }

  /**
   * Performs the request to the server
   */
  private async makeRequest (
    method: HttpMethod,
    endpoint: string,
    params: string|RequestParams = {},
    options: RequestOptions = {}
  ): Promise<Response> {
    const query = this.getParams(endpoint, params, options)

    const request = {
      method,
      baseUrl: this.baseUrl,
      url: this.getEndpoint(endpoint, query),
      params: query,
      data: query,
      ...(options.timeout && { timeout: options.timeout })
    }

    const response: AxiosResponse = await axios.request(request)

    return response.data
  }
}
