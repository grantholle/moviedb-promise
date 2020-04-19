export enum HttpMethod {
  Get = 'get',
  Post = 'post',
  Put = 'put',
  Delete = 'delete',
}

export interface Endpoint {
  readonly path: string
  readonly verb: HttpMethod
  readonly name?: string
}

export interface Request {
  id: string|number
  language?: string
}

export interface EndpointGroup {
  readonly prefix: string
  readonly endpoints: Array<Endpoint>
}

export interface MovieDbOptions {
  baseUrl: string
  useDefaultLimits: boolean
}

export interface LimitOptions {
  remaining: number
  reset: number
}

export interface Response {}

export interface AuthenticationToken {
  success?: boolean
  expires_at?: string
  request_token?: string
}

export interface RequestOptions {
  appendToResponse?: string
  timeout?: number
}

export interface RequestParams {
  id?: string|number
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
