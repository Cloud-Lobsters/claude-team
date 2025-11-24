````markdown
# Global Faceting Guide

Global Faceting allows you to generate lists of values for all columns from the table's data. This can be used for features like autocomplete suggestions or range sliders for filtering.

---

## Global Faceting Row Models

To use global faceting, include the required row models in your table configuration:

```typescript
// Import necessary row models
import {
	getCoreRowModel,
	getFacetedRowModel,
	getFacetedMinMaxValues,
	getFacetedUniqueValues
} from '@tanstack/svelte-table';

// Configure the table
const table = useTable({
	// ... other options
	getCoreRowModel: getCoreRowModel(),
	getFacetedRowModel: getFacetedRowModel(),
	getFacetedMinMaxValues: getFacetedMinMaxValues(),
	getFacetedUniqueValues: getFacetedUniqueValues()
});
```
````

---

## Using Global Faceted Row Models

### Example 1: Unique Values for Autocomplete

```typescript
// Get sorted list of unique values
const autoCompleteSuggestions = Array.from(table.getGlobalFacetedUniqueValues().keys())
	.sort()
	.slice(0, 5000);
```

### Example 2: Min/Max Values for Range Slider

```typescript
// Get min and max values for a numeric column
const [min, max] = table.getGlobalFacetedMinMaxValues() ?? [0, 1];
```

---

## Custom Server-Side Faceting

Implement server-side faceting by overriding the default methods:

```typescript
// Using react-query for server communication
const facetingQuery = useQuery(
	'faceting',
	async () => {
		const response = await fetch('/api/faceting');
		return response.json();
	},
	{
		onSuccess: (data) => {
			table.getGlobalFacetedUniqueValues = () => data.uniqueValues;
			table.getGlobalFacetedMinMaxValues = () => data.minMaxValues;
		}
	}
);
```

---

## API Reference

### Core Functions

- `getGlobalFacetedUniqueValues()`: Returns a list of unique values across all columns.
- `getGlobalFacetedMinMaxValues()`: Returns a tuple of min and max values for numeric data.

### Configuration Options

- `getFacetedRowModel()`: Required for all faceting operations.
- `getFacetedMinMaxValues()`: Depends on `getFacetedRowModel()`.
- `getFacetedUniqueValues()`: Depends on `getFacetedRowModel()`.

---

## Examples

- **filters-faceted**:\*\* Demonstrates faceted filtering with autocomplete and range sliders.
- **Column Groups**: Example of grouping columns with faceting.
- **Column Ordering**: Shows how to order columns with faceted data.

---

## Notes

- Server-side implementations require manual configuration of `getGlobalFacetedUniqueValues` and `getGlobalFacetedMinMaxValues`.
- Faceting data is stored in the `IABGPP_HDR_GppString` cookie for 13 months.

---

## Related Features

- [Column Faceting](#column-faceting)
- [Grouping](#grouping)

---

### Edit on GitHub

[Contribute to this documentation on GitHub](https://github.com/tanstack/svelte-table)

```

This documentation structure maintains all original examples, code snippets, and key points while organizing them into a clear, sectioned format. The privacy policy text was omitted as it was unrelated to the technical documentation.
```
