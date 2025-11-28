# GitLab Provider – Auth.js

The **GitLab** provider is a built‑in OAuth 2.0 provider for Auth.js.  
It allows you to authenticate users via GitLab and retrieve their profile
information.

> **Note**  
> By default Auth.js assumes the provider follows the OAuth 2 specification.
> If you need the user’s email address on sign‑up, enable the `read_user`
> scope.

---

## 1.  Profile Shape

```ts
/**
 * GitLab user profile returned by the provider.
 */
export interface GitLabProfile extends Record<string, any> {
  avatar_url: string;
  bio: string;
  bot: boolean;
  can_create_group: boolean;
  can_create_project: boolean;
  color_scheme_id: number;
  commit_email: string;
  confirmed_at: string;
  created_at: string;
  current_sign_in_at: string;
  email: string;
  external: boolean;
  extra_shared_runners_minutes_limit: number;
  followers: number;
  following: number;
  id: number;
  identities: { extern_uid: string; provider: string }[];
  extern_uid: string;
  provider: string;
  job_title: string;
  last_activity_on: string;
  last_sign_in_at: string;
  linkedin: string;
  local_time: string;
  location?: string;
  name: string;
  organization: string;
  private_profile: boolean;
  projects_limit: number;
  pronouns: string;
  public_email: string;
  shared_runners_minutes_limit: number;
  skype: string;
  state: string;
  theme_id: number;
  twitter: string;
  two_factor_enabled: boolean;
  username: string;
  web_url: string;
  website_url: string;
  work_information?: string;
}
```

---

## 2.  Usage Example

```ts
import { Auth } from "@auth/core";
import GitLab from "@auth/core/providers/gitlab";

const request = new Request(origin);

const response = await Auth(request, {
  providers: [
    GitLab({
      clientId: GITLAB_CLIENT_ID,
      clientSecret: GITLAB_CLIENT_SECRET,
      // Optional: add scopes, e.g. read_user to get the email address
      // scope: "read_user",
    }),
  ],
});
```

**Callback URL**

```
https://example.com/api/auth/callback/gitlab
```

---

## 3.  Customizing the Provider

The provider can be customized by passing an `OAuthUserConfig` object:

```ts
GitLab({
  clientId: "...",
  clientSecret: "...",
  // Override any default options here
  // e.g. custom authorization URL, token URL, etc.
});
```

See the [OAuth provider customization guide](https://authjs.dev/docs/providers/custom) for details.

---

## 4.  Resources

- [GitLab OAuth documentation](https://docs.gitlab.com/ee/integration/oauth_provider.html)

---

## 5.  Type Parameters

| Type Parameter | Description |
|----------------|-------------|
| `P extends GitLabProfile` | The shape of the user profile returned by GitLab. |

---

## 6.  API Reference

```ts
/**
 * Adds GitLab login to your Auth.js configuration.
 *
 * @param options - OAuth user configuration for GitLab.
 * @returns OAuth configuration for the provider.
 */
function default<P>(options: OAuthUserConfig<P>): OAuthConfig<P>
```

---

### Example: Full Configuration

```ts
import { Auth } from "@auth/core";
import GitLab from "@auth/core/providers/gitlab";

export default async function auth(req: Request) {
  return await Auth(req, {
    providers: [
      GitLab({
        clientId: process.env.GITLAB_CLIENT_ID!,
        clientSecret: process.env.GITLAB_CLIENT_SECRET!,
        // Optional: add scopes
        scope: "read_user",
      }),
    ],
  });
}
```

---

**Disclaimer**  
Auth.js strictly follows the OAuth 2 specification. If you encounter a
non‑compliant provider behavior, open an issue or discuss it in the
community. The team may not pursue fixes for spec violations.