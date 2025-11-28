# @auth/fauna-adapter

Official Fauna adapter for Auth.js / NextAuth.js.

---

## Table of Contents

- [Installation](#installation)
- [Types](#types)
  - [FaunaAccount](#faunaaccount)
  - [FaunaSession](#faunasession)
  - [FaunaUser](#faunauser)
  - [FaunaVerificationToken](#faunaverificationtoken)
- [Utility Functions](#utility-functions)
  - [`format`](#format)
  - [`from()`](#from)
  - [`to()`](#to)
- [Adapter](#adapter)
  - [`FaunaAdapter()`](#faunaadapter)
- [Examples](#examples)

---

## Installation

```bash
# npm
npm install @auth/fauna-adapter fauna

# pnpm
pnpm add @auth/fauna-adapter fauna

# yarn
yarn add @auth/fauna-adapter fauna

# bun
bun add @auth/fauna-adapter fauna
```

---

## Types

### `FaunaAccount`

```ts
type FaunaAccount = ToFauna<AdapterAccount>;
```

### `FaunaSession`

```ts
type FaunaSession = ToFauna<AdapterSession>;
```

### `FaunaUser`

```ts
type FaunaUser = ToFauna<AdapterUser>;
```

### `FaunaVerificationToken`

```ts
type FaunaVerificationToken = ToFauna<VerificationToken> & {
  id: string;
};
```

---

## Utility Functions

### `format`

A helper object that provides two methods for converting between database and Auth.js representations.

```ts
const format: {
  from: T;
  to: T;
};
```

---

#### `from()`

Converts an object coming from the database into plain JavaScript.

```ts
/**
 * @template T
 * @param {Record<string, any>} object
 * @returns {T}
 */
function from<T>(object: Record<string, any>): T;
```

---

#### `to()`

Prepares an object coming from Auth.js to be written to the database.

```ts
/**
 * @template T
 * @param {Record<string, any>} object
 * @returns {T}
 */
function to<T>(object: Record<string, any>): T;
```

---

## Adapter

### `FaunaAdapter()`

Creates an Auth.js adapter that uses Fauna as the persistence layer.

```ts
/**
 * @param {Client} client - Fauna client instance
 * @param {AdapterConfig} [config] - Optional adapter configuration
 * @returns {Adapter}
 */
function FaunaAdapter(client: Client, config?: AdapterConfig): Adapter;
```

---

## Examples

### Basic Usage

```ts
import { FaunaAdapter } from '@auth/fauna-adapter';
import { Client } from 'fauna';

const faunaClient = new Client({ secret: 'YOUR_FAUNA_SECRET' });

export const authOptions = {
  providers: [
    // your providers here
  ],
  adapter: FaunaAdapter(faunaClient),
  // other NextAuth.js options
};
```

### Custom Adapter Configuration

```ts
const customConfig = {
  // Example: specify custom collection names
  collections: {
    users: 'custom_users',
    accounts: 'custom_accounts',
    sessions: 'custom_sessions',
    verificationTokens: 'custom_verification_tokens',
  },
};

export const authOptions = {
  adapter: FaunaAdapter(faunaClient, customConfig),
};
```

---

## Further Reading

- [Auth.js Documentation](https://authjs.dev/)
- [Fauna Documentation](https://fauna.com/docs)

---