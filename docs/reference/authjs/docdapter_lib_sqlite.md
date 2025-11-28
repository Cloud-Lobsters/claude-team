# @auth/drizzle-adapter – SQLite

This module provides a **Drizzle**‑based adapter for Auth.js that works with SQLite.  
It ships with a set of default table definitions that match the Auth.js schema, and
utility helpers to create or override those tables.

> **NOTE**  
> The code snippets below are taken directly from the source.  
> They are meant to illustrate the public API and the shape of the default tables.

---

## 1. Default Table Types

All default tables are exported as TypeScript types.  
They are generic `SQLiteTableWithColumns` objects that describe the columns, their
SQLite types, and constraints.

| Table | Type |
|-------|------|
| `DefaultSQLiteAccountsTable` | `SQLiteTableWithColumns<…>` |
| `DefaultSQLiteAuthenticatorTable` | `SQLiteTableWithColumns<…>` |
| `DefaultSQLiteSessionsTable` | `SQLiteTableWithColumns<…>` |
| `DefaultSQLiteUsersTable` | `SQLiteTableWithColumns<…>` |
| `DefaultSQLiteVerificationTokenTable` | `SQLiteTableWithColumns<…>` |

### 1.1 `DefaultSQLiteAccountsTable`

```ts
type DefaultSQLiteAccountsTable = SQLiteTableWithColumns<{
  columns: {
    access_token: DefaultSQLiteColumn<{
      columnType: "SQLiteText";
      data: string;
      dataType: "string";
      notNull: boolean;
    }>;
    expires_at: DefaultSQLiteColumn<{
      columnType: "SQLiteInteger";
      data: number;
      dataType: "number";
      notNull: boolean;
    }>;
    id_token: DefaultSQLiteColumn<{
      columnType: "SQLiteText";
      data: string;
      dataType: "string";
      notNull: boolean;
    }>;
    provider: DefaultSQLiteColumn<{
      columnType: "SQLiteText";
      data: string;
      dataType: "string";
      notNull: true;
    }>;
    providerAccountId: DefaultSQLiteColumn<{
      columnType: "SQLiteText";
      data: string;
      dataType: "string";
      notNull: true;
    }>;
    refresh_token: DefaultSQLiteColumn<{
      columnType: "SQLiteText";
      data: string;
      dataType: "string";
      notNull: boolean;
    }>;
    scope: DefaultSQLiteColumn<{
      columnType: "SQLiteText";
      data: string;
      dataType: "string";
      notNull: boolean;
    }>;
    session_state: DefaultSQLiteColumn<{
      columnType: "SQLiteText";
      data: string;
      dataType: "string";
      notNull: boolean;
    }>;
    token_type: DefaultSQLiteColumn<{
      columnType: "SQLiteText";
      data: string;
      dataType: "string";
      notNull: boolean;
    }>;
    type: DefaultSQLiteColumn<{
      columnType: "SQLiteText";
      data: string;
      dataType: "string";
      notNull: true;
    }>;
    userId: DefaultSQLiteColumn<{
      columnType: "SQLiteText";
      data: string;
      dataType: "string";
      notNull: true;
    }>;
  };
  dialect: "sqlite";
  name: string;
  schema: string | undefined;
}>;
```

### 1.2 `DefaultSQLiteAuthenticatorTable`

```ts
type DefaultSQLiteAuthenticatorTable = SQLiteTableWithColumns<{
  columns: {
    counter: DefaultSQLiteColumn<{
      columnType: "SQLiteInteger";
      data: number;
      dataType: "number";
      notNull: true;
    }>;
    credentialBackedUp: DefaultSQLiteColumn<{
      columnType: "SQLiteBoolean";
      data: boolean;
      dataType: "boolean";
      notNull: true;
    }>;
    credentialDeviceType: DefaultSQLiteColumn<{
      columnType: "SQLiteText";
      data: string;
      dataType: "string";
      notNull: true;
    }>;
    credentialID: DefaultSQLiteColumn<{
      columnType: "SQLiteText";
      data: string;
      dataType: "string";
      notNull: true;
    }>;
    credentialPublicKey: DefaultSQLiteColumn<{
      columnType: "SQLiteText";
      data: string;
      dataType: "string";
      notNull: true;
    }>;
    providerAccountId: DefaultSQLiteColumn<{
      columnType: "SQLiteText";
      data: string;
      dataType: "string";
      notNull: true;
    }>;
    transports: DefaultSQLiteColumn<{
      columnType: "SQLiteText";
      data: string;
      dataType: "string";
      notNull: false;
    }>;
    userId: DefaultSQLiteColumn<{
      columnType: "SQLiteText";
      data: string;
      dataType: "string";
      notNull: true;
    }>;
  };
  dialect: "sqlite";
  name: string;
  schema: string | undefined;
}>;
```

### 1.3 `DefaultSQLiteSessionsTable`

```ts
type DefaultSQLiteSessionsTable = SQLiteTableWithColumns<{
  columns: {
    expires: DefaultSQLiteColumn<{
      columnType: "SQLiteTimestamp";
      data: Date;
      dataType: "date";
      notNull: true;
    }>;
    sessionToken: DefaultSQLiteColumn<{
      columnType: "SQLiteText";
      data: string;
      dataType: "string";
      isPrimaryKey: true;
      notNull: true;
    }>;
    userId: DefaultSQLiteColumn<{
      columnType: "SQLiteText";
      data: string;
      dataType: "string";
      notNull: true;
    }>;
  };
  dialect: "sqlite";
  name: string;
  schema: string | undefined;
}>;
```

### 1.4 `DefaultSQLiteUsersTable`

```ts
type DefaultSQLiteUsersTable = SQLiteTableWithColumns<{
  columns: {
    email: DefaultSQLiteColumn<{
      columnType: "SQLiteText";
      data: string;
      dataType: "string";
      notNull: boolean;
    }>;
    emailVerified: DefaultSQLiteColumn<{
      columnType: "SQLiteTimestamp";
      data: Date;
      dataType: "date";
      notNull: boolean;
    }>;
    id: DefaultSQLiteColumn<{
      columnType: "SQLiteText";
      data: string;
      dataType: "string";
      isPrimaryKey: true;
      notNull: true;
    }>;
    image: DefaultSQLiteColumn<{
      columnType: "SQLiteText";
      data: string;
      dataType: "string";
      notNull: boolean;
    }>;
    name: DefaultSQLiteColumn<{
      columnType: "SQLiteText";
      data: string;
      dataType: "string";
      notNull: boolean;
    }>;
  };
  dialect: "sqlite";
  name: string;
  schema: string | undefined;
}>;
```

### 1.5 `DefaultSQLiteVerificationTokenTable`

```ts
type DefaultSQLiteVerificationTokenTable = SQLiteTableWithColumns<{
  columns: {
    expires: DefaultSQLiteColumn<{
      columnType: "SQLiteTimestamp";
      data: Date;
      dataType: "date";
      notNull: true;
    }>;
    identifier: DefaultSQLiteColumn<{
      columnType: "SQLiteText";
      data: string;
      dataType: "string";
      notNull: true;
    }>;
    token: DefaultSQLiteColumn<{
      columnType: "SQLiteText";
      data: string;
      dataType: "string";
      notNull: true;
    }>;
  };
  dialect: "sqlite";
  name: string;
  schema: string | undefined;
}>;
```

---

## 2. `DefaultSQLiteSchema`

A convenience type that bundles all default tables together.

```ts
type DefaultSQLiteSchema = {
  accountsTable: DefaultSQLiteAccountsTable;
  authenticatorsTable: DefaultSQLiteAuthenticatorTable;
  sessionsTable: DefaultSQLiteSessionsTable;
  usersTable: DefaultSQLiteUsersTable;
  verificationTokensTable: DefaultSQLiteVerificationTokenTable;
};
```

---

## 3. `defineTables`

`defineTables` is a helper that accepts a partial schema and returns a fully
typed schema with all required tables.  
It is useful when you want to override only a subset of the default tables.

```ts
/**
 * Define a SQLite schema for Auth.js.
 *
 * @param schema - Partial schema to override defaults.
 * @returns A fully populated schema with all required tables.
 */
function defineTables(
  schema: Partial<DefaultSQLiteSchema>
): Required<DefaultSQLiteSchema> {
  // Implementation omitted – the function merges the supplied schema
  // with the defaults and returns the result.
}
```

### Example

```ts
import { defineTables } from "@auth/drizzle-adapter";
import { sqliteTable, text, integer, timestamp } from "drizzle-orm/sqlite-core";

const customUsersTable = sqliteTable("users", {
  id: text("id").primaryKey(),
  email: text("email").notNull(),
  // ... other columns
});

const schema = defineTables({
  usersTable: customUsersTable,
});

export default schema;
```

---

## 4. `SQLiteDrizzleAdapter`

The main entry point for creating an Auth.js adapter that talks to SQLite via
Drizzle.

```ts
/**
 * Create a Drizzle adapter for Auth.js.
 *
 * @param client - A Drizzle SQLite database instance.
 * @param schema - Optional custom schema. If omitted, the default schema is used.
 * @returns An Auth.js adapter instance.
 */
function SQLiteDrizzleAdapter(
  client: BaseSQLiteDatabase<"sync" | "async", any, any>,
  schema?: DefaultSQLiteSchema
): Adapter {
  // Implementation omitted – the function wires the client and schema
  // into the Auth.js adapter interface.
}
```

### Example

```ts
import { drizzle } from "drizzle-orm/sqlite";
import sqlite3 from "sqlite3";
import { SQLiteDrizzleAdapter } from "@auth/drizzle-adapter";
import { defineTables } from "@auth/drizzle-adapter";

const db = drizzle(
  new sqlite3.Database("auth.db", sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE)
);

const schema = defineTables({}); // use defaults

const adapter = SQLiteDrizzleAdapter(db, schema);

// Pass `adapter` to Auth.js configuration
```

---

## 5. Summary

* **Default tables** – ready‑to‑use SQLite table definitions that match Auth.js.
* **`defineTables`** – merge custom tables with defaults.
* **`SQLiteDrizzleAdapter`** – create an Auth.js adapter that uses Drizzle and SQLite.

These utilities let you quickly spin up a fully functional Auth.js backend on
SQLite while still having the flexibility to customize the schema as needed.