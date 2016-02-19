import { Handler } from "./types";
declare abstract class Middleware<Request, Response> {
    abstract pipe(request: Request, next: Handler<Request, Response>): Promise<Optional<Response>>;
}
export default Middleware;
