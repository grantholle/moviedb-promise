import { MovieDbOptions, HttpMethod, Response, AuthenticationToken, RequestOptions, RequestParams } from './types';
export declare class MovieDb {
    private apiKey;
    private token;
    private limit;
    private requestQueue;
    private requestLimitTimeout;
    options: MovieDbOptions;
    sessionId: string;
    constructor(apiKey: string, options?: MovieDbOptions);
    /**
     * Gets an api token using an api key
     *
     * @returns {Promise}
     */
    requestToken(): Promise<AuthenticationToken>;
    /**
     * Gets the session id
     *
     * @returns {Promise}
     */
    session(): Promise<string>;
    checkQueue(): Promise<(method: HttpMethod, endpoint: string, params?: string | RequestParams, options?: RequestOptions) => Promise<Response | AuthenticationToken>>;
    private prepareEndpoint;
    makeRequest(method: HttpMethod, endpoint: string, params?: string | RequestParams, options?: RequestOptions): Promise<AuthenticationToken | Response>;
}
//# sourceMappingURL=moviedb.d.ts.map