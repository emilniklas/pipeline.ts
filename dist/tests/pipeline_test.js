"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator.throw(value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments)).next());
    });
};
var chai_1 = require("chai");
var ts_pipeline_1 = require("../ts-pipeline");
describe('Pipeline', function () {
    it('throws when there is no middleware', function () {
        return __awaiter(this, void 0, void 0, function* () {
            var pipeline = new ts_pipeline_1.Pipeline([]);
            try {
                var res = yield pipeline.pipe(0);
                throw "Expected Pipeline to throw";
            }
            catch (e) {
                chai_1.expect(e).instanceOf(ts_pipeline_1.NoResponseFromPipelineException);
            }
        });
    });
    it('returns response from middleware', function () {
        return __awaiter(this, void 0, void 0, function* () {
            var pipeline = new ts_pipeline_1.Pipeline([
                function () { return "x"; }
            ]);
            chai_1.expect(yield pipeline.pipe(0)).to.equal("x");
        });
    });
    it('sends the request to the handler', function () {
        return __awaiter(this, void 0, void 0, function* () {
            var pipeline = new ts_pipeline_1.Pipeline([
                function (r) { return r.toString(); }
            ]);
            chai_1.expect(yield pipeline.pipe(123)).to.equal("123");
        });
    });
    it('creates a pipeline of middleware', function () {
        return __awaiter(this, void 0, void 0, function* () {
            var pipeline = new ts_pipeline_1.Pipeline([
                function (r, n) { return n(r + 1); },
                function (r) { return r.toString(); }
            ]);
            chai_1.expect(yield pipeline.pipe(1)).to.equal("2");
        });
    });
});
//# sourceMappingURL=pipeline_test.js.map