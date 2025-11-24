````markdown
# Skeleton Component

The Skeleton component is used to display a placeholder while content is loading, providing a visual indication of loading states.

---

## Installation

### CLI

Use the Shadcn Svelte CLI to add the Skeleton component:

```bash
pnpm dlx shadcn-svelte@latest add skeleton
```
````

### Manual Installation

Include the component manually by importing it into your project.

#### Package Managers

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

### Import

```svelte
<script lang="ts">
	import { Skeleton } from '$lib/components/ui/skeleton/index.js';
</script>
```

### Basic Example

```svelte
<Skeleton class="h-[20px] w-[100px] rounded-full" />
```

### Example with Layout

```svelte
<div class="flex items-center space-x-4">
	<Skeleton class="size-12 rounded-full" />
	<div class="space-y-2">
		<Skeleton class="h-4 w-[250px]" />
		<Skeleton class="h-4 w-[200px]" />
	</div>
</div>
```

---

## Props

The Skeleton component accepts standard HTML props (e.g., `class`, `style`) and Tailwind CSS utility classes for customization.

---

## Examples

### Avatar and Text Skeleton

```svelte
<div class="flex items-center space-x-4">
	<!-- Avatar -->
	<Skeleton class="h-12 w-12 rounded-full" />

	<!-- Text placeholders -->
	<div class="space-y-2">
		<Skeleton class="h-4 w-[250px]" />
		<Skeleton class="h-4 w-[200px]" />
	</div>
</div>
```

### Card Skeleton

```svelte
<div class="space-y-4">
	<Skeleton class="h-20 w-full rounded-md" />
	<div class="space-y-2">
		<Skeleton class="h-4 w-3/4" />
		<Skeleton class="h-4 w-1/2" />
	</div>
</div>
```

---

## Theming

Customize the Skeleton appearance using Tailwind CSS classes. For example:

```svelte
<Skeleton class="bg-gray-200 dark:bg-gray-700 animate-pulse" />
```

---

## Acknowledgments

Built by [shadcn](https://shadcn.com). Ported to Svelte by [Huntabyte](https://github.com/huntabyte) and [CokaKoala](https://github.com/CokaKoala).

```

This documentation maintains all original examples, structures the content into clear sections, and uses proper markdown formatting for readability. The sponsor section and non-essential content have been omitted as per sanitization requirements.
```
