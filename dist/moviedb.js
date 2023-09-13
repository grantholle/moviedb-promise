"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MovieDb = void 0;
const axios_1 = __importDefault(require("axios"));
const lodash_1 = require("lodash");
const promise_throttle_1 = __importDefault(require("promise-throttle"));
const types_1 = require("./types");
class MovieDb {
    apiKey;
    token;
    queue;
    baseUrl;
    sessionId;
    constructor(apiKey, baseUrl = 'https://api.themoviedb.org/3/', requestsPerSecondLimit = 50) {
        this.apiKey = apiKey;
        this.baseUrl = baseUrl;
        this.queue = new promise_throttle_1.default({
            requestsPerSecond: requestsPerSecondLimit,
            promiseImplementation: Promise,
        });
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
            request_token: token.request_token,
        };
        const res = await this.makeRequest(types_1.HttpMethod.Get, 'authentication/session/new', request);
        this.sessionId = res.session_id;
        return this.sessionId;
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
        if ((0, lodash_1.isObject)(params)) {
            return params;
        }
        const matches = endpoint.match(/:[a-z]*/g) || [];
        if (matches.length === 1) {
            return matches.reduce((obj, match) => {
                obj[match.slice(1)] = params;
                return obj;
            }, {});
        }
        return {};
    }
    /**
     * Compiles the data/query data to send with the request
     */
    getParams(endpoint, params = {}) {
        // Merge default parameters with the ones passed in
        const compiledParams = (0, lodash_1.merge)({
            api_key: this.apiKey,
            ...(this.sessionId && { session_id: this.sessionId }),
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
    makeRequest(method, endpoint, params = {}, axiosConfig = {}) {
        const normalizedParams = this.normalizeParams(endpoint, params);
        // Get the full query/data object
        const fullQuery = this.getParams(endpoint, normalizedParams);
        // Get the params that are needed for the endpoint
        // to remove from the data/params of the request
        const omittedProps = [...(endpoint.match(/:[a-z]*/gi) ?? [])].map((prop) => prop.slice(1));
        // Prepare the query
        const query = (0, lodash_1.omit)(fullQuery, omittedProps);
        const request = {
            method,
            url: this.baseUrl + this.getEndpoint(endpoint, fullQuery),
            ...(method === types_1.HttpMethod.Get && { params: query }),
            ...(method !== types_1.HttpMethod.Get && { data: query }),
            ...axiosConfig,
        };
        return this.queue.add(async () => (await axios_1.default.request(request)).data);
    }
    parseSearchParams(params) {
        if ((0, lodash_1.isString)(params)) {
            return { query: params };
        }
        return params;
    }
    configuration(axiosConfig) {
        return this.makeRequest(types_1.HttpMethod.Get, 'configuration', null, axiosConfig);
    }
    countries(axiosConfig) {
        return this.makeRequest(types_1.HttpMethod.Get, 'configuration/countries', null, axiosConfig);
    }
    jobs(axiosConfig) {
        return this.makeRequest(types_1.HttpMethod.Get, 'configuration/jobs', null, axiosConfig);
    }
    languages(axiosConfig) {
        return this.makeRequest(types_1.HttpMethod.Get, 'configuration/languages', null, axiosConfig);
    }
    primaryTranslations(axiosConfig) {
        return this.makeRequest(types_1.HttpMethod.Get, 'configuration/primary_translations', null, axiosConfig);
    }
    timezones(axiosConfig) {
        return this.makeRequest(types_1.HttpMethod.Get, 'configuration/timezones', null, axiosConfig);
    }
    find(params, axiosConfig) {
        return this.makeRequest(types_1.HttpMethod.Get, 'find/:id', params, axiosConfig);
    }
    searchCompany(params, axiosConfig) {
        return this.makeRequest(types_1.HttpMethod.Get, 'search/company', this.parseSearchParams(params), axiosConfig);
    }
    searchCollection(params, axiosConfig) {
        return this.makeRequest(types_1.HttpMethod.Get, 'search/collection', this.parseSearchParams(params), axiosConfig);
    }
    searchKeyword(params, axiosConfig) {
        return this.makeRequest(types_1.HttpMethod.Get, 'search/keyword', this.parseSearchParams(params), axiosConfig);
    }
    searchMovie(params, axiosConfig) {
        return this.makeRequest(types_1.HttpMethod.Get, 'search/movie', this.parseSearchParams(params), axiosConfig);
    }
    searchMulti(params, axiosConfig) {
        return this.makeRequest(types_1.HttpMethod.Get, 'search/multi', this.parseSearchParams(params), axiosConfig);
    }
    searchPerson(params, axiosConfig) {
        return this.makeRequest(types_1.HttpMethod.Get, 'search/person', this.parseSearchParams(params), axiosConfig);
    }
    searchTv(params, axiosConfig) {
        return this.makeRequest(types_1.HttpMethod.Get, 'search/tv', this.parseSearchParams(params), axiosConfig);
    }
    // Doesn't exist in documentation, may be deprecated
    searchList(params, axiosConfig) {
        return this.makeRequest(types_1.HttpMethod.Get, 'search/list', params, axiosConfig);
    }
    collectionInfo(params, axiosConfig) {
        return this.makeRequest(types_1.HttpMethod.Get, 'collection/:id', params, axiosConfig);
    }
    collectionImages(params, axiosConfig) {
        return this.makeRequest(types_1.HttpMethod.Get, 'collection/:id/images', params, axiosConfig);
    }
    collectionTranslations(params, axiosConfig) {
        return this.makeRequest(types_1.HttpMethod.Get, 'collection/:id/translations', params, axiosConfig);
    }
    discoverMovie(params, axiosConfig) {
        return this.makeRequest(types_1.HttpMethod.Get, 'discover/movie', params, axiosConfig);
    }
    discoverTv(params, axiosConfig) {
        return this.makeRequest(types_1.HttpMethod.Get, 'discover/tv', params, axiosConfig);
    }
    trending(params, axiosConfig) {
        return this.makeRequest(types_1.HttpMethod.Get, 'trending/:media_type/:time_window', params, axiosConfig);
    }
    movieInfo(params, axiosConfig) {
        return this.makeRequest(types_1.HttpMethod.Get, 'movie/:id', params, axiosConfig);
    }
    movieAccountStates(params, axiosConfig) {
        return this.makeRequest(types_1.HttpMethod.Get, 'movie/:id/account_states', params, axiosConfig);
    }
    movieAlternativeTitles(params, axiosConfig) {
        return this.makeRequest(types_1.HttpMethod.Get, 'movie/:id/alternative_titles', params, axiosConfig);
    }
    movieChanges(params, axiosConfig) {
        return this.makeRequest(types_1.HttpMethod.Get, 'movie/:id/changes', params, axiosConfig);
    }
    movieCredits(params, axiosConfig) {
        return this.makeRequest(types_1.HttpMethod.Get, 'movie/:id/credits', params, axiosConfig);
    }
    movieExternalIds(params, axiosConfig) {
        return this.makeRequest(types_1.HttpMethod.Get, 'movie/:id/external_ids', params, axiosConfig);
    }
    movieImages(params, axiosConfig) {
        return this.makeRequest(types_1.HttpMethod.Get, 'movie/:id/images', params, axiosConfig);
    }
    movieKeywords(params, axiosConfig) {
        return this.makeRequest(types_1.HttpMethod.Get, 'movie/:id/keywords', params, axiosConfig);
    }
    movieReleaseDates(params, axiosConfig) {
        return this.makeRequest(types_1.HttpMethod.Get, 'movie/:id/release_dates', params, axiosConfig);
    }
    movieVideos(params, axiosConfig) {
        return this.makeRequest(types_1.HttpMethod.Get, 'movie/:id/videos', params, axiosConfig);
    }
    movieWatchProviders(params, axiosConfig) {
        return this.makeRequest(types_1.HttpMethod.Get, 'movie/:id/watch/providers', params, axiosConfig);
    }
    movieWatchProviderList(params, axiosConfig) {
        return this.makeRequest(types_1.HttpMethod.Get, 'watch/providers/movie', params, axiosConfig);
    }
    movieTranslations(params, axiosConfig) {
        return this.makeRequest(types_1.HttpMethod.Get, 'movie/:id/translations', params, axiosConfig);
    }
    movieRecommendations(params, axiosConfig) {
        return this.makeRequest(types_1.HttpMethod.Get, 'movie/:id/recommendations', params, axiosConfig);
    }
    movieSimilar(params, axiosConfig) {
        return this.makeRequest(types_1.HttpMethod.Get, 'movie/:id/similar', params, axiosConfig);
    }
    movieReviews(params, axiosConfig) {
        return this.makeRequest(types_1.HttpMethod.Get, 'movie/:id/reviews', params, axiosConfig);
    }
    movieLists(params, axiosConfig) {
        return this.makeRequest(types_1.HttpMethod.Get, 'movie/:id/lists', params, axiosConfig);
    }
    movieRatingUpdate(params, axiosConfig) {
        return this.makeRequest(types_1.HttpMethod.Post, 'movie/:id/rating', params, axiosConfig);
    }
    movieRatingDelete(params, axiosConfig) {
        return this.makeRequest(types_1.HttpMethod.Delete, 'movie/:id/rating', params, axiosConfig);
    }
    movieLatest(params, axiosConfig) {
        return this.makeRequest(types_1.HttpMethod.Get, 'movie/latest', (0, lodash_1.isString)(params) ? { language: params } : params, axiosConfig);
    }
    movieNowPlaying(params, axiosConfig) {
        return this.makeRequest(types_1.HttpMethod.Get, 'movie/now_playing', params, axiosConfig);
    }
    moviePopular(params, axiosConfig) {
        return this.makeRequest(types_1.HttpMethod.Get, 'movie/popular', params, axiosConfig);
    }
    movieTopRated(params, axiosConfig) {
        return this.makeRequest(types_1.HttpMethod.Get, 'movie/top_rated', params, axiosConfig);
    }
    upcomingMovies(params, axiosConfig) {
        return this.makeRequest(types_1.HttpMethod.Get, 'movie/upcoming', params, axiosConfig);
    }
    tvInfo(params, axiosConfig) {
        return this.makeRequest(types_1.HttpMethod.Get, 'tv/:id', params, axiosConfig);
    }
    tvAccountStates(params, axiosConfig) {
        return this.makeRequest(types_1.HttpMethod.Get, 'tv/:id/account_states', params, axiosConfig);
    }
    tvAlternativeTitles(params, axiosConfig) {
        return this.makeRequest(types_1.HttpMethod.Get, 'tv/:id/alternative_titles', params, axiosConfig);
    }
    tvChanges(params, axiosConfig) {
        return this.makeRequest(types_1.HttpMethod.Get, 'tv/:id/changes', params, axiosConfig);
    }
    tvContentRatings(params, axiosConfig) {
        return this.makeRequest(types_1.HttpMethod.Get, 'tv/:id/content_ratings', params, axiosConfig);
    }
    tvCredits(params, axiosConfig) {
        return this.makeRequest(types_1.HttpMethod.Get, 'tv/:id/credits', params, axiosConfig);
    }
    tvAggregateCredits(params, axiosConfig) {
        return this.makeRequest(types_1.HttpMethod.Get, 'tv/:id/aggregate_credits', params, axiosConfig);
    }
    episodeGroups(params, axiosConfig) {
        return this.makeRequest(types_1.HttpMethod.Get, 'tv/:id/episode_groups', params, axiosConfig);
    }
    tvExternalIds(params, axiosConfig) {
        return this.makeRequest(types_1.HttpMethod.Get, 'tv/:id/external_ids', params, axiosConfig);
    }
    tvImages(params, axiosConfig) {
        return this.makeRequest(types_1.HttpMethod.Get, 'tv/:id/images', params, axiosConfig);
    }
    tvKeywords(params, axiosConfig) {
        return this.makeRequest(types_1.HttpMethod.Get, 'tv/:id/keywords', params, axiosConfig);
    }
    tvRecommendations(params, axiosConfig) {
        return this.makeRequest(types_1.HttpMethod.Get, 'tv/:id/recommendations', params, axiosConfig);
    }
    tvReviews(params, axiosConfig) {
        return this.makeRequest(types_1.HttpMethod.Get, 'tv/:id/reviews', params, axiosConfig);
    }
    tvScreenedTheatrically(params, axiosConfig) {
        return this.makeRequest(types_1.HttpMethod.Get, 'tv/:id/screened_theatrically', params, axiosConfig);
    }
    tvSimilar(params, axiosConfig) {
        return this.makeRequest(types_1.HttpMethod.Get, 'tv/:id/similar', params, axiosConfig);
    }
    tvTranslations(params, axiosConfig) {
        return this.makeRequest(types_1.HttpMethod.Get, 'tv/:id/translations', params, axiosConfig);
    }
    tvVideos(params, axiosConfig) {
        return this.makeRequest(types_1.HttpMethod.Get, 'tv/:id/videos', params, axiosConfig);
    }
    tvWatchProviders(params, axiosConfig) {
        return this.makeRequest(types_1.HttpMethod.Get, 'tv/:id/watch/providers', params, axiosConfig);
    }
    tvWatchProviderList(params, axiosConfig) {
        return this.makeRequest(types_1.HttpMethod.Get, 'watch/providers/tv', params, axiosConfig);
    }
    tvRatingUpdate(params, axiosConfig) {
        return this.makeRequest(types_1.HttpMethod.Post, 'tv/:id/rating', params, axiosConfig);
    }
    tvRatingDelete(params, axiosConfig) {
        return this.makeRequest(types_1.HttpMethod.Delete, 'tv/:id/rating', params, axiosConfig);
    }
    tvLatest(params, axiosConfig) {
        return this.makeRequest(types_1.HttpMethod.Get, 'tv/latest', params, axiosConfig);
    }
    tvAiringToday(params, axiosConfig) {
        return this.makeRequest(types_1.HttpMethod.Get, 'tv/airing_today', params, axiosConfig);
    }
    tvOnTheAir(params, axiosConfig) {
        return this.makeRequest(types_1.HttpMethod.Get, 'tv/on_the_air', params, axiosConfig);
    }
    tvPopular(params, axiosConfig) {
        return this.makeRequest(types_1.HttpMethod.Get, 'tv/popular', params, axiosConfig);
    }
    tvTopRated(params, axiosConfig) {
        return this.makeRequest(types_1.HttpMethod.Get, 'tv/top_rated', params, axiosConfig);
    }
    seasonInfo(params, axiosConfig) {
        return this.makeRequest(types_1.HttpMethod.Get, 'tv/:id/season/:season_number', params, axiosConfig);
    }
    seasonChanges(params, axiosConfig) {
        return this.makeRequest(types_1.HttpMethod.Get, 'tv/season/:id/changes', params, axiosConfig);
    }
    seasonAccountStates(params, axiosConfig) {
        return this.makeRequest(types_1.HttpMethod.Get, 'tv/:id/season/:season_number/account_states', params, axiosConfig);
    }
    seasonCredits(params, axiosConfig) {
        return this.makeRequest(types_1.HttpMethod.Get, 'tv/:id/season/:season_number/credits', params, axiosConfig);
    }
    seasonAggregateCredits(params, axiosConfig) {
        return this.makeRequest(types_1.HttpMethod.Get, 'tv/:id/season/:season_number/aggregate_credits', params, axiosConfig);
    }
    seasonExternalIds(params, axiosConfig) {
        return this.makeRequest(types_1.HttpMethod.Get, 'tv/:id/season/:season_number/external_ids', params, axiosConfig);
    }
    seasonImages(params, axiosConfig) {
        return this.makeRequest(types_1.HttpMethod.Get, 'tv/:id/season/:season_number/images', params, axiosConfig);
    }
    seasonVideos(params, axiosConfig) {
        return this.makeRequest(types_1.HttpMethod.Get, 'tv/:id/season/:season_number/videos', params, axiosConfig);
    }
    episodeInfo(params, axiosConfig) {
        return this.makeRequest(types_1.HttpMethod.Get, 'tv/:id/season/:season_number/episode/:episode_number', params, axiosConfig);
    }
    episodeChanges(params, axiosConfig) {
        return this.makeRequest(types_1.HttpMethod.Get, 'tv/episode/:id/changes', params, axiosConfig);
    }
    episodeAccountStates(params, axiosConfig) {
        return this.makeRequest(types_1.HttpMethod.Get, 'tv/:id/season/:season_number/episode/:episode_number/account_states', params, axiosConfig);
    }
    episodeCredits(params, axiosConfig) {
        return this.makeRequest(types_1.HttpMethod.Get, 'tv/:id/season/:season_number/episode/:episode_number/credits', params, axiosConfig);
    }
    episodeExternalIds(params, axiosConfig) {
        return this.makeRequest(types_1.HttpMethod.Get, 'tv/:id/season/:season_number/episode/:episode_number/external_ids', params, axiosConfig);
    }
    episodeImages(params, axiosConfig) {
        return this.makeRequest(types_1.HttpMethod.Get, 'tv/:id/season/:season_number/episode/:episode_number/images', params, axiosConfig);
    }
    episodeTranslations(params, axiosConfig) {
        return this.makeRequest(types_1.HttpMethod.Get, 'tv/:id/season/:season_number/episode/:episode_number/translations', params, axiosConfig);
    }
    episodeRatingUpdate(params, axiosConfig) {
        return this.makeRequest(types_1.HttpMethod.Post, 'tv/:id/season/:season_number/episode/:episode_number/rating', params, axiosConfig);
    }
    episodeRatingDelete(params, axiosConfig) {
        return this.makeRequest(types_1.HttpMethod.Delete, 'tv/:id/season/:season_number/episode/:episode_number/rating', params, axiosConfig);
    }
    episodeVideos(params, axiosConfig) {
        return this.makeRequest(types_1.HttpMethod.Get, 'tv/:id/season/:season_number/episode/:episode_number/translations', params, axiosConfig);
    }
    personInfo(params, axiosConfig) {
        return this.makeRequest(types_1.HttpMethod.Get, 'person/:id', params, axiosConfig);
    }
    personChanges(params, axiosConfig) {
        return this.makeRequest(types_1.HttpMethod.Get, 'person/:id/changes', params, axiosConfig);
    }
    personMovieCredits(params, axiosConfig) {
        return this.makeRequest(types_1.HttpMethod.Get, 'person/:id/movie_credits', params, axiosConfig);
    }
    personTvCredits(params, axiosConfig) {
        return this.makeRequest(types_1.HttpMethod.Get, 'person/:id/tv_credits', params, axiosConfig);
    }
    personCombinedCredits(params, axiosConfig) {
        return this.makeRequest(types_1.HttpMethod.Get, 'person/:id/combined_credits', params, axiosConfig);
    }
    personExternalIds(params, axiosConfig) {
        return this.makeRequest(types_1.HttpMethod.Get, 'person/:id/external_ids', params, axiosConfig);
    }
    personImages(params, axiosConfig) {
        return this.makeRequest(types_1.HttpMethod.Get, 'person/:id/images', params, axiosConfig);
    }
    personTaggedImages(params, axiosConfig) {
        return this.makeRequest(types_1.HttpMethod.Get, 'person/:id/tagged_images', params, axiosConfig);
    }
    personTranslations(params, axiosConfig) {
        return this.makeRequest(types_1.HttpMethod.Get, 'person/:id/translations', params, axiosConfig);
    }
    personLatest(params, axiosConfig) {
        return this.makeRequest(types_1.HttpMethod.Get, 'person/latest', params, axiosConfig);
    }
    personPopular(params, axiosConfig) {
        return this.makeRequest(types_1.HttpMethod.Get, 'person/popular', params, axiosConfig);
    }
    creditInfo(params, axiosConfig) {
        return this.makeRequest(types_1.HttpMethod.Get, 'credit/:id', params, axiosConfig);
    }
    listInfo(params, axiosConfig) {
        return this.makeRequest(types_1.HttpMethod.Get, 'list/:id', params, axiosConfig);
    }
    listStatus(params, axiosConfig) {
        return this.makeRequest(types_1.HttpMethod.Get, 'list/:id/item_status', params, axiosConfig);
    }
    createList(params, axiosConfig) {
        return this.makeRequest(types_1.HttpMethod.Post, 'list', params, axiosConfig);
    }
    createListItem(params, axiosConfig) {
        return this.makeRequest(types_1.HttpMethod.Post, 'list/:id/add_item', params, axiosConfig);
    }
    removeListItem(params, axiosConfig) {
        return this.makeRequest(types_1.HttpMethod.Post, 'list/:id/remove_item', params, axiosConfig);
    }
    clearList(params, axiosConfig) {
        return this.makeRequest(types_1.HttpMethod.Post, 'list/:id/clear', params, axiosConfig);
    }
    deleteList(params, axiosConfig) {
        return this.makeRequest(types_1.HttpMethod.Delete, 'list/:id', params, axiosConfig);
    }
    genreMovieList(params, axiosConfig) {
        return this.makeRequest(types_1.HttpMethod.Get, 'genre/movie/list', params, axiosConfig);
    }
    genreTvList(params, axiosConfig) {
        return this.makeRequest(types_1.HttpMethod.Get, 'genre/tv/list', params, axiosConfig);
    }
    keywordInfo(params, axiosConfig) {
        return this.makeRequest(types_1.HttpMethod.Get, 'keyword/:id', params, axiosConfig);
    }
    keywordMovies(params, axiosConfig) {
        return this.makeRequest(types_1.HttpMethod.Get, 'keyword/:id/movies', params, axiosConfig);
    }
    companyInfo(params, axiosConfig) {
        return this.makeRequest(types_1.HttpMethod.Get, 'company/:id', params, axiosConfig);
    }
    companyAlternativeNames(params, axiosConfig) {
        return this.makeRequest(types_1.HttpMethod.Get, 'company/:id/alternative_names', params, axiosConfig);
    }
    companyImages(params, axiosConfig) {
        return this.makeRequest(types_1.HttpMethod.Get, 'company/:id/images', params, axiosConfig);
    }
    accountInfo(axiosConfig) {
        return this.makeRequest(types_1.HttpMethod.Get, 'account', null, axiosConfig);
    }
    accountLists(params, axiosConfig) {
        return this.makeRequest(types_1.HttpMethod.Get, 'account/:id/lists', params, axiosConfig);
    }
    accountFavoriteMovies(params, axiosConfig) {
        return this.makeRequest(types_1.HttpMethod.Get, 'account/:id/favorite/movies', params, axiosConfig);
    }
    accountFavoriteTv(params, axiosConfig) {
        return this.makeRequest(types_1.HttpMethod.Get, 'account/:id/favorite/tv', params, axiosConfig);
    }
    accountFavoriteUpdate(params, axiosConfig) {
        return this.makeRequest(types_1.HttpMethod.Post, 'account/:id/favorite', params, axiosConfig);
    }
    accountRatedMovies(params, axiosConfig) {
        return this.makeRequest(types_1.HttpMethod.Get, 'account/:id/rated/movies', params, axiosConfig);
    }
    accountRatedTv(params, axiosConfig) {
        return this.makeRequest(types_1.HttpMethod.Get, 'account/:id/rated/tv', params, axiosConfig);
    }
    accountRatedTvEpisodes(params, axiosConfig) {
        return this.makeRequest(types_1.HttpMethod.Get, 'account/:id/rated/tv/episodes', params, axiosConfig);
    }
    accountMovieWatchlist(params, axiosConfig) {
        return this.makeRequest(types_1.HttpMethod.Get, 'account/:id/watchlist/movies', params, axiosConfig);
    }
    accountTvWatchlist(params, axiosConfig) {
        return this.makeRequest(types_1.HttpMethod.Get, 'account/:id/watchlist/tv', params, axiosConfig);
    }
    accountWatchlistUpdate(params, axiosConfig) {
        return this.makeRequest(types_1.HttpMethod.Post, 'account/:id/watchlist', params, axiosConfig);
    }
    changedMovies(params, axiosConfig) {
        return this.makeRequest(types_1.HttpMethod.Get, 'movie/changes', params, axiosConfig);
    }
    changedTvs(params, axiosConfig) {
        return this.makeRequest(types_1.HttpMethod.Get, 'tv/changes', params, axiosConfig);
    }
    changedPeople(params, axiosConfig) {
        return this.makeRequest(types_1.HttpMethod.Get, 'person/changes', params, axiosConfig);
    }
    movieCertifications(axiosConfig) {
        return this.makeRequest(types_1.HttpMethod.Get, 'certification/movie/list', null, axiosConfig);
    }
    tvCertifications(axiosConfig) {
        return this.makeRequest(types_1.HttpMethod.Get, 'certification/tv/list', null, axiosConfig);
    }
    networkInfo(params, axiosConfig) {
        return this.makeRequest(types_1.HttpMethod.Get, 'network/:id', params, axiosConfig);
    }
    networkAlternativeNames(params, axiosConfig) {
        return this.makeRequest(types_1.HttpMethod.Get, 'network/:id/alternative_names', params, axiosConfig);
    }
    networkImages(params, axiosConfig) {
        return this.makeRequest(types_1.HttpMethod.Get, 'network/:id/images', params, axiosConfig);
    }
    review(params, axiosConfig) {
        return this.makeRequest(types_1.HttpMethod.Get, 'review/:id', params, axiosConfig);
    }
    episodeGroup(params, axiosConfig) {
        return this.makeRequest(types_1.HttpMethod.Get, 'tv/episode_group/:id', params, axiosConfig);
    }
}
exports.MovieDb = MovieDb;
