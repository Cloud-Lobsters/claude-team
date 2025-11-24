````markdown
# Collapsible

An interactive component which expands/collapses a panel.

---

## Installation

### CLI

```bash
pnpm dlx shadcn-svelte@latest add collapsible
```
````

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
	import * as Collapsible from '$lib/components/ui/collapsible/index.js';
</script>

<Collapsible.Root>
	<Collapsible.Trigger>Can I use this in my project?</Collapsible.Trigger>
	<Collapsible.Content>
		Yes. Free to use for personal and commercial projects. No attribution required.
	</Collapsible.Content>
</Collapsible.Root>
```

---

## Examples

### With Icon and Styling

```svelte
<script lang="ts">
	import ChevronsUpDownIcon from '@lucide/svelte/icons/chevrons-up-down';
	import * as Collapsible from '$lib/components/ui/collapsible/index.js';
	import { buttonVariants } from '$lib/components/ui/button/index.js';
</script>

<Collapsible.Root class="w-[350px] space-y-2">
	<div class="flex items-center justify-between space-x-4 px-4">
		<h4 class="text-sm font-semibold">@huntabyte starred 3 repositories</h4>
		<Collapsible.Trigger class={buttonVariants({ variant: 'ghost', size: 'sm', class: 'w-9 p-0' })}>
			<ChevronsUpDownIcon />
			<span class="sr-only">Toggle</span>
		</Collapsible.Trigger>
	</div>
	<div class="rounded-md border px-4 py-3 font-mono text-sm">@huntabyte/bits-ui</div>
	<Collapsible.Content class="space-y-2">
		<div class="rounded-md border px-4 py-3 font-mono text-sm">@melt-ui/melt-ui</div>
		<div class="rounded-md border px-4 py-3 font-mono text-sm">@sveltejs/svelte</div>
	</Collapsible.Content>
</Collapsible.Root>
```

---

## Special Sponsor

We're looking for one partner to be featured here. Support the project and reach thousands of developers. [Reach out](https://shadcn.com/contact).

---

## Built By

Built by [shadcn](https://shadcn.com). Ported to Svelte by [Huntabyte](https://github.com/huntabyte) & [CokaKoala](https://github.com/CokaKoala).

```

---

### Key Features:
- **Expand/Collapse Behavior**: Toggles visibility of content via a trigger.
- **Styling Integration**: Works seamlessly with Tailwind CSS and custom classes.
- **Accessibility**: Includes ARIA attributes (e.g., `sr-only` for screen readers).

### Props & Events (Basic API)
- **Root**: Container for the collapsible structure.
- **Trigger**: Component that toggles the collapsible state.
- **Content**: The collapsible content that is shown/hidden.

---

This documentation retains all original examples and structure while formatting it into a clean, markdown-based reference.
```

This formatted documentation maintains all original examples, installation methods, and usage instructions while organizing them into a clear, markdown-friendly structure. The code snippets are enclosed in triple backticks with appropriate language tags, and sections are logically separated for readability.

````markdown
# Collapsible

An interactive component which expands/collapses a panel.

---

## Installation

### CLI

```bash
pnpm dlx shadcn-svelte@latest add collapsible
```
````

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
	import * as Collapsible from '$lib/components/ui/collapsible/index.js';
</script>

<Collapsible.Root>
	<Collapsible.Trigger>Can I use this in my project?</Collapsible.Trigger>
	<Collapsible.Content>
		Yes. Free to use for personal and commercial projects. No attribution required.
	</Collapsible.Content>
</Collapsible.Root>
```

---

## Examples

### With Icon and Styling

```svelte
<script lang="ts">
	import ChevronsUpDownIcon from '@lucide/svelte/icons/chevrons-up-down';
	import * as Collapsible from '$lib/components/ui/collapsible/index.js';
	import { buttonVariants } from '$lib/components/ui/button/index.js';
</script>

<Collapsible.Root class="w-[350px] space-y-2">
	<div class="flex items-center justify-between space-x-4 px-4">
		<h4 class="text-sm font-semibold">@huntabyte starred 3 repositories</h4>
		<Collapsible.Trigger class={buttonVariants({ variant: 'ghost', size: 'sm', class: 'w-9 p-0' })}>
			<ChevronsUpDownIcon />
			<span class="sr-only">Toggle</span>
		</Collapsible.Trigger>
	</div>
	<div class="rounded-md border px-4 py-3 font-mono text-sm">@huntabyte/bits-ui</div>
	<Collapsible.Content class="space-y-2">
		<div class="rounded-md border px-4 py-3 font-mono text-sm">@melt-ui/melt-ui</div>
		<div class="rounded-md border px-4 py-3 font-mono text-sm">@sveltejs/svelte</div>
	</Collapsible.Content>
</Collapsible.Root>
```

---

## Special Sponsor

We're looking for one partner to be featured here. Support the project and reach thousands of developers. [Reach out](https://shadcn.com/contact).

---

## Built By

Built by [shadcn](https://shadcn.com). Ported to Svelte by [Huntabyte](https://github.com/huntabyte) & [CokaKoala](https://github.com/CokaKoala).

```

---

### Key Features:
- **Expand/Collapse Behavior**: Toggles visibility of content via a trigger.
- **Styling Integration**: Works seamlessly with Tailwind CSS and custom classes.
- **Accessibility**: Includes ARIA attributes (e.g., `sr-only` for screen readers).

### Props & Events (Basic API)
- **Root**: Container for the collapsible structure.
- **Trigger**: Component that toggles the collapsible state.
- **Content**: The collapsible content that is shown/hidden.

---

This documentation retains all original examples and structure while formatting it into a clean, markdown-based reference.
```
