# Table Component

A responsive table component for displaying tabular data with headers, body rows, and optional footers.

---

## Installation

### CLI

Use the ShadCN Svelte CLI to add the Table component:

```bash
pnpm dlx shadcn-svelte@latest add table
```

### Manual Installation

Install the component manually by importing it into your Svelte file:

```svelte
<script lang="ts">
	import * as Table from '$lib/components/ui/table/index.js';
</script>
```

---

## Usage

### Basic Example

```svelte
<script lang="ts">
	const invoices = [
		{
			invoice: 'INV001',
			paymentStatus: 'Paid',
			totalAmount: '$250.00',
			paymentMethod: 'Credit Card'
		}
		// ... (other invoice entries as in the example)
	];
</script>

<Table.Root>
	<Table.Caption>A list of your recent invoices.</Table.Caption>
	<Table.Header>
		<Table.Row>
			<Table.Head class="w-[100px]">Invoice</Table.Head>
			<Table.Head>Status</Table.Head>
			<Table.Head>Method</Table.Head>
			<Table.Head class="text-right">Amount</Table.Head>
		</Table.Row>
	</Table.Header>
	<Table.Body>
		{#each invoices as invoice}
			<Table.Row>
				<Table.Cell class="font-medium">{invoice.invoice}</Table.Cell>
				<Table.Cell>{invoice.paymentStatus}</Table.Cell>
				<Table.Cell>{invoice.paymentMethod}</Table.Cell>
				<Table.Cell class="text-right">{invoice.totalAmount}</Table.Cell>
			</Table.Row>
		{/each}
	</Table.Body>
	<Table.Footer>
		<Table.Row>
			<Table.Cell colspan={3}>Total</Table.Cell>
			<Table.Cell class="text-right">$2,500.00</Table.Cell>
		</Table.Row>
	</Table.Footer>
</Table.Root>
```

---

## Component Structure

### Root Element

- `<Table.Root>`: The root container for the table.

### Header

- `<Table.Header>`: Contains the table headers.
- `<Table.Row>`: A row within the header.
- `<Table.Head>`: A header cell. Use `class` for styling (e.g., `w-[100px]`).

### Body

- `<Table.Body>`: Contains the table rows.
- `<Table.Row>`: A row within the body.
- `<Table.Cell>`: A data cell. Use `class` for styling (e.g., `text-right`).

### Footer (Optional)

- `<Table.Footer>`: Contains footer rows.
- `<Table.Cell>` supports `colspan` to merge cells (e.g., `<Table.Cell colspan={3}>`).

---

## Styling

- Use Tailwind CSS classes directly on `<Table.Head>` and `<Table.Cell>` for customization (e.g., `text-right`, `font-medium`).

---

## Examples

### Sample Data

```javascript
const invoices = [
	{
		invoice: 'INV001',
		paymentStatus: 'Paid',
		totalAmount: '$250.00',
		paymentMethod: 'Credit Card'
	}
	// ... (additional entries)
];
```

### Footer with Total

```svelte
<Table.Footer>
	<Table.Row>
		<Table.Cell colspan={3}>Total</Table.Cell>
		<Table.Cell class="text-right">$2,500.00</Table.Cell>
	</Table.Row>
</Table.Footer>
```

---

## Contributors

Built by [shadcn](https://shadcn.com). Ported to Svelte by [Huntabyte](https://github.com/Huntabyte) and [CokaKoala](https://github.com/CokaKoala).

---

## Special Sponsor

We're looking for one partner to be featured here. Support the project and reach thousands of developers. [Reach out](https://shadcn.com/contact).
