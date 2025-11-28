# Auth.js – Error Reference

This document lists all built‑in error types that Auth.js can throw.  
Each error is a class that extends `AuthError` (or a subclass of it).  
The table below gives a quick overview; click a name to jump to the full
description.

| Error | Description | Extends |
|-------|-------------|---------|
| [AccessDenied](#accessdenied) | Sign‑in callback failed or returned `false`. | `AuthError` |
| [AccountNotLinked](#accountnotlinked) | Email already linked to another account. | `SignInError` |
| [AdapterError](#adaptererror) | Adapter method failed. | `AuthError` |
| [AuthError](#autherror) | Base error class. | `Error` |
| [CallbackRouteError](#callbackrouteerror) | User cannot finish login. | `AuthError` |
| [CredentialsSignin](#credentialssignin) | Credentials provider failed. | `SignInError` |
| [DuplicateConditionalUI](#duplicateconditionalui) | Multiple providers enabled `enableConditionalUI`. | `AuthError` |
| [EmailSignInError](#emailsigninerror) | Email provider login failed. | `SignInError` |
| [ErrorPageLoop](#errorpageloop) | Infinite loop on custom error page. | `AuthError` |
| [EventError](#eventerror) | Event handler failed. | `AuthError` |
| [ExperimentalFeatureNotEnabled](#experimentalfeaturenotenabled) | Experimental feature used without enabling. | `AuthError` |
| [InvalidCallbackUrl](#invalidcallbackurl) | Callback URL could not be verified. | `AuthError` |
| [InvalidCheck](#invalidcheck) | PKCE / state / nonce check failed. | `AuthError` |
| [InvalidEndpoints](#invalidendpoints) | OAuth/OIDC provider missing endpoints. | `AuthError` |
| [InvalidProvider](#invalidprovider) | Unsupported or missing provider. | `AuthError` |
| [JWTSessionError](#jwtsessionerror) | JWT session could not be decoded/encoded. | `AuthError` |
| [MissingAdapter](#missingadapter) | Adapter missing for required strategy. | `AuthError` |
| [MissingAdapterMethods](#missingadaptermethods) | Adapter missing required methods. | `AuthError` |
| [MissingAuthorize](#missingauthorize) | Credentials provider missing `authorize`. | `AuthError` |
| [MissingCSRF](#missingcsrf) | CSRF token missing in client‑side actions. | `SignInError` |
| [MissingSecret](#missingsecret) | No secret configured. | `AuthError` |
| [MissingWebAuthnAutocomplete](#missingwebauthnanautocomplete) | WebAuthn provider missing `autocomplete="webauthn"`. | `AuthError` |
| [OAuthAccountNotLinked](#oauthaccountnotlinked) | OAuth account not linked to existing email. | `SignInError` |
| [OAuthCallbackError](#oauthcallbackerror) | OAuth provider returned an error. | `SignInError` |
| [OAuthProfileParseError](#oauthprofileparseerror) | OAuth profile could not be parsed. | `AuthError` |
| [OAuthSignInError](#oauthsigninerror) | OAuth sign‑in could not be started. | `SignInError` |
| [SessionTokenError](#sessiontokenerror) | Database session token could not be retrieved. | `AuthError` |
| [SignInError](#signinerror) | Generic sign‑in failure. | `AuthError` |
| [SignOutError](#signouterror) | Sign‑out process failed. | `AuthError` |
| [UnknownAction](#unknownaction) | Unsupported Auth action requested. | `AuthError` |
| [UnsupportedStrategy](#unsupportedstrategy) | Credentials provider used with JWT strategy. | `AuthError` |
| [UntrustedHost](#untrustedhost) | `trustHost` option not set to `true`. | `AuthError` |
| [Verification](#verification) | Email/token combination invalid. | `AuthError` |
| [WebAuthnVerificationError](#webauthnverificationerror) | WebAuthn verification failed. | `AuthError` |

---

## Error Details

### AccessDenied
Thrown when the execution of the `signIn` callback fails or if it returns `false`.

```ts
class AccessDenied extends AuthError {
  static type = "AccessDenied";
}
```

---

### AccountNotLinked
Thrown when an Email address is already associated with an account but the user is trying an account that is not linked to it.  
For security reasons, Auth.js does not automatically link accounts to existing accounts if the user is not signed in.

```ts
class AccountNotLinked extends SignInError {
  static type = "AccountNotLinked";
}
```

---

### AdapterError
One of the database Adapter methods failed during execution.

> 💡 If `debug: true` is set, you can check out `[auth][debug]` in the logs to learn more about the failed adapter method execution.

**Example log**

```
[auth][debug]: adapter_getUserByEmail
{ "args": [undefined] }
```

```ts
class AdapterError extends AuthError {
  static type = "AdapterError";
}
```

---

### AuthError
Base error class for all Auth.js errors. It’s optimized to be printed in the server logs in a nicely formatted way via the `logger.error` option.

```ts
class AuthError extends Error {
  cause?: Record<string, unknown> & { err: Error };
  err?: Error;
  type: ErrorType;
}
```

---

### CallbackRouteError
This error occurs when the user cannot finish login. Depending on the provider type, this could have happened for multiple reasons.

> 💡 Check out `[auth][details]` in the logs to know which provider failed.

**Example log**

```
[auth][details]: { "provider": "github" }
```

Possible causes for OAuth providers:

- The user denied access to the application.
- There was an error parsing the OAuth Profile.
- The `signIn` or `jwt` callback methods threw an uncaught error.

Possible causes for Email providers:

- The provided email/token combination was invalid/missing.
- The provided email/token combination has expired.
- There was an error with the database.

Possible causes for Credentials providers:

- The `authorize` method threw an uncaught error.
- The `signIn` or `jwt` callback methods threw an uncaught error.

> 💡 Check out `[auth][cause]` in the error message for more details. It will show the original stack trace.

```ts
class CallbackRouteError extends AuthError {
  static type = "CallbackRouteError";
}
```

---

### CredentialsSignin
Can be thrown from the `authorize` callback of the Credentials provider. When an error occurs during the authorize callback, two things can happen:

1. The user is redirected to the signin page, with `error=CredentialsSignin&code=credentials` in the URL. `code` is configurable.
2. If you throw this error in a framework that handles form actions server‑side, this error is thrown, instead of redirecting the user, so you’ll need to handle.

```ts
class CredentialsSignin extends SignInError {
  static type = "CredentialsSignin";
  code: string = "credentials";
}
```

> ⚠️ **NOTE:** This property is going to be included in the URL, so make sure it does not hint at sensitive errors.  
> The full error is always logged on the server, if you need to debug.  
> Generally, we don’t recommend hinting specifically if the user had either a wrong username or password specifically, try rather something like “Invalid credentials”.

---

### DuplicateConditionalUI
Thrown when multiple providers have `enableConditionalUI` set to true. Only one provider can have this option enabled at a time.

```ts
class DuplicateConditionalUI extends AuthError {
  static type = "DuplicateConditionalUI";
}
```

---

### EmailSignInError
Happens when the login by an Email provider could not be started.

Possible causes are:

- The email sent from the client is invalid, could not be normalized by `EmailConfig.normalizeIdentifier`.
- The provided email/token combination has expired: Ask the user to log in again.
- There was an error with the database: Check the database logs.

```ts
class EmailSignInError extends SignInError {
  static type = "EmailSignInError";
}
```

---

### ErrorPageLoop
Thrown when Auth.js is misconfigured and accidentally tried to require authentication on a custom error page. To prevent an infinite loop, Auth.js will instead render its default error page.

> To fix this, make sure that the error page does not require authentication.  
> Learn more at **Guide: Error pages**.

```ts
class ErrorPageLoop extends AuthError {
  static type = "ErrorPageLoop";
}
```

---

### EventError
One of the events methods failed during execution.

> Make sure that the events methods are implemented correctly and uncaught errors are handled.  
> Learn more at **events**.

```ts
class EventError extends AuthError {
  static type = "EventError";
}
```

---

### ExperimentalFeatureNotEnabled
Thrown when an experimental feature is used but not enabled.

```ts
class ExperimentalFeatureNotEnabled extends AuthError {
  static type = "ExperimentalFeatureNotEnabled";
}
```

---

### InvalidCallbackUrl
Thrown when Auth.js is unable to verify a `callbackUrl` value. The browser either disabled cookies or the `callbackUrl` is not a valid URL.

> Somebody might have tried to manipulate the callback URL that Auth.js uses to redirect the user back to the configured callbackUrl/page. This could be a malicious hacker trying to redirect the user to a phishing site. To prevent this, Auth.js checks if the callback URL is valid and throws this error if it is not.  
> There is no action required, but it might be an indicator that somebody is trying to attack your application.

```ts
class InvalidCallbackUrl extends AuthError {
  static type = "InvalidCallbackUrl";
}
```

---

### InvalidCheck
Thrown when a PKCE, state or nonce OAuth check could not be performed. This could happen if the OAuth provider is configured incorrectly or if the browser is blocking cookies.

> Learn more at **checks**.

```ts
class InvalidCheck extends AuthError {
  static type = "InvalidCheck";
}
```

---

### InvalidEndpoints
One of the configured OAuth or OIDC providers is missing the authorization, token or userinfo, or issuer configuration. To perform OAuth or OIDC sign in, at least one of these endpoints is required.

> Learn more at **OAuth2Config** or **Guide: OAuth Provider**.

```ts
class InvalidEndpoints extends AuthError {
  static type = "InvalidEndpoints";
}
```

---

### InvalidProvider
Thrown when an endpoint was incorrectly called without a provider, or with an unsupported provider.

```ts
class InvalidProvider extends AuthError {
  static type = "InvalidProvider";
}
```

---

### JWTSessionError
Logged on the server when Auth.js could not decode or encode a JWT‑based (strategy: `"jwt"`) session.

Possible causes are either a misconfigured secret or a malformed JWT or encode/decode methods.  
When this error is logged, the session cookie is destroyed.

> Learn more at **secret**, **jwt.encode** or **jwt.decode** for more information.

```ts
class JWTSessionError extends AuthError {
  static type = "JWTSessionError";
}
```

---

### MissingAdapter
Thrown if Auth.js is misconfigured. This could happen if you configured an Email provider but did not set up a database adapter, or tried using a strategy: `"database"` session without a database adapter. In both cases, make sure you either remove the configuration or add the missing adapter.

> Learn more at **Database Adapters**, **Email provider** or **Concept: Database session strategy**.

```ts
class MissingAdapter extends AuthError {
  static type = "MissingAdapter";
}
```

---

### MissingAdapterMethods
Thrown similarly to `MissingAdapter`, but only some required methods were missing.

> Make sure you either remove the configuration or add the missing methods to the adapter.  
> Learn more at **Database Adapters**.

```ts
class MissingAdapterMethods extends AuthError {
  static type = "MissingAdapterMethods";
}
```

---

### MissingAuthorize
Thrown when a Credentials provider is missing the `authorize` configuration. To perform credentials sign in, the `authorize` method is required.

> Learn more at **Credentials provider**.

```ts
class MissingAuthorize extends AuthError {
  static type = "MissingAuthorize";
}
```

---

### MissingCSRF
Error for missing CSRF tokens in client‑side actions (`signIn`, `signOut`, `useSession#update`). Thrown when actions lack the double submit cookie, essential for CSRF protection.

> CSRF (Cross‑Site Request Forgery) is an attack leveraging authenticated user credentials for unauthorized actions.  
> Double submit cookie pattern, a CSRF defense, requires matching values in a cookie and request parameter.  
> More on this at MDN Web Docs.

```ts
class MissingCSRF extends SignInError {
  static type = "MissingCSRF";
}
```

---

### MissingSecret
Auth.js requires a secret or multiple secrets to be set, but none was found. This is used to encrypt cookies, JWTs and other sensitive data.

If you are using a framework like Next.js, we try to automatically infer the secret from the `AUTH_SECRET`, `AUTH_SECRET_1`, etc. environment variables. Alternatively, you can also explicitly set the `AuthConfig.secret` option.

> 💡 To generate a random string, you can use the Auth.js CLI: `npx auth secret`.

```ts
class MissingSecret extends AuthError {
  static type = "MissingSecret";
}
```

---

### MissingWebAuthnAutocomplete
Thrown when a WebAuthn provider has `enableConditionalUI` set to true but no formField has `webauthn` in its `autocomplete` param.  
The webauthn autocomplete param is required for conditional UI to work.

```ts
class MissingWebAuthnAutocomplete extends AuthError {
  static type = "MissingWebAuthnAutocomplete";
}
```

---

### OAuthAccountNotLinked
Thrown when an Email address is already associated with an account but the user is trying an OAuth account that is not linked to it.

> For security reasons, Auth.js does not automatically link OAuth accounts to existing accounts if the user is not signed in.  
> 💡 If you trust the OAuth provider to have verified the user’s email address, you can enable automatic account linking by setting `allowDangerousEmailAccountLinking: true` in the provider configuration.

```ts
class OAuthAccountNotLinked extends SignInError {
  static type = "OAuthAccountNotLinked";
}
```

---

### OAuthCallbackError
Thrown when an OAuth provider returns an error during the sign in process. This could happen for example if the user denied access to the application or there was a configuration error.

> For a full list of possible reasons, check out the specification **Authorization Code Grant: Error Response**.

```ts
class OAuthCallbackError extends SignInError {
  static type = "OAuthCallbackError";
}
```

---

### OAuthProfileParseError
This error occurs during an OAuth sign in attempt when the provider’s response could not be parsed. This could for example happen if the provider’s API changed, or the OAuth2Config.profile method is not implemented correctly.

```ts
class OAuthProfileParseError extends AuthError {
  static type = "OAuthProfileParseError";
}
```

---

### OAuthSignInError
Happens when login by OAuth could not be started.

Possible causes are:

- The Authorization Server is not compliant with the OAuth 2.0 or the OIDC specification. Check the details in the error message.

> 💡 Check out `[auth][details]` in the logs to know which provider failed.

**Example log**

```
[auth][details]: { "provider": "github" }
```

```ts
class OAuthSignInError extends SignInError {
  static type = "OAuthSignInError";
}
```

---

### SessionTokenError
Logged on the server when Auth.js could not retrieve a session from the database (strategy: `"database"`).

The database adapter might be misconfigured or the database is not reachable.

> Learn more at **Concept: Database session strategy**.

```ts
class SessionTokenError extends AuthError {
  static type = "SessionTokenError";
}
```

---

### SignInError
Thrown when the user’s sign‑in attempt failed.

```ts
class SignInError extends AuthError {}
```

---

### SignOutError
Represents an error that occurs during the sign‑out process. This error is logged when there are issues in terminating a user’s session, either by failing to delete the session from the database (in database session strategies) or encountering issues during other parts of the sign‑out process, such as emitting sign‑out events or clearing session cookies.

> The session cookie(s) are emptied even if this error is logged.

```ts
class SignOutError extends AuthError {
  static type = "SignOutError";
}
```

---

### UnknownAction
Auth.js was requested to handle an operation that it does not support.

> See `AuthAction` for the supported actions.

```ts
class UnknownAction extends AuthError {
  static type = "UnknownAction";
}
```

---

### UnsupportedStrategy
Thrown when a Credentials provider is present but the JWT strategy (`strategy: "jwt"`) is not enabled.

> Learn more at **strategy** or **Credentials provider**.

```ts
class UnsupportedStrategy extends AuthError {
  static type = "UnsupportedStrategy";
}
```

---

### UntrustedHost
Thrown when the `trustHost` option was not set to `true`.

Auth.js requires the `trustHost` option to be set to `true` since it’s relying on the request headers’ host value. Official Auth.js libraries might attempt to automatically set the `trustHost` option to `true` if the request is coming from a trusted host on a trusted platform.

> Learn more at **trustHost** or **Guide: Deployment**.

```ts
class UntrustedHost extends AuthError {
  static type = "UntrustedHost";
}
```

---

### Verification
The user’s email/token combination was invalid. This could be because the email