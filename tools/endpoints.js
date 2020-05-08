module.exports = [
  {
    prefix: 'configuration',
    endpoints: [
      {
        path: 'configuration',
        verb: 'get'
      },
    ]
  },
  {
    prefix: 'find',
    endpoints: [
      {
        path: 'find/:id',
        verb: 'get'
      },
    ]
  },
  {
    prefix: 'search',
    endpoints: [
      {
        name: 'Movie',
        path: 'search/movie',
        verb: 'get'
      },
      {
        name: 'Tv',
        path: 'search/tv',
        verb: 'get'
      },
      {
        name: 'Multi',
        path: 'search/multi',
        verb: 'get'
      },
      {
        name: 'Collection',
        path: 'search/collection',
        verb: 'get'
      },
      {
        name: 'Person',
        path: 'search/person',
        verb: 'get'
      },
      {
        name: 'List',
        path: 'search/list',
        verb: 'get'
      },
      {
        name: 'Company',
        path: 'search/company',
        verb: 'get'
      },
      {
        name: 'Keyword',
        path: 'search/keyword',
        verb: 'get'
      }
    ]
  },
  {
    prefix: 'collection',
    endpoints: [
      {
        name: 'Info',
        path: 'collection/:id',
        verb: 'get'
      },
      {
        name: 'Images',
        path: 'collection/:id/images',
        verb: 'get'
      },
      {
        name: 'Translations',
        path: 'collection/:id/translations',
        verb: 'get'
      }
    ]
  },
  {
    prefix: 'discover',
    endpoints: [
      {
        name: 'Movie',
        path: 'discover/movie',
        verb: 'get'
      },
      {
        name: 'Tv',
        path: 'discover/tv',
        verb: 'get'
      }
    ]
  },
  {
    prefix: 'trending',
    endpoints: [
      {
        path: 'trending/:media_type/:time_window',
        verb: 'get'
      }
    ]
  },
  {
    prefix: 'movie',
    endpoints: [
      {
        name: 'Info',
        path: 'movie/:id',
        verb: 'get'
      },
      {
        name: 'AlternativeTitles',
        path: 'movie/:id/alternative_titles',
        verb: 'get'
      },
      {
        name: 'Credits',
        path: 'movie/:id/credits',
        verb: 'get'
      },
      {
        name: 'ExternalIds',
        path: '/movie/:id/external_ids',
        verb: 'get'
      },
      {
        name: 'Images',
        path: 'movie/:id/images',
        verb: 'get'
      },
      {
        name: 'Videos',
        path: 'movie/:id/videos',
        verb: 'get'
      },
      {
        name: 'Keywords',
        path: 'movie/:id/keywords',
        verb: 'get'
      },
      {
        name: 'Recommendations',
        path: 'movie/:id/recommendations',
        verb: 'get'
      },
      {
        name: 'Releases',
        path: 'movie/:id/releases',
        verb: 'get'
      },
      {
        name: 'ReleaseDates',
        path: 'movie/:id/release_dates',
        verb: 'get'
      },
      {
        name: 'Trailers',
        path: 'movie/:id/trailers',
        verb: 'get'
      },
      {
        name: 'Translations',
        path: 'movie/:id/translations',
        verb: 'get'
      },
      {
        name: 'Similar',
        path: 'movie/:id/similar',
        verb: 'get'
      },
      {
        name: 'Reviews',
        path: 'movie/:id/reviews',
        verb: 'get'
      },
      {
        name: 'Lists',
        path: 'movie/:id/lists',
        verb: 'get'
      },
      {
        name: 'Changes',
        path: 'movie/:id/changes',
        verb: 'get'
      },
      {
        name: 'RatingUpdate',
        path: 'movie/:id/rating',
        verb: 'post'
      }
    ]
  },
  {
    prefix: 'tv',
    endpoints: [
      {
        name: 'Info',
        path: 'tv/:id',
        verb: 'get'
      },
      {
        name: 'AlternativeTitles',
        path: 'tv/:id/alternative_titles',
        verb: 'get'
      },
      {
        name: 'ContentRatings',
        path: 'tv/:id/content_ratings',
        verb: 'get'
      },
      {
        name: 'Credits',
        path: 'tv/:id/credits',
        verb: 'get'
      },
      {
        name: 'EpisodeGroups',
        path: 'tv/:id/episode_groups',
        verb: 'get'
      },
      {
        name: 'ExternalIds',
        path: 'tv/:id/external_ids',
        verb: 'get'
      },
      {
        name: 'Images',
        path: 'tv/:id/images',
        verb: 'get'
      },
      {
        name: 'Keywords',
        path: 'tv/:id/keywords',
        verb: 'get'
      },
      {
        name: 'Videos',
        path: 'tv/:id/videos',
        verb: 'get'
      },
      {
        name: 'ScreenedTheatrically',
        path: 'tv/:id/screened_theatrically',
        verb: 'get'
      },
      {
        name: 'Reviews',
        path: 'tv/:id/reviews',
        verb: 'get'
      },
      {
        name: 'Similar',
        path: 'tv/:id/similar',
        verb: 'get'
      },
      {
        name: 'Translations',
        path: 'tv/:id/translations',
        verb: 'get'
      },
      {
        name: 'SeasonInfo',
        path: 'tv/:id/season/:season_number',
        verb: 'get'
      },
      {
        name: 'SeasonCredits',
        path: 'tv/:id/season/:season_number/credits',
        verb: 'get'
      },
      {
        name: 'SeasonVideos',
        path: 'tv/:id/season/:season_number/videos',
        verb: 'get'
      },
      {
        name: 'SeasonExternalIds',
        path: 'tv/:id/season/:season_number/external_ids',
        verb: 'get'
      },
      {
        name: 'SeasonImages',
        path: 'tv/:id/season/:season_number/images',
        verb: 'get'
      },
      {
        name: 'EpisodeInfo',
        path: 'tv/:id/season/:season_number/episode/:episode_number',
        verb: 'get'
      },
      {
        name: 'EpisodeCredits',
        path: 'tv/:id/season/:season_number/episode/:episode_number/credits',
        verb: 'get'
      },
      {
        name: 'EpisodeExternalIds',
        path: 'tv/:id/season/:season_number/episode/:episode_number/external_ids',
        verb: 'get'
      },
      {
        name: 'EpisodeImages',
        path: 'tv/:id/season/:season_number/episode/:episode_number/images',
        verb: 'get'
      },
      {
        name: 'OnTheAir',
        path: 'tv/on_the_air',
        verb: 'get'
      },
      {
        name: 'AiringToday',
        path: 'tv/airing_today',
        verb: 'get'
      },
      {
        name: 'Recommendations',
        path: 'tv/:id/recommendations',
        verb: 'get'
      },
      {
        name: 'Changes',
        path: 'tv/:id/changes',
        verb: 'get'
      },
      {
        name: 'RatingUpdate',
        path: 'tv/:id/rating',
        verb: 'post'
      }
    ]
  },
  {
    prefix: 'person',
    endpoints: [
      {
        name: 'Info',
        path: 'person/:id',
        verb: 'get'
      },
      {
        name: 'Changes',
        path: 'person/:id/changes',
        verb: 'get'
      },
      {
        name: 'MovieCredits',
        path: 'person/:id/movie_credits',
        verb: 'get'
      },
      {
        name: 'TvCredits',
        path: 'person/:id/tv_credits',
        verb: 'get'
      },
      {
        name: 'CombinedCredits',
        path: 'person/:id/combined_credits',
        verb: 'get'
      },
      {
        name: 'ExternalIds',
        path: 'person/:id/external_ids',
        verb: 'get'
      },
      {
        name: 'Images',
        path: 'person/:id/images',
        verb: 'get'
      },
      {
        name: 'TaggedImages',
        path: 'person/:id/tagged_images',
        verb: 'get'
      },
      {
        name: 'Translations',
        path: 'person/:id/translations',
        verb: 'get'
      },
      {
        name: 'Latest',
        path: 'person/latest',
        verb: 'get'
      },
      {
        name: 'Popular',
        path: 'person/popular',
        verb: 'get'
      }
    ]
  },
  {
    prefix: 'credit',
    endpoints: [
      {
        name: 'Info',
        path: 'credit/:id',
        verb: 'get'
      }
    ]
  },
  {
    prefix: 'list',
    endpoints: [
      {
        name: 'Info',
        path: 'list/:id',
        verb: 'get'
      }
    ]
  },
  {
    prefix: 'genre',
    endpoints: [
      {
        name: 'MovieList',
        path: 'genre/movie/list',
        verb: 'get'
      },
      {
        name: 'TvList',
        path: 'genre/tv/list',
        verb: 'get'
      }
    ]
  },
  {
    prefix: 'keyword',
    endpoints: [
      {
        name: 'Info',
        path: 'keyword/:id',
        verb: 'get'
      },
      {
        name: 'Movies',
        path: 'keyword/:id/movies',
        verb: 'get'
      }
    ]
  },
  {
    prefix: 'company',
    endpoints: [
      {
        name: 'Info',
        path: 'company/:id',
        verb: 'get'
      },
      {
        name: 'AlternativeNames',
        path: 'company/:id/alternative_names',
        verb: 'get'
      },
      {
        name: 'Images',
        path: 'company/:id/images',
        verb: 'get'
      }
    ]
  },
  {
    prefix: 'account',
    endpoints: [
      {
        name: 'Info',
        path: 'account',
        verb: 'get'
      },
      {
        name: 'Lists',
        path: 'account/:id/lists',
        verb: 'get'
      },
      {
        name: 'FavoriteMovies',
        path: 'account/:id/favorite/movies',
        verb: 'get'
      },
      {
        name: 'FavoriteUpdate',
        path: 'account/:id/favorite',
        verb: 'post'
      },
      {
        name: 'RatedMovies',
        path: 'account/:id/rated/movies',
        verb: 'get'
      },
      {
        name: 'MovieWatchlist',
        path: 'account/:id/watchlist/movies',
        verb: 'get'
      },
      {
        name: 'TvWatchlist',
        path: 'account/:id/watchlist/tv',
        verb: 'get'
      },
      {
        name: 'WatchlistUpdate',
        path: 'account/:id/watchlist',
        verb: 'post'
      },
      {
        name: 'RatedTv',
        path: 'account/:id/rated/tv',
        verb: 'get'
      },
      {
        name: 'RatedTvEpisodes',
        path: 'account/:id/rated/tv/episodes',
        verb: 'get'
      },
      {
        name: 'FavoriteTv',
        path: 'account/:id/favorite/tv',
        verb: 'get'
      }
    ]
  },
  {
    prefix: 'misc',
    endpoints: [
      {
        name: 'LatestMovies',
        path: 'movie/latest',
        verb: 'get'
      },
      {
        name: 'NowPlayingMovies',
        path: 'movie/now_playing',
        verb: 'get'
      },
      {
        name: 'PopularMovies',
        path: 'movie/popular',
        verb: 'get'
      },
      {
        name: 'TopRatedMovies',
        path: 'movie/top_rated',
        verb: 'get'
      },
      {
        name: 'UpcomingMovies',
        path: 'movie/upcoming',
        verb: 'get'
      },
      {
        name: 'ChangedMovies',
        path: 'movie/changes',
        verb: 'get'
      },
      {
        name: 'ChangedTvs',
        path: 'tv/changes',
        verb: 'get'
      },
      {
        name: 'ChangedPeople',
        path: 'person/changes',
        verb: 'get'
      },
      {
        name: 'LatestTvs',
        path: 'tv/latest',
        verb: 'get'
      },
      {
        name: 'PopularTvs',
        path: 'tv/popular',
        verb: 'get'
      },
      {
        name: 'TopRatedTvs',
        path: 'tv/top_rated',
        verb: 'get'
      }
    ]
  }
]
