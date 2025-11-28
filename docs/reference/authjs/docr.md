# @auth/d1-adapter

An official Cloudflare D1 adapter for **Auth.js / NextAuth.js**.

> **⚠️ Warning**  
> This adapter is **not** developed or maintained by Cloudflare, and the D1 API is not yet stable.  
> The author will make an effort to keep this adapter up‑to‑date.  
> It is compatible with the D1 API as of **March 22 2023**.

---

## Installation

```bash
# npm
npm install next-auth @auth/d1-adapter

# pnpm
pnpm add next-auth @auth/d1-adapter

# yarn
yarn add next-auth @auth/d1-adapter

# bun
bun add next-auth @auth/d1-adapter
```

---

## Types

```ts
type D1Database = WorkerDatabase | MiniflareD1Database;
```

---

## API Reference

### `createRecord<RecordType>(db, CREATE_SQL, bindings, GET_SQL, getBindings)`

```ts
/**
 * Creates a record in the database.
 *
 * @template RecordType
 * @param {D1Database} db - The D1 database instance.
 * @param {string} CREATE_SQL - SQL statement to insert the record.
 * @param {any[]} bindings - Bindings for the CREATE_SQL.
 * @param {string} GET_SQL - SQL statement to retrieve the created record.
 * @param {any[]} getBindings - Bindings for the GET_SQL.
 * @returns {Promise<null | RecordType>} - The created record or null if not found.
 */
function createRecord<RecordType>(
  db: D1Database,
  CREATE_SQL: string,
  bindings: any[],
  GET_SQL: string,
  getBindings: any[]
): Promise<null | RecordType>;
```

---

### `D1Adapter(db)`

```ts
/**
 * Creates an Auth.js adapter backed by Cloudflare D1.
 *
 * @param {D1Database} db - The D1 database instance.
 * @returns {Adapter} - The Auth.js adapter.
 */
function D1Adapter(db: D1Database): Adapter;
```

---

### `deleteRecord(db, SQL, bindings)`

```ts
/**
 * Deletes a record from the database.
 *
 * @param {D1Database} db - The D1 database instance.
 * @param {string} SQL - SQL statement to delete the record.
 * @param {any[]} bindings - Bindings for the SQL.
 * @returns {Promise<void>}
 */
function deleteRecord(
  db: D1Database,
  SQL: string,
  bindings: any[]
): Promise<void>;
```

---

### `getRecord<RecordType>(db, SQL, bindings)`

```ts
/**
 * Retrieves a record from the database.
 *
 * @template RecordType
 * @param {D1Database} db - The D1 database instance.
 * @param {string} SQL - SQL statement to retrieve the record.
 * @param {any[]} bindings - Bindings for the SQL.
 * @returns {Promise<null | RecordType>} - The retrieved record or null if not found.
 */
function getRecord<RecordType>(
  db: D1Database,
  SQL: string,
  bindings: any[]
): Promise<null | RecordType>;
```

---

### `up(db)`

```ts
/**
 * Runs the migration to set up the necessary tables.
 *
 * @param {D1Database} db - The D1 database instance.
 * @returns {Promise<void>}
 */
function up(db: D1Database): Promise<void>;
```

---

### `updateRecord(db, SQL, bindings)`

```ts
/**
 * Updates a record in the database.
 *
 * @param {D1Database} db - The D1 database instance.
 * @param {string} SQL - SQL statement to update the record.
 * @param {any[]} bindings - Bindings for the SQL.
 * @returns {Promise<D1Result<unknown> | D1Result<unknown>>}
 */
function updateRecord(
  db: D1Database,
  SQL: string,
  bindings: any[]
): Promise<D1Result<unknown> | D1Result<unknown>>;
```

---

## Usage Example

```ts
import { D1Adapter, up } from '@auth/d1-adapter';
import { NextAuth } from 'next-auth';

// Obtain a D1 database instance (e.g., from a Cloudflare Worker environment)
const db: D1Database = /* your D1 database instance */;

// Create the required tables
await up(db);

export default NextAuth({
  adapter: D1Adapter(db),
  // ...other NextAuth configuration
});
```

---

**Note:** All function signatures above are kept verbatim from the original documentation to preserve the exact API contract.