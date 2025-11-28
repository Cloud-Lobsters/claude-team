# Loops Email Provider – Auth.js

The **Loops** provider is a built‑in email provider for Auth.js.  
It uses Loops’ HTTP‑based email service to send verification emails.

> **Note** – The provider is available in the `@auth/core` package.

---

## 1.  Provider Overview

| Property | Type | Description |
|----------|------|-------------|
| `apiKey` | `string` | Your Loops API key. |
| `transactionalId` | `string` | The transactional ID used by Loops. |
| `type` | `"email"` | Fixed provider type. |
| `name` | `string` | The name shown on the sign‑in button. |
| `id` | `string` | Unique provider identifier. |
| `maxAge` | `number` | Optional. Token lifetime in seconds. |
| `secret` | `string` | Optional. Used to hash the verification token. |
| `from` | `string` | Optional. Sender address. |
| `generateVerificationToken` | `() => Awaitable<string>` | Optional. Custom token generator. |
| `normalizeIdentifier` | `(identifier: string) => string` | Optional. Normalises the user identifier. |
| `sendVerificationRequest` | `(params: Params) => Promise<void>` | Required. Sends the verification email. |
| `options` | `LoopsUserConfig` | Optional. Additional Loops configuration. |
| `server` | `AllTransportOptions` | Optional. SMTP server options (not used for Loops). |

> **Inherited** – All properties are inherited from the generic `EmailConfig` type, with the following overrides:
> * `apiKey` – overridden to use Loops’ HTTP API.
> * `options` – overridden to accept `LoopsUserConfig`.

---

## 2.  Types

```ts
// Loops provider configuration
export interface LoopsConfig extends Omit<EmailConfig, "sendVerificationRequest" | "options"> {
  apiKey: string;                     // Loops API key
  transactionalId: string;           // Loops transactional ID
  type: "email";                      // Provider type
  options: LoopsUserConfig;           // Loops‑specific options
}

// Loops‑specific user configuration
export type LoopsUserConfig = Omit<Partial<LoopsConfig>, "options" | "type">;

// Default helper
export function default(config: LoopsUserConfig): LoopsConfig;
```

---

## 3.  Example Usage

```ts
import { Loops } from "@auth/core/providers";

export const providers = [
  Loops({
    apiKey: process.env.AUTH_LOOPS_KEY!,
    transactionalId: process.env.AUTH_LOOPS_TRANSACTIONAL_ID!,
  }),
];
```

> Replace `AUTH_LOOPS_KEY` and `AUTH_LOOPS_TRANSACTIONAL_ID` with your actual Loops credentials.

---

## 4.  How It Works

1. **Configuration** – Provide `apiKey` and `transactionalId`.  
2. **Token Generation** – Auth.js calls `generateVerificationToken()` (default implementation) to create a unique token.  
3. **Email Sending** – `sendVerificationRequest()` uses Loops’ HTTP API to deliver the email.  
4. **Verification** – The user clicks the link in the email, which contains the token. Auth.js validates the token and signs the user in.

---

## 5.  Customization

You can override any of the optional properties:

```ts
Loops({
  apiKey: "...",
  transactionalId: "...",
  name: "Loops",
  maxAge: 60 * 60 * 24,          // 24 hours
  secret: "super-secret-key",
  normalizeIdentifier: (id) => id.toLowerCase(),
  generateVerificationToken: async () => crypto.randomBytes(32).toString("hex"),
});
```

---

## 6.  References

* **Provider Type** – `"email"`  
* **Documentation** – https://authjs.dev/providers/loops  
* **Source** – `@auth/core/providers/loops`

---

**Auth.js** © 2025 – Balázs Orbán & Team  
All rights reserved.