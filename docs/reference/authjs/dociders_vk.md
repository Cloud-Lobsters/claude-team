# VK Provider – Auth.js Documentation

> **Auth.js** is a framework‑agnostic authentication library that supports a wide range of OAuth providers.  
> This page documents the built‑in **VK** provider, its configuration, the shape of the returned user profile, and how to use it in your application.

---

## 1.  Overview

The VK provider implements the OAuth 2.0 flow for the Russian social network VKontakte.  
It returns a `VkProfile` object that contains all fields exposed by the VK API’s `users.get` method.

> **Default API version**: `5.126`  
> (See <https://vk.com/dev/versions> for available versions.)

---

## 2.  Setup

### 2.1  Install

```bash
# npm
npm i @auth/core @auth/core/providers/vk

# yarn
yarn add @auth/core @auth/core/providers/vk
```

### 2.2  Callback URL

```
https://example.com/api/auth/callback/vk
```

> The callback URL must be registered in your VK application settings.

### 2.3  Basic Usage

```ts
import { Auth } from "@auth/core";
import VK from "@auth/core/providers/vk";

const request = new Request(origin);

const response = await Auth(request, {
  providers: [
    VK({
      clientId: VK_CLIENT_ID,
      clientSecret: VK_CLIENT_SECRET,
    }),
  ],
});
```

> Replace `VK_CLIENT_ID` and `VK_CLIENT_SECRET` with the values from your VK app.

---

## 3.  Customizing the Provider

The provider is built on top of the generic OAuth provider.  
You can override any of the default URLs or add additional options.

```ts
const apiVersion = "5.126";

const vkProvider = VK({
  // Override the default OAuth URLs
  accessTokenUrl: `https://oauth.vk.com/access_token?v=${apiVersion}`,
  requestTokenUrl: `https://oauth.vk.com/access_token?v=${apiVersion}`,
  authorizationUrl: `https://oauth.vk.com/authorize?response_type=code&v=${apiVersion}`,
  // Override the profile endpoint
  profileUrl: `https://api.vk.com/method/users.get?fields=photo_100&v=${apiVersion}`,
});
```

> **Tip** – If you need a different API version, simply change the `apiVersion` variable.

---

## 4.  API Reference

### 4.1  `VkProfile`

| Property | Type | Optional | Description |
|----------|------|----------|-------------|
| `id` | `number` | **No** | VK user ID |
| `first_name` | `string` | **No** | First name |
| `last_name` | `string` | **No** | Last name |
| `photo_100` | `string` | **No** | URL of the 100 × 100 photo |
| `about?` | `string` | Yes | About section |
| `activities?` | `string` | Yes | Activities |
| `bdate?` | `string` | Yes | Birth date |
| `blacklisted?` | `0 | 1` | Yes | Whether the user is blacklisted |
| `blacklisted_by_me?` | `0 | 1` | Yes | Whether the user blacklisted you |
| `books?` | `string` | Yes | Books |
| `can_access_closed` | `boolean` | **No** | Can access closed communities |
| `can_post?` | `0 | 1` | Yes | Can post |
| `can_see_all_posts?` | `0 | 1` | Yes | Can see all posts |
| `can_see_audio?` | `0 | 1` | Yes | Can see audio |
| `can_send_friend_request?` | `0 | 1` | Yes | Can send friend request |
| `can_write_private_message?` | `0 | 1` | Yes | Can write private message |
| `career?` | `Career` | Yes | Career information |
| `city_id?` | `number` | Yes | City ID |
| `city_name?` | `string` | Yes | City name |
| `company?` | `string` | Yes | Company |
| `country_id?` | `number` | Yes | Country ID |
| `from?` | `number` | Yes | Start year |
| `group_id?` | `number` | Yes | Group ID |
| `position?` | `string` | Yes | Position |
| `until?` | `number` | Yes | End year |
| `city?` | `City` | Yes | City object |
| `title?` | `string` | Yes | Title |
| `common_count?` | `number` | Yes | Common count |
| `connections?` | `Connections` | Yes | Social connections |
| `facebook?` | `string` | Yes | Facebook link |
| `instagram?` | `string` | Yes | Instagram link |
| `livejournal?` | `string` | Yes | LiveJournal link |
| `skype?` | `string` | Yes | Skype link |
| `twitter?` | `string` | Yes | Twitter link |
| `contacts?` | `Contacts` | Yes | Contact numbers |
| `home_phone?` | `string` | Yes | Home phone |
| `mobile_phone?` | `string` | Yes | Mobile phone |
| `counters?` | `Counters` | Yes | Various counters |
| `albums?` | `number` | Yes | Number of albums |
| `audios?` | `number` | Yes | Number of audios |
| `followers?` | `number` | Yes | Number of followers |
| `friends?` | `number` | Yes | Number of friends |
| `groups?` | `number` | Yes | Number of groups |
| `mutual_friends?` | `number` | Yes | Number of mutual friends |
| `notes?` | `number` | Yes | Number of notes |
| `online_friends?` | `number` | Yes | Number of online friends |
| `pages?` | `number` | Yes | Number of pages |
| `photos?` | `number` | Yes | Number of photos |
| `user_videos?` | `number` | Yes | Number of user videos |
| `videos?` | `number` | Yes | Number of videos |
| `country?` | `Country` | Yes | Country object |
| `crop_photo?` | `CropPhoto` | Yes | Cropped photo |
| `deactivated?` | `string` | Yes | Deactivation reason |
| `domain?` | `string` | Yes | Domain |
| `education?` | `Education` | Yes | Education info |
| `email?` | `string` | Yes | Email |
| `exports?` | `Exports` | Yes | Export counts |
| `first_name_abl?` | `string` | Yes | First name (ablative) |
| `first_name_acc?` | `string` | Yes | First name (accusative) |
| `first_name_dat?` | `string` | Yes | First name (dative) |
| `first_name_gen?` | `string` | Yes | First name (genitive) |
| `first_name_ins?` | `string` | Yes | First name (instrumental) |
| `first_name_nom?` | `string` | Yes | First name (nominative) |
| `followers_count?` | `number` | Yes | Followers count |
| `friend_status?` | `0 | 2 | 1 | 3` | Yes | Friend status |
| `games?` | `string` | Yes | Games |
| `has_mobile?` | `0 | 1` | Yes | Has mobile |
| `has_photo?` | `0 | 1` | Yes | Has photo |
| `home_town?` | `string` | Yes | Home town |
| `interests?` | `string` | Yes | Interests |
| `is_closed` | `boolean` | **No** | Is profile closed |
| `is_favorite?` | `0 | 1` | Yes | Is favorite |
| `is_friend?` | `0 | 1` | Yes | Is friend |
| `is_hidden_from_feed?` | `0 | 1` | Yes | Hidden from feed |
| `is_no_index?` | `0 | 1` | Yes | No index |
| `last_name_abl?` | `string` | Yes | Last name (ablative) |
| `last_name_acc?` | `string` | Yes | Last name (accusative) |
| `last_name_dat?` | `string` | Yes | Last name (dative) |
| `last_name_gen?` | `string` | Yes | Last name (genitive) |
| `last_name_ins?` | `string` | Yes | Last name (instrumental) |
| `last_name_nom?` | `string` | Yes | Last name (nominative) |
| `last_seen?` | `LastSeen` | Yes | Last seen info |
| `platform?` | `2 | 1 | 3 | 5 | 4 | 6 | 7` | Yes | Platform |
| `time?` | `number` | Yes | Time |
| `maiden_name?` | `string` | Yes | Maiden name |
| `military?` | `Military` | Yes | Military info |
| `movies?` | `string` | Yes | Movies |
| `music?` | `string` | Yes | Music |
| `nickname?` | `string` | Yes | Nickname |
| `occupation?` | `Occupation` | Yes | Occupation |
| `online?` | `0 | 1` | Yes | Online status |
| `online_app?` | `number` | Yes | Online app |
| `online_mobile?` | `0 | 1` | Yes | Online mobile |
| `personal?` | `Personal` | Yes | Personal info |
| `photo_200?` | `string` | Yes | Photo 200 |
| `photo_200_orig?` | `string` | Yes | Photo 200 original |
| `photo_400?` | `string` | Yes | Photo 400 |
| `photo_400_orig?` | `string` | Yes | Photo 400 original |
| `photo_50?` | `string` | Yes | Photo 50 |
| `photo_id?` | `string` | Yes | Photo ID |
| `photo_max?` | `string` | Yes | Photo max |
| `photo_max_orig?` | `string` | Yes | Photo max original |
| `quotes?` | `string` | Yes | Quotes |
| `relation?` | `0 | 2 | 1 | 3 | 5 | 4 | 6 | 7 | 8` | Yes | Relation |
| `relation_partner?` | `RelationPartner` | Yes | Relation partner |
| `relatives?` | `Relative[]` | Yes | Relatives |
| `schools?` | `School[]` | Yes | Schools |
| `screen_name?` | `string` | Yes | Screen name |
| `sex?` | `0 | 2 | 1` | Yes | Sex |
| `site?` | `string` | Yes | Site |
| `status?` | `string` | Yes | Status |
| `status_audio?` | `StatusAudio` | Yes | Status audio |
| `timezone?` | `number` | Yes | Timezone |
| `trending?` | `0 | 1` | Yes | Trending |
| `tv?` | `string` | Yes | TV |
| `universities?` | `University[]` | Yes | Universities |
| `verified?` | `0 | 1` | Yes | Verified |
| `wall_default?` | `"all" | "owner"` | Yes | Wall default |

> **Note** – The nested types (`Career`, `City`, `Connections`, …) follow the same pattern: each field is optional unless marked otherwise.

---

## 5.  Type Parameters & Function Signature

```ts
/**
 * Returns a configured OAuth provider for VK.
 *
 * @template P - The shape of the user profile. Defaults to `VkProfile`.
 *
 * @param options - OAuth user configuration.
 * @returns OAuth configuration for the provider.
 */
function default<P extends Record<string, any> = VkProfile>(
  options: OAuthUserConfig<P>
): OAuthConfig<P>;
```

- **`P`** – The profile type returned by the provider.  
  By default it is `VkProfile`, but you can supply a custom type if you only need a subset of fields.

---

## 6.  Notes & Best Practices

| Topic | Recommendation |
|-------|----------------|
| **OAuth 2.0** | Auth.js assumes the VK provider follows the OAuth 2.0 spec. |
| **API Version** | The provider defaults to `5.126`. Use the `apiVersion` example above to change it. |
| **Profile Fields** | The `profileUrl` can be customized to request additional fields. |
| **Error Handling** | If the provider returns an error, Auth.js will surface it as a standard OAuth error. |
| **Compliance** | Auth.js strictly follows the OAuth spec. If VK deviates, file an issue. |
| **Community** | For help, join the Auth.js Discord community or open a discussion. |

---

## 7.  Resources

- **VK API Documentation** – <https://dev.vk.com/reference/objects/user>
- **VK App Configuration** – <https://vk.com/apps?act=manage>
- **Auth.js GitHub** – <https://github.com/authjs/authjs>
- **Auth.js NPM** – <https://www.npmjs.com/package/@auth/core>

---

## 8.  Disclaimer

If you discover a bug in the default configuration, open an issue on GitHub.  
Auth.js adheres to the OAuth specification and cannot guarantee compliance with provider‑specific quirks.  
For non‑spec issues, we may not pursue a resolution, but we welcome discussions.

---