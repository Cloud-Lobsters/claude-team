# Logto Provider – Auth.js

The Logto provider is a built‑in OAuth/OIDC provider for Auth.js.  
It follows the OpenID Connect specification and returns a user profile that
conforms to the `LogtoProfile` interface.

---

## `LogtoProfile`

The profile returned by the provider when the `profile` callback is invoked.

| Property          | Type      | Description |
|-------------------|-----------|-------------|
| `address`         | `string`  | The user’s address |
| `custom_data`     | `object`  | Custom fields |
| `email`           | `string`  | The user’s email |
| `email_verified`  | `boolean` | Whether the email is verified |
| `identities`      | `object`  | The linked identities of the user |
| `name`            | `string`  | The user’s name |
| `organization_data` | `object[]` | Organization data the user belongs to |
| `organization_roles` | `string[]` | Organization roles in the format `organization_id:/role_name` |
| `organizations`   | `string[]` | Organization IDs the user belongs to |
| `phone_number`    | `string`  | The user’s phone number |
| `phone_number_verified` | `boolean` | Whether the phone number is verified |
| `picture`         | `string`  | The user’s picture |
| `sso_identities`  | `object[]` | The linked SSO identities of the user |
| `sub`             | `string`  | The user’s unique ID |
| `username`        | `string`  | The user’s username |
| `[claim: string]` | `unknown` | Any additional claims |

---

## Setup

### Callback URL

```
https://example.com/api/auth/callback/logto
```

### Configuration

```ts
import { Auth } from "@auth/core";
import Logto from "@auth/core/providers/logto";

const request = new Request(origin);

const response = await Auth(request, {
  providers: [
    Logto({
      clientId: LOGTO_ID,
      clientSecret: LOGTO_SECRET,
      issuer: LOGTO_ISSUER,
    }),
  ],
});
```

> **Note**  
> The provider comes with a default configuration.  
> To override defaults, refer to the guide on customizing a built‑in OAuth provider.

---

## Resources

- [Logto Auth.js Quickstart](https://authjs.dev/docs/providers/logto) – Integrate Logto in your application

---

## Troubleshooting

- **Non‑compliance with OIDC spec** – Auth.js strictly follows the spec.  
  If you encounter a bug, open an issue. For spec deviations, we may not pursue a fix.

- **Need help** – Ask in the Auth.js Discussions or open an issue.

---

## API Reference

### `Logto(options: OIDCUserConfig<LogtoProfile>): OIDCConfig<LogtoProfile>`

| Parameter | Type | Description |
|-----------|------|-------------|
| `options` | `OIDCUserConfig<LogtoProfile>` | Configuration options for the Logto provider. |

Returns an `OIDCConfig<LogtoProfile>` object used by Auth.js.

---