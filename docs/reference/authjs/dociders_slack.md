# Slack Provider – Auth.js

The Slack provider is a built‑in OAuth provider for Auth.js that follows the OpenID Connect specification.  
It exposes a rich user profile with many Slack‑specific fields.

> **Note**  
> Slack requires the redirect URL to use HTTPS, even for local development.  
> A common workaround is to use a tunneling service such as **ngrok** and set the `NEXTAUTH_URL` accordingly.

---

## 1.  Profile Type

```ts
export interface SlackProfile extends Record<string, any> {
  // Standard OpenID Connect fields
  sub: string;          // Subject (user ID)
  name: string;         // Full name
  picture: string;      // Profile picture URL
  email: string;        // Email address
  email_verified: boolean;
  locale: string;

  // Slack‑specific fields
  given_name: string;
  family_name: string;
  ok: boolean;

  // Team information
  "https://slack.com/team_domain": string;
  "https://slack.com/team_id": string;
  "https://slack.com/team_name": string;
  "https://slack.com/team_image_34": string;
  "https://slack.com/team_image_44": string;
  "https://slack.com/team_image_68": string;
  "https://slack.com/team_image_88": string;
  "https://slack.com/team_image_102": string;
  "https://slack.com/team_image_132": string;
  "https://slack.com/team_image_230": string;
  "https://slack.com/team_image_default": boolean;

  // User information
  "https://slack.com/user_id": string;
  "https://slack.com/user_image_24": string;
  "https://slack.com/user_image_32": string;
  "https://slack.com/user_image_48": string;
  "https://slack.com/user_image_72": string;
  "https://slack.com/user_image_1024": string;
  "https://slack.com/user_image_192": string;
  "https://slack.com/user_image_512": string;

  // Email verification timestamp
  date_email_verified: number;
}
```

---

## 2.  Default Configuration

```ts
import { default as Slack } from "@auth/core/providers/slack";

const provider = Slack({
  clientId: process.env.SLACK_CLIENT_ID!,
  clientSecret: process.env.SLACK_CLIENT_SECRET!,
});
```

The provider automatically uses the OpenID Connect endpoints provided by Slack.

---

## 3.  Setup

### 3.1  Callback URL

```
https://<your-domain>/api/auth/callback/slack
```

> **Tip**: If you’re running locally, use `https://<your-ngrok-subdomain>.ngrok.io/api/auth/callback/slack`.

### 3.2  Configuration Example

```ts
import { Auth } from "@auth/core";
import Slack from "@auth/core/providers/slack";

const request = new Request(origin);

const response = await Auth(request, {
  providers: [
    Slack({
      clientId: process.env.SLACK_CLIENT_ID!,
      clientSecret: process.env.SLACK_CLIENT_SECRET!,
    }),
  ],
});
```

---

## 4.  Customizing the Provider

If you need to override any of the default options (e.g., scopes, endpoints), pass an `OAuthUserConfig` object:

```ts
import Slack from "@auth/core/providers/slack";

const customSlack = Slack({
  clientId: process.env.SLACK_CLIENT_ID!,
  clientSecret: process.env.SLACK_CLIENT_SECRET!,
  // Example: request additional scopes
  authorization: {
    params: {
      scope: "openid profile email",
    },
  },
});
```

---

## 5.  Resources

- [Slack Authentication Documentation](https://api.slack.com/authentication)
- [Sign‑in with Slack](https://api.slack.com/authentication/sign-in)
- [Slack App Console](https://api.slack.com/apps)

---

## 6.  Notes & Troubleshooting

- **HTTPS Required** – Slack will reject any non‑HTTPS redirect URLs.  
- **OpenID Connect Compliance** – Auth.js strictly follows the spec; if Slack deviates, file an issue.  
- **Profile Fields** – The profile contains many Slack‑specific fields; you can access them directly from the `profile` object in callbacks.

---

## 7.  Type Parameters

```ts
/**
 * @template P extends SlackProfile
 * @param {OAuthUserConfig<P>} options
 * @returns {OAuthConfig<P>}
 */
function default<P>(options: OAuthUserConfig<P>): OAuthConfig<P>;
```

---

### Example: Using the Profile in a Callback

```ts
import { Auth } from "@auth/core";
import Slack from "@auth/core/providers/slack";

export default async function auth(req: Request) {
  return await Auth(req, {
    providers: [
      Slack({
        clientId: process.env.SLACK_CLIENT_ID!,
        clientSecret: process.env.SLACK_CLIENT_SECRET!,
      }),
    ],
    callbacks: {
      async session({ session, token, user }) {
        // Add Slack team name to the session
        session.teamName = token["https://slack.com/team_name"];
        return session;
      },
    },
  });
}
```

---

**Auth.js** © Balázs Orbán and Team – 2025  
[GitHub](https://github.com/authjs/authjs) | [NPM](https://www.npmjs.com/package/@auth/core) | [Discord](https://discord.gg/authjs)