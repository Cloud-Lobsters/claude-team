# Google Sheets Rating Engine - Best Practices

This guide provides recommendations for optimizing performance, maintaining code quality, and ensuring reliability when using the Google Sheets rating engine pattern.

## Table of Contents

1. [Sheet Design](#sheet-design)
2. [Performance Optimization](#performance-optimization)
3. [Error Handling](#error-handling)
4. [Testing Strategy](#testing-strategy)
5. [Maintenance & Updates](#maintenance--updates)
6. [Security](#security)
7. [Monitoring](#monitoring)

---

## Sheet Design

### Keep Sheets Focused

**✅ Do:**
- One sheet per product line
- Clear separation of inputs and outputs
- Logical grouping of related fields

**❌ Don't:**
- Combine multiple unrelated products in one sheet
- Mix test data with production formulas
- Create overly complex mega-sheets

**Example structure:**
```
Spreadsheet: "Insurance Calculators"
├── Sheet: "Medics" (medical malpractice)
├── Sheet: "Travel" (travel insurance)
└── Sheet: "Jewelry" (valuable items)
```

### Use Descriptive Names

**Cell names:**
```typescript
// ✅ Good
annualTurnover: 'E5'
coverageLevel: 'E6'
employeeCount: 'E7'

// ❌ Bad
val1: 'E5'
input2: 'E6'
x: 'E7'
```

**Sheet names:**
```
// ✅ Good
Medics, TravelInsurance, JewelryValuation

// ❌ Bad
Sheet1, Calculator, Calc2
```

### Optimize Formula Complexity

**Keep formulas readable:**

```excel
# ✅ Good - broken into steps
E21: =E5*0.025              # Base rate
E22: =IF(E7>1,(E7-1)*50,0)  # Staff loading
E23: =E21+E22               # Combined

# ❌ Bad - complex single formula
E23: =IF(E5>0,E5*0.025,0)+IF(E7>1,(E7-1)*50,0)+IF(E8="yes",250,0)
```

### Document Your Formulas

Use cell comments for complex logic:

1. Right-click cell
2. Select "Insert comment"
3. Explain the calculation
4. Include business rules

**Example comment:**
```
E21: Base Premium Calculation
Formula: Annual Turnover × 2.5%
Minimum: £500
Maximum: £10,000
Updated: 2025-11-20 by Actuary Team
```

---

## Performance Optimization

### Minimize API Calls

**✅ Use batch operations:**

```typescript
// Already implemented in template
await sheets.spreadsheets.values.batchUpdate({
  spreadsheetId: env.GOOGLE_SHEETS_PRODUCT_RATING_ID,
  requestBody: {
    valueInputOption: 'USER_ENTERED',
    data: mappings,  // All inputs in one call
  },
});
```

**❌ Avoid individual calls:**

```typescript
// Don't do this!
for (const mapping of mappings) {
  await sheets.spreadsheets.values.update({...});  // Multiple API calls
}
```

### Reduce Cell Count

**Optimize mappings:**

```typescript
// ✅ Good - only necessary inputs/outputs
inputs: {
  annualTurnover: 'E5',
  coverageLevel: 'E6',
  employeeCount: 'E7',
}

// ❌ Bad - unnecessary fields
inputs: {
  annualTurnover: 'E5',
  annualTurnoverLabel: 'A5',      // Not needed
  annualTurnoverDescription: 'C5', // Not needed
  annualTurnoverHelp: 'D5',       // Not needed
}
```

**Why:** Each cell in the batch adds latency. Only map what you need.

### Cache Results When Appropriate

For scenarios where the same inputs are requested frequently:

```typescript
import { LRUCache } from 'lru-cache';

const cache = new LRUCache<string, CalculationResult>({
  max: 1000,
  ttl: 1000 * 60 * 60, // 1 hour
});

export async function calculateFromSheet(mappings: CellMapping[]): Promise<CalculationResult> {
  const cacheKey = JSON.stringify(mappings);

  const cached = cache.get(cacheKey);
  if (cached) return cached;

  // ... perform calculation ...

  cache.set(cacheKey, result);
  return result;
}
```

**When to cache:**
- Quote systems (users browse multiple options)
- Comparison tools (same inputs, different products)
- Public calculators (common scenarios repeat)

**When NOT to cache:**
- Purchase flows (always calculate fresh)
- Admin tools (need latest formulas)
- User-specific calculations

### Optimize Sheet Formulas

**Use efficient formulas:**

```excel
# ✅ Fast
=E5*0.025

# ❌ Slow (unnecessary complexity)
=SUMPRODUCT((E5:E5)*(0.025:0.025))
```

**Avoid volatile functions if possible:**
- `NOW()`, `TODAY()` - recalculate constantly
- `RAND()`, `RANDBETWEEN()` - non-deterministic

If you need dates, pass them as inputs:

```typescript
inputs: {
  calculationDate: 'E10',  // Pass from server
}
```

---

## Error Handling

### Validate Inputs Before Sending

**Server-side validation:**

```typescript
export const actions: Actions = {
  calculate: async ({ request }) => {
    const formData = await request.formData();

    // ✅ Validate before calling sheets
    const annualTurnover = Number(formData.get('annualTurnover'));
    if (isNaN(annualTurnover) || annualTurnover < 0) {
      return fail(400, {
        error: 'Annual turnover must be a positive number',
      });
    }

    // Continue with sheets calculation...
  },
};
```

### Handle Sheets API Errors Gracefully

**Implement retry logic:**

```typescript
async function calculateWithRetry(
  mappings: CellMapping[],
  maxRetries = 3
): Promise<CalculationResult> {
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      return await calculateFromSheet(mappings);
    } catch (error) {
      if (attempt === maxRetries) throw error;

      // Exponential backoff
      await new Promise(resolve =>
        setTimeout(resolve, Math.pow(2, attempt) * 1000)
      );
    }
  }

  throw new Error('Max retries exceeded');
}
```

### Provide Fallback Calculations

For critical flows, consider a fallback:

```typescript
try {
  result = await calculateFromSheet(mappings);
} catch (error) {
  console.error('Sheets API failed:', error);

  // Fallback to simplified calculation
  result = {
    success: true,
    outputs: {
      basePremium: annualTurnover * 0.025,
      total: annualTurnover * 0.025 * 1.12,
    },
    fallback: true,
  };
}
```

### Log Errors with Context

```typescript
catch (error) {
  console.error('Sheets calculation failed:', {
    error: error.message,
    spreadsheetId: env.GOOGLE_SHEETS_PRODUCT_RATING_ID,
    sheetName: SHEET_CONFIG.sheetName,
    inputCount: mappings.length,
    timestamp: new Date().toISOString(),
  });

  // Send to error tracking service
  Sentry.captureException(error, {
    contexts: {
      sheets: {
        spreadsheetId: env.GOOGLE_SHEETS_PRODUCT_RATING_ID,
        sheetName: SHEET_CONFIG.sheetName,
      },
    },
  });
}
```

---

## Testing Strategy

### Unit Tests for Mappers

Test the mapping logic without calling Sheets API:

```typescript
import { describe, it, expect } from 'vitest';
import { SHEET_CONFIG } from './sheets-config';

describe('Sheet Configuration', () => {
  it('has all required input fields', () => {
    expect(SHEET_CONFIG.inputs).toHaveProperty('annualTurnover');
    expect(SHEET_CONFIG.inputs).toHaveProperty('coverageLevel');
  });

  it('has valid cell addresses', () => {
    Object.values(SHEET_CONFIG.inputs).forEach(cell => {
      expect(cell).toMatch(/^[A-Z]+[0-9]+$/);
    });
  });
});
```

### Integration Tests with Test Sheet

Create a test copy of your sheet:

```typescript
// test-sheets-calculator.ts
import { calculateFromSheet } from './sheets-calculator';

describe('Sheets Calculator Integration', () => {
  beforeAll(() => {
    // Point to test sheet
    process.env.GOOGLE_SHEETS_PRODUCT_RATING_ID = 'TEST_SHEET_ID';
  });

  it('calculates premium correctly', async () => {
    const result = await calculateFromSheet([
      { field: 'annualTurnover', cell: 'E5', value: '500000' },
      { field: 'coverageLevel', cell: 'E6', value: '2000000' },
    ]);

    expect(result.success).toBe(true);
    expect(result.outputs?.basePremium).toBeCloseTo(12500, 2);
  });
});
```

### Manual Testing Checklist

Before deploying changes:

- [ ] Test with minimum values
- [ ] Test with maximum values
- [ ] Test with zero values
- [ ] Test with negative values (if applicable)
- [ ] Test with missing optional fields
- [ ] Compare results with business expectations
- [ ] Verify all output fields populated
- [ ] Check error handling for invalid inputs

### Load Testing

Test API quota limits:

```typescript
// load-test.ts
async function loadTest() {
  const requests = [];

  for (let i = 0; i < 100; i++) {
    requests.push(calculateFromSheet(testMappings));
  }

  const start = Date.now();
  const results = await Promise.all(requests);
  const duration = Date.now() - start;

  console.log(`100 requests in ${duration}ms`);
  console.log(`Success rate: ${results.filter(r => r.success).length}%`);
}
```

---

## Maintenance & Updates

### Version Control for Sheets

**Document sheet structure:**

```markdown
# Sheet Version History

## v1.2.0 (2025-11-25)
- Added `sellsThirdPartyProducts` input field (E14)
- Updated IPT calculation to 12% (was 10%)
- Changed: E30 formula from `=E29*0.1` to `=E29*0.12`

## v1.1.0 (2025-11-01)
- Added staff loading calculation (E22)
- New input: `employeeCount` (E12)
```

**Keep screenshots updated:**

Store in project docs:
```
docs/
└── sheets/
    ├── medics-sheet-v1.2.0.png
    ├── medics-sheet-v1.1.0.png
    └── cell-mappings.md
```

### Update Workflow

When business users update formulas:

1. **Notification**: Business user informs dev team
2. **Review**: Developer reviews changes in sheet
3. **Screenshot**: Take new screenshot if cell mappings changed
4. **Regenerate**: Run `/create-sheets-rating` if needed
5. **Test**: Run integration tests with new formulas
6. **Deploy**: Update environment variables if sheet ID changed
7. **Document**: Update version history

### Handling Breaking Changes

If cell addresses change:

```typescript
// Old config (v1)
inputs: {
  annualTurnover: 'E5',
}

// New config (v2) - cell moved
inputs: {
  annualTurnover: 'E8',  // Changed from E5
}
```

**Migration steps:**

1. Create new config file: `sheets-config-v2.ts`
2. Update imports to use v2
3. Test thoroughly
4. Deploy during low-traffic window
5. Keep v1 config for rollback
6. Remove v1 after confirming v2 works

---

## Security

### Protect Service Account Credentials

**✅ Do:**
- Store in environment variables
- Use secret management tools (AWS Secrets Manager, Vault)
- Rotate keys every 90 days
- Monitor service account activity
- Restrict spreadsheet access (specific service account only)

**❌ Don't:**
- Commit to version control
- Hardcode in source code
- Share via email/Slack
- Use same key for dev/prod
- Grant unnecessary permissions

### Validate User Inputs

**Sanitize before sending to sheets:**

```typescript
function sanitizeInput(value: string): string {
  // Remove potential formula injection
  if (value.startsWith('=') || value.startsWith('+') || value.startsWith('-')) {
    return value.substring(1);
  }
  return value;
}
```

### Rate Limiting

Protect against abuse:

```typescript
import { rateLimit } from '$lib/server/rate-limit';

export const actions: Actions = {
  calculate: async ({ request, getClientAddress }) => {
    // Limit to 10 requests per minute per IP
    const limiter = rateLimit({
      limit: 10,
      window: 60 * 1000,
    });

    const clientIP = getClientAddress();
    if (!limiter.check(clientIP)) {
      return fail(429, { error: 'Too many requests' });
    }

    // Continue with calculation...
  },
};
```

### Audit Logging

Log all calculations:

```typescript
export async function calculateFromSheet(mappings: CellMapping[]): Promise<CalculationResult> {
  const startTime = Date.now();

  try {
    const result = await performCalculation(mappings);

    // Log success
    await logCalculation({
      success: true,
      duration: Date.now() - startTime,
      inputCount: mappings.length,
      outputCount: Object.keys(result.outputs || {}).length,
    });

    return result;
  } catch (error) {
    // Log failure
    await logCalculation({
      success: false,
      duration: Date.now() - startTime,
      error: error.message,
    });

    throw error;
  }
}
```

---

## Monitoring

### Key Metrics to Track

**Performance metrics:**
- API call latency (p50, p95, p99)
- Success/failure rate
- Quota usage
- Cache hit rate (if caching)

**Business metrics:**
- Calculations per day/hour
- Average premium calculated
- Most common input values
- Error rate by product line

### Set Up Alerts

**Critical alerts:**
- API error rate > 5%
- Average latency > 2 seconds
- Quota approaching limit (>80%)
- Authentication failures

**Example monitoring:**

```typescript
import { Prometheus } from 'prom-client';

const sheetsCallDuration = new Prometheus.Histogram({
  name: 'sheets_call_duration_seconds',
  help: 'Duration of Google Sheets API calls',
  labelNames: ['operation', 'status'],
});

const sheetsCallTotal = new Prometheus.Counter({
  name: 'sheets_call_total',
  help: 'Total number of Google Sheets API calls',
  labelNames: ['operation', 'status'],
});

export async function calculateFromSheet(mappings: CellMapping[]): Promise<CalculationResult> {
  const timer = sheetsCallDuration.startTimer({ operation: 'calculate' });

  try {
    const result = await performCalculation(mappings);

    timer({ status: 'success' });
    sheetsCallTotal.inc({ operation: 'calculate', status: 'success' });

    return result;
  } catch (error) {
    timer({ status: 'error' });
    sheetsCallTotal.inc({ operation: 'calculate', status: 'error' });

    throw error;
  }
}
```

### Health Check Endpoint

Create a health check to verify sheets connectivity:

```typescript
// +server.ts
export async function GET() {
  try {
    const sheets = await getSheetsClient();

    // Simple read to verify access
    const response = await sheets.spreadsheets.get({
      spreadsheetId: env.GOOGLE_SHEETS_PRODUCT_RATING_ID,
    });

    return json({
      status: 'healthy',
      spreadsheet: response.data.properties?.title,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    return json({
      status: 'unhealthy',
      error: error.message,
      timestamp: new Date().toISOString(),
    }, { status: 503 });
  }
}
```

---

## Common Pitfalls

### Pitfall 1: Not Handling Formula Errors

**Problem:** Sheet formulas return `#DIV/0!` or `#VALUE!`

**Solution:** Wrap formulas in error handling:

```excel
=IFERROR(E5/E6, 0)
=IF(ISERROR(E5*E6), 0, E5*E6)
```

### Pitfall 2: Assuming Instant Updates

**Problem:** Expecting real-time updates when business users change formulas

**Solution:**
- Clear cache after formula updates
- Use versioning for formula changes
- Test after each update

### Pitfall 3: Ignoring Quota Limits

**Problem:** Hitting API limits during high traffic

**Solution:**
- Implement caching
- Use batch operations
- Monitor quota usage
- Consider upgrading plan if needed

### Pitfall 4: Not Validating Outputs

**Problem:** Trusting sheet calculations without validation

**Solution:** Add sanity checks:

```typescript
const result = await calculateFromSheet(mappings);

// Sanity checks
if (result.outputs.total < 0) {
  throw new Error('Invalid calculation: negative premium');
}

if (result.outputs.total > 1000000) {
  console.warn('Unusually high premium calculated:', result.outputs);
}
```

---

## Performance Benchmarks

**Typical latencies (production):**

| Operation | Median | 95th %ile | 99th %ile |
|-----------|--------|-----------|-----------|
| Write inputs (10 cells) | 150ms | 300ms | 500ms |
| Read outputs (8 cells) | 120ms | 250ms | 400ms |
| Full calculation | 320ms | 600ms | 900ms |

**With caching (80% hit rate):**

| Operation | Median | 95th %ile | 99th %ile |
|-----------|--------|-----------|-----------|
| Cached result | 2ms | 5ms | 10ms |
| Cache miss | 320ms | 600ms | 900ms |
| Overall | 65ms | 320ms | 600ms |

---

## Checklist for Production Deployment

Before going live:

### Configuration
- [ ] Service account created and authenticated
- [ ] Environment variables configured
- [ ] Spreadsheet shared with service account
- [ ] Correct spreadsheet ID and sheet name

### Code Quality
- [ ] Unit tests passing
- [ ] Integration tests passing
- [ ] Error handling implemented
- [ ] Logging configured
- [ ] Rate limiting enabled

### Performance
- [ ] Caching implemented (if needed)
- [ ] Batch operations used
- [ ] Formula optimization verified
- [ ] Load testing completed

### Security
- [ ] Credentials stored securely
- [ ] Input validation implemented
- [ ] Audit logging enabled
- [ ] Access controls configured

### Monitoring
- [ ] Metrics collection set up
- [ ] Alerts configured
- [ ] Health check endpoint created
- [ ] Dashboard created

### Documentation
- [ ] Sheet structure documented
- [ ] Cell mappings documented
- [ ] Version history started
- [ ] Runbook created

---

## Additional Resources

- **Google Sheets API Quotas**: [Google Cloud Console](https://console.cloud.google.com/apis/api/sheets.googleapis.com/quotas)
- **API Reference**: [Google Sheets API Docs](https://developers.google.com/sheets/api)
- **googleapis Library**: [GitHub](https://github.com/googleapis/google-api-nodejs-client)

## Related Documentation

- [Overview](./overview.md)
- [Authentication Setup](./authentication.md)
- [Cell Mapping Guide](./cell-mapping-guide.md)
- [Template Files](../../templates/sheets-rating/)
