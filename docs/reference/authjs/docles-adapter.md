# @auth/azure‑tables‑adapter

Official Azure Table Storage adapter for **Auth.js / NextAuth.js**.

> **Why use this adapter?**  
> Persist Auth.js data (accounts, sessions, users, etc.) in Azure Table Storage – a serverless, highly‑available key‑value store that scales automatically.

---

## Table of Contents

- [Installation](#installation)
- [Configuration – Keys](#configuration‑keys)
- [Type Declarations](#type-declarations)
- [Adapter API](#adapter-api)
  - [TableStorageAdapter(client)](#tablestorageadapterclient)
  - [withoutKeys(entity)](#withoutkeysentity)
- [Examples](#examples)
- [References](#references)

---

## Installation

```bash
# npm
npm install next-auth @auth/azure-tables-adapter

# pnpm
pnpm add next-auth @auth/azure-tables-adapter

# yarn
yarn add next-auth @auth/azure-tables-adapter

# bun
bun add next-auth @auth/azure-tables-adapter
```

---

## Configuration – Keys

The adapter uses a set of table names (keys) to store each data type.  
You can customize them, but the defaults are shown below.

```ts
const keys: {
  account: string;
  accountByUserId: string;
  session: string;
  sessionByUserId: string;
  user: string;
  userByEmail: string;
  verificationToken: string;
} = {
  account: "account",
  accountByUserId: "accountByUserId",
  session: "session",
  sessionByUserId: "sessionByUserId",
  user: "user",
  userByEmail: "userByEmail",
  verificationToken: "verificationToken",
};
```

---

## Type Declarations

```ts
// Default table names
export const account = "account";
export const accountByUserId = "accountByUserId";
export const session = "session";
export const sessionByUserId = "sessionByUserId";
export const user = "user";
export const userByEmail = "userByEmail";
export const verificationToken = "verificationToken";
```

---

## Adapter API

### `TableStorageAdapter(client)`

Creates an Auth.js adapter backed by Azure Table Storage.

| Parameter | Type | Description |
|-----------|------|-------------|
| `client` | `TableClient` | Azure Table Storage client instance. |

```ts
import { TableClient } from "@azure/data-tables";
import { TableStorageAdapter } from "@auth/azure-tables-adapter";

const client = new TableClient(
  "<ACCOUNT_URL>",
  "<TABLE_NAME>",
  "<AZURE_CREDENTIALS>"
);

const adapter = TableStorageAdapter(client);
```

### `withoutKeys<T>(entity)`

Utility to strip Azure Table Storage metadata (`etag`, `partitionKey`, `rowKey`, etc.) from an entity, returning only the user‑defined data.

| Type Parameter | Description |
|----------------|-------------|
| `T` | The shape of the entity payload. |

| Parameter | Type | Description |
|-----------|------|-------------|
| `entity` | `GetTableEntityResponse<TableEntityResult<T>>` | The raw Azure Table Storage entity. |

| Returns | Type |
|---------|------|
| `T` | The entity payload without Azure metadata. |

```ts
import { withoutKeys } from "@auth/azure-tables-adapter";

const rawEntity = await client.getEntity("user", "userId");
const user = withoutKeys(rawEntity); // { id: "userId", name: "Alice", ... }
```

---

## Examples

### 1. Basic Setup in NextAuth.js

```ts
import NextAuth from "next-auth";
import { TableStorageAdapter } from "@auth/azure-tables-adapter";
import { TableClient } from "@azure/data-tables";

const client = new TableClient(
  process.env.AZURE_TABLE_URL!,
  process.env.AZURE_TABLE_NAME!,
  process.env.AZURE_CREDENTIALS!
);

export default NextAuth({
  adapter: TableStorageAdapter(client),
  providers: [
    // your providers here
  ],
});
```

### 2. Custom Table Names

```ts
import { TableStorageAdapter, keys } from "@auth/azure-tables-adapter";

const customKeys = {
  ...keys,
  user: "myUsers",
  session: "mySessions",
};

const adapter = TableStorageAdapter(client, customKeys);
```

### 3. Using `withoutKeys` in a Custom Adapter

```ts
import { TableStorageAdapter, withoutKeys } from "@auth/azure-tables-adapter";

const adapter = TableStorageAdapter(client);

adapter.getUser = async (id) => {
  const raw = await client.getEntity("user", id);
  return withoutKeys(raw);
};
```

---

## References

- [Azure Table Storage SDK](https://learn.microsoft.com/en-us/javascript/api/overview/azure/data-tables-readme?view=azure-node-latest)
- [Auth.js Documentation](https://authjs.dev/)
- [NextAuth.js Documentation](https://next-auth.js.org/)

---

*© 2025 Auth.js – Balázs Orbán and Team*