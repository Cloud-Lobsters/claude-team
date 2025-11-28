# Auth.js – Official Documentation (v5)

> **⚠️ Deprecated** – The `next-auth/middleware` module has been replaced in v5.  
> For details on migrating to the new middleware, see the [migration guide](https://authjs.dev/getting-started/migrating-to-v5#authenticating-server-side).

---

## Overview

Auth.js is a comprehensive authentication framework that supports a wide range of frameworks, adapters, and authentication strategies. It is the successor to NextAuth.js and is designed to be framework‑agnostic while still providing deep integration with popular stacks.

---

## Supported Frameworks

| Framework | Package |
|-----------|---------|
| **Next.js** | `@auth/nextjs` |
| **SvelteKit** | `@auth/sveltekit` |
| **Express** | `@auth/express` |
| **Qwik** | `@auth/qwik` |
| **Solid Start** | `@auth/solid-start` |

---

## Adapters

Adapters allow Auth.js to persist user data in a variety of databases and storage solutions. Below is a list of officially supported adapters:

| Adapter | Package |
|---------|---------|
| Prisma | `@auth/prisma-adapter` |
| Drizzle | `@auth/drizzle-adapter` |
| Azure Tables | `@auth/azure-tables-adapter` |
| D1 (Cloudflare) | `@auth/d1-adapter` |
| Dgraph | `@auth/dgraph-adapter` |
| DynamoDB | `@auth/dynamodb-adapter` |
| EdgeDB | `@auth/edgedb-adapter` |
| Fauna | `@auth/fauna-adapter` |
| Firebase | `@auth/firebase-adapter` |
| Hasura | `@auth/hasura-adapter` |
| Kysely | `@auth/kysely-adapter` |
| MikroORM | `@auth/mikro-orm-adapter` |
| MongoDB | `@auth/mongodb-adapter` |
| Neo4j | `@auth/neo4j-adapter` |
| Neon | `@auth/neon-adapter` |
| PostgreSQL | `@auth/pg-adapter` |
| PouchDB | `@auth/pouchdb-adapter` |
| Sequelize | `@auth/sequelize-adapter` |
| Supabase | `@auth/supabase-adapter` |
| SurrealDB | `@auth/surrealdb-adapter` |
| TypeORM | `@auth/typeorm-adapter` |
| Unstorage | `@auth/unstorage-adapter` |
| Upstash Redis | `@auth/upstash-redis-adapter` |
| Xata | `@auth/xata-adapter` |

---

## Core Packages

| Package | Purpose |
|---------|---------|
| `@auth/core` | Core authentication logic (providers, sessions, JWT, etc.) |
| `@auth/jwt` | JWT handling utilities |
| `@auth/middleware` | Server‑side authentication middleware (deprecated in v5) |

---

## Getting Started

1. **Install the core package**  
   ```bash
   npm i @auth/core
   ```

2. **Choose a framework adapter** (e.g., Next.js)  
   ```bash
   npm i @auth/nextjs
   ```

3. **Configure your authentication**  
   ```ts
   // auth.ts
   import { auth } from '@auth/core';

   export const { getSession, signIn, signOut } = auth({
     providers: [
       // Add your providers here
     ],
     adapter: /* your chosen adapter */,
   });
   ```

4. **Use the helpers in your application**  
   ```tsx
   // Example: Next.js page
   import { getSession } from '@/lib/auth';

   export default async function Dashboard() {
     const session = await getSession();
     if (!session) return <Redirect to="/login" />;

     return <div>Welcome, {session.user.name}!</div>;
   }
   ```

---

## API Reference

- **Providers** – Configure OAuth, email, credentials, etc.  
- **Sessions** – Session management (JWT or database).  
- **Callbacks** – Custom logic during sign‑in, sign‑out, session creation, etc.  
- **Events** – Hook into authentication events (e.g., `signIn`, `signOut`).  

For detailed API documentation, visit the official [API reference](https://authjs.dev/api).

---

## Security

Auth.js follows best practices for authentication, including:

- Secure cookie handling
- CSRF protection
- Rate limiting
- Password hashing (bcrypt, argon2, etc.)

For a deeper dive into security features, see the [Security](https://authjs.dev/security) section.

---

## Community & Support

- **Discord** – Join the Auth.js community for help and discussion.  
- **GitHub** – Contribute or file issues on the [Auth.js repository](https://github.com/authjs/authjs).  
- **NPM** – Packages are published on [npmjs.com](https://www.npmjs.com/).

---

## Sponsors & Contributors

Auth.js is maintained by **Balázs Orbán** and the open‑source community. Contributions are welcome!  

---