````markdown
# Shadcn-Svelte Documentation

## Introduction

Shadcn-Svelte is a collection of high-quality, production-ready components built with Svelte and Tailwind CSS. Built by Shadcn, ported to Svelte by Huntabyte & CokaKoala.

---

## Installation

### SvelteKit

```bash
npm install shadcn-svelte
```
````

### Vite

```bash
npm install shadcn-svelte
```

### Astro

```bash
npm install shadcn-svelte
```

### Manual Installation

Include the components manually via CDN or local imports.

---

## components.json

Configure components using `components.json` for customization:

```json
{
	"components": {
		"button": {
			"defaultVariants": {
				"variant": "default"
			}
		}
	}
}
```

---

## Theming

Customize themes using Tailwind CSS utilities. Example theme configuration:

```css
.theme {
	--primary-color: #4a5568;
	--secondary-color: #2d3748;
}
```

### Dark Mode

Enable dark mode via CSS variables or JavaScript toggling.

---

## CLI

Use the CLI for generating components:

```bash
npx shadcn-svelte init
```

---

## JavaScript

Integrate with JavaScript for dynamic interactions.

---

## Figma

Access Figma designs for component inspiration: [Figma Link](#)

---

## Changelog

View release notes and updates in the [Changelog](#).

---

## Legacy Docs

Migration guides for older versions: [Legacy Docs](#).

---

## Migration

### Svelte 5

Guidance for migrating to Svelte 5.

### Tailwind v4

Updates for Tailwind CSS v4 compatibility.

---

## Components

A comprehensive list of available components:

- **Accordion**
- **Alert Dialog**
- **Alert**
- **Aspect Ratio**
- **Avatar**
- **Badge**
- **Breadcrumb**
- **Button**
- **Calendar**
- **Card**
- **Carousel**
- **Chart**
- **Checkbox**
- **Collapsible**
- **Combobox**
- **Command**
- **Context Menu**
- **Data Table**
- **Date Picker**
- **Dialog**
- **Drawer**
- **Dropdown Menu**
- **Formsnap**
- **Hover Card**
- **Input OTP**
- **Input**
- **Label**
- **Menubar**
- **Navigation Menu**
- **Pagination**
- **Popover**
- **Progress**
- **Radio Group**
- **Range Calendar**
- **Resizable**
- **Scroll Area**
- **Select**
- **Separator**
- **Sheet**
- **Sidebar**
- **Skeleton**
- **Slider**
- **Sonner**
- **Switch**
- **Table**
- **Tabs**
- **Textarea**
- **Toggle Group**
- **Toggle**
- **Tooltip**
- **Typography**

---

## Registry

### registry.json

Configure component registries:

```json
{
	"registry": {
		"components": ["Button", "Card", "Accordion"]
	}
}
```

### registry-item.json

Define individual registry items:

```json
{
	"name": "Button",
	"props": {
		"variant": "default"
	}
}
```

---

## Special Sponsor

Support the project and reach thousands of developers by becoming a sponsor. [Contact Us](#)

---

## Getting Started

### Components

Explore all components in the [Components](#) section.

### Examples

Examples of usage are provided in the component documentation.

---

## Contributing

Contribute to the project by forking or opening issues on GitHub.

---

## License

Licensed under MIT. See [LICENSE](#) for details.

```

This structure organizes the documentation into clear sections, includes code examples for configuration files, lists all components, and maintains the sponsor section. Adjust links (`#`) to actual URLs as needed.
```
