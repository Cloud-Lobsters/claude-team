# Atlassian Provider – Auth.js

The Atlassian provider allows you to authenticate users via Atlassian OAuth 2.0 (3‑LO).  
It returns a user profile that extends `Record<string, any>` with the following fields:

| Property | Type   | Description                     |
|----------|--------|---------------------------------|
| `account_id` | `string` | The user’s Atlassian account ID |
| `email` | `string` | The user’s email address |
| `name` | `string` | The user’s display name |
| `picture` | `string` | URL of the user’s profile picture |

---

## Installation

```bash
npm i @auth/core
```

> **Note**  
> The provider is part of the core package, so no separate installation is required.

---

## Usage

```ts
import { initAuth } from "@auth/core";
import Atlassian from "@auth/core/providers/atlassian";

export default initAuth({
  providers: [
    Atlassian({
      clientId: process.env.AUTH_ATLASSIAN_ID!,
      clientSecret: process.env.AUTH_ATLASSIAN_SECRET!,
    }),
  ],
});
```

### Callback URL

```
https://example.com/api/auth/callback/atlassian
```

---

## Configuring Atlassian

1. **Open the Atlassian Developer Console**  
   From any page on `developer.atlassian.com`, click your profile icon → *Developer console*.

2. **Select or create an app**  
   Choose an existing app or create a new one.

3. **Configure OAuth 2.0 (3‑LO)**  
   * In the left menu, click **Authorization**.  
   * Next to **OAuth 2.0 (3LO)**, click **Configure** (or **Add** for a new app).  
   * Enter the callback URL:  
     ```
     https://{YOUR_DOMAIN}/api/auth/callback/atlassian
     ```
   * Click **Save changes**.

4. **Copy credentials**  
   * In the left menu, click **Settings**.  
   * Copy the **Client ID** and **Client Secret**.

5. **Add to your project**  
   Create a `.env` file in the project root:

   ```dotenv
   AUTH_ATLASSIAN_ID=<Client ID>
   AUTH_ATLASSIAN_SECRET=<Client Secret>
   ```

---

## Customizing the Provider

The Atlassian provider ships with sensible defaults.  
If you need to override any of those defaults, refer to the guide on [customizing built‑in OAuth providers](https://authjs.dev/guides/customizing-built-in-oauth-providers).

---

## Example: Full Auth.js Configuration

```ts
import { initAuth } from "@auth/core";
import Atlassian from "@auth/core/providers/atlassian";

export default initAuth({
  providers: [
    Atlassian({
      clientId: process.env.AUTH_ATLASSIAN_ID!,
      clientSecret: process.env.AUTH_ATLASSIAN_SECRET!,
      // Optional overrides
      // authorization: { params: { scope: "read" } },
    }),
  ],
  callbacks: {
    async profile(profile) {
      // You can manipulate the profile here if needed
      return profile;
    },
  },
});
```

---

## Troubleshooting

* **Non‑compliance with the OAuth spec** – Auth.js follows the spec strictly. If you encounter a provider‑specific issue, open an issue on GitHub.  
* **General help** – Ask questions in the Auth.js Discord community or open a discussion on GitHub.

---

## Resources

* [Atlassian OAuth 2.0 Documentation](https://developer.atlassian.com/cloud/jira/platform/oauth-2-0-apps/)
* [Auth.js Documentation](https://authjs.dev)

---