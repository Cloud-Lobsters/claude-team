# Figma Provider – Auth.js

The **Figma** provider implements OAuth 2 for authenticating users via Figma.  
It is available as part of the `@auth/core` package.

---

## `default(options)`

```ts
import { default as Figma } from "@auth/core/providers/figma";
```

Creates an OAuth2 configuration for Figma.

### Parameters

| Name | Type | Description |
|------|------|-------------|
| `options` | `OAuthUserConfig<FigmaProfile>` | Optional configuration overrides. |

### Returns

`OAuth2Config<FigmaProfile>`

---

## Setup

### Callback URL

```
https://example.com/api/auth/callback/figma
```

### Configuration Example

```ts
import { Auth } from "@auth/core";
import Figma from "@auth/core/providers/figma";

const request = new Request(origin);

const response = await Auth(request, {
  providers: [
    Figma({
      clientId: process.env.AUTH_FIGMA_ID,
      clientSecret: process.env.AUTH_FIGMA_SECRET,
    }),
  ],
});
```

---

## Resources

- **OAuth 2 on Figma** – Official Figma OAuth documentation  
- **Scopes** – Default scopes are defined by Auth.js; you can customize them via the `options` parameter.

---

## Notes

- Auth.js assumes the Figma provider follows the OAuth 2 specification.  
- The provider comes with a default configuration. To override defaults, pass a custom `options` object to `default()`.  
- If you encounter a bug in the default configuration, open an issue on the repository.  
- Auth.js strictly adheres to the OAuth 2 spec and does not guarantee compliance with provider‑specific deviations.

---

## Example – Customizing Scopes

```ts
Figma({
  clientId: process.env.AUTH_FIGMA_ID,
  clientSecret: process.env.AUTH_FIGMA_SECRET,
  authorization: {
    params: {
      scope: "user:read files:read",
    },
  },
});
```

---

## Summary

- **Provider**: Figma (OAuth 2)  
- **Default callback**: `/api/auth/callback/figma`  
- **Configuration**: `clientId`, `clientSecret`, optional `authorization.params.scope`  
- **Return type**: `OAuth2Config<FigmaProfile>`

Feel free to customize the provider to fit your application's needs.