# Google Sheets Rating Engine - Cell Mapping Guide

This guide explains how to prepare your Google Sheet for use with the rating engine pattern and how to take screenshots that the `/create-sheets-rating` command can parse.

## Sheet Preparation Checklist

- [ ] Input cells highlighted in yellow
- [ ] "fieldName" column with form field mappings
- [ ] Output cells identified
- [ ] Sheet tab has descriptive name
- [ ] Formulas tested and working
- [ ] Screenshot shows URL and sheet tab

---

## Part 1: Preparing Your Google Sheet

### Step 1: Create or Open Your Spreadsheet

1. Go to [sheets.google.com](https://sheets.google.com)
2. Create new spreadsheet or open existing one
3. Name your spreadsheet descriptively (e.g., "Medical Malpractice Rating Calculator")

### Step 2: Name Your Sheet Tab

The sheet tab name (visible at bottom) will be used in the code.

**Good names:**
- `Medics`
- `Calculator`
- `Pricing`
- `TravelInsurance`

**Avoid:**
- Generic names like `Sheet1`
- Special characters
- Very long names
- Spaces at start/end

**To rename:**
1. Right-click on sheet tab at bottom
2. Select "Rename"
3. Enter descriptive name
4. Press Enter

### Step 3: Design Your Layout

Recommended structure:

```
     A              B           C         D         E
1  |             | Input Area |         |         |
2  |             |------------|---------|---------|
3  | Description | fieldName  | Type    | Unit    | Value
4  |-------------|------------|---------|---------|------
5  | Annual...   | annual...  | number  | GBP     | [YELLOW]
6  | Coverage... | coverage...| number  | GBP     | [YELLOW]
7  | Employees   | employee...| number  | count   | [YELLOW]
...
20 |             | Output Area|         |         |
21 | Base Premium|            |         |         | =E5*0.05
22 | Staff Load  |            |         |         | =E7*25
23 | Total       |            |         |         | =E21+E22
```

**Key columns:**
- **Column A**: Human-readable descriptions
- **Column B**: `fieldName` (maps to code)
- **Column E**: Values (inputs in yellow, outputs with formulas)

### Step 4: Highlight Input Cells in Yellow

Input cells are where the API will write form values.

**To highlight cells:**
1. Select the input cell(s) in column E
2. Click fill color icon (paint bucket)
3. Choose **Yellow** (#ffff00 or close to it)
4. Repeat for all input cells

**Example:**
- E5 → yellow (annual turnover input)
- E6 → yellow (coverage level input)
- E7 → yellow (employee count input)
- E21 → white (calculated output)
- E23 → white (calculated output)

**Why yellow?**
- Visual indicator for both humans and screenshot parser
- Easy to distinguish from output cells
- Conventional choice (customizable in future)

### Step 5: Add fieldName Column

The `fieldName` column (Column B) maps each yellow cell to a form field name.

**Example mappings:**

| Cell | Description | fieldName | Form Field |
|------|-------------|-----------|------------|
| E5 | Annual Turnover | `annualTurnover` | `<input name="annualTurnover">` |
| E6 | Coverage Level | `coverageLevel` | `<input name="coverageLevel">` |
| E7 | Employee Count | `employeeCount` | `<input name="employeeCount">` |

**Naming conventions:**
- Use camelCase: `annualTurnover`, not `annual_turnover`
- Match your form field names exactly (case-sensitive)
- No spaces or special characters
- Descriptive but concise

**For fields with hyphens/spaces:**
Some products use kebab-case or have spaces in field names.

Examples:
- `'advanced-beauty'` (with quotes in config)
- `'qualifi-level-5'`

These will work but require quotes in the generated config file.

### Step 6: Create Formula Cells

Output cells contain formulas that calculate premiums.

**Example formulas:**

```excel
# E21: Base Premium
=IF(E5>0, E5*0.025, 0)

# E22: Staff Loading
=IF(E7>1, (E7-1)*50, 0)

# E23: Staff Loaded Premium
=E21+E22

# E30: IPT (Insurance Premium Tax)
=E29*0.12

# E31: Total
=E29+E30
```

**Best practices:**
- Reference other cells (don't hardcode)
- Use clear intermediate calculations
- Add comments for complex logic
- Test with various inputs
- Handle edge cases (divide by zero, negatives)

### Step 7: Test Your Formulas

Before integrating with code:

1. Manually enter test values in yellow cells
2. Verify calculations are correct
3. Test edge cases:
   - Zero values
   - Very large values
   - Negative values (if applicable)
   - Missing optional values
4. Compare with expected premiums
5. Have business users validate results

---

## Part 2: Taking the Screenshot

The `/create-sheets-rating` command parses a screenshot to extract configuration. The screenshot MUST include specific elements.

### Required Screenshots

You will need **TWO screenshots** (or one combined screenshot if all elements fit):

**Screenshot 1 - Input Configuration:**
- ✅ **URL bar** with complete Google Sheets URL
- ✅ **Sheet tab name** at bottom of screen
- ✅ **Yellow input cells** visible
- ✅ **"fieldName" column** (Column B) visible

**Screenshot 2 - Output Configuration:**
- ✅ **Output cells** with calculated formulas visible
- ✅ **Cell addresses** clearly visible (column/row headers)
- ✅ **Cell descriptions/labels** (e.g., "Base Premium", "Total")

**Note:** If your sheet layout allows, you can provide a single screenshot showing both input and output cells, as long as all required elements are clearly visible.

### Screenshot Instructions

#### Step 1: Open Your Sheet in Browser

- Use Google Chrome, Firefox, Safari, or Edge
- Make sure you're logged into Google account
- Open the spreadsheet you want to integrate

#### Step 2: Position Your View

**Scroll to show:**
- Input section (yellow cells)
- fieldName column
- Some output cells if possible

**Don't worry about:**
- Showing entire sheet
- Perfect alignment
- Header rows

#### Step 3: Ensure URL is Visible

The URL must be visible in the address bar.

**URL format:**
```
https://docs.google.com/spreadsheets/d/SPREADSHEET_ID/edit#gid=SHEET_ID
```

**If URL is hidden:**
- Press F11 to exit fullscreen
- Click in address bar to show full URL
- Make browser window bigger

#### Step 4: Ensure Sheet Tab is Visible

The sheet tabs must be visible at the bottom.

**If tabs are hidden:**
- Scroll to top of sheet
- Reduce zoom level (Ctrl+- or Cmd+-)
- Drag bottom of browser window down

**Active tab should be highlighted** showing the sheet name you want to use.

#### Step 5: Take Input Screenshot

**Full browser window screenshot (recommended):**

- **Windows**: Win + Shift + S → Select "Window Snip"
- **macOS**: Cmd + Shift + 4 → Press Space → Click window
- **Linux**: Use screenshot tool to capture window

**Manual selection:**
- Select region that includes: URL bar → Yellow cells → Sheet tabs

#### Step 6: Take Output Screenshot

**Scroll down to show output cells:**
- Scroll to the section with calculated formulas
- Ensure cell addresses (column/row headers) are visible
- Cell descriptions/labels should be visible

**Take screenshot showing:**
- Output cells with formulas (e.g., E21, E22, E29, E30, E31)
- Cell descriptions (e.g., "Base Premium", "Staff Loading", "Total")
- Column and row headers so cell addresses are clear

**Option: Combined Screenshot**
If your sheet layout is compact, you can take ONE screenshot that shows:
- URL bar and sheet tab (top and bottom)
- Yellow input cells AND output cells
- fieldName column AND output descriptions

#### Step 7: Verify Screenshots

**Input Screenshot checklist:**
- [ ] URL bar clearly visible and readable
- [ ] Spreadsheet ID visible in URL
- [ ] Sheet tab name visible and readable at bottom
- [ ] Yellow input cells visible
- [ ] fieldName column (Column B) visible with values
- [ ] Image is clear (not blurry)

**Output Screenshot checklist:**
- [ ] Output cells with formulas visible
- [ ] Cell addresses clearly visible (row/column headers)
- [ ] Cell descriptions/labels visible
- [ ] Image is clear (not blurry)

---

## Good vs Bad Screenshots

### ✅ GOOD Screenshot Example

```
┌─────────────────────────────────────────────────────────┐
│ 🔍 https://docs.google.com/spreadsheets/d/1abc123xyz/... │ ← URL visible
├─────────────────────────────────────────────────────────┤
│                                                           │
│    A           B              C         D        E        │
│    Description fieldName     Type     Unit     Value     │
│    Annual Rev  annualTurnover number  GBP     [YELLOW]   │ ← Yellow cells
│    Coverage    coverageLevel  number  GBP     [YELLOW]   │
│    Employees   employeeCount  number  count   [YELLOW]   │
│                                                           │
│    Base Prem                                 =E5*0.05    │
│    Total                                     =E21+E22    │
│                                                           │
├─────────────────────────────────────────────────────────┤
│ Medics │ Travel │ Jewelry │                              │ ← Sheet tabs
└─────────────────────────────────────────────────────────┘
```

**Why this is good:**
- URL bar shows spreadsheet ID
- Sheet tab "Medics" visible at bottom
- Yellow cells clearly visible
- fieldName column visible (Column B)
- All required elements present

### ❌ BAD Screenshot Examples

**Example 1: URL Not Visible**
```
┌─────────────────────────────────────────┐
│    A           B          C       E      │ ← No URL
│    Annual Rev  annual...  ...    [YELLOW]│
│    Coverage    coverage...  ...  [YELLOW]│
│                                          │
│ Medics │ Travel │ Jewelry │             │
└─────────────────────────────────────────┘
```
**Problem:** Cannot extract spreadsheet ID

**Solution:** Capture full browser window including address bar

---

**Example 2: Sheet Tab Not Visible**
```
┌──────────────────────────────────────────────────┐
│ 🔍 https://docs.google.com/spreadsheets/d/1abc...│
├──────────────────────────────────────────────────┤
│    A           B              C       E           │
│    Annual Rev  annualTurnover ...    [YELLOW]    │
│    Coverage    coverageLevel  ...    [YELLOW]    │
│                                                   │
│    (End of screenshot - tabs cut off)            │
└──────────────────────────────────────────────────┘
```
**Problem:** Cannot extract sheet name

**Solution:** Scroll up or reduce zoom to show sheet tabs

---

**Example 3: fieldName Column Not Visible**
```
┌──────────────────────────────────────────────────┐
│ 🔍 https://docs.google.com/spreadsheets/d/1abc...│
├──────────────────────────────────────────────────┤
│    D         E                                    │
│    Unit      Value                                │
│    GBP       [YELLOW]  ← Can't see fieldName     │
│    GBP       [YELLOW]                             │
│                                                   │
│ Medics │ Travel │ Jewelry │                       │
└──────────────────────────────────────────────────┘
```
**Problem:** Cannot map cells to form fields

**Solution:** Scroll left to show Column B (fieldName)

---

**Example 4: URL Truncated**
```
┌──────────────────────────────────────────────────┐
│ 🔍 docs.google.com/spreadsheets/d/1a... ⓘ 🔒 ⋮  │ ← ID cut off
├──────────────────────────────────────────────────┤
│    A           B              C       E           │
│    ...                                            │
└──────────────────────────────────────────────────┘
```
**Problem:** Spreadsheet ID not fully visible

**Solution:** Click in address bar to show full URL, then take screenshot

---

## Part 3: Screenshot Validation

When you upload your screenshot to `/create-sheets-rating`, it will be validated.

### Validation Process

```
1. Check: Is URL bar visible?
   ❌ No → Reject with message: "URL bar not visible"
   ✅ Yes → Continue

2. Check: Can spreadsheet ID be extracted from URL?
   ❌ No → Reject with message: "Cannot extract spreadsheet ID"
   ✅ Yes → Extract ID (e.g., "1abc123xyz")

3. Check: Are sheet tabs visible at bottom?
   ❌ No → Reject with message: "Sheet tabs not visible"
   ✅ Yes → Continue

4. Check: Can sheet name be read from active tab?
   ❌ No → Reject with message: "Cannot read sheet name"
   ✅ Yes → Extract name (e.g., "Medics")

5. Check: Are yellow cells visible?
   ❌ No → Warn: "Cannot identify yellow cells clearly"
   ✅ Yes → Parse cell addresses

6. Check: Is fieldName column visible?
   ❌ No → Reject with message: "fieldName column not visible"
   ✅ Yes → Parse field mappings

7. All checks passed → Generate configuration files
```

### What Happens on Rejection

If your screenshot is rejected:

1. You'll see a clear error message explaining what's missing
2. Instructions on how to fix it
3. Request for a new screenshot
4. **Process will NOT continue** until valid screenshot provided

**Example rejection message:**
```
❌ Screenshot rejected: I cannot see the URL bar with the spreadsheet ID
in your screenshot. Please provide a new screenshot that includes the full
browser window with the Google Sheets URL visible in the address bar.
```

---

## Part 4: Cell Mapping Examples

### Example 1: Simple Product

**Sheet structure:**
```
   B (fieldName)      E (Value)
   -------------      ----------
   productPrice       [YELLOW] 500
   quantity           [YELLOW] 2

   subtotal           =E1*E2
   tax                =E3*0.2
   total              =E3+E4
```

**Generated config:**
```typescript
inputs: {
  productPrice: 'E1',
  quantity: 'E2',
},
outputs: {
  subtotal: 'E3',
  tax: 'E4',
  total: 'E5',
}
```

### Example 2: Insurance Premium

**Sheet structure:**
```
   B (fieldName)           E (Value)
   ------------------      ----------
   annualTurnover          [YELLOW] 500000
   coverageLevel           [YELLOW] 2000000
   employeeCount           [YELLOW] 5
   sellsProducts           [YELLOW] true

   basePremium             =E1*0.025
   staffLoading            =(E3-1)*50
   productLoading          =IF(E4,250,0)
   subTotal                =E5+E6+E7
   ipt                     =E8*0.12
   total                   =E8+E9
```

**Generated config:**
```typescript
inputs: {
  annualTurnover: 'E1',
  coverageLevel: 'E2',
  employeeCount: 'E3',
  sellsProducts: 'E4',
},
outputs: {
  basePremium: 'E5',
  staffLoading: 'E6',
  productLoading: 'E7',
  subTotal: 'E8',
  ipt: 'E9',
  total: 'E10',
}
```

### Example 3: Complex Mappings with Hyphens

**Sheet structure:**
```
   B (fieldName)           E (Value)
   ------------------      ----------
   advanced-beauty         [YELLOW] yes
   injectables-ablative    [YELLOW] yes
   aesthetic-treatments    [YELLOW] no
   qualifi-level-5         [YELLOW] yes
```

**Generated config:**
```typescript
inputs: {
  'advanced-beauty': 'E1',           // Quotes needed
  'injectables-ablative': 'E2',
  'aesthetic-treatments': 'E3',
  'qualifi-level-5': 'E4',
},
```

---

## Troubleshooting

### Issue: Screenshot Rejected

**Problem:** "URL bar not visible"

**Solution:**
- Press F11 to exit fullscreen
- Expand browser window
- Take new screenshot including address bar

---

**Problem:** "Cannot extract spreadsheet ID"

**Solution:**
- Click in address bar to show full URL
- Ensure URL contains `/d/SPREADSHEET_ID/`
- Take new screenshot with full URL visible

---

**Problem:** "Sheet tabs not visible"

**Solution:**
- Scroll to top of sheet
- Reduce zoom level (Ctrl+- or Cmd+-)
- Make browser window taller
- Take new screenshot including bottom tabs

---

### Issue: Wrong Mappings Generated

**Problem:** fieldName doesn't match form field

**Solution:**
- Update fieldName in Column B of sheet
- Ensure exact match (case-sensitive)
- Take new screenshot
- Regenerate configuration

---

**Problem:** Some yellow cells not detected

**Solution:**
- Ensure cells are truly yellow (#ffff00 or similar)
- Avoid light yellow or cream colors
- Highlight cells with standard yellow color
- Take new screenshot with higher resolution

---

## Best Practices

### Sheet Design

1. **Keep it simple**: One input per row
2. **Clear fieldNames**: Use camelCase, descriptive
3. **Group logically**: Inputs together, outputs together
4. **Document formulas**: Add comments for complex logic
5. **Test thoroughly**: Validate all calculations before integration

### Screenshots

1. **Full window**: Capture entire browser window
2. **Good resolution**: At least 1920x1080
3. **Clear visibility**: No glare, proper zoom level
4. **Active sheet**: Ensure correct sheet tab is highlighted
5. **Complete URL**: Don't truncate address bar

### Maintenance

1. **Version control**: Keep screenshots in project docs
2. **Document changes**: Note when formulas change
3. **Test after updates**: Regenerate and test integration
4. **Backup sheets**: Copy sheet before major changes

---

## Next Steps

Once your sheet is prepared and screenshot taken:

1. Run `/create-sheets-rating` command
2. Upload your screenshot
3. Specify output cells
4. Review generated configuration
5. Test integration with sample data

See [best-practices.md](./best-practices.md) for optimization tips.
