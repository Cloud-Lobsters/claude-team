# Auth.js – Core Adapter Documentation

> **Auth.js** is a framework‑agnostic authentication library that can be used with any data layer (SQL, NoSQL, ORM, HTTP client, …).  
> This guide explains how to create a custom adapter, the required interface, and the available methods.

---

## Table of Contents

1. [Installation](#installation)
2. [Usage](#usage)
3. [Adapter Interface](#adapter-interface)
   * [Method Signatures](#method-signatures)
4. [Models](#models)
5. [Testing](#testing)
6. [Known Issues](#known-issues)
7. [Examples](#examples)

---

## Installation

```bash
# npm
npm install @auth/core

# pnpm
pnpm add @auth/core

# yarn
yarn add @auth/core

# bun
bun add @auth/core
```

After installing, import the adapter sub‑module:

```ts
import { type Adapter } from "@auth/core/adapters";
```

---

## Usage

### 1. Plain Object Adapter

```ts
export const MyAdapter: Adapter = {
  // implement the adapter methods here
};
```

### 2. Factory Function Adapter

```ts
export function MyAdapter(config: any): Adapter {
  // Instantiate a client/ORM here with the provided config,
  // or pass it in as a parameter.
  // Usually you already have a client instance elsewhere,
  // so you only create a new one if needed.

  return {
    // implement the adapter methods
  };
}
```

### Passing the Adapter to Auth.js

```ts
import { MyAdapter } from "./my-adapter";

const response = await Auth(request, {
  adapter: MyAdapter,          // 1. Plain object
  // adapter: MyAdapter({/* config */}), // 2. Factory function
  // ...other options
});
```

> **Tip** – If you already use an official adapter (e.g. Prisma), you can extend it:

```ts
import { PrismaAdapter } from "@auth/prisma-adapter";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const adapter: Adapter = {
  ...PrismaAdapter(prisma),
  // Add your custom methods here
};
```

---

## Adapter Interface

An adapter is an object whose properties are async functions that read/write data from your chosen data source.  
All methods are optional; if a method is called by Auth.js and not implemented, an error will be thrown.

```ts
export interface Adapter {
  // User CRUD
  createUser?(user: AdapterUser): Awaitable<AdapterUser>;
  getUser?(id: string): Awaitable<AdapterUser | null>;
  getUserByEmail?(email: string): Awaitable<AdapterUser | null>;
  getUserByAccount?(providerAccountId: Pick<AdapterAccount, "provider" | "providerAccountId">): Awaitable<AdapterUser | null>;
  updateUser?(user: Partial<AdapterUser> & Pick<AdapterUser, "id">): Awaitable<AdapterUser>;
  deleteUser?(userId: string): Awaitable<AdapterUser | void>;

  // Account CRUD
  linkAccount?(account: AdapterAccount): Awaitable<AdapterAccount | void>;
  unlinkAccount?(providerAccountId: Pick<AdapterAccount, "provider" | "providerAccountId">): Awaitable<AdapterAccount | void>;
  getAccount?(providerAccountId: string, provider: string): Awaitable<AdapterAccount | null>;

  // Session CRUD
  createSession?(session: { expires: Date; sessionToken: string; userId: string }): Awaitable<AdapterSession>;
  getSessionAndUser?(sessionToken: string): Awaitable<null | { session: AdapterSession; user: AdapterUser }>;
  updateSession?(session: Partial<AdapterSession> & Pick<AdapterSession, "sessionToken">): Awaitable<AdapterSession | void>;
  deleteSession?(sessionToken: string): Awaitable<AdapterSession | void>;

  // Authenticator (WebAuthn) CRUD
  createAuthenticator?(authenticator: AdapterAuthenticator): Awaitable<AdapterAuthenticator>;
  getAuthenticator?(credentialID: string): Awaitable<AdapterAuthenticator | null>;
  listAuthenticatorsByUserId?(userId: string): Awaitable<AdapterAuthenticator[]>;
  updateAuthenticatorCounter?(credentialID: string, newCounter: number): Awaitable<AdapterAuthenticator>;

  // Verification tokens
  createVerificationToken?(token: VerificationToken): Awaitable<VerificationToken | null | undefined>;
  useVerificationToken?(params: { identifier: string; token: string }): Awaitable<VerificationToken | null>;
}
```

> **Awaitable<T>** is a type alias for `Promise<T> | T`.

---

## Method Signatures (Detailed)

| Method | Optional | Parameters | Returns |
|--------|----------|------------|---------|
| `createAuthenticator` | ✅ | `authenticator: AdapterAuthenticator` | `Awaitable<AdapterAuthenticator>` |
| `createSession` | ✅ | `{ expires: Date; sessionToken: string; userId: string }` | `Awaitable<AdapterSession>` |
| `createUser` | ✅ | `user: AdapterUser` | `Awaitable<AdapterUser>` |
| `createVerificationToken` | ✅ | `verificationToken: VerificationToken` | `Awaitable<VerificationToken | null | undefined>` |
| `deleteSession` | ✅ | `sessionToken: string` | `Awaitable<AdapterSession | void>` |
| `deleteUser` | ✅ | `userId: string` | `Awaitable<AdapterUser | void>` |
| `getAccount` | ✅ | `providerAccountId: string, provider: string` | `Awaitable<AdapterAccount | null>` |
| `getAuthenticator` | ✅ | `credentialID: string` | `Awaitable<AdapterAuthenticator | null>` |
| `getSessionAndUser` | ✅ | `sessionToken: string` | `Awaitable<null | { session: AdapterSession; user: AdapterUser }>` |
| `getUser` | ✅ | `id: string` | `Awaitable<AdapterUser | null>` |
| `getUserByAccount` | ✅ | `providerAccountId: Pick<AdapterAccount, "provider" | "providerAccountId">` | `Awaitable<AdapterUser | null>` |
| `getUserByEmail` | ✅ | `email: string` | `Awaitable<AdapterUser | null>` |
| `linkAccount` | ✅ | `account: AdapterAccount` | `Awaitable<AdapterAccount | void>` |
| `listAuthenticatorsByUserId` | ✅ | `userId: string` | `Awaitable<AdapterAuthenticator[]>` |
| `unlinkAccount` | ✅ | `providerAccountId: Pick<AdapterAccount, "provider" | "providerAccountId">` | `Awaitable<AdapterAccount | void>` |
| `updateAuthenticatorCounter` | ✅ | `credentialID: string, newCounter: number` | `Awaitable<AdapterAuthenticator>` |
| `updateSession` | ✅ | `session: Partial<AdapterSession> & Pick<AdapterSession, "sessionToken">` | `Awaitable<AdapterSession | void>` |
| `updateUser` | ✅ | `user: Partial<AdapterUser> & Pick<AdapterUser, "id">` | `Awaitable<AdapterUser>` |
| `useVerificationToken` | ✅ | `{ identifier: string; token: string }` | `Awaitable<VerificationToken | null>` |

> **Note** – If a method is not implemented but called by Auth.js, an error will be thrown.

---

## Models

Auth.js expects the following data shapes. The exact column names may vary by adapter, but the fields below are mandatory.

### `AdapterUser`

| Field | Type | Description |
|-------|------|-------------|
| `id` | `string` | Unique identifier |
| `email` | `string` | User’s email address |
| `emailVerified` | `Date | null` | Date of email verification, or `null` |
| `name` | `string | null` | User’s name |
| `image` | `string | null` | URL to user avatar |

### `AdapterAccount`

| Field | Type | Description |
|-------|------|-------------|
| `id` | `string` | Unique identifier |
| `userId` | `string` | Owner user ID |
| `type` | `AdapterAccountType` | `"oauth" | "oidc" | "email" | "webauthn"` |
| `provider` | `string` | Provider ID (e.g. `"google"`) |
| `providerAccountId` | `string` | Provider‑specific account ID |
| `access_token` | `string | undefined` | OAuth access token |
| `expires_at` | `number | undefined` | Unix timestamp of token expiry |
| `refresh_token` | `string | undefined` | OAuth refresh token |
| `id_token` | `string | undefined` | OIDC ID token |
| `token_type` | `string | undefined` | Token type (lower‑cased) |
| `scope` | `string | undefined` | OAuth scope |
| `authorization_details` | `AuthorizationDetails[] | undefined` | Optional |

### `AdapterAuthenticator`

| Field | Type | Description |
|-------|------|-------------|
| `id` | `string` | Unique identifier |
| `userId` | `string` | Owner user ID |
| `credentialID` | `string` | Base64‑encoded credential ID |
| `credentialPublicKey` | `string` | Base64‑encoded public key |
| `credentialDeviceType` | `string` | Device type |
| `credentialBackedUp` | `boolean` | Whether the credential was backed up |
| `transports` | `string | null` | Transport flags |
| `counter` | `number` | Usage counter |
| `providerAccountId` | `string` | Connected account ID |

### `AdapterSession`

| Field | Type | Description |
|-------|------|-------------|
| `id` | `string` | Unique identifier |
| `sessionToken` | `string` | Random token stored in cookie |
| `userId` | `string` | Owner user ID |
| `expires` | `Date` | Expiry timestamp |

### `VerificationToken`

| Field | Type | Description |
|-------|------|-------------|
| `identifier` | `string` | User’s email address |
| `token` | `string` | Hashed token |
| `expires` | `Date` | Expiry timestamp |

---

## Testing

Auth.js ships with a test suite that verifies adapter compatibility.  
Run the tests with your chosen test runner (e.g. Jest, Vitest) after implementing the adapter.

```bash
# Example with Jest
npm test
```

---

## Known Issues

| Issue | Description | Work‑around |
|-------|-------------|-------------|
| **Token rotation** | Core does not rotate `access_token` automatically. | Store `refresh_token`, `expires_at` in the database and implement rotation logic in your application. |
| **Federated logout** | Deleting a session does not sign the user out of the identity provider. | Call the provider’s logout endpoint after session deletion. |

---

## Examples

### 1. Minimal Adapter (SQLite)

```ts
import { type Adapter, type AdapterUser, type AdapterAccount, type AdapterSession } from "@auth/core/adapters";
import { open } from "sqlite";
import sqlite3 from "sqlite3";

export async function SQLiteAdapter(dbPath: string): Promise<Adapter> {
  const db = await open({
    filename: dbPath,
    driver: sqlite3.Database,
  });

  return {
    async createUser(user: AdapterUser) {
      const result = await db.run(
        `INSERT INTO users (id, email, emailVerified, name, image)
         VALUES (?, ?, ?, ?, ?)`,
        user.id,
        user.email,
        user.emailVerified,
        user.name,
        user.image
      );
      return { ...user, id: result.lastID.toString() };
    },

    async getUser(id: string) {
      const row = await db.get(`SELECT * FROM users WHERE id = ?`, id);
      return row ?? null;
    },

    // …implement the rest of the required methods
  };
}
```

### 2. Extending an Official Adapter

```ts
import { PrismaAdapter } from "@auth/prisma-adapter";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const MyPrismaAdapter: Adapter = {
  ...PrismaAdapter(prisma),
  // Add custom logic
  async createSession(session) {
    // Add a custom field before saving
    session.customField = "value";
    return await PrismaAdapter(prisma).createSession(session);
  },
};
```

---

## References

* [Auth.js Docs](https://authjs.dev)
* [Adapter API Reference](https://authjs.dev/reference/core/adapters)
* [Official Adapters](https://authjs.dev/reference/core/adapters#official-adapters)

---