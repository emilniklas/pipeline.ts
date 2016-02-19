"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator.throw(value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments)).next());
    });
};
var ts_pipeline_1 = require("../ts-pipeline");
var pipeline = new ts_pipeline_1.Pipeline([
    function (request) {
        return __awaiter(this, void 0, void 0, function* () {
            return {
                message: request.message + " back!"
            };
        });
    }
]);
pipeline.pipe({ message: "Hello" }).then(function (response) {
    console.log(response.message);
});
//# sourceMappingURL=simple_pipeline.js.map