# Notion Provider – Auth.js

The **Notion** provider lets you add OAuth‑2.0 authentication for Notion to your Auth.js application.  
Below is a concise, self‑contained reference that includes all type definitions, configuration options, and usage examples.

---

## 1. Overview

| Feature | Description |
|---------|-------------|
| **OAuth 2.0** | Uses the standard OAuth flow to obtain an access token from Notion. |
| **Public Integration only** | Requires a *Public* integration in Notion to obtain `clientId` and `clientSecret`. |
| **Redirect URI** | Must be registered in the Notion integration settings. |

---

## 2. Type Definitions

```ts
// NotionProfile – the shape of the user profile returned by Notion
export interface NotionProfile extends Record<string, any> {
  access_token: string;
  bot_id: string;
  duplicated_template_id: string;
  owner?: Owner;
  workspace_icon: string;
  workspace_id: number;
  workspace_name: string;
}

// Owner – the owner of the integration
export interface Owner {
  type: string;          // e.g. "user" | "workspace"
  user: User;
}

// Person – a minimal representation of a person
export interface Person extends Record<string, any> {
  email: string;
}

// User – a minimal representation of a user
export interface User extends Record<string, any> {
  avatar_url: null | string;
  id: string;
  name: string;
  object: "user" | "bot";
  owner?: {
    type: "user" | "workspace";
    workspace: string;
  };
  type: "user" | "workspace";
  workspace: string;
  person: Person;
  type: string;
  workspace_name?: null | string;
}
```

---

## 3. Default Configuration

```ts
/**
 * Returns the default OAuth configuration for the Notion provider.
 *
 * @param options - Custom options to override defaults.
 * @returns OAuthConfig<NotionProfile>
 */
export function default<P>(options: OAuthUserConfig<P> & AdditionalConfig): OAuthConfig<P>
```

---

## 4. Setup

### 4.1. Callback URL

```
https://example.com/api/auth/callback/notion
```

> **Tip:** The callback URL must match the one registered in your Notion integration.

### 4.2. Configuration

```ts
import { Auth } from "@auth/core";
import Notion from "@auth/core/providers/notion";

const request = new Request(origin);

const response = await Auth(request, {
  providers: [
    Notion({
      clientId: NOTION_CLIENT_ID,
      clientSecret: NOTION_CLIENT_SECRET,
      redirectUri: NOTION_CLIENT_REDIRECT_URI,
    }),
  ],
});
```

> **Environment variables**  
> `NOTION_CLIENT_ID`, `NOTION_CLIENT_SECRET`, and `NOTION_CLIENT_REDIRECT_URI` should be set in your environment.

---

## 5. Customizing the Provider

If you need to override any of the default settings (e.g., scopes, endpoints), pass a custom configuration object to `Notion()`:

```ts
Notion({
  clientId: "...",
  clientSecret: "...",
  redirectUri: "...",
  // Custom scopes
  scope: "read write",
  // Custom authorization URL
  authorizationUrl: "https://api.notion.com/v1/oauth/authorize",
});
```

---

## 6. Notes & Troubleshooting

- **Public Integration Required** – Only *Public* integrations expose `oauth_id` and `oauth_secret`. Private integrations cannot be used with this provider.
- **Redirect URI** – Must be registered in the Notion integration settings; otherwise the token exchange will fail.
- **Compliance** – Auth.js follows the OAuth 2.0 spec strictly. If you encounter a non‑compliant behavior from Notion, open an issue on GitHub.

---

## 7. Resources

- [Notion Docs](https://developers.notion.com/docs)
- [Notion Authorization Docs](https://developers.notion.com/docs/oauth)
- [Notion Integrations](https://www.notion.so/my-integrations)

---

## 8. License

Auth.js is open source under the MIT license. Contributions and bug reports are welcome on GitHub.