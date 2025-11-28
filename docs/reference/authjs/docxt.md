# Auth.js – Code Documentation

> **Auth.js** is a modern authentication library for JavaScript/TypeScript applications.  
> It supports a wide range of frameworks, adapters, and authentication strategies.

---

## Table of Contents

1. [Getting Started](#getting-started)
2. [Frameworks](#frameworks)
3. [Adapters](#adapters)
4. [API Reference](#api-reference)
5. [Migration Guide](#migration-guide)
6. [Community & Support](#community--support)

---

## 1. Getting Started

> **Note:** The `next-auth` package is deprecated in v5. Use `@auth/core` or the framework‑specific packages listed below.

```bash
# Install the core package
npm i @auth/core
```

> For framework‑specific integrations, install the corresponding package:

```bash
# Next.js
npm i @auth/nextjs

# SvelteKit
npm i @auth/sveltekit

# Express
npm i @auth/express

# Qwik
npm i @auth/qwik

# Solid Start
npm i @auth/solid-start
```

---

## 2. Frameworks

| Framework | Package |
|-----------|---------|
| **Next.js** | `@auth/nextjs` |
| **SvelteKit** | `@auth/sveltekit` |
| **Express** | `@auth/express` |
| **Qwik** | `@auth/qwik` |
| **Solid Start** | `@auth/solid-start` |

> Each framework package provides middleware, adapters, and helper utilities tailored to that ecosystem.

---

## 3. Adapters

Adapters allow Auth.js to persist user data in various databases or storage solutions.

| Adapter | Package |
|---------|---------|
| **Prisma** | `@auth/prisma-adapter` |
| **Drizzle** | `@auth/drizzle-adapter` |
| **Azure Tables** | `@auth/azure-tables-adapter` |
| **D1** | `@auth/d1-adapter` |
| **Dgraph** | `@auth/dgraph-adapter` |
| **DynamoDB** | `@auth/dynamodb-adapter` |
| **EdgeDB** | `@auth/edgedb-adapter` |
| **Fauna** | `@auth/fauna-adapter` |
| **Firebase** | `@auth/firebase-adapter` |
| **Hasura** | `@auth/hasura-adapter` |
| **Kysely** | `@auth/kysely-adapter` |
| **Mikro‑ORM** | `@auth/mikro-orm-adapter` |
| **MongoDB** | `@auth/mongodb-adapter` |
| **Neo4j** | `@auth/neo4j-adapter` |
| **Neon** | `@auth/neon-adapter` |
| **PostgreSQL** | `@auth/pg-adapter` |
| **PouchDB** | `@auth/pouchdb-adapter` |
| **Sequelize** | `@auth/sequelize-adapter` |
| **Supabase** | `@auth/supabase-adapter` |
| **SurrealDB** | `@auth/surrealdb-adapter` |
| **TypeORM** | `@auth/typeorm-adapter` |
| **Unstorage** | `@auth/unstorage-adapter` |
| **Upstash Redis** | `@auth/upstash-redis-adapter` |
| **Xata** | `@auth/xata-adapter` |

> **Example – Prisma Adapter**

```ts
import { PrismaAdapter } from '@auth/prisma-adapter';
import { prisma } from '@/lib/prisma';

export const authOptions = {
  adapter: PrismaAdapter(prisma),
  // ...other options
};
```

---

## 4. API Reference

> The core API is exposed via `@auth/core`. Below is a quick reference for the most common functions.

| Function | Description |
|----------|-------------|
| `createAuth` | Initializes the authentication system. |
| `signIn` | Handles user sign‑in. |
| `signOut` | Handles user sign‑out. |
| `getSession` | Retrieves the current session. |
| `getUser` | Retrieves the current user. |
| `verifyPassword` | Verifies a password against a stored hash. |
| `hashPassword` | Hashes a plain‑text password. |

> **Example – Sign‑In Flow**

```ts
import { signIn } from '@auth/core';

async function login(email: string, password: string) {
  const result = await signIn('credentials', {
    email,
    password,
    redirect: false,
  });

  if (result?.error) {
    throw new Error(result.error);
  }

  return result?.ok;
}
```

---

## 5. Migration Guide

If you’re upgrading from **NextAuth.js v4** to **Auth.js v5**, follow these steps:

1. **Remove** the old `next-auth` package.
2. **Install** the new framework‑specific package (e.g., `@auth/nextjs`).
3. **Update** your configuration files to use the new API (`authOptions` → `nextAuthOptions`).
4. **Replace** any deprecated methods with their new equivalents (see the migration guide on the official site).

> For a detailed step‑by‑step migration, visit:  
> https://authjs.dev/getting-started/migrating-to-v5

---

## 6. Community & Support

- **Discord** – Join the Auth.js community for real‑time help.  
- **GitHub** – Contribute or file issues.  
- **Documentation** – Full docs at https://authjs.dev

---

*Auth.js © Balázs Orbán and Team – 2025*