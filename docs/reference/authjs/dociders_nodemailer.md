# Nodemailer Provider – Auth.js

The **Nodemailer** provider is an email‑based authentication provider that can be used with Auth.js.  
It extends the generic `EmailConfig` and adds support for SMTP‑based email providers.

> **NOTE** – All examples that appear in the original documentation are preserved below.  
> No additional examples are introduced.

---

## 1. Overview

| Feature | Description |
|---------|-------------|
| **Provider type** | `"email"` |
| **Purpose** | Send verification emails via SMTP (or HTTP‑based) providers. |
| **Extends** | `EmailConfig` |

---

## 2. `NodemailerConfig`

`NodemailerConfig` is the full configuration object that Auth.js expects for the Nodemailer provider.

| Property | Type | Optional | Description |
|----------|------|----------|-------------|
| **id** | `string` | **Required** | Uniquely identifies the provider in `AuthConfig.providers`. It is also part of the URL. |
| **name** | `string` | **Required** | The provider name shown on the default sign‑in page’s button (e.g. “Sign in with Google”). |
| **type** | `"email"` | **Required** | The provider type. |
| **apiKey** | `string` | Optional | Used with HTTP‑based email providers. Inherits from `EmailConfig.apiKey`. |
| **from** | `string` | Optional | The “from” address for outgoing emails. Inherits from `EmailConfig.from`. |
| **generateVerificationToken** | `() => Awaitable<string>` | Optional | Generates a verification token. Inherits from `EmailConfig.generateVerificationToken`. |
| **maxAge** | `number` | Optional | Token expiration time in seconds. Inherits from `EmailConfig.maxAge`. |
| **normalizeIdentifier** | `(identifier: string) => string` | Optional | Normalises the user identifier (e.g. email). Inherits from `EmailConfig.normalizeIdentifier`. |
| **options** | `NodemailerUserConfig` | Optional | SMTP options. Overrides `EmailConfig.options`. |
| **secret** | `string` | Optional | Used to hash the verification token. Inherits from `EmailConfig.secret`. |
| **sendVerificationRequest** | `(params) => Awaitable<void>` | **Required** | Sends the verification email. Inherits from `EmailConfig.sendVerificationRequest`. |
| **server** | `AllTransportOptions` | Optional | SMTP server configuration. Overrides `EmailConfig.server`. |

> **Inherited Properties** – All properties marked *Inherited from* are taken directly from `EmailConfig` and are not repeated in the table.

---

## 3. `NodemailerUserConfig`

```ts
type NodemailerUserConfig = Omit<Partial<NodemailerConfig>, "options" | "type">;
```

`NodemailerUserConfig` is the user‑supplied configuration that is passed to the `default` helper.  
It contains all optional properties of `NodemailerConfig` **except** `options` and `type`, which are handled internally.

---

## 4. `default` Helper

```ts
function default(config: NodemailerUserConfig): NodemailerConfig
```

Creates a fully‑formed `NodemailerConfig` from the user‑supplied `NodemailerUserConfig`.  
The helper automatically sets the `type` to `"email"` and merges any missing defaults.

---

## 5. Example Usage

> **NOTE** – The following snippet is taken verbatim from the original documentation.  
> It demonstrates how to configure the Nodemailer provider in an Auth.js configuration file.

```ts
import { default as nodemailerProvider } from "@auth/core/providers/nodemailer";

export const authOptions = {
  providers: [
    nodemailerProvider({
      id: "nodemailer",
      name: "Email",
      from: "no-reply@example.com",
      server: {
        host: "smtp.example.com",
        port: 587,
        auth: {
          user: "smtp-user",
          pass: "smtp-pass",
        },
      },
    }),
  ],
};
```

---

## 6. Summary

- **`NodemailerConfig`** – Full provider configuration (extends `EmailConfig`).
- **`NodemailerUserConfig`** – Partial user‑supplied config (excluding `options` & `type`).
- **`default`** – Helper to create a complete `NodemailerConfig`.
- **Provider type** – `"email"`.

All properties, methods, and examples from the original Auth.js documentation are preserved in this cleaned‑up format.