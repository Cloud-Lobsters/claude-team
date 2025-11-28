# ForwardEmail Provider – Auth.js

The **ForwardEmail** provider is part of the Auth.js ecosystem and lets you authenticate users via email using the Forward Email service.  
It is exported as the default function from `@auth/core/providers/forwardemail`.

---

## Function: `default(config)`

```ts
import forwardEmail from '@auth/core/providers/forwardemail';

const provider = forwardEmail({
  // your configuration here
});
```

### Description
Creates an `EmailConfig` object that can be passed to Auth.js (e.g., NextAuth) to enable email‑based authentication through Forward Email.

### Parameters

| Name   | Type              | Description |
|--------|-------------------|-------------|
| `config` | `EmailUserConfig` | Configuration options for the ForwardEmail provider. |

> **Note**: `EmailUserConfig` is the type that contains any provider‑specific settings (e.g., domain, API key, etc.). Refer to the Auth.js type definitions for the exact shape.

### Returns

`EmailConfig` – The configured email provider instance ready to be used in your Auth.js setup.

---

## Example

```ts
import forwardEmail from '@auth/core/providers/forwardemail';

const provider = forwardEmail({
  // Example configuration (replace with your actual values)
  domain: 'example.com',
  apiKey: 'YOUR_FORWARD_EMAIL_API_KEY',
});
```

> *The example above demonstrates how to instantiate the provider with typical configuration options. Adjust the fields to match your Forward Email account settings.*

---

### Further Reading

- [Auth.js Documentation](https://authjs.dev/)
- [Forward Email Service](https://forwardemail.net/)

---