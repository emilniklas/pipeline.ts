/// <reference path="../typings/node/node.d.ts"/>
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
var pipeline_1 = require("../pipeline");
var http_1 = require("http");
var MyMiddleware = (function (_super) {
    __extends(MyMiddleware, _super);
    function MyMiddleware() {
        _super.apply(this, arguments);
    }
    MyMiddleware.prototype.handle = function (request, next) {
        console.log("Changing method from " + request.method + " to POST");
        request.method = "POST";
        return next(request);
    };
    return MyMiddleware;
}(pipeline_1.Middleware));
var pipeline = new pipeline_1.Pipeline([
    new MyMiddleware(),
    function (request) {
        return {
            status: 200,
            body: "Hello, world! This is a " + request.method + " response!"
        };
    }
]);
http_1.createServer(function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        var response = yield pipeline.pipe(req);
        res.writeHead(response.status);
        res.end(response.body);
    });
}).listen(1337, function () {
    console.log('Server listening on http://localhost:1337');
});
//# sourceMappingURL=http_pipeline.js.map