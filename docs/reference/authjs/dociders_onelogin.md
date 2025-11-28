# OneLogin Provider – Auth.js

The OneLogin provider allows you to add OneLogin authentication to your Auth.js application.  
It follows the OpenID Connect specification and can be used with any framework that supports Auth.js.

---

## `default(config)`

```ts
import { Auth } from "@auth/core";
import OneLogin from "@auth/core/providers/onelogin";

const request = new Request(origin);
const response = await Auth(request, {
  providers: [
    OneLogin({
      clientId: ONELOGIN_CLIENT_ID,
      clientSecret: ONELOGIN_CLIENT_SECRET,
    }),
  ],
});
```

### Parameters

| Name | Type | Description |
|------|------|-------------|
| `config` | `OAuthUserConfig<Record<string, any>>` | Configuration options for the provider. |

### Returns

`OAuthConfig<Record<string, any>>`

---

## Setup

1. **Callback URL**  
   Register the following callback URL in your OneLogin application:

   ```
   https://example.com/api/auth/callback/onelogin
   ```

2. **Configuration**  
   ```ts
   import { Auth } from "@auth/core";
   import OneLogin from "@auth/core/providers/onelogin";

   const request = new Request(origin);
   const response = await Auth(request, {
     providers: [
       OneLogin({
         clientId: ONELOGIN_CLIENT_ID,
         clientSecret: ONELOGIN_CLIENT_SECRET,
       }),
     ],
   });
   ```

3. **Resources**  
   * [OneLogin OAuth documentation](https://developers.onelogin.com/oauth)

---

## Notes

* By default, Auth.js assumes that the OneLogin provider follows the OpenID Connect specification.
* The provider comes with a default configuration. To override defaults, see the section on customizing a built‑in OAuth provider.
* If you encounter a bug in the default configuration, open an issue. Auth.js adheres strictly to the spec and cannot guarantee compliance with provider deviations.

---

## Customizing the Provider

```ts
OneLogin({
  clientId: ONELOGIN_CLIENT_ID,
  clientSecret: ONELOGIN_CLIENT_SECRET,
  // Override any default options here
  // e.g., scopes, authorization parameters, etc.
});
```

---

**Disclaimer**  
Auth.js strictly follows the OpenID Connect specification. If a provider deviates from the spec, Auth.js may not resolve the issue. For non‑spec compliance problems, consider opening a discussion or issue.