# moviedb-promise

A Node library that makes the interaction with themoviedb.org V3 API easy.

This was original a pull request that went stale, so it's its own package now. The original package developed by [IMPRONUNCIABLE](https://github.com/impronunciable) uses callbacks to handle the asynchronous nature of Node, while this package uses native Promises.

The main credit goes to the [original `moviedb` package](https://github.com/impronunciable/moviedb).

## Installation

```bash
npm install moviedb-promise --save
```

## Usage

Require the module and instantiate the class with your themoviedb.org API KEY.

```js
const MovieDb = require('moviedb')
const moviedb = new MovieDb('your api key')
```

All api methods return a Promise. Use the api methods as you want, for example:

```js
moviedb.searchMovie({ query: 'Alien' }).then(res => {
  console.log(res)
}).catch(console.error)
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

  // This can be called now because sessionId is set
  moviedb.accountMovieWatchlist().then(res => {
    // Your watchlist items
    console.log(res)
  }).catch(console.error)
}).catch(console.error)
```

## Available methods

All V3 functionality is included. Endpoints and their respective method names can be seen on the [wiki page](https://github.com/impronunciable/moviedb/wiki/Library-endpoints).
