# @auth/neon-adapter

An official PostgreSQL adapter for **Auth.js / NextAuth.js**.

---

## Installation

```bash
# npm
npm install next-auth @auth/neon-adapter

# pnpm
pnpm add next-auth @auth/neon-adapter

# yarn
yarn add next-auth @auth/neon-adapter

# bun
bun add next-auth @auth/neon-adapter
```

---

## Usage

```ts
import { default as NeonAdapter } from '@auth/neon-adapter';
import { Pool } from 'pg';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

export const adapter = NeonAdapter(pool);
```

---

## API Reference

### `default(client: Pool): Adapter`

| Parameter | Type | Description |
|-----------|------|-------------|
| `client`  | `Pool` (from `pg`) | A PostgreSQL connection pool used by the adapter. |

**Returns**: An `Adapter` instance that can be passed to Auth.js / NextAuth.js.

---

## Related Adapters

- `@auth/pg-adapter`
- `@auth/prisma-adapter`
- `@auth/mongodb-adapter`
- `@auth/neo4j-adapter`
- `@auth/supabase-adapter`
- … (see the full list in the Auth.js documentation)

---

## Contributing

Contributions are welcome! Please refer to the [Auth.js GitHub repository](https://github.com/authjs/authjs) for guidelines.

---