# @auth/drizzle-adapter – Postgres Types & API

This module provides type‑safe table definitions and a helper to create a
Postgres‑specific adapter for Auth.js using Drizzle ORM.

> **NOTE**  
> The code snippets below are taken directly from the source and are
> intended to be copy‑and‑paste ready.

---

## 1. Default Table Types

All tables are defined as `PgTableWithColumns<…>` objects.  
They expose the column names, types, and constraints that Auth.js expects.

### 1.1 `DefaultPostgresAccountsTable`

```ts
type DefaultPostgresAccountsTable = PgTableWithColumns<{
  columns: {
    access_token: DefaultPostgresColumn<{
      columnType: "PgVarchar" | "PgText";
      data: string;
      dataType: "string";
      notNull: boolean;
    }>;
    expires_at: DefaultPostgresColumn<{
      columnType: "PgInteger";
      data: number;
      dataType: "number";
      notNull: boolean;
    }>;
    id_token: DefaultPostgresColumn<{
      columnType: "PgVarchar" | "PgText";
      data: string;
      dataType: "string";
      notNull: boolean;
    }>;
    provider: DefaultPostgresColumn<{
      columnType: "PgVarchar" | "PgText";
      data: string;
      dataType: "string";
      notNull: true;
    }>;
    providerAccountId: DefaultPostgresColumn<{
      columnType: "PgVarchar" | "PgText";
      data: string;
      dataType: "string";
      notNull: true;
    }>;
    refresh_token: DefaultPostgresColumn<{
      columnType: "PgVarchar" | "PgText";
      data: string;
      dataType: "string";
      notNull: boolean;
    }>;
    scope: DefaultPostgresColumn<{
      columnType: "PgVarchar" | "PgText";
      data: string;
      dataType: "string";
      notNull: boolean;
    }>;
    session_state: DefaultPostgresColumn<{
      columnType: "PgVarchar" | "PgText";
      data: string;
      dataType: "string";
      notNull: boolean;
    }>;
    token_type: DefaultPostgresColumn<{
      columnType: "PgVarchar" | "PgText";
      data: string;
      dataType: "string";
      notNull: boolean;
    }>;
    type: DefaultPostgresColumn<{
      columnType: "PgVarchar" | "PgText";
      data: string;
      dataType: "string";
      notNull: true;
    }>;
    userId: DefaultPostgresColumn<{
      columnType: "PgVarchar" | "PgText" | "PgUUID";
      data: string;
      dataType: "string";
      notNull: true;
    }>;
  };
  dialect: "pg";
  name: string;
  schema: string | undefined;
}>;
```

### 1.2 `DefaultPostgresAuthenticatorTable`

```ts
type DefaultPostgresAuthenticatorTable = PgTableWithColumns<{
  columns: {
    counter: DefaultPostgresColumn<{
      columnType: "PgInteger";
      data: number;
      dataType: "number";
      notNull: true;
    }>;
    credentialBackedUp: DefaultPostgresColumn<{
      columnType: "PgBoolean";
      data: boolean;
      dataType: "boolean";
      notNull: true;
    }>;
    credentialDeviceType: DefaultPostgresColumn<{
      columnType: "PgVarchar" | "PgText";
      data: string;
      dataType: "string";
      notNull: true;
    }>;
    credentialID: DefaultPostgresColumn<{
      columnType: "PgVarchar" | "PgText";
      data: string;
      dataType: "string";
      notNull: true;
    }>;
    credentialPublicKey: DefaultPostgresColumn<{
      columnType: "PgVarchar" | "PgText";
      data: string;
      dataType: "string";
      notNull: true;
    }>;
    providerAccountId: DefaultPostgresColumn<{
      columnType: "PgVarchar" | "PgText";
      data: string;
      dataType: "string";
      notNull: true;
    }>;
    transports: DefaultPostgresColumn<{
      columnType: "PgVarchar" | "PgText";
      data: string;
      dataType: "string";
      notNull: false;
    }>;
    userId: DefaultPostgresColumn<{
      columnType: "PgVarchar" | "PgText" | "PgUUID";
      data: string;
      dataType: "string";
      notNull: true;
    }>;
  };
  dialect: "pg";
  name: string;
  schema: string | undefined;
}>;
```

### 1.3 `DefaultPostgresSessionsTable`

```ts
type DefaultPostgresSessionsTable = PgTableWithColumns<{
  columns: {
    expires: DefaultPostgresColumn<{
      columnType: "PgTimestamp";
      data: Date;
      dataType: "date";
      notNull: true;
    }>;
    sessionToken: DefaultPostgresColumn<{
      columnType: "PgVarchar" | "PgText";
      data: string;
      dataType: "string";
      isPrimaryKey: true;
      notNull: true;
    }>;
    userId: DefaultPostgresColumn<{
      columnType: "PgVarchar" | "PgText" | "PgUUID";
      data: string;
      dataType: "string";
      notNull: true;
    }>;
  };
  dialect: "pg";
  name: string;
  schema: string | undefined;
}>;
```

### 1.4 `DefaultPostgresUsersTable`

```ts
type DefaultPostgresUsersTable = PgTableWithColumns<{
  columns: {
    email: DefaultPostgresColumn<{
      columnType: "PgVarchar" | "PgText";
      data: string;
      dataType: "string";
      notNull: boolean;
    }>;
    emailVerified: DefaultPostgresColumn<{
      columnType: "PgTimestamp";
      data: Date;
      dataType: "date";
      notNull: boolean;
    }>;
    id: DefaultPostgresColumn<{
      columnType: "PgVarchar" | "PgText" | "PgUUID";
      data: string;
      dataType: "string";
      isPrimaryKey: true;
      notNull: true;
    }>;
    image: DefaultPostgresColumn<{
      columnType: "PgVarchar" | "PgText";
      data: string;
      dataType: "string";
      notNull: boolean;
    }>;
    name: DefaultPostgresColumn<{
      columnType: "PgVarchar" | "PgText";
      data: string;
      dataType: "string";
      notNull: boolean;
    }>;
  };
  dialect: "pg";
  name: string;
  schema: string | undefined;
}>;
```

### 1.5 `DefaultPostgresVerificationTokenTable`

```ts
type DefaultPostgresVerificationTokenTable = PgTableWithColumns<{
  columns: {
    expires: DefaultPostgresColumn<{
      columnType: "PgTimestamp";
      data: Date;
      dataType: "date";
      notNull: true;
    }>;
    identifier: DefaultPostgresColumn<{
      columnType: "PgVarchar" | "PgText";
      data: string;
      dataType: "string";
      notNull: true;
    }>;
    token: DefaultPostgresColumn<{
      columnType: "PgVarchar" | "PgText";
      data: string;
      dataType: "string";
      notNull: true;
    }>;
  };
  dialect: "pg";
  name: string;
  schema: string | undefined;
}>;
```

---

## 2. Schema Definition

`defineTables` is a helper that accepts a partial schema and returns a fully
typed schema object.

```ts
/**
 * Define a Postgres schema for Auth.js.
 *
 * @param schema Partial schema overrides.
 * @returns A fully populated schema object.
 */
function defineTables(
  schema: Partial<DefaultPostgresSchema>
): Required<DefaultPostgresSchema> {
  // Implementation omitted – the function simply merges defaults
  // with any user‑provided overrides.
}
```

### 2.1 `DefaultPostgresSchema`

```ts
type DefaultPostgresSchema = {
  accountsTable: DefaultPostgresAccountsTable;
  authenticatorsTable: DefaultPostgresAuthenticatorTable;
  sessionsTable: DefaultPostgresSessionsTable;
  usersTable: DefaultPostgresUsersTable;
  verificationTokensTable: DefaultPostgresVerificationTokenTable;
};
```

---

## 3. Adapter Factory

`PostgresDrizzleAdapter` creates an Auth.js adapter that works with a
Drizzle `PgDatabase` instance.

```ts
/**
 * Create a Postgres adapter for Auth.js using Drizzle.
 *
 * @param client  Drizzle Postgres database instance.
 * @param schema  Optional custom schema; defaults to `DefaultPostgresSchema`.
 * @returns An Auth.js adapter.
 */
function PostgresDrizzleAdapter(
  client: PgDatabase<PgQueryResultHKT, any>,
  schema?: DefaultPostgresSchema
): Adapter {
  // Implementation omitted – the function wires the database client
  // with the provided schema to satisfy Auth.js expectations.
}
```

---

## 4. Usage Example

```ts
import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import {
  defineTables,
  PostgresDrizzleAdapter,
} from "@auth/drizzle-adapter";
import { auth } from "@auth/core";

// 1. Create a Drizzle client
const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const db = drizzle(pool);

// 2. Define (or override) the schema
const schema = defineTables({
  // Example: rename the accounts table
  accountsTable: {
    ...db.table("custom_accounts"),
    // ...other column overrides if needed
  },
});

// 3. Create the adapter
const adapter = PostgresDrizzleAdapter(db, schema);

// 4. Initialize Auth.js
export const { getServerSession, handlers } = auth({
  adapter,
  // ...other Auth.js options
});
```

---

## 5. Summary

* **Types** – All required tables are fully typed for Drizzle ORM.
* **`defineTables`** – Merge defaults with custom overrides.
* **`PostgresDrizzleAdapter`** – Wire a Drizzle `PgDatabase` to Auth.js.

These utilities enable a type‑safe, schema‑aware integration of Auth.js with
PostgreSQL via Drizzle.