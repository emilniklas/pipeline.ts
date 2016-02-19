"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator.throw(value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments)).next());
    });
};
var assert = require("assert");
var ts_pipeline_1 = require("../ts-pipeline");
describe('Pipeline', function () {
    var assertPipeline = function (request, expectedResponse, pipeables) {
        return __awaiter(this, void 0, void 0, function* () {
            var pipeline = new ts_pipeline_1.Pipeline(pipeables);
            var response = yield pipeline.pipe(request);
            assert.equal(response, expectedResponse);
        });
    };
    it('returns nil without any middleware', function () {
        return __awaiter(this, void 0, void 0, function* () {
            yield assertPipeline(0, nil, []);
        });
    });
    it('returns the result of a handler', function () {
        return __awaiter(this, void 0, void 0, function* () {
            yield assertPipeline(0, "response", [
                function (_) { return Promise.resolve("response"); }
            ]);
        });
    });
    it('returns the first result of a handler', function () {
        return __awaiter(this, void 0, void 0, function* () {
            yield assertPipeline(0, "response1", [
                function (_) { return Promise.resolve("response1"); },
                function (_) { return Promise.resolve("response2"); }
            ]);
        });
    });
    it('allows middleware to pass on the request', function () {
        return __awaiter(this, void 0, void 0, function* () {
            yield assertPipeline(0, "response2", [
                function (_, next) { return next(_); },
                function (_) { return Promise.resolve("response2"); }
            ]);
        });
    });
});
//# sourceMappingURL=pipeline_test.js.map