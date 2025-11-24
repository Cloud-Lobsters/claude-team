# ScrollArea Component

## Introduction

The `ScrollArea` component enhances native scrolling behavior, providing a customizable and cross-browser compatible scrolling solution. It allows for smooth scrolling with optional horizontal, vertical, or both orientations.

---

## Installation

### CLI

```bash
pnpm dlx shadcn-svelte@latest add scroll-area
```

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

Import and use the `ScrollArea` component to wrap scrollable content. By default, it enables vertical scrolling.

```svelte
<script lang="ts">
	import { ScrollArea } from '@shadcn/svelte';
</script>

<ScrollArea class="h-[200px] w-[350px] rounded-md border p-4">
	Jokester began sneaking into the castle in the middle of the night and leaving jokes all over the
	place: under the king's pillow, in his soup, even in the royal toilet. The king was furious, but
	he couldn't seem to stop Jokester. And then, one day, the people of the kingdom discovered that
	the jokes left by Jokester were so funny that they couldn't help but laugh. And once they started
	laughing, they couldn't stop.
</ScrollArea>
```

---

## Examples

### 1. Horizontal Scrolling

Enable horizontal scrolling by setting the `orientation` prop to `"horizontal"`.

```svelte
<script lang="ts">
	import { ScrollArea } from '@shadcn/svelte';
</script>

<ScrollArea orientation="horizontal" class="h-24 w-full rounded-md border">
	<div class="flex space-x-2 p-4">
		<img src="image1.jpg" alt="Image 1" class="w-24 h-24" />
		<img src="image2.jpg" alt="Image 2" class="w-24 h-24" />
		<!-- Add more items as needed -->
	</div>
</ScrollArea>
```

### 2. Horizontal and Vertical Scrolling

Enable both horizontal and vertical scrolling by setting `orientation="both"`.

```svelte
<script lang="ts">
	import { ScrollArea } from '@shadcn/svelte';
</script>

<ScrollArea orientation="both" class="h-[300px] w-[400px] rounded-md border">
	<div class="p-4">
		<!-- Add a mix of vertical and horizontal content here -->
		<p>Lorem ipsum dolor sit amet...</p>
		<div class="flex space-x-4">
			<!-- Add horizontally scrollable items -->
		</div>
	</div>
</ScrollArea>
```

---

## API Reference

### Props

| Prop          | Description                                                 | Type     | Default      |
| ------------- | ----------------------------------------------------------- | -------- | ------------ |
| `orientation` | Determines the scroll direction.                            | `string` | `"vertical"` |
|               | - `"horizontal"`: Horizontal scrolling.                     |          |              |
|               | - `"vertical"`: Vertical scrolling (default).               |          |              |
|               | - `"both"`: Enables both horizontal and vertical scrolling. |          |              |

---

## Example with Tags (Vertical Scrolling)

A more complex example demonstrating vertical scrolling with a list of tags:

```svelte
<script lang="ts">
	import { ScrollArea, Separator } from '@shadcn/svelte';

	const tags = Array.from({ length: 50 }).map((_, i, a) => `v1.2.0-beta.${a.length - i}`);
</script>

<ScrollArea class="h-72 w-48 rounded-md border">
	<div class="p-4">
		<h4 class="mb-4 text-sm font-medium leading-none">Tags</h4>
		{#each tags as tag (tag)}
			<div class="text-sm">{tag}</div>
			<Separator class="my-2" />
		{/each}
	</div>
</ScrollArea>
```

---

## Notes

- Use Tailwind CSS classes for styling (e.g., `h-[200px]`, `rounded-md`).
- The component respects native scrolling behavior while allowing customization via props and CSS.
