"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const moviedb_1 = require("../moviedb");
const configuration_1 = __importDefault(require("./methods/configuration"));
const find_1 = __importDefault(require("./methods/find"));
const namespaces = [
    configuration_1.default,
    find_1.default,
];
// Create the dynamic api methods
for (const namespace of namespaces) {
    for (const endpoint of namespace.endpoints) {
        const method = namespace.prefix + (endpoint.name || '');
        moviedb_1.MovieDb.prototype[method] = async function (params = {}, options = {}) {
            console.log(`calling ${method}`, params);
            return this.makeRequest(endpoint.verb, endpoint.path, params, options);
        };
    }
}
