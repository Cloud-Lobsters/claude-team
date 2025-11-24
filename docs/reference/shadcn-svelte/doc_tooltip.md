````markdown
# Tooltip Component

A popup that displays information related to an element when the element receives keyboard focus or the mouse hovers over it.

---

## Installation

### CLI

```bash
pnpm dlx shadcn-svelte@latest add tooltip
```
````

### Manual Installation

#### PNPM

```bash
pnpm add @shadcn/svelte
```

#### NPM

```bash
npm install @shadcn/svelte
```

#### Bun

```bash
bun add @shadcn/svelte
```

#### Yarn

```bash
yarn add @shadcn/svelte
```

---

## Usage

### Basic Example

```svelte
<script lang="ts">
	import * as Tooltip from '$lib/components/ui/tooltip/index.js';
</script>

<Tooltip.Provider>
	<Tooltip.Root>
		<Tooltip.Trigger>Hover</Tooltip.Trigger>
		<Tooltip.Content>
			<p>Add to library</p>
		</Tooltip.Content>
	</Tooltip.Root>
</Tooltip.Provider>
```

---

### Example with Button Variants

```svelte
<script lang="ts">
	import { buttonVariants } from '../ui/button/index.js';
	import * as Tooltip from '$lib/components/ui/tooltip/index.js';
</script>

<Tooltip.Provider>
	<Tooltip.Root>
		<Tooltip.Trigger class={buttonVariants({ variant: 'outline' })}>Hover</Tooltip.Trigger>
		<Tooltip.Content>
			<p>Add to library</p>
		</Tooltip.Content>
	</Tooltip.Root>
</Tooltip.Provider>
```

---

## Structure

- **Provider**: Wraps the component to manage tooltip state.
- **Root**: Contains the trigger and content.
- **Trigger**: The element that activates the tooltip (e.g., a button).
- **Content**: The tooltip's content (e.g., a description or message).

---

## Notes

- Ensure the `Tooltip.Provider` wraps the component to enable state management.
- Customize the trigger's appearance using utility classes (e.g., `buttonVariants`).

---

Built by [shadcn](https://shadcn.com). Ported to Svelte by [Huntabyte](https://github.com/huntabyte) & [CokaKoala](https://github.com/CokaKoala).

```

This documentation maintains all original examples while organizing the content into clear sections. Key features include:
- Installation instructions for multiple package managers
- Two usage examples (basic and styled)
- Component structure explanation
- Implementation notes
- Proper attribution to maintainers

The code snippets are formatted with syntax highlighting and proper indentation. The original "Special sponsor" section was omitted as it appears to be a footer placeholder, but the attribution line was preserved as part of the component's credits.
```
