````markdown
# Resizable Component

## About

The Resizable component allows creating accessible, keyboard-supported resizable panel groups and layouts. It is built on top of [PaneForge](https://pane-forg.es/) by Huntabyte. For advanced configuration and props, refer to the [PaneForge documentation](https://pane-forg.es/).

---

## Installation

### CLI

```bash
pnpm dlx shadcn-svelte@latest add resizable
```
````

### Manual Installation

```bash
# Using pnpm
pnpm add @shadcn/svelte

# Using npm
npm install @shadcn/svelte

# Using bun
bun add @shadcn/svelte

# Using yarn
yarn add @shadcn/svelte
```

---

## Usage

Import the component and use it to create resizable panels:

```svelte
<script lang="ts">
	import * as Resizable from '@shadcn/svelte/components/ui/resizable';
</script>

<Resizable.PaneGroup direction="horizontal" class="max-w-md rounded-lg border">
	<Resizable.Pane defaultSize={50}>
		<div class="flex h-[200px] items-center justify-center p-6">
			<span class="font-semibold">One</span>
		</div>
	</Resizable.Pane>
	<Resizable.Handle />
	<Resizable.Pane defaultSize={50}>
		<Resizable.PaneGroup direction="vertical">
			<Resizable.Pane defaultSize={25}>
				<div class="flex h-full items-center justify-center p-6">
					<span class="font-semibold">Two</span>
				</div>
			</Resizable.Pane>
			<Resizable.Handle />
			<Resizable.Pane defaultSize={75}>
				<div class="flex h-full items-center justify-center p-6">
					<span class="font-semibold">Three</span>
				</div>
			</Resizable.Pane>
		</Resizable.PaneGroup>
	</Resizable.Pane>
</Resizable.PaneGroup>
```

---

## Examples

### Vertical Resizable

Set the `direction` prop to `vertical` to create vertical panels.

```svelte
<Resizable.PaneGroup direction="vertical">
	<Resizable.Pane>One</Resizable.Pane>
	<Resizable.Handle />
	<Resizable.Pane>Two</Resizable.Pane>
</Resizable.PaneGroup>
```

### Custom Handle Visibility

Use the `withHandle` prop on `<Resizable.Handle>` to control handle visibility:

```svelte
<Resizable.PaneGroup direction="vertical">
	<Resizable.Pane>One</Resizable.Pane>
	<Resizable.Handle withHandle={false} />
	<!-- Hide handle -->
	<Resizable.Pane>Two</Resizable.Pane>
</Resizable.PaneGroup>
```

---

## Props & Configuration

- **PaneGroup**:

  - `direction`: `"horizontal"` (default) or `"vertical"`.
  - Contains `Pane` and `Handle` components.

- **Pane**:

  - `defaultSize`: Initial size percentage (e.g., `50` for 50% width/height).

- **Handle**:
  - `withHandle`: Boolean to show/hide the handle (default: `true`).

For full prop details, refer to the [PaneForge documentation](https://pane-forg.es/).

---

## Accessibility

- Keyboard navigation is supported (use arrow keys to resize).
- ARIA attributes are automatically managed for screen readers.

```

This documentation structure:
1. Provides an overview and installation instructions
2. Shows basic usage with a nested example
3. Includes two key examples (vertical layout and handle customization)
4. Lists key props with references to the underlying library
5. Highlights accessibility features

All original code examples are preserved and formatted for clarity. The sponsor and credit sections were omitted as per sanitization requirements.
```
