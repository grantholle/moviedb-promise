# moviedb-promise

[![npm](https://img.shields.io/npm/dw/moviedb-promise.svg?style=for-the-badge)](https://www.npmjs.com/package/moviedb-promise)

A Node library that makes the interaction with themoviedb.org V3 API easy.

This was originally a pull request that went stale, so it's its own package now. The original package developed by [Dan Zajdband](https://github.com/impronunciable) uses callbacks to handle the asynchronous nature of Node, while this package uses native Promises.

The main credit goes to the [original `moviedb` package](https://github.com/impronunciable/moviedb) by Dan Zajdband.

## Integrations

- [Gatsby source](https://github.com/LekoArts/gatsby-source-tmdb)

## Installation

```bash
npm install moviedb-promise --save
```

## Usage

Require the module and instantiate the class with your themoviedb.org API KEY.

```js
const MovieDb = require('moviedb-promise')
const moviedb = new MovieDb('your api key')
```

### `async/await` reminder

All functions return a Promise, which means that you can also use `async/await`. The caveat of using `await` when making function calls is that the `await` has to be within a function that has been declared `async`. Keep that in mind if you plan to use `await`.

## Examples

```js
// Using just the Promise
moviedb.searchMovie({ query: 'Alien' }).then(res => {
  console.log(res)
}).catch(console.error)

// Using await
// You probably wouldn't ever use it this way...
;(async function () {
  try {
    const res = await moviedb.searchMovie({ query: 'alien' })
    console.log(res)
  } catch (e) {
    console.log(e)
  }
})()

// This is a more reasonable example
const findMovie = async title => {
  const res = await moviedb.searchMovie({ query: title })

  return res
}

try {
  const results = findMovie('alien')
} catch (e) {
  // Do something
}
```

or

```js
moviedb.movieInfo({ id: 666 }).then(res => {
  console.log(res)
}).catch(console.error)
```

Some endpoints, such as watchlist endpoints, have an optional account id parameter. If you have a [session id](https://developers.themoviedb.org/3/authentication/how-do-i-generate-a-session-id), you don't need to provide that parameter.

```js
// This is the same as calling it as
// moviedb.accountMovieWatchlist({ id: '{account_id}' })
moviedb.sessionId = 'my-cached-session-id'
moviedb.accountMovieWatchlist().then(res => {
  // Your watchlist items
  console.log(res)
}).catch(console.error)

// Creating a session id would look something like this
moviedb.requestToken().then(token => {
  // Now you need to visit this url to authorize
  const tokenUrl = `https://www.themoviedb.org/authenticate/${token}`
}).catch(console.error)

// After that has been authorized, you can get the session id
moviedb.session().then(sessionId => {
  // Probably cache this id somewhere to avoid this workflow
  console.log(sessionId)

  // After the sessionId is cached, the next time use instantiate the class,
  // set the sessionId by moviedb.sessionId = 'my-session-id'

  // This can be called now because sessionId is set
  moviedb.accountMovieWatchlist().then(res => {
    // Your watchlist items
    console.log(res)
  }).catch(console.error)
}).catch(console.error)
```

## Advanced use

The MovieDB constructor accepts 3 parameters:

```js
const MovieDb = require('moviedb-promise')
const moviedb = new MovieDb(apiKey, useDefaultLimits, baseURL)
```

By default, moviedb-promise limits the requests you can send to 39 requests/10 seconds (this is the limit imposed by [TheMovieDB](https://developers.themoviedb.org/3/getting-started/request-rate-limiting)). This way you won't have to deal with 429 errors.

If you want to implement your own request rate limiter, you can set `useDefaultLimits` to `false` when creating the moviedb instance.

## Available methods

The Function column lists all the available functions in the class. The Endpoint column lists possible request parameters (placeholders prefixed with `:`) needed for the call. If the endpoint doesn't have any placeholders, check out the [documentation](https://developers.themoviedb.org/3/) for the query parameters you can use.

### Examples

| Function | Endpoint |
| -------- | -------- |
| tvInfo   | tv/:id   |

```js
// Two ways:
// The object key matches the placeholder name
moviedb.tvInfo({ id: 61888 }).then(...)

// Or for simplicity, if it only has one placeholder
moviedb.tvInfo(61888).then(...)
```

| Function    | Endpoint     |
| ----------- | ------------ |
| searchMovie | search/movie |

There aren't any placeholders, but the [documentation](https://developers.themoviedb.org/3/search/search-movies) shows there are `language`, `query`, `page`, `include_adult`, `region`, `year`, and `primary_release_year` available to use. Each expects a certain data type or format, so check out the docs for the details.

```js
const parameters = {
  query: 'Kindergarten Cop',
  language: 'fr' // ISO 639-1 code
}

moviedb.searchMovie(parameters).then(...)
```

### Complete list

| Function                | Endpoint                                                          |
| ----------------------- | ----------------------------------------------------------------- |
| configuration           | configuration                                                     |
| find                    | find/:id                                                          |
| searchMovie             | search/movie                                                      |
| searchTv                | search/tv                                                         |
| searchMulti             | search/multi                                                      |
| searchCollection        | search/collection                                                 |
| searchPerson            | search/person                                                     |
| searchList              | search/list                                                       |
| searchCompany           | search/company                                                    |
| searchKeyword           | search/keyword                                                    |
| collectionInfo          | collection/:id                                                    |
| collectionImages        | collection/:id/images                                             |
| collectionTranslations  | collection/:id/translations                                       |
| discoverMovie           | discover/movie                                                    |
| discoverTv              | discover/tv                                                       |
| movieInfo               | movie/:id                                                         |
| movieAlternativeTitles  | movie/:id/alternative_titles                                      |
| movieCredits            | movie/:id/credits                                                 |
| movieExternalIds        | /movie/:id/external_ids                                           |
| movieImages             | movie/:id/images                                                  |
| movieVideos             | movie/:id/videos                                                  |
| movieKeywords           | movie/:id/keywords                                                |
| movieRecommendations    | movie/:id/recommendations                                         |
| movieReleases           | movie/:id/releases                                                |
| movieReleaseDates       | movie/:id/release_dates                                           |
| movieTrailers           | movie/:id/trailers                                                |
| movieTranslations       | movie/:id/translations                                            |
| movieSimilar            | movie/:id/similar                                                 |
| movieReviews            | movie/:id/reviews                                                 |
| movieLists              | movie/:id/lists                                                   |
| movieChanges            | movie/:id/changes                                                 |
| movieRatingUpdate       | movie/:id/rating                                                  |
| tvInfo                  | tv/:id                                                            |
| tvAlternativeTitles     | tv/:id/alternative_titles                                         |
| tvContentRatings        | tv/:id/content_ratings                                            |
| tvCredits               | tv/:id/credits                                                    |
| tvEpisodeGroups         | tv/:id/episode_groups                                             |
| tvExternalIds           | tv/:id/external_ids                                               |
| tvImages                | tv/:id/images                                                     |
| tvKeywords              | tv/:id/keywords                                                   |
| tvVideos                | tv/:id/videos                                                     |
| tvScreenedTheatrically  | tv/:id/screened_theatrically                                      |
| tvReviews               | tv/:id/reviews                                                    |
| tvSimilar               | tv/:id/similar                                                    |
| tvTranslations          | tv/:id/translations                                               |
| tvSeasonInfo            | tv/:id/season/:season_number                                      |
| tvSeasonCredits         | tv/:id/season/:season_number/credits                              |
| tvSeasonVideos          | tv/:id/season/:season_number/videos                               |
| tvSeasonExternalIds     | tv/:id/season/:season_number/external_ids                         |
| tvSeasonImages          | tv/:id/season/:season_number/images                               |
| tvEpisodeInfo           | tv/:id/season/:season_number/episode/:episode_number              |
| tvEpisodeCredits        | tv/:id/season/:season_number/episode/:episode_number/credits      |
| tvEpisodeExternalIds    | tv/:id/season/:season_number/episode/:episode_number/external_ids |
| tvEpisodeImages         | tv/:id/season/:season_number/episode/:episode_number/images       |
| tvOnTheAir              | tv/on_the_air                                                     |
| tvAiringToday           | tv/airing_today                                                   |
| tvRecommendations       | tv/:id/recommendations                                            |
| tvChanges               | tv/:id/changes                                                    |
| tvRatingUpdate          | tv/:id/rating                                                     |
| personInfo              | person/:id                                                        |
| personChanges           | person/:id/changes                                                |
| personMovieCredits      | person/:id/movie_credits                                          |
| personTvCredits         | person/:id/tv_credits                                             |
| personCombinedCredits   | person/:id/combined_credits                                       |
| personExternalIds       | person/:id/external_ids                                           |
| personImages            | person/:id/images                                                 |
| personTaggedImages      | person/:id/tagged_images                                          |
| personTranslations      | person/:id/translations                                           |
| personLatest            | person/latest                                                     |
| personPopular           | person/popular                                                    |
| creditInfo              | credit/:id                                                        |
| listInfo                | list/:id                                                          |
| genreMovieList          | genre/movie/list                                                  |
| genreTvList             | genre/tv/list                                                     |
| keywordInfo             | keyword/:id                                                       |
| keywordMovies           | keyword/:id/movies                                                |
| companyInfo             | company/:id                                                       |
| companyAlternativeNames | company/:id/alternative_names                                     |
| companyImages           | company/:id/images                                                |
| accountInfo             | account                                                           |
| accountLists            | account/:id/lists                                                 |
| accountFavoriteMovies   | account/:id/favorite/movies                                       |
| accountFavoriteUpdate   | account/:id/favorite                                              |
| accountRatedMovies      | account/:id/rated/movies                                          |
| accountMovieWatchlist   | account/:id/watchlist/movies                                      |
| accountTvWatchlist      | account/:id/watchlist/tv                                          |
| accountWatchlistUpdate  | account/:id/watchlist                                             |
| accountRatedTv          | account/:id/rated/tv                                              |
| accountRatedTvEpisodes  | account/:id/rated/tv/episodes                                     |
| accountFavoriteTv       | account/:id/favorite/tv                                           |
| miscLatestMovies        | movie/latest                                                      |
| miscNowPlayingMovies    | movie/now_playing                                                 |
| miscPopularMovies       | movie/popular                                                     |
| miscTopRatedMovies      | movie/top_rated                                                   |
| miscUpcomingMovies      | movie/upcoming                                                    |
| miscChangedMovies       | movie/changes                                                     |
| miscChangedTvs          | tv/changes                                                        |
| miscChangedPeople       | person/changes                                                    |
| miscLatestTvs           | tv/latest                                                         |
| miscPopularTvs          | tv/popular                                                        |
| miscTopRatedTvs         | tv/top_rated                                                      |
| requestToken            | authentication/token/new                                          |
| session                 | authentication/session/new                                        |

## Method Options

You can set additional settings for each method call by specifying the desired property on the options object parameter.

## Support for append_to_response

The movieInfo, tvInfo, tvSeasonInfo, tvEpisodeInfo and personInfo methods support an option to specify the [TMDB API's append_to_response query parameter](https://developers.themoviedb.org/3/getting-started/append-to-response). This makes it possible to make sub requests within the same namespace in a single HTTP request. Each request will get appended to the response as a new JSON object.

```js
const res = await api.tvInfo(4629, { append_to_response: 'season/1,season/1/credits' })
```

### Request Timeouts

To specify something other than the default timeout for a method call's request, specify the timeout property of the options object. The timeout property object is the shape of a standard [superagent timeout object](https://visionmedia.github.io/superagent/#timeouts).

```js
const res = await api.tvInfo(4629, { timeout: { response: 10000, deadline: 30000 } });
```
or when combining multiple options append_to_response is desired:
```js
const res = await api.tvInfo(
  4629,
  {
    append_to_response: 'season/1,season/1/credits',
    timeout: { response: 10000, deadline: 30000 }
  }
);
```

## Contributing

First, thanks for taking the time!

Second, before submitting a pull request, make sure to run `npm run test` to make sure the tests pass and `npm run lint` to fix any code style errors.

If you make any endpoint changes, you can run `npm run table` to generate the markdown table for the readme.

## License

[MIT](LICENSE.md)
