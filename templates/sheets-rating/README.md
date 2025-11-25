# Google Sheets Rating Engine Template

This template provides a complete integration pattern for using Google Sheets as a rating engine in SvelteKit applications.

## What It Does

- Connects to a Google Sheets spreadsheet via API
- Writes form input values to yellow-highlighted cells
- Reads calculated premium values from output cells
- Provides type-safe interfaces for all operations
- Uses batch operations for optimal performance
- Handles errors gracefully

## When to Use

Use this pattern when:
- Insurance premiums require complex calculation formulas
- Business users need to update calculation logic without code changes
- Rating logic is maintained in spreadsheets by actuaries/underwriters
- You need a bridge between web forms and spreadsheet calculations

## Prerequisites

### Dependencies

```bash
pnpm add googleapis
```

### Google Cloud Setup

**Option A: Reuse Existing Service Account (Recommended for multiple products)**

If you already have a service account (e.g., from `/faces`):

1. Share your spreadsheet with existing service account email
2. Add new spreadsheet ID to `.env`

```bash
# Reuse existing credentials
GOOGLE_SERVICE_ACCOUNT_EMAIL=rating-engine@faces-rating-en.iam.gserviceaccount.com
GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"

# Add new spreadsheet ID
GOOGLE_SHEETS_{{PRODUCT}}_RATING_ID="1abc123xyz..."
```

**Option B: Create New Service Account (For different environments/security domains)**

1. Create a Google Cloud project
2. Enable Google Sheets API
3. Create a service account
4. Generate and download JSON key
5. Share your spreadsheet with the service account email

```bash
# New service account credentials
GOOGLE_SERVICE_ACCOUNT_EMAIL=new-service-account@project.iam.gserviceaccount.com
GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"

# Spreadsheet ID
GOOGLE_SHEETS_{{PRODUCT}}_RATING_ID="1abc123xyz..."
```

See [authentication.md](../../../docs/reference/google-sheets-rating/authentication.md) for detailed setup and decision guide.

## Template Files

### 1. `sheets-config.ts.template`

Defines the configuration for cell mappings:
- Sheet name (tab name in spreadsheet)
- Input field mappings (form field → cell address)
- Output field mappings (output name → cell address)

**Placeholders:**
- `{{PRODUCT_NAME}}` - Product/route name
- `{{SPREADSHEET_ID}}` - ID from Google Sheets URL
- `{{SHEET_NAME}}` - Sheet tab name
- `{{INPUT_MAPPINGS}}` - JavaScript object with input mappings
- `{{OUTPUT_MAPPINGS}}` - JavaScript object with output mappings

### 2. `sheets-calculator.ts.template`

Implements the Google Sheets API integration:
- `getSheetsClient()` - Authenticates and returns sheets client
- `writeInputsToSheet()` - Batch writes input values
- `readOutputsFromSheet()` - Batch reads calculated outputs
- `calculateFromSheet()` - Complete write-then-read operation

**Placeholders:**
- `{{PRODUCT_UPPER}}` - Uppercase product name for env var

### 3. `+page.server.ts.template`

SvelteKit server action that:
- Receives form data
- Maps to cell addresses using config
- Calls calculator functions
- Returns results to client

**No placeholders** - uses imports from other files

## Installation

### Using `/create-sheets-rating` Command (Recommended)

```bash
# In Claude Code, run:
/create-sheets-rating
```

Then provide:
1. Product/route name
2. Screenshot of Google Sheet (must show URL and sheet tab)
3. File location (optional)

The command will:
- Extract spreadsheet ID from URL
- Extract sheet name from tab
- Parse yellow cells and fieldName column
- Generate all files with correct mappings

### Manual Installation

1. **Copy template files to your route:**

```bash
cp .claude/templates/sheets-rating/sheets-config.ts.template \
   src/routes/your-route/sheets-config.ts

cp .claude/templates/sheets-rating/sheets-calculator.ts.template \
   src/routes/your-route/sheets-calculator.ts

cp .claude/templates/sheets-rating/+page.server.ts.template \
   src/routes/your-route/+page.server.ts
```

2. **Replace placeholders:**

In `sheets-config.ts`:
- `{{PRODUCT_NAME}}` → Your product name
- `{{SPREADSHEET_ID}}` → Your spreadsheet ID from URL
- `{{SHEET_NAME}}` → Your sheet tab name
- `{{INPUT_MAPPINGS}}` → Your input field mappings
- `{{OUTPUT_MAPPINGS}}` → Your output field mappings

In `sheets-calculator.ts`:
- `{{PRODUCT_UPPER}}` → Uppercase product name (e.g., FACES, MEDICAL)

3. **Configure environment variables** (see Prerequisites above)

## Screenshot Requirements

When using `/create-sheets-rating`, your screenshot MUST show:

### ✅ Required Elements

1. **URL bar** with full Google Sheets URL
   - Must include spreadsheet ID
   - Example: `https://docs.google.com/spreadsheets/d/1abc123xyz.../edit#gid=0`

2. **Sheet tab name** at bottom
   - Active or highlighted tab showing name
   - Example: "Medics", "Calculator", "Pricing"

3. **Yellow-highlighted cells**
   - These are the input cells where values will be written

4. **"fieldName" column**
   - Maps each yellow cell to a form field name
   - Must match your form field names exactly

5. **Output cells** (optional in screenshot)
   - Cells containing calculated results
   - Can be specified separately

### ❌ Invalid Screenshots

Screenshots missing URL or sheet tab will be **rejected** and you'll be asked to provide a new one.

## Usage Example

### 1. Sheet Configuration

Your Google Sheet should have:
- Yellow-highlighted input cells (e.g., E5, E6, E7)
- A "fieldName" column mapping each yellow cell to a form field
- Formula cells that calculate outputs (e.g., E21, E31)

### 2. Form Submission

```typescript
// Client-side form
<form method="POST" action="?/calculate">
  <input name="annualTurnover" value="500000" />
  <input name="coverageLevel" value="2000000" />
  <button type="submit">Calculate</button>
</form>
```

### 3. Server Processing

```typescript
// +page.server.ts (using this template)
export const actions = {
  calculate: async ({ request }) => {
    // Maps form data → Google Sheet cells
    // Writes to yellow input cells
    // Reads calculated output cells
    // Returns results
  }
};
```

### 4. Results

```typescript
{
  success: true,
  outputs: {
    basePremium: 1250.00,
    ipt: 150.00,
    total: 1400.00
  }
}
```

## Cell Mapping Convention

### Input Mappings (Yellow Cells)

```typescript
inputs: {
  // Form field name: 'Cell address'
  annualTurnover: 'E5',
  coverageLevel: 'E6',
  employeeCount: 'E7',
}
```

### Output Mappings (Calculation Cells)

```typescript
outputs: {
  // Output name: 'Cell address'
  basePremium: 'E21',
  staffLoading: 'E22',
  total: 'E31',
}
```

## Updating Mappings

When your Google Sheet structure changes:

1. Take a new screenshot (showing URL and sheet tab)
2. Run `/create-sheets-rating` again
3. Or manually edit `sheets-config.ts`

## Troubleshooting

### Authentication Errors

**Problem:** `Error: Invalid service account credentials`

**Solution:**
- Verify `GOOGLE_SERVICE_ACCOUNT_EMAIL` is correct
- Check `GOOGLE_PRIVATE_KEY` preserves newlines (`\n`)
- Ensure service account has access to spreadsheet

### Wrong Spreadsheet

**Problem:** `Error: Spreadsheet not found`

**Solution:**
- Verify spreadsheet ID in env variable
- Share spreadsheet with service account email
- Check spreadsheet isn't deleted or moved

### Wrong Sheet Name

**Problem:** `Error: Unable to parse range`

**Solution:**
- Verify sheet name matches tab name exactly (case-sensitive)
- Check for extra spaces in sheet name
- Ensure sheet tab exists in spreadsheet

### Wrong Values

**Problem:** Calculations return unexpected results

**Solution:**
- Verify cell addresses in `sheets-config.ts`
- Check fieldName values match form fields exactly
- Test formulas manually in Google Sheets
- Ensure input values are in correct format

### Rate Limiting

**Problem:** `Error: Quota exceeded`

**Solution:**
- Use batch operations (already implemented in template)
- Add caching for repeated calculations
- Consider upgrading Google Workspace plan

## Architecture

```
User Form Submission
         ↓
+page.server.ts (Server Action)
         ↓
sheets-calculator.ts
         ↓
    ┌────────┴────────┐
    ↓                 ↓
Write Inputs    Read Outputs
(Yellow Cells)  (Formula Cells)
    ↓                 ↓
    └────────┬────────┘
         ↓
Google Sheets (Calculations happen instantly)
         ↓
Return Results to Client
```

## Security Considerations

- ✅ Service account credentials are server-side only
- ✅ Private key never exposed to client
- ✅ Spreadsheet ID in environment variables
- ✅ Authentication handled by Google
- ✅ Rate limiting enforced by Google
- ⚠️ Regularly rotate service account keys
- ⚠️ Use least-privilege permissions
- ⚠️ Don't commit `.env` files

## Performance

- **Batch Operations:** All reads/writes use batch API
- **Instant Calculations:** Formulas recalculate on write
- **No Polling:** Single write-then-read operation
- **Caching:** Consider adding for repeated calculations

## Related Patterns

- **Form Pattern:** Use with Superforms for validation (see `/cmd-create-form`)
- **Modal Pattern:** Display results in modal (see `/cmd-create-modal`)

## Reference Documentation

- **Overview:** [.claude/docs/reference/google-sheets-rating/overview.md](../../../docs/reference/google-sheets-rating/overview.md)
- **Authentication:** [.claude/docs/reference/google-sheets-rating/authentication.md](../../../docs/reference/google-sheets-rating/authentication.md)
- **Cell Mapping Guide:** [.claude/docs/reference/google-sheets-rating/cell-mapping-guide.md](../../../docs/reference/google-sheets-rating/cell-mapping-guide.md)
- **Best Practices:** [.claude/docs/reference/google-sheets-rating/best-practices.md](../../../docs/reference/google-sheets-rating/best-practices.md)

## Example Implementation

See the `/faces` route in this project for a complete working example using this pattern.

**Files to examine:**
- `src/routes/faces/sheets-config.ts` - Configuration
- `src/routes/faces/sheets-calculator.ts` - API client
- `src/routes/faces/+page.server.ts` - Server action
