```svelte
<script lang="ts">
  // Import necessary utilities from TanStack Table and Svelte
  import { writable } from 'svelte/store';
  import {
    createSvelteTable,
    flexRender,
    getCoreRowModel
  } from '@tanstack/svelte-table';
  import type { ColumnDef, TableOptions } from '@tanstack/svelte-table';

  // Define the data structure
  type Person = {
    firstName: string;
    lastName: string;
    age: number;
    visits: number;
    status: string;
    progress: number;
  };

  // Sample data for the table
  const defaultData: Person[] = [
    {
      firstName: 'tanner',
      lastName: 'linsley',
      age: 24,
      visits: 100,
      status: 'In Relationship',
      progress: 50,
    },
    // ... (other data entries)
  ];

  // Column definitions with header, cell, and footer renderers
  const defaultColumns: ColumnDef<Person>[] = [
    {
      accessorKey: 'firstName',
      cell: info => info.getValue(),
      footer: info => info.column.id,
    },
    {
      accessorFn: row => row.lastName, // Example of using accessorFn
      id: 'lastName',
      header: () => 'Last Name',
      footer: info => info.column.id,
    },
    // ... (other columns)
  ];

  // Table configuration using a writable store for reactivity
  const options = writable<TableOptions<Person>>({
    data: defaultData,
    columns: defaultColumns,
    getCoreRowModel: getCoreRowModel(),
  });

  // Function to reset the table data
  const rerender = () => {
    options.update(options => ({ ...options, data: defaultData }));
  };

  // Create the table instance
  const table = createSvelteTable(options);
</script>

<!-- Table template -->
<div class="p-2">
  <table>
    <!-- Headers -->
    <thead>
      {#each $table.getHeaderGroups() as headerGroup}
        <tr>
          {#each headerGroup.headers as header}
            <th>
              {#if !header.isPlaceholder}
                <!-- Render header content dynamically -->
                <svelte:component
                  this={flexRender(
                    header.column.columnDef.header,
                    header.getContext()
                  />}
              {/if}
            </th>
          {/each}
        </tr>
      {/each}
    </thead>

    <!-- Rows -->
    <tbody>
      {#each $table.getRowModel().rows as row}
        <tr>
          {#each row.getVisibleCells() as cell}
            <td>
              <!-- Render cell content dynamically -->
              <svelte:component
                this={flexRender(
                  cell.column.columnDef.cell,
                  cell.getContext()
                />}
            </td>
          {/each}
        </tr>
      {/each}
    </tbody>

    <!-- Footers -->
    <tfoot>
      {#each $table.getFooterGroups() as footerGroup}
        <tr>
          {#each footerGroup.headers as header}
            <th>
              {#if !header.isPlaceholder}
                <svelte:component
                  this={flexRender(
                    header.column.columnDef.footer,
                    header.getContext()
                  />}
              {/if}
            </th>
          {/each}
        </tr>
      {/each}
    </tfoot>
  </table>

  <!-- Rerender button for testing -->
  <div class="h-4" />
  <button on:click={() => rerender()} class="border p-2"> Rerender </button>
</div>
```

### Documentation for Svelte Table Example

---

#### Overview

This example demonstrates a basic table implementation using **TanStack Table v8** with Svelte. It includes headers, rows, footers, and a rerender button for testing reactivity.

---

#### Setup

1. **Dependencies**:

   ```bash
   npm install @tanstack/svelte-table
   ```

2. **Project Configuration**:
   - Ensure TypeScript is set up in your Svelte project
   - Import necessary CSS for styling (e.g., `index.css`)

---

#### Key Components

1. **Data & Column Definitions**

   - **Data**: `defaultData` holds sample person records
   - **Columns**: `defaultColumns` defines:
     - `accessorKey`/`accessorFn` for data access
     - `header`, `cell`, and `footer` render functions
     - Example of using `id` for columns using `accessorFn`

2. **Table Initialization**
   ```typescript
   const table = createSvelteTable(options);
   ```
   - Uses a `writable` store to enable reactive updates
   - Configures core row model for basic row operations

---

#### Template Structure

- **Headers**:

  ```svelte
  {#each $table.getHeaderGroups() as headerGroup}
  	<!-- Renders headers dynamically -->
  {/each}
  ```

- **Rows**:

  ```svelte
  {#each $table.getRowModel().rows as row}
  	{#each row.getVisibleCells() as cell}
  		<!-- Renders cells using flexRender -->
  	{/each}
  {/each}
  ```

- **Footers**:
  Similar to headers but uses `footer` property in column definitions

---

#### Rerender Functionality

The "Rerender" button triggers:

```typescript
const rerender = () => {
	options.update((options) => ({ ...options, data: defaultData }));
};
```

- Resets the table data to its initial state
- Demonstrates reactive updates via Svelte stores

---

#### Styling

- Basic styling applied via `index.css` (e.g., `p-2` class)
- Customize styles to match your design system

---

#### Key APIs Used

1. **`createSvelteTable`**  
   Creates a reactive table instance from configuration options

2. **`flexRender`**  
   Renders headers/cells/footers using TanStack's unified API

3. **Column Definitions**
   - `accessorKey`: Direct property access
   - `accessorFn`: Custom accessor function
   - `header`, `cell`, `footer`: Render functions for UI elements

---

#### Usage Notes

- **Reactivity**: The table automatically updates when data/columns change
- **Footer Rendering**: Uses column `footer` properties to display column IDs
- **Customization**: Extend column definitions for sorting/filtering/etc.

---

#### Full Example Code

The complete code includes:

- TypeScript type definitions
- Full data/column definitions
- Full template structure
- Rerender functionality
- Full CSS imports

---

#### Next Steps

1. Add sorting/filtering using built-in features
2. Customize styling with your design system
3. Add pagination using `getPaginationRowModel()`
4. Implement column visibility controls

```

```
