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

export interface EndpointNamespace {
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

export interface AuthenticationToken {
  success?: boolean
  expires_at?: string
  request_token?: string
}
