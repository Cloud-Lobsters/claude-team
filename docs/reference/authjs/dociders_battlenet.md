# BattleNet Provider – Auth.js

The **BattleNet** provider lets you add Battle.net authentication to your Auth.js application.  
It follows the OAuth 2.0 specification and is fully type‑safe with TypeScript.

> **Note**  
> The provider is available in the `@auth/core/providers/battlenet` module.

---

## 1. Types

```ts
// Profile returned by the provider
export interface BattleNetProfile extends Record<string, any> {
  /** Battle.net tag (e.g., “Player#1234”) */
  battle_tag: string;
  /** User’s unique identifier */
  sub: string;
}

// Supported issuer URLs (one per region)
export type BattleNetIssuer =
  | "https://oauth.battle.net"
  | "https://oauth.battlenet.com.cn"
  | "https://www.battlenet.com.cn/oauth"
  | `https://${"us" | "eu" | "kr" | "tw"}.battle.net/oauth`;
```

---

## 2. Default Configuration

```ts
import { default as BattleNet } from "@auth/core/providers/battlenet";

const provider = BattleNet({
  clientId: "<YOUR_CLIENT_ID>",
  clientSecret: "<YOUR_CLIENT_SECRET>",
  issuer: "<YOUR_ISSUER>", // must be one of the BattleNetIssuer values
});
```

The provider automatically sets the correct OAuth endpoints based on the `issuer`.

---

## 3. Setup

1. **Callback URL**  
   Register the following callback URL in your Battle.net developer portal:

   ```
   https://<your-domain>/api/auth/callback/battlenet
   ```

2. **Configuration in Auth.js**

   ```ts
   import { Auth } from "@auth/core";
   import BattleNet from "@auth/core/providers/battlenet";

   const request = new Request("<YOUR_REQUEST_URL>");
   const response = await Auth(request, {
     providers: [
       BattleNet({
         clientId: process.env.BATTLENET_CLIENT_ID!,
         clientSecret: process.env.BATTLENET_CLIENT_SECRET!,
         issuer: process.env.BATTLENET_ISSUER!, // e.g., "https://us.battle.net/oauth"
       }),
     ],
   });
   ```

   Replace the environment variables with your actual credentials.

---

## 4. Customizing the Provider

If you need to override any default options (e.g., scopes, custom endpoints), pass an `OAuthUserConfig` object:

```ts
import { OAuthUserConfig } from "@auth/core/providers/oauth";

const customProvider: OAuthConfig<BattleNetProfile> = BattleNet({
  clientId: "...",
  clientSecret: "...",
  issuer: "...",
  // Custom scopes
  scope: "profile email",
  // Custom authorization endpoint
  authorization: "https://custom.oauth.battle.net/authorize",
});
```

---

## 5. Resources

- [BattleNet OAuth Documentation](https://dev.battle.net/documentation/oauth)
- [Auth.js GitHub Repository](https://github.com/authjs/authjs)

---

## 6. Disclaimer

Auth.js strictly follows the OAuth 2.0 specification. If you encounter a non‑compliant behavior from Battle.net, open an issue on the Auth.js GitHub repository. The maintainers will investigate but may not pursue a fix if the provider is non‑compliant with the spec. For general help, join the Auth.js Discord community.