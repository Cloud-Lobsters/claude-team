# Wikimedia Provider – Auth.js Documentation

> **Auth.js** – The open‑source authentication framework for modern web apps.  
> This page documents the built‑in **Wikimedia** OAuth provider.

---

## 1. Overview

The Wikimedia provider lets you authenticate users via any Wikimedia project (Wikipedia, Wikidata, Wikibooks, Wiktionary, …).  
It follows the standard OAuth 2.0 flow and returns a `WikimediaProfile` object that contains the user’s identity and permissions.

---

## 2. Types

```ts
// WikimediaProfile
export interface WikimediaProfile extends Record<string, any> {
  blocked: boolean;
  confirmed_email: boolean;
  editcount: number;
  email: string;
  grants: WikimediaGrant[];
  groups: WikimediaGroup[];
  realname: string;
  registered: string;
  rights: WikimediaRight[];
  sub: string;
  username: string;
}

// WikimediaGrant
export type WikimediaGrant =
  | "basic"
  | "blockusers"
  | "checkuser"
  | "createaccount"
  | "delete"
  | "editinterface"
  | "editmycssjs"
  | "editmyoptions"
  | "editmywatchlist"
  | "editpage"
  | "editprotected"
  | "editsiteconfig"
  | "globalblock"
  | "highvolume"
  | "import"
  | "mergehistory"
  | "oath"
  | "oversight"
  | "patrol"
  | "privateinfo"
  | "protect"
  | "rollback"
  | "sendemail"
  | "shortenurls"
  | "uploadfile"
  | "viewdeleted"
  | "viewmywatchlist";

// WikimediaGroup
export type WikimediaGroup =
  | "*"
  | "user"
  | "autoconfirmed"
  | "extendedconfirmed"
  | "bot"
  | "sysop"
  | "bureaucrat"
  | "steward"
  | "accountcreator"
  | "import"
  | "transwiki"
  | "ipblock-exempt"
  | "oversight"
  | "rollbacker"
  | "propertycreator"
  | "wikidata-staff"
  | "flood"
  | "translationadmin"
  | "confirmed"
  | "flow-bot"
  | "checkuser";

// WikimediaRight
export type WikimediaRight =
  | "abusefilter-log"
  | "apihighlimits"
  | "applychangetags"
  | "autoconfirmed"
  | "autopatrol"
  | "autoreview"
  | "bigdelete"
  | "block"
  | "blockemail"
  | "bot"
  | "browsearchive"
  | "changetags"
  | "checkuser"
  | "checkuser-log"
  | "createaccount"
  | "createpage"
  | "createpagemainns"
  | "createtalk"
  | "delete"
  | "delete-redirect"
  | "deletedhistory"
  | "deletedtext"
  | "deletelogentry"
  | "deleterevision"
  | "edit"
  | "edit-legal"
  | "editinterface"
  | "editmyoptions"
  | "editmyusercss"
  | "editmyuserjs"
  | "editmyuserjson"
  | "editmywatchlist"
  | "editprotected"
  | "editsemiprotected"
  | "editsitecss"
  | "editsitejs"
  | "editsitejson"
  | "editusercss"
  | "edituserjs"
  | "edituserjson"
  | "globalblock"
  | "import"
  | "importupload"
  | "ipblock-exempt"
  | "item-merge"
  | "item-redirect"
  | "item-term"
  | "markbotedits"
  | "massmessage"
  | "mergehistory"
  | "minoredit"
  | "move"
  | "move-subpages"
  | "movefile"
  | "movestable"
  | "mwoauth-authonlyprivate"
  | "nominornewtalk"
  | "noratelimit"
  | "nuke"
  | "patrol"
  | "patrolmarks"
  | "property-create"
  | "property-term"
  | "protect"
  | "purge"
  | "read"
  | "reupload"
  | "reupload-own"
  | "reupload-shared"
  | "rollback"
  | "sendemail"
  | "skipcaptcha"
  | "suppressionlog"
  | "tboverride"
  | "templateeditor"
  | "torunblocked"
  | "transcode-reset"
  | "translate"
  | "undelete"
  | "unwatchedpages"
  | "upload"
  | "upload_by_url"
  | "viewmywatchlist"
  | "viewsuppressed"
  | "writeapi";
```

---

## 3. Setup

### 3.1 Callback URL

```
https://<your-domain>/api/auth/callback/wikimedia
```

> Replace `<your-domain>` with the actual domain of your application.

### 3.2 Code Example

```ts
import { Auth } from "@auth/core";
import Wikimedia from "@auth/core/providers/wikimedia";

const request = new Request(origin);

const response = await Auth(request, {
  providers: [
    Wikimedia({
      clientId: process.env.WIKIMEDIA_CLIENT_ID!,
      clientSecret: process.env.WIKIMEDIA_CLIENT_SECRET!,
    }),
  ],
});
```

> **Tip** – Store the `clientId` and `clientSecret` in environment variables for security.

---

## 4. Configuration

1. **Register a Consumer**  
   Visit the Wikimedia OAuth consumer registration page:  
   https://meta.wikimedia.org/wiki/Special:OAuthConsumerRegistration

2. **Create a New OAuth 2.0 Consumer**  
   https://meta.wikimedia.org/wiki/Special:OAuthConsumerRegistration/propose/oauth2

3. **Add Redirect URL**  
   In the consumer settings, add:  
   ```
   http://<your-next-app-url>/api/auth/callback/wikimedia
   ```

4. **Scope Selection**  
   * If you only need user identity, choose **“User identity verification only”**.  
   * Avoid selecting scopes that grant write access unless required.

5. **Approval**  
   After submission, the application may take a few days to be approved for public use.

---

## 5. Notes

- **Multiple Projects** – The provider works with all Wikimedia projects (Wikipedia, Wikidata, Wikibooks, Wiktionary, etc.).
- **Email Optional** – Wikimedia accounts may not have an email address.  
  Check `profile.email` before allowing login if an email is required.
- **Default Configuration** – The provider uses the OAuth 2.0 spec by default.  
  To customize, refer to the “Customizing a Built‑in OAuth Provider” guide.
- **Compliance** – Auth.js follows the OAuth spec strictly.  
  If you encounter non‑compliant behavior, open an issue on GitHub.

---

## 6. API Reference

```ts
/**
 * Adds Wikimedia login to your application.
 *
 * @param options - OAuth user configuration.
 * @returns OAuth configuration for Wikimedia.
 */
function default<P>(options: OAuthUserConfig<P>): OAuthConfig<P>
```

- **`P`** – Extends `WikimediaProfile`.  
- **`options`** – Must include `clientId` and `clientSecret`.

---

## 7. Resources

- Wikimedia OAuth documentation: https://meta.wikimedia.org/wiki/Special:OAuthConsumerRegistration
- Auth.js GitHub: https://github.com/authjs/authjs
- NPM package: https://www.npmjs.com/package/@auth/core

---

**Auth.js © 2025** – Balázs Orbán & Team  
*Open‑source authentication for the modern web.*