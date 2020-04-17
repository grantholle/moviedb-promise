export enum HttpMethod {
  Get = 'get',
  Post = 'post',
  Put = 'put',
  Delete = 'delete',
}

export interface Endpoint {
  readonly path: string;
  readonly verb: HttpMethod;
  readonly name?: string;
}

export interface EndpointNamespace {
  readonly prefix: string;
  readonly endpoints: Array<Endpoint>;
}
