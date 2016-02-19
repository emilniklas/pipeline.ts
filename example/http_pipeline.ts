/// <reference path="../ts-pipeline.d.ts" />
/// <reference path="../typings/node/node.d.ts"/>

import { Pipeline, Middleware, ReturnValue, Handler } from "../ts-pipeline"
import { createServer } from "http"

interface Request {
  method?: string,
  url?: string
}

interface Response {
  status: number
  body: string
}

class MyMiddleware extends Middleware<Request, Response> {
  pipe(request: Request, next: Handler<Request, Response>): ReturnValue<Response> {
    console.log(`Changing method from ${request.method} to POST`)
    request.method = "POST"
    return next(request)
  }
}

const pipeline = new Pipeline<Request, Response>([

  new MyMiddleware(),

  async function(request: Request): Promise<Response> {
    return {
      status: 200,
      body: `Hello, world! This is a ${request.method} response!`
    }
  }
])

createServer(async function(req, res) {

  const response = await pipeline.pipe(req)

  if (response.isNil) {
    res.writeHead(404)
    res.end()
  } else {
    res.writeHead((<Response>response).status)
    res.end((<Response>response).body)
  }

}).listen(1337, () => {
  console.log('Server listening on http://localhost:1337')
})
