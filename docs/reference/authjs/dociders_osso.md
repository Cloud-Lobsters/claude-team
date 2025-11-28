# Osso Provider – Auth.js

The **Osso** provider lets you add SAML‑based authentication to your application via an OAuth 2.0 code grant flow.  
It is fully supported by Auth.js and can be used with any framework that ships with the core library.

---

## 1.  Setup

### 1.1  Callback URL

```
https://example.com/api/auth/callback/osso
```

> **Tip** – The callback URL must be registered in the Osso Admin UI (e.g. `https://demo.ossoapp.com/admin/config`).

---

## 2.  Configuration

```ts
import { Auth } from "@auth/core";
import Osso from "@auth/core/providers/osso";

const request = new Request(origin);

const response = await Auth(request, {
  providers: [
    Osso({
      clientId: OSSO_CLIENT_ID,
      clientSecret: OSSO_CLIENT_SECRET,
      issuer: OSSO_ISSUER,   // e.g. "demo.ossoapp.com"
    }),
  ],
});
```

> **Note** – `issuer` must be the fully‑qualified domain of your Osso instance (e.g. `demo.ossoapp.com`).

---

## 3.  Resources

| Resource | Description |
|----------|-------------|
| **Osso** | Open‑source SAML authentication service that normalizes profiles and exposes them via OAuth 2.0. |
| **Demo App** | `https://demo.ossoapp.com` – use this for quick testing. |
| **Deploy Docs** | `https://ossoapp.com/docs/deploy/overview/` – how to run your own instance. |
| **Configure Docs** | `https://ossoapp.com/docs/configure/overview/` – detailed setup for tenants and IDPs. |
| **OAuth Docs** | `https://ossoapp.com/docs/osso-oauth/` – OAuth 2.0 flow specifics. |

---

## 4.  Notes

- Auth.js treats the Osso provider as a standard OAuth 2.0 provider.  
- The default configuration is usually sufficient; override only if you need custom scopes, endpoints, etc.  
- For tenant‑specific SAML configuration, you’ll need to coordinate with the tenant’s IDP admin (e.g. Okta, OneLogin).  
- Osso also offers a mock IDP for local testing.

---

## 5.  Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `config` | `OAuthUserConfig<Record<string, any>>` | Custom configuration for the provider. |

---

## 6.  Returns

`OAuthConfig<Record<string, any>>` – the fully‑configured provider instance ready for use with Auth.js.

---

## 7.  Customizing the Provider

If you need to tweak the default OAuth settings (e.g., scopes, endpoints, or token handling), pass a custom `config` object to `Osso()`:

```ts
Osso({
  clientId: OSSO_CLIENT_ID,
  clientSecret: OSSO_CLIENT_SECRET,
  issuer: OSSO_ISSUER,
  // Custom options
  authorization: { params: { scope: "openid profile email" } },
  // ...other overrides
});
```

---

## 8.  Troubleshooting & Support

- **Bug reports** – Open an issue on the Auth.js GitHub repository.  
- **Non‑spec compliance** – Auth.js follows the OAuth 2.0 spec strictly; if Osso deviates, the issue may not be resolved.  
- **Community help** – Ask questions in the Auth.js Discord or Discussions.

---

**Auth.js © Balázs Orbán and Team – 2025**