```ts
/**
 * Azure AD provider for Auth.js.
 *
 * **Built‑in Azure AD integration** – use this provider to authenticate users
 * against Microsoft Azure Active Directory.
 *
 * @deprecated
 *   Azure Active Directory has been renamed to Microsoft Entra ID.
 *   Import this provider from `@auth/core/providers/microsoft-entra-id`
 *   instead of `@auth/core/providers/azure-ad`.
 *
 * @type {Provider<MicrosoftEntraIDProfile>}
 *
 * @typedef {MicrosoftEntraIDProfile} AzureADProfile
 *
 * @param {OIDCUserConfig<MicrosoftEntraIDProfile> & {
 *   profilePhotoSize:
 *     | 64
 *     | 48
 *     | 96
 *     | 120
 *     | 240
 *     | 360
 *     | 432
 *     | 504
 *     | 648;
 * }} config
 *   Configuration options for the provider.
 *
 * @returns {OIDCConfig<MicrosoftEntraIDProfile>}
 *   The OIDC configuration object that Auth.js uses internally.
 *
 * @example
 * // Import the provider
 * import { azureAd } from "@auth/core/providers/azure-ad";
 *
 * // Configure the provider
 * const provider = azureAd({
 *   clientId: process.env.AZURE_AD_CLIENT_ID,
 *   clientSecret: process.env.AZURE_AD_CLIENT_SECRET,
 *   tenantId: process.env.AZURE_AD_TENANT_ID,
 *   profilePhotoSize: 120, // optional, defaults to 120
 * });
 */
export function azureAd(
  config: OIDCUserConfig<MicrosoftEntraIDProfile> & {
    profilePhotoSize:
      | 64
      | 48
      | 96
      | 120
      | 240
      | 360
      | 432
      | 504
      | 648;
  }
): OIDCConfig<MicrosoftEntraIDProfile>;
```