# Create Google Sheets Rating Engine

Wire up a Google Sheets-based rating engine to a SvelteKit route for insurance premium calculations. This pattern allows business users to maintain complex calculation formulas in Google Sheets while your code handles the data integration.

## Instructions

First, ask the user for:
1. **Product/route name** (e.g., "faces", "medical-malpractice", "travel-insurance")
2. **Service account strategy**:
   - Do you want to **reuse an existing service account** or **create a new one**?
   - **Reuse if:** Same application, same environment, same security domain
   - **Create new if:** Different environment (dev/prod), different security requirements, need independent access control
3. **Input screenshot of Google Sheet** that MUST include:
   - ✅ **URL bar visible** showing full spreadsheet URL with spreadsheet ID
   - ✅ **Sheet tab name visible** at bottom of screenshot
   - ✅ **Yellow-highlighted cells** (these are the input cells)
   - ✅ **"fieldName" column** with form field names
4. **Output screenshot of Google Sheet** showing:
   - ✅ **Output cells** with calculated results (formulas)
   - ✅ **Cell addresses clearly visible** (column/row headers)
   - Can be same screenshot as input if all cells are visible, or separate screenshot
5. **File location** (where to generate files, default: `src/routes/{route-name}/`)

---

## CRITICAL: Screenshot Validation (Step 1)

⚠️ **BEFORE PROCEEDING**, validate the screenshot has BOTH required elements:

### Required Element 1: Spreadsheet ID in URL
The URL bar must be visible showing the Google Sheets URL with the spreadsheet ID.

**Example URL:**
```
https://docs.google.com/spreadsheets/d/1a2b3c4d5e6f7g8h9i0j/edit#gid=0
                                    ^^^^^^^^^^^^^^^^^
                                    Spreadsheet ID
```

### Required Element 2: Sheet Tab Name
The sheet tabs must be visible at the bottom showing the tab name (e.g., "Medics", "Calculator", "Pricing").

### Validation Logic

```
IF url_bar_not_visible OR spreadsheet_id_not_in_url:
  ❌ REJECT screenshot
  RETURN: "I cannot see the URL bar with the spreadsheet ID in your screenshot.
           Please provide a new screenshot that includes the full browser window
           with the Google Sheets URL visible in the address bar."
  STOP and WAIT for new screenshot

IF sheet_tab_not_visible_at_bottom:
  ❌ REJECT screenshot
  RETURN: "I cannot see the sheet tab name at the bottom of your screenshot.
           Please provide a new screenshot that includes the sheet tabs at
           the bottom of the Google Sheets interface."
  STOP and WAIT for new screenshot

IF both_present:
  ✅ ACCEPT screenshot
  CONTINUE to extraction step
```

**DO NOT PROCEED** to the next steps until you have a valid screenshot with both elements visible.

---

## Step 2: Extract Configuration from Screenshot

Once you have a valid screenshot, extract:

### A. Spreadsheet ID
From the URL in the screenshot:
- URL format: `https://docs.google.com/spreadsheets/d/{SPREADSHEET_ID}/edit...`
- Extract the ID between `/d/` and `/edit`
- Example: `1a2b3c4d5e6f7g8h9i0j`

### B. Sheet Name
From the visible tab at the bottom:
- Look for the active or highlighted tab name
- Example: "Medics", "Calculator", "Pricing"

### C. Input Field Mappings
From the yellow-highlighted cells and fieldName column:
- Identify all cells with yellow background
- Read the corresponding "fieldName" value in the same row
- Create mapping: `fieldName: 'cellAddress'`

Example:
```typescript
{
  annualTurnover: 'E5',      // Yellow cell E5, fieldName = "annualTurnover"
  coverageLevel: 'E6',        // Yellow cell E6, fieldName = "coverageLevel"
  'advanced-beauty': 'E8',    // Yellow cell E8, fieldName = "advanced-beauty"
}
```

### D. Output Field Mappings
From the output screenshot:
- Identify cells with formulas (calculated results)
- Look for cells with descriptions like "Base Premium", "Total", "IPT", etc.
- Extract cell addresses from column/row headers

Ask the user to confirm:
- "I can see the following output cells: [list cells]. What should each be named in the code?"
- If cell descriptions are visible, suggest names based on them
- Example: Cell with "Base Premium" description → suggest name `basePremium`

Example:
```typescript
{
  basePremium: 'E21',     // From output screenshot, has "Base Premium" label
  staffLoading: 'E22',    // From output screenshot, has "Staff Loading" label
  subTotal: 'E29',        // From output screenshot, has "Sub Total" label
  ipt: 'E30',             // From output screenshot, has "IPT" label
  total: 'E31',           // From output screenshot, has "Total" label
}
```

**If user provides separate output screenshot:**
- Parse cell addresses from the screenshot
- Identify formula cells (typically below input cells)
- Ask user to confirm output names

---

## Step 3: Generate Configuration File

Create `{route}/sheets-config.ts`:

```typescript
// Google Sheets configuration for {ProductName} calculator
// Spreadsheet ID: {SPREADSHEET_ID} (extracted from screenshot)
// Sheet: {SHEET_NAME} (extracted from screenshot)
//
// Input cells (yellow) are mapped to form field names via "fieldName" column
// Output cells contain calculated values after formulas run

export interface SheetConfig {
	sheetName: string;
	inputs: Record<string, string>;
	outputs: Record<string, string>;
}

export const SHEET_CONFIG: SheetConfig = {
	sheetName: '{SHEET_NAME}',

	inputs: {
		// Extracted from screenshot - yellow cells + fieldName column
		{INPUT_MAPPINGS}
	},

	outputs: {
		// User-specified calculation outputs
		{OUTPUT_MAPPINGS}
	},
};
```

Replace:
- `{SHEET_NAME}` with extracted sheet name
- `{INPUT_MAPPINGS}` with field mappings from screenshot
- `{OUTPUT_MAPPINGS}` with user-specified outputs

---

## Step 4: Generate Calculator File

Create `{route}/sheets-calculator.ts`:

```typescript
import { google } from 'googleapis';
import { SHEET_CONFIG } from './sheets-config';
import { env } from '$env/dynamic/private';

// Initialize the sheets client
let sheetsClient: any = null;

async function getSheetsClient() {
	if (sheetsClient) return sheetsClient;

	const auth = new google.auth.GoogleAuth({
		credentials: {
			client_email: env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
			private_key: env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
		},
		scopes: ['https://www.googleapis.com/auth/spreadsheets'],
	});

	sheetsClient = google.sheets({ version: 'v4', auth });
	return sheetsClient;
}

export interface CellMapping {
	field: string;
	cell: string;
	value: string;
}

export interface CalculationResult {
	success: boolean;
	outputs?: Record<string, number>;
	error?: string;
}

/**
 * Write input values to the Google Sheet
 */
export async function writeInputsToSheet(mappings: CellMapping[]): Promise<boolean> {
	const sheets = await getSheetsClient();

	// Prepare batch update data
	const data = mappings.map((mapping) => ({
		range: `${SHEET_CONFIG.sheetName}!${mapping.cell}`,
		values: [[mapping.value]],
	}));

	await sheets.spreadsheets.values.batchUpdate({
		spreadsheetId: env.GOOGLE_SHEETS_{PRODUCT_UPPER}_RATING_ID,
		requestBody: {
			valueInputOption: 'USER_ENTERED',
			data,
		},
	});

	return true;
}

/**
 * Read calculated output values from the Google Sheet
 */
export async function readOutputsFromSheet(): Promise<Record<string, number>> {
	const sheets = await getSheetsClient();

	// Get all output cell ranges
	const ranges = Object.entries(SHEET_CONFIG.outputs).map(
		([_, cell]) => `${SHEET_CONFIG.sheetName}!${cell}`
	);

	const response = await sheets.spreadsheets.values.batchGet({
		spreadsheetId: env.GOOGLE_SHEETS_{PRODUCT_UPPER}_RATING_ID,
		ranges,
	});

	// Parse the results
	const outputs: Record<string, number> = {};
	const outputKeys = Object.keys(SHEET_CONFIG.outputs);

	response.data.valueRanges?.forEach((range: any, index: number) => {
		const key = outputKeys[index];
		const value = range.values?.[0]?.[0];
		outputs[key] = typeof value === 'number' ? value : parseFloat(value) || 0;
	});

	return outputs;
}

/**
 * Calculate premium by writing inputs and reading outputs
 */
export async function calculateFromSheet(mappings: CellMapping[]): Promise<CalculationResult> {
	try {
		// Write inputs
		await writeInputsToSheet(mappings);

		// Read outputs (formulas recalculate instantly on write)
		const outputs = await readOutputsFromSheet();

		return {
			success: true,
			outputs,
		};
	} catch (error: any) {
		return {
			success: false,
			error: error.message || 'Failed to calculate from sheet',
		};
	}
}
```

Replace:
- `{PRODUCT_UPPER}` with uppercase product name (e.g., "FACES", "MEDICAL_MALPRACTICE")

---

## Step 5: Generate Server Action File

Create `{route}/+page.server.ts`:

```typescript
import type { Actions } from './$types';
import { SHEET_CONFIG } from './sheets-config';
import { calculateFromSheet, type CellMapping } from './sheets-calculator';

export const actions: Actions = {
	calculate: async ({ request }) => {
		const formData = await request.formData();

		const cellMappings: CellMapping[] = [];

		// Map all fields - pass raw values to sheet
		for (const [field, cell] of Object.entries(SHEET_CONFIG.inputs)) {
			const value = formData.get(field);
			cellMappings.push({ field, cell, value: String(value ?? '') });
		}

		// Calculate from Google Sheets
		const result = await calculateFromSheet(cellMappings);

		return {
			success: result.success,
			mappings: cellMappings,
			outputs: result.outputs,
			error: result.error,
		};
	},
};
```

---

## Step 6: Create Documentation File

Create `{route}/README.md`:

````markdown
# {ProductName} Google Sheets Rating Engine

This route uses Google Sheets as a rating engine for premium calculations.

## Configuration

**Extracted from screenshot:**
- **Spreadsheet ID**: `{SPREADSHEET_ID}`
- **Sheet Name**: `{SHEET_NAME}`
- **Input Fields**: {COUNT} mappings
- **Output Fields**: {COUNT} mappings

## Screenshot Requirements

When updating this integration, your screenshot MUST include:

1. ✅ **URL bar** with full spreadsheet URL showing spreadsheet ID
2. ✅ **Sheet tab name** visible at bottom
3. ✅ **Yellow-highlighted cells** (inputs)
4. ✅ **"fieldName" column** with mappings

❌ Screenshots missing URL or sheet tab will be rejected.

## Environment Variables

Add to your `.env` file:

```bash
# Google Service Account Credentials
GOOGLE_SERVICE_ACCOUNT_EMAIL=your-service-account@project.iam.gserviceaccount.com
GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"

# Spreadsheet Configuration
GOOGLE_SHEETS_{PRODUCT_UPPER}_RATING_ID="{SPREADSHEET_ID}"
```

## Dependencies

Install the Google Sheets API client:

```bash
pnpm add googleapis
```

## How It Works

1. User submits form with input values
2. Server maps form fields to Google Sheet cells using `sheets-config.ts`
3. `sheets-calculator.ts` writes values to yellow input cells
4. Google Sheets formulas calculate instantly
5. Server reads calculated values from output cells
6. Results returned to client

## File Structure

```
{route}/
├── sheets-config.ts        # Cell mappings (from screenshot)
├── sheets-calculator.ts    # Google Sheets API client
├── +page.server.ts         # SvelteKit server action
└── README.md              # This file
```

## Updating Cell Mappings

To update cell mappings:

1. Take a new screenshot showing URL and sheet tab
2. Use `/create-sheets-rating` command again
3. Or manually edit `sheets-config.ts`

## Troubleshooting

### Authentication Errors
- Verify service account credentials in `.env`
- Check service account has access to the spreadsheet
- Ensure `GOOGLE_PRIVATE_KEY` preserves `\n` characters

### Wrong Values Calculated
- Verify spreadsheet ID is correct
- Verify sheet name matches the tab name exactly
- Check cell addresses match yellow highlighted cells

### Cell Mapping Errors
- Ensure `fieldName` column values match form field names exactly
- Verify yellow cells have corresponding fieldName entries
- Check for typos in field names (case-sensitive)
````

Replace all placeholders with extracted/provided values.

---

## Step 7: Show Setup Instructions

After generating files, show the user:

```
✅ Successfully generated Google Sheets rating engine!

📊 Configuration:
- Spreadsheet ID: {SPREADSHEET_ID}
- Sheet Name: {SHEET_NAME}
- Input mappings: {COUNT}
- Output mappings: {COUNT}

📁 Files created:
- {route}/sheets-config.ts
- {route}/sheets-calculator.ts
- {route}/+page.server.ts
- {route}/README.md

🔧 Next steps:

1. Install dependencies:
   pnpm add googleapis

2. Configure authentication:

   IF REUSING EXISTING SERVICE ACCOUNT:
   ✅ Add to .env (reuse existing credentials):
      GOOGLE_SERVICE_ACCOUNT_EMAIL=rating-engine@faces-rating-en.iam.gserviceaccount.com
      GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"
      GOOGLE_SHEETS_{PRODUCT_UPPER}_RATING_ID="{SPREADSHEET_ID}"

   ✅ Share spreadsheet with existing service account:
      - Open Google Sheet
      - Click "Share"
      - Add: rating-engine@faces-rating-en.iam.gserviceaccount.com
      - Permission: Editor
      - Uncheck "Notify people"
      - Click "Share"

   IF CREATING NEW SERVICE ACCOUNT:
   📝 Follow full setup:
      - Go to Google Cloud Console
      - Create new service account
      - Generate JSON key
      - Add credentials to .env:
        GOOGLE_SERVICE_ACCOUNT_EMAIL=new-service-account@project.iam.gserviceaccount.com
        GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"
        GOOGLE_SHEETS_{PRODUCT_UPPER}_RATING_ID="{SPREADSHEET_ID}"
      - Share spreadsheet with new service account email
      - See: .claude/docs/reference/google-sheets-rating/authentication.md

3. Test the integration:
   pnpm dev
   Navigate to /{route}
   Submit test form data

📚 Documentation:
- Pattern overview: .claude/docs/reference/google-sheets-rating/overview.md
- Authentication guide: .claude/docs/reference/google-sheets-rating/authentication.md
- Cell mapping guide: .claude/docs/reference/google-sheets-rating/cell-mapping-guide.md
- Best practices: .claude/docs/reference/google-sheets-rating/best-practices.md

💡 Example implementation: See /faces route
```

---

## Important Notes

### ✅ Best Practices:
- Always validate screenshot before proceeding
- Extract spreadsheet ID from URL (don't ask user)
- Extract sheet name from tab (don't ask user)
- Yellow cells = inputs only
- Use batch operations for efficiency
- Pass raw values to sheet (let sheet handle conversions)
- Read outputs after write (formulas recalculate instantly)
- Document configuration in README

### ❌ Avoid:
- Proceeding without valid screenshot
- Manually asking for spreadsheet ID or sheet name
- Individual API calls (use batch operations)
- Client-side calculations (use sheet formulas)
- Hardcoding values (use environment variables)

### 🔒 Security:
- Service account credentials in `.env` only (server-side)
- Never expose private key to client
- Use least-privilege permissions
- Regularly rotate service account keys

---

## Pattern Reference

See `.claude/CLAUDE.md` > Component Patterns > Sheets Rating Pattern

For detailed documentation, see `.claude/docs/reference/google-sheets-rating/`

---

## Summary

After completing these steps, you will have:
1. ✅ Screenshot-validated configuration
2. ✅ Extracted spreadsheet ID and sheet name
3. ✅ Type-safe sheet configuration
4. ✅ Google Sheets API integration
5. ✅ Server action with cell mappings
6. ✅ Complete documentation
7. ✅ Environment setup guide
8. ✅ Clean, maintainable rating engine
