# Auth.js – Adapter Reference

Auth.js is a framework‑agnostic authentication library that can be used with any data layer (SQL, NoSQL, ORM, HTTP client, …).  
Adapters provide a thin wrapper around your data source so that Auth.js can read/write users, accounts, sessions, authenticators, and verification tokens.

> **Note** – The core library is framework‑agnostic, but an adapter may depend on a specific client/ORM that is not yet compatible with your runtime (e.g. Node.js only). If you run into such issues, file an issue in the corresponding adapter repository.

---

## Table of Contents

1. [Installation](#installation)
2. [Usage](#usage)
3. [Models](#models)
4. [Testing](#testing)
5. [Known Issues](#known-issues)
6. [Adapter API](#adapter-api)
   - [Method Signatures](#method-signatures)
   - [Type Definitions](#type-definitions)
7. [Examples](#examples)

---

## 1. Installation

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

## 2. Usage

### 2.1. Plain Object Adapter

```ts
export const MyAdapter: Adapter = {
  // implement the adapter methods here
};
```

### 2.2. Factory Function Adapter

Most official adapters expose a factory that accepts a configuration object (e.g. a database client).  
You can follow the same pattern:

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

### 2.3. Passing the Adapter to Auth.js

```ts
import { MyAdapter } from "./my-adapter";

const response = await Auth(request, {
  adapter: MyAdapter,          // 1. Plain object
  // adapter: MyAdapter({ /* config */ }), // 2. Factory function
  // …other Auth.js options
});
```

### 2.4. Extending an Existing Adapter

If you want to add custom logic to an official adapter:

```ts
import { type Adapter } from "@auth/core/adapters";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const adapter: Adapter = {
  ...PrismaAdapter(prisma),
  // Add your custom methods here
};

const request = new Request("https://example.com");
const response = await Auth(request, { adapter, /* … */ });
```

---

## 3. Models

Auth.js can work with any database. The following tables are the minimal set required by the core library.  
Field names are camelCase in the code, but many adapters expose snake_case columns for OAuth values.

| Table | Purpose | Key Fields |
|-------|---------|------------|
| `users` | Stores user profiles | `id`, `name`, `email`, `emailVerified`, `image` |
| `accounts` | Links a user to an OAuth/Email provider | `id`, `userId`, `provider`, `providerAccountId`, `type`, `access_token`, `refresh_token`, `expires_at`, `id_token`, `token_type`, `scope`, `authorization_details` |
| `sessions` | Stores active sessions | `id`, `sessionToken`, `userId`, `expires` |
| `authenticators` | Stores WebAuthn credentials | `id`, `userId`, `credentialID`, `credentialPublicKey`, `credentialBackedUp`, `credentialDeviceType`, `transports`, `counter`, `providerAccountId` |
| `verification_tokens` | Stores email‑verification tokens | `identifier`, `token`, `expires` |

> **Tip** – Most adapters provide a migration script or Prisma schema that you can copy.

---

## 4. Testing

Each adapter should include a test suite that verifies compatibility with Auth.js.  
Run the tests with your preferred test runner (e.g. Jest, Vitest).

```bash
# Example with Jest
npm test
```

---

## 5. Known Issues

| Feature | Status | Notes |
|---------|--------|-------|
| **Token rotation** | Not supported out of the box | Store `refresh_token`, `expires_at`, etc. in the database and implement rotation logic yourself. |
| **Federated logout** | Not supported out of the box | Deleting a session does **not** sign the user out of the identity provider. Implement a logout endpoint that calls the provider’s logout API if needed. |

---

## 6. Adapter API

An adapter is an object that implements a set of optional methods.  
If a method is not implemented but Auth.js calls it, an error will be thrown.

### 6.1. Method Signatures

| Method | Optional? | Parameters | Returns |
|--------|-----------|------------|---------|
| `createAuthenticator(authenticator)` | ✅ | `authenticator: AdapterAuthenticator` | `Promise<AdapterAuthenticator>` |
| `createSession(session)` | ✅ | `{ expires: Date; sessionToken: string; userId: string; }` | `Promise<AdapterSession>` |
| `createUser(user)` | ✅ | `user: AdapterUser` | `Promise<AdapterUser>` |
| `createVerificationToken(verificationToken)` | ✅ | `verificationToken: VerificationToken` | `Promise<VerificationToken | null | undefined>` |
| `deleteSession(sessionToken)` | ✅ | `sessionToken: string` | `Promise<void | AdapterSession>` |
| `deleteUser(userId)` | ✅ | `userId: string` | `Promise<void | AdapterUser>` |
| `getAccount(providerAccountId, provider)` | ✅ | `providerAccountId: string`, `provider: string` | `Promise<AdapterAccount | null>` |
| `getAuthenticator(credentialID)` | ✅ | `credentialID: string` | `Promise<AdapterAuthenticator | null>` |
| `getSessionAndUser(sessionToken)` | ✅ | `sessionToken: string` | `Promise<null | { session: AdapterSession; user: AdapterUser; }>` |
| `getUser(id)` | ✅ | `id: string` | `Promise<AdapterUser | null>` |
| `getUserByAccount(providerAccountId)` | ✅ | `providerAccountId: Pick<AdapterAccount, "provider" | "providerAccountId">` | `Promise<AdapterUser | null>` |
| `getUserByEmail(email)` | ✅ | `email: string` | `Promise<AdapterUser | null>` |
| `linkAccount(account)` | ✅ | `account: AdapterAccount` | `Promise<void | AdapterAccount>` |
| `listAuthenticatorsByUserId(userId)` | ✅ | `userId: string` | `Promise<AdapterAuthenticator[]>` |
| `unlinkAccount(providerAccountId)` | ✅ | `providerAccountId: Pick<AdapterAccount, "provider" | "providerAccountId">` | `Promise<void | AdapterAccount>` |
| `updateAuthenticatorCounter(credentialID, newCounter)` | ✅ | `credentialID: string`, `newCounter: number` | `Promise<AdapterAuthenticator>` |
| `updateSession(session)` | ✅ | `session: Partial<AdapterSession> & Pick<AdapterSession, "sessionToken">` | `Promise<AdapterSession | null | undefined>` |
| `updateUser(user)` | ✅ | `user: Partial<AdapterUser> & Pick<AdapterUser, "id">` | `Promise<AdapterUser>` |
| `useVerificationToken(params)` | ✅ | `{ identifier: string; token: string; }` | `Promise<VerificationToken | null>` |

> **Tip** – If a method is not required for your use‑case, you can simply omit it. Auth.js will throw a clear error if it is called.

### 6.2. Type Definitions

```ts
// AdapterAccount
export interface AdapterAccount extends Account {
  provider: string;
  providerAccountId: string;
  type: AdapterAccountType;
  userId: string;
}

// AdapterAuthenticator
export interface AdapterAuthenticator extends Authenticator {
  counter: number;
  credentialBackedUp: boolean;
  credentialDeviceType: string;
  credentialID: string;
  credentialPublicKey: string;
  providerAccountId: string;
  transports?: string | null;
  userId: string;
}

// AdapterSession
export interface AdapterSession {
  expires: Date;
  sessionToken: string;
  userId: string;
}

// AdapterUser
export interface AdapterUser extends User {
  email: string;
  emailVerified: Date | null;
  id: string;
  image?: string | null;
  name?: string | null;
}

// VerificationToken
export interface VerificationToken {
  identifier: string; // e.g. email
  token: string;      // hashed token
  expires: Date;
}

// AdapterAccountType
export type AdapterAccountType = Extract<ProviderType, "oauth" | "oidc" | "email" | "webauthn">;

// Utility
export function isDate(value: unknown): value is string;
```

---

## 7. Examples

### 7.1. Minimal Adapter Implementation

```ts
import { type Adapter } from "@auth/core/adapters";

export const InMemoryAdapter: Adapter = {
  async createUser(user) {
    // Store user in memory
    return { ...user, id: "1" };
  },

  async getUser(id) {
    // Retrieve user by id
    return null;
  },

  // …implement other required methods
};
```

### 7.2. Using an Official Adapter with Custom Logic

```ts
import { PrismaAdapter } from "@auth/prisma-adapter";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const CustomPrismaAdapter = PrismaAdapter(prisma);

export const MyAdapter: Adapter = {
  ...CustomPrismaAdapter,
  async createUser(user) {
    // Add custom logic before creating a user
    console.log("Creating user:", user.email);
    return await CustomPrismaAdapter.createUser(user);
  },
};
```

### 7.3. Adapter Factory Pattern

```ts
import { type Adapter } from "@auth/core/adapters";
import { MongoClient } from "mongodb";

export function MongoAdapter(config: { uri: string }): Adapter {
  const client = new MongoClient(config.uri);
  const db = client.db();

  return {
    async createUser(user) {
      const result = await db.collection("users").insertOne(user);
      return { ...user, id: result.insertedId.toString() };
    },

    async getUser(id) {
      return await db.collection("users").findOne({ _id: id });
    },

    // …implement other methods
  };
}
```

---

### 7.4. Passing the Adapter to Auth.js

```ts
import { Auth } from "@auth/core";
import { MongoAdapter } from "./mongo-adapter";

const adapter = MongoAdapter({ uri: "mongodb://localhost:27017" });

const response = await Auth(request, {
  adapter,
  // …other options
});
```

---

## 8. Further Reading

- [Auth.js Core API](https://authjs.dev/reference/core)
- [Official Adapters](https://authjs.dev/reference/adapters)
- [Token Rotation Guide](https://authjs.dev/guides/refresh-token-rotation)
- [Federated Logout](https://authjs.dev/guides/federated-logout)

---

**Happy coding!**