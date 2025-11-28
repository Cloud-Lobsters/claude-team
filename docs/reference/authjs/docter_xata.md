# @auth/xata-adapter – Code Documentation

> **Auth.js** – The open‑source authentication framework for modern web apps.  
> **@auth/xata-adapter** – A database adapter that stores NextAuth.js data in a Xata database.

---

## Table of Contents

| Section | Description |
|---------|-------------|
| [Installation](#installation) | How to add the adapter to your project |
| [Usage](#usage) | Quick start example |
| [API Reference](#api-reference) | Full list of classes, methods, and types |
| [Database Schema](#database-schema) | The tables and records used by the adapter |
| [Type Declarations](#type-declarations) | TypeScript types for the adapter |
| [Examples](#examples) | Practical code snippets |
| [Contributing](#contributing) | How to help improve the adapter |

---

## Installation

```bash
# npm
npm install @auth/xata-adapter

# yarn
yarn add @auth/xata-adapter

# pnpm
pnpm add @auth/xata-adapter
```

> **Prerequisite** – A Xata database with the default schema (see [Database Schema](#database-schema)).  
> **Prerequisite** – A valid Xata API key stored in `process.env.XATA_API_KEY`.

---

## Usage

```ts
import { XataClient } from '@auth/xata-adapter';
import { NextAuthOptions } from 'next-auth';

const xata = new XataClient({
  apiKey: process.env.XATA_API_KEY,
  // Optional: specify a custom branch or database URL
  // branch: 'main',
  // databaseURL: 'https://your-database.xata.sh',
});

export const authOptions: NextAuthOptions = {
  adapter: {
    // The adapter instance
    ...xata,
  },
  // ...other NextAuth options
};
```

> The adapter implements the NextAuth.js adapter interface, so you can drop it into any framework that supports NextAuth (Next.js, SvelteKit, Express, etc.).

---

## API Reference

### `XataClient`

```ts
class XataClient extends DatabaseClient<DatabaseSchema> {
  constructor(options?: BaseClientOptions);
  getConfig(): Promise<{ branch: string; databaseURL: string }>;
}
```

| Property | Type | Description |
|----------|------|-------------|
| `branch` | `string` | The Xata branch used by the client. |
| `databaseURL` | `string` | The URL of the Xata database. |

#### Methods

| Method | Signature | Description |
|--------|-----------|-------------|
| `getConfig()` | `Promise<{ branch: string; databaseURL: string }>` | Returns the current configuration of the client. |

---

### Data Models

| Model | Fields | Description |
|-------|--------|-------------|
| `NextauthAccount` | `access_token?`, `expires_at?`, `id_token?`, `provider?`, `providerAccountId?`, `refresh_token?`, `scope?`, `session_state?`, `token_type?`, `type?`, `user?` | Stores OAuth provider data. |
| `NextauthSession` | `expires?`, `sessionToken?`, `user?` | Stores session information. |
| `NextauthUser` | `email?`, `emailVerified?`, `image?`, `name?` | Stores user profile data. |
| `NextauthUsersAccount` | `account?`, `user?` | Junction table linking users and accounts. |
| `NextauthUsersSession` | `session?`, `user?` | Junction table linking users and sessions. |
| `NextauthVerificationToken` | `expires?`, `identifier?`, `token?` | Stores email verification tokens. |

> All fields are optional (`?`) because Xata allows nullable columns.

---

## Database Schema

```ts
type DatabaseSchema = {
  nextauth_accounts: NextauthAccountRecord;
  nextauth_sessions: NextauthSessionRecord;
  nextauth_users: NextauthUserRecord;
  nextauth_users_accounts: NextauthUsersAccountRecord;
  nextauth_users_sessions: NextauthUsersSessionRecord;
  nextauth_verificationTokens: NextauthVerificationTokenRecord;
};
```

Each record type extends the base model with Xata’s internal metadata (`XataRecord`).

| Table | Record Type |
|-------|-------------|
| `nextauth_accounts` | `NextauthAccountRecord` |
| `nextauth_sessions` | `NextauthSessionRecord` |
| `nextauth_users` | `NextauthUserRecord` |
| `nextauth_users_accounts` | `NextauthUsersAccountRecord` |
| `nextauth_users_sessions` | `NextauthUsersSessionRecord` |
| `nextauth_verificationTokens` | `NextauthVerificationTokenRecord` |

---

## Type Declarations

```ts
type NextauthAccountRecord = NextauthAccount & XataRecord;
type NextauthSessionRecord = NextauthSession & XataRecord;
type NextauthUserRecord = NextauthUser & XataRecord;
type NextauthUsersAccountRecord = NextauthUsersAccount & XataRecord;
type NextauthUsersSessionRecord = NextauthUsersSession & XataRecord;
type NextauthVerificationTokenRecord = NextauthVerificationToken & XataRecord;
```

> `XataRecord` contains fields such as `id`, `createdAt`, `updatedAt`, etc., automatically added by Xata.

---

## Examples

### 1. Creating a New User

```ts
const user = await xata.db.nextauth_users.create({
  data: {
    email: 'alice@example.com',
    name: 'Alice',
    image: 'https://example.com/alice.png',
  },
});
```

### 2. Linking an OAuth Account

```ts
await xata.db.nextauth_accounts.create({
  data: {
    provider: 'google',
    providerAccountId: '1234567890',
    user: { connect: { id: user.id } },
    access_token: 'ya29.a0AfH6SM...',
    expires_at: Math.floor(Date.now() / 1000) + 3600,
  },
});
```

### 3. Creating a Session

```ts
const session = await xata.db.nextauth_sessions.create({
  data: {
    sessionToken: 'random-session-token',
    expires: new Date(Date.now() + 30 * 60 * 1000), // 30 minutes
    user: { connect: { id: user.id } },
  },
});
```

### 4. Generating a Verification Token

```ts
await xata.db.nextauth_verificationTokens.create({
  data: {
    identifier: 'alice@example.com',
    token: 'verification-token',
    expires: new Date(Date.now() + 24 * 60 * 60 * 1000), // 24 hours
  },
});
```

---

## Contributing

Feel free to open issues or pull requests on the [GitHub repository](https://github.com/authjs/xata-adapter).  
All contributions are welcome – from bug fixes to new features and documentation improvements.

---

*Auth.js © Balázs Orbán and Team – 2025*