"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const types_1 = require("../../types");
const Find = {
    prefix: 'find',
    endpoints: [
        {
            path: 'find/:id',
            verb: types_1.HttpMethod.Get
        }
    ]
};
var ExternalId;
(function (ExternalId) {
    ExternalId["ImdbId"] = "imdb_id";
    ExternalId["Freebase_Id"] = "freebase_mid";
    ExternalId["FreebaseId"] = "freebase_id";
    ExternalId["TvdbId"] = "tvdb_id";
    ExternalId["TvrageId"] = "tvrage_id";
    ExternalId["FacebookId"] = "facebook_id";
    ExternalId["TwitterId"] = "twitter_id";
    ExternalId["InstagramId"] = "instagram_id";
})(ExternalId || (ExternalId = {}));
exports.default = Find;
