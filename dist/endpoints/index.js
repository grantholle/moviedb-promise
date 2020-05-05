"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const moviedb_1 = require("../moviedb");
const endpoints_1 = __importDefault(require("./endpoints"));
// Create the dynamic api methods
for (const group of endpoints_1.default) {
    for (const endpoint of group.endpoints) {
        const method = group.prefix + (endpoint.name || '');
        moviedb_1.MovieDb.prototype[method] = function (params = {}, options = {}) {
            return this.makeRequest(endpoint.verb, endpoint.path, params, options);
        };
    }
}
