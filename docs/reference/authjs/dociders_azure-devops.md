# Azure DevOps Provider – Auth.js

> **⚠️ Deprecated**  
> Microsoft no longer supports Azure DevOps OAuth.  
> Consider using Microsoft Entra ID instead.

---

## Overview

The Azure DevOps provider allows you to authenticate users via Azure DevOps OAuth 2.0 and retrieve their profile information.

```ts
import AzureDevOps from "@auth/core/providers/azure-devops";
```

---

## Profile Type

```ts
export interface AzureDevOpsProfile extends Record<string, any> {
  coreAttributes: {
    Avatar: {
      value: {
        value: string;
      };
    };
  };
  Avatar: {
    value: {
      value: string;
    };
  };
  Avatar.value: {
    value: string;
  };
  Avatar.value.value: string;
  displayName: string;
  emailAddress: string;
  id: string;
}
```

---

## Configuration

### 1. Register an Application

1. Visit the Azure DevOps app registration page:  
   `https://app.vsaex.visualstudio.com/app/register`
2. Provide the following details:
   - **Company name**  
   - **Application name**  
   - **Application website**  
   - **Authorization callback URL**  
     - Production: `https://example.com/api/auth/callback/azure-devops`  
     - Development: `https://localhost/api/auth/callback/azure-devops`
   - **Authorized scopes** – *minimum*: `User profile (read)`
3. Click **Create Application**.

> **Important**  
> • HTTPS is required even for localhost.  
> • Changing scopes requires deleting and recreating the app.

> **Data you’ll need**  
> • `App ID`  
> • `Client Secret` (click **Show** to reveal)  
> • `Authorized Scopes`

### 2. Environment Variables

Create a `.env.local` file and add:

```dotenv
AZURE_DEVOPS_APP_ID=<copy App ID value here>
AZURE_DEVOPS_CLIENT_SECRET=<copy generated client secret value here>
AZURE_DEVOPS_SCOPE=<copy space‑separated Authorized Scopes list here>
```

---

## Usage Example

```ts
import AzureDevOps from "@auth/core/providers/azure-devops";

export const authOptions = {
  providers: [
    AzureDevOps({
      clientId: process.env.AZURE_DEVOPS_APP_ID,
      clientSecret: process.env.AZURE_DEVOPS_CLIENT_SECRET,
      scope: process.env.AZURE_DEVOPS_SCOPE,
    }),
  ],
  // ...other Auth.js options
};
```

---

## Refresh Token Rotation

Azure DevOps issues tokens with an absolute expiration time.  
Below is a minimal implementation of a refresh flow.

```ts
// In your JWT callback
async jwt({ token, user, account }) {
  // The token has an absolute expiration time
  const accessTokenExpires = account.expires_at * 1000;
  // ...your logic
}

// Function to refresh the access token
async function refreshAccessToken(token) {
  const response = await fetch(
    "https://app.vssps.visualstudio.com/oauth2/token",
    {
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      method: "POST",
      body: new URLSearchParams({
        client_assertion_type:
          "urn:ietf:params:oauth:client-assertion-type:jwt-bearer",
        client_assertion: process.env.AZURE_DEVOPS_CLIENT_SECRET,
        grant_type: "refresh_token",
        assertion: token.refreshToken,
        redirect_uri:
          process.env.NEXTAUTH_URL + "/api/auth/callback/azure-devops",
      }),
    }
  );

  const newToken = await response.json();

  // The refreshed token comes with a relative expiration time
  const accessTokenExpires = Date.now() + newToken.expires_in * 1000;

  return {
    ...token,
    accessToken: newToken.access_token,
    accessTokenExpires,
    refreshToken: newToken.refresh_token ?? token.refreshToken, // Fall back to old refresh token
  };
}
```

---

## References

- [Azure DevOps REST API 7.0 – Profiles – Get](https://learn.microsoft.com/en-us/rest/api/azure/devops/profile/get?view=azure-devops-rest-7.0)
- [Microsoft Docs – Authorize access to REST APIs with OAuth 2.0](https://learn.microsoft.com/en-us/azure/devops/integrate/get-started/authentication?view=azure-devops)

---