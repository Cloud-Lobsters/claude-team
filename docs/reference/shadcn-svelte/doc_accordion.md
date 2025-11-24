# Accordion Component Documentation

## Overview

The Accordion component allows users to toggle between sections of content. It is a vertically stacked set of interactive headings that reveal content when clicked.

---

## Installation

### CLI Installation

Use the Shadcn-Svelte CLI to add the Accordion component:

```bash
pnpm dlx shadcn-svelte@latest add accordion
```

### Manual Installation

Import the component directly in your Svelte files:

```svelte
<script lang="ts">
	import * as Accordion from '$lib/components/ui/accordion/index.js';
</script>
```

---

## Usage Examples

### Basic Example

```svelte
<Accordion.Root type="single" class="w-full sm:max-w-[70%]" value="item-1">
	<Accordion.Item value="item-1">
		<Accordion.Trigger>Product Information</Accordion.Trigger>
		<Accordion.Content class="flex flex-col gap-4 text-balance">
			<p>
				Our flagship product combines cutting-edge technology with sleek design. Built with premium
				materials, it offers unparalleled performance and reliability.
			</p>
			<p>
				Key features include advanced processing capabilities, and an intuitive user interface
				designed for both beginners and experts.
			</p>
		</Accordion.Content>
	</Accordion.Item>
	<!-- Additional items (item-2, item-3) follow the same structure -->
</Accordion.Root>
```

### Minimal Example

```svelte
<Accordion.Root type="single">
	<Accordion.Item value="item-1">
		<Accordion.Trigger>Is it accessible?</Accordion.Trigger>
		<Accordion.Content>Yes. It adheres to the WAI-ARIA design pattern.</Accordion.Content>
	</Accordion.Item>
</Accordion.Root>
```

---

## Component Structure

- **Accordion.Root**: The root container for the accordion.

  - `type`: `"single"` (only one item can be open at a time) or `"multiple"` (multiple items can be open).
  - `value`: The currently active item(s).

- **Accordion.Item**: Represents an individual accordion section.

  - `value`: Unique identifier for the item.

- **Accordion.Trigger**: The clickable header that toggles the content.
- **Accordion.Content**: The collapsible content panel.

---

## Framework-Specific Notes

### SvelteKit/Vite/Astro

Ensure the component is properly imported and configured according to your framework's guidelines.

---

## Theming

The Accordion component supports Tailwind CSS for styling. Customize the `class` prop to adjust appearance.

---

## Accessibility

- Follows WAI-ARIA practices.
- Keyboard navigation is supported (e.g., arrow keys and Enter/Space to toggle).

---

## Special Sponsor

We're looking for partners to support the project. Contact us to reach thousands of developers.

---

## Contributors

Built by [shadcn](https://shadcn.com). Ported to Svelte by [Huntabyte](https://github.com/Huntabyte) and [CokaKoala](https://github.com/CokaKoala).

---

## API Reference

| Component           | Props           | Description                              |
| ------------------- | --------------- | ---------------------------------------- |
| `Accordion.Root`    | `type`, `value` | The root container for managing state.   |
| `Accordion.Item`    | `value`         | Represents an individual accordion item. |
| `Accordion.Trigger` | -               | The toggleable header element.           |
| `Accordion.Content` | -               | The collapsible content container.       |

---

## Preview

The Accordion renders as a vertical stack of headers. Clicking a header expands/collapses its content. Only one item can be open at a time when `type="single"`.

---

## License

Licensed under the MIT License. Contributions and feedback are welcome!
