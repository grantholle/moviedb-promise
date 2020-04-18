"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
const lodash_1 = require("lodash");
const types_1 = require("./types");
class MovieDb {
    constructor(apiKey, options = {
        useDefaultLimits: false,
        baseUrl: 'https://api.themoviedb.org/3/'
    }) {
        this.apiKey = apiKey;
        this.options = options;
        if (this.options.useDefaultLimits) {
            this.limit = {
                remaining: 40,
                reset: Date.now() + 10 * 1000
            };
            this.requestQueue = [];
            this.requestLimitTimeout = undefined;
        }
        this.checkQueue = this.checkQueue.bind(this);
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
     *
     * @returns {Promise}
     */
    async session() {
        // const token = await this.requestToken()
        // const res = await this.makeRequest(HttpMethod.Get, { request_token: token.request_token }, endpoints.authentication.session)
        // this.sessionId = res.session_id
        return this.sessionId;
    }
    async checkQueue() {
        // if (!this.requestQueue.length) {
        //   return
        // }
        // clearTimeout(this.requestLimitTimeout)
        // let delay = this.limit.reset - Date.now()
        // if (delay > 0) {
        //   this.requestLimitTimeout = setTimeout(this.checkQueue, delay)
        // } else {
        //   this.limit.remaining = 40
        // }
        // if (this.limit.remaining > 0) {
        //   for (let i = 0; i < this.limit.remaining; i++) {
        //     let sendRequest = this.requestQueue.shift()
        //     if (sendRequest) {
        //       sendRequest.start(sendRequest.resolve, sendRequest.reject)
        //     }
        //   }
        //   setTimeout(this.checkQueue)
        // }
        return this.makeRequest;
    }
    prepareEndpoint(endpoint, params = {}) {
        // Some endpoints have an optional account_id parameter (when there's a session).
        // If it's not included, assume we want the current user's id,
        // which is setting it to '{account_id}'
        if (endpoint.includes(':id') && lodash_1.isEmpty(params) && this.sessionId) {
            params = {
                id: '{account_id}'
            };
        }
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
    async makeRequest(method, endpoint, params = {}, options = {}) {
        console.log('make request');
        if (this.options.useDefaultLimits) {
            if (this.limit.remaining <= 0) {
                // this.requestQueue.push({
                //   start: createAndStartRequest,
                //   resolve,
                //   reject
                // })
                return this.checkQueue();
            }
            this.limit.remaining--;
        }
        const preparedEndpoint = this.prepareEndpoint(endpoint, params);
        if (lodash_1.isString(params)) {
            params = {};
        }
        // Get the params that were needed for the endpoint
        // to remove from the data/params of the request
        const omittedProps = (endpoint.match(/:[a-z]/gi) || []).map(prop => prop.substr(1));
        // const query
        const request = axios_1.default.create({});
        //     let req = request(type, this.baseUrl + endpoint)
        //     if (this.apiKey) {
        //       req.query({ api_key: this.apiKey })
        //     }
        //     if (this.sessionId) {
        //       req.query({ session_id: this.sessionId })
        //     }
        //     if (appendToResponse) {
        //       req.query({ append_to_response: appendToResponse })
        //     }
        //     if (timeout) {
        //       req.timeout(timeout)
        //     }
        //     req[type === 'GET' ? 'query' : 'send'](params)
        //     req.end((err, res) => {
        //       if (err) {
        //         if (this.useDefaultLimits && err.status == 429) {
        //           // if we exceed the request limit, we won't receive x-ratelimit-reset anymore
        //           // this is only a fallback and should never happen
        //           if (!this.limit.reset || this.limit.reset < Date.now()) {
        //             let retryAfter = parseInt(res.header['retry-after'])
        //             this.limit.reset = Date.now() + (retryAfter <= 0 ? 0.5 : retryAfter) * 1000
        //           }
        //           this.requestQueue.push({
        //             start: createAndStartRequest,
        //             resolve,
        //             reject
        //           })
        //           return this.checkQueue()
        //         }
        //         return reject(err)
        //       }
        //       if (this.useDefaultLimits) {
        //         this.limit.remaining = parseInt(res.header['x-ratelimit-remaining'])
        //         this.limit.reset = parseInt(res.header['x-ratelimit-reset']) * 1000
        //       }
        //       resolve(res.body, res)
        //     })
    }
}
exports.MovieDb = MovieDb;
