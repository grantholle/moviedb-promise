"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const moviedb_1 = require("../moviedb");
const configuration_1 = __importDefault(require("./methods/configuration"));
const endpointGroups = [
    configuration_1.default,
];
// Create the dynamic api methods
for (const group of endpointGroups) {
    for (const endpoint of group.endpoints) {
        const method = group.prefix + (endpoint.name || '');
        moviedb_1.MovieDb.prototype[method] = async function (params = {}, options = {}) {
            console.log(`calling ${method}`, params);
            return this.makeRequest(endpoint.verb, endpoint.path, params, options);
        };
    }
}
