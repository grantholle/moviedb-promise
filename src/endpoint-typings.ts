import {
  Response,
  RequestOptions
 } from './types'

interface ConfigurationResponse extends Response {
  change_keys: Array<string>
  images: {
    base_url?: string
    secure_base_url?: string
    backdrop_sizes?: Array<string>
    logo_sizes?: Array<string>
    poster_sizes?: Array<string>
    profile_sizes?: Array<string>
    still_sizes?: Array<string>
  }
}

declare module './moviedb' {
  interface MovieDb {
    configuration(options?: RequestOptions): Promise<ConfigurationResponse>
  }
}
