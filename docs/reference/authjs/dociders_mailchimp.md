# Mailchimp Provider – @auth/core

The **Mailchimp** provider lets you add Mailchimp OAuth login to your Auth.js application.  
It follows the standard OAuth 2 flow and is available as part of the `@auth/core` package.

---

## `default(config)`

```ts
import { default as Mailchimp } from "@auth/core/providers/mailchimp";
```

Creates a Mailchimp OAuth provider instance.

| Parameter | Type | Description |
|-----------|------|-------------|
| `config` | `OAuthUserConfig<Record<string, any>>` | Optional configuration overrides. |

| Returns | Type |
|---------|------|
| `OAuthConfig<Record<string, any>>` | The configured provider instance. |

---

## Setup

1. **Install the package**

   ```bash
   npm i @auth/core
   ```

2. **Add the provider to your Auth.js configuration**

   ```ts
   import { Auth } from "@auth/core";
   import Mailchimp from "@auth/core/providers/mailchimp";

   const request = new Request(origin);
   const response = await Auth(request, {
     providers: [
       Mailchimp({
         clientId: process.env.MAILCHIMP_CLIENT_ID!,
         clientSecret: process.env.MAILCHIMP_CLIENT_SECRET!,
       }),
     ],
   });
   ```

3. **Callback URL**

   The callback endpoint must be registered in your Mailchimp app settings:

   ```
   https://example.com/api/auth/callback/mailchimp
   ```

---

## Resources

- [Mailchimp OAuth documentation](https://developer.mailchimp.com/documentation/mailchimp/reference/oauth/)
- [Mailchimp API – Access user data](https://developer.mailchimp.com/documentation/mailchimp/reference/)

---

## Notes

- By default, Auth.js assumes the Mailchimp provider follows the OAuth 2 specification.
- The provider comes with sensible defaults. If you need to override any of them, refer to the “Customizing a built‑in OAuth provider” guide.
- If you encounter a bug in the default configuration, open an issue on GitHub.  
  Auth.js strictly adheres to the spec and cannot guarantee compliance with provider deviations.

---

## Example

```ts
import { Auth } from "@auth/core";
import Mailchimp from "@auth/core/providers/mailchimp";

const request = new Request("https://example.com");
const response = await Auth(request, {
  providers: [
    Mailchimp({
      clientId: process.env.MAILCHIMP_CLIENT_ID!,
      clientSecret: process.env.MAILCHIMP_CLIENT_SECRET!,
    }),
  ],
});
```

This snippet demonstrates how to integrate Mailchimp login into an Auth.js route. Replace the environment variables with your actual Mailchimp credentials.