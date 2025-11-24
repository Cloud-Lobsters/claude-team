````markdown
# Pagination Component

The Pagination component provides navigation between pages with next and previous links, and customizable page indicators.

---

## Installation

### CLI

```bash
pnpm dlx shadcn-svelte@latest add pagination
```
````

### Manual Installation

Import the component from the registry:

```svelte
<script lang="ts">
	import * as Pagination from '$lib/components/ui/pagination/index.js';
</script>
```

---

## Usage

### Basic Example

```svelte
<script lang="ts">
	import ChevronLeftIcon from '@lucide/svelte/icons/chevron-left';
	import ChevronRightIcon from '@lucide/svelte/icons/chevron-right';
	import { MediaQuery } from 'svelte/reactivity';
	import * as Pagination from '$lib/components/ui/pagination/index.js';

	const isDesktop = new MediaQuery('(min-width: 768px)');

	const count = 20;
	const perPage = $derived(isDesktop.current ? 3 : 8);
	const siblingCount = $derived(isDesktop.current ? 1 : 0);
</script>

<Pagination.Root {count} {perPage} {siblingCount}>
	{#snippet children({ pages, currentPage })}
		<Pagination.Content>
			<Pagination.Item>
				<Pagination.PrevButton>
					<ChevronLeftIcon class="size-4" />
					<span class="hidden sm:block">Previous</span>
				</Pagination.PrevButton>
			</Pagination.Item>
			{#each pages as page (page.key)}
				{#if page.type === 'ellipsis'}
					<Pagination.Item>
						<Pagination.Ellipsis />
					</Pagination.Item>
				{:else}
					<Pagination.Item>
						<Pagination.Link {page} isActive={currentPage === page.value}>
							{page.value}
						</Pagination.Link>
					</Pagination.Item>
				{/if}
			{/each}
			<Pagination.Item>
				<Pagination.NextButton>
					<span class="hidden sm:block">Next</span>
					<ChevronRightIcon class="size-4" />
				</Pagination.NextButton>
			</Pagination.Item>
		</Pagination.Content>
	{/snippet}
</Pagination.Root>
```

### Minimal Setup

```svelte
<script lang="ts">
	import * as Pagination from '$lib/components/ui/pagination/index.js';
</script>

<Pagination.Root count={100} perPage={10}>
	{#snippet children({ pages, currentPage })}
		<Pagination.Content>
			<Pagination.Item>
				<Pagination.PrevButton />
			</Pagination.Item>
			{#each pages as page (page.key)}
				{#if page.type === 'ellipsis'}
					<Pagination.Item>
						<Pagination.Ellipsis />
					</Pagination.Item>
				{:else}
					<Pagination.Item>
						<Pagination.Link {page} isActive={currentPage === page.value}>
							{page.value}
						</Pagination.Link>
					</Pagination.Item>
				{/if}
			{/each}
			<Pagination.Item>
				<Pagination.NextButton />
			</Pagination.Item>
		</Pagination.Content>
	{/snippet}
</Pagination.Root>
```

---

## API Reference

### `Pagination.Root`

The root component for managing pagination state.

**Props:**

- `count`: Total number of items.
- `perPage`: Number of items per page.
- `siblingCount`: Number of sibling pages to show around the current page.

---

### `Pagination.Content`

Container for pagination items.

---

### `Pagination.Item`

Wrapper for individual pagination elements.

---

### `Pagination.Link`

Clickable page number link.

**Props:**

- `page`: Page metadata (from `children` prop of `Pagination.Root`).
- `isActive`: Boolean to mark the current page.

---

### `Pagination.PrevButton` / `Pagination.NextButton`

Navigation buttons for previous/next pages.

---

### `Pagination.Ellipsis`

Ellipsis element for indicating omitted pages.

---

## Dependencies

- Requires Lucide icons (e.g., `@lucide/svelte/icons` for Chevron icons).
- Responsive behavior uses Svelte's `MediaQuery` for screen size detection.

---

## Theming

Customize using Tailwind CSS classes (e.g., `size-4` for icon size, `hidden sm:block` for responsive text).

```

This documentation structure maintains all original examples, adds clear section headers, and organizes the API reference for easy navigation. Code blocks are formatted with syntax highlighting, and dependencies/theming notes are included for implementation clarity.
```
