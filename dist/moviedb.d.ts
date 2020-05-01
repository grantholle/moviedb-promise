import { AuthenticationToken } from './types';
export declare class MovieDb {
    private apiKey;
    private token;
    baseUrl: string;
    sessionId: string;
    constructor(apiKey: string, baseUrl?: string);
    /**
     * Gets an api token using an api key
     *
     * @returns {Promise}
     */
    requestToken(): Promise<AuthenticationToken>;
    /**
     * Gets the session id
     */
    retrieveSession(): Promise<string>;
    /**
     * Compiles the endpoint based on the params
     */
    private getEndpoint;
    /**
     * Normalizes a request into a RequestParams object
     */
    private normalizeParams;
    /**
     * Normalizes request options
     */
    private normalizeOptions;
    /**
     * Compiles the data/query data to send with the request
     */
    private getParams;
    /**
     * Performs the request to the server
     */
    private makeRequest;
}
//# sourceMappingURL=moviedb.d.ts.map