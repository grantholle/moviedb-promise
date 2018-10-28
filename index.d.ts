// Type definitions for MovieDb
// Project: moviedb-promise
// Definitions by: Grant Holle <grantholle.com>

export = MovieDb

declare class MovieDb {
  constructor (apiKey: string, useDefaultLimits?: boolean, baseUrl?: string)
  configuration (params: any, options?: any): Promise<any>
  find (params: any, options?: any): Promise<any>
  searchMovie (params: any, options?: any): Promise<any>
  searchTv (params: any, options?: any): Promise<any>
  searchMulti (params: any, options?: any): Promise<any>
  searchCollection (params: any, options?: any): Promise<any>
  searchPerson (params: any, options?: any): Promise<any>
  searchList (params: any, options?: any): Promise<any>
  searchCompany (params: any, options?: any): Promise<any>
  searchKeyword (params: any, options?: any): Promise<any>
  collectionInfo (params: any, options?: any): Promise<any>
  collectionImages (params: any, options?: any): Promise<any>
  discoverMovie (params: any, options?: any): Promise<any>
  discoverTv (params: any, options?: any): Promise<any>
  movieInfo (params: any, options?: any): Promise<any>
  movieAlternativeTitles (params: any, options?: any): Promise<any>
  movieCredits (params: any, options?: any): Promise<any>
  movieExternalIds (params: any, options?: any): Promise<any>
  movieImages (params: any, options?: any): Promise<any>
  movieVideos (params: any, options?: any): Promise<any>
  movieKeywords (params: any, options?: any): Promise<any>
  movieRecommendations (params: any, options?: any): Promise<any>
  movieReleases (params: any, options?: any): Promise<any>
  movieReleaseDates (params: any, options?: any): Promise<any>
  movieTrailers (params: any, options?: any): Promise<any>
  movieTranslations (params: any, options?: any): Promise<any>
  movieSimilar (params: any, options?: any): Promise<any>
  movieReviews (params: any, options?: any): Promise<any>
  movieLists (params: any, options?: any): Promise<any>
  movieChanges (params: any, options?: any): Promise<any>
  movieRatingUpdate (params: any, options?: any): Promise<any>
  tvInfo (params: any, options?: any): Promise<any>
  tvCredits (params: any, options?: any): Promise<any>
  tvExternalIds (params: any, options?: any): Promise<any>
  tvImages (params: any, options?: any): Promise<any>
  tvVideos (params: any, options?: any): Promise<any>
  tvSimilar (params: any, options?: any): Promise<any>
  tvTranslations (params: any, options?: any): Promise<any>
  tvSeasonInfo (params: any, options?: any): Promise<any>
  tvSeasonCredits (params: any, options?: any): Promise<any>
  tvSeasonVideos (params: any, options?: any): Promise<any>
  tvSeasonExternalIds (params: any, options?: any): Promise<any>
  tvSeasonImages (params: any, options?: any): Promise<any>
  tvEpisodeInfo (params: any, options?: any): Promise<any>
  tvEpisodeCredits (params: any, options?: any): Promise<any>
  tvEpisodeExternalIds (params: any, options?: any): Promise<any>
  tvEpisodeImages (params: any, options?: any): Promise<any>
  tvOnTheAir (params: any, options?: any): Promise<any>
  tvAiringToday (params: any, options?: any): Promise<any>
  tvRecommend (params: any, options?: any): Promise<any>
  tvChanges (params: any, options?: any): Promise<any>
  personInfo (params: any, options?: any): Promise<any>
  personMovieCredits (params: any, options?: any): Promise<any>
  personTvCredits (params: any, options?: any): Promise<any>
  personCombinedCredits (params: any, options?: any): Promise<any>
  personImages (params: any, options?: any): Promise<any>
  personTaggedImages (params: any, options?: any): Promise<any>
  personChanges (params: any, options?: any): Promise<any>
  personLatest (params: any, options?: any): Promise<any>
  personPopular (params: any, options?: any): Promise<any>
  personExternalIds (params: any, options?: any): Promise<any>
  creditInfo (params: any, options?: any): Promise<any>
  listInfo (params: any, options?: any): Promise<any>
  genreMovieList (params: any, options?: any): Promise<any>
  genreTvList (params: any, options?: any): Promise<any>
  genreMovies (params: any, options?: any): Promise<any>
  keywordInfo (params: any, options?: any): Promise<any>
  keywordMovies (params: any, options?: any): Promise<any>
  companyInfo (params: any, options?: any): Promise<any>
  companyMovies (params: any, options?: any): Promise<any>
  accountInfo (params: any, options?: any): Promise<any>
  accountLists (params: any, options?: any): Promise<any>
  accountFavoriteMovies (params: any, options?: any): Promise<any>
  accountFavoriteUpdate (params: any, options?: any): Promise<any>
  accountRatedMovies (params: any, options?: any): Promise<any>
  accountMovieWatchlist (params: any, options?: any): Promise<any>
  accountTvWatchlist (params: any, options?: any): Promise<any>
  accountWatchlistUpdate (params: any, options?: any): Promise<any>
  miscLatestMovies (params: any, options?: any): Promise<any>
  miscUpcomingMovies (params: any, options?: any): Promise<any>
  miscNowPlayingMovies (params: any, options?: any): Promise<any>
  miscPopularMovies (params: any, options?: any): Promise<any>
  miscTopRatedMovies (params: any, options?: any): Promise<any>
  miscChangedMovies (params: any, options?: any): Promise<any>
  miscChangedTvs (params: any, options?: any): Promise<any>
  miscChangedPeople (params: any, options?: any): Promise<any>
  miscTopRatedTvs (params: any, options?: any): Promise<any>
  miscPopularTvs (params: any, options?: any): Promise<any>
  requestToken (): Promise<string>
  session (): Promise<string>
}
