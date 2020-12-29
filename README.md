# moviedb-promise

[![npm](https://img.shields.io/npm/dw/moviedb-promise.svg?style=for-the-badge)](https://www.npmjs.com/package/moviedb-promise)

A Node library that makes the interaction with themoviedb.org V3 API easy... Now in TypeScript!

This was originally a pull request that went stale, so it's its own package now. The original package developed by [Dan Zajdband](https://github.com/impronunciable) uses callbacks to handle the asynchronous nature of Node, while this package uses native Promises.

The main credit goes to the [original `moviedb` package](https://github.com/impronunciable/moviedb) by Dan Zajdband.

## Changelog for v3

- Each tmdb function has the correct parameter and response types based on the documentation
- `append_to_response` should be added to the request parameter of the appropriate functions and not on the options
- The last parameter to each function can be an axios config object and will overwrite anything on the underlying request.
- Several functions have been renamed.
- Search functions accept a string and will be used for the `query` property.

## Changelog for v2

- Source has been ported to TypeScript.
- [Rate limiting was removed by tmdb](https://github.com/grantholle/moviedb-promise/issues/23). The functionality had remained, but has since been removed in v2. If you wish to add it back, you're welcome to open a PR to discuss its need.
- The `MovieDb` class has been moved to be a property of the package export. You will need to reference the `MovieDb` property of the export in order to instantiate the class. See usage below for an example.
- The constructor has been changed to accept only two parameters: an api key and the base url for tmdb.
- The `session()` function has been renamed to `retrieveSession()`
- Requests were previously made using [superagent](https://www.npmjs.com/package/superagent) as it was used by the [original `moviedb` package](https://github.com/impronunciable/moviedb). It has been replaced with [axios](https://www.npmjs.com/package/axios) now.

## Integrations

- [Gatsby source](https://github.com/LekoArts/gatsby-source-tmdb)

## Installation

```bash
npm install moviedb-promise --save
```

## Usage

Require the module and instantiate the class with your themoviedb.org api key.

```js
const { MovieDb } = require('moviedb-promise')
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
  // Equivalant to { query: title }
  const res = await moviedb.searchMovie(title)

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
moviedb.retrieveSession().then(sessionId => {
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

### Complete function list

| Function |
| -------- |
| configuration |
| countries |
| jobs |
| languages |
| primaryTranslations |
| timezones |
| find |
| searchCompany |
| searchCollection |
| searchKeyword |
| searchMovie |
| searchMulti |
| searchPerson |
| searchTv |
| searchList |
| collectionInfo |
| collectionImages |
| collectionTranslations |
| discoverMovie |
| discoverTv |
| trending |
| movieInfo |
| movieAccountStates |
| movieAlternativeTitles |
| movieChanges |
| movieCredits |
| movieExternalIds |
| movieImages |
| movieKeywords |
| movieReleaseDates |
| movieVideos |
| movieWatchProviders |
| movieTranslations |
| movieRecommendations |
| movieSimilar |
| movieReviews |
| movieLists |
| movieRatingUpdate |
| movieRatingDelete |
| movieLatest |
| movieNowPlaying |
| moviePopular |
| movieTopRated |
| upcomingMovies |
| tvInfo |
| tvAccountStates |
| tvAlternativeTitles |
| tvChanges |
| tvContentRatings |
| tvCredits |
| episodeGroups |
| tvExternalIds |
| tvImages |
| tvKeywords |
| tvRecommendations |
| tvReviews |
| tvScreenedTheatrically |
| tvSimilar |
| tvTranslations |
| tvVideos |
| tvWatchProviders |
| tvRatingUpdate |
| tvRatingDelete |
| tvLatest |
| tvAiringToday |
| tvOnTheAir |
| tvPopular |
| tvTopRated |
| seasonInfo |
| seasonChanges |
| seasonAccountStates |
| seasonCredits |
| seasonExternalIds |
| seasonImages |
| seasonVideos |
| episodeInfo |
| episodeChanges |
| episodeAccountStates |
| episodeCredits |
| episodeExternalIds |
| episodeImages |
| episodeTranslations |
| episodeRatingUpdate |
| episodeRatingDelete |
| episodeVideos |
| personInfo |
| personChanges |
| personMovieCredits |
| personTvCredits |
| personCombinedCredits |
| personExternalIds |
| personImages |
| personTaggedImages |
| personTranslations |
| personLatest |
| personPopular |
| creditInfo |
| listInfo |
| listStatus |
| createList |
| createListItem |
| removeListItem |
| clearList |
| deleteList |
| genreMovieList |
| genreTvList |
| keywordInfo |
| keywordMovies |
| companyInfo |
| companyAlternativeNames |
| companyImages |
| accountInfo |
| accountLists |
| accountFavoriteMovies |
| accountFavoriteTv |
| accountFavoriteUpdate |
| accountRatedMovies |
| accountRatedTv |
| accountRatedTvEpisodes |
| accountMovieWatchlist |
| accountTvWatchlist |
| accountWatchlistUpdate |
| changedMovies |
| changedTvs |
| changedPeople |
| movieCertifications |
| tvCertifications |
| networkInfo |
| networkAlternativeNames |
| networkImages |
| review |
| episodeGroup |

## Support for append_to_response

The movieInfo, tvInfo, tvSeasonInfo, tvEpisodeInfo and personInfo methods support an option to specify the [TMDB API's append_to_response query parameter](https://developers.themoviedb.org/3/getting-started/append-to-response). This makes it possible to make sub requests within the same namespace in a single HTTP request. Each request will get appended to the response as a new JSON object.

```js
const res = await api.tvInfo({ id: 4629, append_to_response: 'season/1,season/1/credits' })
```

### Request Options

The last parameter of the endpoint function calls is an [axios request config object](https://github.com/axios/axios#request-config). Those settings will overwrite anything on the underlying request.

```js
// Add a timeout restriction to the request
const res = await api.tvInfo(4629, { timeout: 10000 });
```

or when combining multiple options append_to_response is desired:

```js
const res = await api.tvInfo(
  {
    id: 4629,
    append_to_response: 'season/1,season/1/credits',
  },
  {
    timeout: 10000
  }
);
```

## Contributing

First, thanks for taking the time!

Second, before submitting a pull request, make sure to run `npm run test` to make sure the tests pass and if you add any features be sure to add the appropriate tests.

## License

[MIT](LICENSE.md)
