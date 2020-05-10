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
    private parseSearchParams;
    configuration(options?: string | RequestOptions): Promise<types.ConfigurationResponse>;
    find(params?: string | number | types.FindRequest, options?: string | RequestOptions): Promise<types.FindResponse>;
    searchCompany(params: string | types.SearchRequest, options?: string | RequestOptions): Promise<types.SearchCompanyResponse>;
    searchCollection(params: types.SearchRequest, options?: string | RequestOptions): Promise<types.SearchCollectionResponse>;
    searchKeyword(params: types.SearchRequest, options?: string | RequestOptions): Promise<types.SearchKeywordResponse>;
    searchMovie(params: types.SearchMovieRequest, options?: string | RequestOptions): Promise<types.SearchMovieResponse>;
    searchMulti(params: types.SearchMultiRequest, options?: string | RequestOptions): Promise<types.SearchMultiResponse>;
    searchPerson(params: types.SearchMultiRequest, options?: string | RequestOptions): Promise<types.SearchPersonResponse>;
    searchTv(params: types.SearchTvRequest, options?: string | RequestOptions): Promise<types.SearchTvResponse>;
    searchList(params?: string | number | RequestParams, options?: string | RequestOptions): Promise<any>;
    collectionInfo(params: string | number | types.CollectionRequest, options?: string | RequestOptions): Promise<types.CollectionInfoResponse>;
    collectionImages(params: string | number | types.CollectionRequest, options?: string | RequestOptions): Promise<types.CollectionImagesResponse>;
    collectionTranslations(params: string | number | types.CollectionRequest, options?: string | RequestOptions): Promise<types.CollectionTranslationsResponse>;
    discoverMovie(params?: types.DiscoverMovieRequest, options?: string | RequestOptions): Promise<types.DiscoverMovieResponse>;
    discoverTv(params?: types.DiscoverTvRequest, options?: string | RequestOptions): Promise<types.DiscoverTvResponse>;
    trending(params: types.TrendingRequest, options?: string | RequestOptions): Promise<types.TrendingResponse>;
    movieInfo(params: string | number | types.IdRequestParams, options?: string | RequestOptions): Promise<types.MovieResponse>;
    movieAccountStates(params: string | number | types.IdRequestParams, options?: string | RequestOptions): Promise<types.MovieAccountStateResponse>;
    movieAlternativeTitles(params: string | number | types.MovieAlternativeTitlesRequest, options?: string | RequestOptions): Promise<types.MovieAlternativeTitlesResponse>;
    movieChanges(params: string | number | types.MovieChangesRequest, options?: string | RequestOptions): Promise<types.MovieChangesResponse>;
    movieCredits(params: string | number | types.IdRequestParams, options?: string | RequestOptions): Promise<types.MovieCreditsResponse>;
    movieExternalIds(params: string | number | types.IdRequestParams, options?: string | RequestOptions): Promise<types.MovieExternalIdsResponse>;
    movieImages(params: string | number | types.MovieImagesRequest, options?: string | RequestOptions): Promise<types.MovieImagesResponse>;
    movieKeywords(params: string | number | types.IdRequestParams, options?: string | RequestOptions): Promise<types.MovieKeywordResponse>;
    movieReleaseDates(params: string | number | types.IdRequestParams, options?: string | RequestOptions): Promise<types.MovieReleaseDatesResponse>;
    movieVideos(params: string | number | types.IdRequestParams, options?: string | RequestOptions): Promise<types.MovieVideosResponse>;
    movieTranslations(params: string | number | types.IdRequestParams, options?: string | RequestOptions): Promise<types.MovieTranslationsResponse>;
    movieRecommendations(params: string | number | types.MovieRecommendationsRequest, options?: string | RequestOptions): Promise<types.MovieRecommendationsResponse>;
    movieSimilar(params: string | number | types.IdRequestParams, options?: string | RequestOptions): Promise<types.SimilarMovieResponse>;
    movieReviews(params: string | number | types.MovieReviewsRequest, options?: string | RequestOptions): Promise<types.MovieReviewsResponse>;
    movieLists(params: string | number | types.MovieListsRequest, options?: string | RequestOptions): Promise<types.MovieListsResponse>;
    movieRatingUpdate(params: types.RatingRequest, options?: string | RequestOptions): Promise<types.PostResponse>;
    movieRatingDelete(params: string | number | types.IdRequestParams, options?: string | RequestOptions): Promise<types.PostResponse>;
    movieLatest(params?: string | RequestParams, options?: string | RequestOptions): Promise<types.MovieResponse>;
    movieNowPlaying(params?: types.MovieNowPlayingRequest, options?: string | RequestOptions): Promise<types.MovieNowPlayingResponse>;
    moviePopular(params?: types.PopularMoviesRequest, options?: string | RequestOptions): Promise<types.PopularMoviesResponse>;
    movieTopRated(params?: types.TopRatedMoviesRequest, options?: string | RequestOptions): Promise<types.TopRatedMoviesResponse>;
    upcomingMovies(params: types.UpcomingMoviesRequest, options?: string | RequestOptions): Promise<types.UpcomingMoviesResponse>;
    miscChangedMovies(params?: string | number | RequestParams, options?: string | RequestOptions): Promise<any>;
    tvShow(params: string | number | types.IdRequestParams, options?: string | RequestOptions): Promise<types.ShowResponse>;
    tvAccountStates(params: string | number | types.IdRequestParams, options?: string | RequestOptions): Promise<types.ShowAccountStatesResponse>;
    tvAlternativeTitles(params: string | number | types.IdRequestParams, options?: string | RequestOptions): Promise<types.ShowAlternativeTitlesResponse>;
    tvChanges(params: string | number | types.ShowChangesRequest, options?: string | RequestOptions): Promise<types.ShowChangesResponse>;
    tvContentRatings(params: string | number | types.IdRequestParams, options?: string | RequestOptions): Promise<types.ShowContentRatingResponse>;
    tvCredits(params: string | number | types.IdRequestParams, options?: string | RequestOptions): Promise<types.TvCreditsResponse>;
    tvEpisodeGroups(params: string | number | types.IdRequestParams, options?: string | RequestOptions): Promise<types.TvEpisodeGroupsResponse>;
    tvExternalIds(params: string | number | types.IdRequestParams, options?: string | RequestOptions): Promise<types.TvExternalIdsResponse>;
    tvImages(params: string | number | types.IdRequestParams, options?: string | RequestOptions): Promise<types.TvImagesResponse>;
    tvKeywords(params: string | number | types.IdRequestParams, options?: string | RequestOptions): Promise<types.TvKeywordsResponse>;
    tvRecommendations(params: string | number | types.PagedRequestParams, options?: string | RequestOptions): Promise<types.TvResultsResponse>;
    tvReviews(params: string | number | types.PagedRequestParams, options?: string | RequestOptions): Promise<types.TvReviewsResponse>;
    tvScreenedTheatrically(params: string | number | types.IdRequestParams, options?: string | RequestOptions): Promise<types.TvScreenTheatricallyResponse>;
    tvSimilar(params: string | number | types.PagedRequestParams, options?: string | RequestOptions): Promise<types.TvSimilarShowsResponse>;
    tvTranslations(params: string | number | types.IdRequestParams, options?: string | RequestOptions): Promise<types.TvTranslationsResponse>;
    tvVideos(params: string | number | types.IdRequestParams, options?: string | RequestOptions): Promise<types.TvVideosResponse>;
    tvRatingUpdate(params: types.RatingRequest, options?: string | RequestOptions): Promise<types.PostResponse>;
    tvRatingDelete(params: string | number | types.IdRequestParams, options?: string | RequestOptions): Promise<types.PostResponse>;
    tvLatest(params?: RequestParams, options?: string | RequestOptions): Promise<types.ShowResponse>;
    tvAiringToday(params?: types.PagedRequestParams, options?: string | RequestOptions): Promise<types.TvResultsResponse>;
    tvOnTheAir(params?: types.PagedRequestParams, options?: string | RequestOptions): Promise<types.TvResultsResponse>;
    tvPopular(params?: types.PagedRequestParams, options?: string | RequestOptions): Promise<types.TvResultsResponse>;
    tvTopRated(params?: types.PagedRequestParams, options?: string | RequestOptions): Promise<types.TvResultsResponse>;
    tvSeasonInfo(params: types.TvSeasonRequest, options?: string | RequestOptions): Promise<types.TvSeasonResponse>;
    tvSeasonCredits(params?: string | number | RequestParams, options?: string | RequestOptions): Promise<any>;
    tvSeasonVideos(params?: string | number | RequestParams, options?: string | RequestOptions): Promise<any>;
    tvSeasonExternalIds(params?: string | number | RequestParams, options?: string | RequestOptions): Promise<any>;
    tvSeasonImages(params?: string | number | RequestParams, options?: string | RequestOptions): Promise<any>;
    tvEpisodeInfo(params?: string | number | RequestParams, options?: string | RequestOptions): Promise<any>;
    tvEpisodeCredits(params?: string | number | RequestParams, options?: string | RequestOptions): Promise<any>;
    tvEpisodeExternalIds(params?: string | number | RequestParams, options?: string | RequestOptions): Promise<any>;
    tvEpisodeImages(params?: string | number | RequestParams, options?: string | RequestOptions): Promise<any>;
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
    miscChangedTvs(params?: string | number | RequestParams, options?: string | RequestOptions): Promise<any>;
    miscChangedPeople(params?: string | number | RequestParams, options?: string | RequestOptions): Promise<any>;
}
//# sourceMappingURL=moviedb.d.ts.map