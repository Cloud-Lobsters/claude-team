# Netlify Provider

> Built‑in Netlify integration for Auth.js.

---

## `default(config)`

```ts
function default(config: OAuthUserConfig<Record<string, any>>): OAuthConfig<Record<string, any>>
```

Adds Netlify login to your application.

### Setup

| Item | Value |
|------|-------|
| **Callback URL** | `https://example.com/api/auth/callback/netlify` |

### Configuration Example

```ts
import { Auth } from "@auth/core";
import Netlify from "@auth/core/providers/netlify";

const request = new Request(origin);

const response = await Auth(request, {
  providers: [
    Netlify({
      clientId: NETLIFY_CLIENT_ID,
      clientSecret: NETLIFY_CLIENT_SECRET,
    }),
  ],
});
```

### Resources

- [Netlify OAuth blog](https://example.com)
- [Netlify OAuth example](https://example.com)

### Notes

- Auth.js assumes the Netlify provider follows the OAuth 2 specification.
- The provider comes with a default configuration. To override defaults, see the guide on [customizing a built‑in OAuth provider](https://example.com).
- **Disclaimer**: If you discover a bug in the default configuration, open an issue. Auth.js strictly adheres to the spec and cannot be held responsible for provider deviations. Issues that are non‑compliant with the spec may not be pursued. For additional help, visit the Discussions.

### Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `config` | `OAuthUserConfig<Record<string, any>>` | Configuration object for the Netlify provider. |

### Returns

`OAuthConfig<Record<string, any>>`

---