"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
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
        throw new NoResponseFromPipelineException();
    };
    Pipeline.prototype._reduce = function (next, pipeable) {
        var handler = pipeable instanceof middleware_1.default
            ? pipeable.handle.bind(pipeable)
            : pipeable;
        return function (r) { return Promise.resolve(handler(r, next)); };
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
var NoResponseFromPipelineException = (function (_super) {
    __extends(NoResponseFromPipelineException, _super);
    function NoResponseFromPipelineException() {
        _super.call(this);
        this.message = "NoResponseFromPipelineException";
    }
    return NoResponseFromPipelineException;
}(Error));
exports.NoResponseFromPipelineException = NoResponseFromPipelineException;
//# sourceMappingURL=pipeline.js.map