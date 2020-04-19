"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
const lodash_1 = require("lodash");
const types_1 = require("./types");
class MovieDb {
    constructor(apiKey, baseUrl = 'https://api.themoviedb.org/3/') {
        this.apiKey = apiKey;
        this.baseUrl = baseUrl;
    }
    /**
     * Gets an api token using an api key
     *
     * @returns {Promise}
     */
    async requestToken() {
        if (!this.token || Date.now() > new Date(this.token.expires_at).getTime()) {
            this.token = await this.makeRequest(types_1.HttpMethod.Get, 'authentication/token/new');
        }
        return this.token;
    }
    /**
     * Gets the session id
     */
    async session() {
        const token = await this.requestToken();
        const request = {
            request_token: token.request_token
        };
        const res = await this.makeRequest(types_1.HttpMethod.Get, 'authentication/session/new', request);
        this.sessionId = res.session_id;
        return this.sessionId;
    }
    /**
     * Compiles the endpoint based on the params
     */
    getEndpoint(endpoint, params = {}) {
        // Check params to see if params an object
        // and if there is only one parameter in the endpoint
        if (lodash_1.isString(params) && (endpoint.match(/:/g) || []).length === 1) {
            endpoint = endpoint.replace(/:[a-z]*/gi, params);
        }
        // Iterate the keys of params and replace the endpoint sections
        if (lodash_1.isObject(params) && !lodash_1.isEmpty(params)) {
            endpoint = Object.keys(params).reduce((compiled, key) => {
                return compiled.replace(`:${key}`, params[key]);
            }, endpoint);
        }
        if (lodash_1.isString(params)) {
            endpoint += (params.startsWith('?') ? '' : '?') + params;
        }
        return endpoint;
    }
    /**
     * Compiles the data/query data to send with the request
     */
    getParams(endpoint, params = {}, options = {}) {
        // Merge default parameters with the ones passed in
        const compiledParams = lodash_1.merge({
            api_key: this.apiKey,
            ...(this.sessionId && { session_id: this.sessionId }),
            ...(options.appendToResponse && { append_to_response: options.appendToResponse })
        }, lodash_1.isObject(params) ? params : {});
        // Some endpoints have an optional account_id parameter (when there's a session).
        // If it's not included, assume we want the current user's id,
        // which is setting it to '{account_id}'
        if (endpoint.includes(':id') && lodash_1.isEmpty(params) && this.sessionId) {
            compiledParams.id = '{account_id}';
        }
        // Get the params that were needed for the endpoint
        // to remove from the data/params of the request
        const omittedProps = (endpoint.match(/:[a-z]/gi) || [])
            .map(prop => prop.substr(1));
        // Prepare the query
        return lodash_1.omit(compiledParams, omittedProps);
    }
    /**
     * Performs the request to the server
     */
    async makeRequest(method, endpoint, params = {}, options = {}) {
        const query = this.getParams(endpoint, params, options);
        const request = {
            method,
            baseUrl: this.baseUrl,
            url: this.getEndpoint(endpoint, query),
            params: query,
            data: query,
            ...(options.timeout && { timeout: options.timeout })
        };
        const response = await axios_1.default.request(request);
        return response.data;
    }
}
exports.MovieDb = MovieDb;
