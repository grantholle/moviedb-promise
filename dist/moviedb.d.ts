import { AxiosRequestConfig } from 'axios';
import { AuthenticationToken, RequestParams } from './types';
import * as types from './request-types';
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
    private parseSearchParams;
    configuration(axiosConfig?: AxiosRequestConfig): Promise<types.ConfigurationResponse>;
    countries(axiosConfig?: AxiosRequestConfig): Promise<types.CountriesResponse>;
    jobs(axiosConfig?: AxiosRequestConfig): Promise<Array<types.Job>>;
    languages(axiosConfig?: AxiosRequestConfig): Promise<Array<types.Language>>;
    primaryTranslations(axiosConfig?: AxiosRequestConfig): Promise<Array<string>>;
    timezones(axiosConfig?: AxiosRequestConfig): Promise<Array<types.Timezone>>;
    find(params?: types.FindRequest, axiosConfig?: AxiosRequestConfig): Promise<types.FindResponse>;
    searchCompany(params: string | types.SearchRequest, axiosConfig?: AxiosRequestConfig): Promise<types.SearchCompanyResponse>;
    searchCollection(params: types.SearchRequest, axiosConfig?: AxiosRequestConfig): Promise<types.SearchCollectionResponse>;
    searchKeyword(params: types.SearchRequest, axiosConfig?: AxiosRequestConfig): Promise<types.SearchKeywordResponse>;
    searchMovie(params: types.SearchMovieRequest, axiosConfig?: AxiosRequestConfig): Promise<types.MovieResultsResponse>;
    searchMulti(params: types.SearchMultiRequest, axiosConfig?: AxiosRequestConfig): Promise<types.SearchMultiResponse>;
    searchPerson(params: types.SearchMultiRequest, axiosConfig?: AxiosRequestConfig): Promise<types.SearchPersonResponse>;
    searchTv(params: types.SearchTvRequest, axiosConfig?: AxiosRequestConfig): Promise<types.TvResultsResponse>;
    searchList(params?: string | number | RequestParams, axiosConfig?: AxiosRequestConfig): Promise<any>;
    collectionInfo(params: string | number | types.CollectionRequest, axiosConfig?: AxiosRequestConfig): Promise<types.CollectionInfoResponse>;
    collectionImages(params: string | number | types.CollectionRequest, axiosConfig?: AxiosRequestConfig): Promise<types.CollectionImagesResponse>;
    collectionTranslations(params: string | number | types.CollectionRequest, axiosConfig?: AxiosRequestConfig): Promise<types.CollectionTranslationsResponse>;
    discoverMovie(params?: types.DiscoverMovieRequest, axiosConfig?: AxiosRequestConfig): Promise<types.DiscoverMovieResponse>;
    discoverTv(params?: types.DiscoverTvRequest, axiosConfig?: AxiosRequestConfig): Promise<types.DiscoverTvResponse>;
    trending(params: types.TrendingRequest, axiosConfig?: AxiosRequestConfig): Promise<types.TrendingResponse>;
    movieInfo(params: string | number | types.IdAppendToResponseRequest, axiosConfig?: AxiosRequestConfig): Promise<types.MovieResponse>;
    movieAccountStates(params: string | number | types.IdRequestParams, axiosConfig?: AxiosRequestConfig): Promise<types.MovieAccountStateResponse>;
    movieAlternativeTitles(params: string | number | types.MovieAlternativeTitlesRequest, axiosConfig?: AxiosRequestConfig): Promise<types.MovieAlternativeTitlesResponse>;
    movieChanges(params: string | number | types.ChangesRequest, axiosConfig?: AxiosRequestConfig): Promise<types.MovieChangesResponse>;
    movieCredits(params: string | number | types.IdRequestParams, axiosConfig?: AxiosRequestConfig): Promise<types.CreditsResponse>;
    movieExternalIds(params: string | number | types.IdRequestParams, axiosConfig?: AxiosRequestConfig): Promise<types.MovieExternalIdsResponse>;
    movieImages(params: string | number | types.MovieImagesRequest, axiosConfig?: AxiosRequestConfig): Promise<types.MovieImagesResponse>;
    movieKeywords(params: string | number | types.IdRequestParams, axiosConfig?: AxiosRequestConfig): Promise<types.MovieKeywordResponse>;
    movieReleaseDates(params: string | number | types.IdRequestParams, axiosConfig?: AxiosRequestConfig): Promise<types.MovieReleaseDatesResponse>;
    movieVideos(params: string | number | types.IdRequestParams, axiosConfig?: AxiosRequestConfig): Promise<types.VideosResponse>;
    movieWatchProviders(params: string | number | types.IdRequestParams, axiosConfig?: AxiosRequestConfig): Promise<types.WatchProviderResponse>;
    movieWatchProviderList(params: string | number | types.WatchProvidersParams, axiosConfig?: AxiosRequestConfig): Promise<types.WatchProviderListResponse>;
    movieTranslations(params: string | number | types.IdRequestParams, axiosConfig?: AxiosRequestConfig): Promise<types.MovieTranslationsResponse>;
    movieRecommendations(params: string | number | types.MovieRecommendationsRequest, axiosConfig?: AxiosRequestConfig): Promise<types.MovieRecommendationsResponse>;
    movieSimilar(params: string | number | types.IdRequestParams, axiosConfig?: AxiosRequestConfig): Promise<types.SimilarMovieResponse>;
    movieReviews(params: string | number | types.MovieReviewsRequest, axiosConfig?: AxiosRequestConfig): Promise<types.MovieReviewsResponse>;
    movieLists(params: string | number | types.MovieListsRequest, axiosConfig?: AxiosRequestConfig): Promise<types.MovieListsResponse>;
    movieRatingUpdate(params: types.RatingRequest, axiosConfig?: AxiosRequestConfig): Promise<types.PostResponse>;
    movieRatingDelete(params: string | number | types.IdRequestParams, axiosConfig?: AxiosRequestConfig): Promise<types.PostResponse>;
    movieLatest(params?: string | RequestParams, axiosConfig?: AxiosRequestConfig): Promise<types.MovieResponse>;
    movieNowPlaying(params?: types.MovieNowPlayingRequest, axiosConfig?: AxiosRequestConfig): Promise<types.MovieNowPlayingResponse>;
    moviePopular(params?: types.PopularMoviesRequest, axiosConfig?: AxiosRequestConfig): Promise<types.PopularMoviesResponse>;
    movieTopRated(params?: types.TopRatedMoviesRequest, axiosConfig?: AxiosRequestConfig): Promise<types.TopRatedMoviesResponse>;
    upcomingMovies(params: types.UpcomingMoviesRequest, axiosConfig?: AxiosRequestConfig): Promise<types.UpcomingMoviesResponse>;
    tvInfo(params: string | number | types.IdAppendToResponseRequest, axiosConfig?: AxiosRequestConfig): Promise<types.ShowResponse>;
    tvAccountStates(params: string | number | types.IdRequestParams, axiosConfig?: AxiosRequestConfig): Promise<types.ShowAccountStatesResponse>;
    tvAlternativeTitles(params: string | number | types.IdRequestParams, axiosConfig?: AxiosRequestConfig): Promise<types.ShowAlternativeTitlesResponse>;
    tvChanges(params: string | number | types.ChangesRequest, axiosConfig?: AxiosRequestConfig): Promise<types.ShowChangesResponse>;
    tvContentRatings(params: string | number | types.IdRequestParams, axiosConfig?: AxiosRequestConfig): Promise<types.ShowContentRatingResponse>;
    tvCredits(params: string | number | types.IdRequestParams, axiosConfig?: AxiosRequestConfig): Promise<types.CreditsResponse>;
    tvAggregateCredits(params: string | number | types.IdRequestParams, axiosConfig?: AxiosRequestConfig): Promise<types.AggregateCreditsResponse>;
    episodeGroups(params: string | number | types.IdRequestParams, axiosConfig?: AxiosRequestConfig): Promise<types.TvEpisodeGroupsResponse>;
    tvExternalIds(params: string | number | types.IdRequestParams, axiosConfig?: AxiosRequestConfig): Promise<types.TvExternalIdsResponse>;
    tvImages(params: string | number | types.IdRequestParams, axiosConfig?: AxiosRequestConfig): Promise<types.TvImagesResponse>;
    tvKeywords(params: string | number | types.IdRequestParams, axiosConfig?: AxiosRequestConfig): Promise<types.TvKeywordsResponse>;
    tvRecommendations(params: string | number | types.IdPagedRequestParams, axiosConfig?: AxiosRequestConfig): Promise<types.TvResultsResponse>;
    tvReviews(params: string | number | types.IdPagedRequestParams, axiosConfig?: AxiosRequestConfig): Promise<types.TvReviewsResponse>;
    tvScreenedTheatrically(params: string | number | types.IdRequestParams, axiosConfig?: AxiosRequestConfig): Promise<types.TvScreenTheatricallyResponse>;
    tvSimilar(params: string | number | types.IdPagedRequestParams, axiosConfig?: AxiosRequestConfig): Promise<types.TvSimilarShowsResponse>;
    tvTranslations(params: string | number | types.IdRequestParams, axiosConfig?: AxiosRequestConfig): Promise<types.TvTranslationsResponse>;
    tvVideos(params: string | number | types.IdRequestParams, axiosConfig?: AxiosRequestConfig): Promise<types.VideosResponse>;
    tvWatchProviders(params: string | number | types.IdRequestParams, axiosConfig?: AxiosRequestConfig): Promise<types.WatchProviderResponse>;
    tvWatchProviderList(params: string | number | types.WatchProvidersParams, axiosConfig?: AxiosRequestConfig): Promise<types.WatchProviderListResponse>;
    tvRatingUpdate(params: types.RatingRequest, axiosConfig?: AxiosRequestConfig): Promise<types.PostResponse>;
    tvRatingDelete(params: string | number | types.IdRequestParams, axiosConfig?: AxiosRequestConfig): Promise<types.PostResponse>;
    tvLatest(params?: RequestParams, axiosConfig?: AxiosRequestConfig): Promise<types.ShowResponse>;
    tvAiringToday(params?: types.PagedRequestParams, axiosConfig?: AxiosRequestConfig): Promise<types.TvResultsResponse>;
    tvOnTheAir(params?: types.PagedRequestParams, axiosConfig?: AxiosRequestConfig): Promise<types.TvResultsResponse>;
    tvPopular(params?: types.PagedRequestParams, axiosConfig?: AxiosRequestConfig): Promise<types.TvResultsResponse>;
    tvTopRated(params?: types.PagedRequestParams, axiosConfig?: AxiosRequestConfig): Promise<types.TvResultsResponse>;
    seasonInfo(params: types.TvSeasonRequest, axiosConfig?: AxiosRequestConfig): Promise<types.TvSeasonResponse>;
    seasonChanges(params: types.ChangesRequest, axiosConfig?: AxiosRequestConfig): Promise<types.TvSeasonChangesResponse>;
    seasonAccountStates(params: types.TvSeasonRequest, axiosConfig?: AxiosRequestConfig): Promise<types.TvSeasonAccountStatesResponse>;
    seasonCredits(params: types.TvSeasonRequest, axiosConfig?: AxiosRequestConfig): Promise<types.CreditsResponse>;
    seasonExternalIds(params: types.TvSeasonRequest, axiosConfig?: AxiosRequestConfig): Promise<types.TvSeasonExternalIdsResponse>;
    seasonImages(params: types.TvSeasonRequest, axiosConfig?: AxiosRequestConfig): Promise<types.TvSeasonImagesResponse>;
    seasonVideos(params: types.TvSeasonRequest, axiosConfig?: AxiosRequestConfig): Promise<types.VideosResponse>;
    episodeInfo(params: types.EpisodeRequest, axiosConfig?: AxiosRequestConfig): Promise<types.Episode>;
    episodeChanges(params: string | number | types.ChangesRequest, axiosConfig?: AxiosRequestConfig): Promise<types.EpisodeChangesResponse>;
    episodeAccountStates(params: types.EpisodeRequest, axiosConfig?: AxiosRequestConfig): Promise<types.EpisodeAccountStatesResponse>;
    episodeCredits(params: types.EpisodeRequest, axiosConfig?: AxiosRequestConfig): Promise<types.EpisodeCreditsResponse>;
    episodeExternalIds(params: types.EpisodeRequest, axiosConfig?: AxiosRequestConfig): Promise<types.EpisodeExternalIdsResponse>;
    episodeImages(params: types.EpisodeRequest, axiosConfig?: AxiosRequestConfig): Promise<types.EpisodeImagesResponse>;
    episodeTranslations(params: types.EpisodeRequest, axiosConfig?: AxiosRequestConfig): Promise<types.EpisodeTranslationsResponse>;
    episodeRatingUpdate(params: types.EpisodeRatingRequest, axiosConfig?: AxiosRequestConfig): Promise<types.PostResponse>;
    episodeRatingDelete(params: types.EpisodeRequest, axiosConfig?: AxiosRequestConfig): Promise<types.PostResponse>;
    episodeVideos(params: types.EpisodeRequest, axiosConfig?: AxiosRequestConfig): Promise<types.EpisodeVideosResponse>;
    personInfo(params: string | number | types.IdAppendToResponseRequest, axiosConfig?: AxiosRequestConfig): Promise<types.Person>;
    personChanges(params: string | number | types.ChangesRequest, axiosConfig?: AxiosRequestConfig): Promise<types.PersonChangesResponse>;
    personMovieCredits(params: string | number | types.IdRequestParams, axiosConfig?: AxiosRequestConfig): Promise<types.PersonMovieCreditsResponse>;
    personTvCredits(params: string | number | types.IdRequestParams, axiosConfig?: AxiosRequestConfig): Promise<types.PersonTvCreditsResponse>;
    personCombinedCredits(params: string | number | types.IdRequestParams, axiosConfig?: AxiosRequestConfig): Promise<types.PersonCombinedCreditsResponse>;
    personExternalIds(params: string | number | types.IdRequestParams, axiosConfig?: AxiosRequestConfig): Promise<types.PersonExternalIdsResponse>;
    personImages(params: string | number | types.IdRequestParams, axiosConfig?: AxiosRequestConfig): Promise<types.PersonImagesResponse>;
    personTaggedImages(params: string | number | types.IdPagedRequestParams, axiosConfig?: AxiosRequestConfig): Promise<types.PersonTaggedImagesResponse>;
    personTranslations(params: string | number | types.IdRequestParams, axiosConfig?: AxiosRequestConfig): Promise<types.PersonTranslationsResponse>;
    personLatest(params?: RequestParams, axiosConfig?: AxiosRequestConfig): Promise<types.Person>;
    personPopular(params?: types.PagedRequestParams, axiosConfig?: AxiosRequestConfig): Promise<types.PersonPopularResponse>;
    creditInfo(params?: string | number | types.IdRequestParams, axiosConfig?: AxiosRequestConfig): Promise<types.CreditDetailsResponse>;
    listInfo(params: string | number | types.IdRequestParams, axiosConfig?: AxiosRequestConfig): Promise<types.ListsDetailResponse>;
    listStatus(params: types.IdRequestParams, axiosConfig?: AxiosRequestConfig): Promise<types.ListsStatusResponse>;
    createList(params: types.CreateListParams, axiosConfig?: AxiosRequestConfig): Promise<types.CreateListResponse>;
    createListItem(params: types.CreateListItemParams, axiosConfig?: AxiosRequestConfig): Promise<types.PostResponse>;
    removeListItem(params: types.CreateListItemParams, axiosConfig?: AxiosRequestConfig): Promise<types.PostResponse>;
    clearList(params: types.ClearListParams, axiosConfig?: AxiosRequestConfig): Promise<types.PostResponse>;
    deleteList(params: string | number | types.IdRequestParams, axiosConfig?: AxiosRequestConfig): Promise<types.PostResponse>;
    genreMovieList(params?: RequestParams, axiosConfig?: AxiosRequestConfig): Promise<types.GenresResponse>;
    genreTvList(params?: RequestParams, axiosConfig?: AxiosRequestConfig): Promise<types.GenresResponse>;
    keywordInfo(params?: string | number | types.IdRequestParams, axiosConfig?: AxiosRequestConfig): Promise<types.KeywordResponse>;
    keywordMovies(params: string | number | types.KeywordMoviesParams, axiosConfig?: AxiosRequestConfig): Promise<types.MovieResultsResponse>;
    companyInfo(params: string | number | types.IdRequestParams, axiosConfig?: AxiosRequestConfig): Promise<types.Company>;
    companyAlternativeNames(params: string | number | RequestParams, axiosConfig?: AxiosRequestConfig): Promise<types.CompanyAlternativeNamesResponse>;
    companyImages(params: string | number | RequestParams, axiosConfig?: AxiosRequestConfig): Promise<types.CompanyImagesResponse>;
    accountInfo(axiosConfig?: AxiosRequestConfig): Promise<types.AccountInfoResponse>;
    accountLists(params: string | number | types.IdPagedRequestParams, axiosConfig?: AxiosRequestConfig): Promise<types.AccountListsResponse>;
    accountFavoriteMovies(params?: string | number | types.AccountMediaRequest, axiosConfig?: AxiosRequestConfig): Promise<types.MovieResultsResponse>;
    accountFavoriteTv(params?: string | number | types.AccountMediaRequest, axiosConfig?: AxiosRequestConfig): Promise<types.TvResultsResponse>;
    accountFavoriteUpdate(params: types.MarkAsFavoriteRequest, axiosConfig?: AxiosRequestConfig): Promise<types.PostResponse>;
    accountRatedMovies(params?: string | number | types.AccountMediaRequest, axiosConfig?: AxiosRequestConfig): Promise<types.MovieResultsResponse>;
    accountRatedTv(params?: string | number | types.AccountMediaRequest, axiosConfig?: AxiosRequestConfig): Promise<types.TvResultsResponse>;
    accountRatedTvEpisodes(params?: string | number | types.AccountMediaRequest, axiosConfig?: AxiosRequestConfig): Promise<types.EpisodeResultsResponse>;
    accountMovieWatchlist(params?: string | number | types.AccountMediaRequest, axiosConfig?: AxiosRequestConfig): Promise<types.MovieResultsResponse>;
    accountTvWatchlist(params?: string | number | types.AccountMediaRequest, axiosConfig?: AxiosRequestConfig): Promise<types.TvResultsResponse>;
    accountWatchlistUpdate(params: types.AccountWatchlistRequest, axiosConfig?: AxiosRequestConfig): Promise<types.PostResponse>;
    changedMovies(params?: types.ChangesRequest, axiosConfig?: AxiosRequestConfig): Promise<types.ChangesResponse>;
    changedTvs(params?: types.ChangesRequest, axiosConfig?: AxiosRequestConfig): Promise<types.ChangesResponse>;
    changedPeople(params?: types.ChangesRequest, axiosConfig?: AxiosRequestConfig): Promise<types.ChangesResponse>;
    movieCertifications(axiosConfig?: AxiosRequestConfig): Promise<types.CertificationsResponse>;
    tvCertifications(axiosConfig?: AxiosRequestConfig): Promise<types.CertificationsResponse>;
    networkInfo(params: string | number | types.IdRequestParams, axiosConfig?: AxiosRequestConfig): Promise<types.NetworkResponse>;
    networkAlternativeNames(params: string | number | types.IdRequestParams, axiosConfig?: AxiosRequestConfig): Promise<types.CompanyAlternativeNamesResponse>;
    networkImages(params: string | number | types.IdRequestParams, axiosConfig?: AxiosRequestConfig): Promise<types.CompanyImagesResponse>;
    review(params: string | number | types.IdRequestParams, axiosConfig?: AxiosRequestConfig): Promise<types.Review>;
    episodeGroup(params: string | number | types.IdRequestParams, axiosConfig?: AxiosRequestConfig): Promise<types.EpisodeGroupResponse>;
}
//# sourceMappingURL=moviedb.d.ts.map