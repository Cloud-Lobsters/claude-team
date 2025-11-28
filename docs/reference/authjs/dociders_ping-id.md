# PingId Provider – Auth.js

The **PingId** provider allows you to add Ping Identity OpenID Connect (OIDC) authentication to your Auth.js application.

> **Note**  
> Auth.js follows the OIDC specification strictly. If you encounter a provider‑specific issue that violates the spec, please open an issue in the repository. Non‑compliant behavior may not be addressed.

---

## Type Definitions

```ts
/**
 * The user profile returned by Ping Identity.
 * Extends a generic record and is indexable.
 */
export interface PingProfile extends Record<string, any> {
  /** Authentication Context Class Reference */
  acr: string;

  /** Authentication Methods References */
  amr: string[];

  /** Access Token hash */
  at_hash: string;

  /** Audience */
  aud: string;

  /** Authentication time (Unix timestamp) */
  auth_time: number;

  /** User email */
  email: string;

  /** Environment */
  env: string;

  /** Expiration time (Unix timestamp) */
  exp: number;

  /** Family name */
  family_name: string;

  /** Given name */
  given_name: string;

  /** Issued at (Unix timestamp) */
  iat: number;

  /** Issuer */
  iss: string;

  /** Full name */
  name: string;

  /** Organization */
  org: string;

  /** Region (custom claim) */
  "p1.region": string;

  /** Profile picture URL */
  picture: string;

  /** Preferred username */
  preferred_username: string;

  /** Session ID */
  sid: string;

  /** Subject (user ID) */
  sub: string;

  /** Updated at (Unix timestamp) */
  updated_at: number;
}
```

---

## Default Configuration

```ts
/**
 * Returns the default OIDC configuration for PingId.
 *
 * @param options - Custom configuration options.
 * @returns OIDCConfig<PingProfile>
 */
export function default(options: OIDCUserConfig<PingProfile>): OIDCConfig<PingProfile>;
```

---

## Usage Example

```ts
import PingId from "@auth/core/providers/ping-id";

export const authOptions = {
  providers: [
    PingId({
      clientId: process.env.AUTH_PING_ID_ID!,
      clientSecret: process.env.AUTH_PING_ID_SECRET!,
      issuer: process.env.PING_ID_ISSUER!,
    }),
  ],
};
```

> Replace the environment variables with your actual Ping Identity credentials.

---

## Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `options` | `OIDCUserConfig<PingProfile>` | Custom configuration options for the provider. |

---

## Returns

| Type | Description |
|------|-------------|
| `OIDCConfig<PingProfile>` | The fully‑configured OIDC provider instance. |

---

## Additional Resources

- **Create App in Ping Identity** – Follow the official Ping Identity guide to register your application and obtain the `clientId`, `clientSecret`, and `issuer` values.
- **Auth.js Documentation** – [https://authjs.dev](https://authjs.dev)
- **GitHub Repository** – [https://github.com/authjs/authjs](https://github.com/authjs/authjs)

---

## Reporting Issues

If you discover a bug or a spec‑non‑compliant behavior, open an issue in the Auth.js GitHub repository. For discussion or help, join the Auth.js Discord community.

---