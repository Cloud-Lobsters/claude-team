# Naver Provider – Auth.js

The **Naver** provider is a built‑in OAuth 2.0 integration for Auth.js.  
It allows you to authenticate users via Naver’s login service.

> **Note** – The provider follows the OAuth 2 specification.  
> If you encounter a bug in the default configuration, open an issue on the Auth.js repository.

---

## 1. Overview

```ts
import { Auth } from "@auth/core";
import Naver from "@auth/core/providers/naver";
```

- **Name**: `naver`
- **Type**: OAuth 2.0
- **Default configuration**: Provided by Auth.js; can be overridden with `customizeProvider`.

---

## 2. `NaverProfile` Type

```ts
export interface NaverProfile extends Record<string, any> {
  // Required
  id: string;

  // Optional
  message?: string;
  resultcode: string;

  // Optional profile fields
  age?: string;
  birthday?: string;
  birthyear?: string;
  email?: string;
  gender?: "F" | "M" | "U";
  mobile?: string;
  name?: string;
  nickname?: string;
  profile_image?: string;

  // Full response object
  response?: {
    age: string;
    birthday: string;
    birthyear: string;
    email: string;
    gender: "F" | "M" | "U";
    id: string;
    mobile: string;
    name: string;
    nickname: string;
    profile_image: string;
  };
}
```

---

## 3. Setup

### 3.1 Callback URL

```
https://example.com/api/auth/callback/naver
```

> Replace `example.com` with your domain.

### 3.2 Configuration

```ts
import { Auth } from "@auth/core";
import Naver from "@auth/core/providers/naver";

const request = new Request(origin);
const response = await Auth(request, {
  providers: [
    Naver({
      clientId: NAVER_CLIENT_ID,
      clientSecret: NAVER_CLIENT_SECRET,
    }),
  ],
});
```

- `NAVER_CLIENT_ID` – Your Naver application client ID.
- `NAVER_CLIENT_SECRET` – Your Naver application client secret.

---

## 4. Customizing the Provider

If you need to override any default options, use the `customizeProvider` helper:

```ts
import { customizeProvider } from "@auth/core/providers";

const CustomNaver = customizeProvider(Naver, {
  // Override any default options here
});
```

---

## 5. Resources

- [Naver OAuth Documentation](https://developers.naver.com/docs/login/profile/profile.md)
- [Naver OAuth Documentation (2)](https://developers.naver.com/docs/login/profile/profile.md)

---

## 6. Notes

- Auth.js assumes the Naver provider follows OAuth 2.0.  
- The provider’s default configuration is fully documented; you can adjust it as needed.  
- For non‑compliance issues, open an issue or ask in the Auth.js Discussions.

---

## 7. Example Usage

```ts
import { Auth } from "@auth/core";
import Naver from "@auth/core/providers/naver";

export async function POST(request: Request) {
  return await Auth(request, {
    providers: [
      Naver({
        clientId: process.env.NAVER_CLIENT_ID!,
        clientSecret: process.env.NAVER_CLIENT_SECRET!,
      }),
    ],
  });
}
```

This example demonstrates a minimal API route that initiates the Naver OAuth flow.

---