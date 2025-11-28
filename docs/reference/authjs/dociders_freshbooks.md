# FreshBooks Provider – @auth/core

The FreshBooks provider allows you to add FreshBooks OAuth 2 authentication to your Auth.js application.

> **Note**  
> The provider follows the OAuth 2 specification. If you encounter a bug in the default configuration, open an issue on the repository. Auth.js does not guarantee compliance with any provider‑specific deviations from the spec.

---

## `default(options)`

```ts
import { Auth } from "@auth/core";
import FreshBooks from "@auth/core/providers/freshbooks";

const request = new Request(origin);
const response = await Auth(request, {
  providers: [
    FreshBooks({
      clientId: FRESHBOOKS_CLIENT_ID,
      clientSecret: FRESHBOOKS_CLIENT_SECRET,
    }),
  ],
});
```

### Setup

| Item | Value |
|------|-------|
| **Callback URL** | `https://example.com/api/auth/callback/freshbooks` |
| **Provider** | FreshBooks (OAuth 2) |

### Configuration

```ts
FreshBooks({
  clientId: string;          // Your FreshBooks client ID
  clientSecret: string;      // Your FreshBooks client secret
  // ...any additional OAuth options
});
```

### Resources

- [FreshBooks OAuth Documentation](https://developer.freshbooks.com/api/authentication/)

### Notes

- The provider comes with a default configuration.  
- To override defaults for your use case, refer to the guide on [customizing a built‑in OAuth provider](#).

### Parameters

| Name   | Type | Description |
|--------|------|-------------|
| `options` | `OAuthUserConfig<Record<string, any>>` | Configuration options for the FreshBooks OAuth provider. |

### Returns

`OAuthConfig<Record<string, any>>` – the configured OAuth provider ready to be used with Auth.js.

---

## Customizing the FreshBooks Provider

If you need to adjust scopes, endpoints, or any other OAuth settings, pass the desired options to `FreshBooks()`:

```ts
FreshBooks({
  clientId: FRESHBOOKS_CLIENT_ID,
  clientSecret: FRESHBOOKS_CLIENT_SECRET,
  authorization: {
    params: { scope: "accounting:read" },
  },
  // other customizations...
});
```

---

## Quick Reference

```ts
import { Auth } from "@auth/core";
import FreshBooks from "@auth/core/providers/freshbooks";

const authHandler = async (request: Request) => {
  return await Auth(request, {
    providers: [
      FreshBooks({
        clientId: process.env.FRESHBOOKS_CLIENT_ID!,
        clientSecret: process.env.FRESHBOOKS_CLIENT_SECRET!,
      }),
    ],
  });
};
```

Replace `process.env.FRESHBOOKS_CLIENT_ID` and `process.env.FRESHBOOKS_CLIENT_SECRET` with your actual FreshBooks credentials.

---

### Further Reading

- [Auth.js Documentation](https://authjs.dev/)
- [OAuth 2.0 Specification](https://datatracker.ietf.org/doc/html/rfc6749)

---