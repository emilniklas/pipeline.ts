import { Handler, ReturnValue } from "./types"

abstract class Middleware<Request, Response> {
  abstract pipe(request: Request, next: Handler<Request, Response>): ReturnValue<Response>
}

export default Middleware
