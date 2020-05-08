export declare enum HttpMethod {
    Get = "get",
    Post = "post",
    Put = "put",
    Delete = "delete"
}
export interface Endpoint {
    readonly path: string;
    readonly verb: HttpMethod;
    readonly name?: string;
}
export interface EndpointGroup {
    readonly prefix: string;
    readonly endpoints: Array<Endpoint>;
}
export interface Request {
    id?: string | number;
    language?: string;
    request_token?: string;
}
export interface Response {
}
export interface AuthenticationToken extends Response {
    success?: boolean;
    expires_at?: string;
    request_token?: string;
}
export interface RequestParams {
    id?: string | number;
    language?: string;
}
export interface SessionRequestParams extends RequestParams {
    request_token: string;
}
export interface SessionResponse extends Response {
    session_id?: string;
}
export interface QueueItem {
    promiseGenerator: Function;
    resolve: Function;
    reject: Function;
}
export interface RequestOptions {
    appendToResponse?: string;
    timeout?: number;
}
//# sourceMappingURL=types.d.ts.map