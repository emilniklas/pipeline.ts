/// <reference path="typings/tsd.d.ts" />
/// <reference path="node_modules/ts-optional/index.d.ts" />
"use strict";
if (require) {
    require("ts-optional");
}
var pipeline_1 = require("./src/pipeline");
var middleware_1 = require("./src/middleware");
exports.Pipeline = pipeline_1.default;
exports.Middleware = middleware_1.default;
//# sourceMappingURL=ts-pipeline.js.map