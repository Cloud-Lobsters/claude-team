# Reddit Provider – Auth.js

The **Reddit** provider allows you to add Reddit login to your application using Auth.js.  
Below is a concise, sanitized reference that keeps all examples and key information.

---

## Overview

- **Provider**: `@auth/core/providers/reddit`
- **OAuth 2.0** – uses the standard OAuth 2 flow.
- **Default scopes**: `identity`
- **Access token lifetime**: 1 hour (no refresh token by default)

---

## Setup

### Callback URL

```
https://example.com/api/auth/callback/reddit
```

> **Important**: Reddit only allows one callback URL per client ID/secret pair.

---

### Configuration

```ts
import { Auth } from "@auth/core";
import Reddit from "@auth/core/providers/reddit";

const request = new Request(origin);
const response = await Auth(request, {
  providers: [
    Reddit({
      clientId: REDDIT_CLIENT_ID,
      clientSecret: REDDIT_CLIENT_SECRET,
    }),
  ],
});
```

---

## Customizing the Provider

If you need a refresh token or additional scopes, adjust the `authorization` parameters:

```ts
Reddit({
  clientId: process.env.REDDIT_CLIENT_ID,
  clientSecret: process.env.REDDIT_CLIENT_SECRET,
  authorization: {
    params: {
      duration: "permanent",   // requests a refresh token
      scope: "identity read", // add any scopes you need
    },
  },
});
```

> **Note**: The default configuration only requests the `identity` scope and does **not** return a refresh token.

---

## Resources

- [Reddit API Documentation](https://www.reddit.com/dev/api/)
- [Reddit App Console](https://www.reddit.com/prefs/apps)

---

## Notes

- Auth.js assumes the Reddit provider follows the OAuth 2 specification.
- Reddit requires authorization on every login attempt.
- Only one callback URL is allowed per client ID/secret pair.
- The provider returns a one‑hour access token by default.

---

## API Reference

| Parameter | Type | Description |
|-----------|------|-------------|
| `config` | `OAuthUserConfig<Record<string, any>>` | Configuration object for the provider. |
| **Returns** | `OAuthConfig<Record<string, any>>` | The configured OAuth provider. |

---

## Disclaimer

Auth.js strictly adheres to the OAuth 2 specification. If you encounter a bug or a non‑compliant behavior, open an issue on GitHub. For spec‑related problems, the maintainers may not pursue a fix. Feel free to ask for help in the Auth.js Discussions.

---