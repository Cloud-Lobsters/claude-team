# @auth/core – Mailgun Provider

The **Mailgun** provider allows you to add email‑based authentication to your Auth.js application.  
Below is a concise, sanitized reference that includes all the essential information and examples.

---

## 1. Installation

```bash
npm install @auth/core @auth/core/providers/mailgun
# or
yarn add @auth/core @auth/core/providers/mailgun
```

---

## 2. Usage

```ts
import { Auth } from "@auth/core";
import Mailgun from "@auth/core/providers/mailgun";

const request = new Request(origin);

const response = await Auth(request, {
  providers: [
    Mailgun({
      from: MAILGUN_DOMAIN,   // e.g. "no-reply@example.com"
      region: "EU",           // optional: "US" | "EU"
    }),
  ],
});
```

> **Note**  
> `MAILGUN_DOMAIN` should be the domain you have configured in your Mailgun account.

---

## 3. API Reference

### `Mailgun(config)`

Creates a Mailgun authentication provider.

| Parameter | Type | Description |
|-----------|------|-------------|
| `config` | `EmailUserConfig & { region: "US" | "EU" }` | Configuration object for the provider. |

#### Returns

`EmailConfig` – the provider configuration that can be passed to `Auth`.

---

## 4. Configuration Options

| Option | Type | Required | Description |
|--------|------|----------|-------------|
| `from` | `string` | ✅ | The email address that will appear as the sender of the authentication emails. |
| `region` | `"US" \| "EU"` | ❌ | Optional. Specifies the Mailgun region. Defaults to `"US"`. |

---

## 5. Resources

- [Mailgun Documentation](https://documentation.mailgun.com/)
- [Auth.js GitHub Repository](https://github.com/authjs/authjs)

---

## 6. Disclaimer

Auth.js strictly adheres to the specification and cannot be held responsible for any deviations by the provider. If you encounter a bug or non‑compliance issue, please open an issue on the GitHub repository. For non‑spec related questions, feel free to join the Discord community or open a discussion.

---