import { expect } from "chai"
import { Pipeline, Pipeable, Handler, NoResponseFromPipelineException } from "../pipeline"

type Rq = number
type Rs = string

describe('Pipeline', () => {
  it('throws when there is no middleware', async function() {
    const pipeline = new Pipeline<Rq, Rs>([])
    try {
      const res = await pipeline.pipe(0)
      throw "Expected Pipeline to throw"
    } catch(e) {
      expect(e).instanceOf(NoResponseFromPipelineException)
    }
  })

  it('returns response from middleware', async function() {
    const pipeline = new Pipeline<Rq, Rs>([
      () => "x"
    ])

    expect(await pipeline.pipe(0)).to.equal("x")
  })

  it('sends the request to the handler', async function() {
    const pipeline = new Pipeline<Rq, Rs>([
      (r: Rq) => r.toString()
    ])

    expect(await pipeline.pipe(123)).to.equal("123")
  })

  it('creates a pipeline of middleware', async function() {
    const pipeline = new Pipeline<Rq, Rs>([
      (r: Rq, n: (r: Rq) => Promise<Rs>) => n(r + 1),
      (r: Rq) => r.toString()
    ])

    expect(await pipeline.pipe(1)).to.equal("2")
  })
})
