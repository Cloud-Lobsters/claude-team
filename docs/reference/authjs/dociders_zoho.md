# Zoho Provider – Auth.js

The Zoho provider allows you to add Zoho OAuth 2.0 authentication to your Auth.js application.

> **Note**  
> Auth.js assumes that the Zoho provider follows the OAuth 2 specification.  
> If you encounter a bug in the default configuration, open an issue on GitHub.

---

## `default()` – Provider Factory

```ts
import { default as ZOHO } from "@auth/core/providers/zoho";

const provider = ZOHO({
  clientId: ZOHO_CLIENT_ID,
  clientSecret: ZOHO_CLIENT_SECRET,
});
```

`default()` returns an `OAuthConfig<Record<string, any>>` that can be passed to `Auth()`.

---

## Setup

### Callback URL

```
https://example.com/api/auth/callback/zoho
```

Add this URL to your Zoho application’s OAuth settings.

### Configuration Example

```ts
import { Auth } from "@auth/core";
import ZOHO from "@auth/core/providers/zoho";

const request = new Request(origin);

const response = await Auth(request, {
  providers: [
    ZOHO({
      clientId: ZOHO_CLIENT_ID,
      clientSecret: ZOHO_CLIENT_SECRET,
    }),
  ],
});
```

---

## Resources

- [Zoho OAuth 2.0 Integration Guide](https://www.zoho.com/oauth/)
- [Zoho API Console](https://api-console.zoho.com/)

---

## Notes

- The provider comes with a default configuration.  
  To override defaults, refer to the guide on [customizing a built‑in OAuth provider](#).

---

## Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `config` | `OAuthUserConfig<Record<string, any>>` | Configuration object for the provider. |

---

## Returns

`OAuthConfig<Record<string, any>>`

---

## Customizing the Provider

If you need to change scopes, endpoints, or other defaults, pass a configuration object to `ZOHO()`:

```ts
ZOHO({
  clientId: "...",
  clientSecret: "...",
  // Override default scopes
  scope: "ZohoCRM.modules.ALL",
  // Override authorization URL
  authorization: "https://accounts.zoho.com/oauth/v2/auth",
  // Override token URL
  token: "https://accounts.zoho.com/oauth/v2/token",
});
```

---

## Related Providers

- [Zoho](#) – This provider
- [Other OAuth providers](../#providers)

---

## License

Auth.js © Balázs Orbán and Team – 2025

---