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

  private parseSearchParams (params: string|types.SearchRequest): types.SearchRequest {
    if (isString(params)) {
      return { query: params }
    }

    return params
  }

  configuration (options?: string|RequestOptions): Promise<types.ConfigurationResponse> {
    return this.makeRequest(HttpMethod.Get, 'configuration', null, options)
  }

  find (params?: string|number|types.FindRequest, options?: string|RequestOptions): Promise<types.FindResponse> {
    return this.makeRequest(HttpMethod.Get, 'find/:id', params, options)
  }

  searchCompany (params: string|types.SearchRequest, options?: string|RequestOptions): Promise<types.SearchCompanyResponse> {
    return this.makeRequest(HttpMethod.Get, 'search/company', this.parseSearchParams(params), options)
  }

  searchCollection (params: types.SearchRequest, options?: string|RequestOptions): Promise<types.SearchCollectionResponse> {
    return this.makeRequest(HttpMethod.Get, 'search/collection', this.parseSearchParams(params), options)
  }

  searchKeyword (params: types.SearchRequest, options?: string|RequestOptions): Promise<types.SearchKeywordResponse> {
    return this.makeRequest(HttpMethod.Get, 'search/keyword', this.parseSearchParams(params), options)
  }

  searchMovie (params: types.SearchMovieRequest, options?: string|RequestOptions): Promise<types.SearchMovieResponse> {
    return this.makeRequest(HttpMethod.Get, 'search/movie', this.parseSearchParams(params), options)
  }

  searchMulti (params: types.SearchMultiRequest, options?: string|RequestOptions): Promise<types.SearchMultiResponse> {
    return this.makeRequest(HttpMethod.Get, 'search/multi', this.parseSearchParams(params), options)
  }

  searchPerson (params: types.SearchMultiRequest, options?: string|RequestOptions): Promise<types.SearchPersonResponse> {
    return this.makeRequest(HttpMethod.Get, 'search/person', this.parseSearchParams(params), options)
  }

  searchTv (params: types.SearchTvRequest, options?: string|RequestOptions): Promise<types.SearchTvResponse> {
    return this.makeRequest(HttpMethod.Get, 'search/tv', this.parseSearchParams(params), options)
  }

  // Doesn't exist in documentation, may be deprecated
  searchList (params?: string|number|RequestParams, options?: string|RequestOptions): Promise<any> {
    return this.makeRequest(HttpMethod.Get, 'search/list', params, options)
  }

  collectionInfo (params: string|number|types.CollectionRequest, options?: string|RequestOptions): Promise<types.CollectionInfoResponse> {
    return this.makeRequest(HttpMethod.Get, 'collection/:id', params, options)
  }

  collectionImages (params: string|number|types.CollectionRequest, options?: string|RequestOptions): Promise<types.CollectionImagesResponse> {
    return this.makeRequest(HttpMethod.Get, 'collection/:id/images', params, options)
  }

  collectionTranslations (params: string|number|types.CollectionRequest, options?: string|RequestOptions): Promise<types.CollectionTranslationsResponse> {
    return this.makeRequest(HttpMethod.Get, 'collection/:id/translations', params, options)
  }

  discoverMovie (params?: types.DiscoverMovieRequest, options?: string|RequestOptions): Promise<types.DiscoverMovieResponse> {
    return this.makeRequest(HttpMethod.Get, 'discover/movie', params, options)
  }

  discoverTv (params?: types.DiscoverTvRequest, options?: string|RequestOptions): Promise<types.DiscoverTvResponse> {
    return this.makeRequest(HttpMethod.Get, 'discover/tv', params, options)
  }

  trending (params: types.TrendingRequest, options?: string|RequestOptions): Promise<types.TrendingResponse> {
    return this.makeRequest(HttpMethod.Get, 'trending/:media_type/:time_window', params, options)
  }

  movieInfo (params: string|number|types.IdRequestParams, options?: string|RequestOptions): Promise<types.MovieResponse> {
    return this.makeRequest(HttpMethod.Get, 'movie/:id', params, options)
  }

  movieAccountStates (params: string|number|types.IdRequestParams, options?: string|RequestOptions): Promise<types.MovieAccountStateResponse> {
    return this.makeRequest(HttpMethod.Get, 'movie/:id/account_states', params, options)
  }

  movieAlternativeTitles (params: string|number|types.MovieAlternativeTitlesRequest, options?: string|RequestOptions): Promise<types.MovieAlternativeTitlesResponse> {
    return this.makeRequest(HttpMethod.Get, 'movie/:id/alternative_titles', params, options)
  }

  movieChanges (params: string|number|types.ChangesRequest, options?: string|RequestOptions): Promise<types.MovieChangesResponse> {
    return this.makeRequest(HttpMethod.Get, 'movie/:id/changes', params, options)
  }

  movieCredits (params: string|number|types.IdRequestParams, options?: string|RequestOptions): Promise<types.CreditsResponse> {
    return this.makeRequest(HttpMethod.Get, 'movie/:id/credits', params, options)
  }

  movieExternalIds (params: string|number|types.IdRequestParams, options?: string|RequestOptions): Promise<types.MovieExternalIdsResponse> {
    return this.makeRequest(HttpMethod.Get, '/movie/:id/external_ids', params, options)
  }

  movieImages (params: string|number|types.MovieImagesRequest, options?: string|RequestOptions): Promise<types.MovieImagesResponse> {
    return this.makeRequest(HttpMethod.Get, 'movie/:id/images', params, options)
  }

  movieKeywords (params: string|number|types.IdRequestParams, options?: string|RequestOptions): Promise<types.MovieKeywordResponse> {
    return this.makeRequest(HttpMethod.Get, 'movie/:id/keywords', params, options)
  }

  movieReleaseDates (params: string|number|types.IdRequestParams, options?: string|RequestOptions): Promise<types.MovieReleaseDatesResponse> {
    return this.makeRequest(HttpMethod.Get, 'movie/:id/release_dates', params, options)
  }

  movieVideos (params: string|number|types.IdRequestParams, options?: string|RequestOptions): Promise<types.VideosResponse> {
    return this.makeRequest(HttpMethod.Get, 'movie/:id/videos', params, options)
  }

  movieTranslations (params: string|number|types.IdRequestParams, options?: string|RequestOptions): Promise<types.MovieTranslationsResponse> {
    return this.makeRequest(HttpMethod.Get, 'movie/:id/translations', params, options)
  }

  movieRecommendations (params: string|number|types.MovieRecommendationsRequest, options?: string|RequestOptions): Promise<types.MovieRecommendationsResponse> {
    return this.makeRequest(HttpMethod.Get, 'movie/:id/recommendations', params, options)
  }

  movieSimilar (params: string|number|types.IdRequestParams, options?: string|RequestOptions): Promise<types.SimilarMovieResponse> {
    return this.makeRequest(HttpMethod.Get, 'movie/:id/similar', params, options)
  }

  movieReviews (params: string|number|types.MovieReviewsRequest, options?: string|RequestOptions): Promise<types.MovieReviewsResponse> {
    return this.makeRequest(HttpMethod.Get, 'movie/:id/reviews', params, options)
  }

  movieLists (params: string|number|types.MovieListsRequest, options?: string|RequestOptions): Promise<types.MovieListsResponse> {
    return this.makeRequest(HttpMethod.Get, 'movie/:id/lists', params, options)
  }

  movieRatingUpdate (params: types.RatingRequest, options?: string|RequestOptions): Promise<types.PostResponse> {
    return this.makeRequest(HttpMethod.Post, 'movie/:id/rating', params, options)
  }

  movieRatingDelete (params: string|number|types.IdRequestParams, options?: string|RequestOptions): Promise<types.PostResponse> {
    return this.makeRequest(HttpMethod.Delete, 'movie/:id/rating', params, options)
  }

  movieLatest (params?: string|RequestParams, options?: string|RequestOptions): Promise<types.MovieResponse> {
    return this.makeRequest(HttpMethod.Get, 'movie/latest', isString(params) ? { language: params } : params, options)
  }

  movieNowPlaying (params?: types.MovieNowPlayingRequest, options?: string|RequestOptions): Promise<types.MovieNowPlayingResponse> {
    return this.makeRequest(HttpMethod.Get, 'movie/now_playing', params, options)
  }

  moviePopular (params?: types.PopularMoviesRequest, options?: string|RequestOptions): Promise<types.PopularMoviesResponse> {
    return this.makeRequest(HttpMethod.Get, 'movie/popular', params, options)
  }

  movieTopRated (params?: types.TopRatedMoviesRequest, options?: string|RequestOptions): Promise<types.TopRatedMoviesResponse> {
    return this.makeRequest(HttpMethod.Get, 'movie/top_rated', params, options)
  }

  upcomingMovies (params: types.UpcomingMoviesRequest, options?: string|RequestOptions): Promise<types.UpcomingMoviesResponse> {
    return this.makeRequest(HttpMethod.Get, 'movie/upcoming', params, options)
  }

  miscChangedMovies (params?: string|number|RequestParams, options?: string|RequestOptions): Promise<any> {
    return this.makeRequest(HttpMethod.Get, 'movie/changes', params, options)
  }

  tvShow (params: string|number|types.IdRequestParams, options?: string|RequestOptions): Promise<types.ShowResponse> {
    return this.makeRequest(HttpMethod.Get, 'tv/:id', params, options)
  }

  tvAccountStates (params: string|number|types.IdRequestParams, options?: string|RequestOptions): Promise<types.ShowAccountStatesResponse> {
    return this.makeRequest(HttpMethod.Get, 'tv/:id/account_states', params, options)
  }

  tvAlternativeTitles (params: string|number|types.IdRequestParams, options?: string|RequestOptions): Promise<types.ShowAlternativeTitlesResponse> {
    return this.makeRequest(HttpMethod.Get, 'tv/:id/alternative_titles', params, options)
  }

  tvChanges (params: string|number|types.ChangesRequest, options?: string|RequestOptions): Promise<types.ShowChangesResponse> {
    return this.makeRequest(HttpMethod.Get, 'tv/:id/changes', params, options)
  }

  tvContentRatings (params: string|number|types.IdRequestParams, options?: string|RequestOptions): Promise<types.ShowContentRatingResponse> {
    return this.makeRequest(HttpMethod.Get, 'tv/:id/content_ratings', params, options)
  }

  tvCredits (params: string|number|types.IdRequestParams, options?: string|RequestOptions): Promise<types.CreditsResponse> {
    return this.makeRequest(HttpMethod.Get, 'tv/:id/credits', params, options)
  }

  tvEpisodeGroups (params: string|number|types.IdRequestParams, options?: string|RequestOptions): Promise<types.TvEpisodeGroupsResponse> {
    return this.makeRequest(HttpMethod.Get, 'tv/:id/episode_groups', params, options)
  }

  tvExternalIds (params: string|number|types.IdRequestParams, options?: string|RequestOptions): Promise<types.TvExternalIdsResponse> {
    return this.makeRequest(HttpMethod.Get, 'tv/:id/external_ids', params, options)
  }

  tvImages (params: string|number|types.IdRequestParams, options?: string|RequestOptions): Promise<types.TvImagesResponse> {
    return this.makeRequest(HttpMethod.Get, 'tv/:id/images', params, options)
  }

  tvKeywords (params: string|number|types.IdRequestParams, options?: string|RequestOptions): Promise<types.TvKeywordsResponse> {
    return this.makeRequest(HttpMethod.Get, 'tv/:id/keywords', params, options)
  }

  tvRecommendations (params: string|number|types.PagedRequestParams, options?: string|RequestOptions): Promise<types.TvResultsResponse> {
    return this.makeRequest(HttpMethod.Get, 'tv/:id/recommendations', params, options)
  }

  tvReviews (params: string|number|types.PagedRequestParams, options?: string|RequestOptions): Promise<types.TvReviewsResponse> {
    return this.makeRequest(HttpMethod.Get, 'tv/:id/reviews', params, options)
  }

  tvScreenedTheatrically (params: string|number|types.IdRequestParams, options?: string|RequestOptions): Promise<types.TvScreenTheatricallyResponse> {
    return this.makeRequest(HttpMethod.Get, 'tv/:id/screened_theatrically', params, options)
  }

  tvSimilar (params: string|number|types.PagedRequestParams, options?: string|RequestOptions): Promise<types.TvSimilarShowsResponse> {
    return this.makeRequest(HttpMethod.Get, 'tv/:id/similar', params, options)
  }

  tvTranslations (params: string|number|types.IdRequestParams, options?: string|RequestOptions): Promise<types.TvTranslationsResponse> {
    return this.makeRequest(HttpMethod.Get, 'tv/:id/translations', params, options)
  }

  tvVideos (params: string|number|types.IdRequestParams, options?: string|RequestOptions): Promise<types.VideosResponse> {
    return this.makeRequest(HttpMethod.Get, 'tv/:id/videos', params, options)
  }

  tvRatingUpdate (params: types.RatingRequest, options?: string|RequestOptions): Promise<types.PostResponse> {
    return this.makeRequest(HttpMethod.Post, 'tv/:id/rating', params, options)
  }

  tvRatingDelete (params: string|number|types.IdRequestParams, options?: string|RequestOptions): Promise<types.PostResponse> {
    return this.makeRequest(HttpMethod.Delete, 'tv/:id/rating', params, options)
  }

  tvLatest (params?: RequestParams, options?: string|RequestOptions): Promise<types.ShowResponse> {
    return this.makeRequest(HttpMethod.Get, 'tv/latest', params, options)
  }

  tvAiringToday (params?: types.PagedRequestParams, options?: string|RequestOptions): Promise<types.TvResultsResponse> {
    return this.makeRequest(HttpMethod.Get, 'tv/airing_today', params, options)
  }

  tvOnTheAir (params?: types.PagedRequestParams, options?: string|RequestOptions): Promise<types.TvResultsResponse> {
    return this.makeRequest(HttpMethod.Get, 'tv/on_the_air', params, options)
  }

  tvPopular (params?: types.PagedRequestParams, options?: string|RequestOptions): Promise<types.TvResultsResponse> {
    return this.makeRequest(HttpMethod.Get, 'tv/popular', params, options)
  }

  tvTopRated (params?: types.PagedRequestParams, options?: string|RequestOptions): Promise<types.TvResultsResponse> {
    return this.makeRequest(HttpMethod.Get, 'tv/top_rated', params, options)
  }

  tvSeasonInfo (params: types.TvSeasonRequest, options?: string|RequestOptions): Promise<types.TvSeasonResponse> {
    return this.makeRequest(HttpMethod.Get, 'tv/:id/season/:season_number', params, options)
  }

  tvSeasonChanges (params: types.ChangesRequest, options?: string|RequestOptions): Promise<types.TvSeasonChangesResponse> {
    return this.makeRequest(HttpMethod.Get, 'tv/season/:id/changes', params, options)
  }

  tvSeasonAccountStates (params: types.TvSeasonRequest, options?: string|RequestOptions): Promise<types.TvSeasonAccountStatesResponse> {
    return this.makeRequest(HttpMethod.Get, 'tv/:id/season/:season_number/account_states', params, options)
  }

  tvSeasonCredits (params: types.TvSeasonRequest, options?: string|RequestOptions): Promise<types.CreditsResponse> {
    return this.makeRequest(HttpMethod.Get, 'tv/:id/season/:season_number/credits', params, options)
  }

  tvSeasonExternalIds (params: types.TvSeasonRequest, options?: string|RequestOptions): Promise<types.TvSeasonExternalIdsResponse> {
    return this.makeRequest(HttpMethod.Get, 'tv/:id/season/:season_number/external_ids', params, options)
  }

  tvSeasonImages (params: types.TvSeasonRequest, options?: string|RequestOptions): Promise<types.TvSeasonImagesResponse> {
    return this.makeRequest(HttpMethod.Get, 'tv/:id/season/:season_number/images', params, options)
  }

  tvSeasonVideos (params: types.TvSeasonRequest, options?: string|RequestOptions): Promise<types.VideosResponse> {
    return this.makeRequest(HttpMethod.Get, 'tv/:id/season/:season_number/videos', params, options)
  }

  tvEpisodeInfo (params: types.EpisodeRequest, options?: string|RequestOptions): Promise<types.Episode> {
    return this.makeRequest(HttpMethod.Get, 'tv/:id/season/:season_number/episode/:episode_number', params, options)
  }

  tvEpisodeChanges (params: string|number|types.ChangesRequest, options?: string|RequestOptions): Promise<types.EpisodeChangesResponse> {
    return this.makeRequest(HttpMethod.Get, '/tv/episode/:id/changes', params, options)
  }

  tvEpisodeAccountStates (params: types.EpisodeRequest, options?: string|RequestOptions): Promise<types.EpisodeAccountStatesResponse> {
    return this.makeRequest(HttpMethod.Get, 'tv/:id/season/:season_number/episode/:episode_number/account_states', params, options)
  }

  tvEpisodeCredits (params: types.EpisodeRequest, options?: string|RequestOptions): Promise<types.EpisodeCreditsResponse> {
    return this.makeRequest(HttpMethod.Get, 'tv/:id/season/:season_number/episode/:episode_number/credits', params, options)
  }

  tvEpisodeExternalIds (params: types.EpisodeRequest, options?: string|RequestOptions): Promise<types.EpisodeExternalIdsResponse> {
    return this.makeRequest(HttpMethod.Get, 'tv/:id/season/:season_number/episode/:episode_number/external_ids', params, options)
  }

  tvEpisodeImages (params: types.EpisodeRequest, options?: string|RequestOptions): Promise<types.EpisodeImagesResponse> {
    return this.makeRequest(HttpMethod.Get, 'tv/:id/season/:season_number/episode/:episode_number/images', params, options)
  }

  tvEpisodeTranslations (params: types.EpisodeRequest, options?: string|RequestOptions): Promise<types.EpisodeTranslationsResponse> {
    return this.makeRequest(HttpMethod.Get, 'tv/:id/season/:season_number/episode/:episode_number/translations', params, options)
  }

  tvEpisodeRatingUpdate (params: types.EpisodeRatingRequest, options?: string|RequestOptions): Promise<types.PostResponse> {
    return this.makeRequest(HttpMethod.Post, 'tv/:id/season/:season_number/episode/:episode_number/rating', params, options)
  }

  tvEpisodeRatingDelete (params: types.EpisodeRequest, options?: string|RequestOptions): Promise<types.PostResponse> {
    return this.makeRequest(HttpMethod.Delete, 'tv/:id/season/:season_number/episode/:episode_number/rating', params, options)
  }

  tvEpisodeVideos (params: types.EpisodeRequest, options?: string|RequestOptions): Promise<types.EpisodeVideosResponse> {
    return this.makeRequest(HttpMethod.Get, 'tv/:id/season/:season_number/episode/:episode_number/translations', params, options)
  }

  personInfo (params: string|number|types.IdRequestParams, options?: string|RequestOptions): Promise<types.Person> {
    return this.makeRequest(HttpMethod.Get, 'person/:id', params, options)
  }

  personChanges (params: string|number|types.ChangesRequest, options?: string|RequestOptions): Promise<types.PersonChangesResponse> {
    return this.makeRequest(HttpMethod.Get, 'person/:id/changes', params, options)
  }

  personMovieCredits (params: string|number|types.IdRequestParams, options?: string|RequestOptions): Promise<types.PersonMovieCreditsResponse> {
    return this.makeRequest(HttpMethod.Get, 'person/:id/movie_credits', params, options)
  }

  personTvCredits (params: string|number|types.IdRequestParams, options?: string|RequestOptions): Promise<types.PersonTvCreditsResponse> {
    return this.makeRequest(HttpMethod.Get, 'person/:id/tv_credits', params, options)
  }

  personCombinedCredits (params: string|number|types.IdRequestParams, options?: string|RequestOptions): Promise<types.PersonCombinedCreditsResponse> {
    return this.makeRequest(HttpMethod.Get, 'person/:id/combined_credits', params, options)
  }

  personExternalIds (params: string|number|types.IdRequestParams, options?: string|RequestOptions): Promise<types.PersonExternalIdsResponse> {
    return this.makeRequest(HttpMethod.Get, 'person/:id/external_ids', params, options)
  }

  personImages (params: string|number|types.IdRequestParams, options?: string|RequestOptions): Promise<types.PersonImagesResponse> {
    return this.makeRequest(HttpMethod.Get, 'person/:id/images', params, options)
  }

  personTaggedImages (params: string|number|types.PagedRequestParams, options?: string|RequestOptions): Promise<types.PersonTaggedImagesResponse> {
    return this.makeRequest(HttpMethod.Get, 'person/:id/tagged_images', params, options)
  }

  personTranslations (params: string|number|types.IdRequestParams, options?: string|RequestOptions): Promise<types.PersonTranslationsResponse> {
    return this.makeRequest(HttpMethod.Get, 'person/:id/translations', params, options)
  }

  personLatest (params?: RequestParams, options?: string|RequestOptions): Promise<types.Person> {
    return this.makeRequest(HttpMethod.Get, 'person/latest', params, options)
  }

  personPopular (params?: types.PagedRequestParams, options?: string|RequestOptions): Promise<types.PersonPopularResponse> {
    return this.makeRequest(HttpMethod.Get, 'person/popular', params, options)
  }

  creditInfo (params?: string|number|types.IdRequestParams, options?: string|RequestOptions): Promise<types.CreditDetailsResponse> {
    return this.makeRequest(HttpMethod.Get, 'credit/:id', params, options)
  }

  listInfo (params: string|number|types.IdRequestParams, options?: string|RequestOptions): Promise<types.ListsDetailResponse> {
    return this.makeRequest(HttpMethod.Get, 'list/:id', params, options)
  }

  listStatus (params: types.IdRequestParams, options?: string|RequestOptions): Promise<types.ListsStatusResponse> {
    return this.makeRequest(HttpMethod.Get, 'list/:id/item_status', params, options)
  }

  createList (params: types.CreateListParams, options?: string|RequestOptions): Promise<types.CreateListResponse> {
    return this.makeRequest(HttpMethod.Post, 'list', params, options)
  }

  createListItem (params: types.CreateListItemParams, options?: string|RequestOptions): Promise<types.PostResponse> {
    return this.makeRequest(HttpMethod.Post, 'list/:id/add_item', params, options)
  }

  removeListItem (params: types.CreateListItemParams, options?: string|RequestOptions): Promise<types.PostResponse> {
    return this.makeRequest(HttpMethod.Post, 'list/:id/remove_item', params, options)
  }

  clearList (params: types.ClearListParams, options?: string|RequestOptions): Promise<types.PostResponse> {
    return this.makeRequest(HttpMethod.Post, 'list/:id/clear', params, options)
  }

  deleteList (params: string|number|types.IdRequestParams, options?: string|RequestOptions): Promise<types.PostResponse> {
    return this.makeRequest(HttpMethod.Delete, 'list/:id', params, options)
  }

  genreMovieList (params?: RequestParams, options?: string|RequestOptions): Promise<types.GenresResponse> {
    return this.makeRequest(HttpMethod.Get, 'genre/movie/list', params, options)
  }

  genreTvList (params?: RequestParams, options?: string|RequestOptions): Promise<types.GenresResponse> {
    return this.makeRequest(HttpMethod.Get, 'genre/tv/list', params, options)
  }

  keywordInfo (params?: string|number|types.IdRequestParams, options?: string|RequestOptions): Promise<types.KeywordResponse> {
    return this.makeRequest(HttpMethod.Get, 'keyword/:id', params, options)
  }

  keywordMovies (params: string|number|types.KeywordMoviesParams, options?: string|RequestOptions): Promise<types.SearchMovieResponse> {
    return this.makeRequest(HttpMethod.Get, 'keyword/:id/movies', params, options)
  }

  companyInfo (params: string|number|types.IdRequestParams, options?: string|RequestOptions): Promise<types.Company> {
    return this.makeRequest(HttpMethod.Get, 'company/:id', params, options)
  }

  companyAlternativeNames (params: string|number|RequestParams, options?: string|RequestOptions): Promise<types.CompanyAlternativeNamesResponse> {
    return this.makeRequest(HttpMethod.Get, 'company/:id/alternative_names', params, options)
  }

  companyImages (params: string|number|RequestParams, options?: string|RequestOptions): Promise<types.CompanyImagesResponse> {
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

  miscChangedTvs (params?: string|number|RequestParams, options?: string|RequestOptions): Promise<any> {
    return this.makeRequest(HttpMethod.Get, 'tv/changes', params, options)
  }

  miscChangedPeople (params?: string|number|RequestParams, options?: string|RequestOptions): Promise<any> {
    return this.makeRequest(HttpMethod.Get, 'person/changes', params, options)
  }
}
