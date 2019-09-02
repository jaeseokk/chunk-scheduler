interface Scheduler {
  runChunks<T>(iterator: Iterator<T>): Promise<T>
  cancel(): void
  isRunning(): Boolean
}

const createScheduler = (): Scheduler => {
  let token: any = null
  let running: Boolean = false

  const runChunks = <T>(iter: Iterator<T>): Promise<T> => {
    running = true

    const chunk = (resolve: Function) => {
      token = setTimeout(() => {
        const { value, done } = iter.next()

        if (done) {
          resolve(value)
          running = false
          return
        }

        chunk(resolve)
      })
    }

    return new Promise(chunk)
  }

  const cancel = (): void => {
    if (token) {
      clearTimeout(token)
    }
  }

  const isRunning = (): Boolean => {
    return running
  }

  return {
    runChunks,
    cancel,
    isRunning,
  }
}

export default createScheduler
