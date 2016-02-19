import Middleware from "./middleware"

export type Handler<Request, Response> = (request: Request) => Promise<Optional<Response>>
export type Pipe<Request, Response> = (request: Request, next: Handler<Request, Response>) => Promise<Optional<Response>>
export type Pipeable<Request, Response> = Middleware<Request, Response> | Handler<Request, Response> | Pipe<Request, Response>
