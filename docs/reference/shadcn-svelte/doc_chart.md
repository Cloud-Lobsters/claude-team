````markdown
# Chart Component

Beautiful charts built with LayerChart. Copy and paste into your apps.

---

## Installation

### CLI

```bash
pnpm dlx shadcn-svelte@latest add chart
```
````

### Manual Installation

```bash
# pnpm
pnpm add @shadcn/svelte

# npm
npm install @shadcn/svelte

# bun
bun add @shadcn/svelte

# yarn
yarn add @shadcn/svelte
```

---

## Getting Started

### Your First Chart

#### 1. Define your data

```svelte
<script lang="ts">
	const chartData = [
		{ month: 'January', desktop: 186, mobile: 80 },
		{ month: 'February', desktop: 305, mobile: 200 }
		// ... more data
	];
</script>
```

#### 2. Define your chart config

```svelte
<script lang="ts">
	import * as Chart from '$lib/components/ui/chart/index.js';

	const chartConfig = {
		desktop: {
			label: 'Desktop',
			color: '#2563eb'
		},
		mobile: {
			label: 'Mobile',
			color: '#60a5fa'
		}
	} satisfies Chart.ChartConfig;
</script>
```

#### 3. Build your chart

```svelte
<Chart.Container config={chartConfig} class="min-h-[200px] w-full">
	<BarChart
		data={chartData}
		xScale={scaleBand().padding(0.25)}
		x="month"
		axis="x"
		tooltip={false}
		seriesLayout="group"
		series={[
			{ key: 'desktop', label: chartConfig.desktop.label, color: chartConfig.desktop.color },
			{ key: 'mobile', label: chartConfig.mobile.label, color: chartConfig.mobile.color }
		]}
	>
		{#snippet tooltip()}
			<Chart.Tooltip />
		{/snippet}
	</BarChart>
</Chart.Container>
```

---

## Customizing the Chart

### Adjusting Axis Ticks

Shorten month names to 3 letters:

```svelte
props={{
	xAxis: {
		format: (d) => d.slice(0, 3)
	}
}}
```

### Add Tooltip

```svelte
{#snippet tooltip()}
	<Chart.Tooltip />
{/snippet}
```

### Add Legend

```svelte
<BarChart legend {...otherProps} />
```

---

## Chart Config

Define labels, icons, and colors:

```svelte
const chartConfig = {
  desktop: {
    label: "Desktop",
    icon: MonitorIcon,
    color: "#2563eb",
    theme: { light: "#2563eb", dark: "#dc2626" },
  },
  // ...
} satisfies Chart.ChartConfig;
```

---

## Theming

### CSS Variables

Define colors in CSS:

```css
:root {
	--chart-1: oklch(0.646 0.222 41.116);
	--chart-2: oklch(0.696 0.17 162.48);
}

.dark {
	--chart-1: #2563eb;
	--chart-2: #60a5fa;
}
```

Use in config:

```svelte
const chartConfig = {
  desktop: { color: "var(--chart-1)" },
  mobile: { color: "var(--chart-2)" },
};
```

### Color Formats

- **HEX**: `#2563eb`
- **HSL**: `hsl(220, 98%, 61%)`
- **OKLCH**: `oklch(0.646 0.222 41.116)`

---

## Tooltip Props

| Prop             | Type                     | Description                              |
| ---------------- | ------------------------ | ---------------------------------------- | --------- | ------------------------------------------- |
| `labelKey`       | `string`                 | Data key for label. Defaults to `label`. |
| `nameKey`        | `string`                 | Data key for name. Defaults to `name`.   |
| `indicator`      | `'dot'                   | 'line'                                   | 'dashed'` | Tooltip indicator style. Defaults to `dot`. |
| `hideLabel`      | `boolean`                | Hide the label.                          |
| `hideIndicator`  | `boolean`                | Hide the indicator.                      |
| `labelFormatter` | `(value: any) => string` | Custom label formatting function.        |
| `formatter`      | `Snippet`                | Custom tooltip content via slots.        |

---

## Examples

### Custom Tooltip

```svelte
<Chart.Tooltip labelKey="visitors" nameKey="browser" />
```

### Grouped Bar Chart

```svelte
<BarChart
	seriesLayout="group"
	series={[
		{ key: 'desktop', label: 'Desktop', color: '#2563eb' },
		{ key: 'mobile', label: 'Mobile', color: '#60a5fa' }
	]}
/>
```

---

## Notes

⚠️ **Important**: LayerChart v2 is in pre-release. Follow [this link](https://github.com/layerhq/layerchart/discussions/100) for development updates.

---

## API Reference

### `Chart.Container`

Wraps the chart and handles responsive sizing.

### `Chart.Tooltip`

Customizable tooltip component. Use with `BarChart` via slots.

---

## Theming Example

```svelte
<!-- CSS -->
:root {
  --chart-1: #2563eb;
  --chart-2: #60a5fa;
}

<!-- Svelte -->
<BarChart
  series={[
    { key: "desktop", color: "var(--chart-1)" },
    { key: "mobile", color: "var(--chart-2)" }
  ]}
/>
```

---

## Migration Notes

- Charts use LayerChart under the hood. Direct access to LayerChart components is supported.
- No wrapper abstraction: Directly use LayerChart components like `BarChart`, `LineChart`, etc.

---

## Special Sponsor

Support the project by becoming a sponsor. Contact us for partnership opportunities.

```

This documentation structure maintains all original examples while organizing them into logical sections. Key features like theming, props, and customization are highlighted with code snippets and tables. The pre-release note is emphasized for clarity.
```
