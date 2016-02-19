/// <reference path="typings/tsd.d.ts" />
/// <reference path="node_modules/ts-optional/index.d.ts" />
declare module "__ts-pipeline/src/types" {
    import Middleware from "__ts-pipeline/src/middleware";
    export type Handler<Request, Response> = (request: Request) => Promise<Optional<Response>>;
    export type Pipe<Request, Response> = (request: Request, next: Handler<Request, Response>) => Promise<Optional<Response>>;
    export type Pipeable<Request, Response> = Middleware<Request, Response> | Handler<Request, Response> | Pipe<Request, Response>;
}
declare module "__ts-pipeline/src/middleware" {
    import { Handler } from "__ts-pipeline/src/types";
    abstract class Middleware<Request, Response> {
        abstract pipe(request: Request, next: Handler<Request, Response>): Promise<Optional<Response>>;
    }
    export default Middleware;
}
declare module "__ts-pipeline/src/pipeline" {
    import { Pipeable, Handler } from "__ts-pipeline/src/types";
    export default class Pipeline<Req, Res> {
        private _pipeables;
        constructor(_pipeables: Pipeable<Req, Res>[]);
        private _handlerCache;
        handler: Handler<Req, Res>;
        private _defaultHandler(request);
        private _reduce(next, pipeable);
        pipe(request: Req): Promise<Optional<Res>>;
    }
}
declare module "ts-pipeline" {
    import _Pipeline from "__ts-pipeline/src/pipeline";
    import _Middleware from "__ts-pipeline/src/middleware";
    export * from "__ts-pipeline/src/types";
    export const Pipeline: typeof _Pipeline;
    export const Middleware: typeof _Middleware;
}
