# Cognito Provider – Auth.js

The Cognito provider lets you add Amazon Cognito authentication to your Auth.js application.  
It follows the OpenID Connect specification and is fully type‑safe with TypeScript.

---

## Overview

| Feature | Description |
|---------|-------------|
| **Provider** | `@auth/core/providers/cognito` |
| **Profile type** | `CognitoProfile` |
| **Default callback URL** | `https://example.com/api/auth/callback/cognito` |

---

## `CognitoProfile`

```ts
interface CognitoProfile extends Record<string, any> {
  /** User's email address */
  email: string;

  /** User's full name */
  name: string;

  /** URL of the user's avatar */
  picture: string;

  /** Cognito user pool ID */
  sub: string;
}
```

---

## Setup

### 1. Install Auth.js

```bash
npm i @auth/core
```

### 2. Add the Cognito provider

```ts
import { Auth } from "@auth/core";
import Cognito from "@auth/core/providers/cognito";

const request = new Request(origin);

const response = await Auth(request, {
  providers: [
    Cognito({
      clientId: COGNITO_CLIENT_ID,
      clientSecret: COGNITO_CLIENT_SECRET,
      issuer: COGNITO_ISSUER,
    }),
  ],
});
```

> **Tip**  
> `COGNITO_ISSUER` is the Cognito domain URL, e.g.  
> `https://cognito-idp.{region}.amazonaws.com/{PoolId}`  
> (`PoolId` comes from *General Settings* in the Cognito console, not the App Client ID).

---

## Callback URL

```
https://example.com/api/auth/callback/cognito
```

Make sure this URL is registered in the Cognito App Client settings.

---

## Resources

- [Cognito OAuth documentation](https://docs.aws.amazon.com/cognito/latest/developerguide/cognito-user-identity-pools-working-with-oidc.html)

---

## Notes

- The provider assumes Cognito follows the OpenID Connect spec.  
- If you need to override default settings, refer to the guide on [customizing a built‑in OAuth provider](#).
- Ensure all required client settings are enabled; otherwise the OAuth flow will fail.

---

## Type Parameters

```ts
/**
 * @template P extends CognitoProfile
 * @param {OAuthUserConfig<P>} options
 * @returns {OAuthConfig<P>}
 */
function default<P>(options): OAuthConfig<P>
```

---

## Example

```ts
import { Auth } from "@auth/core";
import Cognito from "@auth/core/providers/cognito";

const request = new Request("https://example.com");

const response = await Auth(request, {
  providers: [
    Cognito({
      clientId: "YOUR_CLIENT_ID",
      clientSecret: "YOUR_CLIENT_SECRET",
      issuer: "https://cognito-idp.us-east-1.amazonaws.com/your-pool-id",
    }),
  ],
});
```

---

> **Disclaimer**  
> Auth.js strictly follows the OpenID Connect specification.  
> If you encounter a bug in the default configuration, open an issue.  
> For non‑compliance with the spec, we may not pursue a fix.

---