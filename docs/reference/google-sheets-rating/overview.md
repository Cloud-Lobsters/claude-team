# Google Sheets Rating Engine - Overview

## What is a Sheets-Based Rating Engine?

A **sheets-based rating engine** is an architecture pattern that uses Google Sheets as the calculation engine for insurance premium pricing. Instead of hardcoding complex rating formulas in application code, the formulas live in a Google Sheet where business users (actuaries, underwriters) can maintain them.

## How It Works

```
┌─────────────┐
│  User Form  │
│   (Web UI)  │
└──────┬──────┘
       │
       │ Submit
       │
       ↓
┌─────────────────┐
│ SvelteKit       │
│ Server Action   │
└────────┬────────┘
         │
         │ Map form data
         │ to cells
         │
         ↓
┌─────────────────┐
│ Sheets          │
│ Calculator      │
│ (API Client)    │
└────────┬────────┘
         │
         │ Batch Write
         │ Batch Read
         │
         ↓
┌─────────────────┐
│  Google Sheets  │
│                 │
│ Input Cells ←───┤ Yellow cells (E5, E6, E7...)
│                 │
│ Formulas ───────┤ Calculate instantly
│                 │
│ Output Cells ───┤ Results (E21, E31...)
│                 │
└─────────────────┘
         │
         │ Return results
         │
         ↓
┌─────────────────┐
│  User Interface │
│  Shows Premium  │
└─────────────────┘
```

## Key Components

### 1. Google Sheet

The spreadsheet contains:
- **Input cells** (yellow-highlighted): Where form values are written
- **fieldName column**: Maps each input cell to a form field
- **Formula cells**: Perform calculations
- **Output cells**: Contain calculated results

### 2. Configuration File (`sheets-config.ts`)

TypeScript configuration defining:
- Sheet name (tab name in spreadsheet)
- Input mappings (form field → cell address)
- Output mappings (output name → cell address)

```typescript
export const SHEET_CONFIG = {
  sheetName: 'Medics',
  inputs: {
    annualTurnover: 'E5',
    coverageLevel: 'E6',
  },
  outputs: {
    basePremium: 'E21',
    total: 'E31',
  },
};
```

### 3. API Client (`sheets-calculator.ts`)

Handles Google Sheets API integration:
- Authenticates using service account
- Batch writes input values
- Batch reads calculated outputs
- Error handling

### 4. Server Action (`+page.server.ts`)

SvelteKit endpoint that:
- Receives form submission
- Maps form data to cell addresses
- Calls API client
- Returns results to UI

## When to Use This Pattern

### ✅ **Good Use Cases:**

- **Complex calculations** with many variables and edge cases
- **Frequent formula changes** by business users
- **Actuarial pricing** requiring specialist input
- **Testing scenarios** where business users validate calculations
- **Multi-product lines** each with different formulas
- **Regulatory requirements** that change formula logic

### ❌ **Not Suitable For:**

- Simple calculations (better in code)
- High-frequency requests (>10/second)
- Real-time pricing (API latency ~500ms)
- Calculations with sensitive data that can't be in Google
- Applications without Google Workspace access

## Benefits

### For Developers

- **No formula maintenance**: Business users own calculation logic
- **Type-safe interfaces**: TypeScript throughout
- **Tested pattern**: Proven in production
- **Fast implementation**: Use command to scaffold in minutes
- **Easy updates**: Screenshot-based reconfiguration

### For Business Users

- **Direct control**: Update formulas without code deployments
- **Familiar tools**: Use Google Sheets interface
- **Immediate testing**: See results instantly
- **Version history**: Google Sheets tracks all changes
- **Collaboration**: Multiple users can work on formulas

### For Organizations

- **Faster iteration**: Formula changes don't require developer involvement
- **Reduced bugs**: Business logic validated by domain experts
- **Audit trail**: All formula changes logged
- **Lower costs**: Fewer developer hours on formula tweaks
- **Compliance**: Business users can demonstrate calculation logic

## Limitations

### API Quotas

Google Sheets API has rate limits:
- **Read requests**: 100/100 seconds/user
- **Write requests**: 100/100 seconds/user

**Mitigation:**
- Batch operations (already implemented in pattern)
- Caching for repeated calculations
- Consider user quotas vs service account quotas

### Latency

Typical API call latency: **300-800ms**

**Components:**
- Authentication: 50-100ms (cached)
- Write operation: 100-300ms
- Read operation: 100-300ms
- Network: 50-100ms

**Mitigation:**
- Use loading states in UI
- Consider caching for common scenarios
- Optimize cell mappings (fewer cells = faster)

### Data Volume

Google Sheets limits:
- **5 million cells** per spreadsheet
- **40,000 new rows** per day

**Mitigation:**
- One sheet per product line
- Archive old data regularly
- Use separate sheets for different purposes

## Architecture Decisions

### Why Google Sheets?

**Alternatives considered:**

| Solution | Pros | Cons |
|----------|------|------|
| **Hardcoded formulas** | Fast, no API | Requires developers for changes |
| **Rules engine** | Flexible | Complex setup, learning curve |
| **Database procedures** | Fast | Requires DB access for changes |
| **Excel files** | Familiar | No API, manual updates |
| **Google Sheets** | Business-friendly, API | Latency, quotas |

**Google Sheets wins for:**
- Business user accessibility
- Zero learning curve
- Built-in versioning
- Collaboration features
- Reasonable API capabilities

### Why Service Account Auth?

**Alternatives:**

- **OAuth user tokens**: Requires user login, expires
- **API keys**: Less secure, limited functionality
- **Service account**: ✅ Server-side, never expires, secure

### Why Batch Operations?

**Alternative:** Individual API calls per cell

**Batch advantages:**
- **Single network round-trip**
- **Better quota utilization**
- **Atomic operations**
- **Lower latency**

Example: 10 cells written individually = 10 API calls (~2-3 seconds)
Example: 10 cells written in batch = 1 API call (~300ms)

## Real-World Example

### The `/faces` Route

Product: Medical malpractice insurance for aesthetic practitioners

**Sheet Structure:**
- **Inputs (13 fields)**: Annual turnover, coverage level, treatments offered
- **Calculations**: Base premium, staff loading, training adjustments
- **Outputs (10 fields)**: Premium breakdown, IPT, total

**Performance:**
- Average calculation time: 450ms
- 99th percentile: 800ms
- Error rate: <0.1%

**Business Impact:**
- Formula updates: 2-3 per week
- Developer time saved: ~20 hours/month
- Business user satisfaction: High

## Getting Started

### Quick Start (5 minutes)

1. Prepare your Google Sheet with yellow input cells and fieldName column
2. Take screenshot showing URL and sheet tab
3. Run `/create-sheets-rating` command in Claude Code
4. Configure environment variables
5. Test the integration

### Full Setup Guide

See [authentication.md](./authentication.md) for complete Google Cloud setup.

See [cell-mapping-guide.md](./cell-mapping-guide.md) for sheet preparation.

See [best-practices.md](./best-practices.md) for optimization tips.

## Common Questions

### How do I update formulas?

Business users edit formulas directly in Google Sheets. Changes take effect immediately—no code deployment needed.

### What happens if the sheet is deleted?

API calls will fail. Always maintain backups and use version control for sheet structure (via screenshots or documentation).

### Can multiple products use one sheet?

Yes, use different tabs (sheet names) for each product. Or use separate spreadsheets for better organization.

### How do I test formula changes?

Create a test copy of the sheet, update `GOOGLE_SHEETS_*_RATING_ID` to test sheet ID, test in staging environment.

### What if Google Sheets is down?

Implement fallback logic or cached premium tables for critical operations. Monitor Google Workspace status page.

## Related Documentation

- **Authentication Setup**: [authentication.md](./authentication.md)
- **Cell Mapping Guide**: [cell-mapping-guide.md](./cell-mapping-guide.md)
- **Best Practices**: [best-practices.md](./best-practices.md)
- **Template Files**: [../../templates/sheets-rating/](../../templates/sheets-rating/)
- **Command Reference**: [../../commands/cmd-create-sheets-rating.md](../../commands/cmd-create-sheets-rating.md)

## Example Implementation

See `src/routes/faces/` for a complete working example.
