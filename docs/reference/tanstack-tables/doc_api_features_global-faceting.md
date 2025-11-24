````markdown
# TanStack Table v8 (Svelte Adapter) - Global Faceting APIs

## Overview

The following APIs are part of the **TanStack Table v8 Svelte Adapter** and provide functionality for interacting with global faceted data. These methods allow you to retrieve filtered row models, unique values, and min/max values based on applied global filters.

---

## `getGlobalFacetedRowModel()`

**Description**: Returns the row model filtered by the global facet.  
**Return Type**: `RowModel<TData>`  
**Example**:

```typescript
const facetedRows = table.getGlobalFacetedRowModel();
```
````

---

## `getGlobalFacetedUniqueValues()`

**Description**: Retrieves a map of unique values and their counts from the globally filtered data.  
**Return Type**: `Map<any, number>`  
**Example**:

```typescript
const uniqueValues = table.getGlobalFacetedUniqueValues();
// Example output: Map { 'apple' => 3, 'banana' => 2 }
```

---

## `getGlobalFacetedMinMaxValues()`

**Description**: Returns the minimum and maximum numeric values from the globally filtered data.  
**Return Type**: `[number, number]`  
**Example**:

```typescript
const [minValue, maxValue] = table.getGlobalFacetedMinMaxValues();
// Example output: [10, 100]
```

---

## Usage Context

These methods are accessed via the **Table instance** (e.g., `table.getGlobalFacetedRowModel()`). They are particularly useful for building UI components like dropdown filters, histograms, or summary statistics based on filtered data.

## Notes

- These APIs are part of the **Global Faceting** feature, which allows users to refine data exploration interactively.
- Ensure global filtering is properly configured in your table setup for these methods to work as intended.

For more details, refer to the [Global Faceting Guide](#) or the [TanStack Table documentation](https://tanstack.com/table/v8/docs/).

```

---

### Key Features Maintained from Original Text:
1. **Method Signatures**: Preserved exact return types and names.
2. **Examples**: Included code snippets and sample outputs.
3. **Context**: Clarified that methods are called on the `table` instance.
4. **Purpose**: Highlighted use cases like UI components and data summaries.

### Removed/Reorganized Content:
- Privacy policy text (irrelevant to API docs).
- Navigation links (e.g., "MORE OPTIONS", "AGREE").
- Non-technical sections (e.g., "OUR PARTNERS", "SUBSCRIBE TO BYTES").
- Unnecessary framework mentions (e.g., AG Grid, Discord links).

Let me know if you'd like to expand on any section or add additional examples!
```
