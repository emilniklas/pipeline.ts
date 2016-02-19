import Middleware from "./middleware"
import { Pipeable, Handler, Pipe, ReturnValue } from "./types"

export default class Pipeline<Req, Res> {
  constructor(
    private _pipeables: Pipeable<Req, Res>[]
  ) {}

  private _handlerCache: Handler<Req, Res>

  get handler(): Handler<Req, Res> {
    if (this._handlerCache) return this._handlerCache
    return this._handlerCache = this._pipeables.reduceRight<Handler<Req, Res>>(this._reduce, this._defaultHandler)
  }

  private _defaultHandler(request: Req): ReturnValue<Res> {
    return Promise.resolve(nil)
  }

  private _reduce(next: Handler<Req, Res>, pipeable: Pipeable<Req, Res>): Handler<Req, Res> {
    if (pipeable instanceof Middleware) {
      return (request: Req) => pipeable.pipe(request, next)
    }
    return (request: Req) => (<Pipe<Req, Res>>pipeable)(request, next)
  }

  pipe(request: Req): ReturnValue<Res> {
    return Promise.resolve().then(() => {
      return this.handler(request)
    })
  }
}
