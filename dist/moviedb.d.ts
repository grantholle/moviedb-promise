import { MovieDbOptions, AuthenticationToken } from './types';
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
    private checkQueue;
    private prepareEndpoint;
    private makeRequest;
}
//# sourceMappingURL=moviedb.d.ts.map