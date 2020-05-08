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
    configuration(options) {
        return this.makeRequest(types_1.HttpMethod.Get, 'configuration', null, options);
    }
    find(params, options) {
        return this.makeRequest(types_1.HttpMethod.Get, 'find/:id', params, options);
    }
    searchCompany(params, options) {
        return this.makeRequest(types_1.HttpMethod.Get, 'search/company', params, options);
    }
    searchCollection(params, options) {
        return this.makeRequest(types_1.HttpMethod.Get, 'search/collection', params, options);
    }
    searchKeyword(params, options) {
        return this.makeRequest(types_1.HttpMethod.Get, 'search/keyword', params, options);
    }
    searchMovie(params, options) {
        return this.makeRequest(types_1.HttpMethod.Get, 'search/movie', params, options);
    }
    searchTv(params, options) {
        return this.makeRequest(types_1.HttpMethod.Get, 'search/tv', params, options);
    }
    searchMulti(params, options) {
        return this.makeRequest(types_1.HttpMethod.Get, 'search/multi', params, options);
    }
    searchPerson(params, options) {
        return this.makeRequest(types_1.HttpMethod.Get, 'search/person', params, options);
    }
    searchList(params, options) {
        return this.makeRequest(types_1.HttpMethod.Get, 'search/list', params, options);
    }
    collectionInfo(params, options) {
        return this.makeRequest(types_1.HttpMethod.Get, 'collection/:id', params, options);
    }
    collectionImages(params, options) {
        return this.makeRequest(types_1.HttpMethod.Get, 'collection/:id/images', params, options);
    }
    collectionTranslations(params, options) {
        return this.makeRequest(types_1.HttpMethod.Get, 'collection/:id/translations', params, options);
    }
    discoverMovie(params, options) {
        return this.makeRequest(types_1.HttpMethod.Get, 'discover/movie', params, options);
    }
    discoverTv(params, options) {
        return this.makeRequest(types_1.HttpMethod.Get, 'discover/tv', params, options);
    }
    trending(params, options) {
        return this.makeRequest(types_1.HttpMethod.Get, 'trending/:media_type/:time_window', params, options);
    }
    movieInfo(params, options) {
        return this.makeRequest(types_1.HttpMethod.Get, 'movie/:id', params, options);
    }
    movieAlternativeTitles(params, options) {
        return this.makeRequest(types_1.HttpMethod.Get, 'movie/:id/alternative_titles', params, options);
    }
    movieCredits(params, options) {
        return this.makeRequest(types_1.HttpMethod.Get, 'movie/:id/credits', params, options);
    }
    movieExternalIds(params, options) {
        return this.makeRequest(types_1.HttpMethod.Get, '/movie/:id/external_ids', params, options);
    }
    movieImages(params, options) {
        return this.makeRequest(types_1.HttpMethod.Get, 'movie/:id/images', params, options);
    }
    movieVideos(params, options) {
        return this.makeRequest(types_1.HttpMethod.Get, 'movie/:id/videos', params, options);
    }
    movieKeywords(params, options) {
        return this.makeRequest(types_1.HttpMethod.Get, 'movie/:id/keywords', params, options);
    }
    movieRecommendations(params, options) {
        return this.makeRequest(types_1.HttpMethod.Get, 'movie/:id/recommendations', params, options);
    }
    movieReleases(params, options) {
        return this.makeRequest(types_1.HttpMethod.Get, 'movie/:id/releases', params, options);
    }
    movieReleaseDates(params, options) {
        return this.makeRequest(types_1.HttpMethod.Get, 'movie/:id/release_dates', params, options);
    }
    movieTrailers(params, options) {
        return this.makeRequest(types_1.HttpMethod.Get, 'movie/:id/trailers', params, options);
    }
    movieTranslations(params, options) {
        return this.makeRequest(types_1.HttpMethod.Get, 'movie/:id/translations', params, options);
    }
    movieSimilar(params, options) {
        return this.makeRequest(types_1.HttpMethod.Get, 'movie/:id/similar', params, options);
    }
    movieReviews(params, options) {
        return this.makeRequest(types_1.HttpMethod.Get, 'movie/:id/reviews', params, options);
    }
    movieLists(params, options) {
        return this.makeRequest(types_1.HttpMethod.Get, 'movie/:id/lists', params, options);
    }
    movieChanges(params, options) {
        return this.makeRequest(types_1.HttpMethod.Get, 'movie/:id/changes', params, options);
    }
    movieRatingUpdate(params, options) {
        return this.makeRequest(types_1.HttpMethod.Post, 'movie/:id/rating', params, options);
    }
    tvInfo(params, options) {
        return this.makeRequest(types_1.HttpMethod.Get, 'tv/:id', params, options);
    }
    tvAlternativeTitles(params, options) {
        return this.makeRequest(types_1.HttpMethod.Get, 'tv/:id/alternative_titles', params, options);
    }
    tvContentRatings(params, options) {
        return this.makeRequest(types_1.HttpMethod.Get, 'tv/:id/content_ratings', params, options);
    }
    tvCredits(params, options) {
        return this.makeRequest(types_1.HttpMethod.Get, 'tv/:id/credits', params, options);
    }
    tvEpisodeGroups(params, options) {
        return this.makeRequest(types_1.HttpMethod.Get, 'tv/:id/episode_groups', params, options);
    }
    tvExternalIds(params, options) {
        return this.makeRequest(types_1.HttpMethod.Get, 'tv/:id/external_ids', params, options);
    }
    tvImages(params, options) {
        return this.makeRequest(types_1.HttpMethod.Get, 'tv/:id/images', params, options);
    }
    tvKeywords(params, options) {
        return this.makeRequest(types_1.HttpMethod.Get, 'tv/:id/keywords', params, options);
    }
    tvVideos(params, options) {
        return this.makeRequest(types_1.HttpMethod.Get, 'tv/:id/videos', params, options);
    }
    tvScreenedTheatrically(params, options) {
        return this.makeRequest(types_1.HttpMethod.Get, 'tv/:id/screened_theatrically', params, options);
    }
    tvReviews(params, options) {
        return this.makeRequest(types_1.HttpMethod.Get, 'tv/:id/reviews', params, options);
    }
    tvSimilar(params, options) {
        return this.makeRequest(types_1.HttpMethod.Get, 'tv/:id/similar', params, options);
    }
    tvTranslations(params, options) {
        return this.makeRequest(types_1.HttpMethod.Get, 'tv/:id/translations', params, options);
    }
    tvSeasonInfo(params, options) {
        return this.makeRequest(types_1.HttpMethod.Get, 'tv/:id/season/:season_number', params, options);
    }
    tvSeasonCredits(params, options) {
        return this.makeRequest(types_1.HttpMethod.Get, 'tv/:id/season/:season_number/credits', params, options);
    }
    tvSeasonVideos(params, options) {
        return this.makeRequest(types_1.HttpMethod.Get, 'tv/:id/season/:season_number/videos', params, options);
    }
    tvSeasonExternalIds(params, options) {
        return this.makeRequest(types_1.HttpMethod.Get, 'tv/:id/season/:season_number/external_ids', params, options);
    }
    tvSeasonImages(params, options) {
        return this.makeRequest(types_1.HttpMethod.Get, 'tv/:id/season/:season_number/images', params, options);
    }
    tvEpisodeInfo(params, options) {
        return this.makeRequest(types_1.HttpMethod.Get, 'tv/:id/season/:season_number/episode/:episode_number', params, options);
    }
    tvEpisodeCredits(params, options) {
        return this.makeRequest(types_1.HttpMethod.Get, 'tv/:id/season/:season_number/episode/:episode_number/credits', params, options);
    }
    tvEpisodeExternalIds(params, options) {
        return this.makeRequest(types_1.HttpMethod.Get, 'tv/:id/season/:season_number/episode/:episode_number/external_ids', params, options);
    }
    tvEpisodeImages(params, options) {
        return this.makeRequest(types_1.HttpMethod.Get, 'tv/:id/season/:season_number/episode/:episode_number/images', params, options);
    }
    tvOnTheAir(params, options) {
        return this.makeRequest(types_1.HttpMethod.Get, 'tv/on_the_air', params, options);
    }
    tvAiringToday(params, options) {
        return this.makeRequest(types_1.HttpMethod.Get, 'tv/airing_today', params, options);
    }
    tvRecommendations(params, options) {
        return this.makeRequest(types_1.HttpMethod.Get, 'tv/:id/recommendations', params, options);
    }
    tvChanges(params, options) {
        return this.makeRequest(types_1.HttpMethod.Get, 'tv/:id/changes', params, options);
    }
    tvRatingUpdate(params, options) {
        return this.makeRequest(types_1.HttpMethod.Post, 'tv/:id/rating', params, options);
    }
    personInfo(params, options) {
        return this.makeRequest(types_1.HttpMethod.Get, 'person/:id', params, options);
    }
    personChanges(params, options) {
        return this.makeRequest(types_1.HttpMethod.Get, 'person/:id/changes', params, options);
    }
    personMovieCredits(params, options) {
        return this.makeRequest(types_1.HttpMethod.Get, 'person/:id/movie_credits', params, options);
    }
    personTvCredits(params, options) {
        return this.makeRequest(types_1.HttpMethod.Get, 'person/:id/tv_credits', params, options);
    }
    personCombinedCredits(params, options) {
        return this.makeRequest(types_1.HttpMethod.Get, 'person/:id/combined_credits', params, options);
    }
    personExternalIds(params, options) {
        return this.makeRequest(types_1.HttpMethod.Get, 'person/:id/external_ids', params, options);
    }
    personImages(params, options) {
        return this.makeRequest(types_1.HttpMethod.Get, 'person/:id/images', params, options);
    }
    personTaggedImages(params, options) {
        return this.makeRequest(types_1.HttpMethod.Get, 'person/:id/tagged_images', params, options);
    }
    personTranslations(params, options) {
        return this.makeRequest(types_1.HttpMethod.Get, 'person/:id/translations', params, options);
    }
    personLatest(params, options) {
        return this.makeRequest(types_1.HttpMethod.Get, 'person/latest', params, options);
    }
    personPopular(params, options) {
        return this.makeRequest(types_1.HttpMethod.Get, 'person/popular', params, options);
    }
    creditInfo(params, options) {
        return this.makeRequest(types_1.HttpMethod.Get, 'credit/:id', params, options);
    }
    listInfo(params, options) {
        return this.makeRequest(types_1.HttpMethod.Get, 'list/:id', params, options);
    }
    genreMovieList(params, options) {
        return this.makeRequest(types_1.HttpMethod.Get, 'genre/movie/list', params, options);
    }
    genreTvList(params, options) {
        return this.makeRequest(types_1.HttpMethod.Get, 'genre/tv/list', params, options);
    }
    keywordInfo(params, options) {
        return this.makeRequest(types_1.HttpMethod.Get, 'keyword/:id', params, options);
    }
    keywordMovies(params, options) {
        return this.makeRequest(types_1.HttpMethod.Get, 'keyword/:id/movies', params, options);
    }
    companyInfo(params, options) {
        return this.makeRequest(types_1.HttpMethod.Get, 'company/:id', params, options);
    }
    companyAlternativeNames(params, options) {
        return this.makeRequest(types_1.HttpMethod.Get, 'company/:id/alternative_names', params, options);
    }
    companyImages(params, options) {
        return this.makeRequest(types_1.HttpMethod.Get, 'company/:id/images', params, options);
    }
    accountInfo(params, options) {
        return this.makeRequest(types_1.HttpMethod.Get, 'account', params, options);
    }
    accountLists(params, options) {
        return this.makeRequest(types_1.HttpMethod.Get, 'account/:id/lists', params, options);
    }
    accountFavoriteMovies(params, options) {
        return this.makeRequest(types_1.HttpMethod.Get, 'account/:id/favorite/movies', params, options);
    }
    accountFavoriteUpdate(params, options) {
        return this.makeRequest(types_1.HttpMethod.Post, 'account/:id/favorite', params, options);
    }
    accountRatedMovies(params, options) {
        return this.makeRequest(types_1.HttpMethod.Get, 'account/:id/rated/movies', params, options);
    }
    accountMovieWatchlist(params, options) {
        return this.makeRequest(types_1.HttpMethod.Get, 'account/:id/watchlist/movies', params, options);
    }
    accountTvWatchlist(params, options) {
        return this.makeRequest(types_1.HttpMethod.Get, 'account/:id/watchlist/tv', params, options);
    }
    accountWatchlistUpdate(params, options) {
        return this.makeRequest(types_1.HttpMethod.Post, 'account/:id/watchlist', params, options);
    }
    accountRatedTv(params, options) {
        return this.makeRequest(types_1.HttpMethod.Get, 'account/:id/rated/tv', params, options);
    }
    accountRatedTvEpisodes(params, options) {
        return this.makeRequest(types_1.HttpMethod.Get, 'account/:id/rated/tv/episodes', params, options);
    }
    accountFavoriteTv(params, options) {
        return this.makeRequest(types_1.HttpMethod.Get, 'account/:id/favorite/tv', params, options);
    }
    miscLatestMovies(params, options) {
        return this.makeRequest(types_1.HttpMethod.Get, 'movie/latest', params, options);
    }
    miscNowPlayingMovies(params, options) {
        return this.makeRequest(types_1.HttpMethod.Get, 'movie/now_playing', params, options);
    }
    miscPopularMovies(params, options) {
        return this.makeRequest(types_1.HttpMethod.Get, 'movie/popular', params, options);
    }
    miscTopRatedMovies(params, options) {
        return this.makeRequest(types_1.HttpMethod.Get, 'movie/top_rated', params, options);
    }
    miscUpcomingMovies(params, options) {
        return this.makeRequest(types_1.HttpMethod.Get, 'movie/upcoming', params, options);
    }
    miscChangedMovies(params, options) {
        return this.makeRequest(types_1.HttpMethod.Get, 'movie/changes', params, options);
    }
    miscChangedTvs(params, options) {
        return this.makeRequest(types_1.HttpMethod.Get, 'tv/changes', params, options);
    }
    miscChangedPeople(params, options) {
        return this.makeRequest(types_1.HttpMethod.Get, 'person/changes', params, options);
    }
    miscLatestTvs(params, options) {
        return this.makeRequest(types_1.HttpMethod.Get, 'tv/latest', params, options);
    }
    miscPopularTvs(params, options) {
        return this.makeRequest(types_1.HttpMethod.Get, 'tv/popular', params, options);
    }
    miscTopRatedTvs(params, options) {
        return this.makeRequest(types_1.HttpMethod.Get, 'tv/top_rated', params, options);
    }
}
exports.MovieDb = MovieDb;
