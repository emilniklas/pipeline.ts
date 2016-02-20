"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator.throw(value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments)).next());
    });
};
var ts_pipeline_1 = require("../ts-pipeline");
var UppercaseMiddleware = (function (_super) {
    __extends(UppercaseMiddleware, _super);
    function UppercaseMiddleware() {
        _super.apply(this, arguments);
    }
    UppercaseMiddleware.prototype.handle = function (request, next) {
        return function () {
            return __awaiter(this, void 0, void 0, function* () {
                var response = yield next(request);
                return {
                    message: response.message.toUpperCase()
                };
            });
        }();
    };
    return UppercaseMiddleware;
}(ts_pipeline_1.Middleware));
var pipeline = new ts_pipeline_1.Pipeline([
    new UppercaseMiddleware(),
    function (request) { return ({
        message: request.message + " back!"
    }); }
]);
var request = { message: "Hello" };
console.log("Request: " + request.message);
pipeline.pipe(request).then(function (response) {
    console.log("Response: " + response.message);
});
//# sourceMappingURL=simple_pipeline.js.map