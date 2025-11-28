# `@auth/core/providers/coinbase`

> Built‑in Coinbase OAuth integration for Auth.js.

---

## `default(options)`

```ts
import { Auth } from "@auth/core";
import Coinbase from "@auth/core/providers/coinbase";

const request = new Request(origin);
const response = await Auth(request, {
  providers: [
    Coinbase({
      clientId: COINBASE_CLIENT_ID,
      clientSecret: COINBASE_CLIENT_SECRET,
    }),
  ],
});
```

### Description

Adds Coinbase login to your application.  
The provider follows the OAuth 2 specification and returns a 2‑hour access token along with a refresh token.

### Setup

| Item | Value |
|------|-------|
| **Callback URL** | `https://example.com/api/auth/callback/coinbase` |

### Configuration

```ts
import Coinbase from "@auth/core/providers/coinbase";

Coinbase({
  clientId: "<YOUR_CLIENT_ID>",
  clientSecret: "<YOUR_CLIENT_SECRET>",
  // ...any additional overrides
});
```

### Parameters

| Name   | Type | Description |
|--------|------|-------------|
| `options` | `OAuthUserConfig<Record<string, any>>` | Custom configuration for the provider. |

### Returns

`OAuthConfig<Record<string, any>>` – the configured provider instance.

### Notes

- The provider returns a 2‑hour access token and a refresh token.
- By default, Auth.js assumes the Coinbase provider follows OAuth 2.
- To override default settings, refer to the guide on customizing built‑in OAuth providers.

### Resources

- [Coinbase OAuth Documentation](https://developer.coinbase.com/oauth)

### Disclaimer

Auth.js strictly adheres to the OAuth 2 specification. If you encounter a bug in the default configuration, open an issue. For non‑compliance with the spec, we may not pursue a resolution. Feel free to ask for help in Discussions.

---