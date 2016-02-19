import Middleware from "./middleware"

export type ReturnValue<Response> = Promise<Optional<Response>>
export type Handler<Request, Response> = (request: Request) => ReturnValue<Response>
export type Pipe<Request, Response> = (request: Request, next: Handler<Request, Response>) => ReturnValue<Response>
export type Pipeable<Request, Response> = Middleware<Request, Response> | Handler<Request, Response> | Pipe<Request, Response>
