# Todoist Provider – Auth.js

The **Todoist** provider allows you to add Todoist OAuth 2 authentication to your Auth.js application.

> **Note**  
> Auth.js assumes the provider follows the OAuth 2 specification. If you encounter a non‑compliant behaviour, open an issue on the repository.

---

## 1. Installation

```bash
npm i @auth/core @auth/core/providers/todoist
```

---

## 2. Setup

### 2.1 Callback URL

Register the following callback URL in your Todoist app settings:

```
https://example.com/api/auth/callback/todoist
```

### 2.2 Configuration

```ts
import { Auth } from "@auth/core";
import Todoist from "@auth/core/providers/todoist";

const request = new Request(origin);

const response = await Auth(request, {
  providers: [
    Todoist({
      clientId: TODOIST_CLIENT_ID,
      clientSecret: TODOIST_CLIENT_SECRET,
    }),
  ],
});
```

Replace `TODOIST_CLIENT_ID` and `TODOIST_CLIENT_SECRET` with the credentials you obtained from the Todoist developer portal.

---

## 3. API Reference

```ts
/**
 * Adds Todoist login to your page.
 *
 * @param options - OAuth configuration options.
 * @returns OAuth configuration for the provider.
 */
function default<P>(options: OAuthUserConfig<P>): OAuthConfig<P>
```

### 3.1 Type Parameters

| Type Parameter | Description |
|----------------|-------------|
| `P` | Extends `TodoistProfile` – the shape of the user profile returned by Todoist. |

### 3.2 Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `options` | `OAuthUserConfig<P>` | Configuration options for the provider. |

### 3.3 Returns

| Return Type | Description |
|-------------|-------------|
| `OAuthConfig<P>` | The configured OAuth provider instance. |

---

## 4. Resources

- [Todoist OAuth Documentation](https://developer.todoist.com/oauth/)
- [Todoist Configuration Guide](https://developer.todoist.com/oauth/#configuration)

---

## 5. Customizing the Provider

The provider comes with sensible defaults. To override any of these defaults, refer to the [Customizing a Built‑in OAuth Provider](https://authjs.dev/docs/providers/customizing) guide.

---

## 6. Troubleshooting

- **Non‑compliant provider behavior** – Open an issue on the Auth.js GitHub repository.  
- **General help** – Ask in the Auth.js Discord community or open a discussion.

---

## 7. License

Auth.js © Balázs Orbán and Team – 2025. All rights reserved.