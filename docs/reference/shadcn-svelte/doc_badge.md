````markdown
# Badge Component

Displays a badge or a component that looks like a badge.

---

## Installation

### CLI

```bash
pnpm dlx shadcn-svelte@latest add badge
```
````

### Manual Installation

#### pnpm

```bash
pnpm add @shadcn/svelte
```

#### npm

```bash
npm install @shadcn/svelte
```

#### bun

```bash
bun add @shadcn/svelte
```

#### yarn

```bash
yarn add @shadcn/svelte
```

---

## Usage

### Basic Usage

```svelte
<script lang="ts">
	import { Badge } from '$lib/components/ui/badge/index.js';
</script>

<Badge variant="outline">Badge</Badge>
```

---

## Examples

### Default Variants

```svelte
<script lang="ts">
	import { Badge } from '$lib/components/ui/badge/index.js';
	import BadgeCheckIcon from '@lucide/svelte/icons/badge-check';
</script>

<div class="flex flex-col items-center gap-2">
	<div class="flex w-full flex-wrap gap-2">
		<Badge>Default</Badge>
		<Badge variant="secondary">Secondary</Badge>
		<Badge variant="destructive">Destructive</Badge>
		<Badge variant="outline">Outline</Badge>
	</div>
</div>
```

### Customized Badge

```svelte
<div class="flex w-full flex-wrap gap-2">
	<Badge variant="secondary" class="bg-blue-500 text-white dark:bg-blue-600">
		<BadgeCheckIcon />
		Verified
	</Badge>
	<Badge class="h-5 min-w-5 rounded-full px-1 font-mono tabular-nums">8</Badge>
	<Badge class="h-5 min-w-5 rounded-full px-1 font-mono tabular-nums" variant="destructive">
		99
	</Badge>
	<Badge class="h-5 min-w-5 rounded-full px-1 font-mono tabular-nums" variant="outline">20+</Badge>
</div>
```

### Badge as a Link

Use the `badgeVariants` helper to style a link like a badge:

```svelte
<script lang="ts">
	import { badgeVariants } from '$lib/components/ui/badge/index.js';
</script>

<a href="/dashboard" class={badgeVariants({ variant: 'outline' })}> Badge Link </a>
```

---

## Props

- **variant** (string): Optional variant for styling (e.g., `default`, `secondary`, `destructive`, `outline`).

---

## Styling

Customize using Tailwind CSS classes for advanced styling. The component includes built-in variants for common use cases.

```

This documentation includes:
- Installation instructions for multiple package managers
- Basic usage examples
- Variant demonstrations (default, secondary, destructive, outline)
- Custom styling examples with icons and numerical content
- Link conversion example using `badgeVariants` helper
- Props explanation
- Styling guidance

All original examples and code blocks are preserved while organizing them into a clean, navigable structure.
```
