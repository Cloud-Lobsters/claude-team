````markdown
# Carousel

A carousel with motion and swipe built using Embla Carousel.

---

## Installation

### CLI

```bash
pnpm dlx shadcn-svelte@latest add carousel
```
````

### Manual Installation

```bash
pnpm add @shadcn/svelte
```

---

## Usage

```svelte
<script lang="ts">
	import * as Carousel from '$lib/components/ui/carousel/index.js';
</script>

<Carousel.Root>
	<Carousel.Content>
		<Carousel.Item>...</Carousel.Item>
		<Carousel.Item>...</Carousel.Item>
		<Carousel.Item>...</Carousel.Item>
	</Carousel.Content>
	<Carousel.Previous />
	<Carousel.Next />
</Carousel.Root>
```

---

## Examples

### Sizes

Set item size using Tailwind `basis` utilities.

#### Example

```svelte
<Carousel.Root>
	<Carousel.Content>
		<Carousel.Item class="basis-1/3">...</Carousel.Item>
		<Carousel.Item class="basis-1/3">...</Carousel.Item>
		<Carousel.Item class="basis-1/3">...</Carousel.Item>
	</Carousel.Content>
</Carousel.Root>
```

#### Responsive

```svelte
<Carousel.Root>
	<Carousel.Content>
		<Carousel.Item class="md:basis-1/2 lg:basis-1/3">...</Carousel.Item>
		<!-- ... -->
	</Carousel.Content>
</Carousel.Root>
```

---

### Spacing

Use `pl-[VALUE]` on items and negative margin on the content container.

#### Example

```svelte
<Carousel.Root>
	<Carousel.Content class="-ml-4">
		<Carousel.Item class="pl-4">...</Carousel.Item>
		<!-- ... -->
	</Carousel.Content>
</Carousel.Root>
```

#### Responsive

```svelte
<Carousel.Root>
	<Carousel.Content class="-ml-2 md:-ml-4">
		<Carousel.Item class="pl-2 md:pl-4">...</Carousel.Item>
		<!-- ... -->
	</Carousel.Content>
</Carousel.Root>
```

---

### Orientation

Set the `orientation` prop to `vertical` or `horizontal`.

```svelte
<Carousel.Root orientation="vertical">
	<!-- ... -->
</Carousel.Root>
```

---

### Options

Pass Embla Carousel options via the `opts` prop.

```svelte
<Carousel.Root
	opts={{
		align: 'start',
		loop: true
	}}
>
	<!-- ... -->
</Carousel.Root>
```

---

## API

### Props

| Prop          | Type                         | Description                                     |
| ------------- | ---------------------------- | ----------------------------------------------- |
| `opts`        | `EmblaOptions`               | Configuration options for Embla Carousel.       |
| `plugins`     | `EmblaPlugin[]`              | Plugins to use with Embla Carousel.             |
| `orientation` | `"horizontal" \| "vertical"` | Carousel orientation. Defaults to `horizontal`. |

---

### Methods (via `setApi` callback)

- `api.select(index: number)` - Navigate to a specific slide.
- `api.next()` - Move to next slide.
- `api.previous()` - Move to previous slide.
- `api.scrollProgress()` - Get scroll progress (0-1).

#### Example

```svelte
<script lang="ts">
	import { type CarouselAPI } from '$lib/components/ui/carousel/context.js';
	import * as Carousel from '$lib/components/ui/carousel/index.js';

	let api!: CarouselAPI;
	let current = 0;

	$: if (api) {
		current = api.selectedScrollSnap() + 1;
		api.on('select', () => (current = api.selectedScrollSnap() + 1));
	}
</script>

<Carousel.Root bind:api>
	<!-- ... -->
</Carousel.Root>

<p>Slide {current} of {api?.scrollSnapList().length}</p>
```

---

### Events

Listen to Embla events via the API instance.

```svelte
<script lang="ts">
	import * as Carousel from '$lib/components/ui/carousel/index.js';

	let api!: CarouselAPI;

	$: if (api) {
		api.on('select', () => console.log('Slide changed'));
		api.on('dragStart', () => console.log('Dragging started'));
	}
</script>

<Carousel.Root bind:api>
	<!-- ... -->
</Carousel.Root>
```

---

### Plugins

Add Embla plugins like `Autoplay`.

```svelte
<script lang="ts">
	import Autoplay from 'embla-carousel-autoplay';
</script>

<Carousel.Root
	plugins={[
		Autoplay({
			delay: 2000
		})
	]}
>
	<!-- ... -->
</Carousel.Root>
```

---

## Theming

Customize using Tailwind classes on the root, content, or items.

```svelte
<Carousel.Root class="w-full max-w-xs">
	<Carousel.Content class="mx-auto">
		<Carousel.Item class="rounded-lg shadow-md">
			<!-- ... -->
		</Carousel.Item>
	</Carousel.Content>
</Carousel.Root>
```

---

## Preview

![Carousel Preview](https://shadcn-svelte.vercel.app/preview/carousel.png)

---

## Contributors

Built by [shadcn](https://shadcn.com). Ported to Svelte by [Huntabyte](https://github.com/huntabyte) & [CokaKoala](https://github.com/cokakoala).

```

This documentation maintains all original examples, code snippets, and structure while formatting it into a clean, organized markdown format. Key features like API methods, event handling, and plugin usage are highlighted with code blocks and explanations.
```
