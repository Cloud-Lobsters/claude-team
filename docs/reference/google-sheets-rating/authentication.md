# Google Sheets Rating Engine - Authentication

This guide walks through setting up Google Cloud service account authentication for the Sheets rating engine pattern.

## Overview

The rating engine uses **Google Service Account** authentication, which provides:
- ✅ Server-side only (credentials never exposed to client)
- ✅ No user login required
- ✅ No token expiration
- ✅ Suitable for automated systems
- ✅ Fine-grained permission control

## Prerequisites

- Google Cloud account (or Google Workspace account)
- Admin access to create service accounts (if creating new)
- Billing enabled on Google Cloud project (free tier is sufficient)

---

## Reuse vs Create New Service Account

**Before proceeding**, decide whether to reuse an existing service account or create a new one.

### ✅ Reuse Existing Service Account If:

- Same application/codebase
- Same environment (all dev, or all prod)
- Same security domain
- Multiple insurance products in one app
- Simpler credential management preferred

**Benefits:**
- Faster setup (just share spreadsheet)
- Single credential to manage
- Easier key rotation
- Centralized monitoring

**Example scenario:**
- Application: Insurance Platform
- Products: Faces, Medical, Travel (all using `rating-engine@project.iam.gserviceaccount.com`)
- Same environment: Production

### ⚠️ Create New Service Account If:

- Different environments (dev vs staging vs prod)
- Different security requirements
- Need independent access control/revocation
- Separate applications
- Compliance requires separation

**Benefits:**
- Environment isolation
- Independent key rotation
- Granular access control
- Easier audit trails per environment

**Example scenario:**
- Dev environment: `rating-dev@project.iam.gserviceaccount.com`
- Staging: `rating-staging@project.iam.gserviceaccount.com`
- Production: `rating-prod@project.iam.gserviceaccount.com`

---

## Quick Setup: Reusing Existing Service Account

If you're reusing an existing service account (e.g., from the `/faces` route):

### Step 1: Get Existing Credentials

Use the same credentials already in your `.env`:

```bash
# Already have these from previous setup
GOOGLE_SERVICE_ACCOUNT_EMAIL=rating-engine@faces-rating-en.iam.gserviceaccount.com
GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"
```

### Step 2: Share New Spreadsheet

1. Open your new Google Sheet
2. Click "Share" (top right)
3. Add: `rating-engine@faces-rating-en.iam.gserviceaccount.com`
4. Set permission to **"Editor"**
5. **Uncheck** "Notify people"
6. Click "Share"

### Step 3: Add Spreadsheet ID to .env

```bash
# Existing
GOOGLE_SHEETS_FACES_RATING_ID="1abc123xyz"

# Add new product
GOOGLE_SHEETS_MEDICAL_RATING_ID="1def456uvw"  # Your new spreadsheet
```

**Done!** Skip to [Step 7: Test Authentication](#step-7-test-authentication) below.

---

## Full Setup: Creating New Service Account

If you need a new service account, follow these steps:

---

## Step 1: Create Google Cloud Project

### 1.1 Go to Google Cloud Console

Visit [console.cloud.google.com](https://console.cloud.google.com/)

### 1.2 Create New Project

1. Click the project dropdown (top left)
2. Click "New Project"
3. Enter project name: e.g., "Insurance Rating Engine"
4. Click "Create"

### 1.3 Select Your Project

Click the project dropdown and select your new project.

---

## Step 2: Enable Google Sheets API

### 2.1 Navigate to APIs & Services

1. Open navigation menu (☰)
2. Go to "APIs & Services" → "Library"

### 2.2 Enable Sheets API

1. Search for "Google Sheets API"
2. Click on "Google Sheets API"
3. Click "Enable"

**Note:** This may take a few seconds.

---

## Step 3: Create Service Account

### 3.1 Navigate to Service Accounts

1. Go to "APIs & Services" → "Credentials"
2. Click "+ CREATE CREDENTIALS"
3. Select "Service account"

### 3.2 Service Account Details

**Service account name:** `sheets-rating-engine`

**Service account ID:** (auto-generated) e.g., `sheets-rating-engine@project-id.iam.gserviceaccount.com`

**Description:** "Service account for reading/writing Google Sheets rating calculations"

Click "CREATE AND CONTINUE"

### 3.3 Grant Permissions (Optional)

For this use case, you can skip granting project-level roles.

Click "CONTINUE"

### 3.4 Grant User Access (Optional)

Skip this step.

Click "DONE"

---

## Step 4: Generate Service Account Key

### 4.1 Find Your Service Account

1. On the "Credentials" page
2. Under "Service Accounts", find `sheets-rating-engine`
3. Click on the service account email

### 4.2 Create Key

1. Go to the "KEYS" tab
2. Click "ADD KEY" → "Create new key"
3. Select "JSON"
4. Click "CREATE"

**Important:** The JSON key file will download automatically. This file contains your private key and cannot be recovered if lost.

### 4.3 Save Key Securely

```bash
# Move the downloaded key to a secure location
mv ~/Downloads/project-id-abc123.json ~/secrets/google-service-account.json

# Set restrictive permissions
chmod 600 ~/secrets/google-service-account.json
```

**⚠️ Security Warning:**
- Never commit this file to version control
- Never expose it to client-side code
- Store it securely (password manager, secrets vault, etc.)

---

## Step 5: Share Spreadsheet with Service Account

### 5.1 Get Service Account Email

From the JSON key file or Google Cloud Console:
```
sheets-rating-engine@project-id.iam.gserviceaccount.com
```

### 5.2 Share Your Spreadsheet

1. Open your Google Sheets spreadsheet
2. Click "Share" button (top right)
3. Enter the service account email
4. Set permission to "Editor"
5. **Uncheck** "Notify people" (service accounts don't have inboxes)
6. Click "Share"

### 5.3 Verify Access

The service account should now appear in the list of people with access to your spreadsheet.

---

## Step 6: Configure Environment Variables

### 6.1 Extract Values from JSON Key

Open the downloaded JSON file. You'll need two values:

```json
{
  "type": "service_account",
  "project_id": "your-project-id",
  "private_key_id": "abc123...",
  "private_key": "-----BEGIN PRIVATE KEY-----\nXXXX...\n-----END PRIVATE KEY-----\n",
  "client_email": "sheets-rating-engine@project-id.iam.gserviceaccount.com",
  ...
}
```

Extract:
- `client_email` → `GOOGLE_SERVICE_ACCOUNT_EMAIL`
- `private_key` → `GOOGLE_PRIVATE_KEY`

### 6.2 Get Spreadsheet ID

From your Google Sheets URL:
```
https://docs.google.com/spreadsheets/d/1abc123xyz456/edit#gid=0
                                    ^^^^^^^^^^^^^^
                                    This is the ID
```

### 6.3 Add to `.env` File

Create or update `.env` in your project root:

```bash
# Google Service Account Credentials
GOOGLE_SERVICE_ACCOUNT_EMAIL=sheets-rating-engine@project-id.iam.gserviceaccount.com
GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQC...\n-----END PRIVATE KEY-----\n"

# Spreadsheet Configuration
# Replace PRODUCT with your product name (uppercase)
GOOGLE_SHEETS_FACES_RATING_ID="1abc123xyz456"
```

**Important Notes:**
- Keep the quotes around `GOOGLE_PRIVATE_KEY`
- Preserve the `\n` characters (they represent newlines)
- Add `.env` to `.gitignore` if not already there

### 6.4 Verify `.gitignore`

Ensure `.env` is ignored:

```bash
# .gitignore
.env
.env.*
!.env.example
```

---

## Step 7: Test Authentication

### 7.1 Create Test Script

Create `test-sheets-auth.ts`:

```typescript
import { google } from 'googleapis';
import * as dotenv from 'dotenv';

dotenv.config();

async function testAuth() {
  try {
    const auth = new google.auth.GoogleAuth({
      credentials: {
        client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
        private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
      },
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });

    const sheets = google.sheets({ version: 'v4', auth });

    const response = await sheets.spreadsheets.get({
      spreadsheetId: process.env.GOOGLE_SHEETS_FACES_RATING_ID,
    });

    console.log('✅ Authentication successful!');
    console.log('📊 Spreadsheet title:', response.data.properties?.title);
    console.log('📄 Sheets:', response.data.sheets?.map(s => s.properties?.title).join(', '));
  } catch (error) {
    console.error('❌ Authentication failed:', error.message);
  }
}

testAuth();
```

### 7.2 Run Test

```bash
pnpm tsx test-sheets-auth.ts
```

**Expected output:**
```
✅ Authentication successful!
📊 Spreadsheet title: Medical Malpractice Calculator
📄 Sheets: Medics, Travel, Jewelry
```

### 7.3 Troubleshooting Test Failures

**Error: `Invalid JWT Signature`**
- Check `GOOGLE_PRIVATE_KEY` has correct newlines
- Ensure quotes are present in `.env`
- Verify key wasn't corrupted during copy/paste

**Error: `The caller does not have permission`**
- Verify spreadsheet is shared with service account email
- Check service account email is correct
- Ensure "Editor" permission (not "Viewer")

**Error: `Requested entity was not found`**
- Verify spreadsheet ID is correct
- Check spreadsheet isn't deleted
- Ensure you're looking at the right Google account

---

## Security Best Practices

### Do's ✅

1. **Store credentials server-side only**
   - Use environment variables
   - Never expose to client code

2. **Use least-privilege permissions**
   - Service account only needs access to specific spreadsheets
   - Don't grant project-level roles unless needed

3. **Rotate keys regularly**
   - Create new key every 90 days
   - Delete old keys after rotation

4. **Monitor access logs**
   - Enable Cloud Audit Logs
   - Review service account activity

5. **Use separate service accounts**
   - One per environment (dev, staging, prod)
   - Easier to track and revoke

### Don'ts ❌

1. **Never commit keys to version control**
   - Use `.gitignore`
   - Consider using git-secrets

2. **Never expose keys client-side**
   - Not in frontend JavaScript
   - Not in publicly accessible APIs

3. **Never share keys via email/chat**
   - Use secure password managers
   - Use secret management tools

4. **Never use user accounts**
   - OAuth not suitable for server automation
   - Service accounts are designed for this

5. **Never hardcode credentials**
   - Always use environment variables
   - Never in source code

---

## Environment-Specific Configuration

### Development

```bash
# .env.development
GOOGLE_SERVICE_ACCOUNT_EMAIL=sheets-dev@project-dev.iam.gserviceaccount.com
GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"
GOOGLE_SHEETS_FACES_RATING_ID="1abc123xyz_DEV"
```

### Staging

```bash
# .env.staging
GOOGLE_SERVICE_ACCOUNT_EMAIL=sheets-staging@project-staging.iam.gserviceaccount.com
GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"
GOOGLE_SHEETS_FACES_RATING_ID="1abc123xyz_STAGING"
```

### Production

```bash
# .env.production (managed by deployment platform)
GOOGLE_SERVICE_ACCOUNT_EMAIL=sheets-prod@project-prod.iam.gserviceaccount.com
GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"
GOOGLE_SHEETS_FACES_RATING_ID="1abc123xyz_PROD"
```

**Recommendation:** Use separate Google Cloud projects for each environment.

---

## Deployment Considerations

### Vercel

Add environment variables in project settings:
1. Go to Project Settings → Environment Variables
2. Add each variable
3. Select environments (Production, Preview, Development)
4. Save changes

### Netlify

Add via Netlify CLI or dashboard:
```bash
netlify env:set GOOGLE_SERVICE_ACCOUNT_EMAIL "sheets-prod@..."
netlify env:set GOOGLE_PRIVATE_KEY "-----BEGIN PRIVATE KEY-----..."
netlify env:set GOOGLE_SHEETS_FACES_RATING_ID "1abc123xyz"
```

### Docker

Use secrets or environment files:
```bash
docker run -e GOOGLE_SERVICE_ACCOUNT_EMAIL="..." \
           -e GOOGLE_PRIVATE_KEY="..." \
           -e GOOGLE_SHEETS_FACES_RATING_ID="..." \
           your-image
```

### Kubernetes

Use Secrets:
```yaml
apiVersion: v1
kind: Secret
metadata:
  name: google-sheets-credentials
type: Opaque
stringData:
  GOOGLE_SERVICE_ACCOUNT_EMAIL: sheets-prod@...
  GOOGLE_PRIVATE_KEY: |
    -----BEGIN PRIVATE KEY-----
    ...
    -----END PRIVATE KEY-----
  GOOGLE_SHEETS_FACES_RATING_ID: "1abc123xyz"
```

---

## Troubleshooting Common Issues

### Issue: `Error: invalid_grant`

**Cause:** System clock is out of sync

**Solution:**
```bash
# macOS
sudo sntp -sS time.apple.com

# Linux
sudo ntpdate pool.ntp.org
```

### Issue: `PERMISSION_DENIED`

**Cause:** Service account doesn't have access to spreadsheet

**Solution:**
1. Verify spreadsheet is shared with service account email
2. Check permission is "Editor" (not "Viewer")
3. Wait a few seconds for permissions to propagate

### Issue: `Invalid JWT: Token must be a short-lived token`

**Cause:** Token has expired (shouldn't happen with service accounts)

**Solution:**
1. Check system time is correct
2. Regenerate service account key
3. Update `GOOGLE_PRIVATE_KEY` in `.env`

### Issue: Private key newlines not preserved

**Cause:** Shell or deployment platform strips `\n`

**Solution:**
- Ensure quotes around value in `.env`
- In code: `.replace(/\\n/g, '\n')`
- Some platforms require base64 encoding the private key

---

## Additional Resources

- [Google Cloud Service Accounts Documentation](https://cloud.google.com/iam/docs/service-accounts)
- [Google Sheets API Reference](https://developers.google.com/sheets/api)
- [googleapis Node.js Client](https://github.com/googleapis/google-api-nodejs-client)

## Next Steps

Once authentication is configured:
1. Review [cell-mapping-guide.md](./cell-mapping-guide.md) for sheet setup
2. Use `/create-sheets-rating` command to generate integration files
3. Test with sample data
4. See [best-practices.md](./best-practices.md) for optimization tips
