# Mailru Provider – Auth.js

The **Mailru** provider allows you to add Mailru login to your Auth.js application.  
Below is a concise, sanitized reference that keeps all examples and key information.

---

## `default(config)`

```ts
function default(config: OAuthUserConfig<Record<string, any>>): OAuthConfig<Record<string, any>>
```

Creates a Mailru OAuth provider instance.  
By default, Auth.js assumes the provider follows the OAuth 2 specification.

---

## Setup

### Callback URL

```
https://example.com/api/auth/callback/mailru
```

> **Note:** Replace `example.com` with your own domain.

### Configuration Example

```ts
import { Auth } from "@auth/core";
import Mailru from "@auth/core/providers/mailru";

const request = new Request(origin);

const response = await Auth(request, {
  providers: [
    Mailru({
      clientId:   MAILRU_CLIENT_ID,
      clientSecret: MAILRU_CLIENT_SECRET,
    }),
  ],
});
```

> **Tip:**  
> The provider comes with a default configuration. If you need to override any defaults, refer to the *Customizing a Built‑in OAuth Provider* guide.

---

## Resources

| Resource | Link |
|----------|------|
| Mailru OAuth documentation | https://api.mail.ru/dev |
| Mailru app console | https://api.mail.ru/apps |

---

## Notes

* Auth.js strictly follows the OAuth 2 specification.  
* If you encounter a bug in the default configuration, open an issue.  
* For non‑compliance with the spec, we may not pursue a resolution.

---

## Parameters

| Name | Type | Description |
|------|------|-------------|
| `config` | `OAuthUserConfig<Record<string, any>>` | Custom configuration options for the provider. |

---

## Returns

`OAuthConfig<Record<string, any>>` – The configured Mailru provider instance.

---