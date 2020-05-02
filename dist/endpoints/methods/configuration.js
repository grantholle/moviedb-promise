"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const types_1 = require("../../types");
const Configuration = {
    prefix: 'configuration',
    endpoints: [
        {
            path: 'configuration',
            verb: types_1.HttpMethod.Get
        }
    ]
};
exports.default = Configuration;
