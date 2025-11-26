# TanStack Table Core - Complete Implementation Guide

This guide provides detailed implementation patterns for building tables with **TanStack Table Core** for client-side filtering and pagination.

---

## Table of Contents

- [Pattern 1: Simple Filtering Table (Claims Pattern)](#pattern-1-simple-filtering-table-claims-pattern)
- [Pattern 2: Full-Featured Table (Policies Pattern)](#pattern-2-full-featured-table-policies-pattern)
- [Store Pattern with TanStack](#store-pattern-with-tanstack)
- [Column Definitions](#column-definitions)
- [Table Component](#table-component)
- [Toolbar with TableFilterManager](#toolbar-with-tablefilter manager)
- [Modal State Management](#modal-state-management)
- [Performance Tips](#performance-tips)
- [Naming Conventions](#naming-conventions)

---

## Pattern 1: Simple Filtering Table (Claims Pattern)

Use this for most tables: filtering + search, no sorting, dense layout, maximum table space.

### When to Use
- Tables with < 10k rows
- Simple filtering needs (status, type, etc.)
- No complex sorting requirements
- Want to maximize vertical space for data

### Directory Structure

```
src/routes/dashboard/[feature]/
├── +page.svelte                      # Main page (toolbar + table + modals)
├── +page.server.ts                   # Minimal load() + actions
├── +layout.ts                        # Auth checks
├── components/[feature]/
│   ├── [Feature]Table.svelte         # TanStack table renderer
│   ├── [Feature]Toolbar.svelte       # Filters + search
│   ├── columnDefs.ts                 # TanStack column definitions
│   ├── cells/                        # Custom cell components
│   │   ├── index.ts
│   │   ├── [Cell].svelte
│   │   └── ActionsCell.svelte
│   └── filters/
│       └── [Filter]Filter.svelte
├── stores/
│   ├── [feature].svelte.ts           # TanStack table state
│   └── types.ts
└── types.ts
```

---

## Pattern 2: Full-Featured Table (Policies Pattern)

Use this when you need: sorting + column visibility + title header.

### When to Use
- Complex data that benefits from sorting
- Many columns that need responsive hiding
- Want title/description header
- More feature-rich table experience

### Key Differences

| Feature | Simple (Claims) | Full (Policies) |
|---------|-----------------|-----------------|
| **Sorting** | ❌ No | ✅ Yes |
| **Col Visibility** | ❌ No | ✅ Toggle |
| **Title** | ❌ Maximized space | ✅ Header |
| **Setup** | Simpler | More complex |
| **Data** | Flat, quick | Normalized |

---

## Store Pattern with TanStack

### Simple Pattern Store

**File:** `src/routes/dashboard/[feature]/stores/[feature].svelte.ts`

```typescript
import type { Table } from '@tanstack/table-core';
import { createSvelteTable } from '$lib/components/ui/data-table';
import { getCoreRowModel, getFilteredRowModel, getPaginationRowModel } from '@tanstack/table-core';
import { columnDefs } from '../components/[feature]/columnDefs';

// FlexSearch for fast client-side search (optional)
export const [feature]Search = createFlexSearchIndex<[Type]>(({
  getId: (item) => item.id,
  getSearchableText: (item) => `${item.field1} ${item.field2}`,
  name: '[Feature]'
});

// Table state
export const [feature]TableState = $state({
  columnFilters: [],
  globalFilter: '',
  pagination: { pageIndex: 0, pageSize: 50 }
});

// TanStack table instance (lazy-initialized)
let [features]: [Type][] = [];
let [feature]Table: Table<[Type]> | null = null;

export function get[Feature]Table([dataVariable]: [Type][]) {
  [features] = [dataVariable];
  if (![feature]Table) {
    [feature]Table = createSvelteTable({
      get data() { return [features]; },
      state: {
        get columnFilters() { return [feature]TableState.columnFilters; },
        get globalFilter() { return [feature]TableState.globalFilter; },
        get pagination() { return [feature]TableState.pagination; }
      },
      onPaginationChange: (updater) => {
        [feature]TableState.pagination = typeof updater === 'function' ? updater([feature]TableState.pagination) : updater;
      },
      columns: columnDefs,
      getCoreRowModel: getCoreRowModel(),
      getFilteredRowModel: getFilteredRowModel(),
      getPaginationRowModel: getPaginationRowModel()
    });
  }
  return [feature]Table;
}
```

### Full Pattern Store (with Sorting & Visibility)

Add to state:

```typescript
export const [feature]TableState: FullTableState = $state({
  columnFilters: [],
  globalFilter: '',
  pagination: { pageIndex: 0, pageSize: 50 },
  sorting: [],           // Add for sorting
  columnVisibility: {},  // Add for visibility
  showAllColumns: false  // Add for toggle
});
```

Add to table creation:

```typescript
import { getSortedRowModel } from '@tanstack/table-core';

[feature]Table = createSvelteTable({
  // ... existing config
  state: {
    // ... existing state
    get sorting() { return [feature]TableState.sorting; },
    get columnVisibility() { return [feature]TableState.columnVisibility; }
  },
  onSortingChange: (updater) => {
    [feature]TableState.sorting = typeof updater === 'function' ? updater([feature]TableState.sorting) : updater;
  },
  getSortedRowModel: getSortedRowModel(),  // Add for sorting
  // ... rest of config
});
```

### Type Definitions

**File:** `src/routes/dashboard/[feature]/stores/types.ts`

```typescript
import type { ColumnFiltersState, PaginationState, SortingState, VisibilityState } from '@tanstack/table-core';

export interface TableState {
  columnFilters: ColumnFiltersState;
  globalFilter: string;
  pagination: PaginationState;
}

export interface FullTableState extends TableState {
  sorting: SortingState;
  columnVisibility: VisibilityState;
  showAllColumns: boolean;
}
```

---

## Column Definitions

**File:** `src/routes/dashboard/[feature]/components/[feature]/columnDefs.ts`

```typescript
import type { ColumnDef } from '@tanstack/table-core';
import { renderComponent, HeaderCell } from '$lib/components/ui/data-table';

// Base defaults - consistency across columns
const BASE_COLUMN_DEFAULTS = {
  size: 1,
  enableGlobalFilter: true,
  enableSorting: false  // true for full pattern
} as const;

// Custom filter functions
const multiSelectFilter = (row: any, columnId: string, filterValue: unknown) => {
  if (Array.isArray(filterValue)) return Array.from(filterValue).includes(row.getValue(columnId));
  return true;
};

export const columnDefs: ColumnDef<[Type]>[] = [
  // Status (interactive dropdown)
  {
    ...BASE_COLUMN_DEFAULTS,
    accessorKey: 'status',
    header: () => renderComponent(HeaderCell, { icon: 'status', label: 'Status' }),
    filterFn: multiSelectFilter,
    cell: ({ row }) => renderComponent(StatusDropdown, { item: row.original }),
    meta: { stopPropagation: true },
    minSize: 80
  },

  // Simple text (no component for perf)
  {
    ...BASE_COLUMN_DEFAULTS,
    accessorKey: 'name',
    header: () => renderComponent(HeaderCell, { icon: 'user', label: 'Name' }),
    cell: ({ row }) => row.original.name,
    minSize: 120
  },

  // Badge (from lib)
  {
    ...BASE_COLUMN_DEFAULTS,
    accessorKey: 'amount',
    header: () => renderComponent(HeaderCell, { icon: 'currency', label: 'Amount' }),
    cell: ({ row }) => renderComponent(AmountBadge, {
      amount: row.original.amount,
      currency: 'GBP'
    }),
    minSize: 100
  },

  // Responsive hiding
  {
    ...BASE_COLUMN_DEFAULTS,
    accessorKey: 'created',
    header: 'Created',
    cell: ({ row }) => new Date(row.original.created).toLocaleDateString('en-GB'),
    meta: { cellClass: 'hidden md:table-cell' },
    minSize: 90
  },

  // Actions (always last)
  {
    id: 'actions',
    header: 'Actions',
    cell: ({ row }) => renderComponent(ActionsCell, { item: row.original }),
    meta: { stopPropagation: true },
    minSize: 80
  }
];
```

### Column Definition Rules

- Use `BASE_COLUMN_DEFAULTS` for consistency
- `enableSorting: false` (simple pattern) or `true` (full pattern)
- Avoid components for plain text (performance)
- Use `minSize` for flexible widths
- `stopPropagation: true` for interactive cells
- Responsive: `meta.cellClass: 'hidden md:table-cell'`

---

## Table Component

**File:** `src/routes/dashboard/[feature]/components/[feature]/[Feature]Table.svelte`

```svelte
<script lang="ts">
  import type { Table as TableType, PaginationState } from '@tanstack/table-core';
  import FlexRender from '$lib/components/ui/data-table/flex-render.svelte';
  import * as Table from '$lib/components/ui/table';
  import Pagination from '$lib/components/ui/data-table/Pagination.svelte';
  import { columnDefs } from './columnDefs';

  interface Props {
    table: TableType<[Type]>;
    paginationState: PaginationState;
  }

  let { table, paginationState }: Props = $props();
</script>

<Table.Root>
  <Table.Header class="bg-accent">
    {#each table.getHeaderGroups() as group (group.id)}
      <Table.Row>
        {#each group.headers as header (header.id)}
          <Table.Head class={header.column.columnDef.meta?.cellClass || 'w-1'}>
            {#if !header.isPlaceholder}
              <FlexRender content={header.column.columnDef.header} context={header.getContext()} />
            {/if}
          </Table.Head>
        {/each}
      </Table.Row>
    {/each}
  </Table.Header>

  <Table.Body>
    {#if table.getRowModel().rows?.length}
      {#each table.getRowModel().rows as row (row.id)}
        <Table.Row class="hover:bg-accent/50">
          <a href="/dashboard/[feature]/{row.original.id}" class="contents cursor-pointer">
            {#each row.getVisibleCells() as cell (cell.id)}
              <Table.Cell
                class="w-1 whitespace-nowrap {cell.column.columnDef.meta?.cellClass || ''}"
                onclick={(e) => {
                  if (cell.column?.columnDef?.meta?.stopPropagation) {
                    e.stopPropagation();
                    e.preventDefault();
                  }
                }}
              >
                <FlexRender content={cell.column.columnDef.cell} context={cell.getContext()} />
              </Table.Cell>
            {/each}
          </a>
        </Table.Row>
      {/each}
    {:else}
      <Table.Row>
        <Table.Cell colspan={columnDefs.length} class="h-24 text-center">
          No items found.
        </Table.Cell>
      </Table.Row>
    {/if}
  </Table.Body>

  <Table.Footer>
    <Table.Row>
      <Table.Cell colspan={columnDefs.length} class="p-0">
        <Pagination {table} {paginationState} />
      </Table.Cell>
    </Table.Row>
  </Table.Footer>
</Table.Root>
```

### Table Component Key Points

- Wrap entire row in `<a class="contents">` for row-level navigation
- Use `FlexRender` for TanStack cell/header rendering
- `getHeaderGroups()` → `getVisibleCells()` for responsive columns
- Pagination uses TanStack state
- `stopPropagation: true` prevents row click on interactive cells

---

## Toolbar with TableFilterManager

**File:** `src/routes/dashboard/[feature]/components/[feature]/[Feature]Toolbar.svelte`

```svelte
<script lang="ts">
  import { TableFilterManager } from '$lib/utils/table-filters.svelte';
  import SearchFilter from '$lib/components/table/SearchFilter.svelte';
  import StatusFilter from './filters/StatusFilter.svelte';

  let { columnFiltersState = $bindable(), globalFilter = $bindable() } = $props();

  const filterManager = new TableFilterManager(
    () => columnFiltersState,
    (v) => (columnFiltersState = v),
    () => globalFilter,
    (v) => (globalFilter = v)
  );

  function handleSearch(query: string) {
    filterManager.setGlobalFilter(query);
    return [];
  }

  export function handleClearAll() {
    filterManager.handleClearAll();
  }

  // Snippet for filter clear buttons
  const clearButton = (onclick: () => void, disabled: boolean) => ({onclick, disabled});
</script>

<div class="rounded-lg border bg-card p-4">
  <div class="flex flex-1 flex-wrap items-center gap-x-4 gap-y-3">
    <SearchFilter {handleSearch} placeholder="Search..." />
    <div class="h-8 w-px bg-border"></div>
    <StatusFilter {clearButton} {filterManager} />
    <div class="h-8 w-px bg-border"></div>
    <Button onclick={handleClearAll} disabled={columnFiltersState.length === 0 && globalFilter.length === 0}>
      Clear All
    </Button>
  </div>
</div>
```

---

## Filter Components

**File:** `src/routes/dashboard/[feature]/components/[feature]/filters/[Filter]Filter.svelte`

```svelte
<script lang="ts">
  import { Badge } from '$lib/components/ui/badge';
  import type { TableFilterManager } from '$lib/utils/table-filters.svelte';
  import type { Snippet } from 'svelte';

  interface Props {
    clearButton: Snippet;
    filterManager: TableFilterManager;
  }

  let { clearButton, filterManager }: Props = $props();
</script>

<div class="flex flex-wrap items-center gap-2">
  {#each statuses as status (status)}
    {@const isSelected = filterManager.isSelected('status', status)}
    <Badge
      variant={isSelected ? 'default' : 'outline'}
      class="cursor-pointer"
      onclick={() => filterManager.toggleFilter('status', status)}
    >
      {status}
    </Badge>
  {/each}
  {@render clearButton(
    () => filterManager.clearFilter('status'),
    filterManager.getFilterValues('status').length === 0
  )}
</div>
```

---

## Page Component

### Simple Pattern Page

**File:** `src/routes/dashboard/[feature]/+page.svelte`

```svelte
<script lang="ts">
  import type { PageData } from './$types';
  import * as Alert from '$lib/components/ui/alert';
  import { AlertCircle } from '@lucide/svelte';
  import [Feature]Toolbar from './components/[feature]/[Feature]Toolbar.svelte';
  import [Feature]Table from './components/[feature]/[Feature]Table.svelte';
  import TableContainer from '$lib/components/table/TableContainer.svelte';
  import { get[Feature]Table, [feature]TableState } from './stores/[feature].svelte';

  let { data }: { data: PageData } = $props();
  const hasError = $derived(!data || !data.[features]);
  const [feature]Table = get[Feature]Table(data.[features]);
</script>

<svelte:head>
  <title>[Feature] - ClarityCover Dashboard</title>
</svelte:head>

{#if hasError}
  <Alert.Root variant="destructive">
    <AlertCircle class="h-4 w-4" />
    <Alert.Title>Error loading [features]</Alert.Title>
  </Alert.Root>
{:else}
  <!-- Toolbar (no title/description) -->
  <[Feature]Toolbar
    bind:columnFiltersState={[feature]TableState.columnFilters}
    bind:globalFilter={[feature]TableState.globalFilter}
  />

  <!-- Table Container (empty header = max space) -->
  <TableContainer>
    {#snippet header()}{/snippet}
    {#snippet content()}
      <[Feature]Table
        table={[feature]Table}
        paginationState={[feature]TableState.pagination}
      />
    {/snippet}
  </TableContainer>

  <!-- Modals (no props needed - use centralized state) -->
  <Modal1 />
  <Modal2 />
{/if}
```

### Full Pattern Page (with Title + Toggle)

```svelte
<TableContainer>
  {#snippet header()}
    <div class="flex items-center justify-between">
      <div>
        <h2 class="text-lg font-semibold">Records</h2>
        <p class="text-sm text-muted-foreground">Description</p>
      </div>
      <Badge onclick={toggleAllColumns} class="cursor-pointer">
        {showAllColumns ? 'Show All' : `${hiddenCount} hidden`}
      </Badge>
    </div>
  {/snippet}

  {#snippet content()}
    <div class:show-all-columns={showAllColumns}>
      <[Feature]Table {table} {paginationState} />
    </div>
  {/snippet}
</TableContainer>

<style>
  :global(.show-all-columns) :global(.hidden) {
    display: table-cell !important;
  }
</style>
```

---

## Server Load (Minimal)

**File:** `src/routes/dashboard/[feature]/+page.server.ts`

```typescript
import type { PageServerLoad } from './$types';
import { [Service] } from '@/services/[service].server';

export const load: PageServerLoad = async ({ depends, locals }) => {
  depends('[feature]:load');

  try {
    const start = performance.now();
    const [features] = await [Service].get[Features]();
    console.log(`[PERF] ${(performance.now() - start).toFixed(2)}ms`);
    return { [features] };
  } catch (error) {
    console.error('Error:', error);
    return { [features]: [] };
  }
};

export const actions = {
  updateItem: async ({ request, locals }) => {
    // Check permissions
    // Handle form/JSON data
    // Return { success: true } or fail(400, {...})
  }
};
```

**Key:** Keep load() simple - no deeply nested queries. Client-side filtering handles complexity.

---

## Modal State Management

Centralize all modals in one file (no prop drilling).

**File:** `src/routes/dashboard/[feature]/components/modals/modal-state.svelte.ts`

```typescript
interface Modal1Data {
  visible: boolean;
  itemId: number | null;
}

interface Modal2Data {
  visible: boolean;
  item: Type | null;
}

export const modals = $state({
  modal1: { visible: false, itemId: null } as Modal1Data,
  modal2: { visible: false, item: null } as Modal2Data
});
```

**Opening from cells:**

```typescript
function handleOpenModal(item: Type) {
  modals.modal1 = { visible: true, itemId: item.id };
}
```

**Modal component:**

```svelte
<script lang="ts">
  import { modals } from './modal-state.svelte';

  let open = $derived(modals.modal1.visible);
  let itemId = $derived(modals.modal1.itemId);

  $effect(() => {
    if (open && itemId) {
      // Fetch data
    }
  });
</script>

<Dialog bind:open={modals.modal1.visible}>
  <!-- Content -->
</Dialog>
```

---

## Performance Tips

1. **Skip components for plain text** - Use direct cell rendering for simple text fields
2. **Use badges from lib** - Pre-optimized Badge components
3. **Minimize icons** - Only use icons in headers, not every cell
4. **Client-side filtering** - Avoid server queries for small datasets (< 10k rows)
5. **Lazy table init** - Create table instance once, reuse across renders
6. **FlexSearch for search** - Fast client-side indexing for global search
7. **Pagination first** - Default to 50 items/page to reduce initial render
8. **Avoid nested components** - Flatten component structure in cells when possible
9. **Use memoization** - TanStack handles this, but be aware of derived computations
10. **Batch state updates** - Update multiple filters at once when clearing

---

## Naming Conventions

| Type | Pattern | Example |
|------|---------|---------|
| Store | `[feature]TableState` | `claimTableState` |
| Table fn | `get[Feature]Table()` | `getClaimsTable()` |
| Store file | `[feature].svelte.ts` | `claim.svelte.ts` |
| Component | `PascalCase.svelte` | `ClaimsTable.svelte` |
| Filter fn | `[Filter]Filter.svelte` | `StatusFilter.svelte` |
| Cell fn | `[Name]Cell.svelte` | `AmountBadge.svelte` |
| Modal state | `modals` | (always singular) |

---

## Implementation Checklist

- [ ] Store with TanStack table setup
- [ ] Column definitions (BASE_COLUMN_DEFAULTS)
- [ ] Table component (FlexRender headers/cells)
- [ ] Toolbar with TableFilterManager
- [ ] Filter components (badge-based)
- [ ] Cell components (minimal)
- [ ] Modal state (centralized)
- [ ] Page component (clean layout)
- [ ] Server load (minimal)
- [ ] Responsive breakpoints (hidden md:table-cell)
- [ ] Error handling
- [ ] Permission checks on actions

---

## References

- [TanStack Table Core Docs](https://tanstack.com/table/v8/docs/guide/column-defs)
- [Team Modal Pattern](../../commands/cmd-create-modal.md)
- [Team Folder Structure](../standards/folder-structure.md)
