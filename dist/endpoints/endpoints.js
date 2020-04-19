'use strict';
module.exports = {
    authentication: {
        requestToken: 'authentication/token/new',
        session: 'authentication/session/new'
    },
    methods: {
        configuration: {
            '': {
                path: 'configuration',
                verb: 'get'
            }
        },
        find: {
            '': {
                path: 'find/:id',
                verb: 'get'
            }
        },
        search: {
            Movie: {
                path: 'search/movie',
                verb: 'get'
            },
            Tv: {
                path: 'search/tv',
                verb: 'get'
            },
            Multi: {
                path: 'search/multi',
                verb: 'get'
            },
            Collection: {
                path: 'search/collection',
                verb: 'get'
            },
            Person: {
                path: 'search/person',
                verb: 'get'
            },
            List: {
                path: 'search/list',
                verb: 'get'
            },
            Company: {
                path: 'search/company',
                verb: 'get'
            },
            Keyword: {
                path: 'search/keyword',
                verb: 'get'
            }
        },
        collection: {
            Info: {
                path: 'collection/:id',
                verb: 'get'
            },
            Images: {
                path: 'collection/:id/images',
                verb: 'get'
            },
            Translations: {
                path: 'collection/:id/translations',
                verb: 'get'
            }
        },
        discover: {
            Movie: {
                path: 'discover/movie',
                verb: 'get'
            },
            Tv: {
                path: 'discover/tv',
                verb: 'get'
            }
        },
        trending: {
            '': {
                path: 'trending/:media_type/:time_window',
                verb: 'get'
            }
        },
        movie: {
            Info: {
                path: 'movie/:id',
                verb: 'get'
            },
            AlternativeTitles: {
                path: 'movie/:id/alternative_titles',
                verb: 'get'
            },
            Credits: {
                path: 'movie/:id/credits',
                verb: 'get'
            },
            ExternalIds: {
                path: '/movie/:id/external_ids',
                verb: 'get'
            },
            Images: {
                path: 'movie/:id/images',
                verb: 'get'
            },
            Videos: {
                path: 'movie/:id/videos',
                verb: 'get'
            },
            Keywords: {
                path: 'movie/:id/keywords',
                verb: 'get'
            },
            Recommendations: {
                path: 'movie/:id/recommendations',
                verb: 'get'
            },
            Releases: {
                path: 'movie/:id/releases',
                verb: 'get'
            },
            ReleaseDates: {
                path: 'movie/:id/release_dates',
                verb: 'get'
            },
            Trailers: {
                path: 'movie/:id/trailers',
                verb: 'get'
            },
            Translations: {
                path: 'movie/:id/translations',
                verb: 'get'
            },
            Similar: {
                path: 'movie/:id/similar',
                verb: 'get'
            },
            Reviews: {
                path: 'movie/:id/reviews',
                verb: 'get'
            },
            Lists: {
                path: 'movie/:id/lists',
                verb: 'get'
            },
            Changes: {
                path: 'movie/:id/changes',
                verb: 'get'
            },
            RatingUpdate: {
                path: 'movie/:id/rating',
                verb: 'post'
            }
        },
        tv: {
            Info: {
                path: 'tv/:id',
                verb: 'get'
            },
            AlternativeTitles: {
                path: 'tv/:id/alternative_titles',
                verb: 'get'
            },
            ContentRatings: {
                path: 'tv/:id/content_ratings',
                verb: 'get'
            },
            Credits: {
                path: 'tv/:id/credits',
                verb: 'get'
            },
            EpisodeGroups: {
                path: 'tv/:id/episode_groups',
                verb: 'get'
            },
            ExternalIds: {
                path: 'tv/:id/external_ids',
                verb: 'get'
            },
            Images: {
                path: 'tv/:id/images',
                verb: 'get'
            },
            Keywords: {
                path: 'tv/:id/keywords',
                verb: 'get'
            },
            Videos: {
                path: 'tv/:id/videos',
                verb: 'get'
            },
            ScreenedTheatrically: {
                path: 'tv/:id/screened_theatrically',
                verb: 'get'
            },
            Reviews: {
                path: 'tv/:id/reviews',
                verb: 'get'
            },
            Similar: {
                path: 'tv/:id/similar',
                verb: 'get'
            },
            Translations: {
                path: 'tv/:id/translations',
                verb: 'get'
            },
            SeasonInfo: {
                path: 'tv/:id/season/:season_number',
                verb: 'get'
            },
            SeasonCredits: {
                path: 'tv/:id/season/:season_number/credits',
                verb: 'get'
            },
            SeasonVideos: {
                path: 'tv/:id/season/:season_number/videos',
                verb: 'get'
            },
            SeasonExternalIds: {
                path: 'tv/:id/season/:season_number/external_ids',
                verb: 'get'
            },
            SeasonImages: {
                path: 'tv/:id/season/:season_number/images',
                verb: 'get'
            },
            EpisodeInfo: {
                path: 'tv/:id/season/:season_number/episode/:episode_number',
                verb: 'get'
            },
            EpisodeCredits: {
                path: 'tv/:id/season/:season_number/episode/:episode_number/credits',
                verb: 'get'
            },
            EpisodeExternalIds: {
                path: 'tv/:id/season/:season_number/episode/:episode_number/external_ids',
                verb: 'get'
            },
            EpisodeImages: {
                path: 'tv/:id/season/:season_number/episode/:episode_number/images',
                verb: 'get'
            },
            OnTheAir: {
                path: 'tv/on_the_air',
                verb: 'get'
            },
            AiringToday: {
                path: 'tv/airing_today',
                verb: 'get'
            },
            Recommendations: {
                path: 'tv/:id/recommendations',
                verb: 'get'
            },
            Changes: {
                path: 'tv/:id/changes',
                verb: 'get'
            },
            RatingUpdate: {
                path: 'tv/:id/rating',
                verb: 'post'
            }
        },
        person: {
            Info: {
                path: 'person/:id',
                verb: 'get'
            },
            Changes: {
                path: 'person/:id/changes',
                verb: 'get'
            },
            MovieCredits: {
                path: 'person/:id/movie_credits',
                verb: 'get'
            },
            TvCredits: {
                path: 'person/:id/tv_credits',
                verb: 'get'
            },
            CombinedCredits: {
                path: 'person/:id/combined_credits',
                verb: 'get'
            },
            ExternalIds: {
                path: 'person/:id/external_ids',
                verb: 'get'
            },
            Images: {
                path: 'person/:id/images',
                verb: 'get'
            },
            TaggedImages: {
                path: 'person/:id/tagged_images',
                verb: 'get'
            },
            Translations: {
                path: 'person/:id/translations',
                verb: 'get'
            },
            Latest: {
                path: 'person/latest',
                verb: 'get'
            },
            Popular: {
                path: 'person/popular',
                verb: 'get'
            }
        },
        credit: {
            Info: {
                path: 'credit/:id',
                verb: 'get'
            }
        },
        list: {
            Info: {
                path: 'list/:id',
                verb: 'get'
            }
        },
        genre: {
            MovieList: {
                path: 'genre/movie/list',
                verb: 'get'
            },
            TvList: {
                path: 'genre/tv/list',
                verb: 'get'
            }
        },
        keyword: {
            Info: {
                path: 'keyword/:id',
                verb: 'get'
            },
            Movies: {
                path: 'keyword/:id/movies',
                verb: 'get'
            }
        },
        company: {
            Info: {
                path: 'company/:id',
                verb: 'get'
            },
            AlternativeNames: {
                path: 'company/:id/alternative_names',
                verb: 'get'
            },
            Images: {
                path: 'company/:id/images',
                verb: 'get'
            }
        },
        account: {
            Info: {
                path: 'account',
                verb: 'get'
            },
            Lists: {
                path: 'account/:id/lists',
                verb: 'get'
            },
            FavoriteMovies: {
                path: 'account/:id/favorite/movies',
                verb: 'get'
            },
            FavoriteUpdate: {
                path: 'account/:id/favorite',
                verb: 'post'
            },
            RatedMovies: {
                path: 'account/:id/rated/movies',
                verb: 'get'
            },
            MovieWatchlist: {
                path: 'account/:id/watchlist/movies',
                verb: 'get'
            },
            TvWatchlist: {
                path: 'account/:id/watchlist/tv',
                verb: 'get'
            },
            WatchlistUpdate: {
                path: 'account/:id/watchlist',
                verb: 'post'
            },
            RatedTv: {
                path: 'account/:id/rated/tv',
                verb: 'get'
            },
            RatedTvEpisodes: {
                path: 'account/:id/rated/tv/episodes',
                verb: 'get'
            },
            FavoriteTv: {
                path: 'account/:id/favorite/tv',
                verb: 'get'
            }
        },
        misc: {
            LatestMovies: {
                path: 'movie/latest',
                verb: 'get'
            },
            NowPlayingMovies: {
                path: 'movie/now_playing',
                verb: 'get'
            },
            PopularMovies: {
                path: 'movie/popular',
                verb: 'get'
            },
            TopRatedMovies: {
                path: 'movie/top_rated',
                verb: 'get'
            },
            UpcomingMovies: {
                path: 'movie/upcoming',
                verb: 'get'
            },
            ChangedMovies: {
                path: 'movie/changes',
                verb: 'get'
            },
            ChangedTvs: {
                path: 'tv/changes',
                verb: 'get'
            },
            ChangedPeople: {
                path: 'person/changes',
                verb: 'get'
            },
            LatestTvs: {
                path: 'tv/latest',
                verb: 'get'
            },
            PopularTvs: {
                path: 'tv/popular',
                verb: 'get'
            },
            TopRatedTvs: {
                path: 'tv/top_rated',
                verb: 'get'
            }
        }
    }
};
