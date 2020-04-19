export declare namespace authentication {
    export const requestToken: string;
    export const session: string;
}
export declare namespace methods {
    export const configuration: {
        '': {
            path: string;
            verb: string;
        };
    };
    export const find: {
        '': {
            path: string;
            verb: string;
        };
    };
    export namespace search {
        export namespace Movie {
            export const path: string;
            export const verb: string;
        }
        export namespace Tv {
            const path_1: string;
            export { path_1 as path };
            const verb_1: string;
            export { verb_1 as verb };
        }
        export namespace Multi {
            const path_2: string;
            export { path_2 as path };
            const verb_2: string;
            export { verb_2 as verb };
        }
        export namespace Collection {
            const path_3: string;
            export { path_3 as path };
            const verb_3: string;
            export { verb_3 as verb };
        }
        export namespace Person {
            const path_4: string;
            export { path_4 as path };
            const verb_4: string;
            export { verb_4 as verb };
        }
        export namespace List {
            const path_5: string;
            export { path_5 as path };
            const verb_5: string;
            export { verb_5 as verb };
        }
        export namespace Company {
            const path_6: string;
            export { path_6 as path };
            const verb_6: string;
            export { verb_6 as verb };
        }
        export namespace Keyword {
            const path_7: string;
            export { path_7 as path };
            const verb_7: string;
            export { verb_7 as verb };
        }
    }
    export namespace collection {
        export namespace Info {
            const path_8: string;
            export { path_8 as path };
            const verb_8: string;
            export { verb_8 as verb };
        }
        export namespace Images {
            const path_9: string;
            export { path_9 as path };
            const verb_9: string;
            export { verb_9 as verb };
        }
        export namespace Translations {
            const path_10: string;
            export { path_10 as path };
            const verb_10: string;
            export { verb_10 as verb };
        }
    }
    export namespace discover {
        export namespace Movie_1 {
            const path_11: string;
            export { path_11 as path };
            const verb_11: string;
            export { verb_11 as verb };
        }
        export { Movie_1 as Movie };
        export namespace Tv_1 {
            const path_12: string;
            export { path_12 as path };
            const verb_12: string;
            export { verb_12 as verb };
        }
        export { Tv_1 as Tv };
    }
    export const trending: {
        '': {
            path: string;
            verb: string;
        };
    };
    export namespace movie {
        export namespace Info_1 {
            const path_13: string;
            export { path_13 as path };
            const verb_13: string;
            export { verb_13 as verb };
        }
        export { Info_1 as Info };
        export namespace AlternativeTitles {
            const path_14: string;
            export { path_14 as path };
            const verb_14: string;
            export { verb_14 as verb };
        }
        export namespace Credits {
            const path_15: string;
            export { path_15 as path };
            const verb_15: string;
            export { verb_15 as verb };
        }
        export namespace ExternalIds {
            const path_16: string;
            export { path_16 as path };
            const verb_16: string;
            export { verb_16 as verb };
        }
        export namespace Images_1 {
            const path_17: string;
            export { path_17 as path };
            const verb_17: string;
            export { verb_17 as verb };
        }
        export { Images_1 as Images };
        export namespace Videos {
            const path_18: string;
            export { path_18 as path };
            const verb_18: string;
            export { verb_18 as verb };
        }
        export namespace Keywords {
            const path_19: string;
            export { path_19 as path };
            const verb_19: string;
            export { verb_19 as verb };
        }
        export namespace Recommendations {
            const path_20: string;
            export { path_20 as path };
            const verb_20: string;
            export { verb_20 as verb };
        }
        export namespace Releases {
            const path_21: string;
            export { path_21 as path };
            const verb_21: string;
            export { verb_21 as verb };
        }
        export namespace ReleaseDates {
            const path_22: string;
            export { path_22 as path };
            const verb_22: string;
            export { verb_22 as verb };
        }
        export namespace Trailers {
            const path_23: string;
            export { path_23 as path };
            const verb_23: string;
            export { verb_23 as verb };
        }
        export namespace Translations_1 {
            const path_24: string;
            export { path_24 as path };
            const verb_24: string;
            export { verb_24 as verb };
        }
        export { Translations_1 as Translations };
        export namespace Similar {
            const path_25: string;
            export { path_25 as path };
            const verb_25: string;
            export { verb_25 as verb };
        }
        export namespace Reviews {
            const path_26: string;
            export { path_26 as path };
            const verb_26: string;
            export { verb_26 as verb };
        }
        export namespace Lists {
            const path_27: string;
            export { path_27 as path };
            const verb_27: string;
            export { verb_27 as verb };
        }
        export namespace Changes {
            const path_28: string;
            export { path_28 as path };
            const verb_28: string;
            export { verb_28 as verb };
        }
        export namespace RatingUpdate {
            const path_29: string;
            export { path_29 as path };
            const verb_29: string;
            export { verb_29 as verb };
        }
    }
    export namespace tv {
        export namespace Info_2 {
            const path_30: string;
            export { path_30 as path };
            const verb_30: string;
            export { verb_30 as verb };
        }
        export { Info_2 as Info };
        export namespace AlternativeTitles_1 {
            const path_31: string;
            export { path_31 as path };
            const verb_31: string;
            export { verb_31 as verb };
        }
        export { AlternativeTitles_1 as AlternativeTitles };
        export namespace ContentRatings {
            const path_32: string;
            export { path_32 as path };
            const verb_32: string;
            export { verb_32 as verb };
        }
        export namespace Credits_1 {
            const path_33: string;
            export { path_33 as path };
            const verb_33: string;
            export { verb_33 as verb };
        }
        export { Credits_1 as Credits };
        export namespace EpisodeGroups {
            const path_34: string;
            export { path_34 as path };
            const verb_34: string;
            export { verb_34 as verb };
        }
        export namespace ExternalIds_1 {
            const path_35: string;
            export { path_35 as path };
            const verb_35: string;
            export { verb_35 as verb };
        }
        export { ExternalIds_1 as ExternalIds };
        export namespace Images_2 {
            const path_36: string;
            export { path_36 as path };
            const verb_36: string;
            export { verb_36 as verb };
        }
        export { Images_2 as Images };
        export namespace Keywords_1 {
            const path_37: string;
            export { path_37 as path };
            const verb_37: string;
            export { verb_37 as verb };
        }
        export { Keywords_1 as Keywords };
        export namespace Videos_1 {
            const path_38: string;
            export { path_38 as path };
            const verb_38: string;
            export { verb_38 as verb };
        }
        export { Videos_1 as Videos };
        export namespace ScreenedTheatrically {
            const path_39: string;
            export { path_39 as path };
            const verb_39: string;
            export { verb_39 as verb };
        }
        export namespace Reviews_1 {
            const path_40: string;
            export { path_40 as path };
            const verb_40: string;
            export { verb_40 as verb };
        }
        export { Reviews_1 as Reviews };
        export namespace Similar_1 {
            const path_41: string;
            export { path_41 as path };
            const verb_41: string;
            export { verb_41 as verb };
        }
        export { Similar_1 as Similar };
        export namespace Translations_2 {
            const path_42: string;
            export { path_42 as path };
            const verb_42: string;
            export { verb_42 as verb };
        }
        export { Translations_2 as Translations };
        export namespace SeasonInfo {
            const path_43: string;
            export { path_43 as path };
            const verb_43: string;
            export { verb_43 as verb };
        }
        export namespace SeasonCredits {
            const path_44: string;
            export { path_44 as path };
            const verb_44: string;
            export { verb_44 as verb };
        }
        export namespace SeasonVideos {
            const path_45: string;
            export { path_45 as path };
            const verb_45: string;
            export { verb_45 as verb };
        }
        export namespace SeasonExternalIds {
            const path_46: string;
            export { path_46 as path };
            const verb_46: string;
            export { verb_46 as verb };
        }
        export namespace SeasonImages {
            const path_47: string;
            export { path_47 as path };
            const verb_47: string;
            export { verb_47 as verb };
        }
        export namespace EpisodeInfo {
            const path_48: string;
            export { path_48 as path };
            const verb_48: string;
            export { verb_48 as verb };
        }
        export namespace EpisodeCredits {
            const path_49: string;
            export { path_49 as path };
            const verb_49: string;
            export { verb_49 as verb };
        }
        export namespace EpisodeExternalIds {
            const path_50: string;
            export { path_50 as path };
            const verb_50: string;
            export { verb_50 as verb };
        }
        export namespace EpisodeImages {
            const path_51: string;
            export { path_51 as path };
            const verb_51: string;
            export { verb_51 as verb };
        }
        export namespace OnTheAir {
            const path_52: string;
            export { path_52 as path };
            const verb_52: string;
            export { verb_52 as verb };
        }
        export namespace AiringToday {
            const path_53: string;
            export { path_53 as path };
            const verb_53: string;
            export { verb_53 as verb };
        }
        export namespace Recommendations_1 {
            const path_54: string;
            export { path_54 as path };
            const verb_54: string;
            export { verb_54 as verb };
        }
        export { Recommendations_1 as Recommendations };
        export namespace Changes_1 {
            const path_55: string;
            export { path_55 as path };
            const verb_55: string;
            export { verb_55 as verb };
        }
        export { Changes_1 as Changes };
        export namespace RatingUpdate_1 {
            const path_56: string;
            export { path_56 as path };
            const verb_56: string;
            export { verb_56 as verb };
        }
        export { RatingUpdate_1 as RatingUpdate };
    }
    export namespace person {
        export namespace Info_3 {
            const path_57: string;
            export { path_57 as path };
            const verb_57: string;
            export { verb_57 as verb };
        }
        export { Info_3 as Info };
        export namespace Changes_2 {
            const path_58: string;
            export { path_58 as path };
            const verb_58: string;
            export { verb_58 as verb };
        }
        export { Changes_2 as Changes };
        export namespace MovieCredits {
            const path_59: string;
            export { path_59 as path };
            const verb_59: string;
            export { verb_59 as verb };
        }
        export namespace TvCredits {
            const path_60: string;
            export { path_60 as path };
            const verb_60: string;
            export { verb_60 as verb };
        }
        export namespace CombinedCredits {
            const path_61: string;
            export { path_61 as path };
            const verb_61: string;
            export { verb_61 as verb };
        }
        export namespace ExternalIds_2 {
            const path_62: string;
            export { path_62 as path };
            const verb_62: string;
            export { verb_62 as verb };
        }
        export { ExternalIds_2 as ExternalIds };
        export namespace Images_3 {
            const path_63: string;
            export { path_63 as path };
            const verb_63: string;
            export { verb_63 as verb };
        }
        export { Images_3 as Images };
        export namespace TaggedImages {
            const path_64: string;
            export { path_64 as path };
            const verb_64: string;
            export { verb_64 as verb };
        }
        export namespace Translations_3 {
            const path_65: string;
            export { path_65 as path };
            const verb_65: string;
            export { verb_65 as verb };
        }
        export { Translations_3 as Translations };
        export namespace Latest {
            const path_66: string;
            export { path_66 as path };
            const verb_66: string;
            export { verb_66 as verb };
        }
        export namespace Popular {
            const path_67: string;
            export { path_67 as path };
            const verb_67: string;
            export { verb_67 as verb };
        }
    }
    export namespace credit {
        export namespace Info_4 {
            const path_68: string;
            export { path_68 as path };
            const verb_68: string;
            export { verb_68 as verb };
        }
        export { Info_4 as Info };
    }
    export namespace list {
        export namespace Info_5 {
            const path_69: string;
            export { path_69 as path };
            const verb_69: string;
            export { verb_69 as verb };
        }
        export { Info_5 as Info };
    }
    export namespace genre {
        export namespace MovieList {
            const path_70: string;
            export { path_70 as path };
            const verb_70: string;
            export { verb_70 as verb };
        }
        export namespace TvList {
            const path_71: string;
            export { path_71 as path };
            const verb_71: string;
            export { verb_71 as verb };
        }
    }
    export namespace keyword {
        export namespace Info_6 {
            const path_72: string;
            export { path_72 as path };
            const verb_72: string;
            export { verb_72 as verb };
        }
        export { Info_6 as Info };
        export namespace Movies {
            const path_73: string;
            export { path_73 as path };
            const verb_73: string;
            export { verb_73 as verb };
        }
    }
    export namespace company {
        export namespace Info_7 {
            const path_74: string;
            export { path_74 as path };
            const verb_74: string;
            export { verb_74 as verb };
        }
        export { Info_7 as Info };
        export namespace AlternativeNames {
            const path_75: string;
            export { path_75 as path };
            const verb_75: string;
            export { verb_75 as verb };
        }
        export namespace Images_4 {
            const path_76: string;
            export { path_76 as path };
            const verb_76: string;
            export { verb_76 as verb };
        }
        export { Images_4 as Images };
    }
    export namespace account {
        export namespace Info_8 {
            const path_77: string;
            export { path_77 as path };
            const verb_77: string;
            export { verb_77 as verb };
        }
        export { Info_8 as Info };
        export namespace Lists_1 {
            const path_78: string;
            export { path_78 as path };
            const verb_78: string;
            export { verb_78 as verb };
        }
        export { Lists_1 as Lists };
        export namespace FavoriteMovies {
            const path_79: string;
            export { path_79 as path };
            const verb_79: string;
            export { verb_79 as verb };
        }
        export namespace FavoriteUpdate {
            const path_80: string;
            export { path_80 as path };
            const verb_80: string;
            export { verb_80 as verb };
        }
        export namespace RatedMovies {
            const path_81: string;
            export { path_81 as path };
            const verb_81: string;
            export { verb_81 as verb };
        }
        export namespace MovieWatchlist {
            const path_82: string;
            export { path_82 as path };
            const verb_82: string;
            export { verb_82 as verb };
        }
        export namespace TvWatchlist {
            const path_83: string;
            export { path_83 as path };
            const verb_83: string;
            export { verb_83 as verb };
        }
        export namespace WatchlistUpdate {
            const path_84: string;
            export { path_84 as path };
            const verb_84: string;
            export { verb_84 as verb };
        }
        export namespace RatedTv {
            const path_85: string;
            export { path_85 as path };
            const verb_85: string;
            export { verb_85 as verb };
        }
        export namespace RatedTvEpisodes {
            const path_86: string;
            export { path_86 as path };
            const verb_86: string;
            export { verb_86 as verb };
        }
        export namespace FavoriteTv {
            const path_87: string;
            export { path_87 as path };
            const verb_87: string;
            export { verb_87 as verb };
        }
    }
    export namespace misc {
        export namespace LatestMovies {
            const path_88: string;
            export { path_88 as path };
            const verb_88: string;
            export { verb_88 as verb };
        }
        export namespace NowPlayingMovies {
            const path_89: string;
            export { path_89 as path };
            const verb_89: string;
            export { verb_89 as verb };
        }
        export namespace PopularMovies {
            const path_90: string;
            export { path_90 as path };
            const verb_90: string;
            export { verb_90 as verb };
        }
        export namespace TopRatedMovies {
            const path_91: string;
            export { path_91 as path };
            const verb_91: string;
            export { verb_91 as verb };
        }
        export namespace UpcomingMovies {
            const path_92: string;
            export { path_92 as path };
            const verb_92: string;
            export { verb_92 as verb };
        }
        export namespace ChangedMovies {
            const path_93: string;
            export { path_93 as path };
            const verb_93: string;
            export { verb_93 as verb };
        }
        export namespace ChangedTvs {
            const path_94: string;
            export { path_94 as path };
            const verb_94: string;
            export { verb_94 as verb };
        }
        export namespace ChangedPeople {
            const path_95: string;
            export { path_95 as path };
            const verb_95: string;
            export { verb_95 as verb };
        }
        export namespace LatestTvs {
            const path_96: string;
            export { path_96 as path };
            const verb_96: string;
            export { verb_96 as verb };
        }
        export namespace PopularTvs {
            const path_97: string;
            export { path_97 as path };
            const verb_97: string;
            export { verb_97 as verb };
        }
        export namespace TopRatedTvs {
            const path_98: string;
            export { path_98 as path };
            const verb_98: string;
            export { verb_98 as verb };
        }
    }
}
//# sourceMappingURL=endpoints.d.ts.map