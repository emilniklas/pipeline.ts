import { Pipeable, Handler } from "./types";
export default class Pipeline<Req, Res> {
    private _pipeables;
    constructor(_pipeables: Pipeable<Req, Res>[]);
    private _handlerCache;
    handler: Handler<Req, Res>;
    private _defaultHandler(request);
    private _reduce(next, pipeable);
    pipe(request: Req): Promise<Optional<Res>>;
}
