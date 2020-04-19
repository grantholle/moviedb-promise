import { EndpointGroup, Response, Request, RequestOptions, MovieResult, TvResult, PersonResult } from '../../types';
declare const Find: EndpointGroup;
declare enum ExternalId {
    ImdbId = "imdb_id",
    Freebase_Id = "freebase_mid",
    FreebaseId = "freebase_id",
    TvdbId = "tvdb_id",
    TvrageId = "tvrage_id",
    FacebookId = "facebook_id",
    TwitterId = "twitter_id",
    InstagramId = "instagram_id"
}
interface FindRequest extends Request {
    external_id: ExternalId;
}
interface FindResponse extends Response {
    movie_results: Array<MovieResult>;
    tv_results: Array<TvResult>;
    person_results: Array<PersonResult>;
    tv_episode_results: Array<object>;
    tv_season_results: Array<object>;
}
declare module '../../moviedb' {
    interface MovieDb {
        find(params: FindRequest, options?: RequestOptions): Promise<FindResponse>;
    }
}
export default Find;
//# sourceMappingURL=find.d.ts.map