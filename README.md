# moviedb-promise

[![npm](https://img.shields.io/npm/dw/moviedb-promise.svg?style=for-the-badge)](https://www.npmjs.com/package/moviedb-promise)

A Node library that makes the interaction with themoviedb.org V3 API easy... Now in TypeScript!

This was originally a pull request that went stale, so it's its own package now. The original package developed by [Dan Zajdband](https://github.com/impronunciable) uses callbacks to handle the asynchronous nature of Node, while this package uses native Promises.

The main credit goes to the [original `moviedb` package](https://github.com/impronunciable/moviedb) by Dan Zajdband.

## What is themoviedb.org?

The Movie Database (TMDB) is a community built project that stores data about movies and television shows. The project started in 2008 and has become one of the largest databases in the world. There are few databases with the vast data TMDB provides. In addition, TMDB gives special attention to international content which is often difficult to find on other databases. TMDB supports 39 different languages and is currently used in 180 countries.

In addition to information about actors, directors, production years, movie titles, genres, etc., TMDB also provides high resolution posters and fanart that can easily be incorporated into personal projects. The size of the image database is vast and growing at a rate of 1000 images a day. TMDB processes over 3 billion requests by millions of users daily.

The vast amount of data gathered and stored by TMDB can be accessed via its API. With a key and a URL, making a request is simple. However, managing all the requests needed to create say, a movie rating website, would be quite the task. You'd have to create a function for every type of request needed. That's where moviedb-promise comes in. With it's suite of over 100 functions, moviedb-promise makes interacting with TMDB easy.

## Changelog for v4

- Updated dependencies that may not support lower versions of Node
- Implemented a throttle for Cloudflare rate limiting ([#72](https://github.com/grantholle/moviedb-promise/pull/74)) (thanks [@alexanderroidl](https://github.com/alexanderroidl))

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
moviedb
  .searchMovie({ query: 'Alien' })
  .then((res) => {
    console.log(res)
  })
  .catch(console.error)

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
const findMovie = async (title) => {
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
moviedb
  .movieInfo({ id: 666 })
  .then((res) => {
    console.log(res)
  })
  .catch(console.error)
```

or

controller file example that

- uses async await
- reads from a .env file
- includes parameters
- handles errors

```js
import { MovieDb } from 'moviedb-promise'
import dotenv from 'dotenv'

dotenv.config()

const moviedb = new MovieDb(process.env.KEY)

const newError = (name) => {
  const e = new Error(name)
  e.name = name
  return Promise.reject(e)
}

export const searchMovie = async (req) => {
  const parameters = {
    query: req.query.name,
    page: req.query.page,
  }
  try {
    const res = await moviedb.searchMovie(parameters)
    return res.results
  } catch (error) {
    return newError(error)
  }
}

export const searchPerson = async (req) => {
  const parameters = {
    query: req.query.name,
    page: 1,
  }
  try {
    const res = await moviedb.searchPerson(parameters)
    return res.results
  } catch (error) {
    return newError(error)
  }
}

export const movieKeywords = async (req) => {
  try {
    const res = await moviedb.movieKeywords({ query: req.query.name })
    return res.results
  } catch (error) {
    return newError(error)
  }
}
```

Some endpoints, such as watchlist endpoints, have an optional account id parameter. If you have a [session id](https://developers.themoviedb.org/3/authentication/how-do-i-generate-a-session-id), you don't need to provide that parameter.

```js
// This is the same as calling it as
// moviedb.accountMovieWatchlist({ id: '{account_id}' })
moviedb.sessionId = 'my-cached-session-id'
moviedb
  .accountMovieWatchlist()
  .then((res) => {
    // Your watchlist items
    console.log(res)
  })
  .catch(console.error)

// Creating a session id would look something like this
moviedb
  .requestToken()
  .then((token) => {
    // Now you need to visit this url to authorize
    const tokenUrl = `https://www.themoviedb.org/authenticate/${token}`
  })
  .catch(console.error)

// After that has been authorized, you can get the session id
moviedb
  .retrieveSession()
  .then((sessionId) => {
    // Probably cache this id somewhere to avoid this workflow
    console.log(sessionId)

    // After the sessionId is cached, the next time use instantiate the class,
    // set the sessionId by moviedb.sessionId = 'my-session-id'

    // This can be called now because sessionId is set
    moviedb
      .accountMovieWatchlist()
      .then((res) => {
        // Your watchlist items
        console.log(res)
      })
      .catch(console.error)
  })
  .catch(console.error)
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

| Function                 |
| ------------------------ |
| configuration            |
| countries                |
| jobs                     |
| languages                |
| primaryTranslations      |
| timezones                |
| find                     |
| searchCompany            |
| searchCollection         |
| searchKeyword            |
| searchMovie              |
| searchMulti              |
| searchPerson             |
| searchTv                 |
| searchList               |
| collectionInfo           |
| collectionImages         |
| collectionTranslations   |
| discoverMovie            |
| discoverTv               |
| trending                 |
| movieInfo                |
| movieAccountStates       |
| movieAlternativeTitles   |
| movieChanges             |
| movieCredits             |
| movieExternalIds         |
| movieImages              |
| movieKeywords            |
| movieReleaseDates        |
| movieVideos              |
| movieWatchProvidersForId |
| movieWatchProviders      |
| movieTranslations        |
| movieRecommendations     |
| movieSimilar             |
| movieReviews             |
| movieLists               |
| movieRatingUpdate        |
| movieRatingDelete        |
| movieLatest              |
| movieNowPlaying          |
| moviePopular             |
| movieTopRated            |
| upcomingMovies           |
| tvInfo                   |
| tvAccountStates          |
| tvAlternativeTitles      |
| tvChanges                |
| tvContentRatings         |
| tvCredits                |
| episodeGroups            |
| tvExternalIds            |
| tvImages                 |
| tvKeywords               |
| tvRecommendations        |
| tvReviews                |
| tvScreenedTheatrically   |
| tvSimilar                |
| tvTranslations           |
| tvVideos                 |
| tvWatchProvidersForId    |
| tvWatchProviders         |
| tvRatingUpdate           |
| tvRatingDelete           |
| tvLatest                 |
| tvAiringToday            |
| tvOnTheAir               |
| tvPopular                |
| tvTopRated               |
| seasonInfo               |
| seasonChanges            |
| seasonAccountStates      |
| seasonCredits            |
| seasonExternalIds        |
| seasonImages             |
| seasonVideos             |
| episodeInfo              |
| episodeChanges           |
| episodeAccountStates     |
| episodeCredits           |
| episodeExternalIds       |
| episodeImages            |
| episodeTranslations      |
| episodeRatingUpdate      |
| episodeRatingDelete      |
| episodeVideos            |
| personInfo               |
| personChanges            |
| personMovieCredits       |
| personTvCredits          |
| personCombinedCredits    |
| personExternalIds        |
| personImages             |
| personTaggedImages       |
| personTranslations       |
| personLatest             |
| personPopular            |
| creditInfo               |
| listInfo                 |
| listStatus               |
| createList               |
| createListItem           |
| removeListItem           |
| clearList                |
| deleteList               |
| genreMovieList           |
| genreTvList              |
| keywordInfo              |
| keywordMovies            |
| companyInfo              |
| companyAlternativeNames  |
| companyImages            |
| accountInfo              |
| accountLists             |
| accountFavoriteMovies    |
| accountFavoriteTv        |
| accountFavoriteUpdate    |
| accountRatedMovies       |
| accountRatedTv           |
| accountRatedTvEpisodes   |
| accountMovieWatchlist    |
| accountTvWatchlist       |
| accountWatchlistUpdate   |
| changedMovies            |
| changedTvs               |
| changedPeople            |
| movieCertifications      |
| tvCertifications         |
| networkInfo              |
| networkAlternativeNames  |
| networkImages            |
| review                   |
| episodeGroup             |

## Support for append_to_response

The movieInfo, tvInfo, seasonInfo, episodeInfo and personInfo methods support an option to specify the [TMDB API's append_to_response query parameter](https://developers.themoviedb.org/3/getting-started/append-to-response). This makes it possible to make sub requests within the same namespace in a single HTTP request. Each request will get appended to the response as a new JSON object.

In order to receive type support for the items returned with an `append_to_response` request, you'll need to cast the attributes as their appropriate type. **Note** this requires you to be using TypeScript.

```ts
const response = await moviedb.movieInfo({ id: tmdbId, append_to_response: "release_dates" })
  as MovieResponse & { release_dates: MovieReleaseDatesResponse }
```

In this case, `response.release_dates` will be cast as `MovieReleaseDatesResponse` since it's not in the default `MovieResponse` that gets returned with `movieInfo()`.

```js
const res = await api.tvInfo({
  id: 4629,
  append_to_response: 'season/1,season/1/credits',
})
```

### Request Options

The last parameter of the endpoint function calls is an [axios request config object](https://github.com/axios/axios#request-config). Those settings will overwrite anything on the underlying request.

```js
// Add a timeout restriction to the request
const res = await api.tvInfo(4629, { timeout: 10000 })
```

or when combining multiple options append_to_response is desired:

```js
const res = await api.tvInfo(
  {
    id: 4629,
    append_to_response: 'season/1,season/1/credits',
  },
  {
    timeout: 10000,
  },
)
```

## Contributing

First, thanks for taking the time!

#### Testing

- Before submitting a pull request, please run `npm run test`
- Make sure all tests pass before submitting a pull request
- Add tests from any features you add

#### Submitting changes

Please submit a pull request with an outline of what you've added/changed/removed. When you submit your code, please include examples and make sure that you submit one feature per commit.

#### Syntax guidelines

- Use TypeScript
- Run `npm run format` before submitting to let Prettier handle the formatting
- Avoid code that is platform dependent

#### Documentation guidelines

- Use Markdown
- Reference a class with [ClassName]
- Reference an instance of a class with [Classname::methodName]
- Reference a method in class with [Classname.methodName]

## License

[MIT](LICENSE.md)
