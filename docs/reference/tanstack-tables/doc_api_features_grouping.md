````markdown
# Grouping and Aggregation Guide

## State

Grouping state is stored in the table using the following structure:

```typescript
export type GroupingState = string[];
export type GroupingTableState = {
	grouping: GroupingState;
};
```
````

---

## Aggregation Functions

### Built-in Aggregation Functions

The following functions are available by default:

- **sum**: Sums values of rows
- **min**: Finds minimum value
- **max**: Finds maximum value
- **extent**: Returns min/max pair
- **mean**: Calculates average
- **median**: Finds middle value
- **unique**: Lists distinct values
- **uniqueCount**: Counts distinct values
- **count**: Counts rows in group

### Custom Aggregation Functions

```typescript
export type AggregationFn<TData> = (
	getLeafRows: () => Row<TData>[],
	getChildRows: () => Row<TData>[]
) => any;
```

---

## Using Aggregation Functions

### Usage Options

1. Built-in via string reference
2. Custom via function reference
3. Custom via named functions in `aggregationFns`

Example:

```typescript
// Custom aggregation function registration
declare module '@tanstack/table-core' {
	interface AggregationFns {
		myCustomAggregation: AggregationFn<unknown>;
	}
}

const column = columnHelper.accessor('key', {
	aggregationFn: 'myCustomAggregation'
});

const table = useReactTable({
	columns: [column],
	aggregationFns: {
		myCustomAggregation: (leafRows, childRows) => {
			// Custom logic here
		}
	}
});
```

---

## Column Definition Options

### `aggregationFn`

```typescript
aggregationFn?: AggregationFn | keyof AggregationFns | keyof BuiltInAggregationFns;
```

Specifies the aggregation function for the column.

### `aggregatedCell`

```typescript
aggregatedCell?: Renderable<{
  table: Table<TData>;
  row: Row<TData>;
  column: Column<TData>;
  cell: Cell<TData>;
  getValue: () => any;
  renderValue: () => any;
}>;
```

Custom cell component for aggregated values.

### `enableGrouping`

```typescript
enableGrouping?: boolean;
```

Enables grouping capability for the column.

### `getGroupingValue`

```typescript
getGroupingValue?: (row: TData) => any;
```

Custom grouping value resolver.

---

## Column API Methods

- `getCanGroup()`: Checks grouping capability
- `getIsGrouped()`: Checks current grouping status
- `getGroupedIndex()`: Gets grouping position
- `toggleGrouping()`: Toggles grouping state
- `getToggleGroupingHandler()`: Returns click handler
- `getAutoAggregationFn()`: Gets inferred aggregation function
- `getAggregationFn()`: Gets current aggregation function

---

## Row API Properties

- `groupingColumnId`: Column ID for grouping
- `groupingValue`: Grouping value
- `getIsGrouped()`: Checks if row is grouped
- `getGroupingValue(columnId: string)`: Gets grouping value for column

---

## Table Options

### `aggregationFns`

```typescript
aggregationFns?: Record<string, AggregationFn>;
```

Registers custom aggregation functions.

### `manualGrouping`

```typescript
manualGrouping?: boolean;
```

Disables automatic grouping for server-side handling.

### `onGroupingChange`

```typescript
onGroupingChange?: (newState: GroupingState) => void;
```

Callback for state changes.

### `enableGrouping`

```typescript
enableGrouping?: boolean;
```

Global grouping enablement.

### `groupedColumnMode`

```typescript
groupedColumnMode?: false | 'reorder' | 'remove';
```

Controls column positioning after grouping.

---

## Table API Methods

- `setGrouping(updater: Updater<GroupingState>)`: Updates grouping state
- `resetGrouping(defaultState?: boolean)`: Resets grouping state
- `getPreGroupedRowModel()`: Raw row data
- `getGroupedRowModel()`: Grouped row data

---

## Cell API Methods

- `getIsAggregated()`: Checks aggregation status
- `getIsGrouped()`: Checks grouping status
- `getIsPlaceholder()`: Checks if cell is placeholder

---

## Example Usage

```svelte
<!-- Svelte example -->
<script>
	const table = useSvelteTable({
		columns,
		data,
		getGroupedRowModel: () => groupedRows
	});
</script>

{#each table.getGroupedRowModel().rows as row}
	<div>{row.original.value}</div>
{/each}
```

---

## Important Notes

- Grouping state persists in `IABGPP_HDR_GppString` cookie for 13 months
- Manual grouping requires `manualGrouping: true` for server-side implementations
- Aggregation functions must return primitive values
- Grouped columns can be reordered/removed via `groupedColumnMode`

```

```
