# @auth/mikro-orm-adapter

Official MikroORM adapter for **Auth.js** / **NextAuth.js**.

---

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [API Reference](#api-reference)
  - [`MikroOrmAdapter()`](#mikroormadapter)
  - [`defaultEntities`](#defaultentities)
- [Entities](#entities)
- [Contributing](#contributing)

---

## Installation

```bash
# npm
npm install @mikro-orm/core @auth/mikro-orm-adapter

# pnpm
pnpm add @mikro-orm/core @auth/mikro-orm-adapter

# yarn
yarn add @mikro-orm/core @auth/mikro-orm-adapter

# bun
bun add @mikro-orm/core @auth/mikro-orm-adapter
```

---

## Usage

```ts
import { MikroOrmAdapter } from '@auth/mikro-orm-adapter';
import { MikroORM } from '@mikro-orm/core';

const orm = await MikroORM.init({
  // your MikroORM configuration
});

const adapter = MikroOrmAdapter(orm.em.fork());
```

> **Tip**  
> The adapter accepts an `EntityManager` instance.  
> If you need to customize the entities, pass them via the `options.entities` field.

---

## API Reference

### `MikroOrmAdapter<D>(ormOptions, options?)`

Creates an Auth.js adapter backed by MikroORM.

| Type Parameter | Default | Description |
|----------------|---------|-------------|
| `D` | `IDatabaseDriver<Connection>` | The database driver type used by MikroORM. |

| Parameter | Type | Description |
|-----------|------|-------------|
| `ormOptions` | `Options<D>` | MikroORM options object. |
| `options?` | `{ entities?: Partial<lib/entities>; }` | Optional overrides for the default entity set. |

| Return | Type |
|--------|------|
| `Adapter` | Auth.js adapter instance |

> **Example**  
> ```ts
> import { MikroOrmAdapter } from '@auth/mikro-orm-adapter';
> import { MikroORM } from '@mikro-orm/core';
> 
> const orm = await MikroORM.init({
>   // your MikroORM config
> });
> 
> const adapter = MikroOrmAdapter(orm.em.fork(), {
>   entities: {
>     // Override or add custom entities here
>   },
> });
> ```

---

### `defaultEntities`

Re‑exports the default entity set from `lib/entities`.  
You can import it to inspect or extend the default entities:

```ts
import { defaultEntities } from '@auth/mikro-orm-adapter';
```

---

## Entities

The adapter ships with a set of default entities that map to Auth.js tables:

- `User`
- `Account`
- `Session`
- `VerificationToken`

These are defined in `lib/entities` and can be overridden via the `options.entities` parameter.

---

## Contributing

Feel free to open issues or pull requests on the [GitHub repository](https://github.com/authjs/adapter-mikro-orm).  
All contributions are welcome!