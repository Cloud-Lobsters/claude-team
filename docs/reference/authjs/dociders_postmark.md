## Postmark Provider – `@auth/core/providers/postmark`

The Postmark provider is a lightweight wrapper that allows Auth.js to send e‑mail messages through the Postmark service.  
It exposes a single factory function, `default`, which accepts a configuration object and returns an `EmailConfig` instance that can be used by Auth.js’ email‑sending logic.

---

### `default(config)`

```ts
function default(config: EmailUserConfig): EmailConfig
```

Creates and returns a Postmark email provider.

#### Parameters

| Name   | Type            | Description |
|--------|-----------------|-------------|
| `config` | `EmailUserConfig` | Configuration options for the Postmark provider. The object typically contains the Postmark API key and the default “from” address. |

#### Returns

`EmailConfig` – An object that implements the `EmailConfig` interface, ready to be passed to Auth.js’ email‑sending pipeline.

---

> **Note**  
> The provider is intentionally minimal; it only forwards the supplied configuration to the underlying Postmark client. All other email‑sending logic (templating, error handling, etc.) is handled by Auth.js itself.

---

### Usage

```ts
import { default as postmarkProvider } from '@auth/core/providers/postmark';

const provider = postmarkProvider({
  apiKey: process.env.POSTMARK_API_KEY,
  from: 'no-reply@example.com',
});
```

*(No additional examples are provided in the original documentation.)*