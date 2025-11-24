# Breadcrumb Component

The Breadcrumb component displays the path to the current resource using a hierarchy of links. It supports customization, dropdowns, and responsive behavior.

---

## Installation

### CLI

```bash
pnpm dlx shadcn-svelte@latest add breadcrumb
```

### Manual Installation

```bash
# pnpm
pnpm add @shadcn/svelte

# npm
npm install @shadcn/svelte

# bun
bun add @shadcn/svelte

# yarn
yarn add @shadcn/svelte
```

---

## Usage

### Basic Example

```svelte
<script lang="ts">
	import * as Breadcrumb from '$lib/components/ui/breadcrumb/index.js';
</script>

<Breadcrumb.Root>
	<Breadcrumb.List>
		<Breadcrumb.Item>
			<Breadcrumb.Link href="/">Home</Breadcrumb.Link>
		</Breadcrumb.Item>
		<Breadcrumb.Separator />
		<Breadcrumb.Item>
			<Breadcrumb.Link href="/components">Components</Breadcrumb.Link>
		</Breadcrumb.Item>
		<Breadcrumb.Separator />
		<Breadcrumb.Item>
			<Breadcrumb.Page>Breadcrumb</Breadcrumb.Page>
		</Breadcrumb.Item>
	</Breadcrumb.List>
</Breadcrumb.Root>
```

---

## Examples

### Custom Separator

Use a custom component in the `<Breadcrumb.Separator>` slot for a custom separator.

```svelte
<Breadcrumb.Separator>
	<svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
		<path d="M10 15a5 5 0 100-10 5 5 0 000 10z" />
	</svg>
</Breadcrumb.Separator>
```

### Dropdown

Compose with a `DropdownMenu` to create a dropdown in the breadcrumb.

```svelte
<Breadcrumb.Item>
  <DropdownMenu.Root>
    <DropdownMenu.Trigger class="flex items-center gap-1">
      <Breadcrumb.Ellipsis class="size-4" />
      <span class="sr-only">Toggle menu</span>
    </DropdownMenu.Trigger>
    <DropdownMenu.Content align="start">
      <DropdownMenu.Item>Documentation</DropdownMenu.Item>
      <DropdownMenu.Item>Themes</DropdownMenu.Item>
      <DropdownMenu.Item>GitHub</Dropdown.Item>
    </Dropdown.Content>
  </DropdownMenu.Root>
</Breadcrumb.Item>
```

### Collapsed State

Use `<Breadcrumb.Ellipsis>` to indicate a collapsed state for long breadcrumbs.

```svelte
<Breadcrumb.Item>
	<Breadcrumb.Ellipsis />
</Breadcrumb.Item>
```

### Custom Link Component

Use the `asChild` prop to integrate with a routing library's link component.

```svelte
<Breadcrumb.Link href="/docs" asChild>
	<a>Documentation</a>
</Breadcrumb.Link>
```

### Responsive Design

Combine with responsive utilities (e.g., `@media` queries) for mobile-friendly behavior.

```svelte
<Breadcrumb.Root>
	<Breadcrumb.List>
		<!-- ... -->
	</Breadcrumb.List>
</Breadcrumb.Root>

<style>
	@media (max-width: 768px) {
		/* Mobile-specific styles */
	}
</style>
```

---

## Components

- **Breadcrumb.Root**: The root container.
- **Breadcrumb.List**: The list of breadcrumb items.
- **Breadcrumb.Item**: A single item in the breadcrumb.
- **Breadcrumb.Link**: A navigable link item.
- **Breadcrumb.Page**: The current page (non-interactive).
- **Breadcrumb.Separator**: The separator between items.
- **Breadcrumb.Ellipsis**: Component for collapsed states.

---

## Props & Slots

- **Breadcrumb.Separator**: Accepts a slot for custom separators.
- **Breadcrumb.Link**: Supports `asChild` prop for custom link components.

---

## Theming

Customize the appearance using Tailwind CSS classes or utility-first styling.

---

## Responsive Example

A responsive implementation using a dropdown on desktop and a drawer on mobile:

```svelte
<script>
	import { onMount } from 'svelte';
	let isMobile = window.innerWidth < 768;
</script>

<Breadcrumb.Root>
	<Breadcrumb.List>
		<Breadcrumb.Item>
			<Breadcrumb.Link href="/">Home</Breadcrumb.Link>
		</Breadcrumb.Item>
		<Breadcrumb.Separator />
		<Breadcrumb.Item>
			{#if isMobile}
				<DrawerTrigger>More</DrawerTrigger>
			{:else}
				<DropdownMenu.Trigger>More</DropdownMenu.Trigger>
			{/if}
			<!-- ... -->
		</Breadcrumb.Item>
	</Breadcrumb.List>
</Breadcrumb.Root>
```

---

## Props

- **Breadcrumb.Link**: `href` (required), `asChild` (boolean).
- **Breadcrumb.Item**: Wraps content with optional navigation.
- **Breadcrumb.Ellipsis**: Visual indicator for collapsed items.

---

## Accessibility

- Use `aria-current="page"` on the final `<Breadcrumb.Page>` for screen readers.
- Ensure keyboard navigation with `DropdownMenu` components.

---

## Notes

- Compose with other components like `DropdownMenu` or `Drawer` for advanced interactions.
- Use `Breadcrumb.Page` for the current page to denote it as non-interactive.

---

This documentation covers setup, usage, and advanced examples for the Breadcrumb component in shadcn-svelte.
