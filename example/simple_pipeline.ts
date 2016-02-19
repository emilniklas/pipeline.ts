/// <reference path="../ts-pipeline.d.ts" />

import { Pipeline } from "../ts-pipeline"

interface Request {
  message: string
}

interface Response {
  message: string
}

const pipeline = new Pipeline<Request, Response>([
  async function(request: Request) {
    return {
      message: `${request.message} back!`
    }
  }
])

pipeline.pipe({message: "Hello"}).then((response) => {
  console.log((<Response>response).message)
})
