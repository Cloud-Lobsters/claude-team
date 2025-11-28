# Auth.js – JWT & Token Utilities

> **⚠️ Deprecated**  
> In NextAuth.js v5 or newer, server‑side authentication is recommended.  
> See the migration guide: <https://authjs.dev/getting-started/migrating-to-v5#authenticating-server-side>

---

## 1. Core Types

| Type | Extends | Description |
|------|---------|-------------|
| **`DefaultJWT`** | `Record<string, unknown>` | Base JWT payload used by Auth.js. |
| **`JWT`** | `DefaultJWT` | Payload returned by the `jwt` callback when using JWT sessions. |
| **`JWTDecodeParams`** | – | Parameters for decoding a JWT. |
| **`JWTEncodeParams<Payload>`** | – | Parameters for encoding a JWT. |
| **`JWTOptions`** | – | Custom encode/decode functions and options. |
| **`GetTokenParams<R>`** | – | Parameters for retrieving a JWT from a request. |

---

## 2. `DefaultJWT`

```ts
interface DefaultJWT extends Record<string, unknown> {
  email?: null | string;
  exp?: number;
  iat?: number;
  jti?: string;
  name?: null | string;
  picture?: null | string;
  sub?: string;
}
```

---

## 3. `JWT`

```ts
interface JWT extends DefaultJWT {
  // No additional properties – inherits everything from DefaultJWT
}
```

---

## 4. `JWTDecodeParams`

```ts
interface JWTDecodeParams {
  salt: string;                     // Used with `secret` to derive the encryption key
  secret: string | string[];        // Secret(s) used for decryption
  token?: string;                   // JWT string to decode
}
```

> **Note**  
> Pass an array of secrets to rotate keys without invalidating existing sessions.  
> The newest secret should be first; it will be used for new tokens.

---

## 5. `JWTEncodeParams<Payload>`

```ts
interface JWTEncodeParams<Payload = JWT> {
  maxAge?: number;                  // Max age in seconds (default: 30 days)
  salt: string;                     // Used with `secret` to derive the encryption key
  secret: string | string[];        // Secret(s) used for encryption
  token?: Payload;                  // Payload to encode
}
```

---

## 6. `JWTOptions`

```ts
interface JWTOptions {
  maxAge?: number;                  // Max age in seconds (default: 30 days)

  decode: (params: JWTDecodeParams) => Awaitable<null | JWT>;
  encode: (params: JWTEncodeParams) => Awaitable<string>;
}
```

---

## 7. `GetTokenParams<R>`

```ts
interface GetTokenParams<R extends boolean = false> extends GetTokenParamsBase {
  cookieName?: string;              // Name of the cookie to look for
  decode?: (params: JWTDecodeParams) => Awaitable<null | JWT>;
  logger?: LoggerInstance | Console;
  raw?: R;                          // If true, return the raw JWT string
  req: Request | { headers: Headers | Record<string, string> }; // Request containing the JWT
  salt?: string;                    // Optional salt
  secret?: string | string[];       // Optional secret(s)
  secureCookie?: boolean;           // Use secure prefix for cookie name
}
```

---

## 8. Core Functions

### `decode<Payload>(params: JWTDecodeParams): Promise<null | Payload>`

Decodes an Auth.js‑issued JWT.

```ts
async function decode<Payload = JWT>(params: JWTDecodeParams): Promise<null | Payload> {
  // Implementation …
}
```

### `encode<Payload>(params: JWTEncodeParams<Payload>): Promise<string>`

Issues a JWT. By default, the JWT is encrypted using “A256CBC‑HS512”.

```ts
async function encode<Payload = JWT>(params: JWTEncodeParams<Payload>): Promise<string> {
  // Implementation …
}
```

### `getToken<R extends boolean = false>(params: GetTokenParams<R>): Promise<R extends true ? string : null | JWT>`

Retrieves the JWT from a request (cookie or `Authorization` header).

```ts
async function getToken<R extends boolean = false>(params: GetTokenParams<R>): Promise<R extends true ? string : null | JWT> {
  // Implementation …
}
```

---

## 9. Usage Examples

### Decoding a JWT

```ts
import { decode } from '@auth/core/jwt';

const token = await decode({
  secret: process.env.NEXTAUTH_SECRET,
  salt: 'my-salt',
  token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
});
```

### Encoding a JWT

```ts
import { encode } from '@auth/core/jwt';

const jwt = await encode({
  secret: process.env.NEXTAUTH_SECRET,
  salt: 'my-salt',
  token: { sub: 'user-id', email: 'user@example.com' },
});
```

### Retrieving a JWT from a request

```ts
import { getToken } from '@auth/core/jwt';

const token = await getToken({
  req,
  secret: process.env.NEXTAUTH_SECRET,
  salt: 'my-salt',
  cookieName: 'next-auth.session-token',
});
```

---

## 10. Security

- **Secure Cookies** – Set `secureCookie: true` to prefix the cookie name with `__Secure-` unless the URL is `http://` or not set.
- **Secret Rotation** – Provide an array of secrets to rotate keys without invalidating existing sessions.

---

## 11. Further Reading

- [Auth.js Documentation](https://authjs.dev/)
- [NextAuth.js Migration Guide](https://authjs.dev/getting-started/migrating-to-v5)

---