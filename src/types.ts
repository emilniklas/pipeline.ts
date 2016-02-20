import Middleware from "./middleware"

export type Handler<Request, Response> = (request: Request, next: (request: Request) => Promise<Response>) => (Promise<Response> | Response)
export type Pipeable<Request, Response> = Middleware<Request, Response> | Handler<Request, Response>
