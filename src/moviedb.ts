import axios, { AxiosRequestConfig } from 'axios'
import {
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
  QueueItem,
} from './types'
import * as types from './request-types'

export class MovieDb {
  private apiKey: string
  private token: AuthenticationToken
  private requests: Array<QueueItem> = []
  private requesting: boolean = false
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
   * Processes the next request in the request queue
   */
  private dequeue (): void {
    if (this.requesting) {
      return
    }

    const request = this.requests.shift()

    if (!request) {
      return
    }

    this.requesting = true

    request.promiseGenerator()
      .then(request.resolve)
      .catch(request.reject)
      .finally(() => {
        this.requesting = false
        this.dequeue()
      })
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
  private makeRequest (
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

    const request: AxiosRequestConfig = {
      method,
      url: this.baseUrl + this.getEndpoint(endpoint, fullQuery),
      ...(method === HttpMethod.Get && { params: query }),
      ...(method !== HttpMethod.Get && { data: query }),
      ...(normalizedOptions.timeout && { timeout: normalizedOptions.timeout })
    }

    // Push the request to the queue
    return new Promise((resolve, reject) => {
      this.requests.push({
        promiseGenerator: () => axios.request(request).then(res => res.data),
        resolve,
        reject
      })

      this.dequeue()
    })
  }

  configuration (params?: string|number|RequestParams, options?: string|RequestOptions): Promise<any> {
    return this.makeRequest(HttpMethod.Get, 'configuration', params, options)
  }

  find (params?: string|number|RequestParams, options?: string|RequestOptions): Promise<any> {
    return this.makeRequest(HttpMethod.Get, 'find/:id', params, options)
  }

  searchMovie (params?: string|number|RequestParams, options?: string|RequestOptions): Promise<any> {
    return this.makeRequest(HttpMethod.Get, 'search/movie', params, options)
  }

  searchTv (params?: string|number|RequestParams, options?: string|RequestOptions): Promise<any> {
    return this.makeRequest(HttpMethod.Get, 'search/tv', params, options)
  }

  searchMulti (params?: string|number|RequestParams, options?: string|RequestOptions): Promise<any> {
    return this.makeRequest(HttpMethod.Get, 'search/multi', params, options)
  }

  searchCollection (params?: string|number|RequestParams, options?: string|RequestOptions): Promise<any> {
    return this.makeRequest(HttpMethod.Get, 'search/collection', params, options)
  }

  searchPerson (params?: string|number|RequestParams, options?: string|RequestOptions): Promise<any> {
    return this.makeRequest(HttpMethod.Get, 'search/person', params, options)
  }

  searchList (params?: string|number|RequestParams, options?: string|RequestOptions): Promise<any> {
    return this.makeRequest(HttpMethod.Get, 'search/list', params, options)
  }

  searchCompany (params?: string|number|RequestParams, options?: string|RequestOptions): Promise<any> {
    return this.makeRequest(HttpMethod.Get, 'search/company', params, options)
  }

  searchKeyword (params?: string|number|RequestParams, options?: string|RequestOptions): Promise<any> {
    return this.makeRequest(HttpMethod.Get, 'search/keyword', params, options)
  }

  collectionInfo (params?: string|number|RequestParams, options?: string|RequestOptions): Promise<any> {
    return this.makeRequest(HttpMethod.Get, 'collection/:id', params, options)
  }

  collectionImages (params?: string|number|RequestParams, options?: string|RequestOptions): Promise<any> {
    return this.makeRequest(HttpMethod.Get, 'collection/:id/images', params, options)
  }

  collectionTranslations (params?: string|number|RequestParams, options?: string|RequestOptions): Promise<any> {
    return this.makeRequest(HttpMethod.Get, 'collection/:id/translations', params, options)
  }

  discoverMovie (params?: string|number|RequestParams, options?: string|RequestOptions): Promise<any> {
    return this.makeRequest(HttpMethod.Get, 'discover/movie', params, options)
  }

  discoverTv (params?: string|number|RequestParams, options?: string|RequestOptions): Promise<any> {
    return this.makeRequest(HttpMethod.Get, 'discover/tv', params, options)
  }

  trending (params?: string|number|RequestParams, options?: string|RequestOptions): Promise<any> {
    return this.makeRequest(HttpMethod.Get, 'trending/:media_type/:time_window', params, options)
  }

  movieInfo (params?: string|number|RequestParams, options?: string|RequestOptions): Promise<any> {
    return this.makeRequest(HttpMethod.Get, 'movie/:id', params, options)
  }

  movieAlternativeTitles (params?: string|number|RequestParams, options?: string|RequestOptions): Promise<any> {
    return this.makeRequest(HttpMethod.Get, 'movie/:id/alternative_titles', params, options)
  }

  movieCredits (params?: string|number|RequestParams, options?: string|RequestOptions): Promise<any> {
    return this.makeRequest(HttpMethod.Get, 'movie/:id/credits', params, options)
  }

  movieExternalIds (params?: string|number|RequestParams, options?: string|RequestOptions): Promise<any> {
    return this.makeRequest(HttpMethod.Get, '/movie/:id/external_ids', params, options)
  }

  movieImages (params?: string|number|RequestParams, options?: string|RequestOptions): Promise<any> {
    return this.makeRequest(HttpMethod.Get, 'movie/:id/images', params, options)
  }

  movieVideos (params?: string|number|RequestParams, options?: string|RequestOptions): Promise<any> {
    return this.makeRequest(HttpMethod.Get, 'movie/:id/videos', params, options)
  }

  movieKeywords (params?: string|number|RequestParams, options?: string|RequestOptions): Promise<any> {
    return this.makeRequest(HttpMethod.Get, 'movie/:id/keywords', params, options)
  }

  movieRecommendations (params?: string|number|RequestParams, options?: string|RequestOptions): Promise<any> {
    return this.makeRequest(HttpMethod.Get, 'movie/:id/recommendations', params, options)
  }

  movieReleases (params?: string|number|RequestParams, options?: string|RequestOptions): Promise<any> {
    return this.makeRequest(HttpMethod.Get, 'movie/:id/releases', params, options)
  }

  movieReleaseDates (params?: string|number|RequestParams, options?: string|RequestOptions): Promise<any> {
    return this.makeRequest(HttpMethod.Get, 'movie/:id/release_dates', params, options)
  }

  movieTrailers (params?: string|number|RequestParams, options?: string|RequestOptions): Promise<any> {
    return this.makeRequest(HttpMethod.Get, 'movie/:id/trailers', params, options)
  }

  movieTranslations (params?: string|number|RequestParams, options?: string|RequestOptions): Promise<any> {
    return this.makeRequest(HttpMethod.Get, 'movie/:id/translations', params, options)
  }

  movieSimilar (params?: string|number|RequestParams, options?: string|RequestOptions): Promise<any> {
    return this.makeRequest(HttpMethod.Get, 'movie/:id/similar', params, options)
  }

  movieReviews (params?: string|number|RequestParams, options?: string|RequestOptions): Promise<any> {
    return this.makeRequest(HttpMethod.Get, 'movie/:id/reviews', params, options)
  }

  movieLists (params?: string|number|RequestParams, options?: string|RequestOptions): Promise<any> {
    return this.makeRequest(HttpMethod.Get, 'movie/:id/lists', params, options)
  }

  movieChanges (params?: string|number|RequestParams, options?: string|RequestOptions): Promise<any> {
    return this.makeRequest(HttpMethod.Get, 'movie/:id/changes', params, options)
  }

  movieRatingUpdate (params?: string|number|RequestParams, options?: string|RequestOptions): Promise<any> {
    return this.makeRequest(HttpMethod.Post, 'movie/:id/rating', params, options)
  }

  tvInfo (params?: string|number|RequestParams, options?: string|RequestOptions): Promise<any> {
    return this.makeRequest(HttpMethod.Get, 'tv/:id', params, options)
  }

  tvAlternativeTitles (params?: string|number|RequestParams, options?: string|RequestOptions): Promise<any> {
    return this.makeRequest(HttpMethod.Get, 'tv/:id/alternative_titles', params, options)
  }

  tvContentRatings (params?: string|number|RequestParams, options?: string|RequestOptions): Promise<any> {
    return this.makeRequest(HttpMethod.Get, 'tv/:id/content_ratings', params, options)
  }

  tvCredits (params?: string|number|RequestParams, options?: string|RequestOptions): Promise<any> {
    return this.makeRequest(HttpMethod.Get, 'tv/:id/credits', params, options)
  }

  tvEpisodeGroups (params?: string|number|RequestParams, options?: string|RequestOptions): Promise<any> {
    return this.makeRequest(HttpMethod.Get, 'tv/:id/episode_groups', params, options)
  }

  tvExternalIds (params?: string|number|RequestParams, options?: string|RequestOptions): Promise<any> {
    return this.makeRequest(HttpMethod.Get, 'tv/:id/external_ids', params, options)
  }

  tvImages (params?: string|number|RequestParams, options?: string|RequestOptions): Promise<any> {
    return this.makeRequest(HttpMethod.Get, 'tv/:id/images', params, options)
  }

  tvKeywords (params?: string|number|RequestParams, options?: string|RequestOptions): Promise<any> {
    return this.makeRequest(HttpMethod.Get, 'tv/:id/keywords', params, options)
  }

  tvVideos (params?: string|number|RequestParams, options?: string|RequestOptions): Promise<any> {
    return this.makeRequest(HttpMethod.Get, 'tv/:id/videos', params, options)
  }

  tvScreenedTheatrically (params?: string|number|RequestParams, options?: string|RequestOptions): Promise<any> {
    return this.makeRequest(HttpMethod.Get, 'tv/:id/screened_theatrically', params, options)
  }

  tvReviews (params?: string|number|RequestParams, options?: string|RequestOptions): Promise<any> {
    return this.makeRequest(HttpMethod.Get, 'tv/:id/reviews', params, options)
  }

  tvSimilar (params?: string|number|RequestParams, options?: string|RequestOptions): Promise<any> {
    return this.makeRequest(HttpMethod.Get, 'tv/:id/similar', params, options)
  }

  tvTranslations (params?: string|number|RequestParams, options?: string|RequestOptions): Promise<any> {
    return this.makeRequest(HttpMethod.Get, 'tv/:id/translations', params, options)
  }

  tvSeasonInfo (params?: string|number|RequestParams, options?: string|RequestOptions): Promise<any> {
    return this.makeRequest(HttpMethod.Get, 'tv/:id/season/:season_number', params, options)
  }

  tvSeasonCredits (params?: string|number|RequestParams, options?: string|RequestOptions): Promise<any> {
    return this.makeRequest(HttpMethod.Get, 'tv/:id/season/:season_number/credits', params, options)
  }

  tvSeasonVideos (params?: string|number|RequestParams, options?: string|RequestOptions): Promise<any> {
    return this.makeRequest(HttpMethod.Get, 'tv/:id/season/:season_number/videos', params, options)
  }

  tvSeasonExternalIds (params?: string|number|RequestParams, options?: string|RequestOptions): Promise<any> {
    return this.makeRequest(HttpMethod.Get, 'tv/:id/season/:season_number/external_ids', params, options)
  }

  tvSeasonImages (params?: string|number|RequestParams, options?: string|RequestOptions): Promise<any> {
    return this.makeRequest(HttpMethod.Get, 'tv/:id/season/:season_number/images', params, options)
  }

  tvEpisodeInfo (params?: string|number|RequestParams, options?: string|RequestOptions): Promise<any> {
    return this.makeRequest(HttpMethod.Get, 'tv/:id/season/:season_number/episode/:episode_number', params, options)
  }

  tvEpisodeCredits (params?: string|number|RequestParams, options?: string|RequestOptions): Promise<any> {
    return this.makeRequest(HttpMethod.Get, 'tv/:id/season/:season_number/episode/:episode_number/credits', params, options)
  }

  tvEpisodeExternalIds (params?: string|number|RequestParams, options?: string|RequestOptions): Promise<any> {
    return this.makeRequest(HttpMethod.Get, 'tv/:id/season/:season_number/episode/:episode_number/external_ids', params, options)
  }

  tvEpisodeImages (params?: string|number|RequestParams, options?: string|RequestOptions): Promise<any> {
    return this.makeRequest(HttpMethod.Get, 'tv/:id/season/:season_number/episode/:episode_number/images', params, options)
  }

  tvOnTheAir (params?: string|number|RequestParams, options?: string|RequestOptions): Promise<any> {
    return this.makeRequest(HttpMethod.Get, 'tv/on_the_air', params, options)
  }

  tvAiringToday (params?: string|number|RequestParams, options?: string|RequestOptions): Promise<any> {
    return this.makeRequest(HttpMethod.Get, 'tv/airing_today', params, options)
  }

  tvRecommendations (params?: string|number|RequestParams, options?: string|RequestOptions): Promise<any> {
    return this.makeRequest(HttpMethod.Get, 'tv/:id/recommendations', params, options)
  }

  tvChanges (params?: string|number|RequestParams, options?: string|RequestOptions): Promise<any> {
    return this.makeRequest(HttpMethod.Get, 'tv/:id/changes', params, options)
  }

  tvRatingUpdate (params?: string|number|RequestParams, options?: string|RequestOptions): Promise<any> {
    return this.makeRequest(HttpMethod.Post, 'tv/:id/rating', params, options)
  }

  personInfo (params?: string|number|RequestParams, options?: string|RequestOptions): Promise<any> {
    return this.makeRequest(HttpMethod.Get, 'person/:id', params, options)
  }

  personChanges (params?: string|number|RequestParams, options?: string|RequestOptions): Promise<any> {
    return this.makeRequest(HttpMethod.Get, 'person/:id/changes', params, options)
  }

  personMovieCredits (params?: string|number|RequestParams, options?: string|RequestOptions): Promise<any> {
    return this.makeRequest(HttpMethod.Get, 'person/:id/movie_credits', params, options)
  }

  personTvCredits (params?: string|number|RequestParams, options?: string|RequestOptions): Promise<any> {
    return this.makeRequest(HttpMethod.Get, 'person/:id/tv_credits', params, options)
  }

  personCombinedCredits (params?: string|number|RequestParams, options?: string|RequestOptions): Promise<any> {
    return this.makeRequest(HttpMethod.Get, 'person/:id/combined_credits', params, options)
  }

  personExternalIds (params?: string|number|RequestParams, options?: string|RequestOptions): Promise<any> {
    return this.makeRequest(HttpMethod.Get, 'person/:id/external_ids', params, options)
  }

  personImages (params?: string|number|RequestParams, options?: string|RequestOptions): Promise<any> {
    return this.makeRequest(HttpMethod.Get, 'person/:id/images', params, options)
  }

  personTaggedImages (params?: string|number|RequestParams, options?: string|RequestOptions): Promise<any> {
    return this.makeRequest(HttpMethod.Get, 'person/:id/tagged_images', params, options)
  }

  personTranslations (params?: string|number|RequestParams, options?: string|RequestOptions): Promise<any> {
    return this.makeRequest(HttpMethod.Get, 'person/:id/translations', params, options)
  }

  personLatest (params?: string|number|RequestParams, options?: string|RequestOptions): Promise<any> {
    return this.makeRequest(HttpMethod.Get, 'person/latest', params, options)
  }

  personPopular (params?: string|number|RequestParams, options?: string|RequestOptions): Promise<any> {
    return this.makeRequest(HttpMethod.Get, 'person/popular', params, options)
  }

  creditInfo (params?: string|number|RequestParams, options?: string|RequestOptions): Promise<any> {
    return this.makeRequest(HttpMethod.Get, 'credit/:id', params, options)
  }

  listInfo (params?: string|number|RequestParams, options?: string|RequestOptions): Promise<any> {
    return this.makeRequest(HttpMethod.Get, 'list/:id', params, options)
  }

  genreMovieList (params?: string|number|RequestParams, options?: string|RequestOptions): Promise<any> {
    return this.makeRequest(HttpMethod.Get, 'genre/movie/list', params, options)
  }

  genreTvList (params?: string|number|RequestParams, options?: string|RequestOptions): Promise<any> {
    return this.makeRequest(HttpMethod.Get, 'genre/tv/list', params, options)
  }

  keywordInfo (params?: string|number|RequestParams, options?: string|RequestOptions): Promise<any> {
    return this.makeRequest(HttpMethod.Get, 'keyword/:id', params, options)
  }

  keywordMovies (params?: string|number|RequestParams, options?: string|RequestOptions): Promise<any> {
    return this.makeRequest(HttpMethod.Get, 'keyword/:id/movies', params, options)
  }

  companyInfo (params?: string|number|RequestParams, options?: string|RequestOptions): Promise<any> {
    return this.makeRequest(HttpMethod.Get, 'company/:id', params, options)
  }

  companyAlternativeNames (params?: string|number|RequestParams, options?: string|RequestOptions): Promise<any> {
    return this.makeRequest(HttpMethod.Get, 'company/:id/alternative_names', params, options)
  }

  companyImages (params?: string|number|RequestParams, options?: string|RequestOptions): Promise<any> {
    return this.makeRequest(HttpMethod.Get, 'company/:id/images', params, options)
  }

  accountInfo (params?: string|number|RequestParams, options?: string|RequestOptions): Promise<any> {
    return this.makeRequest(HttpMethod.Get, 'account', params, options)
  }

  accountLists (params?: string|number|RequestParams, options?: string|RequestOptions): Promise<any> {
    return this.makeRequest(HttpMethod.Get, 'account/:id/lists', params, options)
  }

  accountFavoriteMovies (params?: string|number|RequestParams, options?: string|RequestOptions): Promise<any> {
    return this.makeRequest(HttpMethod.Get, 'account/:id/favorite/movies', params, options)
  }

  accountFavoriteUpdate (params?: string|number|RequestParams, options?: string|RequestOptions): Promise<any> {
    return this.makeRequest(HttpMethod.Post, 'account/:id/favorite', params, options)
  }

  accountRatedMovies (params?: string|number|RequestParams, options?: string|RequestOptions): Promise<any> {
    return this.makeRequest(HttpMethod.Get, 'account/:id/rated/movies', params, options)
  }

  accountMovieWatchlist (params?: string|number|RequestParams, options?: string|RequestOptions): Promise<any> {
    return this.makeRequest(HttpMethod.Get, 'account/:id/watchlist/movies', params, options)
  }

  accountTvWatchlist (params?: string|number|RequestParams, options?: string|RequestOptions): Promise<any> {
    return this.makeRequest(HttpMethod.Get, 'account/:id/watchlist/tv', params, options)
  }

  accountWatchlistUpdate (params?: string|number|RequestParams, options?: string|RequestOptions): Promise<any> {
    return this.makeRequest(HttpMethod.Post, 'account/:id/watchlist', params, options)
  }

  accountRatedTv (params?: string|number|RequestParams, options?: string|RequestOptions): Promise<any> {
    return this.makeRequest(HttpMethod.Get, 'account/:id/rated/tv', params, options)
  }

  accountRatedTvEpisodes (params?: string|number|RequestParams, options?: string|RequestOptions): Promise<any> {
    return this.makeRequest(HttpMethod.Get, 'account/:id/rated/tv/episodes', params, options)
  }

  accountFavoriteTv (params?: string|number|RequestParams, options?: string|RequestOptions): Promise<any> {
    return this.makeRequest(HttpMethod.Get, 'account/:id/favorite/tv', params, options)
  }

  miscLatestMovies (params?: string|number|RequestParams, options?: string|RequestOptions): Promise<any> {
    return this.makeRequest(HttpMethod.Get, 'movie/latest', params, options)
  }

  miscNowPlayingMovies (params?: string|number|RequestParams, options?: string|RequestOptions): Promise<any> {
    return this.makeRequest(HttpMethod.Get, 'movie/now_playing', params, options)
  }

  miscPopularMovies (params?: string|number|RequestParams, options?: string|RequestOptions): Promise<any> {
    return this.makeRequest(HttpMethod.Get, 'movie/popular', params, options)
  }

  miscTopRatedMovies (params?: string|number|RequestParams, options?: string|RequestOptions): Promise<any> {
    return this.makeRequest(HttpMethod.Get, 'movie/top_rated', params, options)
  }

  miscUpcomingMovies (params?: string|number|RequestParams, options?: string|RequestOptions): Promise<any> {
    return this.makeRequest(HttpMethod.Get, 'movie/upcoming', params, options)
  }

  miscChangedMovies (params?: string|number|RequestParams, options?: string|RequestOptions): Promise<any> {
    return this.makeRequest(HttpMethod.Get, 'movie/changes', params, options)
  }

  miscChangedTvs (params?: string|number|RequestParams, options?: string|RequestOptions): Promise<any> {
    return this.makeRequest(HttpMethod.Get, 'tv/changes', params, options)
  }

  miscChangedPeople (params?: string|number|RequestParams, options?: string|RequestOptions): Promise<any> {
    return this.makeRequest(HttpMethod.Get, 'person/changes', params, options)
  }

  miscLatestTvs (params?: string|number|RequestParams, options?: string|RequestOptions): Promise<any> {
    return this.makeRequest(HttpMethod.Get, 'tv/latest', params, options)
  }

  miscPopularTvs (params?: string|number|RequestParams, options?: string|RequestOptions): Promise<any> {
    return this.makeRequest(HttpMethod.Get, 'tv/popular', params, options)
  }

  miscTopRatedTvs (params?: string|number|RequestParams, options?: string|RequestOptions): Promise<any> {
    return this.makeRequest(HttpMethod.Get, 'tv/top_rated', params, options)
  }
}
