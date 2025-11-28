# Auth.js (NextAuth.js)

> **Auth.js** – Authentication for the Web.  
> Open‑source, full‑stack, and framework‑agnostic.  
> Built on standard Web APIs, it works in any JavaScript runtime (Node.js, Deno, Cloudflare Workers, Serverless, Docker, etc.).

---

## Table of Contents

1. [Overview](#overview)
2. [Features](#features)
3. [Getting Started](#getting-started)
4. [Installation](#installation)
5. [Basic Usage](#basic-usage)
6. [Configuration](#configuration)
7. [Security](#security)
8. [Supported Databases](#supported-databases)
9. [Contributing](#contributing)
10. [License](#license)

---

## 1. Overview

Auth.js is a set of open‑source packages that provide authentication for modern web applications.  
It supports:

- **OAuth 2.0 / OIDC** – works with any OAuth provider.
- **Email / Passwordless** – magic links, OTPs, and passkeys.
- **Passkeys/WebAuthn** – password‑less, phishing‑resistant login.
- **Stateless authentication** – no database required; works with any backend (Active Directory, LDAP, etc.).
- **Runtime‑agnostic** – runs in Docker, Node.js, Serverless, Cloudflare Workers, and more.

Auth.js is designed to keep you in control of your data. You can use it with or without a database, and it ships with adapters for many popular databases.

---

## 2. Features

| Feature | Description |
|---------|-------------|
| **Flexible & Easy to Use** | Works with any OAuth service; supports OAuth 2.0+ and OIDC. |
| **Built‑in Providers** | Google, GitHub, Twitter, Facebook, Microsoft, etc. |
| **Email / Passwordless** | Magic links, OTPs, and passkeys. |
| **Passkeys/WebAuthn** | Phishing‑resistant, password‑less authentication. |
| **Bring Your Database** | Optional adapters for MySQL, MariaDB, PostgreSQL, SQL Server, MongoDB, SQLite, GraphQL, and more. |
| **Stateless Auth** | Works with any backend (Active Directory, LDAP, etc.) without a database. |
| **Runtime‑agnostic** | Docker, Node.js, Serverless, Cloudflare Workers, Deno, etc. |
| **Own Your Data** | Keep full control of user data; no vendor lock‑in. |
| **Secure by Default** | CSRF protection, strict cookie policies, encrypted JWTs (JWE with A256CBC‑HS512). |
| **Session Management** | Tab/window sync, session polling, short‑lived sessions. |
| **Extensible** | Custom routines for account filtering, JWT encoding/decoding, cookie policies, and session properties. |

---

## 3. Getting Started

### 3.1 Install

```bash
# npm
npm install next-auth

# yarn
yarn add next-auth

# pnpm
pnpm add next-auth
```

> **Tip:** If you’re using a database, install the corresponding adapter (e.g., `@auth/prisma-adapter`).

### 3.2 Basic Setup

Create a file at `pages/api/auth/[...nextauth].ts` (or `.js`):

```ts
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

export default NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  // Optional: add callbacks, session, pages, etc.
});
```

> **Environment Variables**  
> `GOOGLE_CLIENT_ID` and `GOOGLE_CLIENT_SECRET` must be set in your environment.

### 3.3 Using the Client

```tsx
import { useSession, signIn, signOut } from "next-auth/react";

export default function Component() {
  const { data: session, status } = useSession();

  if (status === "loading") return <p>Loading...</p>;

  if (!session) {
    return <button onClick={() => signIn()}>Sign in</button>;
  }

  return (
    <>
      <p>Signed in as {session.user?.email}</p>
      <button onClick={() => signOut()}>Sign out</button>
    </>
  );
}
```

---

## 4. Configuration

Auth.js is highly configurable. Below are some common options:

| Option | Type | Description |
|--------|------|-------------|
| `providers` | `Provider[]` | Array of authentication providers. |
| `adapter` | `Adapter` | Database adapter (optional). |
| `callbacks` | `Callbacks` | Custom logic for `signIn`, `jwt`, `session`, etc. |
| `pages` | `Pages` | Custom pages for sign‑in, sign‑out, error, etc. |
| `session` | `SessionOptions` | Session strategy (`jwt` or `database`), max age, update age. |
| `jwt` | `JWTOptions` | JWT encryption, signing, and expiration. |
| `cookies` | `Cookies` | Custom cookie names, options, and security settings. |
| `events` | `Events` | Hooks for `signIn`, `signOut`, `createUser`, etc. |
| `debug` | `boolean` | Enable debug logs. |

> **Example: Custom JWT callback**

```ts
callbacks: {
  async jwt({ token, user }) {
    if (user) {
      token.id = user.id;
    }
    return token;
  },
}
```

---

## 5. Security

Auth.js follows best practices:

- **CSRF Protection** – CSRF tokens on POST routes (`/api/auth/signin`, `/api/auth/signout`).
- **Strict Cookie Policy** – `SameSite=Lax`, `Secure`, `HttpOnly` by default.
- **Encrypted JWTs** – JWE with `A256CBC-HS512` (default).
- **Session Polling & Tab Sync** – Keeps sessions fresh across tabs.
- **Short‑Lived Sessions** – Default session max age is 30 days; can be tuned.

> **Tip:** Use `session.strategy = "jwt"` for stateless sessions or `session.strategy = "database"` for server‑side sessions.

---

## 6. Supported Databases

Auth.js ships adapters for:

- MySQL / MariaDB
- PostgreSQL
- Microsoft SQL Server
- MongoDB
- SQLite
- GraphQL
- SurrealDB
- And many others via community adapters.

> **Example: Prisma Adapter**

```bash
npm install @prisma/client @auth/prisma-adapter
```

```ts
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "./prisma/client";

export default NextAuth({
  adapter: PrismaAdapter(prisma),
  // ...
});
```

---

## 7. Contributing

We welcome contributions! Please read our [Contributing Guide](https://github.com/nextauthjs/next-auth/blob/main/CONTRIBUTING.md) before submitting PRs.

---

## 8. License

Auth.js is released under the ISC license. See the [LICENSE](https://github.com/nextauthjs/next-auth/blob/main/LICENSE) file for details.

---

## 9. Sponsors

Auth.js is supported by a community of sponsors.  
(Feel free to add your own sponsorship details here.)

---

**Happy coding!** 🚀