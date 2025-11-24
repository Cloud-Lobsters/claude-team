````markdown
# components.json Configuration

The `components.json` file holds configuration for your project, enabling the CLI to generate components tailored to your setup. This file is optional unless you're using the CLI to add components.

---

## `$schema`

Specifies the JSON schema for validation.

```json
{
	"$schema": "https://shadcn-svelte.com/schema.json"
}
```
````

---

## Tailwind Configuration

### `tailwind.css`

Path to the CSS file importing Tailwind CSS.

```json
{
	"tailwind": {
		"css": "src/app.{p,post}css"
	}
}
```

### `tailwind.baseColor`

Sets the default color palette for components (cannot be changed after initialization).

```json
{
  "tailwind": {
    "baseColor": "gray" | "neutral" | "slate" | "stone" | "zinc"
  }
}
```

---

## Aliases

Configure import aliases from your `svelte.config.js`.

### `aliases.lib`

Alias for your library directory (e.g., components, utilities).

```json
{
	"aliases": {
		"lib": "$lib"
	}
}
```

### `aliases.utils`

Alias for utility functions.

```json
{
	"aliases": {
		"utils": "$lib/utils"
	}
}
```

### `aliases.components`

Alias for general components.

```json
{
	"aliases": {
		"components": "$lib/components"
	}
}
```

### `aliases.ui`

Alias for UI components (e.g., buttons, forms).

```json
{
	"aliases": {
		"ui": "$lib/components/ui"
	}
}
```

### `aliases.hooks`

Alias for Svelte hooks (e.g., reactive functions).

```json
{
	"aliases": {
		"hooks": "$lib/hooks"
	}
}
```

---

## TypeScript

Enable or disable TypeScript support.

```json
{
	"typescript": true
}
```

Specify a custom TypeScript config path if needed:

```json
{
	"typescript": {
		"config": "path/to/tsconfig.custom.json"
	}
}
```

---

## Registry

Configure the registry URL for component templates.

```json
{
	"registry": "https://shadcn-svelte.com/registry"
}
```

---

### Notes

- The `tailwind.baseColor` is set during initialization and cannot be changed afterward.
- Aliases must be defined in your `svelte.config.js` to work correctly with the CLI.

```

This documentation retains all examples and configurations from the original text, formatted into a clear, structured guide with code blocks and explanations.
```
