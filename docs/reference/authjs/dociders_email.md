# Auth.js – Email Provider

> **⚠️ Deprecation Notice**  
> The `email` provider is now a thin wrapper around the SMTP‑based **Nodemailer** provider.  
> Import the provider from `@auth/core/providers/nodemailer` instead of `@auth/core/providers/email`.  
> When switching, update your sign‑in call from `signIn("email")` to `signIn("nodemailer")`.

---

## 1. Overview

The **Email** provider allows users to authenticate via a magic‑link or one‑time‑password sent to their email address.  
It is built on top of the common provider interface (`CommonProviderOptions`) and can be configured for either HTTP‑based or SMTP‑based email services.

---

## 2. Configuration

```ts
import { email } from "@auth/core/providers/email";

export const authOptions = {
  providers: [
    email({
      // ──────────────────────────────────────────────────────
      // 1️⃣  Identification
      // ──────────────────────────────────────────────────────
      id: "email",          // Unique provider ID (also part of the callback URL)
      name: "Email",        // Button label on the sign‑in page

      // ──────────────────────────────────────────────────────
      // 2️⃣  Optional HTTP‑based provider settings
      // ──────────────────────────────────────────────────────
      apiKey: "YOUR_API_KEY",   // Used by services like SendGrid, Mailgun, etc.

      // ──────────────────────────────────────────────────────
      // 3️⃣  Optional SMTP‑based provider settings
      // ──────────────────────────────────────────────────────
      server: {
        host: "smtp.example.com",
        port: 587,
        auth: {
          user: "user@example.com",
          pass: "password",
        },
      },

      // ──────────────────────────────────────────────────────
      // 4️⃣  Optional custom logic
      // ──────────────────────────────────────────────────────
      from: "no-reply@example.com",          // Sender address
      secret: "super-secret-key",            // Used to hash the verification token
      maxAge: 60 * 60 * 24,                  // Token validity (seconds)
      normalizeIdentifier: (email) => email.toLowerCase(),
      generateVerificationToken: async () => crypto.randomBytes(32).toString("hex"),

      // ──────────────────────────────────────────────────────
      // 5️⃣  Required callback
      // ──────────────────────────────────────────────────────
      sendVerificationRequest: async ({
        identifier,
        token,
        url,
        provider,
        theme,
        request,
        expires,
      }) => {
        // Implement your email‑sending logic here.
        // `identifier` is the user’s email address.
        // `token` is the signed verification token.
        // `url` is the full callback URL the user will click.
        // `expires` is the Date when the token will expire.
      },
    }),
  ],
};
```

### Property Summary

| Property | Type | Description |
|----------|------|-------------|
| **id** | `string` | Unique provider identifier (also part of the callback URL). |
| **name** | `string` | Button label on the sign‑in page. |
| **type** | `"email"` | Fixed provider type. |
| **apiKey** | `string` (optional) | API key for HTTP‑based email services. |
| **server** | `AllTransportOptions` (optional) | SMTP configuration for Nodemailer. |
| **from** | `string` (optional) | Sender address used in the email. |
| **secret** | `string` (optional) | Secret used to hash the verification token. |
| **maxAge** | `number` (optional) | Token validity in seconds. |
| **normalizeIdentifier** | `(identifier: string) => string` (optional) | Normalises the email address (e.g., lower‑casing). |
| **generateVerificationToken** | `() => Awaitable<string>` (optional) | Custom token generator. |
| **sendVerificationRequest** | `(params: EmailProviderSendVerificationRequestParams) => Awaitable<void>` | Callback that actually sends the email. |
| **options** | `EmailUserConfig` (optional) | Additional provider‑specific options. |

---

## 3. Types

```ts
// Parameters passed to `sendVerificationRequest`
export type EmailProviderSendVerificationRequestParams = {
  expires: Date;          // Token expiry date
  identifier: string;     // User’s email address
  provider: EmailConfig;  // The provider configuration
  request: Request;       // The incoming HTTP request
  theme: Theme;           // Current theme (light/dark)
  token: string;          // Signed verification token
  url: string;            // Full callback URL
};

// Fixed provider type
export type EmailProviderType = "email";

// Omit `options` and `type` from the base config
export type EmailUserConfig = Omit<Partial<EmailConfig>, "options" | "type">;
```

---

## 4. Default Helper

The `default` helper creates a Nodemailer‑based configuration from a user‑supplied config.

```ts
import { default as nodemailerDefault } from "@auth/core/providers/email";

const nodemailerConfig = nodemailerDefault({
  host: "smtp.example.com",
  port: 587,
  auth: { user: "user", pass: "pass" },
});
```

> **Note**: This helper is deprecated in favour of importing directly from `@auth/core/providers/nodemailer`.

---

## 5. Example: Using the Email Provider

```ts
import { email } from "@auth/core/providers/email";

export const authOptions = {
  providers: [
    email({
      id: "email",
      name: "Email",
      from: "no-reply@myapp.com",
      secret: process.env.EMAIL_SECRET!,
      sendVerificationRequest: async ({ identifier, token, url }) => {
        // Example using Nodemailer
        const transporter = nodemailer.createTransport({
          host: process.env.SMTP_HOST,
          port: Number(process.env.SMTP_PORT),
          auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS,
          },
        });

        await transporter.sendMail({
          from: "no-reply@myapp.com",
          to: identifier,
          subject: "Your sign‑in link",
          html: `<p>Click <a href="${url}">here</a> to sign in.</p>`,
        });
      },
    }),
  ],
};
```

**Sign‑in call**

```ts
// Old (deprecated)
await signIn("email", { email: "user@example.com" });

// New
await signIn("nodemailer", { email: "user@example.com" });
```

---

## 6. Summary

- The **Email** provider is a wrapper around Nodemailer for SMTP‑based email authentication.
- Configure it with `id`, `name`, `from`, `secret`, and a `sendVerificationRequest` callback.
- Use the `default` helper to create a Nodemailer config, but prefer importing from `@auth/core/providers/nodemailer`.
- Update your sign‑in calls from `"email"` to `"nodemailer"` to avoid deprecation warnings.

Happy coding!