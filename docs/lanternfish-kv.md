# Lanternfish KV — Documentation (v4.1)

Lanternfish KV is a globally replicated key-value store for edge functions.

## 1. Overview

Every namespace has one **primary region**, chosen when the namespace is created. Data is replicated from the primary to read replicas in up to 24 locations.

- All writes go to the primary region.
- Reads are served from the nearest replica by default.

Lanternfish is designed for read-heavy data: configuration, feature flags, sessions, cached API responses. It is **not** suitable for counters or any value that is written many times per second (see section 6).

## 2. Namespaces and keys

**Namespaces**

- Names are 3–40 characters: lowercase letters, digits and hyphens. A name must start with a letter.
- A namespace cannot be renamed, and its primary region cannot be changed after creation.
- An account can have up to 200 namespaces (10 on the free plan). There is no limit on the number of keys in a namespace.

**Keys**

- Maximum key size is 512 bytes, measured in UTF-8.
- Keys starting with `__lf/` are reserved. Writing them fails with `LFInvalidKeyError`.

**Values**

- Maximum value size is 25 MiB.
- Values larger than 1 MiB are stored in the cold tier. The first read of a cold-tier value after it is written is noticeably slower; later reads are cached normally.

**Metadata**

- Each key can carry up to 1 KiB of JSON metadata.
- `list()` returns metadata without reading values, so metadata is the recommended place for small summary fields.

## 3. Reading and writing

```js
const value = await ns.get("user:42", { type: "json" })
await ns.put("user:42", JSON.stringify(user), { ttl: 3600 })
await ns.delete("user:42")
const page = await ns.list({ prefix: "user:", limit: 100 })
```

**`get(key, options)`**

- `type`: `"text"` (default), `"json"`, `"bytes"` or `"stream"`.
- `consistency`: `"eventual"` (default) or `"strong"`, see section 4.
- `withVersion`: if `true`, returns `{ value, version }` instead of the value.
- A missing key returns `null`.

**`put(key, value, options)`**

- Options: `ttl`, `expiresAt`, `keepTtl`, `metadata`, `ifVersion`. See sections 5 and 6.

**`delete(key)`**

- Resolves to `undefined`. Deleting a key that does not exist is not an error.

**`list({ prefix, cursor, limit })`**

- `limit` defaults to 100, maximum 1000.
- Keys are returned sorted lexicographically by their UTF-8 bytes.
- When more keys exist, the result contains a `cursor` for the next page.
- `list()` is **always** eventually consistent. There is no strong option for it.

## 4. Consistency

**Eventual reads** (default)

- Replicas usually receive a write within 2 seconds. Propagation is guaranteed within 60 seconds.

**Strong reads**

- `consistency: "strong"` routes the read to the primary region. This adds latency depending on distance to the primary and costs 3 read units instead of 1.

**Read-your-writes**

- Within the same invocation, a `get` after a `put` to the same key returns the new value, even with eventual consistency.
- This is **not** guaranteed across different invocations.

**Negative caching**

- When `get` finds no key, the replica caches that "not found" result for 30 seconds.
- So if a key is created right after a missed read, it can stay invisible at that replica for up to 30 seconds plus normal propagation time.
- Strong reads bypass negative caching.

## 5. Expiration

- `ttl` — lifetime in seconds. Minimum is 60.
- `expiresAt` — absolute expiration time as a Unix timestamp in seconds.
- Passing both `ttl` and `expiresAt` throws `TypeError`.

**Important:** a `put` on an existing key **removes** its expiration unless you pass new expiration options. To update the value and keep the current expiration, pass `keepTtl: true`.

After a key expires:

- `get` stops returning it immediately.
- It can still appear in `list()` results for up to 5 minutes.
- It still counts toward storage until the hourly purge.

## 6. Versions, conditional writes and batches

**Versions**

- Every key has a version: an integer that starts at 1 and increases by 1 on every write.

**Conditional writes**

- `put` with `ifVersion: n` succeeds only if the current version is `n`. Otherwise it fails with `LFConflictError`.
- `ifVersion: 0` means "write only if the key does not exist".

**Batches**

- `ns.batch(ops)` accepts up to 64 put/delete operations.
- A batch is **not atomic**. Operations run in order and the batch stops at the first failure. Operations that already succeeded are not rolled back.
- Lanternfish has no multi-key transactions.

**Write rate per key**

- Sustained limit: 1 write per second per key, with bursts up to 5.
- Exceeding it fails with `LFRateLimitedError`. Its `retryAfter` property is the suggested wait in milliseconds.

## 7. Billing units and limits

**Read units (RU)**

- Eventual `get`: 1 RU.
- Strong `get`: 3 RU.
- `list()`: 5 RU per call, no matter how many keys it returns.

**Write units (WU)**

- `put` and `delete`: 1 WU per started KiB of value, minimum 1 WU.
- Each operation inside a batch is billed separately.

**Free plan**

- 100,000 RU per day, 1,000 WU per day, 1 GiB of storage.
- When a daily limit is reached on the free plan, the affected operations fail with `LFQuotaError` until 00:00 UTC.

## 8. Errors

All errors extend `LFError` and have a string `.code`.

| Error                   | Code                 | When |
|-------------------------|----------------------|------|
| `LFConflictError`       | `LF_CONFLICT`        | `ifVersion` did not match. |
| `LFRateLimitedError`    | `LF_RATE_LIMITED`    | Per-key write rate exceeded. Has `retryAfter` (ms). |
| `LFQuotaError`          | `LF_QUOTA`           | Free plan daily limit reached. |
| `LFValueTooLargeError`  | `LF_VALUE_TOO_LARGE` | Value over 25 MiB or metadata over 1 KiB. |
| `LFInvalidKeyError`     | `LF_INVALID_KEY`     | Key too long or uses the reserved `__lf/` prefix. |

## 9. Migrating from v3

- The default `type` of `get` changed from `"json"` to `"text"`.
- The `expirationTtl` option was renamed to `ttl`, and the minimum was raised from 30 to 60 seconds.
- `list()` no longer returns values. Use metadata for summary fields.
- Negative caching (section 4) is new in v4. v3 had no negative caching.
