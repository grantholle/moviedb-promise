import { HttpMethod, EndpointGroup } from '../types'

const endpoints: Array<EndpointGroup> = [
  {
    prefix: 'configuration',
    endpoints: [
      {
        path: 'configuration',
        verb: HttpMethod.Get
      },
    ]
  },
  {
    prefix: 'find',
    endpoints: [
      {
        path: 'find/:id',
        verb: HttpMethod.Get
      },
    ]
  },
  {
    prefix: 'search',
    endpoints: [
      {
        name: 'Movie',
        path: 'search/movie',
        verb: HttpMethod.Get
      },
      {
        name: 'Tv',
        path: 'search/tv',
        verb: HttpMethod.Get
      },
      {
        name: 'Multi',
        path: 'search/multi',
        verb: HttpMethod.Get
      },
      {
        name: 'Collection',
        path: 'search/collection',
        verb: HttpMethod.Get
      },
      {
        name: 'Person',
        path: 'search/person',
        verb: HttpMethod.Get
      },
      {
        name: 'List',
        path: 'search/list',
        verb: HttpMethod.Get
      },
      {
        name: 'Company',
        path: 'search/company',
        verb: HttpMethod.Get
      },
      {
        name: 'Keyword',
        path: 'search/keyword',
        verb: HttpMethod.Get
      }
    ]
  },
  {
    prefix: 'collection',
    endpoints: [
      {
        name: 'Info',
        path: 'collection/:id',
        verb: HttpMethod.Get
      },
      {
        name: 'Images',
        path: 'collection/:id/images',
        verb: HttpMethod.Get
      },
      {
        name: 'Translations',
        path: 'collection/:id/translations',
        verb: HttpMethod.Get
      }
    ]
  },
  {
    prefix: 'discover',
    endpoints: [
      {
        name: 'Movie',
        path: 'discover/movie',
        verb: HttpMethod.Get
      },
      {
        name: 'Tv',
        path: 'discover/tv',
        verb: HttpMethod.Get
      }
    ]
  },
  {
    prefix: 'trending',
    endpoints: [
      {
        path: 'trending/:media_type/:time_window',
        verb: HttpMethod.Get
      }
    ]
  },
  {
    prefix: 'movie',
    endpoints: [
      {
        name: 'Info',
        path: 'movie/:id',
        verb: HttpMethod.Get
      },
      {
        name: 'AlternativeTitles',
        path: 'movie/:id/alternative_titles',
        verb: HttpMethod.Get
      },
      {
        name: 'Credits',
        path: 'movie/:id/credits',
        verb: HttpMethod.Get
      },
      {
        name: 'ExternalIds',
        path: '/movie/:id/external_ids',
        verb: HttpMethod.Get
      },
      {
        name: 'Images',
        path: 'movie/:id/images',
        verb: HttpMethod.Get
      },
      {
        name: 'Videos',
        path: 'movie/:id/videos',
        verb: HttpMethod.Get
      },
      {
        name: 'Keywords',
        path: 'movie/:id/keywords',
        verb: HttpMethod.Get
      },
      {
        name: 'Recommendations',
        path: 'movie/:id/recommendations',
        verb: HttpMethod.Get
      },
      {
        name: 'Releases',
        path: 'movie/:id/releases',
        verb: HttpMethod.Get
      },
      {
        name: 'ReleaseDates',
        path: 'movie/:id/release_dates',
        verb: HttpMethod.Get
      },
      {
        name: 'Trailers',
        path: 'movie/:id/trailers',
        verb: HttpMethod.Get
      },
      {
        name: 'Translations',
        path: 'movie/:id/translations',
        verb: HttpMethod.Get
      },
      {
        name: 'Similar',
        path: 'movie/:id/similar',
        verb: HttpMethod.Get
      },
      {
        name: 'Reviews',
        path: 'movie/:id/reviews',
        verb: HttpMethod.Get
      },
      {
        name: 'Lists',
        path: 'movie/:id/lists',
        verb: HttpMethod.Get
      },
      {
        name: 'Changes',
        path: 'movie/:id/changes',
        verb: HttpMethod.Get
      },
      {
        name: 'RatingUpdate',
        path: 'movie/:id/rating',
        verb: HttpMethod.Post
      }
    ]
  },
  {
    prefix: 'tv',
    endpoints: [
      {
        name: 'Info',
        path: 'tv/:id',
        verb: HttpMethod.Get
      },
      {
        name: 'AlternativeTitles',
        path: 'tv/:id/alternative_titles',
        verb: HttpMethod.Get
      },
      {
        name: 'ContentRatings',
        path: 'tv/:id/content_ratings',
        verb: HttpMethod.Get
      },
      {
        name: 'Credits',
        path: 'tv/:id/credits',
        verb: HttpMethod.Get
      },
      {
        name: 'EpisodeGroups',
        path: 'tv/:id/episode_groups',
        verb: HttpMethod.Get
      },
      {
        name: 'ExternalIds',
        path: 'tv/:id/external_ids',
        verb: HttpMethod.Get
      },
      {
        name: 'Images',
        path: 'tv/:id/images',
        verb: HttpMethod.Get
      },
      {
        name: 'Keywords',
        path: 'tv/:id/keywords',
        verb: HttpMethod.Get
      },
      {
        name: 'Videos',
        path: 'tv/:id/videos',
        verb: HttpMethod.Get
      },
      {
        name: 'ScreenedTheatrically',
        path: 'tv/:id/screened_theatrically',
        verb: HttpMethod.Get
      },
      {
        name: 'Reviews',
        path: 'tv/:id/reviews',
        verb: HttpMethod.Get
      },
      {
        name: 'Similar',
        path: 'tv/:id/similar',
        verb: HttpMethod.Get
      },
      {
        name: 'Translations',
        path: 'tv/:id/translations',
        verb: HttpMethod.Get
      },
      {
        name: 'SeasonInfo',
        path: 'tv/:id/season/:season_number',
        verb: HttpMethod.Get
      },
      {
        name: 'SeasonCredits',
        path: 'tv/:id/season/:season_number/credits',
        verb: HttpMethod.Get
      },
      {
        name: 'SeasonVideos',
        path: 'tv/:id/season/:season_number/videos',
        verb: HttpMethod.Get
      },
      {
        name: 'SeasonExternalIds',
        path: 'tv/:id/season/:season_number/external_ids',
        verb: HttpMethod.Get
      },
      {
        name: 'SeasonImages',
        path: 'tv/:id/season/:season_number/images',
        verb: HttpMethod.Get
      },
      {
        name: 'EpisodeInfo',
        path: 'tv/:id/season/:season_number/episode/:episode_number',
        verb: HttpMethod.Get
      },
      {
        name: 'EpisodeCredits',
        path: 'tv/:id/season/:season_number/episode/:episode_number/credits',
        verb: HttpMethod.Get
      },
      {
        name: 'EpisodeExternalIds',
        path: 'tv/:id/season/:season_number/episode/:episode_number/external_ids',
        verb: HttpMethod.Get
      },
      {
        name: 'EpisodeImages',
        path: 'tv/:id/season/:season_number/episode/:episode_number/images',
        verb: HttpMethod.Get
      },
      {
        name: 'OnTheAir',
        path: 'tv/on_the_air',
        verb: HttpMethod.Get
      },
      {
        name: 'AiringToday',
        path: 'tv/airing_today',
        verb: HttpMethod.Get
      },
      {
        name: 'Recommendations',
        path: 'tv/:id/recommendations',
        verb: HttpMethod.Get
      },
      {
        name: 'Changes',
        path: 'tv/:id/changes',
        verb: HttpMethod.Get
      },
      {
        name: 'RatingUpdate',
        path: 'tv/:id/rating',
        verb: HttpMethod.Post
      }
    ]
  },
  {
    prefix: 'person',
    endpoints: [
      {
        name: 'Info',
        path: 'person/:id',
        verb: HttpMethod.Get
      },
      {
        name: 'Changes',
        path: 'person/:id/changes',
        verb: HttpMethod.Get
      },
      {
        name: 'MovieCredits',
        path: 'person/:id/movie_credits',
        verb: HttpMethod.Get
      },
      {
        name: 'TvCredits',
        path: 'person/:id/tv_credits',
        verb: HttpMethod.Get
      },
      {
        name: 'CombinedCredits',
        path: 'person/:id/combined_credits',
        verb: HttpMethod.Get
      },
      {
        name: 'ExternalIds',
        path: 'person/:id/external_ids',
        verb: HttpMethod.Get
      },
      {
        name: 'Images',
        path: 'person/:id/images',
        verb: HttpMethod.Get
      },
      {
        name: 'TaggedImages',
        path: 'person/:id/tagged_images',
        verb: HttpMethod.Get
      },
      {
        name: 'Translations',
        path: 'person/:id/translations',
        verb: HttpMethod.Get
      },
      {
        name: 'Latest',
        path: 'person/latest',
        verb: HttpMethod.Get
      },
      {
        name: 'Popular',
        path: 'person/popular',
        verb: HttpMethod.Get
      }
    ]
  },
  {
    prefix: 'credit',
    endpoints: [
      {
        name: 'Info',
        path: 'credit/:id',
        verb: HttpMethod.Get
      }
    ]
  },
  {
    prefix: 'list',
    endpoints: [
      {
        name: 'Info',
        path: 'list/:id',
        verb: HttpMethod.Get
      }
    ]
  },
  {
    prefix: 'genre',
    endpoints: [
      {
        name: 'MovieList',
        path: 'genre/movie/list',
        verb: HttpMethod.Get
      },
      {
        name: 'TvList',
        path: 'genre/tv/list',
        verb: HttpMethod.Get
      }
    ]
  },
  {
    prefix: 'keyword',
    endpoints: [
      {
        name: 'Info',
        path: 'keyword/:id',
        verb: HttpMethod.Get
      },
      {
        name: 'Movies',
        path: 'keyword/:id/movies',
        verb: HttpMethod.Get
      }
    ]
  },
  {
    prefix: 'company',
    endpoints: [
      {
        name: 'Info',
        path: 'company/:id',
        verb: HttpMethod.Get
      },
      {
        name: 'AlternativeNames',
        path: 'company/:id/alternative_names',
        verb: HttpMethod.Get
      },
      {
        name: 'Images',
        path: 'company/:id/images',
        verb: HttpMethod.Get
      }
    ]
  },
  {
    prefix: 'account',
    endpoints: [
      {
        name: 'Info',
        path: 'account',
        verb: HttpMethod.Get
      },
      {
        name: 'Lists',
        path: 'account/:id/lists',
        verb: HttpMethod.Get
      },
      {
        name: 'FavoriteMovies',
        path: 'account/:id/favorite/movies',
        verb: HttpMethod.Get
      },
      {
        name: 'FavoriteUpdate',
        path: 'account/:id/favorite',
        verb: HttpMethod.Post
      },
      {
        name: 'RatedMovies',
        path: 'account/:id/rated/movies',
        verb: HttpMethod.Get
      },
      {
        name: 'MovieWatchlist',
        path: 'account/:id/watchlist/movies',
        verb: HttpMethod.Get
      },
      {
        name: 'TvWatchlist',
        path: 'account/:id/watchlist/tv',
        verb: HttpMethod.Get
      },
      {
        name: 'WatchlistUpdate',
        path: 'account/:id/watchlist',
        verb: HttpMethod.Post
      },
      {
        name: 'RatedTv',
        path: 'account/:id/rated/tv',
        verb: HttpMethod.Get
      },
      {
        name: 'RatedTvEpisodes',
        path: 'account/:id/rated/tv/episodes',
        verb: HttpMethod.Get
      },
      {
        name: 'FavoriteTv',
        path: 'account/:id/favorite/tv',
        verb: HttpMethod.Get
      }
    ]
  },
  {
    prefix: 'misc',
    endpoints: [
      {
        name: 'LatestMovies',
        path: 'movie/latest',
        verb: HttpMethod.Get
      },
      {
        name: 'NowPlayingMovies',
        path: 'movie/now_playing',
        verb: HttpMethod.Get
      },
      {
        name: 'PopularMovies',
        path: 'movie/popular',
        verb: HttpMethod.Get
      },
      {
        name: 'TopRatedMovies',
        path: 'movie/top_rated',
        verb: HttpMethod.Get
      },
      {
        name: 'UpcomingMovies',
        path: 'movie/upcoming',
        verb: HttpMethod.Get
      },
      {
        name: 'ChangedMovies',
        path: 'movie/changes',
        verb: HttpMethod.Get
      },
      {
        name: 'ChangedTvs',
        path: 'tv/changes',
        verb: HttpMethod.Get
      },
      {
        name: 'ChangedPeople',
        path: 'person/changes',
        verb: HttpMethod.Get
      },
      {
        name: 'LatestTvs',
        path: 'tv/latest',
        verb: HttpMethod.Get
      },
      {
        name: 'PopularTvs',
        path: 'tv/popular',
        verb: HttpMethod.Get
      },
      {
        name: 'TopRatedTvs',
        path: 'tv/top_rated',
        verb: HttpMethod.Get
      }
    ]
  }
]

export default endpoints
