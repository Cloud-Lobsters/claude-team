# Passage Provider – Auth.js

The Passage provider is a built‑in OAuth provider for Auth.js that follows the Open ID Connect specification.  
It exposes a `PassageProfile` type that contains the user information returned by Passage.

---

## `PassageProfile`

| Property | Type | Description |
|----------|------|-------------|
| `at_hash` | `string` |  |
| `aud` | `string[]` |  |
| `auth_time` | `number` |  |
| `azp` | `string` |  |
| `c_hash` | `string` |  |
| `client_id` | `string` |  |
| `email` | `string` | The user’s email address |
| `email_verified` | `boolean` | Whether the user has verified their email address |
| `exp` | `number` |  |
| `iat` | `number` |  |
| `iss` | `string` |  |
| `phone` | `string` | The user’s phone number |
| `phone_number_verified` | `boolean` | Whether the user has verified their phone number |
| `sub` | `string` | Unique identifier in Passage for the user |

---

## `default(config)`

```ts
function default(config): OAuthConfig<PassageProfile>
```

Creates a fully‑configured OAuth provider for Passage.  
You can override the defaults by passing a custom `config` object.

---

## Setup

### Callback URL

```
https://example.com/api/auth/callback/passage
```

### Configuration Example

```ts
import { Auth } from "@auth/core";
import Passage from "@auth/core/providers/passage";

const request = new Request(origin);

const response = await Auth(request, {
  providers: [
    Passage({
      clientId: PASSAGE_ID,
      clientSecret: PASSAGE_SECRET,
      issuer: PASSAGE_ISSUER,
    }),
  ],
});
```

> **Note**  
> By default, Auth.js assumes that the Passage provider follows the Open ID Connect specification.  
> If you need to customize the provider, refer to the guide on *Customizing a Built‑In OAuth Provider*.

---

## Resources

- [Passage OIDC Documentation](https://docs.passage.id/)

---

## Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `config` | `OAuthUserConfig<PassageProfile>` | Configuration options for the provider. |
| **Returns** | `OAuthConfig<PassageProfile>` | The configured provider instance. |

---

## Disclaimer

Auth.js strictly adheres to the Open ID Connect specification.  
If you encounter a bug in the default configuration, please open an issue.  
For non‑compliance with the spec, we may not pursue a resolution, but you can discuss it in the community.

---