"use strict";
var middleware_1 = require("./middleware");
var Pipeline = (function () {
    function Pipeline(_pipeables) {
        this._pipeables = _pipeables;
    }
    Object.defineProperty(Pipeline.prototype, "handler", {
        get: function () {
            if (this._handlerCache)
                return this._handlerCache;
            return this._handlerCache = this._pipeables.reduceRight(this._reduce, this._defaultHandler);
        },
        enumerable: true,
        configurable: true
    });
    Pipeline.prototype._defaultHandler = function (request) {
        return Promise.resolve(nil);
    };
    Pipeline.prototype._reduce = function (next, pipeable) {
        if (pipeable instanceof middleware_1.default) {
            return function (request) { return pipeable.pipe(request, next); };
        }
        return function (request) { return pipeable(request, next); };
    };
    Pipeline.prototype.pipe = function (request) {
        var _this = this;
        return Promise.resolve().then(function () {
            return _this.handler(request);
        });
    };
    return Pipeline;
}());
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Pipeline;
//# sourceMappingURL=pipeline.js.map