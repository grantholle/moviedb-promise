import {
  Response,
  RequestParams,
  Genre,
  ProductionCountry,
  SpokenLanguage,
  ProductionCompany
} from './types'

export interface IdRequestParams extends RequestParams {
  id: string|number
}

export interface MovieResult {
  poster_path?: string
  adult?: boolean
  overview?: string
  release_date?: string
  genre_ids?: Array<number>
  id?: number
  media_type: 'movie'
  original_title?: string
  original_language?: string
  title?: string
  backdrop_path?: string
  popularity?: number
  vote_count?: number
  video?: boolean
  vote_average?: number
}

export interface TvResult {
  poster_path?: string
  popularity?: number
  id?: number
  overview?: string
  backdrop_path?: string
  vote_average?: number
  media_type: 'tv'
  first_air_date?: string
  origin_country?: Array<string>
  genre_ids?: Array<number>
  original_language?: string
  vote_count?: number
  name?: string
  original_name?: string
}

export interface PersonResult {
  profile_path?: string
  adult?: boolean
  id?: number
  name?: string
  popularity?: number
  known_for?: Array<MovieResult|TvResult>
}

export interface Image {
  base_url?: string
  secure_base_url?: string
  backdrop_sizes?: Array<string>
  logo_sizes?: Array<string>
  poster_sizes?: Array<string>
  profile_sizes?: Array<string>
  still_sizes?: Array<string>
}

export enum ExternalId {
  ImdbId = 'imdb_id',
  Freebase_Id = 'freebase_mid',
  FreebaseId = 'freebase_id',
  TvdbId = 'tvdb_id',
  TvrageId = 'tvrage_id',
  FacebookId = 'facebook_id',
  TwitterId = 'twitter_id',
  InstagramId = 'instagram_id',
}

export interface ConfigurationResponse extends Response {
  change_keys: string[]
  images: {
    base_url?: string
    secure_base_url?: string
    backdrop_sizes?: string[]
    logo_sizes?: string[]
    poster_sizes?: string[]
    profile_sizes?: string[]
    still_sizes?: string[]
  }
}

export enum ExternalSource {
  ImdbId = 'imdb_id',
  FreebaseMid = 'freebase_mid',
  FreebaseId = 'freebase_id',
  TvdbId = 'tvdb_id',
  TvrageId = 'tvrage_id',
  FacebookId = 'facebook_id',
  TwitterId = 'twitter_id',
  InstagramId = 'instagram_id',
}

export interface FindRequest extends Request {
  id: ExternalId
  language?: string
  external_source?: 'imdb_id'|'freebase_mid'|'freebase_id'|'tvdb_id'|'tvrage_id'|'facebook_id'|'twitter_id'|'instagram_id'
}

export interface PaginatedResponse extends Response {
  page?: number
  total_results?: number
  total_pages?: number
}

export interface FindResponse extends Response {
  movie_results: Array<MovieResult>
  tv_results: Array<TvResult>
  person_results: Array<PersonResult>
  tv_episode_results: Array<object>
  tv_season_results: Array<object>
}

export interface SearchRequest extends RequestParams {
  query: string
  page?: number
}

export interface SearchResponse extends Response {
  page?: number
  results?: Array<object>
  total_pages?: number
  total_results?: number
}

export interface SearchCompanyResponse extends SearchResponse {
  results?: Array<{
    id?: number
    logo_path?: string
    name?: string
  }>
}

export interface SearchCollectionResponse extends SearchResponse {
  results?: Array<{
    id?: number
    backdrop_path?: string
    name?: string
    poster_path?: string
  }>
}

export interface SearchKeywordResponse extends SearchResponse {
  results?: Array<{
    id?: number
    name?: string
  }>
}

export interface SearchMovieRequest extends SearchRequest {
  include_adult?: boolean
  region?: string
  year?: number
  primary_release_year?: number
}

export interface SearchMovieResponse extends SearchResponse {
  results?: Array<MovieResult>
}

export interface SearchMultiRequest extends SearchRequest {
  include_adult?: boolean
  region?: string
}

export interface SearchMultiResponse extends SearchResponse {
  results?: Array<MovieResult|TvResult|PersonResult>
}

export interface SearchPersonResponse extends SearchResponse {
  results?: Array<PersonResult>
}

export interface SearchTvRequest extends SearchRequest {
  include_adult?: boolean
  first_air_date_year?: number
}

export interface SearchTvResponse extends SearchResponse {
  results?: Array<TvResult>
}

export interface CollectionRequest extends RequestParams {
  id: number
}

export interface CollectionInfoResponse extends Response {
  id?: number
  name?: string
  overview?: string
  poster_path?: null
  backdrop_path?: string
  parts?: Array<{
    adult?: boolean
    backdrop_path?: null
    genre_ids?: number[]
    id?: number
    original_language?: string
    original_title?: string
    overview?: string
    release_date?: string
    poster_path?: string
    popularity?: number
    title?: string
    video?: boolean
    vote_average?: number
    vote_count?: number
  }>
}

export interface CollectionImagesResponse extends Response {
  id?: number
  backdrops?: Array<{
    aspect_ratio?: number
    file_path?: string
    height?: number
    iso_639_1?: null
    vote_average?: number
    vote_count?: number
    width?: number
  }>
  posters?: Array<{
    aspect_ratio?: number
    file_path?: string
    height?: number
    iso_639_1?: string
    vote_average?: number
    vote_count?: number
    width?: number
  }>
}

export interface CollectionTranslationsResponse extends Response {
  id?: number
  translations?: Array<{
    iso_3166_1?: string
    iso_639_1?: string
    name?: string
    english_name?: string
    data?: {
      title?: string
      overview?: string
      homepage?: string
    }
  }>
}

export interface DiscoverMovieRequest extends RequestParams {
  region?: string
  sort_by?: 'popularity.asc'|'popularity.desc'|'release_date.asc'|'release_date.desc'|'revenue.asc'|'revenue.desc'|'primary_release_date.asc'|'primary_release_date.desc'|'original_title.asc'|'original_title.desc'|'vote_average.asc'|'vote_average.desc'|'vote_count.asc'|'vote_count.desc'
  certification_country?: string
  certification?: string
  'certification.lte'?: string
  'certification.gte'?: string
  include_adult?: boolean
  include_video?: boolean
  page?: number
  primary_release_year?: number
  'primary_release_date.gte'?: string
  'primary_release_date.lte'?: string
  'release_date.gte?': string
  'release_date.lte'?: string
  with_release_type?: number
  year?: number
  'vote_count.gte'?: number
  'vote_count.lte'?: number
  'vote_average.gte'?: number
  'vote_average.lte'?: number
  with_cast?: string
  with_crew?: string
  with_people?: string
  with_companies?: string
  with_genres?: string
  without_genres?: string
  with_keywords?: string
  without_keywords?: string
  'with_runtime.gte'?: number
  'with_runtime.lte'?: number
  with_original_language?: string
}

export interface DiscoverMovieResponse extends PaginatedResponse {
  results?: Array<MovieResult>
}

export interface DiscoverTvRequest extends RequestParams {
  sort_by?: string
  'air_date.gte?': string
  'air_date.lte?': string
  'first_air_date.gte'?: string
  'first_air_date.lte'?: string
  first_air_date_year?: number
  page?: number
  timezone?: string
  'vote_average.gte'?: number
  'vote_count.gte'?: number
  with_genres?: string
  with_networks?: string
  without_genres?: string
  'with_runtime.gte'?: number
  'with_runtime.lte'?: number
  include_null_first_air_dates?: boolean
  with_original_language?: string
  without_keywords?: string
  screened_theatrically?: boolean
  with_companies?: string
  with_keywords?: string
}

export interface DiscoverTvResponse extends PaginatedResponse {
  results?: Array<TvResult>
}

export interface TrendingRequest extends RequestParams {
  media_type: 'all'|'movie'|'tv'|'person'
  time_window: 'day'|'week'
}

export interface TrendingResponse extends PaginatedResponse {
  results?: Array<MovieResult|TvResult|PersonResult>
}

export interface MovieResponse extends Response {
  adult?: boolean
  backdrop_path?: string
  belongs_to_collection?: object
  budget?: number
  genres?: Genre
  homepage?: string
  id?: number
  imdb_id?: string
  original_language?: string
  original_title?: string
  overview?: string
  popularity?: number
  poster_path?: string
  production_companies?: Array<ProductionCompany>
  production_countries?: Array<ProductionCountry>
  release_date?: string
  revenue?: number
  runtime?: number
  spoken_languages?: Array<SpokenLanguage>
  status?: 'Rumored'|'Planned'|'In Production'|'Post Production'|'Released'|'Canceled'
  tagline?: string
  title?: string
  video?: boolean
  vote_average?: number
  vote_count?: number
}

export interface MovieAccountStateResponse extends Response {
  id?: number
  favorite?: boolean
  rated?: object|boolean
  watchlist?: boolean
}

export interface MovieAlternativeTitlesRequest extends IdRequestParams {
  country?: string
}

export interface MovieAlternativeTitlesResponse extends Response {
  id?: number
  titles?: Array<{
    iso_3166_1?: string
    title?: string
    type?: string
  }>
}