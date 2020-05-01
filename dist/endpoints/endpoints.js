"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const types_1 = require("../types");
const endpoints = [
    {
        prefix: 'configuration',
        endpoints: [
            {
                path: 'configuration',
                verb: types_1.HttpMethod.Get
            },
        ]
    },
    {
        prefix: 'find',
        endpoints: [
            {
                path: 'find/:id',
                verb: types_1.HttpMethod.Get
            },
        ]
    },
    {
        prefix: 'search',
        endpoints: [
            {
                name: 'Movie',
                path: 'search/movie',
                verb: types_1.HttpMethod.Get
            },
            {
                name: 'Tv',
                path: 'search/tv',
                verb: types_1.HttpMethod.Get
            },
            {
                name: 'Multi',
                path: 'search/multi',
                verb: types_1.HttpMethod.Get
            },
            {
                name: 'Collection',
                path: 'search/collection',
                verb: types_1.HttpMethod.Get
            },
            {
                name: 'Person',
                path: 'search/person',
                verb: types_1.HttpMethod.Get
            },
            {
                name: 'List',
                path: 'search/list',
                verb: types_1.HttpMethod.Get
            },
            {
                name: 'Company',
                path: 'search/company',
                verb: types_1.HttpMethod.Get
            },
            {
                name: 'Keyword',
                path: 'search/keyword',
                verb: types_1.HttpMethod.Get
            }
        ]
    },
    {
        prefix: 'collection',
        endpoints: [
            {
                name: 'Info',
                path: 'collection/:id',
                verb: types_1.HttpMethod.Get
            },
            {
                name: 'Images',
                path: 'collection/:id/images',
                verb: types_1.HttpMethod.Get
            },
            {
                name: 'Translations',
                path: 'collection/:id/translations',
                verb: types_1.HttpMethod.Get
            }
        ]
    },
    {
        prefix: 'discover',
        endpoints: [
            {
                name: 'Movie',
                path: 'discover/movie',
                verb: types_1.HttpMethod.Get
            },
            {
                name: 'Tv',
                path: 'discover/tv',
                verb: types_1.HttpMethod.Get
            }
        ]
    },
    {
        prefix: 'trending',
        endpoints: [
            {
                path: 'trending/:media_type/:time_window',
                verb: types_1.HttpMethod.Get
            }
        ]
    },
    {
        prefix: 'movie',
        endpoints: [
            {
                name: 'Info',
                path: 'movie/:id',
                verb: types_1.HttpMethod.Get
            },
            {
                name: 'AlternativeTitles',
                path: 'movie/:id/alternative_titles',
                verb: types_1.HttpMethod.Get
            },
            {
                name: 'Credits',
                path: 'movie/:id/credits',
                verb: types_1.HttpMethod.Get
            },
            {
                name: 'ExternalIds',
                path: '/movie/:id/external_ids',
                verb: types_1.HttpMethod.Get
            },
            {
                name: 'Images',
                path: 'movie/:id/images',
                verb: types_1.HttpMethod.Get
            },
            {
                name: 'Videos',
                path: 'movie/:id/videos',
                verb: types_1.HttpMethod.Get
            },
            {
                name: 'Keywords',
                path: 'movie/:id/keywords',
                verb: types_1.HttpMethod.Get
            },
            {
                name: 'Recommendations',
                path: 'movie/:id/recommendations',
                verb: types_1.HttpMethod.Get
            },
            {
                name: 'Releases',
                path: 'movie/:id/releases',
                verb: types_1.HttpMethod.Get
            },
            {
                name: 'ReleaseDates',
                path: 'movie/:id/release_dates',
                verb: types_1.HttpMethod.Get
            },
            {
                name: 'Trailers',
                path: 'movie/:id/trailers',
                verb: types_1.HttpMethod.Get
            },
            {
                name: 'Translations',
                path: 'movie/:id/translations',
                verb: types_1.HttpMethod.Get
            },
            {
                name: 'Similar',
                path: 'movie/:id/similar',
                verb: types_1.HttpMethod.Get
            },
            {
                name: 'Reviews',
                path: 'movie/:id/reviews',
                verb: types_1.HttpMethod.Get
            },
            {
                name: 'Lists',
                path: 'movie/:id/lists',
                verb: types_1.HttpMethod.Get
            },
            {
                name: 'Changes',
                path: 'movie/:id/changes',
                verb: types_1.HttpMethod.Get
            },
            {
                name: 'RatingUpdate',
                path: 'movie/:id/rating',
                verb: types_1.HttpMethod.Post
            }
        ]
    },
    {
        prefix: 'tv',
        endpoints: [
            {
                name: 'Info',
                path: 'tv/:id',
                verb: types_1.HttpMethod.Get
            },
            {
                name: 'AlternativeTitles',
                path: 'tv/:id/alternative_titles',
                verb: types_1.HttpMethod.Get
            },
            {
                name: 'ContentRatings',
                path: 'tv/:id/content_ratings',
                verb: types_1.HttpMethod.Get
            },
            {
                name: 'Credits',
                path: 'tv/:id/credits',
                verb: types_1.HttpMethod.Get
            },
            {
                name: 'EpisodeGroups',
                path: 'tv/:id/episode_groups',
                verb: types_1.HttpMethod.Get
            },
            {
                name: 'ExternalIds',
                path: 'tv/:id/external_ids',
                verb: types_1.HttpMethod.Get
            },
            {
                name: 'Images',
                path: 'tv/:id/images',
                verb: types_1.HttpMethod.Get
            },
            {
                name: 'Keywords',
                path: 'tv/:id/keywords',
                verb: types_1.HttpMethod.Get
            },
            {
                name: 'Videos',
                path: 'tv/:id/videos',
                verb: types_1.HttpMethod.Get
            },
            {
                name: 'ScreenedTheatrically',
                path: 'tv/:id/screened_theatrically',
                verb: types_1.HttpMethod.Get
            },
            {
                name: 'Reviews',
                path: 'tv/:id/reviews',
                verb: types_1.HttpMethod.Get
            },
            {
                name: 'Similar',
                path: 'tv/:id/similar',
                verb: types_1.HttpMethod.Get
            },
            {
                name: 'Translations',
                path: 'tv/:id/translations',
                verb: types_1.HttpMethod.Get
            },
            {
                name: 'SeasonInfo',
                path: 'tv/:id/season/:season_number',
                verb: types_1.HttpMethod.Get
            },
            {
                name: 'SeasonCredits',
                path: 'tv/:id/season/:season_number/credits',
                verb: types_1.HttpMethod.Get
            },
            {
                name: 'SeasonVideos',
                path: 'tv/:id/season/:season_number/videos',
                verb: types_1.HttpMethod.Get
            },
            {
                name: 'SeasonExternalIds',
                path: 'tv/:id/season/:season_number/external_ids',
                verb: types_1.HttpMethod.Get
            },
            {
                name: 'SeasonImages',
                path: 'tv/:id/season/:season_number/images',
                verb: types_1.HttpMethod.Get
            },
            {
                name: 'EpisodeInfo',
                path: 'tv/:id/season/:season_number/episode/:episode_number',
                verb: types_1.HttpMethod.Get
            },
            {
                name: 'EpisodeCredits',
                path: 'tv/:id/season/:season_number/episode/:episode_number/credits',
                verb: types_1.HttpMethod.Get
            },
            {
                name: 'EpisodeExternalIds',
                path: 'tv/:id/season/:season_number/episode/:episode_number/external_ids',
                verb: types_1.HttpMethod.Get
            },
            {
                name: 'EpisodeImages',
                path: 'tv/:id/season/:season_number/episode/:episode_number/images',
                verb: types_1.HttpMethod.Get
            },
            {
                name: 'OnTheAir',
                path: 'tv/on_the_air',
                verb: types_1.HttpMethod.Get
            },
            {
                name: 'AiringToday',
                path: 'tv/airing_today',
                verb: types_1.HttpMethod.Get
            },
            {
                name: 'Recommendations',
                path: 'tv/:id/recommendations',
                verb: types_1.HttpMethod.Get
            },
            {
                name: 'Changes',
                path: 'tv/:id/changes',
                verb: types_1.HttpMethod.Get
            },
            {
                name: 'RatingUpdate',
                path: 'tv/:id/rating',
                verb: types_1.HttpMethod.Post
            }
        ]
    },
    {
        prefix: 'person',
        endpoints: [
            {
                name: 'Info',
                path: 'person/:id',
                verb: types_1.HttpMethod.Get
            },
            {
                name: 'Changes',
                path: 'person/:id/changes',
                verb: types_1.HttpMethod.Get
            },
            {
                name: 'MovieCredits',
                path: 'person/:id/movie_credits',
                verb: types_1.HttpMethod.Get
            },
            {
                name: 'TvCredits',
                path: 'person/:id/tv_credits',
                verb: types_1.HttpMethod.Get
            },
            {
                name: 'CombinedCredits',
                path: 'person/:id/combined_credits',
                verb: types_1.HttpMethod.Get
            },
            {
                name: 'ExternalIds',
                path: 'person/:id/external_ids',
                verb: types_1.HttpMethod.Get
            },
            {
                name: 'Images',
                path: 'person/:id/images',
                verb: types_1.HttpMethod.Get
            },
            {
                name: 'TaggedImages',
                path: 'person/:id/tagged_images',
                verb: types_1.HttpMethod.Get
            },
            {
                name: 'Translations',
                path: 'person/:id/translations',
                verb: types_1.HttpMethod.Get
            },
            {
                name: 'Latest',
                path: 'person/latest',
                verb: types_1.HttpMethod.Get
            },
            {
                name: 'Popular',
                path: 'person/popular',
                verb: types_1.HttpMethod.Get
            }
        ]
    },
    {
        prefix: 'credit',
        endpoints: [
            {
                name: 'Info',
                path: 'credit/:id',
                verb: types_1.HttpMethod.Get
            }
        ]
    },
    {
        prefix: 'list',
        endpoints: [
            {
                name: 'Info',
                path: 'list/:id',
                verb: types_1.HttpMethod.Get
            }
        ]
    },
    {
        prefix: 'genre',
        endpoints: [
            {
                name: 'MovieList',
                path: 'genre/movie/list',
                verb: types_1.HttpMethod.Get
            },
            {
                name: 'TvList',
                path: 'genre/tv/list',
                verb: types_1.HttpMethod.Get
            }
        ]
    },
    {
        prefix: 'keyword',
        endpoints: [
            {
                name: 'Info',
                path: 'keyword/:id',
                verb: types_1.HttpMethod.Get
            },
            {
                name: 'Movies',
                path: 'keyword/:id/movies',
                verb: types_1.HttpMethod.Get
            }
        ]
    },
    {
        prefix: 'company',
        endpoints: [
            {
                name: 'Info',
                path: 'company/:id',
                verb: types_1.HttpMethod.Get
            },
            {
                name: 'AlternativeNames',
                path: 'company/:id/alternative_names',
                verb: types_1.HttpMethod.Get
            },
            {
                name: 'Images',
                path: 'company/:id/images',
                verb: types_1.HttpMethod.Get
            }
        ]
    },
    {
        prefix: 'account',
        endpoints: [
            {
                name: 'Info',
                path: 'account',
                verb: types_1.HttpMethod.Get
            },
            {
                name: 'Lists',
                path: 'account/:id/lists',
                verb: types_1.HttpMethod.Get
            },
            {
                name: 'FavoriteMovies',
                path: 'account/:id/favorite/movies',
                verb: types_1.HttpMethod.Get
            },
            {
                name: 'FavoriteUpdate',
                path: 'account/:id/favorite',
                verb: types_1.HttpMethod.Post
            },
            {
                name: 'RatedMovies',
                path: 'account/:id/rated/movies',
                verb: types_1.HttpMethod.Get
            },
            {
                name: 'MovieWatchlist',
                path: 'account/:id/watchlist/movies',
                verb: types_1.HttpMethod.Get
            },
            {
                name: 'TvWatchlist',
                path: 'account/:id/watchlist/tv',
                verb: types_1.HttpMethod.Get
            },
            {
                name: 'WatchlistUpdate',
                path: 'account/:id/watchlist',
                verb: types_1.HttpMethod.Post
            },
            {
                name: 'RatedTv',
                path: 'account/:id/rated/tv',
                verb: types_1.HttpMethod.Get
            },
            {
                name: 'RatedTvEpisodes',
                path: 'account/:id/rated/tv/episodes',
                verb: types_1.HttpMethod.Get
            },
            {
                name: 'FavoriteTv',
                path: 'account/:id/favorite/tv',
                verb: types_1.HttpMethod.Get
            }
        ]
    },
    {
        prefix: 'misc',
        endpoints: [
            {
                name: 'LatestMovies',
                path: 'movie/latest',
                verb: types_1.HttpMethod.Get
            },
            {
                name: 'NowPlayingMovies',
                path: 'movie/now_playing',
                verb: types_1.HttpMethod.Get
            },
            {
                name: 'PopularMovies',
                path: 'movie/popular',
                verb: types_1.HttpMethod.Get
            },
            {
                name: 'TopRatedMovies',
                path: 'movie/top_rated',
                verb: types_1.HttpMethod.Get
            },
            {
                name: 'UpcomingMovies',
                path: 'movie/upcoming',
                verb: types_1.HttpMethod.Get
            },
            {
                name: 'ChangedMovies',
                path: 'movie/changes',
                verb: types_1.HttpMethod.Get
            },
            {
                name: 'ChangedTvs',
                path: 'tv/changes',
                verb: types_1.HttpMethod.Get
            },
            {
                name: 'ChangedPeople',
                path: 'person/changes',
                verb: types_1.HttpMethod.Get
            },
            {
                name: 'LatestTvs',
                path: 'tv/latest',
                verb: types_1.HttpMethod.Get
            },
            {
                name: 'PopularTvs',
                path: 'tv/popular',
                verb: types_1.HttpMethod.Get
            },
            {
                name: 'TopRatedTvs',
                path: 'tv/top_rated',
                verb: types_1.HttpMethod.Get
            }
        ]
    }
];
exports.default = endpoints;
