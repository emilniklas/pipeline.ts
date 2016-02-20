import Middleware from "./middleware"
import { Pipeable, Handler, InnerHandler } from "./types"

export class Pipeline<Req, Res> {
  constructor(
    private _pipeables: Pipeable<Req, Res>[]
  ) {}

  private _handlerCache: InnerHandler<Req, Res>

  get handler(): InnerHandler<Req, Res> {
    if (this._handlerCache) return this._handlerCache
    return this._handlerCache = this._pipeables.reduceRight<InnerHandler<Req, Res>>(this._reduce, this._defaultHandler)
  }

  private _defaultHandler(request: Req): Promise<Res> {
    throw new NoResponseFromPipelineException()
  }

  private _reduce(next: InnerHandler<Req, Res>, pipeable: Pipeable<Req, Res>): InnerHandler<Req, Res> {
    const handler: Handler<Req, Res> = pipeable instanceof Middleware
      ? pipeable.handle.bind(pipeable)
      : pipeable

    return (r: Req) => Promise.resolve(handler(r, next))
  }

  pipe(request: Req): Promise<Res> {
    return Promise.resolve().then(() => {
      return this.handler(request)
    })
  }
}

export class NoResponseFromPipelineException extends Error {
  constructor() { super() }

  message = "NoResponseFromPipelineException"
}
