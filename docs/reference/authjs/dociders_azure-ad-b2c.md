# Azure AD B2C Provider – Auth.js

This document describes the built‑in Azure AD B2C integration for Auth.js.  
It covers the claim types returned by the provider, the configuration options, and a minimal example.

---

## 1. Claims

| Property | Type   | Description |
|----------|--------|-------------|
| `aud` | `string` | Audience (client ID) |
| `auth_time` | `number` | Time of authentication (Unix timestamp) |
| `country` | `string` | User’s country |
| `emails` | `string[]` | Email addresses |
| `exp` | `number` | Expiration time (Unix timestamp) |
| `iat` | `number` | Issued‑at time (Unix timestamp) |
| `iss` | `string` | Issuer URL |
| `name` | `string` | Full name |
| `nbf` | `number` | Not‑before time (Unix timestamp) |
| `oid` | `string` | Object ID |
| `postalCode` | `string` | Postal code |
| `preferred_username` | `string` | Preferred username |
| `sub` | `string` | Subject (user ID) |
| `tfp` | `string` | User flow (policy) |
| `ver` | `string` | Token version |

---

## 2. Configuration

### 2.1 Basic Setup

The Azure AD B2C provider follows the OpenID Connect (OIDC) specification.  
Before using the provider you must configure Azure AD B2C to return an ID token.

#### Azure AD B2C prerequisites

| Step | Setting |
|------|---------|
| **Tenant** | Your Azure AD B2C tenant |
| **App Registration** | Register an application and note the `clientId` and `clientSecret` |
| **User Flow** | Create a user flow (policy) |
| **User attributes & token claims** | Collect: `Email Address`, `Display Name`, `Given Name`, `Surname` <br> Return: `Email Addresses`, `Display Name`, `Given Name`, `Surname` <br> Identity Provider: `Identity Provider Access Token`, `User’s Object ID` |

### 2.2 Options

```ts
type OIDCUserConfig<AzureADB2CProfile> = {
  clientId: string;
  clientSecret: string;
  issuer: string;          // e.g. https://<tenant>.b2clogin.com/<tenant>.onmicrosoft.com/<policy>
  // optional overrides
  tenantId?: string;
  primaryUserFlow?: string;
};
```

### 2.3 Default Configuration

Auth.js supplies a default configuration that works for most scenarios.  
If you need to override defaults, refer to the [customizing a built‑in OAuth provider](#customizing) section.

---

## 3. Example

```ts
import { Auth } from "@auth/core";
import AzureADB2C from "@auth/core/providers/azure-ad-b2c";

const request = new Request("https://example.com");

const response = await AuthHandler(request, {
  providers: [
    AzureADB2C({
      clientId: "<YOUR_CLIENT_ID>",
      clientSecret: "<YOUR_CLIENT_SECRET>",
      issuer: "https://<TENANT>.b2clogin.com/<TENANT>.onmicrosoft.com/<POLICY>"
    })
  ]
});
```

> **Tip**  
> Replace `<TENANT>`, `<POLICY>`, `<YOUR_CLIENT_ID>`, and `<YOUR_CLIENT_SECRET>` with your actual values.

---

## 4. Customizing the Provider

If you need to change scopes, endpoints, or other defaults, create a custom provider by extending the built‑in one:

```ts
import AzureADB2C from "@auth/core/providers/azure-ad-b2c";

const CustomAzureADB2C = AzureADB2C({
  // override defaults here
  scope: "openid profile email",
  // other custom options...
});
```

---

## 5. Resources

- [Azure Active Directory B2C documentation](https://learn.microsoft.com/en-us/azure/active-directory-b2c/)
- [Auth.js GitHub repository](https://github.com/authjs/authjs)

---

## 6. Notes

- Auth.js assumes the provider follows the OIDC spec.  
- If you encounter a bug in the default configuration, open an issue on GitHub.  
- For non‑compliance with the spec, the maintainers may not pursue a fix.

---