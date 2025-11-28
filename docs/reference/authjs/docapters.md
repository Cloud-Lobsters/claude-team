# Auth.js Adapter API Reference

Auth.js adapters provide a thin abstraction layer between Auth.js and any data store.  
Each adapter implements a set of optional methods that Auth.js calls to create, read, update, and delete users, accounts, sessions, authenticators, and verification tokens.

> **NOTE** – If a method is not implemented but Auth.js attempts to call it, an error will be thrown and the operation will fail.

---

## 1. Adapter Interface

```ts
export interface Adapter {
  // ────────────────────────────────────────────────────────────────────────
  // User CRUD
  // ────────────────────────────────────────────────────────────────────────
  createUser?(user: AdapterUser): Awaitable<AdapterUser>;
  getUser?(id: string): Awaitable<null | AdapterUser>;
  getUserByEmail?(email: string): Awaitable<null | AdapterUser>;
  getUserByAccount?(providerAccountId: Pick<AdapterAccount, "provider" | "providerAccountId">): Awaitable<null | AdapterUser>;
  updateUser?(user: Partial<AdapterUser> & Pick<AdapterUser, "id">): Awaitable<AdapterUser>;
  deleteUser?(userId: string): Awaitable<undefined | null | AdapterUser>;

  // ────────────────────────────────────────────────────────────────────────
  // Account CRUD
  // ────────────────────────────────────────────────────────────────────────
  linkAccount?(account: AdapterAccount): Awaitable<undefined | null | AdapterAccount>;
  unlinkAccount?(providerAccountId: Pick<AdapterAccount, "provider" | "providerAccountId">): Awaitable<undefined | AdapterAccount>;
  getAccount?(providerAccountId: string, provider: string): Awaitable<null | AdapterAccount>;
  getUserByAccount?(providerAccountId: string): Awaitable<null | AdapterUser>;

  // ────────────────────────────────────────────────────────────────────────
  // Session CRUD
  // ────────────────────────────────────────────────────────────────────────
  createSession?(session: { expires: Date; sessionToken: string; userId: string; }): Awaitable<AdapterSession>;
  getSessionAndUser?(sessionToken: string): Awaitable<null | { session: AdapterSession; user: AdapterUser }>;
  updateSession?(session: Partial<AdapterSession> & Pick<AdapterSession, "sessionToken">): Awaitable<undefined | null | AdapterSession>;
  deleteSession?(sessionToken: string): Awaitable<undefined | null | AdapterSession>;

  // ────────────────────────────────────────────────────────────────────────
  // Authenticator CRUD (WebAuthn)
  // ────────────────────────────────────────────────────────────────────────
  createAuthenticator?(authenticator: AdapterAuthenticator): Awaitable<AdapterAuthenticator>;
  getAuthenticator?(credentialID: string): Awaitable<null | AdapterAuthenticator>;
  listAuthenticatorsByUserId?(userId: string): Awaitable<AdapterAuthenticator[]>;
  updateAuthenticatorCounter?(credentialID: string, newCounter: number): Awaitable<AdapterAuthenticator>;

  // ────────────────────────────────────────────────────────────────────────
  // Verification Token CRUD
  // ────────────────────────────────────────────────────────────────────────
  createVerificationToken?(verificationToken: VerificationToken): Awaitable<undefined | null | VerificationToken>;
  useVerificationToken?(params: { identifier: string; token: string; }): Awaitable<null | VerificationToken>;
}
```

> **Awaitable** – `Promise<T> | T`

---

## 2. Core Types

### 2.1 `AdapterAccount`

Represents a connection between a user and an OAuth/OIDC/Email/WebAuthn provider.

```ts
export interface AdapterAccount extends Account, Indexable {
  provider: string;                     // e.g. "google"
  providerAccountId: string;            // provider‑specific ID
  userId: string;                       // FK to `AdapterUser.id`
  type: AdapterAccountType;             // "oauth" | "oidc" | "email" | "webauthn"

  // OAuth/OIDC specific fields
  access_token?: string;
  authorization_details?: AuthorizationDetails[];
  expires_at?: number;                  // epoch seconds
  expires_in?: number;
  id_token?: string;
  refresh_token?: string;
  scope?: string;
  token_type?: Lowercase<string>;
}
```

### 2.2 `AdapterAuthenticator`

Represents a WebAuthn credential assigned to a user.

```ts
export interface AdapterAuthenticator extends Authenticator {
  counter: number;                      // usage counter
  credentialBackedUp: boolean;
  credentialDeviceType: string;
  credentialID: string;                 // base64‑encoded
  credentialPublicKey: string;          // base64‑encoded
  providerAccountId: string;            // FK to `AdapterAccount.providerAccountId`
  transports?: null | string;           // concatenated transport flags
  userId: string;                       // FK to `AdapterUser.id`
}
```

### 2.3 `AdapterSession`

Represents an active sign‑in session.

```ts
export interface AdapterSession {
  sessionToken: string;                 // random value stored in a secure cookie
  userId: string;                       // FK to `AdapterUser.id`
  expires: Date;                        // absolute expiry date
}
```

### 2.4 `AdapterUser`

Represents a user in the system.

```ts
export interface AdapterUser extends User {
  id: string;                           // unique identifier
  email: string;                        // email address
  emailVerified: null | Date;           // null if not verified
  name?: null | string;
  image?: null | string;
}
```

### 2.5 `VerificationToken`

Temporary token used for email sign‑in.

```ts
export interface VerificationToken {
  identifier: string;                   // user’s email
  token: string;                        // hashed token
  expires: Date;                        // absolute expiry date
}
```

### 2.6 `AdapterAccountType`

```ts
export type AdapterAccountType = Extract<ProviderType, "oauth" | "oidc" | "email" | "webauthn">;
```

---

## 3. Utility Functions

### `isDate(value: unknown): value is string`

Determines whether a value can be parsed into a `Date`.

```ts
export function isDate(value: unknown): value is string {
  // implementation omitted – returns true if `value` is a parsable date string
}
```

---

## 4. Example Usage

Below is a minimal example of a custom adapter that stores data in an in‑memory map.  
Only the required methods are implemented; the rest are omitted for brevity.

```ts
import { Adapter, AdapterUser, AdapterAccount, AdapterSession } from "@auth/core/adapters";

const users = new Map<string, AdapterUser>();
const accounts = new Map<string, AdapterAccount>();
const sessions = new Map<string, AdapterSession>();

export const InMemoryAdapter: Adapter = {
  async createUser(user) {
    const id = crypto.randomUUID();
    const newUser = { ...user, id };
    users.set(id, newUser);
    return newUser;
  },

  async getUser(id) {
    return users.get(id) ?? null;
  },

  async createSession(session) {
    const token = crypto.randomBytes(32).toString("hex");
    const newSession = { ...session, sessionToken: token };
    sessions.set(token, newSession);
    return newSession;
  },

  async getSessionAndUser(sessionToken) {
    const session = sessions.get(sessionToken);
    if (!session) return null;
    const user = users.get(session.userId) ?? null;
    return user ? { session, user } : null;
  },

  // …implement the rest of the required methods…
};
```

> **Tip** – When using a real database, consider returning the deleted or updated record from `deleteSession`, `deleteUser`, `updateSession`, and `updateUser` for easier debugging and logging.

---

## 5. Common Error Scenarios

| Scenario | What Happens | How to Fix |
|----------|--------------|------------|
| A required method is missing | Auth.js throws an error and the operation fails | Implement the missing method or disable the feature that requires it |
| `getAccount` returns `undefined` instead of `null` | Auth.js may treat the account as existing | Return `null` when no account is found |
| `deleteSession` returns `undefined` | Logging may be incomplete | Return the deleted `AdapterSession` object |

---

## 6. Further Reading

- [Auth.js Guides – Database Session Management](https://authjs.dev/guides/database-session-management)
- [Auth.js Guides – Refresh Token Rotation](https://