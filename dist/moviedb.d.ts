import { AuthenticationToken, RequestOptions, RequestParams } from './types';
import * as types from './request-types';
export declare class MovieDb {
    private apiKey;
    private token;
    private requests;
    private requesting;
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
     * Processes the next request in the request queue
     */
    private dequeue;
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
    configuration(options?: string | RequestOptions): Promise<types.ConfigurationResponse>;
    find(params?: string | number | types.FindRequest, options?: string | RequestOptions): Promise<types.FindResponse>;
    searchCompany(params: types.SearchRequest, options?: string | RequestOptions): Promise<types.SearchCompanyResponse>;
    searchCollection(params: types.SearchRequest, options?: string | RequestOptions): Promise<types.SearchCollectionResponse>;
    searchKeyword(params: types.SearchRequest, options?: string | RequestOptions): Promise<types.SearchKeywordResponse>;
    searchMovie(params: types.SearchMovieRequest, options?: string | RequestOptions): Promise<types.SearchMovieResponse>;
    searchTv(params?: string | number | RequestParams, options?: string | RequestOptions): Promise<any>;
    searchMulti(params?: string | number | RequestParams, options?: string | RequestOptions): Promise<any>;
    searchPerson(params?: string | number | RequestParams, options?: string | RequestOptions): Promise<any>;
    searchList(params?: string | number | RequestParams, options?: string | RequestOptions): Promise<any>;
    collectionInfo(params?: string | number | RequestParams, options?: string | RequestOptions): Promise<any>;
    collectionImages(params?: string | number | RequestParams, options?: string | RequestOptions): Promise<any>;
    collectionTranslations(params?: string | number | RequestParams, options?: string | RequestOptions): Promise<any>;
    discoverMovie(params?: string | number | RequestParams, options?: string | RequestOptions): Promise<any>;
    discoverTv(params?: string | number | RequestParams, options?: string | RequestOptions): Promise<any>;
    trending(params?: string | number | RequestParams, options?: string | RequestOptions): Promise<any>;
    movieInfo(params?: string | number | RequestParams, options?: string | RequestOptions): Promise<any>;
    movieAlternativeTitles(params?: string | number | RequestParams, options?: string | RequestOptions): Promise<any>;
    movieCredits(params?: string | number | RequestParams, options?: string | RequestOptions): Promise<any>;
    movieExternalIds(params?: string | number | RequestParams, options?: string | RequestOptions): Promise<any>;
    movieImages(params?: string | number | RequestParams, options?: string | RequestOptions): Promise<any>;
    movieVideos(params?: string | number | RequestParams, options?: string | RequestOptions): Promise<any>;
    movieKeywords(params?: string | number | RequestParams, options?: string | RequestOptions): Promise<any>;
    movieRecommendations(params?: string | number | RequestParams, options?: string | RequestOptions): Promise<any>;
    movieReleases(params?: string | number | RequestParams, options?: string | RequestOptions): Promise<any>;
    movieReleaseDates(params?: string | number | RequestParams, options?: string | RequestOptions): Promise<any>;
    movieTrailers(params?: string | number | RequestParams, options?: string | RequestOptions): Promise<any>;
    movieTranslations(params?: string | number | RequestParams, options?: string | RequestOptions): Promise<any>;
    movieSimilar(params?: string | number | RequestParams, options?: string | RequestOptions): Promise<any>;
    movieReviews(params?: string | number | RequestParams, options?: string | RequestOptions): Promise<any>;
    movieLists(params?: string | number | RequestParams, options?: string | RequestOptions): Promise<any>;
    movieChanges(params?: string | number | RequestParams, options?: string | RequestOptions): Promise<any>;
    movieRatingUpdate(params?: string | number | RequestParams, options?: string | RequestOptions): Promise<any>;
    tvInfo(params?: string | number | RequestParams, options?: string | RequestOptions): Promise<any>;
    tvAlternativeTitles(params?: string | number | RequestParams, options?: string | RequestOptions): Promise<any>;
    tvContentRatings(params?: string | number | RequestParams, options?: string | RequestOptions): Promise<any>;
    tvCredits(params?: string | number | RequestParams, options?: string | RequestOptions): Promise<any>;
    tvEpisodeGroups(params?: string | number | RequestParams, options?: string | RequestOptions): Promise<any>;
    tvExternalIds(params?: string | number | RequestParams, options?: string | RequestOptions): Promise<any>;
    tvImages(params?: string | number | RequestParams, options?: string | RequestOptions): Promise<any>;
    tvKeywords(params?: string | number | RequestParams, options?: string | RequestOptions): Promise<any>;
    tvVideos(params?: string | number | RequestParams, options?: string | RequestOptions): Promise<any>;
    tvScreenedTheatrically(params?: string | number | RequestParams, options?: string | RequestOptions): Promise<any>;
    tvReviews(params?: string | number | RequestParams, options?: string | RequestOptions): Promise<any>;
    tvSimilar(params?: string | number | RequestParams, options?: string | RequestOptions): Promise<any>;
    tvTranslations(params?: string | number | RequestParams, options?: string | RequestOptions): Promise<any>;
    tvSeasonInfo(params?: string | number | RequestParams, options?: string | RequestOptions): Promise<any>;
    tvSeasonCredits(params?: string | number | RequestParams, options?: string | RequestOptions): Promise<any>;
    tvSeasonVideos(params?: string | number | RequestParams, options?: string | RequestOptions): Promise<any>;
    tvSeasonExternalIds(params?: string | number | RequestParams, options?: string | RequestOptions): Promise<any>;
    tvSeasonImages(params?: string | number | RequestParams, options?: string | RequestOptions): Promise<any>;
    tvEpisodeInfo(params?: string | number | RequestParams, options?: string | RequestOptions): Promise<any>;
    tvEpisodeCredits(params?: string | number | RequestParams, options?: string | RequestOptions): Promise<any>;
    tvEpisodeExternalIds(params?: string | number | RequestParams, options?: string | RequestOptions): Promise<any>;
    tvEpisodeImages(params?: string | number | RequestParams, options?: string | RequestOptions): Promise<any>;
    tvOnTheAir(params?: string | number | RequestParams, options?: string | RequestOptions): Promise<any>;
    tvAiringToday(params?: string | number | RequestParams, options?: string | RequestOptions): Promise<any>;
    tvRecommendations(params?: string | number | RequestParams, options?: string | RequestOptions): Promise<any>;
    tvChanges(params?: string | number | RequestParams, options?: string | RequestOptions): Promise<any>;
    tvRatingUpdate(params?: string | number | RequestParams, options?: string | RequestOptions): Promise<any>;
    personInfo(params?: string | number | RequestParams, options?: string | RequestOptions): Promise<any>;
    personChanges(params?: string | number | RequestParams, options?: string | RequestOptions): Promise<any>;
    personMovieCredits(params?: string | number | RequestParams, options?: string | RequestOptions): Promise<any>;
    personTvCredits(params?: string | number | RequestParams, options?: string | RequestOptions): Promise<any>;
    personCombinedCredits(params?: string | number | RequestParams, options?: string | RequestOptions): Promise<any>;
    personExternalIds(params?: string | number | RequestParams, options?: string | RequestOptions): Promise<any>;
    personImages(params?: string | number | RequestParams, options?: string | RequestOptions): Promise<any>;
    personTaggedImages(params?: string | number | RequestParams, options?: string | RequestOptions): Promise<any>;
    personTranslations(params?: string | number | RequestParams, options?: string | RequestOptions): Promise<any>;
    personLatest(params?: string | number | RequestParams, options?: string | RequestOptions): Promise<any>;
    personPopular(params?: string | number | RequestParams, options?: string | RequestOptions): Promise<any>;
    creditInfo(params?: string | number | RequestParams, options?: string | RequestOptions): Promise<any>;
    listInfo(params?: string | number | RequestParams, options?: string | RequestOptions): Promise<any>;
    genreMovieList(params?: string | number | RequestParams, options?: string | RequestOptions): Promise<any>;
    genreTvList(params?: string | number | RequestParams, options?: string | RequestOptions): Promise<any>;
    keywordInfo(params?: string | number | RequestParams, options?: string | RequestOptions): Promise<any>;
    keywordMovies(params?: string | number | RequestParams, options?: string | RequestOptions): Promise<any>;
    companyInfo(params?: string | number | RequestParams, options?: string | RequestOptions): Promise<any>;
    companyAlternativeNames(params?: string | number | RequestParams, options?: string | RequestOptions): Promise<any>;
    companyImages(params?: string | number | RequestParams, options?: string | RequestOptions): Promise<any>;
    accountInfo(params?: string | number | RequestParams, options?: string | RequestOptions): Promise<any>;
    accountLists(params?: string | number | RequestParams, options?: string | RequestOptions): Promise<any>;
    accountFavoriteMovies(params?: string | number | RequestParams, options?: string | RequestOptions): Promise<any>;
    accountFavoriteUpdate(params?: string | number | RequestParams, options?: string | RequestOptions): Promise<any>;
    accountRatedMovies(params?: string | number | RequestParams, options?: string | RequestOptions): Promise<any>;
    accountMovieWatchlist(params?: string | number | RequestParams, options?: string | RequestOptions): Promise<any>;
    accountTvWatchlist(params?: string | number | RequestParams, options?: string | RequestOptions): Promise<any>;
    accountWatchlistUpdate(params?: string | number | RequestParams, options?: string | RequestOptions): Promise<any>;
    accountRatedTv(params?: string | number | RequestParams, options?: string | RequestOptions): Promise<any>;
    accountRatedTvEpisodes(params?: string | number | RequestParams, options?: string | RequestOptions): Promise<any>;
    accountFavoriteTv(params?: string | number | RequestParams, options?: string | RequestOptions): Promise<any>;
    miscLatestMovies(params?: string | number | RequestParams, options?: string | RequestOptions): Promise<any>;
    miscNowPlayingMovies(params?: string | number | RequestParams, options?: string | RequestOptions): Promise<any>;
    miscPopularMovies(params?: string | number | RequestParams, options?: string | RequestOptions): Promise<any>;
    miscTopRatedMovies(params?: string | number | RequestParams, options?: string | RequestOptions): Promise<any>;
    miscUpcomingMovies(params?: string | number | RequestParams, options?: string | RequestOptions): Promise<any>;
    miscChangedMovies(params?: string | number | RequestParams, options?: string | RequestOptions): Promise<any>;
    miscChangedTvs(params?: string | number | RequestParams, options?: string | RequestOptions): Promise<any>;
    miscChangedPeople(params?: string | number | RequestParams, options?: string | RequestOptions): Promise<any>;
    miscLatestTvs(params?: string | number | RequestParams, options?: string | RequestOptions): Promise<any>;
    miscPopularTvs(params?: string | number | RequestParams, options?: string | RequestOptions): Promise<any>;
    miscTopRatedTvs(params?: string | number | RequestParams, options?: string | RequestOptions): Promise<any>;
}
//# sourceMappingURL=moviedb.d.ts.map