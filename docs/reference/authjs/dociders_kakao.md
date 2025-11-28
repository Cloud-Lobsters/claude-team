# Kakao Provider – Auth.js

The Kakao provider is a built‑in OAuth provider for Auth.js.  
It follows the OAuth 2 specification and returns a `KakaoProfile` object that
contains the user’s Kakao profile data.

> **Note**  
> The provider is available in the `@auth/core/providers/kakao` module.

---

## 1. Types

### 1.1 `KakaoProfile`

```ts
export interface KakaoProfile extends Record<string, any> {
  // Optional top‑level fields
  connected_at?: string;
  has_signed_up?: boolean;
  id: number;
  kakao_account?: {
    age_range: AgeRange;
    age_range_needs_agreement: boolean;
    birthday: string;
    birthday_needs_agreement: boolean;
    birthday_type: Birthday;
    birthyear: string;
    birthyear_needs_agreement: boolean;
    ci: string;
    ci_authenticated_at: string;
    ci_needs_agreement: boolean;
    email: string;
    email_needs_agreement: boolean;
    gender: Gender;
    gender_needs_agreement: boolean;
    is_email_valid: boolean;
    is_email_verified: boolean;
    name: string;
    name_needs_agreement: boolean;
    phone_number: string;
    phone_number_needs_agreement: boolean;
    profile: {
      is_default_image: boolean;
      nickname: string;
      profile_image_url: string;
      thumbnail_image_url: string;
    };
    profile_image_needs_agreement: boolean;
    profile_needs_agreement: boolean;
    profile_nickname_needs_agreement: boolean;
  };
  age_range?: AgeRange;
  age_range_needs_agreement?: boolean;
  birthday?: string;
  birthday_needs_agreement?: boolean;
  birthday_type?: Birthday;
  birthyear?: string;
  birthyear_needs_agreement?: boolean;
  ci?: string;
  ci_authenticated_at?: string;
  ci_needs_agreement?: boolean;
  email?: string;
  email_needs_agreement?: boolean;
  gender?: Gender;
  gender_needs_agreement?: boolean;
  is_email_valid?: boolean;
  is_email_verified?: boolean;
  name?: string;
  name_needs_agreement?: boolean;
  phone_number?: string;
  phone_number_needs_agreement?: boolean;
  profile?: {
    is_default_image: boolean;
    nickname: string;
    profile_image_url: string;
    thumbnail_image_url: string;
  };
  profile_image_needs_agreement?: boolean;
  profile_needs_agreement?: boolean;
  profile_nickname_needs_agreement?: boolean;
  properties?: {
    id: string;
    msg_blocked: boolean;
    nickname: string;
    profile_image: string;
    registered_at: string;
    status: string;
    thumbnail_image: string;
  };
  id?: string;
  msg_blocked?: boolean;
  nickname?: string;
  profile_image?: string;
  registered_at?: string;
  status?: string;
  thumbnail_image?: string;
  synched_at?: string;
}
```

### 1.2 `AgeRange`

```ts
export type AgeRange =
  | "1-9"
  | "10-14"
  | "15-19"
  | "20-29"
  | "30-39"
  | "40-49"
  | "50-59"
  | "60-69"
  | "70-79"
  | "80-89"
  | "90-";
```

### 1.3 `Birthday`

```ts
export type Birthday = "SOLAR" | "LUNAR";
```

### 1.4 `Gender`

```ts
export type Gender = "female" | "male";
```

---

## 2. Provider Function

```ts
import Kakao from "@auth/core/providers/kakao";

export default function default<P>(options: OAuthUserConfig<P>): OAuthConfig<P>;
```

> **Generic** – `P` extends `KakaoProfile`.  
> The function returns an `OAuthConfig<P>` that can be passed to `Auth()`.

---

## 3. Setup

### 3.1 Callback URL

```
https://example.com/api/auth/callback/kakao
```

> Replace `example.com` with your domain.  
> For local development: `http://localhost:3000/api/auth/callback/kakao`.

### 3.2 Configuration Example

```ts
import { Auth } from "@auth/core";
import Kakao from "@auth/core/providers/kakao";

const request = new Request(origin);

const response = await Auth(request, {
  providers: [
    Kakao({
      clientId: KAKAO_CLIENT_ID,
      clientSecret: KAKAO_CLIENT_SECRET,
    }),
  ],
});
```

> `KAKAO_CLIENT_ID` and `KAKAO_CLIENT_SECRET` are obtained from the Kakao
> developer console.

---

## 4. Resources

- [Kakao OAuth Documentation](https://developers.kakao.com/docs/latest/ko/kakaologin/rest-api#req-user-info)
- [Kakao OAuth Configuration](https://developers.kakao.com/console/app)

---

## 5. Notes

1. **OAuth 2** – Auth.js assumes the Kakao provider follows the OAuth 2
   specification.
2. **Redirect URIs** – The “Authorized redirect URIs” in the Kakao console
   must include the full domain and end with the callback path:
   - Production: `https://{YOUR_DOMAIN}/api/auth/callback/kakao`
   - Development: `http://localhost:3000/api/auth/callback/kakao`
3. **Default Configuration** – The provider comes with sensible defaults.
   To override them, refer to the guide on customizing a built‑in OAuth
   provider.
4. **Client Keys** –  
   - **Client ID**: Found in the *Summary* tab (요약정보) → *App Keys* → *Client Key*.  
   - **Client Secret**: Found in the *Security* tab (보안) → *App Keys* → *Client Secret*.
5. **Language** – The Kakao dev console can be switched from Korean to English
   via the button at the top right.

---

## 6. Troubleshooting

- **Non‑compliance with OAuth spec** – Auth.js does not guarantee
  compatibility with providers that deviate from the spec.  
  If you encounter such issues, open an issue on GitHub or ask in the
  Discussions.

---

## 7. License

Auth.js © Balázs Orbán and Team – 2025  
(See the repository for license details.)