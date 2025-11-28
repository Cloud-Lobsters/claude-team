## `DefaultSchema<Flavor>`

`DefaultSchema` is a utility type used by **@auth/drizzle‑adapter** to infer the default database schema that should be used for a given SQL flavor.  
It maps a concrete database type (`Flavor`) to the corresponding default schema type.

```ts
/**
 * Infer the default schema for a given SQL flavor.
 *
 * @template Flavor - The concrete database type (must extend `SqlFlavorOptions`).
 *
 * @returns
 *   - `DefaultMySqlSchema`   if `Flavor` is a MySQL database,
 *   - `DefaultPostgresSchema` if `Flavor` is a PostgreSQL database,
 *   - `DefaultSQLiteSchema`  if `Flavor` is a SQLite database,
 *   - `never`                otherwise.
 */
type DefaultSchema<Flavor> =
  Flavor extends AnyMySqlDatabase ? DefaultMySqlSchema :
  Flavor extends AnyPostgresDatabase ? DefaultPostgresSchema :
  Flavor extends AnySQLiteDatabase ? DefaultSQLiteSchema :
  never;
```

### Type Parameters

| Parameter | Description |
|-----------|-------------|
| `Flavor`  | Must extend `SqlFlavorOptions` (see below). |

### Supporting Types

```ts
/**
 * Union of all supported database flavors.
 */
type SqlFlavorOptions =
  | AnyPostgresDatabase
  | AnyMySqlDatabase
  | AnySQLiteDatabase;
```

> **Note**:  
> `AnyPostgresDatabase`, `AnyMySqlDatabase`, and `AnySQLiteDatabase` are exported from the `drizzle-orm` package and represent the generic types for each SQL flavor.

### Example Usage

```ts
import type { DefaultSchema } from '@auth/drizzle-adapter';
import type { MySqlDatabase } from 'drizzle-orm/mysql-core';
import type { DefaultMySqlSchema } from '@auth/drizzle-adapter';

// Infer the default schema for a MySQL database
type MySqlDefaultSchema = DefaultSchema<MySqlDatabase>;

// `MySqlDefaultSchema` is now `DefaultMySqlSchema`
```

If you pass a type that does not match any of the supported flavors, `DefaultSchema` resolves to `never`, which will trigger a TypeScript error when used in a context that expects a valid schema.

---

This type is part of the internal plumbing of **@auth/drizzle‑adapter** and is typically used by the adapter to automatically select the correct schema based on the database you provide.