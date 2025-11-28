# @auth/typeorm-adapter – Entity API Reference

This section documents the four core entity classes that the **@auth/typeorm-adapter** package exposes.  
Each entity is a plain TypeScript class that maps directly to a database table used by Auth.js.  
The documentation below follows the same structure as the original source, but is reformatted for clarity and readability.

> **Note**  
> All examples shown here are taken verbatim from the official documentation and are fully functional when used with the adapter.

---

## 1. `AccountEntity`

Represents a user’s external authentication provider account (e.g. Google, GitHub).

```ts
import { AccountEntity } from '@auth/typeorm-adapter';

const account = new AccountEntity();
```

### Constructor

```ts
new AccountEntity(): AccountEntity
```

### Properties

| Property          | Type                     | Description |
|-------------------|--------------------------|-------------|
| `access_token`    | `null | string`          | OAuth access token. |
| `expires_at`      | `null | number`          | Unix timestamp when the access token expires. |
| `id`              | `string`                 | Primary key. |
| `id_token`        | `null | string`          | OAuth ID token. |
| `provider`        | `string`                 | Name of the provider (e.g. `"google"`). |
| `providerAccountId` | `string`              | Provider‑specific account identifier. |
| `refresh_token`   | `null | string`          | OAuth refresh token. |
| `scope`           | `null | string`          | OAuth scopes granted. |
| `session_state`   | `null | string`          | Provider‑specific session state. |
| `token_type`      | `null | string`          | OAuth token type (e.g. `"Bearer"`). |
| `type`            | `string`                 | Account type (`"oauth"` or `"email"`). |
| `user`            | `UserEntity`             | Relation to the owning user. |
| `userId`          | `string`                 | Foreign key to `UserEntity.id`. |

---

## 2. `SessionEntity`

Represents a user session (i.e. a logged‑in session).

```ts
import { SessionEntity } from '@auth/typeorm-adapter';

const session = new SessionEntity();
```

### Constructor

```ts
new SessionEntity(): SessionEntity
```

### Properties

| Property      | Type          | Description |
|---------------|---------------|-------------|
| `expires`     | `string`      | ISO‑8601 timestamp when the session expires. |
| `id`          | `string`      | Primary key. |
| `sessionToken`| `string`      | Unique session token. |
| `user`        | `UserEntity`  | Relation to the owning user. |
| `userId`      | `string`      | Foreign key to `UserEntity.id`. |

---

## 3. `UserEntity`

Represents a user in the system.

```ts
import { UserEntity } from '@auth/typeorm-adapter';

const user = new UserEntity();
```

### Constructor

```ts
new UserEntity(): UserEntity
```

### Properties

| Property        | Type                 | Description |
|-----------------|----------------------|-------------|
| `accounts`      | `AccountEntity[]`    | All linked provider accounts. |
| `email`         | `null | string`      | User’s email address. |
| `emailVerified` | `null | string`      | ISO‑8601 timestamp of email verification. |
| `id`            | `string`             | Primary key. |
| `image`         | `null | string`      | URL to the user’s avatar. |
| `name`          | `null | string`      | User’s display name. |
| `sessions`      | `SessionEntity[]`    | All active sessions. |

---

## 4. `VerificationTokenEntity`

Represents a one‑time verification token (e.g. email verification, password reset).

```ts
import { VerificationTokenEntity } from '@auth/typeorm-adapter';

const token = new VerificationTokenEntity();
```

### Constructor

```ts
new VerificationTokenEntity(): VerificationTokenEntity
```

### Properties

| Property    | Type     | Description |
|-------------|----------|-------------|
| `expires`   | `string` | ISO‑8601 timestamp when the token expires. |
| `id`        | `string` | Primary key. |
| `identifier`| `string` | Identifier for the token (e.g. user email). |
| `token`     | `string` | The actual token value. |

---

## Usage Example

Below is a minimal example that demonstrates how to create and persist a user with an associated account and session using TypeORM.

```ts
import { createConnection } from 'typeorm';
import { UserEntity, AccountEntity, SessionEntity } from '@auth/typeorm-adapter';

async function bootstrap() {
  const connection = await createConnection({
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: 'postgres',
    database: 'auth',
    entities: [UserEntity, AccountEntity, SessionEntity],
    synchronize: true, // For demo purposes only
  });

  const user = new UserEntity();
  user.email = 'alice@example.com';
  user.name = 'Alice';

  const account = new AccountEntity();
  account.provider = 'google';
  account.providerAccountId = '1234567890';
  account.type = 'oauth';
  account.user = user;

  const session = new SessionEntity();
  session.sessionToken = 'random-session-token';
  session.expires = new Date(Date.now() + 1000 * 60 * 60 * 24).toISOString(); // 24h from now
  session.user = user;

  await connection.manager.save(user);
  await connection.manager.save(account);
  await connection.manager.save(session);

  console.log('User, account, and session created successfully!');
}

bootstrap().catch(console.error);
```

---

## Further Reading

- [Auth.js Overview](https://authjs.dev/)
- [NextAuth.js v4 Migration Guide](https://authjs.dev/migration)
- [TypeORM Documentation](https://typeorm.io/)

---