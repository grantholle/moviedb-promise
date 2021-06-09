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
  QueueItem
} from './types'
import * as types from './request-types'

export class MovieDb {
  private readonly apiKey: string
  private token: AuthenticationToken
  private readonly requests: QueueItem[] = []
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
    params: RequestParams = {}
  ): RequestParams {
    // Merge default parameters with the ones passed in
    const compiledParams: RequestParams = merge({
      api_key: this.apiKey,
      ...(this.sessionId && { session_id: this.sessionId })
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
    axiosConfig: AxiosRequestConfig = {}
  ): Promise<any> {
    const normalizedParams: RequestParams = this.normalizeParams(endpoint, params)

    // Get the full query/data object
    const fullQuery: RequestParams = this.getParams(endpoint, normalizedParams)

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
      ...axiosConfig
    }

    // Push the request to the queue
    return new Promise((resolve, reject) => {
      this.requests.push({
        promiseGenerator: async () => await axios.request(request).then(res => res.data),
        resolve,
        reject
      })

      this.dequeue()
    })
  }

  private parseSearchParams (params: string|types.SearchRequest): types.SearchRequest {
    if (isString(params)) {
      return { query: params }
    }

    return params
  }

  async configuration (axiosConfig?: AxiosRequestConfig): Promise<types.ConfigurationResponse> {
    return await this.makeRequest(HttpMethod.Get, 'configuration', null, axiosConfig)
  }

  async countries (axiosConfig?: AxiosRequestConfig): Promise<types.CountriesResponse> {
    return await this.makeRequest(HttpMethod.Get, 'configuration/countries', null, axiosConfig)
  }

  async jobs (axiosConfig?: AxiosRequestConfig): Promise<types.Job[]> {
    return await this.makeRequest(HttpMethod.Get, 'configuration/jobs', null, axiosConfig)
  }

  async languages (axiosConfig?: AxiosRequestConfig): Promise<types.Language[]> {
    return await this.makeRequest(HttpMethod.Get, 'configuration/languages', null, axiosConfig)
  }

  async primaryTranslations (axiosConfig?: AxiosRequestConfig): Promise<string[]> {
    return await this.makeRequest(HttpMethod.Get, 'configuration/primary_translations', null, axiosConfig)
  }

  async timezones (axiosConfig?: AxiosRequestConfig): Promise<types.Timezone[]> {
    return await this.makeRequest(HttpMethod.Get, 'configuration/timezones', null, axiosConfig)
  }

  async find (params?: types.FindRequest, axiosConfig?: AxiosRequestConfig): Promise<types.FindResponse> {
    return await this.makeRequest(HttpMethod.Get, 'find/:id', params, axiosConfig)
  }

  async searchCompany (params: string|types.SearchRequest, axiosConfig?: AxiosRequestConfig): Promise<types.SearchCompanyResponse> {
    return await this.makeRequest(HttpMethod.Get, 'search/company', this.parseSearchParams(params), axiosConfig)
  }

  async searchCollection (params: types.SearchRequest, axiosConfig?: AxiosRequestConfig): Promise<types.SearchCollectionResponse> {
    return await this.makeRequest(HttpMethod.Get, 'search/collection', this.parseSearchParams(params), axiosConfig)
  }

  async searchKeyword (params: types.SearchRequest, axiosConfig?: AxiosRequestConfig): Promise<types.SearchKeywordResponse> {
    return await this.makeRequest(HttpMethod.Get, 'search/keyword', this.parseSearchParams(params), axiosConfig)
  }

  async searchMovie (params: types.SearchMovieRequest, axiosConfig?: AxiosRequestConfig): Promise<types.MovieResultsResponse> {
    return await this.makeRequest(HttpMethod.Get, 'search/movie', this.parseSearchParams(params), axiosConfig)
  }

  async searchMulti (params: types.SearchMultiRequest, axiosConfig?: AxiosRequestConfig): Promise<types.SearchMultiResponse> {
    return await this.makeRequest(HttpMethod.Get, 'search/multi', this.parseSearchParams(params), axiosConfig)
  }

  async searchPerson (params: types.SearchMultiRequest, axiosConfig?: AxiosRequestConfig): Promise<types.SearchPersonResponse> {
    return await this.makeRequest(HttpMethod.Get, 'search/person', this.parseSearchParams(params), axiosConfig)
  }

  async searchTv (params: types.SearchTvRequest, axiosConfig?: AxiosRequestConfig): Promise<types.TvResultsResponse> {
    return await this.makeRequest(HttpMethod.Get, 'search/tv', this.parseSearchParams(params), axiosConfig)
  }

  // Doesn't exist in documentation, may be deprecated
  async searchList (params?: string|number|RequestParams, axiosConfig?: AxiosRequestConfig): Promise<any> {
    return await this.makeRequest(HttpMethod.Get, 'search/list', params, axiosConfig)
  }

  async collectionInfo (params: string|number|types.CollectionRequest, axiosConfig?: AxiosRequestConfig): Promise<types.CollectionInfoResponse> {
    return await this.makeRequest(HttpMethod.Get, 'collection/:id', params, axiosConfig)
  }

  async collectionImages (params: string|number|types.CollectionRequest, axiosConfig?: AxiosRequestConfig): Promise<types.CollectionImagesResponse> {
    return await this.makeRequest(HttpMethod.Get, 'collection/:id/images', params, axiosConfig)
  }

  async collectionTranslations (params: string|number|types.CollectionRequest, axiosConfig?: AxiosRequestConfig): Promise<types.CollectionTranslationsResponse> {
    return await this.makeRequest(HttpMethod.Get, 'collection/:id/translations', params, axiosConfig)
  }

  async discoverMovie (params?: types.DiscoverMovieRequest, axiosConfig?: AxiosRequestConfig): Promise<types.DiscoverMovieResponse> {
    return await this.makeRequest(HttpMethod.Get, 'discover/movie', params, axiosConfig)
  }

  async discoverTv (params?: types.DiscoverTvRequest, axiosConfig?: AxiosRequestConfig): Promise<types.DiscoverTvResponse> {
    return await this.makeRequest(HttpMethod.Get, 'discover/tv', params, axiosConfig)
  }

  async trending (params: types.TrendingRequest, axiosConfig?: AxiosRequestConfig): Promise<types.TrendingResponse> {
    return await this.makeRequest(HttpMethod.Get, 'trending/:media_type/:time_window', params, axiosConfig)
  }

  async movieInfo (params: string|number|types.IdAppendToResponseRequest, axiosConfig?: AxiosRequestConfig): Promise<types.MovieResponse> {
    return await this.makeRequest(HttpMethod.Get, 'movie/:id', params, axiosConfig)
  }

  async movieAccountStates (params: string|number|types.IdRequestParams, axiosConfig?: AxiosRequestConfig): Promise<types.MovieAccountStateResponse> {
    return await this.makeRequest(HttpMethod.Get, 'movie/:id/account_states', params, axiosConfig)
  }

  async movieAlternativeTitles (params: string|number|types.MovieAlternativeTitlesRequest, axiosConfig?: AxiosRequestConfig): Promise<types.MovieAlternativeTitlesResponse> {
    return await this.makeRequest(HttpMethod.Get, 'movie/:id/alternative_titles', params, axiosConfig)
  }

  async movieChanges (params: string|number|types.ChangesRequest, axiosConfig?: AxiosRequestConfig): Promise<types.MovieChangesResponse> {
    return await this.makeRequest(HttpMethod.Get, 'movie/:id/changes', params, axiosConfig)
  }

  async movieCredits (params: string|number|types.IdRequestParams, axiosConfig?: AxiosRequestConfig): Promise<types.CreditsResponse> {
    return await this.makeRequest(HttpMethod.Get, 'movie/:id/credits', params, axiosConfig)
  }

  async movieExternalIds (params: string|number|types.IdRequestParams, axiosConfig?: AxiosRequestConfig): Promise<types.MovieExternalIdsResponse> {
    return await this.makeRequest(HttpMethod.Get, 'movie/:id/external_ids', params, axiosConfig)
  }

  async movieImages (params: string|number|types.MovieImagesRequest, axiosConfig?: AxiosRequestConfig): Promise<types.MovieImagesResponse> {
    return await this.makeRequest(HttpMethod.Get, 'movie/:id/images', params, axiosConfig)
  }

  async movieKeywords (params: string|number|types.IdRequestParams, axiosConfig?: AxiosRequestConfig): Promise<types.MovieKeywordResponse> {
    return await this.makeRequest(HttpMethod.Get, 'movie/:id/keywords', params, axiosConfig)
  }

  async movieReleaseDates (params: string|number|types.IdRequestParams, axiosConfig?: AxiosRequestConfig): Promise<types.MovieReleaseDatesResponse> {
    return await this.makeRequest(HttpMethod.Get, 'movie/:id/release_dates', params, axiosConfig)
  }

  async movieVideos (params: string|number|types.IdRequestParams, axiosConfig?: AxiosRequestConfig): Promise<types.VideosResponse> {
    return await this.makeRequest(HttpMethod.Get, 'movie/:id/videos', params, axiosConfig)
  }

  async movieWatchProviders (params: string|number|types.IdRequestParams, axiosConfig?: AxiosRequestConfig): Promise<types.WatchProviderResponse> {
    return await this.makeRequest(HttpMethod.Get, 'movie/:id/watch/providers', params, axiosConfig)
  }

  async movieTranslations (params: string|number|types.IdRequestParams, axiosConfig?: AxiosRequestConfig): Promise<types.MovieTranslationsResponse> {
    return await this.makeRequest(HttpMethod.Get, 'movie/:id/translations', params, axiosConfig)
  }

  async movieRecommendations (params: string|number|types.MovieRecommendationsRequest, axiosConfig?: AxiosRequestConfig): Promise<types.MovieRecommendationsResponse> {
    return await this.makeRequest(HttpMethod.Get, 'movie/:id/recommendations', params, axiosConfig)
  }

  async movieSimilar (params: string|number|types.IdRequestParams, axiosConfig?: AxiosRequestConfig): Promise<types.SimilarMovieResponse> {
    return await this.makeRequest(HttpMethod.Get, 'movie/:id/similar', params, axiosConfig)
  }

  async movieReviews (params: string|number|types.MovieReviewsRequest, axiosConfig?: AxiosRequestConfig): Promise<types.MovieReviewsResponse> {
    return await this.makeRequest(HttpMethod.Get, 'movie/:id/reviews', params, axiosConfig)
  }

  async movieLists (params: string|number|types.MovieListsRequest, axiosConfig?: AxiosRequestConfig): Promise<types.MovieListsResponse> {
    return await this.makeRequest(HttpMethod.Get, 'movie/:id/lists', params, axiosConfig)
  }

  async movieRatingUpdate (params: types.RatingRequest, axiosConfig?: AxiosRequestConfig): Promise<types.PostResponse> {
    return await this.makeRequest(HttpMethod.Post, 'movie/:id/rating', params, axiosConfig)
  }

  async movieRatingDelete (params: string|number|types.IdRequestParams, axiosConfig?: AxiosRequestConfig): Promise<types.PostResponse> {
    return await this.makeRequest(HttpMethod.Delete, 'movie/:id/rating', params, axiosConfig)
  }

  async movieLatest (params?: string|RequestParams, axiosConfig?: AxiosRequestConfig): Promise<types.MovieResponse> {
    return await this.makeRequest(HttpMethod.Get, 'movie/latest', isString(params) ? { language: params } : params, axiosConfig)
  }

  async movieNowPlaying (params?: types.MovieNowPlayingRequest, axiosConfig?: AxiosRequestConfig): Promise<types.MovieNowPlayingResponse> {
    return await this.makeRequest(HttpMethod.Get, 'movie/now_playing', params, axiosConfig)
  }

  async moviePopular (params?: types.PopularMoviesRequest, axiosConfig?: AxiosRequestConfig): Promise<types.PopularMoviesResponse> {
    return await this.makeRequest(HttpMethod.Get, 'movie/popular', params, axiosConfig)
  }

  async movieTopRated (params?: types.TopRatedMoviesRequest, axiosConfig?: AxiosRequestConfig): Promise<types.TopRatedMoviesResponse> {
    return await this.makeRequest(HttpMethod.Get, 'movie/top_rated', params, axiosConfig)
  }

  async upcomingMovies (params: types.UpcomingMoviesRequest, axiosConfig?: AxiosRequestConfig): Promise<types.UpcomingMoviesResponse> {
    return await this.makeRequest(HttpMethod.Get, 'movie/upcoming', params, axiosConfig)
  }

  async tvInfo (params: string|number|types.IdAppendToResponseRequest, axiosConfig?: AxiosRequestConfig): Promise<types.ShowResponse> {
    return await this.makeRequest(HttpMethod.Get, 'tv/:id', params, axiosConfig)
  }

  async tvAccountStates (params: string|number|types.IdRequestParams, axiosConfig?: AxiosRequestConfig): Promise<types.ShowAccountStatesResponse> {
    return await this.makeRequest(HttpMethod.Get, 'tv/:id/account_states', params, axiosConfig)
  }

  async tvAlternativeTitles (params: string|number|types.IdRequestParams, axiosConfig?: AxiosRequestConfig): Promise<types.ShowAlternativeTitlesResponse> {
    return await this.makeRequest(HttpMethod.Get, 'tv/:id/alternative_titles', params, axiosConfig)
  }

  async tvChanges (params: string|number|types.ChangesRequest, axiosConfig?: AxiosRequestConfig): Promise<types.ShowChangesResponse> {
    return await this.makeRequest(HttpMethod.Get, 'tv/:id/changes', params, axiosConfig)
  }

  async tvContentRatings (params: string|number|types.IdRequestParams, axiosConfig?: AxiosRequestConfig): Promise<types.ShowContentRatingResponse> {
    return await this.makeRequest(HttpMethod.Get, 'tv/:id/content_ratings', params, axiosConfig)
  }

  async tvCredits (params: string|number|types.IdRequestParams, axiosConfig?: AxiosRequestConfig): Promise<types.CreditsResponse> {
    return await this.makeRequest(HttpMethod.Get, 'tv/:id/credits', params, axiosConfig)
  }

  async episodeGroups (params: string|number|types.IdRequestParams, axiosConfig?: AxiosRequestConfig): Promise<types.TvEpisodeGroupsResponse> {
    return await this.makeRequest(HttpMethod.Get, 'tv/:id/episode_groups', params, axiosConfig)
  }

  async tvExternalIds (params: string|number|types.IdRequestParams, axiosConfig?: AxiosRequestConfig): Promise<types.TvExternalIdsResponse> {
    return await this.makeRequest(HttpMethod.Get, 'tv/:id/external_ids', params, axiosConfig)
  }

  async tvImages (params: string|number|types.IdRequestParams, axiosConfig?: AxiosRequestConfig): Promise<types.TvImagesResponse> {
    return await this.makeRequest(HttpMethod.Get, 'tv/:id/images', params, axiosConfig)
  }

  async tvKeywords (params: string|number|types.IdRequestParams, axiosConfig?: AxiosRequestConfig): Promise<types.TvKeywordsResponse> {
    return await this.makeRequest(HttpMethod.Get, 'tv/:id/keywords', params, axiosConfig)
  }

  async tvRecommendations (params: string|number|types.PagedRequestParams, axiosConfig?: AxiosRequestConfig): Promise<types.TvResultsResponse> {
    return await this.makeRequest(HttpMethod.Get, 'tv/:id/recommendations', params, axiosConfig)
  }

  async tvReviews (params: string|number|types.PagedRequestParams, axiosConfig?: AxiosRequestConfig): Promise<types.TvReviewsResponse> {
    return await this.makeRequest(HttpMethod.Get, 'tv/:id/reviews', params, axiosConfig)
  }

  async tvScreenedTheatrically (params: string|number|types.IdRequestParams, axiosConfig?: AxiosRequestConfig): Promise<types.TvScreenTheatricallyResponse> {
    return await this.makeRequest(HttpMethod.Get, 'tv/:id/screened_theatrically', params, axiosConfig)
  }

  async tvSimilar (params: string|number|types.PagedRequestParams, axiosConfig?: AxiosRequestConfig): Promise<types.TvSimilarShowsResponse> {
    return await this.makeRequest(HttpMethod.Get, 'tv/:id/similar', params, axiosConfig)
  }

  async tvTranslations (params: string|number|types.IdRequestParams, axiosConfig?: AxiosRequestConfig): Promise<types.TvTranslationsResponse> {
    return await this.makeRequest(HttpMethod.Get, 'tv/:id/translations', params, axiosConfig)
  }

  async tvVideos (params: string|number|types.IdRequestParams, axiosConfig?: AxiosRequestConfig): Promise<types.VideosResponse> {
    return await this.makeRequest(HttpMethod.Get, 'tv/:id/videos', params, axiosConfig)
  }

  async tvWatchProviders (params: string|number|types.IdRequestParams, axiosConfig?: AxiosRequestConfig): Promise<types.WatchProviderResponse> {
    return await this.makeRequest(HttpMethod.Get, 'tv/:id/watch/providers', params, axiosConfig)
  }

  async tvRatingUpdate (params: types.RatingRequest, axiosConfig?: AxiosRequestConfig): Promise<types.PostResponse> {
    return await this.makeRequest(HttpMethod.Post, 'tv/:id/rating', params, axiosConfig)
  }

  async tvRatingDelete (params: string|number|types.IdRequestParams, axiosConfig?: AxiosRequestConfig): Promise<types.PostResponse> {
    return await this.makeRequest(HttpMethod.Delete, 'tv/:id/rating', params, axiosConfig)
  }

  async tvLatest (params?: RequestParams, axiosConfig?: AxiosRequestConfig): Promise<types.ShowResponse> {
    return await this.makeRequest(HttpMethod.Get, 'tv/latest', params, axiosConfig)
  }

  async tvAiringToday (params?: types.PagedRequestParams, axiosConfig?: AxiosRequestConfig): Promise<types.TvResultsResponse> {
    return await this.makeRequest(HttpMethod.Get, 'tv/airing_today', params, axiosConfig)
  }

  async tvOnTheAir (params?: types.PagedRequestParams, axiosConfig?: AxiosRequestConfig): Promise<types.TvResultsResponse> {
    return await this.makeRequest(HttpMethod.Get, 'tv/on_the_air', params, axiosConfig)
  }

  async tvPopular (params?: types.PagedRequestParams, axiosConfig?: AxiosRequestConfig): Promise<types.TvResultsResponse> {
    return await this.makeRequest(HttpMethod.Get, 'tv/popular', params, axiosConfig)
  }

  async tvTopRated (params?: types.PagedRequestParams, axiosConfig?: AxiosRequestConfig): Promise<types.TvResultsResponse> {
    return await this.makeRequest(HttpMethod.Get, 'tv/top_rated', params, axiosConfig)
  }

  async seasonInfo (params: types.TvSeasonRequest, axiosConfig?: AxiosRequestConfig): Promise<types.TvSeasonResponse> {
    return await this.makeRequest(HttpMethod.Get, 'tv/:id/season/:season_number', params, axiosConfig)
  }

  async seasonChanges (params: types.ChangesRequest, axiosConfig?: AxiosRequestConfig): Promise<types.TvSeasonChangesResponse> {
    return await this.makeRequest(HttpMethod.Get, 'tv/season/:id/changes', params, axiosConfig)
  }

  async seasonAccountStates (params: types.TvSeasonRequest, axiosConfig?: AxiosRequestConfig): Promise<types.TvSeasonAccountStatesResponse> {
    return await this.makeRequest(HttpMethod.Get, 'tv/:id/season/:season_number/account_states', params, axiosConfig)
  }

  async seasonCredits (params: types.TvSeasonRequest, axiosConfig?: AxiosRequestConfig): Promise<types.CreditsResponse> {
    return await this.makeRequest(HttpMethod.Get, 'tv/:id/season/:season_number/credits', params, axiosConfig)
  }

  async seasonExternalIds (params: types.TvSeasonRequest, axiosConfig?: AxiosRequestConfig): Promise<types.TvSeasonExternalIdsResponse> {
    return await this.makeRequest(HttpMethod.Get, 'tv/:id/season/:season_number/external_ids', params, axiosConfig)
  }

  async seasonImages (params: types.TvSeasonRequest, axiosConfig?: AxiosRequestConfig): Promise<types.TvSeasonImagesResponse> {
    return await this.makeRequest(HttpMethod.Get, 'tv/:id/season/:season_number/images', params, axiosConfig)
  }

  async seasonVideos (params: types.TvSeasonRequest, axiosConfig?: AxiosRequestConfig): Promise<types.VideosResponse> {
    return await this.makeRequest(HttpMethod.Get, 'tv/:id/season/:season_number/videos', params, axiosConfig)
  }

  async episodeInfo (params: types.EpisodeRequest, axiosConfig?: AxiosRequestConfig): Promise<types.Episode> {
    return await this.makeRequest(HttpMethod.Get, 'tv/:id/season/:season_number/episode/:episode_number', params, axiosConfig)
  }

  async episodeChanges (params: string|number|types.ChangesRequest, axiosConfig?: AxiosRequestConfig): Promise<types.EpisodeChangesResponse> {
    return await this.makeRequest(HttpMethod.Get, 'tv/episode/:id/changes', params, axiosConfig)
  }

  async episodeAccountStates (params: types.EpisodeRequest, axiosConfig?: AxiosRequestConfig): Promise<types.EpisodeAccountStatesResponse> {
    return await this.makeRequest(HttpMethod.Get, 'tv/:id/season/:season_number/episode/:episode_number/account_states', params, axiosConfig)
  }

  async episodeCredits (params: types.EpisodeRequest, axiosConfig?: AxiosRequestConfig): Promise<types.EpisodeCreditsResponse> {
    return await this.makeRequest(HttpMethod.Get, 'tv/:id/season/:season_number/episode/:episode_number/credits', params, axiosConfig)
  }

  async episodeExternalIds (params: types.EpisodeRequest, axiosConfig?: AxiosRequestConfig): Promise<types.EpisodeExternalIdsResponse> {
    return await this.makeRequest(HttpMethod.Get, 'tv/:id/season/:season_number/episode/:episode_number/external_ids', params, axiosConfig)
  }

  async episodeImages (params: types.EpisodeRequest, axiosConfig?: AxiosRequestConfig): Promise<types.EpisodeImagesResponse> {
    return await this.makeRequest(HttpMethod.Get, 'tv/:id/season/:season_number/episode/:episode_number/images', params, axiosConfig)
  }

  async episodeTranslations (params: types.EpisodeRequest, axiosConfig?: AxiosRequestConfig): Promise<types.EpisodeTranslationsResponse> {
    return await this.makeRequest(HttpMethod.Get, 'tv/:id/season/:season_number/episode/:episode_number/translations', params, axiosConfig)
  }

  async episodeRatingUpdate (params: types.EpisodeRatingRequest, axiosConfig?: AxiosRequestConfig): Promise<types.PostResponse> {
    return await this.makeRequest(HttpMethod.Post, 'tv/:id/season/:season_number/episode/:episode_number/rating', params, axiosConfig)
  }

  async episodeRatingDelete (params: types.EpisodeRequest, axiosConfig?: AxiosRequestConfig): Promise<types.PostResponse> {
    return await this.makeRequest(HttpMethod.Delete, 'tv/:id/season/:season_number/episode/:episode_number/rating', params, axiosConfig)
  }

  async episodeVideos (params: types.EpisodeRequest, axiosConfig?: AxiosRequestConfig): Promise<types.EpisodeVideosResponse> {
    return await this.makeRequest(HttpMethod.Get, 'tv/:id/season/:season_number/episode/:episode_number/translations', params, axiosConfig)
  }

  async personInfo (params: string|number|types.IdRequestParams, axiosConfig?: AxiosRequestConfig): Promise<types.Person> {
    return await this.makeRequest(HttpMethod.Get, 'person/:id', params, axiosConfig)
  }

  async personChanges (params: string|number|types.ChangesRequest, axiosConfig?: AxiosRequestConfig): Promise<types.PersonChangesResponse> {
    return await this.makeRequest(HttpMethod.Get, 'person/:id/changes', params, axiosConfig)
  }

  async personMovieCredits (params: string|number|types.IdRequestParams, axiosConfig?: AxiosRequestConfig): Promise<types.PersonMovieCreditsResponse> {
    return await this.makeRequest(HttpMethod.Get, 'person/:id/movie_credits', params, axiosConfig)
  }

  async personTvCredits (params: string|number|types.IdRequestParams, axiosConfig?: AxiosRequestConfig): Promise<types.PersonTvCreditsResponse> {
    return await this.makeRequest(HttpMethod.Get, 'person/:id/tv_credits', params, axiosConfig)
  }

  async personCombinedCredits (params: string|number|types.IdRequestParams, axiosConfig?: AxiosRequestConfig): Promise<types.PersonCombinedCreditsResponse> {
    return await this.makeRequest(HttpMethod.Get, 'person/:id/combined_credits', params, axiosConfig)
  }

  async personExternalIds (params: string|number|types.IdRequestParams, axiosConfig?: AxiosRequestConfig): Promise<types.PersonExternalIdsResponse> {
    return await this.makeRequest(HttpMethod.Get, 'person/:id/external_ids', params, axiosConfig)
  }

  async personImages (params: string|number|types.IdRequestParams, axiosConfig?: AxiosRequestConfig): Promise<types.PersonImagesResponse> {
    return await this.makeRequest(HttpMethod.Get, 'person/:id/images', params, axiosConfig)
  }

  async personTaggedImages (params: string|number|types.PagedRequestParams, axiosConfig?: AxiosRequestConfig): Promise<types.PersonTaggedImagesResponse> {
    return await this.makeRequest(HttpMethod.Get, 'person/:id/tagged_images', params, axiosConfig)
  }

  async personTranslations (params: string|number|types.IdRequestParams, axiosConfig?: AxiosRequestConfig): Promise<types.PersonTranslationsResponse> {
    return await this.makeRequest(HttpMethod.Get, 'person/:id/translations', params, axiosConfig)
  }

  async personLatest (params?: RequestParams, axiosConfig?: AxiosRequestConfig): Promise<types.Person> {
    return await this.makeRequest(HttpMethod.Get, 'person/latest', params, axiosConfig)
  }

  async personPopular (params?: types.PagedRequestParams, axiosConfig?: AxiosRequestConfig): Promise<types.PersonPopularResponse> {
    return await this.makeRequest(HttpMethod.Get, 'person/popular', params, axiosConfig)
  }

  async creditInfo (params?: string|number|types.IdRequestParams, axiosConfig?: AxiosRequestConfig): Promise<types.CreditDetailsResponse> {
    return await this.makeRequest(HttpMethod.Get, 'credit/:id', params, axiosConfig)
  }

  async listInfo (params: string|number|types.IdRequestParams, axiosConfig?: AxiosRequestConfig): Promise<types.ListsDetailResponse> {
    return await this.makeRequest(HttpMethod.Get, 'list/:id', params, axiosConfig)
  }

  async listStatus (params: types.IdRequestParams, axiosConfig?: AxiosRequestConfig): Promise<types.ListsStatusResponse> {
    return await this.makeRequest(HttpMethod.Get, 'list/:id/item_status', params, axiosConfig)
  }

  async createList (params: types.CreateListParams, axiosConfig?: AxiosRequestConfig): Promise<types.CreateListResponse> {
    return await this.makeRequest(HttpMethod.Post, 'list', params, axiosConfig)
  }

  async createListItem (params: types.CreateListItemParams, axiosConfig?: AxiosRequestConfig): Promise<types.PostResponse> {
    return await this.makeRequest(HttpMethod.Post, 'list/:id/add_item', params, axiosConfig)
  }

  async removeListItem (params: types.CreateListItemParams, axiosConfig?: AxiosRequestConfig): Promise<types.PostResponse> {
    return await this.makeRequest(HttpMethod.Post, 'list/:id/remove_item', params, axiosConfig)
  }

  async clearList (params: types.ClearListParams, axiosConfig?: AxiosRequestConfig): Promise<types.PostResponse> {
    return await this.makeRequest(HttpMethod.Post, 'list/:id/clear', params, axiosConfig)
  }

  async deleteList (params: string|number|types.IdRequestParams, axiosConfig?: AxiosRequestConfig): Promise<types.PostResponse> {
    return await this.makeRequest(HttpMethod.Delete, 'list/:id', params, axiosConfig)
  }

  async genreMovieList (params?: RequestParams, axiosConfig?: AxiosRequestConfig): Promise<types.GenresResponse> {
    return await this.makeRequest(HttpMethod.Get, 'genre/movie/list', params, axiosConfig)
  }

  async genreTvList (params?: RequestParams, axiosConfig?: AxiosRequestConfig): Promise<types.GenresResponse> {
    return await this.makeRequest(HttpMethod.Get, 'genre/tv/list', params, axiosConfig)
  }

  async keywordInfo (params?: string|number|types.IdRequestParams, axiosConfig?: AxiosRequestConfig): Promise<types.KeywordResponse> {
    return await this.makeRequest(HttpMethod.Get, 'keyword/:id', params, axiosConfig)
  }

  async keywordMovies (params: string|number|types.KeywordMoviesParams, axiosConfig?: AxiosRequestConfig): Promise<types.MovieResultsResponse> {
    return await this.makeRequest(HttpMethod.Get, 'keyword/:id/movies', params, axiosConfig)
  }

  async companyInfo (params: string|number|types.IdRequestParams, axiosConfig?: AxiosRequestConfig): Promise<types.Company> {
    return await this.makeRequest(HttpMethod.Get, 'company/:id', params, axiosConfig)
  }

  async companyAlternativeNames (params: string|number|RequestParams, axiosConfig?: AxiosRequestConfig): Promise<types.CompanyAlternativeNamesResponse> {
    return await this.makeRequest(HttpMethod.Get, 'company/:id/alternative_names', params, axiosConfig)
  }

  async companyImages (params: string|number|RequestParams, axiosConfig?: AxiosRequestConfig): Promise<types.CompanyImagesResponse> {
    return await this.makeRequest(HttpMethod.Get, 'company/:id/images', params, axiosConfig)
  }

  async accountInfo (axiosConfig?: AxiosRequestConfig): Promise<types.AccountInfoResponse> {
    return await this.makeRequest(HttpMethod.Get, 'account', null, axiosConfig)
  }

  async accountLists (params: string|number|types.PagedRequestParams, axiosConfig?: AxiosRequestConfig): Promise<types.AccountListsResponse> {
    return await this.makeRequest(HttpMethod.Get, 'account/:id/lists', params, axiosConfig)
  }

  async accountFavoriteMovies (params?: string|number|types.AccountMediaRequest, axiosConfig?: AxiosRequestConfig): Promise<types.MovieResultsResponse> {
    return await this.makeRequest(HttpMethod.Get, 'account/:id/favorite/movies', params, axiosConfig)
  }

  async accountFavoriteTv (params?: string|number|types.AccountMediaRequest, axiosConfig?: AxiosRequestConfig): Promise<types.TvResultsResponse> {
    return await this.makeRequest(HttpMethod.Get, 'account/:id/favorite/tv', params, axiosConfig)
  }

  async accountFavoriteUpdate (params: types.MarkAsFavoriteRequest, axiosConfig?: AxiosRequestConfig): Promise<types.PostResponse> {
    return await this.makeRequest(HttpMethod.Post, 'account/:id/favorite', params, axiosConfig)
  }

  async accountRatedMovies (params?: string|number|types.AccountMediaRequest, axiosConfig?: AxiosRequestConfig): Promise<types.MovieResultsResponse> {
    return await this.makeRequest(HttpMethod.Get, 'account/:id/rated/movies', params, axiosConfig)
  }

  async accountRatedTv (params?: string|number|types.AccountMediaRequest, axiosConfig?: AxiosRequestConfig): Promise<types.TvResultsResponse> {
    return await this.makeRequest(HttpMethod.Get, 'account/:id/rated/tv', params, axiosConfig)
  }

  async accountRatedTvEpisodes (params?: string|number|types.AccountMediaRequest, axiosConfig?: AxiosRequestConfig): Promise<types.EpisodeResultsResponse> {
    return await this.makeRequest(HttpMethod.Get, 'account/:id/rated/tv/episodes', params, axiosConfig)
  }

  async accountMovieWatchlist (params?: string|number|types.AccountMediaRequest, axiosConfig?: AxiosRequestConfig): Promise<types.MovieResultsResponse> {
    return await this.makeRequest(HttpMethod.Get, 'account/:id/watchlist/movies', params, axiosConfig)
  }

  async accountTvWatchlist (params?: string|number|types.AccountMediaRequest, axiosConfig?: AxiosRequestConfig): Promise<types.TvResultsResponse> {
    return await this.makeRequest(HttpMethod.Get, 'account/:id/watchlist/tv', params, axiosConfig)
  }

  async accountWatchlistUpdate (params: types.AccountWatchlistRequest, axiosConfig?: AxiosRequestConfig): Promise<types.PostResponse> {
    return await this.makeRequest(HttpMethod.Post, 'account/:id/watchlist', params, axiosConfig)
  }

  async changedMovies (params?: types.ChangesRequest, axiosConfig?: AxiosRequestConfig): Promise<types.ChangesResponse> {
    return await this.makeRequest(HttpMethod.Get, 'movie/changes', params, axiosConfig)
  }

  async changedTvs (params?: types.ChangesRequest, axiosConfig?: AxiosRequestConfig): Promise<types.ChangesResponse> {
    return await this.makeRequest(HttpMethod.Get, 'tv/changes', params, axiosConfig)
  }

  async changedPeople (params?: types.ChangesRequest, axiosConfig?: AxiosRequestConfig): Promise<types.ChangesResponse> {
    return await this.makeRequest(HttpMethod.Get, 'person/changes', params, axiosConfig)
  }

  async movieCertifications (axiosConfig?: AxiosRequestConfig): Promise<types.CertificationsResponse> {
    return await this.makeRequest(HttpMethod.Get, 'certification/movie/list', null, axiosConfig)
  }

  async tvCertifications (axiosConfig?: AxiosRequestConfig): Promise<types.CertificationsResponse> {
    return await this.makeRequest(HttpMethod.Get, 'certification/tv/list', null, axiosConfig)
  }

  async networkInfo (params: string|number|types.IdRequestParams, axiosConfig?: AxiosRequestConfig): Promise<types.NetworkResponse> {
    return await this.makeRequest(HttpMethod.Get, 'network/:id', params, axiosConfig)
  }

  async networkAlternativeNames (params: string|number|types.IdRequestParams, axiosConfig?: AxiosRequestConfig): Promise<types.CompanyAlternativeNamesResponse> {
    return await this.makeRequest(HttpMethod.Get, 'network/:id/alternative_names', params, axiosConfig)
  }

  async networkImages (params: string|number|types.IdRequestParams, axiosConfig?: AxiosRequestConfig): Promise<types.CompanyImagesResponse> {
    return await this.makeRequest(HttpMethod.Get, 'network/:id/images', params, axiosConfig)
  }

  async review (params: string|number|types.IdRequestParams, axiosConfig?: AxiosRequestConfig): Promise<types.Review> {
    return await this.makeRequest(HttpMethod.Get, 'review/:id', params, axiosConfig)
  }

  async episodeGroup (params: string|number|types.IdRequestParams, axiosConfig?: AxiosRequestConfig): Promise<types.EpisodeGroupResponse> {
    return await this.makeRequest(HttpMethod.Get, 'tv/episode_group/:id', params, axiosConfig)
  }
}
