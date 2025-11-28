# LINE Provider – Auth.js

The LINE provider allows you to add LINE login to your application using Auth.js.  
It follows the OpenID Connect specification and returns a `LineProfile` object that contains the user’s profile information.

---

## `LineProfile`

```ts
interface LineProfile extends Record<string, any> {
  /** Authentication methods used */
  amr: string[];

  /** Audience (client ID) */
  aud: string;

  /** Expiration time (Unix timestamp) */
  exp: number;

  /** Issued at time (Unix timestamp) */
  iat: number;

  /** Issuer */
  iss: string;

  /** User’s display name */
  name: string;

  /** URL of the user’s profile picture */
  picture: string;

  /** Subject (unique user ID) */
  sub: string;

  /** Raw user object returned by LINE */
  user: any;
}
```

---

## Usage

### 1. Install Auth.js

```bash
npm i @auth/core
```

### 2. Create a provider

```ts
import { Auth } from "@auth/core";
import LINE from "@auth/core/providers/line";

const request = new Request(origin);

const response = await Auth(request, {
  providers: [
    LINE({
      clientId: process.env.LINE_CLIENT_ID!,
      clientSecret: process.env.LINE_CLIENT_SECRET!,
    }),
  ],
});
```

### 3. Callback URL

Set the callback URL in your LINE developer console to:

```
https://example.com/api/auth/callback/line
```

> **Tip** – During local development you can use:
> ```
> http://localhost:3000/api/auth/callback/line
> ```

### 4. Enabling Email Address (Optional)

If you need the user’s email address:

1. Open the LINE Developer Console.
2. Go to your Login Channel → **OpenID Connect** → **Email address permission**.
3. Click **Apply** and follow the instructions.

---

## Customizing the Provider

The LINE provider comes with a default configuration.  
To override defaults, refer to the [customizing a built‑in OAuth provider](https://authjs.dev/docs/providers/custom) guide.

---

## Notes

- Auth.js assumes the LINE provider follows the OpenID Connect spec.
- If you encounter a bug in the default configuration, open an issue on GitHub.
- Auth.js does not guarantee compliance with provider deviations from the spec.

---

## Example

```ts
import { Auth } from "@auth/core";
import LINE from "@auth/core/providers/line";

export async function GET(request: Request) {
  return await Auth(request, {
    providers: [
      LINE({
        clientId: process.env.LINE_CLIENT_ID!,
        clientSecret: process.env.LINE_CLIENT_SECRET!,
      }),
    ],
  });
}
```

---

## Resources

- [LINE Login Documentation](https://developers.line.biz/en/docs/line-login/)
- [LINE App Console](https://developers.line.biz/console/)

---