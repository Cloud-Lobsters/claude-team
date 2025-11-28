# Hugging Face Provider – Auth.js

The **Hugging Face** provider is a built‑in OAuth/OIDC provider for Auth.js.  
It exposes a rich user profile that includes information about the user’s
subscription, organizations, and more.

> **NOTE**  
> The provider follows the OIDC specification. If you encounter a
> non‑compliant response, open an issue – Auth.js will not be responsible
> for provider‑side deviations.

---

## 1.  Profile Types

```ts
// The main user profile returned by the provider
export interface HuggingfaceProfile {
  // User‑level fields
  canPay?: boolean;          // Requires `read-billing` scope
  email?: string;            // Requires `email` scope
  email_verified?: boolean;  // Requires `email` scope
  isPro: boolean;            // Always present
  name?: string;             // Requires `profile` scope
  picture?: string;          // Requires `profile` scope
  preferred_username?: string; // Requires `profile` scope
  profile?: string;          // Requires `profile` scope
  sub: string;               // Unique user identifier
  website?: string;          // Requires `profile` scope

  // Organization list
  orgs: Array<{
    canPay: boolean;         // Requires `read-billing` scope
    isEnterprise: boolean;
    missingMFA?: boolean;    // Requires `read-billing` scope
    name: string;
    pendingSSO?: boolean;    // Requires `read-billing` scope
    picture: string;
    preferred_username: string;
    resourceGroups?: Array<{
      name: string;
      role: "admin" | "write" | "read" | "contributor";
      sub: string;
    }>;
    roleInOrg?: "admin" | "write" | "read" | "contributor";
    sub: string;
  }>;
}
```

---

## 2.  Setup

### 2.1  Callback URL

```
https://example.com/api/auth/callback/huggingface
```

### 2.2  Configuration

```ts
import { Auth } from "@auth/core";
import HuggingFace from "@auth/core/providers/huggingface";

const request = new Request(origin);

const response = await Auth(request, {
  providers: [
    HuggingFace({
      clientId: HUGGINGFACE_CLIENT_ID,
      clientSecret: HUGGINGFACE_CLIENT_SECRET,
      authorization: {
        params: {
          scope: "openid profile email", // Add any additional scopes you need
          // orgIds: "unique_org_id" // Optional: restrict to a specific org
        },
      },
    }),
  ],
});
```

> **SCOPES**  
> The following scopes are available. Enable them in your OAuth app
> settings before using them.

| Scope | Description |
|-------|-------------|
| `openid` | Grants access to the user’s OpenID Connect profile. |
| `profile` | Grants access to the user’s profile information. |
| `email` | Grants access to the user’s email address. |
| `read-repos` | Grants read access to the user’s repositories. |
| `write-repos` | Grants write access to the user’s repositories. |
| `manage-repos` | Can create/delete repositories on behalf of the user. |
| `write-discussions` | Can post on the user’s behalf. |
| `read-billing` | Know if the user has a payment method set up. |
| `inference-api` | Can make calls to Inference providers on behalf of the user. |
| `webhooks` | Can manage webhooks on behalf of the user. |

> **NOTE**  
> By default, Auth.js enables the `profile` and `email` scopes. If your
> OAuth app does not have the `email` scope enabled, you will receive a
> scope error.

---

## 3.  Usage Example

```ts
import { getSession } from "@auth/core";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  const session = await getSession({ req });

  if (!session) {
    return new Response("Not authenticated", { status: 401 });
  }

  // `session.user` will be of type `HuggingfaceProfile`
  console.log(session.user.isPro); // true/false
  console.log(session.user.orgs[0].name); // first org name
}
```

---

## 4.  Resources

- [Hugging Face OAuth documentation](https://huggingface.co/docs/hub/oauth)
- [Create an OAuth application](https://huggingface.co/settings/oauth)

---

## 5.  Customizing the Provider

The provider comes with a default configuration. To override defaults,
pass a custom `options` object to `HuggingFace()` as shown in the
setup example. Refer to the [customizing a built‑in OAuth provider](#)
guide for advanced use cases.

---

## 6.  Contributing & Issues

If you discover a bug in the default configuration, open an issue on
GitHub. Auth.js strictly adheres to the spec and will not be responsible
for provider‑side deviations. For non‑compliance issues, we may not
pursue a resolution.

---