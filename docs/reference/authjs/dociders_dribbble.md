# Dribbble Provider – Auth.js

The **Dribbble** provider allows you to add Dribbble OAuth authentication to your Auth.js application.

> **Note**  
> Auth.js assumes that the Dribbble provider follows the OAuth 2 specification.  
> If you encounter a bug in the default configuration, open an issue on the repository.

---

## DribbbleProfile

```ts
interface DribbbleProfile extends Record<string, any> {
  /** URL of the user’s avatar image */
  avatar_url: string;

  /** User’s email address */
  email: string;

  /** Dribbble user ID */
  id: number;

  /** User’s display name */
  name: string;
}
```

---

## Setup

### Callback URL

```
https://example.com/api/auth/callback/dribbble
```

### Configuration

```ts
import { Auth } from "@auth/core";
import Dribbble from "@auth/core/providers/dribbble";

const request = new Request(origin);

const response = await Auth(request, {
  providers: [
    Dribbble({
      clientId: DRIBBBLE_CLIENT_ID,
      clientSecret: DRIBBBLE_CLIENT_SECRET,
    }),
  ],
});
```

> **Tip** – If you need more advanced scopes, set the `scope` option to `"public upload"`.

---

## Resources

| Resource | Link |
|----------|------|
| Dribbble API | https://developer.dribbble.com/ |
| Dribbble OAuth | https://developer.dribbble.com/oauth/ |
| Dribbble Applications | https://dribbble.com/account/applications |

---

## Notes

- The provider comes with a default configuration.  
  To override defaults, refer to the [customizing a built‑in OAuth provider](#) guide.
- Auth.js strictly adheres to the OAuth 2 specification and cannot guarantee compliance with provider deviations.  
  If a non‑spec issue arises, we may not pursue a fix.

---

## Type Parameters

```ts
/**
 * @template P extends DribbbleProfile
 * @param {OAuthUserConfig<P> & { scope: "public" | "public upload" }} options
 * @returns {OAuthConfig<P>}
 */
function default<P>(options): OAuthConfig<P>
```

---

## Example

```ts
import { Auth } from "@auth/core";
import Dribbble from "@auth/core/providers/dribbble";

export async function POST(request: Request) {
  return await Auth(request, {
    providers: [
      Dribbble({
        clientId: process.env.DRIBBBLE_CLIENT_ID!,
        clientSecret: process.env.DRIBBBLE_CLIENT_SECRET!,
        scope: "public upload", // optional
      }),
    ],
  });
}
```

---