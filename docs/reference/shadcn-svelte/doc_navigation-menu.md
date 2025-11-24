# Navigation Menu Component

The Navigation Menu component provides a flexible way to create navigational menus with dropdowns and submenus, designed to work seamlessly with Tailwind CSS and Svelte.

---

## Installation

### CLI

```bash
pnpm dlx shadcn-svelte@latest add navigation-menu
```

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

### Basic Example

```svelte
<script lang="ts">
	import * as NavigationMenu from '@shadcn/svelte/navigation-menu';
</script>

<NavigationMenu.Root>
	<NavigationMenu.List>
		<NavigationMenu.Item>
			<NavigationMenu.Trigger>Menu Item</NavigationMenu.Trigger>
			<NavigationMenu.Content>
				<NavigationMenu.Link href="#">Subitem 1</NavigationMenu.Link>
				<NavigationMenu.Link href="#">Subitem 2</NavigationMenu.Link>
			</NavigationMenu.Content>
		</NavigationMenu.Item>
	</NavigationMenu.List>
</NavigationMenu.Root>
```

---

## Examples

### Navigation with Submenus

```svelte
<script>
	import * as NavigationMenu from '@shadcn/svelte/navigation-menu';
	import { cn } from '$lib/utils.js';
	import { CircleHelpIcon, CircleIcon, CircleCheckIcon } from '@lucide/svelte/icons';

	const components = [
		// ... (component data as in the original example)
	];
</script>

<NavigationMenu.Root viewport={false}>
	<NavigationMenu.List>
		<!-- Home Section -->
		<NavigationMenu.Item>
			<NavigationMenu.Trigger>Home</NavigationMenu.Trigger>
			<NavigationMenu.Content>
				<ul class="grid gap-2 p-2 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
					<!-- Home content with ListItem component -->
				</ul>
			</NavigationMenu.Content>
		</NavigationMenu.Item>

		<!-- Components Section -->
		<NavigationMenu.Item>
			<NavigationMenu.Trigger>Components</NavigationMenu.Trigger>
			<NavigationMenu.Content>
				<ul class="grid w-[400px] gap-2 p-2 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
					{#each components as component, i (i)}
						<ListItem
							href={component.href}
							title={component.title}
							content={component.description}
						/>
					{/each}
				</ul>
			</NavigationMenu.Content>
		</NavigationMenu.Item>

		<!-- With Icons Example -->
		<NavigationMenu.Item>
			<NavigationMenu.Trigger>With Icon</NavigationMenu.Trigger>
			<NavigationMenu.Content>
				<ul class="grid w-[200px] gap-4 p-2">
					<li>
						<NavigationMenu.Link href="#" class="flex items-center gap-2">
							<CircleHelpIcon /> Backlog
						</NavigationMenu.Link>
						<NavigationMenu.Link href="#" class="flex items-center gap-2">
							<CircleIcon /> To Do
						</NavigationMenu.Link>
						<NavigationMenu.Link href="#" class="flex items-center gap-2">
							<CircleCheckIcon /> Done
						</NavigationMenu.Link>
					</li>
				</ul>
			</NavigationMenu.Content>
		</NavigationMenu.Item>
	</NavigationMenu.List>
</NavigationMenu.Root>
```

---

## API Reference

### `NavigationMenu.Root`

- **Props**:
  - `viewport` (boolean): Whether to use viewport-based positioning (default: `true`).

### `NavigationMenu.List`

- Container for navigation items.

### `NavigationMenu.Item`

- Represents a menu item with optional submenus.

### `NavigationMenu.Trigger`

- The visible trigger for the menu item (e.g., a button or link).

### `NavigationMenu.Content`

- Container for submenu content when the trigger is activated.

### `NavigationMenu.Link`

- A navigational link within the menu.

---

## Theming

The component uses Tailwind CSS classes for styling. Customize the appearance by adjusting the following classes in your Tailwind configuration:

- `hover:bg-accent`
- `text-muted-foreground`
- `rounded-md`
- `p-3`

---

## Dependencies

- **Lucide Icons**: Icons like `CircleHelpIcon` require importing from `@lucide/svelte/icons`.
- **Tailwind CSS**: Ensure your project has Tailwind CSS configured for styling.

---

## Contributors

Ported to Svelte by [Huntabyte](https://github.com/Huntabyte) and [CokaKoala](https://github.com/CokaKoala).

---

## Example Components

### ListItem Component

Reusable component for list items in the menu:

```svelte
<script>
  export let href;
  export let title;
  export let content;
  export let className;
  export let ...restProps;
</script>

<li>
  <NavigationMenu.Link>
    <a
      {href}
      class={cn(
        "hover:bg-accent hover:text-accent-foreground block p-3",
        className
      }
      {...restProps}
    >
      <div class="text-sm font-medium">{title}</div>
      <p class="text-muted-foreground text-sm">{content}</p>
    </a>
  </NavigationMenu.Link>
</li>
```

---

## Notes

- Use `NavigationMenu.Root` as the top-level container.
- Submenus are created by nesting `NavigationMenu.Content` within `NavigationMenu.Item`.
- Icons can be added to links by combining with Lucide components.
