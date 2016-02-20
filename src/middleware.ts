import { Handler } from "./types"

abstract class Middleware<Request, Response> {
  abstract handle(request: Request, next: Handler<Request, Response>): Promise<Response> | Response
}

export default Middleware
