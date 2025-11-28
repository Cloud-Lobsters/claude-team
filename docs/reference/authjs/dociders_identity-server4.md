# IdentityServer4 Provider – Auth.js

The **IdentityServer4** provider adds OpenID Connect authentication for IdentityServer4‑based services.  
> ⚠️ **Deprecated** – IdentityServer4 is discontinued and receives security updates only until November 2022. Consider using an alternative provider.

---

## 1. Overview

```ts
import { Auth } from "@auth/core"
import IdentityServer4 from "@auth/core/providers/identity-server4"
```

- **Default behavior**: Assumes the provider follows the OpenID Connect specification.  
- **Callback URL**: `https://example.com/api/auth/callback/identity-server4`

---

## 2. Setup

```ts
const request = new Request(origin)

const response = await Auth(request, {
  providers: [
    IdentityServer4({
      clientId: IDENTITY_SERVER4_CLIENT_ID,
      clientSecret: IDENTITY_SERVER4_CLIENT_SECRET,
      issuer: IDENTITY_SERVER4_ISSUER,
    }),
  ],
})
```

Replace the placeholder constants with your actual credentials.

---

## 3. Callback URL

```
https://<your-domain>/api/auth/callback/identity-server4
```

Make sure this URL is registered in your IdentityServer4 configuration.

---

## 4. Configuration

```ts
IdentityServer4({
  clientId: string,          // Your client ID
  clientSecret: string,      // Your client secret
  issuer: string,            // The issuer URL of your IdentityServer4 instance
  // Optional overrides:
  // authorizationUrl?: string
  // tokenUrl?: string
  // userinfoUrl?: string
  // scope?: string
})
```

> **Tip** – To customize the default OAuth flow, refer to the *Customizing a Built‑in OAuth Provider* guide.

---

## 5. Resources

- [IdentityServer4 OAuth documentation](https://identityserver4.readthedocs.io/en/latest/)

---

## 6. Notes

- The provider is built on top of the OpenID Connect spec; Auth.js strictly follows the spec.
- If you encounter a bug in the default configuration, open an issue on GitHub.
- For non‑spec compliance issues, the maintainers may not pursue a fix.

---

## 7. Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `options` | `OAuthUserConfig<Record<string, any>>` | Configuration options for the provider. |

---

## 8. Returns

`OAuthConfig<Record<string, any>>` – The configured OAuth provider ready to be used with `Auth`.

---