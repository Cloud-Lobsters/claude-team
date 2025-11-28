# @auth/drizzle-adapter

Official Drizzle ORM adapter for Auth.js / NextAuth.js.

---

## Installation

```bash
# npm
npm install drizzle-orm @auth/drizzle-adapter

# pnpm
pnpm add drizzle-orm @auth/drizzle-adapter

# yarn
yarn add drizzle-orm @auth/drizzle-adapter

# bun
bun add drizzle-orm @auth/drizzle-adapter
```

> **Development dependency** – DrizzleKit is required for schema generation and migrations.

```bash
npm install drizzle-kit --save-dev
```

---

## Usage

```ts
import { DrizzleAdapter } from '@auth/drizzle-adapter';
import { drizzle } from 'drizzle-orm';
import { mysql2 } from 'drizzle-orm/mysql2';
import { schema } from './db/schema'; // your Drizzle schema

const db = drizzle(mysql2(/* connection config */), { schema });

export const authOptions = {
  adapter: DrizzleAdapter(db, schema),
  // ...other Auth.js options
};
```

---

## API Reference

### `DrizzleAdapter<SqlFlavor>(db, schema?)`

Creates an Auth.js adapter backed by a Drizzle ORM database.

| Parameter | Type | Description |
|-----------|------|-------------|
| `db` | `SqlFlavor` | A Drizzle ORM database instance. |
| `schema?` | `DefaultSchema<SqlFlavor>` | Optional schema definition. If omitted, the adapter will use the default schema for the given SQL flavor. |

#### Type Parameters

| Name | Extends | Description |
|------|---------|-------------|
| `SqlFlavor` | `SqlFlavorOptions` | The SQL dialect (e.g., MySQL, PostgreSQL, SQLite). |

#### Returns

`Adapter` – An Auth.js adapter instance that implements the required methods (`createUser`, `getUser`, `linkAccount`, etc.).

---

## Example: Using the Adapter with MySQL

```ts
import { DrizzleAdapter } from '@auth/drizzle-adapter';
import { drizzle } from 'drizzle-orm';
import { mysql2 } from 'drizzle-orm/mysql2';
import { schema } from './db/schema';

const db = drizzle(mysql2({
  host: 'localhost',
  user: 'root',
  password: 'password',
  database: 'auth',
}), { schema });

export const authOptions = {
  adapter: DrizzleAdapter(db, schema),
  // other options...
};
```

---

## Related Adapters

- `@auth/prisma-adapter`
- `@auth/azure-tables-adapter`
- `@auth/dynamodb-adapter`
- `@auth/firebase-adapter`
- `@auth/supabase-adapter`
- …and many more.

---

## Contributing

See the [Auth.js GitHub repository](https://github.com/authjs/authjs) for contribution guidelines.

---