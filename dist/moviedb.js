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
        this.requests = [];
        this.requesting = false;
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
    async retrieveSession() {
        const token = await this.requestToken();
        const request = {
            request_token: token.request_token
        };
        const res = await this.makeRequest(types_1.HttpMethod.Get, 'authentication/session/new', request);
        this.sessionId = res.session_id;
        return this.sessionId;
    }
    /**
     * Processes the next request in the request queue
     */
    dequeue() {
        if (this.requesting) {
            return;
        }
        const request = this.requests.shift();
        if (!request) {
            return;
        }
        this.requesting = true;
        request.promiseGenerator()
            .then(request.resolve)
            .catch(request.reject)
            .finally(() => {
            this.requesting = false;
            this.dequeue();
        });
    }
    /**
     * Compiles the endpoint based on the params
     */
    getEndpoint(endpoint, params = {}) {
        return Object.keys(params).reduce((compiled, key) => {
            return compiled.replace(`:${key}`, params[key]);
        }, endpoint);
    }
    /**
     * Normalizes a request into a RequestParams object
     */
    normalizeParams(endpoint, params = {}) {
        if (lodash_1.isObject(params)) {
            return params;
        }
        const matches = endpoint.match(/:[a-z]*/g) || [];
        if (matches.length === 1) {
            return matches.reduce((obj, match) => {
                obj[match.substr(1)] = params;
                return obj;
            }, {});
        }
        return {};
    }
    /**
     * Normalizes request options
     */
    normalizeOptions(options = {}) {
        if (lodash_1.isString(options)) {
            return { appendToResponse: options };
        }
        return options;
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
        }, params);
        // Some endpoints have an optional account_id parameter (when there's a session).
        // If it's not included, assume we want the current user's id,
        // which is setting it to '{account_id}'
        if (endpoint.includes(':id') && !compiledParams.id && this.sessionId) {
            compiledParams.id = '{account_id}';
        }
        return compiledParams;
    }
    /**
     * Performs the request to the server
     */
    makeRequest(method, endpoint, params = {}, options = {}) {
        const normalizedParams = this.normalizeParams(endpoint, params);
        const normalizedOptions = this.normalizeOptions(options);
        // Get the full query/data object
        const fullQuery = this.getParams(endpoint, normalizedParams, normalizedOptions);
        // Get the params that are needed for the endpoint
        // to remove from the data/params of the request
        const omittedProps = (endpoint.match(/:[a-z]*/gi) || [])
            .map(prop => prop.substr(1));
        // Prepare the query
        const query = lodash_1.omit(fullQuery, omittedProps);
        const request = {
            method,
            url: this.baseUrl + this.getEndpoint(endpoint, fullQuery),
            ...(method === types_1.HttpMethod.Get && { params: query }),
            ...(method !== types_1.HttpMethod.Get && { data: query }),
            ...(normalizedOptions.timeout && { timeout: normalizedOptions.timeout })
        };
        // Push the request to the queue
        return new Promise((resolve, reject) => {
            this.requests.push({
                promiseGenerator: () => axios_1.default.request(request).then(res => res.data),
                resolve,
                reject
            });
            this.dequeue();
        });
    }
}
exports.MovieDb = MovieDb;
