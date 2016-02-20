/// <reference path="../ts-pipeline.d.ts" />
/// <reference path="../typings/node/node.d.ts"/>

import { Pipeline, Middleware } from "../ts-pipeline"
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
  handle(request: Request, next: (r: Request) => Promise<Response>): Promise<Response> {
    console.log(`Changing method from ${request.method} to POST`)
    request.method = "POST"
    return next(request)
  }
}

const pipeline = new Pipeline<Request, Response>([

  new MyMiddleware(),

  (request: Request): Response => {
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
