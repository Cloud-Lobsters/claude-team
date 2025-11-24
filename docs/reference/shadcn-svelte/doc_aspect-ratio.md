````markdown
# Aspect Ratio

Displays content within a desired aspect ratio.

---

## Installation

### CLI

```bash
pnpm dlx shadcn-svelte@latest add aspect-ratio
```
````

### Manual Installation

#### pnpm

```bash
pnpm add shadcn-svelte
```

#### npm

```bash
npm install shadcn-svelte
```

#### bun

```bash
bun add shadcn-svelte
```

#### yarn

```bash
yarn add shadcn-svelte
```

---

## Usage

### Basic Example

```svelte
<script lang="ts">
	import { AspectRatio } from '$lib/components/ui/aspect-ratio/index.js';
</script>

<div class="w-[450px]">
	<AspectRatio ratio={16 / 9} class="bg-muted">
		<img
			src="https://images.unsplash.com/photo-1588345921523-c2dcdb7f1dcd?w=800&dpr=2&q=80"
			alt="Gray by Drew Beamer"
			class="h-full w-full rounded-md object-cover"
		/>
	</AspectRatio>
</div>
```

### Props

| Prop    | Description                 | Type     | Default |
| ------- | --------------------------- | -------- | ------- |
| `ratio` | Aspect ratio (e.g., `16/9`) | `number` | `4/3`   |

---

## Examples

### Image with Aspect Ratio

```svelte
<AspectRatio ratio={1 / 1}>
	<img src="image.jpg" alt="Square Image" class="h-full w-full object-cover" />
</AspectRatio>
```

### Video Container

```svelte
<AspectRatio ratio={16 / 9}>
	<video class="h-full w-full" controls>
		<source src="video.mp4" type="video/mp4" />
	</video>
</AspectRatio>
```

---

## Theming

Use Tailwind CSS classes to style the container and content. The `class` prop applies to the outer wrapper.

---

## Notes

- The `ratio` prop defines the aspect ratio (e.g., `16/9` for 16:9, `1/1` for square).
- Content inside must have `h-full` and `w-full` to fill the container.
- Use `object-cover` (or similar) for responsive images/videos.

---

Built by [shadcn](https://ui.shadcn.com). Ported to Svelte by [Huntabyte](https://github.com/huntabyte) & [CokaKoala](https://github.com/CokaKoala).

```

This documentation format:
- Maintains all original examples and code snippets
- Uses proper markdown syntax for headers, code blocks, and tables
- Organizes content into logical sections (Installation, Usage, Examples, Props)
- Includes prop definitions and usage notes
- Preserves the original component structure and Tailwind class references
- Adds a "Notes" section for implementation best practices
- Maintains attribution to the original authors
```
