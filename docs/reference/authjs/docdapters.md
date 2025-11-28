# Auth.js – Adapter API Reference

> **What is an Adapter?**  
> An adapter is an object that implements a set of methods for reading and writing data to a data source.  
> Auth.js uses these methods to perform user, account, session, and verification‑token CRUD operations in a database‑agnostic way.

---

## Adapter Interface

```ts
export interface Adapter {
  // ──────────────────────────────────────────────────────────────────────
  // User CRUD
  // ──────────────────────────────────────────────────────────────────────
  createUser?(user: AdapterUser): Awaitable<AdapterUser>;
  getUser?(id: string): Awaitable<null | AdapterUser>;
  getUserByEmail?(email: string): Awaitable<null | AdapterUser>;
  getUserByAccount?(providerAccountId: Pick<AdapterAccount, "provider" | "providerAccountId">): Awaitable<null | AdapterUser>;
  updateUser?(user: Partial<AdapterUser> & Pick<AdapterUser, "id">): Awaitable<AdapterUser>;
  deleteUser?(userId: string): Awaitable<undefined | null | AdapterUser>;

  // ──────────────────────────────────────────────────────────────────────
  // Account CRUD
  // ──────────────────────────────────────────────────────────────────────
  linkAccount?(account: AdapterAccount): Awaitable<undefined | null | AdapterAccount>;
  unlinkAccount?(providerAccountId: Pick<AdapterAccount, "provider" | "providerAccountId">): Awaitable<undefined | AdapterAccount>;
  getAccount?(providerAccountId: string, provider: string): Awaitable<null | AdapterAccount>;
  getUserByAccount?(providerAccountId: Pick<AdapterAccount, "provider" | "providerAccountId">): Awaitable<null | AdapterUser>;

  // ──────────────────────────────────────────────────────────────────────
  // Session CRUD
  // ──────────────────────────────────────────────────────────────────────
  createSession?(session: { expires: Date; sessionToken: string; userId: string; }): Awaitable<AdapterSession>;
  getSessionAndUser?(sessionToken: string): Awaitable<null | { session: AdapterSession; user: AdapterUser; }>;
  updateSession?(session: Partial<AdapterSession> & Pick<AdapterSession, "sessionToken">): Awaitable<undefined | null | AdapterSession>;
  deleteSession?(sessionToken: string): Awaitable<undefined | null | AdapterSession>;

  // ──────────────────────────────────────────────────────────────────────
  // Authenticator (WebAuthn) CRUD
  // ──────────────────────────────────────────────────────────────────────
  createAuthenticator?(authenticator: AdapterAuthenticator): Awaitable<AdapterAuthenticator>;
  getAuthenticator?(credentialID: string): Awaitable<null | AdapterAuthenticator>;
  listAuthenticatorsByUserId?(userId: string): Awaitable<AdapterAuthenticator[]>;
  updateAuthenticatorCounter?(credentialID: string, newCounter: number): Awaitable<AdapterAuthenticator>;

  // ──────────────────────────────────────────────────────────────────────
  // Verification Token CRUD
  // ──────────────────────────────────────────────────────────────────────
  createVerificationToken?(verificationToken: VerificationToken): Awaitable<undefined | null | VerificationToken>;
  useVerificationToken?(params: { identifier: string; token: string; }): Awaitable<null | VerificationToken>;
}
```

> **Notes**  
> * All methods are **optional** – Auth.js will throw a runtime error if a required method is missing.  
> * `Awaitable<T>` is a union of `T | Promise<T>`.  
> * The `delete*` methods may return the deleted record for logging purposes, but returning `void` is also acceptable.

---

## Data Types

### `AdapterAccount`

```ts
export interface AdapterAccount extends Account, Indexable {
  provider: string;                     // e.g. "google"
  providerAccountId: string;            // provider‑specific ID
  type: AdapterAccountType;             // "oauth" | "oidc" | "email" | "webauthn"
  userId: string;                       // FK to AdapterUser.id

  // OAuth / OIDC specific fields
  access_token?: string;
  authorization_details?: AuthorizationDetails[];
  expires_at?: number;                  // epoch seconds
  expires_in?: number;
  id_token?: string;
  refresh_token?: string;
  scope?: string;
  token_type?: string;                  // lower‑cased
}
```

### `AdapterAuthenticator`

```ts
export interface AdapterAuthenticator extends Authenticator {
  credentialID: string;                 // Base64 encoded
  credentialPublicKey: string;          // Base64 encoded
  credentialBackedUp: boolean;
  credentialDeviceType: string;
  providerAccountId: string;
  userId: string;
  counter: number;                      // usage count
  transports?: null | string;           // concatenated transport flags
}
```

### `AdapterSession`

```ts
export interface AdapterSession {
  sessionToken: string;                 // random, stored in cookie
  userId: string;                       // FK to AdapterUser.id
  expires: Date;                        // absolute expiry
}
```

### `AdapterUser`

```ts
export interface AdapterUser extends User {
  id: string;                           // unique identifier
  email: string;                        // user’s email
  emailVerified: null | Date;           // null if not verified
  name?: null | string;
  image?: null | string;
}
```

### `VerificationToken`

```ts
export interface VerificationToken {
  identifier: string;                   // user’s email
  token: string;                        // hashed token
  expires: Date;                        // absolute expiry
}
```

### `AdapterAccountType`

```ts
export type AdapterAccountType = Extract<ProviderType, "oauth" | "oidc" | "email" | "webauthn">;
```

---

## Helper Function

```ts
export function isDate(value: unknown): value is string {
  // Determines if a given value can be parsed into a Date
}
```

---

## Usage Example (TypeScript)

```ts
import { Adapter, AdapterUser, AdapterAccount } from "@auth/core/adapters";

const myAdapter: Adapter = {
  async createUser(user: AdapterUser) {
    // Persist user to DB and return the created record
    return await db.users.create(user);
  },

  async getUser(id: string) {
    return await db.users.findUnique({ where: { id } });
  },

  // …implement other required methods
};
```

> **Tip** – If you’re using a relational database that supports joins, implement `getSessionAndUser` to reduce round‑trips.

---

## Summary

* **Adapters** give Auth.js a uniform interface to any data layer.  
* Implement the methods that your application actually uses; missing methods will cause runtime errors.  
* Keep the data types in sync with your database schema for best performance and type safety.  

Happy coding!