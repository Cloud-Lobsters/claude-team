# Auth.js – GitHub Provider

This document describes the built‑in **GitHub** OAuth provider for Auth.js.  
It covers the provider’s types, configuration, and a minimal example of how to use it in a server‑side request.

---

## 1. Overview

- **Provider**: GitHub OAuth 2.0
- **Default callback URL**: `https://example.com/api/auth/callback/github`
- **Default scopes**: `read:user`, `user:email`

---

## 2. Types

### 2.1 `GitHubEmail`

| Property | Type | Description |
|----------|------|-------------|
| `email` | `string` | The email address. |
| `primary` | `boolean` | Whether this is the primary email. |
| `verified` | `boolean` | Whether the email is verified. |
| `visibility` | `"private" | "public"` | Visibility of the email. |

### 2.2 `GitHubProfile`

| Property | Type | Description |
|----------|------|-------------|
| `avatar_url` | `string` | URL of the avatar image. |
| `bio` | `null | string` | User biography. |
| `blog` | `null | string` | Blog URL. |
| `collaborators?` | `number` | Optional number of collaborators. |
| `company` | `null | string` | Company name. |
| `created_at` | `string` | ISO‑8601 creation date. |
| `disk_usage?` | `number` | Optional disk usage. |
| `email` | `null | string` | Primary email. |
| `events_url` | `string` | Events API URL. |
| `followers` | `number` | Number of followers. |
| `followers_url` | `string` | Followers API URL. |
| `following` | `number` | Number of following. |
| `following_url` | `string` | Following API URL. |
| `gists_url` | `string` | Gists API URL. |
| `gravatar_id` | `null | string` | Gravatar ID. |
| `hireable` | `null | boolean` | Hireable status. |
| `html_url` | `string` | Profile URL. |
| `id` | `number` | GitHub user ID. |
| `location` | `null | string` | Location. |
| `login` | `string` | Username. |
| `name` | `null | string` | Full name. |
| `node_id` | `string` | Node ID. |
| `organizations_url` | `string` | Organizations API URL. |
| `owned_private_repos?` | `number` | Optional private repos owned. |
| `plan?` | `object` | Optional plan information: `{ collaborators: number; name: string; private_repos: number; space: number; }` |
| `private_gists?` | `number` | Optional private gists. |
| `public_gists` | `number` | Public gists. |
| `public_repos` | `number` | Public repos. |
| `received_events_url` | `string` | Received events API URL. |
| `repos_url` | `string` | Repos API URL. |
| `site_admin` | `boolean` | Site admin status. |
| `starred_url` | `string` | Starred API URL. |
| `subscriptions_url` | `string` | Subscriptions API URL. |
| `suspended_at?` | `null | string` | Optional suspension date. |
| `total_private_repos?` | `number` | Optional total private repos. |
| `twitter_username?` | `null | string` | Twitter handle. |
| `two_factor_authentication` | `boolean` | 2FA status. |
| `type` | `string` | Account type. |
| `updated_at` | `string` | ISO‑8601 update date. |
| `url` | `string` | API URL. |
| `[claim: string]` | `unknown` | Any additional claims. |

---

## 3. Setup

### 3.1 Callback URL

Register the following callback URL in your GitHub OAuth app:

```
https://example.com/api/auth/callback/github
```

### 3.2 Configuration

```ts
import { Auth } from "@auth/core";
import GitHub from "@auth/core/providers/github";

const request = new Request(origin);

const response = await Auth(request, {
  providers: [
    GitHub({
      clientId: GITHUB_CLIENT_ID,
      clientSecret: GITHUB_CLIENT_SECRET,
    }),
  ],
});
```

> **Note**  
> The provider follows the OAuth 2 specification. If you need to override defaults (e.g., scopes, endpoints), pass an `OAuthUserConfig<GitHubProfile>` object to `GitHub()`.

---

## 4. Example – Full Server‑Side Flow

```ts
// src/api/auth/[...nextauth].ts
import { NextRequest, NextResponse } from "next/server";
import { Auth } from "@auth/core";
import GitHub from "@auth/core/providers/github";

export async function GET(request: NextRequest) {
  const response = await Auth(request, {
    providers: [
      GitHub({
        clientId: process.env.GITHUB_CLIENT_ID!,
        clientSecret: process.env.GITHUB_CLIENT_SECRET!,
      }),
    ],
  });
  return response;
}
```

---

## 5. Resources

- [GitHub – Creating an OAuth App](https://docs.github.com/en/developers/apps/building-oauth-apps/creating-an-oauth-app)
- [GitHub – Authorizing OAuth Apps](https://docs.github.com/en/developers/apps/building-oauth-apps/authorizing-oauth-apps)
- [GitHub – Configure your GitHub OAuth Apps](https://docs.github.com/en/developers/apps/configuring-oauth-apps)

---

## 6. Customizing the Provider

If you need to change the default behavior (e.g., scopes, endpoints, or custom claims), pass a configuration object:

```ts
GitHub({
  clientId: "...",
  clientSecret: "...",
  // Custom scopes
  authorization: { params: { scope: "repo,user:email" } },
  // Custom endpoints
  endpoints: { token: "https://github.com/login/oauth/access_token" },
});
```

---

## 7. Disclaimer

Auth.js adheres strictly to the OAuth 2 specification. If you encounter a non‑compliant provider behavior, open an issue or discussion. The team may not pursue fixes for spec violations.

---