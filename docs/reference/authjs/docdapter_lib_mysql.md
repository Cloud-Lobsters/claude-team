# @auth/drizzle‑adapter – MySQL Types & API

This document describes the **MySQL** side of the `@auth/drizzle-adapter` package.  
It contains:

* The default table schemas that the adapter expects.
* The helper functions that let you override or extend those schemas.
* The `MySqlDrizzleAdapter` factory that creates an Auth.js adapter.

> **Tip** – All type names are exported from `@auth/drizzle-adapter/lib/mysql`.  
> Import them directly in your project:

```ts
import {
  DefaultMySqlAccountsTable,
  DefaultMySqlAuthenticatorTable,
  DefaultMySqlSessionsTable,
  DefaultMySqlUsersTable,
  DefaultMySqlVerificationTokenTable,
  DefaultMySqlSchema,
  defineTables,
  MySqlDrizzleAdapter,
} from '@auth/drizzle-adapter/lib/mysql';
```

---

## 1. Default Table Schemas

The adapter ships with a set of **default table definitions** that match the shape expected by Auth.js.  
Each table is a `MySqlTableWithColumns<…>` type that describes the column names, types, and constraints.

> **Note** – The `DefaultMySql…` types are *read‑only* and should be used as a base.  
> If you need custom column names or additional columns, use `defineTables()` to override them.

### 1.1 `DefaultMySqlAccountsTable`

```ts
type DefaultMySqlAccountsTable = MySqlTableWithColumns<{
  columns: {
    access_token: DefaultMyqlColumn<{
      columnType: "MySqlVarChar" | "MySqlText";
      data: string;
      dataType: "string";
      driverParam: string | number;
      notNull: boolean;
    }>;
    expires_at: DefaultMyqlColumn<{
      columnType: "MySqlInt";
      data: number;
      dataType: "number";
      notNull: boolean;
    }>;
    id_token: DefaultMyqlColumn<{
      columnType: "MySqlVarChar" | "MySqlText";
      data: string;
      dataType: "string";
      notNull: boolean;
    }>;
    provider: DefaultMyqlColumn<{
      columnType: "MySqlVarChar" | "MySqlText";
      data: string;
      dataType: "string";
      notNull: true;
    }>;
    providerAccountId: DefaultMyqlColumn<{
      columnType: "MySqlVarChar" | "MySqlText";
      data: string;
      dataType: "string";
      notNull: true;
    }>;
    refresh_token: DefaultMyqlColumn<{
      columnType: "MySqlVarChar" | "MySqlText";
      data: string;
      dataType: "string";
      notNull: boolean;
    }>;
    scope: DefaultMyqlColumn<{
      columnType: "MySqlVarChar" | "MySqlText";
      data: string;
      dataType: "string";
      notNull: boolean;
    }>;
    session_state: DefaultMyqlColumn<{
      columnType: "MySqlVarChar" | "MySqlText";
      data: string;
      dataType: "string";
      notNull: boolean;
    }>;
    token_type: DefaultMyqlColumn<{
      columnType: "MySqlVarChar" | "MySqlText";
      data: string;
      dataType: "string";
      notNull: boolean;
    }>;
    type: DefaultMyqlColumn<{
      columnType: "MySqlVarChar" | "MySqlText";
      data: string;
      dataType: "string";
      notNull: true;
    }>;
    userId: DefaultMyqlColumn<{
      columnType: "MySqlVarChar" | "MySqlText";
      data: string;
      dataType: "string";
      notNull: true;
    }>;
  };
  dialect: "mysql";
  name: string;
  schema: string | undefined;
}>;
```

### 1.2 `DefaultMySqlAuthenticatorTable`

```ts
type DefaultMySqlAuthenticatorTable = MySqlTableWithColumns<{
  columns: {
    counter: DefaultMyqlColumn<{
      columnType: "MySqlInt";
      data: number;
      dataType: "number";
      notNull: true;
    }>;
    credentialBackedUp: DefaultMyqlColumn<{
      columnType: "MySqlBoolean";
      data: boolean;
      dataType: "boolean";
      notNull: true;
    }>;
    credentialDeviceType: DefaultMyqlColumn<{
      columnType: "MySqlVarChar" | "MySqlText";
      data: string;
      dataType: "string";
      notNull: true;
    }>;
    credentialID: DefaultMyqlColumn<{
      columnType: "MySqlVarChar" | "MySqlText";
      data: string;
      dataType: "string";
      notNull: true;
    }>;
    credentialPublicKey: DefaultMyqlColumn<{
      columnType: "MySqlVarChar" | "MySqlText";
      data: string;
      dataType: "string";
      notNull: true;
    }>;
    providerAccountId: DefaultMyqlColumn<{
      columnType: "MySqlVarChar" | "MySqlText";
      data: string;
      dataType: "string";
      notNull: true;
    }>;
    transports: DefaultMyqlColumn<{
      columnType: "MySqlVarChar" | "MySqlText";
      data: string;
      dataType: "string";
      notNull: false;
    }>;
    userId: DefaultMyqlColumn<{
      columnType: "MySqlVarChar" | "MySqlText";
      data: string;
      dataType: "string";
      notNull: true;
    }>;
  };
  dialect: "mysql";
  name: string;
  schema: string | undefined;
}>;
```

### 1.3 `DefaultMySqlSessionsTable`

```ts
type DefaultMySqlSessionsTable = MySqlTableWithColumns<{
  columns: {
    expires: DefaultMyqlColumn<{
      columnType: "MySqlTimestamp";
      data: Date;
      dataType: "date";
      notNull: true;
    }>;
    sessionToken: DefaultMyqlColumn<{
      columnType: "MySqlVarChar" | "MySqlText";
      data: string;
      dataType: "string";
      isPrimaryKey: true;
      notNull: true;
    }>;
    userId: DefaultMyqlColumn<{
      columnType: "MySqlVarChar" | "MySqlText";
      data: string;
      dataType: "string";
      notNull: true;
    }>;
  };
  dialect: "mysql";
  name: string;
  schema: string | undefined;
}>;
```

### 1.4 `DefaultMySqlUsersTable`

```ts
type DefaultMySqlUsersTable = MySqlTableWithColumns<{
  columns: {
    email: DefaultMyqlColumn<{
      columnType: "MySqlVarChar" | "MySqlText";
      data: string;
      dataType: "string";
      notNull: boolean;
    }>;
    emailVerified: DefaultMyqlColumn<{
      columnType: "MySqlTimestamp";
      data: Date;
      dataType: "date";
      notNull: boolean;
    }>;
    id: DefaultMyqlColumn<{
      columnType: "MySqlVarChar" | "MySqlText";
      data: string;
      dataType: "string";
      isPrimaryKey: true;
      notNull: true;
    }>;
    image: DefaultMyqlColumn<{
      columnType: "MySqlVarChar" | "MySqlText";
      data: string;
      dataType: "string";
      notNull: boolean;
    }>;
    name: DefaultMyqlColumn<{
      columnType: "MySqlVarChar" | "MySqlText";
      data: string;
      dataType: "string";
      notNull: boolean;
    }>;
  };
  dialect: "mysql";
  name: string;
  schema: string | undefined;
}>;
```

### 1.5 `DefaultMySqlVerificationTokenTable`

```ts
type DefaultMySqlVerificationTokenTable = MySqlTableWithColumns<{
  columns: {
    expires: DefaultMyqlColumn<{
      columnType: "MySqlTimestamp";
      data: Date;
      dataType: "date";
      notNull: true;
    }>;
    identifier: DefaultMyqlColumn<{
      columnType: "MySqlVarChar" | "MySqlText";
      data: string;
      dataType: "string";
      notNull: true;
    }>;
    token: DefaultMyqlColumn<{
      columnType: "MySqlVarChar" | "MySqlText";
      data: string;
      dataType: "string";
      notNull: true;
    }>;
  };
  dialect: "mysql";
  name: string;
  schema: string | undefined;
}>;
```

### 1.6 `DefaultMySqlSchema`

```ts
type DefaultMySqlSchema = {
  accountsTable: DefaultMySqlAccountsTable;
  authenticatorsTable: DefaultMySqlAuthenticatorTable;
  sessionsTable: DefaultMySqlSessionsTable;
  usersTable: DefaultMySqlUsersTable;
  verificationTokensTable: DefaultMySqlVerificationTokenTable;
};
```

---

## 2. Customising the Schema

If your database uses different table names or column names, you can override the defaults with `defineTables()`.

```ts
import { defineTables, DefaultMySqlSchema } from '@auth/drizzle-adapter/lib/mysql';

const customSchema: Partial<DefaultMySqlSchema> = {
  accountsTable: myAccountsTable,          // your own table definition
  usersTable: myUsersTable,                // required
  // other tables are optional – the adapter will fall back to defaults
};

const schema = defineTables(customSchema);
// `schema` is now a fully‑typed `DefaultMySqlSchema`
```

`defineTables()` returns a **required** `DefaultMySqlSchema`, so you must provide at least the `usersTable`.  
All other tables are optional; if omitted, the adapter will use the built‑in defaults.

---

## 3. Creating the Adapter

```ts
import { MySqlDrizzleAdapter } from '@auth/drizzle-adapter/lib/mysql';
import { drizzle } from 'drizzle-orm/mysql-core';
import { mysql } from 'drizzle-orm/mysql-core';

const db = drizzle(mysql(/* connection config */));

const adapter = MySqlDrizzleAdapter(db, schema);
// `adapter` implements Auth.js's `Adapter` interface
```

### Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `client` | `MySqlDatabase<MySqlQueryResultHKT, PreparedQueryHKTBase, any>` | The Drizzle MySQL client instance. |
| `schema?` | `DefaultMySqlSchema` | Optional custom schema. If omitted, the adapter uses the default tables. |

### Returns

`Adapter` – an object that implements the Auth.js adapter contract (e.g. `createUser`, `getUser`, `linkAccount`, etc.).

---

## 4. Quick Example

```ts
import { drizzle } from 'drizzle-orm/mysql-core';
import { mysql } from 'drizzle-orm/mysql-core';
import {
  MySqlDrizzleAdapter,
  defineTables,
  DefaultMySqlSchema,
} from '@auth/drizzle-adapter/lib/mysql';

// 1. Create a Drizzle client
const db = drizzle(mysql({
  host: 'localhost',
  user: 'root',
  password: 'secret',
  database: 'auth',
}));

// 2. (Optional) Override the default schema
const customSchema: Partial<DefaultMySqlSchema> = {
  usersTable: myUsersTable, // your own table definition
};
const schema = defineTables(customSchema);

// 3. Build the adapter
const adapter = MySqlDrizzleAdapter(db, schema);

// 4. Pass the adapter to Auth.js
import NextAuth from 'next-auth';
export default NextAuth({
  adapter,
  // ...other config
});
```

---

## 5. Summary

* **Default tables** – `DefaultMySqlAccountsTable`, `DefaultMySqlAuthenticatorTable`, `DefaultMySqlSessionsTable`, `DefaultMySqlUsersTable`, `DefaultMySqlVerificationTokenTable`.
* **Schema helper** – `defineTables()` lets you override any of the defaults.
* **Adapter factory** – `MySqlDrizzleAdapter(client, schema?)` returns a fully‑typed Auth.js adapter.

Feel free to extend or rename columns as needed; just make sure the resulting schema still satisfies the Auth.js contract. Happy coding!