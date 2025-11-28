# Kinde Provider – Auth.js

The **Kinde** provider is a built‑in OAuth/OIDC provider for Auth.js.  
It returns a user profile that conforms to the `KindeProfile` interface.

---

## `KindeProfile`

```ts
interface KindeProfile extends Record<string, any> {
  /** The user’s given name. */
  first_name: string;

  /** The user’s unique identifier. */
  id: string;

  /** The user’s family name. */
  last_name: string;

  /** URL pointing to the user’s profile picture. */
  picture: string;

  /** The user’s email address. */
  preferred_email: string;

  /** The user’s identifier from a previous system. */
  provided_id: string;

  /** The user’s username. */
  username: string;
}
```

---

## Default Configuration

```ts
function default(config: OIDCUserConfig<KindeProfile>): OIDCConfig<KindeProfile>
```

The provider ships with a sensible default configuration.  
If you need to override any of the defaults, refer to the *Customizing a Built‑in OAuth Provider* guide.

---

## Setup

### Callback URL

```
https://example.com/api/auth/callback/kinde
```

### Configuration Example

```ts
import { Auth } from "@auth/core";
import Kinde from "@auth/core/providers/kinde";

const request = new Request(origin);

const response = await Auth(request, {
  providers: [
    Kinde({
      clientId: KINDE_CLIENT_ID,
      clientSecret: KINDE_CLIENT_SECRET,
      issuer: KINDE_DOMAIN,
    }),
  ],
});
```

> **Tip** – Replace `KINDE_CLIENT_ID`, `KINDE_CLIENT_SECRET`, and `KINDE_DOMAIN` with the values from your Kinde dashboard.

---

## Resources

- [Kinde Documentation](https://kinde.com/docs)
- [Customizing a Built‑in OAuth Provider](https://authjs.dev/docs/providers/customizing)

---

## Notes

- The Kinde provider includes a default configuration.  
  To override defaults, consult the customization guide above.
- Auth.js strictly follows the OIDC specification.  
  If you encounter a non‑compliant behavior, open an issue on GitHub.  
  For spec‑related bugs, the maintainers may not pursue a fix.

---

## Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `config` | `OIDCUserConfig<KindeProfile>` | Configuration options for the provider. |

---

## Returns

`OIDCConfig<KindeProfile>` – The fully configured provider instance.

---