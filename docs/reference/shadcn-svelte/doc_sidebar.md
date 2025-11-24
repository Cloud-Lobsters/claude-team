````svelte
<!-- src/lib/components/ui/sidebar/README.md -->
# Sidebar Component A composable, themeable, and customizable sidebar component for Svelte. --- ## Installation
### CLI ```bash pnpm dlx shadcn-svelte@latest add sidebar
````

### Manual Installation

Add the following CSS variables to your `src/app.css`:

```css
:root {
	--sidebar: oklch(0.985 0 0);
	--sidebar-foreground: oklch(0.145 0 0);
	--sidebar-primary: oklch(0.205 0 0);
	--sidebar-primary-foreground: oklch(0.985 0 0);
	--sidebar-accent: oklch(0.97 0 0);
	--sidebar-accent-foreground: oklch(0.205 0 0);
	--sidebar-border: oklch(0.922 0 0 / 10%);
	--sidebar-ring: oklch(0.708 0 0);
}

.dark {
	--sidebar: oklch(0.205 0 0);
	--sidebar-foreground: oklch(0.985 0 0);
	--sidebar-primary: oklch(0.488 0.243 264.376);
	--sidebar-primary-foreground: oklch(0.985 0 0);
	--sidebar-accent: oklch(0.269 0 0);
	--sidebar-accent-foreground: oklch(0.985 0 0);
	--sidebar-border: oklch(1 0 0 / 10%);
	--sidebar-ring: oklch(0.439 0 0);
}
```

---

## Structure

The Sidebar component is composed of the following parts:

- **Sidebar.Provider**: Manages the sidebar's state.
- **Sidebar.Root**: The main container.
- **Sidebar.Header**: Sticky header.
- **Sidebar.Content**: Scrollable content area.
- **Sidebar.Footer**: Sticky footer.
- **Sidebar.Group**: Section within the content.
- **Sidebar.Trigger**: Toggle button for the sidebar.

---

## Usage

### Basic Setup

**src/routes/+layout.svelte**

```svelte
<script lang="ts">
	import * as Sidebar from '$lib/components/ui/sidebar/index.js';
	import AppSidebar from '$lib/components/app-sidebar.svelte';
	let { children } = $props();
</script>

<Sidebar.Provider>
	<AppSidebar />
	<main>
		<Sidebar.Trigger />
		{@render children?.()}
	</main>
</Sidebar.Provider>
```

**src/lib/components/app-sidebar.svelte**

```svelte
<script lang="ts">
	import * as Sidebar from '$lib/components/ui/sidebar/index.js';
	// Example menu items
	const items = [
		{ title: 'Home', url: '#', icon: HouseIcon }
		// ... other items
	];
</script>

<Sidebar.Root>
	<Sidebar.Content>
		<Sidebar.Group>
			<Sidebar.GroupLabel>Application</Sidebar.GroupLabel>
			<Sidebar.GroupContent>
				<Sidebar.Menu>
					{#each items as item}
						<Sidebar.MenuItem>
							<Sidebar.MenuButton>
								<a href={item.url}>
									<item.icon />
									<span>{item.title}</span>
								</a>
							</Sidebar.MenuButton>
						</Sidebar.MenuItem>
					{/each}
				</Sidebar.Menu>
			</Sidebar.GroupContent>
		</Sidebar.Group>
	</Sidebar.Content>
</Sidebar.Root>
```

---

## Components

### Sidebar.Provider

#### Props

| Property       | Type                      | Description                        |
| -------------- | ------------------------- | ---------------------------------- |
| `open`         | `boolean`                 | Binds the open state (controlled). |
| `onOpenChange` | `(open: boolean) => void` | Callback on state change.          |

---

### Sidebar.Root

#### Props

| Property      | Type         | Description |
| ------------- | ------------ | ----------- | ------------------------ | --------------------- |
| `side`        | `'left'      | 'right'`    | Position of the sidebar. |
| `variant`     | `'sidebar'   | 'floating'  | 'inset'`                 | Visual variant.       |
| `collapsible` | `'offcanvas' | 'icon'      | 'none'`                  | Collapsible behavior. |

---

### Sidebar.Trigger

A button to toggle the sidebar. Must be placed within a `Sidebar.Provider`.

```svelte
<Sidebar.Provider>
	<Sidebar.Root />
	<main>
		<Sidebar.Trigger />
	</main>
</Sidebar.Provider>
```

---

### Sidebar.Group

Contains a group of menu items. Can be made collapsible with `Collapsible`:

```svelte
<Collapsible.Root open>
	<Sidebar.GroupLabel>Projects</Sidebar.GroupLabel>
	<Collapsible.Trigger>
		<Sidebar.MenuButton>Projects</Sidebar.MenuButton>
	</Collapsible.Trigger>
	<Collapsible.Content>
		<Sidebar.MenuSub>
			<!-- Submenu items -->
		</Sidebar.MenuSub>
	</Collapsible.Content>
</Collapsible.Root>
```

---

### Theming

#### CSS Variables

```css
:root {
	--sidebar: oklch(0.985 0 0);
	/* ... other variables */
}

.dark {
	--sidebar: oklch(0.205 0 0);
	/* ... dark mode variables */
}
```

#### Customizing Width

```svelte
<Sidebar.Provider style="--sidebar-width: 20rem;">
	<Sidebar.Root />
</Sidebar.Provider>
```

---

### Styling Tips

1. **Collapsible State**:

```svelte
<Sidebar.Root collapsible="icon">
	<Sidebar.Group class="data-[collapsible=icon]:hidden">
		<!-- Hidden when collapsed to icons -->
	</Sidebar.Group>
</Sidebar.Root>
```

2. **Active State Styling**:

```svelte
<Sidebar.MenuAction class="data-[active=true]/menu-button:bg-sidebar-accent" />
```

---

### Controlled State

```svelte
<script>
	import { derived } from 'svelte/store';
	let myOpen = true;
</script>

<Sidebar.Provider bind:open={myOpen}>
	<button on:click={() => (myOpen = !myOpen)}>Toggle</button>
</Sidebar.Provider>
```

---

### Special Features

- **Keyboard Shortcut**: Default is `cmd+b` (Mac) / `ctrl+b` (Windows). Change in `src/lib/components/ui/sidebar/constants.ts`:

```ts
export const SIDEBAR_KEYBOARD_SHORTCUT = 'b';
```

---

### Examples

#### Collapsible Group with Dropdown

```svelte
<Collapsible.Root>
	<Sidebar.GroupLabel>
		<Collapsible.Trigger>
			Projects
			<ChevronDown />
		</Collapsible.Trigger>
	</Sidebar.GroupLabel>
	<Collapsible.Content>
		<Sidebar.MenuSub>
			<!-- Submenu items -->
		</Sidebar.MenuSub>
	</Collapsible.Content>
</Collapsible.Root>
```

#### Custom Trigger with Hook

```svelte
<script>
	import { useSidebar } from '$lib/components/ui/sidebar/index.js';
	const sidebar = useSidebar();
</script>

<button on:click={() => sidebar.toggle()}>Toggle</button>
```

---

### API Reference

#### Sidebar.Provider

| Property       | Type                      | Description              |
| -------------- | ------------------------- | ------------------------ |
| `open`         | `boolean`                 | Controlled open state    |
| `onOpenChange` | `(open: boolean) => void` | Callback on state change |

#### Sidebar.Root

| Property  | Type       | Description |
| --------- | ---------- | ----------- | -------- | -------------- |
| `side`    | `'left'    | 'right'`    | Position |
| `variant` | `'sidebar' | 'floating'  | 'inset'` | Visual variant |

#### Sidebar.MenuButton

| Property   | Type      | Description              |
| ---------- | --------- | ------------------------ |
| `isActive` | `boolean` | Marks the item as active |

---

### Theming Variables

| Variable Name          | Light Theme        | Dark Theme         |
| ---------------------- | ------------------ | ------------------ |
| `--sidebar`            | `oklch(0.985 0 0)` | `oklch(0.205 0 0)` |
| `--sidebar-foreground` | `oklch(0.145 0 0)` | `oklch(0.985 0 0)` |

---

### Accessibility

- Use `aria-label` and `sr-only` classes for screen readers.
- Ensure keyboard navigation with `tabindex` attributes.

---

### Advanced Usage

#### Inset Variant with Main Content

```svelte
<Sidebar.Provider>
	<Sidebar.Root variant="inset">
		<Sidebar.Inset>
			<main>Main Content</main>
		</Sidebar.Inset>
	</Sidebar.Root>
</Sidebar.Provider>
```

---

### Troubleshooting

- **Responsive Behavior**: Use media queries with `--sidebar-width-mobile`.
- **Collapsible States**: Use `data-[collapsible]` attributes for styling.

---

### Examples

#### Collapsible Group with Badge

```svelte
<Sidebar.MenuItem>
	<Sidebar.MenuButton isActive>
		<a href="#">
			<FolderIcon />
			<span>Projects</span>
		</a>
	</Sidebar.MenuButton>
	<Sidebar.MenuBadge>24</Sidebar.MenuBadge>
</Sidebar.MenuItem>
```

---

### Notes

- Components like `DropdownMenu` and `Collapsible` can be nested for complex menus.
- Use `useSidebar` hook for programmatic control.

---

### Credits

Built by Shadcn, ported to Svelte by Huntabyte & CokaKoala.

```

This structured documentation maintains all examples, uses proper markdown formatting with code blocks, and organizes components into clear sections with props tables and usage examples.
```
