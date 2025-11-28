# Auth.js – Adapter API Reference

> **TL;DR** – An *adapter* is a thin wrapper that normalises your data‑layer so that Auth.js can read/write users, accounts, sessions, authenticators and verification tokens.  
> The interface below lists every method that Auth.js may call, the shape of the arguments, the return type and a short description of what each method should do.

> **Tip** – If a method is marked *optional* you can omit it from your adapter.  
> If Auth.js calls a method that you haven’t implemented, it will throw a clear error and the operation will fail.

---

## 1. The `Adapter` Interface

```ts
export interface Adapter {
  // ────────────────────────────────────────────────────────────────────────
  // 1️⃣  User CRUD
  // ────────────────────────────────────────────────────────────────────────
  createUser?(user: AdapterUser): Awaitable<AdapterUser>;
  updateUser?(user: Partial<AdapterUser> & Pick<AdapterUser, "id">): Awaitable<AdapterUser>;
  deleteUser?(userId: string): Awaitable<undefined | null | AdapterUser>;
  getUser?(id: string): Awaitable<null | AdapterUser>;
  getUserByEmail?(email: string): Awaitable<null | AdapterUser>;
  getUserByAccount?(providerAccountId: Pick<AdapterAccount, "provider" | "providerAccountId">): Awaitable<null | AdapterUser>;

  // ────────────────────────────────────────────────────────────────────────
  // 2️⃣  Account CRUD
  // ────────────────────────────────────────────────────────────────────────
  linkAccount?(account: AdapterAccount): Awaitable<undefined | null | AdapterAccount>;
  unlinkAccount?(providerAccountId: Pick<AdapterAccount, "provider" | "providerAccountId">): Awaitable<undefined | AdapterAccount>;
  getAccount?(providerAccountId: string, provider: string): Awaitable<null | AdapterAccount>;

  // ────────────────────────────────────────────────────────────────────────
  // 3️⃣  Session CRUD
  // ────────────────────────────────────────────────────────────────────────
  createSession?(session: { expires: Date; sessionToken: string; userId: string; }): Awaitable<AdapterSession>;
  updateSession?(session: Partial<AdapterSession> & Pick<AdapterSession, "sessionToken">): Awaitable<undefined | null | AdapterSession>;
  deleteSession?(sessionToken: string): Awaitable<undefined | null | AdapterSession>;
  getSessionAndUser?(sessionToken: string): Awaitable<null | { session: AdapterSession; user: AdapterUser; }>;

  // ────────────────────────────────────────────────────────────────────────
  // 4️⃣  Authenticator (WebAuthn) CRUD
  // ────────────────────────────────────────────────────────────────────────
  createAuthenticator?(authenticator: AdapterAuthenticator): Awaitable<AdapterAuthenticator>;
  getAuthenticator?(credentialID: string): Awaitable<null | AdapterAuthenticator>;
  listAuthenticatorsByUserId?(userId: string): Awaitable<AdapterAuthenticator[]>;
  updateAuthenticatorCounter?(credentialID: string, newCounter: number): Awaitable<AdapterAuthenticator>;

  // ────────────────────────────────────────────────────────────────────────
  // 5️⃣  Verification Tokens
  // ────────────────────────────────────────────────────────────────────────
  createVerificationToken?(verificationToken: VerificationToken): Awaitable<undefined | null | VerificationToken>;
  useVerificationToken?(params: { identifier: string; token: string; }): Awaitable<null | VerificationToken>;
}
```

> **`Awaitable<T>`** – a type alias for `T | Promise<T>`.

---

## 2. Data Models

Below are the TypeScript interfaces that represent the data shapes Auth.js expects.  
All of them extend the core `User`, `Account`, `Authenticator`, `Session` and `VerificationToken` types from `@auth/core`.

### 2.1 `AdapterAccount`

```ts
export interface AdapterAccount extends Account {
  // OAuth / OIDC fields
  access_token?: string;
  authorization_details?: AuthorizationDetails[];
  expires_at?: number;          // absolute timestamp (seconds)
  expires_in?: number;
  id_token?: string;
  refresh_token?: string;
  scope?: string;
  token_type?: Lowercase<string>;

  // Provider / Account fields
  provider: string;                     // e.g. "google"
  providerAccountId: string;            // provider‑specific id
  type: AdapterAccountType;             // "oauth" | "oidc" | "email" | "webauthn"

  // User link
  userId: string;                       // FK to AdapterUser.id
}
```

### 2.2 `AdapterAuthenticator`

```ts
export interface AdapterAuthenticator extends Authenticator {
  counter: number;                      // how many times used
  credentialBackedUp: boolean;
  credentialDeviceType: string;
  credentialID: string;                 // base64 encoded
  credentialPublicKey: string;          // base64 encoded
  providerAccountId: string;            // FK to AdapterAccount.providerAccountId
  transports?: null | string;           // concatenated transport flags
  userId: string;                       // FK to AdapterUser.id
}
```

### 2.3 `AdapterSession`

```ts
export interface AdapterSession extends Session {
  expires: Date;          // absolute expiry
  sessionToken: string;   // random string stored in cookie
  userId: string;         // FK to AdapterUser.id
}
```

### 2.4 `AdapterUser`

```ts
export interface AdapterUser extends User {
  email: string;          // required
  emailVerified: null | Date;
  id: string;             // PK
  image?: null | string;
  name?: null | string;
}
```

### 2.5 `VerificationToken`

```ts
export interface VerificationToken {
  identifier: string;     // usually the user’s email
  token: string;          // hashed token
  expires: Date;          // absolute expiry
}
```

### 2.6 `AdapterAccountType`

```ts
export type AdapterAccountType = Extract<ProviderType, "oauth" | "oidc" | "email" | "webauthn">;
```

---

## 3. Method Signatures & Examples

Below are the *exact* signatures that Auth.js expects.  
Copy‑paste them into your adapter implementation and fill in the logic.

| Method | Description | Example |
|--------|-------------|---------|
| `createUser(user)` | Persist a new user and return the created record. | ```ts<br>async createUser(user) {<br>  const id = await db.insert("users", user).returning("id");<br>  return { ...user, id };<br>}<br>``` |
| `updateUser(user)` | Update an existing user and return the updated record. | ```ts<br>async updateUser(user) {<br>  await db.update("users", user.id, user);<br>  return user;<br>}<br>``` |
| `deleteUser(userId)` | Delete a user. | ```ts<br>async deleteUser(userId) {<br>  await db.delete("users", userId);<br>}<br>``` |
| `getUser(id)` | Retrieve a user by primary key. | ```ts<br>async getUser(id) {<br>  return db.find("users", id);<br>}<br>``` |
| `getUserByEmail(email)` | Retrieve a user by email. | ```ts<br>async getUserByEmail(email) {<br>  return db.findOne("users", { email });<br>}<br>``` |
| `linkAccount(account)` | Persist a new account. | ```ts<br>async linkAccount(account) {<br>  await db.insert("accounts", account);<br>  return account;<br>}<br>``` |
| `unlinkAccount(providerAccountId)` | Delete an account. | ```ts<br>async unlinkAccount({ provider, providerAccountId }) {<br>  await db.delete("accounts", { provider, providerAccountId });<br>}<br>``` |
| `createSession(session)` | Persist a new session. | ```ts<br>async createSession(session) {<br>  await db.insert("sessions", session);<br>  return session;<br>}<br>``` |
| `updateSession(session)` | Update an existing session. | ```ts<br>async updateSession(session) {<br>  await db.update("sessions", session.sessionToken, session);<br>  return session;<br>}<br>``` |
| `deleteSession(sessionToken)` | Delete a session. | ```ts<br>async deleteSession(sessionToken) {<br>  await db.delete("sessions", sessionToken);<br>}<br>``` |
| `getSessionAndUser(sessionToken)` | Return a session and its user in one query. | ```ts<br>async getSessionAndUser(sessionToken) {<br>  const session = await db.find("sessions", sessionToken);<br>  if (!session) return null;<br>  const user = await db.find("users", session.userId);<br>  return { session, user };<br>}<br>``` |
| `createAuthenticator(authenticator)` | Persist a new WebAuthn authenticator. | ```ts<br>async createAuthenticator(authenticator) {<br>  await db.insert("authenticators", authenticator);<br>  return authenticator;<br>}<br>``` |
| `getAuthenticator(credentialID)` | Retrieve an authenticator by its credential ID. | ```ts<br>async getAuthenticator(credentialID) {<br>  return db.findOne("authenticators", { credentialID });<br>}<br>``` |
| `listAuthenticatorsByUserId(userId)` | Return all authenticators for a user. | ```ts<br>async listAuthenticatorsByUserId(userId) {<br>  return db.findMany("authenticators", { userId });<br>}<br>``` |
| `updateAuthenticatorCounter(credentialID, newCounter)` | Increment the counter for a WebAuthn authenticator. | ```ts<br>async updateAuthenticatorCounter(credentialID, newCounter) {<br>  await db.update("authenticators", credentialID, { counter: newCounter });<br>  return { credentialID, counter: newCounter };<br>}<br>``` |
| `createVerificationToken(token)` | Persist a new email verification token. | ```ts<br>async createVerificationToken(token) {<br>  await db.insert("verification_tokens", token);<br>  return token;<br>}<br>``` |
| `useVerificationToken({ identifier, token })` | Retrieve and delete a token so it can only be used once. | ```ts<br>async useVerificationToken({ identifier, token }) {<br>  const vt = await db.findOne("verification_tokens", { identifier, token });<br>  if (!vt) return null;<br>  await db.delete("verification_tokens", vt.id);<br>  return vt;<br>}<br>``` |

> **Note** – All methods that return `Awaitable<T>` can be either synchronous or asynchronous.  
> If you return a plain value, Auth.js will automatically wrap it in a `Promise`.

---

## 4. Common Pitfalls

| Issue | What to do |
|-------|------------|
| **Missing required fields** | Throw an error or return `null` if the adapter cannot satisfy the contract. |
| **Returning `undefined` instead of `null`** | Auth.js expects `null` for “not found” cases. |
| **Not returning the created record** | Auth.js uses the returned object to populate the session. |
| **Using a non‑unique `sessionToken`** | Ensure `sessionToken` is cryptographically random and unique. |
| **Storing plain tokens** | `VerificationToken.token` must be hashed with `AuthConfig.secret`. |

---

## 5. Extending the Adapter

If you need to add custom behaviour (e.g. audit logs, caching, etc.) you can wrap the adapter:

```ts
import { Adapter } from "@auth/core/adapters";

export function createLoggingAdapter(base: Adapter): Adapter {
  return {
    ...base,
    async createUser(user) {
      console.log("Creating user", user.email);
      return base.createUser?.(user);
    },
    // …other overrides
  };
}
```

---

## 6. Quick Start – In‑Memory Adapter (for testing)

```ts
import { Adapter } from "@auth/core/adapters";
import { v4 as uuid } from "uuid";

const memory: Record<string, any> = {
  users: {},
  accounts: {},
  sessions: {},
  authenticators: {},
  verificationTokens: {},
};

export const InMemoryAdapter: Adapter = {
  async createUser(user) {
    const id = uuid();
    const newUser = { ...user, id };
    memory.users[id] = newUser;
    return newUser;
  },

  async getUser(id) {
    return memory.users[id] ?? null;
  },

  // …implement the rest similarly
};
```

---

## 7. References

* [Auth.js – Core Adapters](https://authjs.dev/reference/core/adapters)  
* [Auth.js – Provider Types](https://authjs.dev/reference/core/providers)  
* [Auth.js – Session Options](https://authjs.dev/reference/core/session-options)  
* [Auth.js – WebAuthn](https://authjs.dev/guides/webauthn)  

---

**Happy coding!**  
If you hit a snag, open an issue on the Auth.js GitHub repo or drop a message in the Discord community.