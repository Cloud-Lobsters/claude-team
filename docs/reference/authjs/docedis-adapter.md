# @auth/upstash-redis-adapter

Official Upstash Redis adapter for **Auth.js** / **NextAuth.js**.

> **TL;DR** – Use this adapter to store Auth.js data in an Upstash Redis instance.

---

## Table of Contents

- [Installation](#installation)
- [Adapter Options](#adapter-options)
  - [Properties](#properties)
  - [Default Options](#default-options)
- [Type Declarations](#type-declarations)
- [Utility Functions](#utility-functions)
  - [`hydrateDates`](#hydratedates)
- [Creating the Adapter](#creating-the-adapter)
- [Example Usage](#example-usage)

---

## Installation

```bash
# npm
npm install @upstash/redis @auth/upstash-redis-adapter

# pnpm
pnpm add @upstash/redis @auth/upstash-redis-adapter

# yarn
yarn add @upstash/redis @auth/upstash-redis-adapter

# bun
bun add @upstash/redis @auth/upstash-redis-adapter
```

---

## Adapter Options

The adapter accepts an options object that lets you customize the key prefixes used in Redis.

```ts
interface UpstashRedisAdapterOptions {
  /** The prefix for the accountByUserId key */
  accountByUserIdPrefix?: string;

  /** The prefix for the account key */
  accountKeyPrefix?: string;

  /** The base prefix for all keys */
  baseKeyPrefix?: string;

  /** The prefix for the email key */
  emailKeyPrefix?: string;

  /** The prefix for the sessionByUserId key */
  sessionByUserIdKeyPrefix?: string;

  /** The prefix for the session key */
  sessionKeyPrefix?: string;

  /** The prefix for the user key */
  userKeyPrefix?: string;

  /** The prefix for the verificationToken key */
  verificationTokenKeyPrefix?: string;
}
```

### Default Options

If you omit any of the above properties, the following defaults are used:

```ts
const defaultOptions = {
  accountByUserIdPrefix: "user:account:by-user-id:",
  accountKeyPrefix: "user:account:",
  baseKeyPrefix: "",
  emailKeyPrefix: "user:email:",
  sessionByUserIdKeyPrefix: "user:session:by-user-id:",
  sessionKeyPrefix: "user:session:",
  userKeyPrefix: "user:",
  verificationTokenKeyPrefix: "user:token:",
};
```

---

## Type Declarations

The adapter exposes the following type declarations for convenience:

```ts
export type {
  UpstashRedisAdapterOptions,
  Adapter,
  AdapterUser,
  AdapterAccount,
  AdapterSession,
  AdapterVerificationToken,
};
```

---

## Utility Functions

### `hydrateDates(json)`

Converts stringified dates in the JSON object back into `Date` instances.

```ts
/**
 * Hydrates date strings in a JSON object.
 *
 * @param {object} json - The JSON object to hydrate.
 * @returns {any} The hydrated object.
 */
function hydrateDates(json: object): any;
```

---

## Creating the Adapter

```ts
import { UpstashRedisAdapter } from "@auth/upstash-redis-adapter";
import { Redis } from "@upstash/redis";

const redisClient = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL,
  token: process.env.UPSTASH_REDIS_REST_TOKEN,
});

const adapter = UpstashRedisAdapter(redisClient, {
  // Optional custom prefixes
  userKeyPrefix: "custom:user:",
});
```

---

## Example Usage

Below is a minimal example of how to integrate the adapter with **NextAuth.js**.

```ts
// pages/api/auth/[...nextauth].ts
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { UpstashRedisAdapter } from "@auth/upstash-redis-adapter";
import { Redis } from "@upstash/redis";

const redisClient = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL,
  token: process.env.UPSTASH_REDIS_REST_TOKEN,
});

export default NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  adapter: UpstashRedisAdapter(redisClient),
  // ...other NextAuth options
});
```

---

### Customizing Key Prefixes

If you need to avoid key collisions or follow a different naming convention, simply override the defaults:

```ts
const adapter = UpstashRedisAdapter(redisClient, {
  baseKeyPrefix: "myapp:",
  userKeyPrefix: "myapp:user:",
  sessionKeyPrefix: "myapp:session:",
});
```

---

## FAQ

| Question | Answer |
|----------|--------|
| **Can I use this adapter with other frameworks?** | Yes – the adapter is framework‑agnostic. It only requires a Redis client that implements the standard Redis commands. |
| **Is the adapter transactional?** | No, Redis operations are atomic per command but not transactional across multiple commands. |
| **How do I handle migrations?** | Since the adapter uses simple key prefixes, you can rename prefixes in the options to migrate data. |

---

## Contributing

Feel free to open issues or pull requests on the [GitHub repository](https://github.com/authjs/authjs). All contributions are welcome!

---