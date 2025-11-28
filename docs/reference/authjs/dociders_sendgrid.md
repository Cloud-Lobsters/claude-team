# SendGrid Email Provider – `@auth/core/providers/sendgrid`

The **SendGrid** provider is a lightweight wrapper that allows Auth.js to send emails via the SendGrid API.  
It exposes a single function, `default`, which accepts a configuration object and returns a fully‑configured `EmailConfig` instance that can be passed to Auth.js.

> **Note**  
> The provider is part of the core Auth.js package (`@auth/core`) and can be used with any framework that supports Auth.js (Next.js, SvelteKit, Express, etc.).

---

## Function Signature

```ts
/**
 * Creates a SendGrid email provider configuration.
 *
 * @param config - Configuration options for the SendGrid provider.
 * @returns An `EmailConfig` object ready to be used by Auth.js.
 */
export default function default(config: EmailUserConfig): EmailConfig;
```

### Parameters

| Name   | Type          | Description |
|--------|---------------|-------------|
| `config` | `EmailUserConfig` | Configuration options for the SendGrid provider. This typically includes your SendGrid API key, the default “from” address, and any optional SendGrid settings. |

### Return Value

- **`EmailConfig`** – An object that conforms to Auth.js’s email provider interface. It contains the necessary methods (`sendVerificationRequest`, etc.) that Auth.js will invoke when it needs to send an email.

---

## Usage Example

Below is a minimal example of how to integrate the SendGrid provider into an Auth.js configuration. Replace the placeholder values with your actual SendGrid credentials.

```ts
// auth.ts
import { default as sendgridProvider } from '@auth/core/providers/sendgrid';
import { NextAuthOptions } from '@auth/core';

export const authOptions: NextAuthOptions = {
  providers: [
    // ...other providers
    sendgridProvider({
      apiKey: process.env.SENDGRID_API_KEY!,   // Your SendGrid API key
      from: 'no-reply@example.com',            // Default “from” address
      // Optional: you can add more SendGrid options here
    }),
  ],
  // ...other Auth.js options
};
```

```ts
// pages/api/auth/[...nextauth].ts (Next.js example)
import NextAuth from 'next-auth';
import { authOptions } from '@/lib/auth';

export default NextAuth(authOptions);
```

---

## Common Configuration Options

| Option | Type | Required | Description |
|--------|------|----------|-------------|
| `apiKey` | `string` | ✅ | Your SendGrid API key. |
| `from` | `string` | ✅ | The default “from” email address that will appear in outgoing emails. |
| `name` | `string` | ❌ | Optional display name for the “from” address. |
| `sendgridOptions` | `object` | ❌ | Any additional SendGrid SDK options you wish to pass through. |

---

## Troubleshooting

| Symptom | Likely Cause | Fix |
|---------|--------------|-----|
| Emails are not sent | Incorrect or missing `apiKey` | Verify that `process.env.SENDGRID_API_KEY` is set and valid. |
| “From” address appears incorrectly | `from` not set or invalid | Ensure the `from` field contains a verified SendGrid sender address. |
| Rate limiting errors | Too many requests | Check SendGrid’s rate limits and consider batching or throttling email sends. |

---

## Further Reading

- [Auth.js Email Provider API](https://authjs.dev/docs/providers/email)
- [SendGrid Node.js Library](https://github.com/sendgrid/sendgrid-nodejs)
- [SendGrid Email Sending Guide](https://docs.sendgrid.com/for-developers/sending-email)

---

**Author**: Auth.js Team  
**Version**: 2025‑09‑10  
**License**: MIT