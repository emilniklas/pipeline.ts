# pipeline.ts

An asynchronous request/response pipeline for TypeScript.

### Usage

```typescript
import { Pipeline } from "pipeline.ts"

interface Request {
  input: string
}

interface Response {
  output: string
}

const pipeline = new Pipeline<Request, Response>([

  function(req: Request, next: (req: Request) => Response): Promise<Response> {
    return next({
      input: req.input.toUpperCase() + '!'  
    })
  }

  function(req: Request): Response {
    return {
      output: `Response: ${req.input}`
    }
  }
])

const request: Request = {
  input: "Hello world"
}

pipeline
  .pipe(request)
  .then(console.log)

// { "output": "Response: HELLO WORLD!" }
```
