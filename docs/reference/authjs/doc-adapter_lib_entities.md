# Auth.js – MikroORM Adapter API Reference

This reference describes the **entity classes** that the `@auth/mikro-orm-adapter` exposes.  
Each entity implements the corresponding adapter interface from `@auth/core` and is
intended to be used with MikroORM’s `Entity` system.

> **Note** – All examples shown below are taken directly from the source documentation and
> are kept verbatim.

---

## Table of Contents

- [Account](#account)
- [Session](#session)
- [User](#user)
- [VerificationToken](#verificationtoken)

---

## Account

`Account` represents a user’s external authentication provider account.

```ts
import { Entity, PrimaryKey, Property, ManyToOne, Collection } from '@mikro-orm/core';
import { User } from './User';

@Entity()
export class Account {
  @PrimaryKey()
  id!: string;

  @Property({ nullable: true })
  access_token?: string;

  @Property({ nullable: true })
  expires_at?: number; // absolute timestamp (seconds)

  @Property({ nullable: true })
  id_token?: string;

  @Property()
  provider!: string; // e.g. "google"

  @Property()
  providerAccountId!: string; // provider‑specific ID

  @Property({ nullable: true })
  refresh_token?: string;

  @Property({ nullable: true })
  scope?: string;

  @Property({ nullable: true })
  session_state?: JsonValue;

  @Property({ nullable: true })
  token_type?: Lowercase<string>; // always lower‑cased

  @Property()
  type!: AdapterAccountType;

  @ManyToOne(() => User, { eager: true })
  user!: User;

  @Property()
  userId!: string;
}
```

### Property Summary

| Property | Type | Description |
|----------|------|-------------|
| `access_token` | `string | undefined` | Optional OAuth access token. |
| `expires_at` | `number | undefined` | Absolute timestamp (seconds) when the access token expires. |
| `id_token` | `string | undefined` | Optional OpenID Connect ID token. |
| `provider` | `string` | Provider ID (e.g. `"google"`). |
| `providerAccountId` | `string` | Provider‑specific account identifier. |
| `refresh_token` | `string | undefined` | Optional OAuth refresh token. |
| `scope` | `string | undefined` | Optional OAuth scope. |
| `session_state` | `JsonValue | undefined` | Optional session state. |
| `token_type` | `Lowercase<string> | undefined` | Optional token type (always lower‑cased). |
| `type` | `AdapterAccountType` | Account type (`"oauth"`, `"email"`, `"credentials"`). |
| `user` | `User` | Reference to the owning user. |
| `userId` | `string` | Foreign key to the user. |

> **Links**  
> - Provider list: <https://authjs.dev/reference/core/providers>  
> - RFC 6749 §5.1: <https://www.rfc-editor.org/rfc/rfc6749#section-5.1>  
> - Token rotation guide: <https://authjs.dev/guides/refresh-token-rotation#database-strategy>

---

## Session

`Session` holds the current sign‑in state of a user.

```ts
import { Entity, PrimaryKey, Property, ManyToOne } from '@mikro-orm/core';
import { User } from './User';

@Entity()
export class Session {
  @PrimaryKey()
  id!: string;

  @Property()
  sessionToken!: string; // random, HTTP‑Only cookie value

  @Property()
  expires!: Date; // absolute expiry date

  @ManyToOne(() => User, { eager: true })
  user!: User;

  @Property()
  userId!: string;
}
```

### Property Summary

| Property | Type | Description |
|----------|------|-------------|
| `sessionToken` | `string` | Random token stored in a secure cookie. |
| `expires` | `Date` | Absolute expiry date. |
| `user` | `User` | Reference to the owning user. |
| `userId` | `string` | Foreign key to the user. |

> **Behavior**  
> - If accessed before `expires`, the session is extended based on `SessionOptions.maxAge`.  
> - If accessed after `expires`, the session is removed from the database.

---

## User

`User` represents an application user.

```ts
import { Entity, PrimaryKey, Property, Collection } from '@mikro-orm/core';
import { Account } from './Account';
import { Session } from './Session';

@Entity()
export class User {
  @PrimaryKey()
  id!: string;

  @Property()
  email!: string; // default: ""

  @Property({ nullable: true })
  emailVerified?: Date | null; // null if not verified

  @Property({ nullable: true })
  image?: string | null;

  @Property({ nullable: true })
  name?: string | null;

  @Collection(() => Account)
  accounts = new Collection<Account>(this);

  @Collection(() => Session)
  sessions = new Collection<Session>(this);
}
```

### Property Summary

| Property | Type | Description |
|----------|------|-------------|
| `email` | `string` | User’s email address. |
| `emailVerified` | `Date | null | undefined` | Verification date or `null`. |
| `image` | `string | null | undefined` | Optional profile image URL. |
| `name` | `string | null | undefined` | Optional display name. |
| `accounts` | `Collection<Account>` | All linked provider accounts. |
| `sessions` | `Collection<Session>` | All active sessions. |

---

## VerificationToken

`VerificationToken` is a temporary token used for email sign‑in.

```ts
import { Entity, PrimaryKey, Property } from '@mikro-orm/core';

@Entity()
export class VerificationToken {
  @PrimaryKey()
  identifier!: string; // user’s email

  @PrimaryKey()
  token!: string; // hashed token

  @Property()
  expires!: Date; // absolute expiry date
}
```

### Property Summary

| Property | Type | Description |
|----------|------|-------------|
| `identifier` | `string` | User’s email address. |
| `token` | `string` | Hashed token (using `AuthConfig.secret`). |
| `expires` | `Date` | Absolute expiry date. |

> **Usage** – When a user clicks the link in the email, the server hashes the token and
> compares it to the stored value. If they match and the token hasn’t expired, the user
> is signed in and the token is deleted.

---

## Quick Example

```ts
// Creating a new user
const user = new User();
user.email = "alice@example.com";
user.name = "Alice";

// Creating an account for that user
const account = new Account();
account.provider = "google";
account.providerAccountId = "1234567890";
account.user = user;

// Creating a session
const session = new Session();
session.sessionToken = crypto.randomBytes(32).toString("hex");
session.expires = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000); // 30 days
session.user = user;

// Persist with MikroORM
await orm.em.persistAndFlush([user, account, session]);
```

---

### References

- **Auth.js** – <https://authjs.dev>
- **MikroORM** – <https://mikro-orm.io>
- **Auth.js Guides** – <https://authjs.dev/guides>
- **Auth.js API** – <https://authjs.dev/reference/core>

Feel free to explore the source code on GitHub or contribute to the project!