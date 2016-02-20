import { Pipeline, Middleware } from "../pipeline.ts.ts"

interface Request {
  message: string
}

interface Response {
  message: string
}

class UppercaseMiddleware extends Middleware<Request, Response> {
  handle(request: Request, next: (request: Request) => Promise<Response>): Promise<Response> {
    return async function() {
      const response = await next(request)

      return {
        message: response.message.toUpperCase()
      }
    }()
  }
}

const pipeline = new Pipeline<Request, Response>([

  new UppercaseMiddleware(),

  (request: Request) => ({
    message: `${request.message} back!`
  })

])

const request = { message: "Hello" }

console.log(`Request: ${request.message}`)

pipeline.pipe(request).then((response) => {
  console.log(`Response: ${(<Response>response).message}`)
})
