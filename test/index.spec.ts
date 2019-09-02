import createScheduler from '../src/index'

describe(`createScheduler`, () => {
  it('should get available result by Promise that returned through the scheduler', async () => {
    const scheduler = createScheduler()

    function* chunkGenerator() {
      let result = 0

      for (let i = 0; i < 10; i++) {
        result += i
        yield
      }

      return result
    }

    const result = await scheduler.runChunks(chunkGenerator())

    expect(result).toBe(45)
  })
})
