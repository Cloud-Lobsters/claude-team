# ClickUp Provider – Auth.js

The **ClickUp** provider allows you to add ClickUp OAuth 2.0 authentication to your Auth.js application.  
It follows the standard OAuth 2.0 flow and returns a user profile with the following shape:

```ts
interface ClickUpProfile {
  color: string;
  id: number;
  profilePicture: string;
  username: string;
}
```

---

## Properties

| Property | Type   | Description |
|----------|--------|-------------|
| `color`          | `string` | User’s profile color. |
| `id`             | `number` | Unique ClickUp user ID. |
| `profilePicture` | `string` | URL to the user’s avatar. |
| `username`       | `string` | User’s ClickUp username. |

---

## Setup

### 1. Install Auth.js

```bash
npm i @auth/core
```

### 2. Add the ClickUp provider

```ts
import { Auth } from "@auth/core";
import ClickUp from "@auth/core/providers/click-up";

const request = new Request(origin);
const response = await Auth(request, {
  providers: [
    ClickUp({
      clientId: process.env.CLICKUP_CLIENT_ID,
      clientSecret: process.env.CLICKUP_CLIENT_SECRET,
    }),
  ],
});
```

> **Callback URL** – The URL that ClickUp will redirect to after authentication.  
> Example: `https://example.com/api/auth/callback/clickup`

---

## Example

```ts
// pages/api/auth/[...nextauth].ts
import NextAuth from "next-auth";
import ClickUp from "@auth/core/providers/click-up";

export default NextAuth({
  providers: [
    ClickUp({
      clientId: process.env.CLICKUP_CLIENT_ID!,
      clientSecret: process.env.CLICKUP_CLIENT_SECRET!,
    }),
  ],
});
```

After a successful login, the session will contain:

```ts
{
  user: {
    color: "blue",
    id: 123456,
    profilePicture: "https://example.com/avatar.png",
    username: "johndoe",
  },
  // ...other session data
}
```

---

## Configuration

```ts
import { OAuthUserConfig } from "@auth/core/providers";

export default function ClickUp(
  config: OAuthUserConfig<ClickUpProfile>
): OAuthConfig<ClickUpProfile> {
  // default implementation – see source for details
}
```

> The provider uses the standard OAuth 2.0 endpoints.  
> If you need to customize any defaults (e.g., scopes, endpoints), refer to the *Customizing a Built‑in OAuth Provider* guide.

---

## Notes

- Auth.js assumes the ClickUp provider follows the OAuth 2.0 specification.  
- If you encounter a bug in the default configuration, open an issue on the repository.  
- Auth.js does not guarantee compliance with any provider‑specific deviations from the spec.

---

## Resources

- [ClickUp OAuth Documentation](https://clickup.com/api)  
- [Auth.js Source Code](https://github.com/authjs/authjs)  
- [Customizing a Built‑in OAuth Provider](https://authjs.dev/guides/customizing-oauth)

---