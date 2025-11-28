# Auth.js – WeChat Provider

The **WeChat** provider allows you to add WeChat login to your application and to make authenticated requests to the WeChat API.

> **Note**  
> The provider comes with a default configuration. If you need to override any defaults, refer to the *Customizing a Built‑in OAuth Provider* guide.

---

## 1. `WeChatProfile`

The profile object returned by the provider contains the following properties:

| Property | Type | Description |
|----------|------|-------------|
| `city` | `string` | User’s city |
| `country` | `string` | User’s country |
| `headimgurl` | `string` | URL of the user’s avatar |
| `nickname` | `string` | User’s nickname |
| `openid` | `string` | Unique identifier for the user |
| `privilege` | `string[]` | List of privileges granted to the user |
| `province` | `string` | User’s province |
| `sex` | `number` | User’s gender (`1` = male, `2` = female, `0` = unknown) |
| `unionid` | `string` | Unique identifier across all WeChat apps (if available) |
| `[claim: string]` | `unknown` | Any additional claims returned by WeChat |

---

## 2. `default(options)`

```ts
function default(options): OAuthConfig<WeChatProfile>
```

Creates a default OAuth configuration for the WeChat provider.  
Use this function when you want to customize the provider beyond the built‑in defaults.

---

## 3. Setup

### 3.1 Callback URL

```
https://example.com/api/auth/callback/wechat
```

Make sure this URL is registered in your WeChat developer console.

### 3.2 Configuration

```ts
import { Auth } from "@auth/core";
import WeChat from "@auth/core/providers/wechat";

const request = new Request(origin);

const response = await Auth(request, {
  providers: [
    WeChat({
      clientId: AUTH_WECHAT_APP_ID,
      clientSecret: AUTH_WECHAT_APP_SECRET,
      platformType: "OfficialAccount", // or "WebsiteApp"
    }),
  ],
});
```

> Replace `AUTH_WECHAT_APP_ID` and `AUTH_WECHAT_APP_SECRET` with your actual credentials.

---

## 4. Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `options` | `OAuthUserConfig<WeChatProfile> & { platformType: "OfficialAccount" | "WebsiteApp" }` | Configuration options for the provider. |

---

## 5. Returns

`OAuthConfig<WeChatProfile>`

---

## 6. Resources

- **WeChat Official Account** – [Documentation](https://developers.weixin.qq.com/doc/offiaccount/Basic_Information/Access_Overview.html)
- **WeChat Official Account – Webpage Authorization** – [Guide](https://developers.weixin.qq.com/doc/offiaccount/OA_Web_Apps/Wechat_webpage_login.html)
- **WeChat Official Account Test Account** – [Setup](https://developers.weixin.qq.com/doc/offiaccount/Basic_Information/Testing.html)
- **WeChat WebsiteApp Login** – [Guide](https://developers.weixin.qq.com/doc/offiaccount/OA_Web_Apps/WebsiteApp_login.html)

---

## 7. Example: Full Integration

```ts
// auth.ts
import { Auth } from "@auth/core";
import WeChat from "@auth/core/providers/wechat";

export async function authHandler(request: Request) {
  return await Auth(request, {
    providers: [
      WeChat({
        clientId: process.env.AUTH_WECHAT_APP_ID!,
        clientSecret: process.env.AUTH_WECHAT_APP_SECRET!,
        platformType: "OfficialAccount",
      }),
    ],
  });
}
```

```ts
// pages/api/auth/[...nextauth].ts
import { authHandler } from "@/lib/auth";

export default authHandler;
```

```ts
// pages/login.tsx
import { signIn, signOut, useSession } from "next-auth/react";

export default function LoginPage() {
  const { data: session } = useSession();

  return (
    <div>
      {session ? (
        <>
          <p>Signed in as {session.user?.name}</p>
          <button onClick={() => signOut()}>Sign out</button>
        </>
      ) : (
        <button onClick={() => signIn("wechat")}>Sign in with WeChat</button>
      )}
    </div>
  );
}
```

---

## 8. Disclaimer

Auth.js strictly adheres to the OAuth 2.0 specification. If you encounter a bug in the default configuration, open an issue. For non‑compliance with the spec, we may not pursue a resolution. Feel free to ask for help in the Discussions channel.