# pipit — tiny retry utility for async functions (v2.3)

pipit retries a failing async function with exponential backoff. Zero dependencies.

## Installation

```
npm i pipit
```

Requires Node.js 18 or newer. Since v2.0 pipit is **ESM only**. Projects that use CommonJS (`require`) must stay on pipit 1.x.

## Basic usage

```js
import { retry } from "pipit"

const data = await retry(() => fetch(url).then((r) => r.json()))
```

The function you pass receives one argument, an object `{ attempt, signal }`:

- `attempt` — the current attempt number, starting at 1.
- `signal` — the `AbortSignal` you passed in options (or `undefined`).

```js
await retry(({ attempt, signal }) => fetch(url, { signal }), { signal: controller.signal })
```

## Options

| Option      | Type                                  | Default   | Description |
|-------------|---------------------------------------|-----------|-------------|
| `attempts`  | number                                | `3`       | Total number of attempts **including the first one**. `attempts: 1` means no retries. |
| `baseDelay` | number (ms)                           | `200`     | Delay before the first retry, before jitter. |
| `maxDelay`  | number (ms)                           | `5000`    | Upper bound for any single delay, applied before jitter. |
| `factor`    | number                                | `2`       | Multiplier for exponential growth. |
| `jitter`    | `"none"` \| `"full"` \| `"equal"`     | `"equal"` | Randomization strategy, see below. |
| `retryOn`   | `(error, attempt) => boolean`         | see below | Return `false` to stop retrying and rethrow immediately. |
| `signal`    | `AbortSignal`                         | —         | Cancels waiting between attempts. |
| `onRetry`   | `(error, attempt, delay) => void`     | —         | Called before each wait. |

Default `retryOn` retries every error **except** `AbortError` and `PipitFatalError`.

## Delay calculation

After failed attempt number `n` (starting at 1), the base delay is:

```
delay = min(maxDelay, baseDelay * factor ^ (n - 1))
```

With default options the base delays are 200 ms after the first failure and 400 ms after the second. There is no delay after the last attempt.

Jitter is applied **after** the `maxDelay` cap:

- `"none"` — use `delay` as is.
- `"full"` — random value between `0` and `delay`.
- `"equal"` — `delay / 2` plus a random value between `0` and `delay / 2`.

Because jitter is applied after the cap, the actual wait can never exceed `maxDelay`, but with `"full"` it can be as low as 0.

## Errors

When all attempts fail, `retry` rejects with `PipitExhaustedError`:

- `.attempts` — how many attempts were made.
- `.errors` — array of all errors, **oldest first**.
- `.cause` — the last error.

Throw `PipitFatalError` inside your function to stop immediately. pipit rethrows the `PipitFatalError` itself — it is **not** wrapped in `PipitExhaustedError`.

If your function throws something that is not an `Error` (for example a string), pipit wraps it in `PipitNonError`. The original thrown value is available as `.value`.

## Cancellation

If `signal` is aborted while pipit is waiting between attempts, `retry` rejects immediately with `AbortError`.

pipit does **not** cancel an attempt that is already running. To cancel in-flight work, pass the `signal` from the function argument to your own code (for example to `fetch`).

## Gotchas

- `attempts: 0` or a negative number makes `retry` reject with `RangeError` before your function is called.
- Errors thrown inside `onRetry` are swallowed and reported with `console.warn`. They never stop retrying.
- `onRetry` is not called after the last attempt, because there is no next wait.

## Changelog: migrating from v1 to v2

- ESM only; CommonJS support removed.
- Option `retries` was renamed to `attempts` and its meaning changed: `retries: 2` in v1 equals `attempts: 3` in v2.
- Default `jitter` changed from `"none"` to `"equal"`.
