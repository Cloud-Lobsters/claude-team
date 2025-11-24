# Separator Component

The Separator component is used to visually or semantically separate content in your Svelte application. It supports both horizontal and vertical orientations.

---

## Installation

### Using CLI

```bash
pnpm dlx shadcn-svelte@latest add separator
```

### Manual Installation

Import the component from the registry:

```svelte
<script lang="ts">
	import { Separator } from '$lib/components/ui/separator/index.js';
</script>
```

---

## Usage

### Basic Example

```svelte
<div>
	<div class="space-y-1">
		<h4 class="text-sm font-medium leading-none">Bits UI Primitives</h4>
		<p class="text-muted-foreground text-sm">An open-source UI component library.</p>
	</div>
	<Separator class="my-4" />
	<div class="flex h-5 items-center space-x-4 text-sm">
		<div>Blog</div>
		<Separator orientation="vertical" />
		<div>Docs</div>
		<Separator orientation="vertical" />
		<div>Source</div>
	</div>
</div>
```

### Simple Separator

```svelte
<Separator />
```

---

## Props

| Property      | Description                | Type          | Default     |
| ------------- | -------------------------- | ------------- | ----------- | -------------- |
| `orientation` | Direction of the separator | `'horizontal' | 'vertical'` | `'horizontal'` |

---

## Examples

### Horizontal Separator

```svelte
<div>
	Content above
	<Separator />
	Content below
</div>
```

### Vertical Separator

```svelte
<div class="flex items-center">
	Item 1
	<Separator orientation="vertical" />
	Item 2
</div>
```

---

## Theming

Customize the separator using Tailwind CSS classes or utility-first styling. Example:

```svelte
<Separator class="bg-gray-300 dark:bg-gray-600 my-6" />
```

---

## Contributors

Built by [shadcn](https://shadcn.com). Ported to Svelte by [Huntabyte](https://github.com/Huntabyte) & [CokaKoala](https://github.com/CokaKoala).

---

## See Also

- [Component List](#)
- [Theming Guide](#)
- [API Reference](#)
