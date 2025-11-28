# Bitbucket Provider – Auth.js

The Bitbucket provider is a built‑in OAuth 2.0 integration for Auth.js.  
It allows you to authenticate users via Bitbucket Cloud and retrieve their
profile information.

---

## 1. Overview

| Feature | Description |
|---------|-------------|
| **Provider** | Bitbucket Cloud |
| **Auth Flow** | OAuth 2.0 |
| **Profile Type** | `BitbucketProfile` |

---

## 2. Profile (`BitbucketProfile`)

```ts
interface BitbucketProfile {
  account_id: string;
  account_status: string;
  created_on: string;
  display_name: string;
  has_2fa_enabled: null | boolean;
  is_staff: boolean;
  links: Record<
    LiteralUnion<
      "html" | "self" | "avatar" | "repositories" | "snippets" | "hooks",
      string
    >,
    { href: string }
  >;
  location: null | string;
  nickname: string;
  type: string;
  username: string;
  uuid: string;
}
```

---

## 3. Setup

### 3.1 Callback URL

```
https://example.com/api/auth/callback/bitbucket
```

> **Tip** – Replace `example.com` with your own domain.

### 3.2 Configuration

```ts
import { Auth } from "@auth/core";
import Bitbucket from "@auth/core/providers/bitbucket";

const request = new Request(origin);

const response = await Auth(request, {
  providers: [
    Bitbucket({
      clientId: process.env.BITBUCKET_CLIENT_ID,
      clientSecret: process.env.BITBUCKET_CLIENT_SECRET,
    }),
  ],
});
```

> **Note** – The provider uses the standard OAuth 2.0 flow.  
> If you need to override any defaults, refer to the *Customizing a Built‑In OAuth Provider* guide.

---

## 4. Resources

| Topic | Link |
|-------|------|
| Using OAuth on Bitbucket Cloud | https://developer.atlassian.com/cloud/bitbucket/rest/api-group-users/#api-user-get |
| Bitbucket REST API Authentication | (see Bitbucket docs) |
| Bitbucket REST API Users | (see Bitbucket docs) |

---

## 5. Notes

- Auth.js assumes the Bitbucket provider follows the OAuth 2.0 specification.
- The provider comes with a default configuration. If you encounter a bug, open an issue on GitHub.
- Auth.js does **not** guarantee compliance with any provider‑specific deviations from the spec.

---

## 6. API

### `default(options)`

```ts
/**
 * Creates a Bitbucket OAuth provider.
 *
 * @param options - OAuth user configuration for Bitbucket.
 * @returns OAuth configuration for Bitbucket.
 */
function default(options: OAuthUserConfig<BitbucketProfile>): OAuthConfig<BitbucketProfile>;
```

#### Parameters

| Name | Type | Description |
|------|------|-------------|
| `options` | `OAuthUserConfig<BitbucketProfile>` | Configuration options for the provider. |

#### Returns

`OAuthConfig<BitbucketProfile>` – The fully configured OAuth provider.

---

## 7. Example Usage

```ts
import { Auth } from "@auth/core";
import Bitbucket from "@auth/core/providers/bitbucket";

export async function GET(request: Request) {
  return await Auth(request, {
    providers: [
      Bitbucket({
        clientId: process.env.BITBUCKET_CLIENT_ID!,
        clientSecret: process.env.BITBUCKET_CLIENT_SECRET!,
      }),
    ],
  });
}
```

---

**Auth.js © Balázs Orbán and Team – 2025**