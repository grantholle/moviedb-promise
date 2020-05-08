import { Response, RequestParams } from './types';
export interface MovieResult {
    poster_path?: string;
    adult?: boolean;
    overview?: string;
    release_date?: string;
    genre_ids?: Array<number>;
    id?: number;
    media_type: 'movie';
    original_title?: string;
    original_language?: string;
    title?: string;
    backdrop_path?: string;
    popularity?: number;
    vote_count?: number;
    video?: boolean;
    vote_average?: number;
}
export interface TvResult {
    poster_path?: string;
    popularity?: number;
    id?: number;
    overview?: string;
    backdrop_path?: string;
    vote_average?: number;
    media_type: 'tv';
    first_air_date?: string;
    origin_country?: Array<string>;
    genre_ids?: Array<number>;
    original_language?: string;
    vote_count?: number;
    name?: string;
    original_name?: string;
}
export interface PersonResult {
    profile_path?: string;
    adult?: boolean;
    id?: number;
    name?: string;
    popularity?: number;
    known_for?: Array<MovieResult | TvResult>;
}
export interface Image {
    base_url?: string;
    secure_base_url?: string;
    backdrop_sizes?: Array<string>;
    logo_sizes?: Array<string>;
    poster_sizes?: Array<string>;
    profile_sizes?: Array<string>;
    still_sizes?: Array<string>;
}
export declare enum ExternalId {
    ImdbId = "imdb_id",
    Freebase_Id = "freebase_mid",
    FreebaseId = "freebase_id",
    TvdbId = "tvdb_id",
    TvrageId = "tvrage_id",
    FacebookId = "facebook_id",
    TwitterId = "twitter_id",
    InstagramId = "instagram_id"
}
export interface ConfigurationResponse extends Response {
    change_keys: string[];
    images: {
        base_url?: string;
        secure_base_url?: string;
        backdrop_sizes?: string[];
        logo_sizes?: string[];
        poster_sizes?: string[];
        profile_sizes?: string[];
        still_sizes?: string[];
    };
}
export declare enum ExternalSource {
    ImdbId = "imdb_id",
    FreebaseMid = "freebase_mid",
    FreebaseId = "freebase_id",
    TvdbId = "tvdb_id",
    TvrageId = "tvrage_id",
    FacebookId = "facebook_id",
    TwitterId = "twitter_id",
    InstagramId = "instagram_id"
}
export interface FindRequest extends Request {
    external_id: ExternalId;
    language?: string;
    external_source?: 'imdb_id' | 'freebase_mid' | 'freebase_id' | 'tvdb_id' | 'tvrage_id' | 'facebook_id' | 'twitter_id' | 'instagram_id';
}
export interface FindResponse extends Response {
    movie_results: Array<MovieResult>;
    tv_results: Array<TvResult>;
    person_results: Array<PersonResult>;
    tv_episode_results: Array<object>;
    tv_season_results: Array<object>;
}
export interface SearchRequest extends RequestParams {
    query: string;
    page?: number;
}
export interface SearchResponse extends Response {
    page?: number;
    results?: Array<object>;
    total_pages?: number;
    total_results?: number;
}
export interface SearchCompanyResponse extends SearchResponse {
    results?: Array<{
        id?: number;
        logo_path?: string;
        name?: string;
    }>;
}
export interface SearchCollectionResponse extends SearchResponse {
    results?: Array<{
        id?: number;
        backdrop_path?: string;
        name?: string;
        poster_path?: string;
    }>;
}
export interface SearchKeywordResponse extends SearchResponse {
    results?: Array<{
        id?: number;
        name?: string;
    }>;
}
export interface SearchMovieRequest extends SearchRequest {
    include_adult?: boolean;
    region?: string;
    year?: number;
    primary_release_year?: number;
}
export interface SearchMovieResponse extends SearchResponse {
    results?: Array<MovieResult>;
}
//# sourceMappingURL=request-types.d.ts.map