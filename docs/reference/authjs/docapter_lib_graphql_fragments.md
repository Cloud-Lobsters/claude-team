# Auth.js – GraphQL Adapter (`@auth/dgraph-adapter`)

Auth.js is a modern authentication framework that supports a wide range of adapters, including a GraphQL‑based adapter for Dgraph.  
This document covers the essentials of the `@auth/dgraph-adapter` package, its GraphQL fragments, and how to use it in your project.

---

## Table of Contents

1. [Overview](#overview)
2. [Installation](#installation)
3. [Getting Started](#getting-started)
4. [GraphQL Fragments](#graphql-fragments)
5. [API Reference](#api-reference)
6. [Other Adapters](#other-adapters)
7. [Contributing & Support](#contributing--support)

---

## 1. Overview

`@auth/dgraph-adapter` provides a fully‑typed adapter that stores Auth.js data in a Dgraph database via GraphQL.  
It supports all core Auth.js entities:

- **Account**
- **Session**
- **User**
- **VerificationToken**

The adapter is designed to be drop‑in compatible with Auth.js, so you can swap it in without changing your application logic.

---

## 2. Installation

```bash
# npm
npm install @auth/dgraph-adapter

# yarn
yarn add @auth/dgraph-adapter

# pnpm
pnpm add @auth/dgraph-adapter
```

> **Prerequisites**  
> • A running Dgraph instance with GraphQL enabled.  
> • A GraphQL schema that matches the Auth.js data model (see the fragments below).

---

## 3. Getting Started

```ts
import NextAuth from "next-auth";
import DgraphAdapter from "@auth/dgraph-adapter";

export default NextAuth({
  adapter: DgraphAdapter({
    // Dgraph GraphQL endpoint
    url: "https://your-dgraph-instance.com/graphql",
    // Optional: authentication headers
    headers: {
      Authorization: "Bearer YOUR_TOKEN",
    },
  }),
  // ...other NextAuth options
});
```

> **Tip** – If you’re using a serverless environment, consider caching the adapter instance to avoid re‑initializing the GraphQL client on every request.

---

## 4. GraphQL Fragments

The adapter relies on a set of GraphQL fragments that map Auth.js entities to Dgraph nodes.  
These fragments should be included in your GraphQL schema or used as part of your queries/mutations.

```graphql
# Account Fragment
fragment AccountFragment on Account {
  id
  type
  provider
  providerAccountId
  expires_at
  token_type
  scope
  access_token
  refresh_token
  id_token
  session_state
}

# Session Fragment
fragment SessionFragment on Session {
  expires
  id
  sessionToken
}

# User Fragment
fragment UserFragment on User {
  email
  id
  image
  name
  emailVerified
}

# VerificationToken Fragment
fragment VerificationTokenFragment on VerificationToken {
  identifier
  token
  expires
}
```

> **Usage Example** – Fetch a user with their sessions:

```graphql
query GetUserWithSessions($userId: ID!) {
  user(id: $userId) {
    ...UserFragment
    sessions {
      ...SessionFragment
    }
  }
}
```

---

## 5. API Reference

### `DgraphAdapter(options)`

Creates an Auth.js adapter that communicates with Dgraph via GraphQL.

| Option | Type | Description |
|--------|------|-------------|
| `url` | `string` | **Required.** GraphQL endpoint of your Dgraph instance. |
| `headers` | `Record<string, string>` | Optional HTTP headers (e.g., for authentication). |
| `fetch` | `typeof fetch` | Optional custom fetch implementation (useful in serverless environments). |

**Return Value** – An object that implements the Auth.js adapter interface.

---

## 6. Other Adapters

Auth.js supports many adapters out of the box. Below is a quick reference:

| Adapter | Package | Primary Use‑Case |
|---------|---------|------------------|
| Prisma | `@auth/prisma-adapter` | SQL/NoSQL via Prisma |
| Drizzle | `@auth/drizzle-adapter` | SQL via Drizzle ORM |
| Azure Tables | `@auth/azure-tables-adapter` | Azure Table Storage |
| D1 | `@auth/d1-adapter` | Cloudflare D1 |
| Dgraph | `@auth/dgraph-adapter` | GraphQL via Dgraph |
| DynamoDB | `@auth/dynamodb-adapter` | AWS DynamoDB |
| Edgedb | `@auth/edgedb-adapter` | EdgeDB |
| Fauna | `@auth/fauna-adapter` | FaunaDB |
| Firebase | `@auth/firebase-adapter` | Firebase |
| Hasura | `@auth/hasura-adapter` | Hasura GraphQL |
| Kysely | `@auth/kysely-adapter` | Kysely ORM |
| MikroORM | `@auth/mikro-orm-adapter` | MikroORM |
| MongoDB | `@auth/mongodb-adapter` | MongoDB |
| Neo4j | `@auth/neo4j-adapter` | Neo4j |
| Neon | `@auth/neon-adapter` | Neon |
| PG | `@auth/pg-adapter` | PostgreSQL |
| PouchDB | `@auth/pouchdb-adapter` | PouchDB |
| Sequelize | `@auth/sequelize-adapter` | Sequelize |
| Supabase | `@auth/supabase-adapter` | Supabase |
| SurrealDB | `@auth/surrealdb-adapter` | SurrealDB |
| TypeORM | `@auth/typeorm-adapter` | TypeORM |
| Unstorage | `@auth/unstorage-adapter` | Unstorage |
| Upstash Redis | `@auth/upstash-redis-adapter` | Upstash Redis |
| Xata | `@auth/xata-adapter` | Xata |

> **Tip** – Choose the adapter that best matches your existing data stack.

---

## 7. Contributing & Support

- **GitHub** – [Auth.js Repository](https://github.com/authjs/authjs)
- **Issues** – Report bugs or request features on GitHub.
- **Community** – Join the Discord community for real‑time help.

---

### License

Auth.js is open source under the MIT license. See the repository for details.

---