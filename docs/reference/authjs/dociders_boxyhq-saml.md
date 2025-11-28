# BoxyHQ SAML Provider – Auth.js

The **BoxyHQ SAML** provider turns the BoxyHQ SAML SSO service into a simple OAuth 2.0 / OIDC provider that can be used with Auth.js.  
It abstracts the SAML protocol behind an OAuth flow, making it trivial to add Enterprise SSO to your application.

> **NOTE** – All examples below assume you have already installed `@auth/core` and the provider package.

---

## 1.  Provider Overview

| Feature | Description |
|---------|-------------|
| **Name** | `boxyhq-saml` |
| **Type** | OAuth 2.0 / OIDC |
| **Profile** | `BoxyHQSAMLProfile` |
| **Default Scope** | `openid` (unless overridden) |

### Profile Type

```ts
export interface BoxyHQSAMLProfile extends Record<string, any> {
  /** User's email address */
  email: string;

  /** Optional first name */
  firstName?: string;

  /** Unique identifier for the user */
  id: string;

  /** Optional last name */
  lastName?: string;
}
```

---

## 2.  Setup

### 2.1  Callback URL

```
https://<your-domain>/api/auth/callback/boxyhq-saml
```

### 2.2  Install

```bash
npm i @auth/core @auth/core/providers/boxyhq-saml
# or
yarn add @auth/core @auth/core/providers/boxyhq-saml
```

### 2.3  Server‑side Configuration

#### OAuth 2.0 Flow

```ts
import { Auth } from "@auth/core";
import BoxyHQ from "@auth/core/providers/boxyhq-saml";

const request = new Request(origin); // `origin` is the request URL

const response = await Auth(request, {
  providers: [
    BoxyHQ({
      // Required for OAuth 2.0 flow – otherwise defaults to `openid`
      authorization: { params: { scope: "" } },
      clientId: process.env.BOXYHQ_SAML_CLIENT_ID!,
      clientSecret: process.env.BOXYHQ_SAML_CLIENT_SECRET!,
      issuer: process.env.BOXYHQ_SAML_ISSUER!,
    }),
  ],
});
```

#### OIDC Flow

```ts
import { Auth } from "@auth/core";
import BoxyHQ from "@auth/core/providers/boxyhq-saml";

const request = new Request(origin);

const response = await Auth(request, {
  providers: [
    BoxyHQ({
      clientId: process.env.BOXYHQ_SAML_CLIENT_ID!,
      clientSecret: process.env.BOXYHQ_SAML_CLIENT_SECRET!,
      issuer: process.env.BOXYHQ_SAML_ISSUER!,
    }),
  ],
});
```

> **Tip** – If you only need the default `openid` scope, you can omit the `authorization` field entirely.

---

## 3.  Client‑side Usage

BoxyHQ SAML requires two extra query parameters – `tenant` and `product` – so that the service can route the user to the correct SAML Identity Provider.

```ts
import { signIn } from "auth";

const tenant = email.split("@")[1]; // e.g. `example.com`
const product = "my_awesome_product";

<Button
  onClick={async (event) => {
    event.preventDefault();
    await signIn("boxyhq-saml", {}, { tenant, product });
  }}
>
  Sign in with BoxyHQ
</Button>
```

---

## 4.  Configuration Details

| Option | Type | Required | Description |
|--------|------|----------|-------------|
| `clientId` | `string` | ✅ | Your BoxyHQ SAML client ID |
| `clientSecret` | `string` | ✅ | Your BoxyHQ SAML client secret |
| `issuer` | `string` | ✅ | The issuer URL for your BoxyHQ tenant |
| `authorization` | `OAuthAuthorizationParams` | ❌ | Custom OAuth parameters (e.g. `scope`) |
| `tenant` | `string` | ❌ | Passed via `signIn` – determines tenant |
| `product` | `string` | ❌ | Passed via `signIn` – determines product |

> **Note** – The provider defaults to the OAuth 2.0 spec. If you need to override defaults, refer to the [customizing a built‑in OAuth provider](https://authjs.dev/docs/providers/custom) guide.

---

## 5.  Resources

- [BoxyHQ OAuth Documentation](https://docs.boxyhq.com/oauth)
- [Auth.js Docs – Providers](https://authjs.dev/docs/providers)

---

## 6.  Troubleshooting & Support

- **Non‑compliance with OAuth spec** – Auth.js will not be responsible for provider deviations. Report issues via GitHub or Discussions.
- **Configuration errors** – Double‑check `clientId`, `clientSecret`, and `issuer`. Ensure the callback URL matches exactly.
- **Tenant/Product mapping** – Verify that the `tenant` and `product` values you pass to `signIn` match the configuration on BoxyHQ.

---

## 7.  License & Credits

Auth.js © Balázs Orbán and Team – 2025  
BoxyHQ SAML provider is part of the Auth.js ecosystem.  
All code is licensed under the MIT license.