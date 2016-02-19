/// <reference path="typings/tsd.d.ts" />
/// <reference path="node_modules/ts-optional/index.d.ts" />

if (require) {
  require("ts-optional")
}

import _Pipeline from "./src/pipeline"
import _Middleware from "./src/middleware"
export * from "./src/types"

export const Pipeline = _Pipeline
export const Middleware = _Middleware
