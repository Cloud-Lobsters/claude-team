```ts
/**
 * @module @auth/sveltekit/env
 *
 * The `setEnvDefaults` helper is used internally by Auth.js to populate
 * missing environment variables with sensible defaults derived from the
 * SvelteKit authentication configuration.  It mutates the supplied
 * `envObject` in‑place, so the caller can safely pass the same object
 * to other parts of the library without worrying about missing keys.
 *
 * @example
 * // In your SvelteKit project, before initializing the auth adapter:
 * import { setEnvDefaults } from '@auth/sveltekit/env';
 * import type { SvelteKitAuthConfig } from '@auth/sveltekit';
 *
 * const env: Record<string, undefined | string> = process.env as any;
 * const config: SvelteKitAuthConfig = {
 *   providers: [
 *     // … your provider configuration
 *   ],
 *   // other auth options …
 * };
 *
 * // Populate missing environment variables
 * setEnvDefaults(env, config);
 *
 * // Now `env` contains defaults such as `AUTH_SECRET` if it was missing.
 *
 * @param {Record<string, undefined | string>} envObject
 *   The environment object that will be mutated.  Typically this is
 *   `process.env` cast to a mutable record.
 *
 * @param {SvelteKitAuthConfig} config
 *   The SvelteKit authentication configuration.  The function uses
 *   this configuration to infer default values for certain keys
 *   (e.g. `AUTH_SECRET`, `AUTH_URL`, etc.).
 *
 * @returns {void}
 *   The function does not return a value; it mutates `envObject` directly.
 *
 * @throws {Error}
 *   If a required environment variable cannot be inferred from the
 *   configuration, an error is thrown to prevent silent misconfiguration.
 */
export function setEnvDefaults(
  envObject: Record<string, undefined | string>,
  config: SvelteKitAuthConfig
): void;
```