# chunk-scheduler

Slice your heavy task in light chunk and run them asynchronously.

---

## Installation

```sh
yarn add @jaeseokk/chunk-scheduler
```

## Getting started

```ts
import chunkScheduler from '@jaeseokk/chunk-scheduler'

const scheduler = createScheduler()

function* chunkGenerator() {
  let result = 0

  for (let i = 0; i < 10; i++) {
    result += i
    yield
  }

  return result
}

scheduler.runChunks(chunkGenerator())
```

## License

[MIT](./LICENSE.md) as always
