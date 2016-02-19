import * as assert from "assert"
import { Pipeline, Pipeable, Handler } from "../ts-pipeline"

describe('Pipeline', () => {

  const assertPipeline = async function(request: number, expectedResponse: Optional<string>, pipeables: Pipeable<number, string>[]) {
    const pipeline = new Pipeline(pipeables)
    const response = await pipeline.pipe(request)
    assert.equal(response, expectedResponse)
  }

  it('returns nil without any middleware', async function() {
    await assertPipeline(0, nil, [])
  })

  it('returns the result of a handler', async function() {
    await assertPipeline(0, "response", [
      (_: number) => Promise.resolve("response")
    ])
  })

  it('returns the first result of a handler', async function() {
    await assertPipeline(0, "response1", [
      (_: number) => Promise.resolve("response1"),
      (_: number) => Promise.resolve("response2")
    ])
  })

  it('allows middleware to pass on the request', async function() {
    await assertPipeline(0, "response2", [
      (_: number, next: Handler<number, string>) => next(_),
      (_: number) => Promise.resolve("response2")
    ])
  })
})
