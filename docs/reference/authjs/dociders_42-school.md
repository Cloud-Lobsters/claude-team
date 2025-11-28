# 42‑School Provider – Auth.js

The 42‑School provider is a built‑in OAuth2 provider for Auth.js.  
It allows you to authenticate users via the 42‑School OAuth2 API and
returns a rich user profile (`FortyTwoProfile`) that contains all the
information you can fetch from the 42‑School API.

> **NOTE**  
> 42‑School returns a numeric `created_at` field on the `Account` record.
> If you use an adapter, make sure your database schema includes this
> column.

---

## Types

```ts
// 42‑School profile returned by the provider
export interface FortyTwoProfile extends UserData {
  achievements: Achievement[];
  alumni: boolean;
  campus: Campus[];
  campus_users: CampusUser[];
  correction_point: number;
  cursus_users: CursusUser[];
  expertises_users: ExpertisesUser[];
  image: Image;
  languages_users: LanguagesUser[];
  projects_users: ProjectUser[];
  roles: { id: string; name: string }[];
  titles: { id: string; name: string }[];
  titles_users: TitlesUser[];
}
```

### Sub‑types

| Type | Description |
|------|-------------|
| `Achievement` | `description`, `id`, `image`, `kind`, `name`, `nbr_of_success`, `tier`, `users_url`, `visible` |
| `Campus` | `active`, `address`, `city`, `country`, `default_hidden_phone`, `email_extension`, `facebook`, `id`, `language`, `created_at`, `identifier`, `name`, `updated_at`, `time_zone`, `twitter`, `users_count`, `vogsphere_id`, `website`, `zip` |
| `CampusUser` | `campus_id`, `created_at`, `id`, `is_primary`, `updated_at`, `user_id` |
| `CursusUser` | `begin_at`, `blackholed_at`, `created_at`, `cursus`, `cursus_id`, `end_at`, `grade`, `has_coalition`, `id`, `level`, `skills`, `user` |
| `ExpertisesUser` | `contact_me`, `created_at`, `expertise_id`, `id`, `interested`, `user_id`, `value` |
| `Image` | `link`, `versions` (`large`, `medium`, `micro`, `small`) |
| `LanguagesUser` | `created_at`, `id`, `language_id`, `position`, `user_id` |
| `ProjectUser` | `created_at`, `current_team_id`, `cursus_ids`, `final_mark`, `id`, `marked`, `marked_at`, `occurrence`, `project`, `status`, `updated_at`, `validated?` |
| `TitlesUser` | `created_at`, `id`, `selected`, `title_id`, `updated_at`, `user_id` |

> All sub‑types are fully typed in the source code; the table above
> summarizes the most important fields.

---

## Example Usage

```ts
import { Auth } from "@auth/core";
import FortyTwoSchool from "@auth/core/providers/42-school";

const request = new Request(origin);

const response = await Auth(request, {
  providers: [
    FortyTwoSchool({
      clientId: FORTY_TWO_SCHOOL_CLIENT_ID,
      clientSecret: FORTY_TWO_SCHOOL_CLIENT_SECRET,
    }),
  ],
});
```

**Callback URL**

```
https://example.com/api/auth/callback/42-school
```

---

## Customizing the Provider

The provider comes with a default configuration that follows the OAuth2
specification. If you need to override any defaults, pass an
`OAuthUserConfig<P>` object to `FortyTwoSchool()`:

```ts
FortyTwoSchool({
  clientId: "...",
  clientSecret: "...",
  // custom scopes, endpoints, etc.
});
```

See the [OAuth provider customization guide](https://authjs.dev/docs/providers/oauth) for details.

---

## Resources

- [42‑School OAuth documentation](https://api.intra.42.fr/docs)
- [Auth.js documentation](https://authjs.dev)

---

## Notes

- The provider is fully typed; `P extends FortyTwoProfile` allows you
  to extend the profile with custom fields if needed.
- If you use an adapter, remember to add a numeric `created_at` column
  to the `Account` table to store the value returned by 42‑School.
- Auth.js strictly follows the OAuth2 spec; any deviations are the
  provider’s responsibility.

---

**Disclaimer**  
If you discover a bug in the default configuration, open an issue on
GitHub. Auth.js does not guarantee compliance with provider‑specific
behaviours that deviate from the OAuth2 spec. For non‑spec issues,
use Discussions for help.