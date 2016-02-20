/// <reference path="typings/tsd.d.ts" />
declare module "__pipeline/src/types" {
    import Middleware from "__pipeline/src/middleware";
    export type Handler<Request, Response> = (request: Request, next: (request: Request) => Promise<Response>) => (Promise<Response> | Response);
    export type InnerHandler<Request, Response> = (request: Request) => Promise<Response>;
    export type Pipeable<Request, Response> = Middleware<Request, Response> | Handler<Request, Response>;
}
declare module "__pipeline/src/middleware" {
    import { Handler } from "__pipeline/src/types";
    abstract class Middleware<Request, Response> {
        abstract handle(request: Request, next: Handler<Request, Response>): Promise<Response> | Response;
    }
    export default Middleware;
}
declare module "__pipeline/src/pipeline" {
    import { Pipeable, InnerHandler } from "__pipeline/src/types";
    export class Pipeline<Req, Res> {
        private _pipeables;
        constructor(_pipeables: Pipeable<Req, Res>[]);
        private _handlerCache;
        handler: InnerHandler<Req, Res>;
        private _defaultHandler(request);
        private _reduce(next, pipeable);
        pipe(request: Req): Promise<Res>;
    }
    export class NoResponseFromPipelineException extends Error {
        constructor();
        message: string;
    }
}
declare module "pipeline.ts" {
    export * from "__pipeline/src/pipeline";
    export * from "__pipeline/src/types";
    import _Middleware from "__pipeline/src/middleware";
    export const Middleware: typeof _Middleware;
}
