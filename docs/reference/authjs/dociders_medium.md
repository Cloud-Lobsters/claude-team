# Medium Provider – Auth.js

The Medium provider allows you to add Medium OAuth authentication to your Auth.js application.

---

## Overview

- **Provider name**: `medium`
- **OAuth spec**: OAuth 2.0
- **Email**: Not returned by the Medium API

---

## Setup

### Callback URL

```
https://example.com/api/auth/callback/medium
```

> Replace `example.com` with your own domain.

---

## Configuration

```ts
import { Auth } from "@auth/core";
import Medium from "@auth/core/providers/medium";

const request = new Request(origin);

const response = await Auth(request, {
  providers: [
    Medium({
      clientId: MEDIUM_CLIENT_ID,
      clientSecret: MEDIUM_CLIENT_SECRET,
    }),
  ],
});
```

- `MEDIUM_CLIENT_ID` – Your Medium app’s client ID.
- `MEDIUM_CLIENT_SECRET` – Your Medium app’s client secret.

---

## Resources

- [Medium OAuth documentation](https://github.com/Medium/medium-api-docs)

---

## Notes

- The provider follows the standard OAuth 2.0 flow.
- **Email address is not returned** by the Medium API.
- If you need to customize the default configuration, refer to the guide on [customizing a built‑in OAuth provider](#).

---

## Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `config` | `OAuthUserConfig<Record<string, any>>` | Configuration object for the Medium provider. |

---

## Returns

`OAuthConfig<Record<string, any>>`

---

## Customizing the Provider

If you need to override any default settings (e.g., scopes, endpoints), pass the desired options to `Medium()`:

```ts
Medium({
  clientId: "...",
  clientSecret: "...",
  // Custom options
  authorization: {
    params: { scope: "user:read" },
  },
});
```

---

**Disclaimer**  
Auth.js strictly follows the OAuth 2.0 specification. If you encounter a bug in the default configuration, open an issue on GitHub. For non‑compliance with the spec, we may not pursue a resolution. Feel free to ask for help in Discussions.