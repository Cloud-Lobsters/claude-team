# United Effects Provider – Auth.js

The **United Effects** provider is a built‑in OAuth/OIDC provider for Auth.js.  
It follows the OpenID Connect specification and returns a `UnitedEffectsProfile` object.

> **Note**  
> The United Effects API does **not** expose the user’s name or image.  
> Consequently, the provider will return `null` for both fields.

---

## Profile Shape

```ts
export interface UnitedEffectsProfile extends Record<string, any> {
  /** User’s email address */
  email: string;

  /** User’s unique identifier */
  sub: string;
}
```

---

## Default Configuration

Auth.js assumes the provider is an OIDC endpoint.  
The default `issuer` must be the fully‑qualified URL that includes your Auth Group ID, e.g.:

```
https://auth.unitedeffects.com/YQpbQV5dbW-224dCovz-3
```

---

## Setup

### Callback URL

```
https://example.com/api/auth/callback/united-effects
```

### Configuration Example

```ts
import { Auth } from "@auth/core";
import UnitedEffects from "@auth/core/providers/united-effects";

const request = new Request(origin);

const response = await Auth(request, {
  providers: [
    UnitedEffects({
      clientId: UE_CLIENT_ID,
      clientSecret: UE_CLIENT_SECRET,
    }),
  ],
});
```

> Replace `UE_CLIENT_ID` and `UE_CLIENT_SECRET` with your credentials.

---

## Resources

- [UnitedEffects Auth.js documentation](https://authjs.dev/docs/providers/united-effects)

---

## Customization

The provider comes with a default configuration.  
To override defaults, refer to the guide on [customizing a built‑in OAuth provider](https://authjs.dev/docs/providers/customizing).

---

## Type Parameters

```ts
/**
 * @template P - Extends UnitedEffectsProfile
 */
function default<P>(options: OAuthUserConfig<P> & { issuer: string }): OAuthConfig<P>
```

---

## Notes

- Auth.js strictly follows the OIDC spec; it does not guarantee compliance with provider deviations.  
- If you encounter a bug in the default configuration, open an issue on the repository.  
- For non‑spec compliance issues, the maintainers may not pursue a fix.  
- For additional help, join the Auth.js Discord community or start a discussion.

---