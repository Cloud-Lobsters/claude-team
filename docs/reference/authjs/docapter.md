# @auth/prisma-adapter

Official Prisma adapter for **Auth.js** / **NextAuth.js**.

---

## Installation

```bash
# npm
npm install @prisma/client @auth/prisma-adapter
npm install prisma --save-dev

# pnpm
pnpm add @prisma/client @auth/prisma-adapter
pnpm add -D prisma

# yarn
yarn add @prisma/client @auth/prisma-adapter
yarn add -D prisma

# bun
bun add @prisma/client @auth/prisma-adapter
bun add -D prisma
```

> **Prerequisites**  
> * A Prisma schema with the required Auth.js tables (`User`, `Account`, `Session`, `VerificationToken`).  
> * A running database that Prisma can connect to.

---

## Usage

```ts
import { PrismaAdapter } from '@auth/prisma-adapter';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const authOptions = {
  adapter: PrismaAdapter(prisma),
  // ...other Auth.js options
};
```

---

## API Reference

### `PrismaAdapter(prisma)`

Creates an Auth.js adapter that uses Prisma as the persistence layer.

| Parameter | Type | Description |
|-----------|------|-------------|
| `prisma` | `PrismaClient<PrismaClientOptions, never, DefaultArgs>`<br>or a dynamic client extension | The Prisma client instance that will be used to interact with the database. |

#### Returns

`Adapter` – an object that implements the Auth.js adapter interface.

---

## Example

```ts
import NextAuth from 'next-auth';
import { PrismaAdapter } from '@auth/prisma-adapter';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    // your providers here
  ],
  // other NextAuth options
});
```

---

## Notes

* The adapter expects the Prisma schema to contain the tables and fields defined by Auth.js.  
* If you need to customize the schema, refer to the Auth.js documentation for the required table structure.  
* The adapter works with any database supported by Prisma (PostgreSQL, MySQL, SQLite, SQL Server, etc.).

---