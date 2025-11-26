# Mermaid Configuration Documentation

> **NOTE** – This document is a cleaned‑up, *code‑centric* reference for the Mermaid configuration schema.  
> All examples that appear in the original schema are preserved.

---

## 1. Overview

Mermaid is a JavaScript library that renders diagrams from plain‑text definitions.  
Its behaviour is controlled by a **configuration object** (`mermaid.initialize({ … })`).  
The configuration is split into:

| Section | Purpose |
|--------|--------|
| **Global** | Theme, fonts, security, logging, etc. |
| **Diagram‑specific** | Settings that apply to a particular diagram type (flowchart, sequence, gantt, …). |
| **Shared** | Common options used by several diagram types (e.g. `useMaxWidth`, `wrap`). |

---

## 2. Global Configuration

```js
mermaid.initialize({
  theme: "dark",          // "default", "base", "dark", "forest", "neutral", or null
  themeVariables: {},      // CSS variables for the theme
  themeCSS: "",            // Override theme CSS
  look: "classic",       // "classic" | "handDrawn"
  handDrawnSeed: 0,        // Seed for hand‑drawn look
  layout: "dagre",         // Layout algorithm
  maxTextSize: 50000,      // Max allowed text size
  maxEdges: 500,           // Max number of edges
  darkMode: false,
  htmlLabels: false,
  fontFamily: "\"trebuchet ms\", verdana, arial, sans-serif;",
  altFontFamily: "",
  logLevel: 5,              // 0‑5 (trace‑fatal)
  securityLevel: "strict", // "strict" | "loose" | "antiscript" | "sandbox"
  startOnLoad: true,
  arrowMarkerAbsolute: true,
  secure: ["secure", "securityLevel", "startOnLoad", "maxTextSize", "suppressErrorRendering", "maxEdges"],
  legacyMathML: false,
  forceLegacyMathML: false,
  deterministicIds: false,
  deterministicIDSeed: "",
  // Diagram‑specific objects follow...
});
```

### 2.1 Logging Levels

| Value | Numeric | Description |
|-------|--------|------------|
| `"trace"` | 0 | Verbose debugging |
| `"debug"` | 1 | Debugging |
| `"info"`  | 2 | Informational |
| `"warn"` | 3 | Warnings |
| `"error"` | 4 | Errors |
| `"fatal"` | 5 | Fatal errors (default) |

---

## 3. Diagram‑Specific Configuration

Each diagram type has its own configuration object.  
Below are the most common ones with their defaults and examples.

### 3.1 Flowchart

```js
flowchart: {
  titleTopMargin: 25,
  subGraphTitleMargin: { top: 0, bottom: 0 },
  arrowMarkerAbsolute: true,
  diagramPadding: 20,
  htmlLabels: true,
  nodeSpacing: 50,
  rankSpacing: 50,
  curve: "basis",
  padding: 15,
  defaultRenderer: "dagre-wrapper",
  wrappingWidth: 200,
  inheritDir: false
}
```

### 3.2 Sequence

```js
sequence: {
  arrowMarkerAbsolute: true,
  hideUnusedParticipants: false,
  activationWidth: 10,
  diagramMarginX: 50,
  diagramMarginY: 10,
  actorMargin: 50,
  width: 150,
  height: 50,
  boxMargin: 10,
  boxTextMargin: 5,
  noteMargin: 10,
  messageMargin: 35,
  messageAlign: "center",
  mirrorActors: true,
  forceMenus: false,
  bottomMarginAdj: 1,
  rightAngles: false,
  showSequenceNumbers: false,
  actorFontSize: 14,
  actorFontFamily: "\"Open Sans\", sans-serif",
  actorFontWeight: 400,
  noteFontSize: 14,
  noteFontFamily: "\"trebuchet ms\", verdana, arial, sans-serif",
  noteFontWeight: 400,
  noteAlign: "center",
  messageFontSize: 16,
  messageFontFamily: "\"trebuchet ms\", verdana, arial, sans-serif",
  messageFontWeight: 400,
  wrap: true,
  wrapPadding: 10,
  labelBoxWidth: 50,
  labelBoxHeight: 20
}
```

### 3.3 Gantt

```js
gantt: {
  titleTopMargin: 25,
  barHeight: 20,
  barGap: 4,
  topPadding: 50,
  rightPadding: 75,
  leftPadding: 75,
  gridLineStartPadding: 35,
  fontSize: 11,
  sectionFontSize: 11,
  numberSectionStyles: 4,
  axisFormat: "%Y-%m-%d",
  tickInterval: "1day",
  topAxis: true,
  displayMode: "",
  weekday: "sunday"
}
```

### 3.4 C4 Diagram

```js
c4: {
  diagramMarginX: 50,
  diagramMarginY: 10,
  c4ShapeMargin: 50,
  c4ShapePadding: 20,
  width: 216,
  height: 60,
  boxMargin: 10,
  c4ShapeInRow: 4,
  c4BoundaryInRow: 2,
  // Font & colour options follow...
}
```

> **Tip** – The C4 diagram has many font & colour options (see the full schema for details).

### 3.5 Sankey

```js
sankey: {
  width: 600,
  height: 400,
  linkColor: "gradient",
  nodeAlignment: "justify",
  useMaxWidth: false,
  showValues: true,
  prefix: "",
  suffix: ""
}
```

---

## 4. Font Calculators

Many diagram types expose *font calculator* functions that return a `FontConfig`.  
These are used to compute font properties dynamically.

```js
// Example: boundaryFont calculator
boundaryFont: function () {
  return {
    fontFamily: this.boundaryFontFamily,
    fontSize: this.boundaryFontSize,
    fontWeight: this.boundaryFontWeight,
  };
}
```

The `FontConfig` structure:

```js
{
  fontSize: 14,                     // number or string (CSS)
  fontFamily: "\"Open Sans\", sans-serif",
  fontWeight: "normal"              // number or string
}
```

---

## 5. Node Label Example

The `nodeLabel` object is used by the GitGraph diagram:

```js
nodeLabel: {
  width: 75,
  height: 100,
  x: -25,
  y: 0
}
```

---

## 6. Security Levels

| Level | Description |
|-------|------------|
| `strict` | HTML tags are encoded; click functionality disabled. |
| `loose` | HTML tags allowed; click enabled. |
| `antiscript` | HTML tags allowed (scripts removed); click enabled. |
| `sandbox` | Rendering occurs in a sandboxed iframe. |

---

## 7. Common Diagram Options

| Option | Type | Default |
|-------|------|--------|
| `useMaxWidth` | boolean | `true` |
| `wrap` | boolean | `true` |
| `fontSize` | number | `16` |
| `markdownAutoWrap` | boolean | `true` |
| `suppressErrorRendering` | boolean | `false` |

---

## 8. Example: Initializing Mermaid

```js
mermaid.initialize({
  theme: "forest",
  fontFamily: "\"Open Sans\", sans-serif",
  flowchart: {
    nodeSpacing: 60,
    rankSpacing: 60,
    curve: "cardinal"
  },
  sequence: {
    actorFontSize: 16,
    messageFontSize: 14
  },
  gantt: {
    barHeight: 25,
    axisFormat: "%d-%m-%Y"
  }
});
```

---

## 9. References

- **Mermaid Docs** – https://mermaid.js.org
- **Schema JSON** – https://mermaid.js.org/schemas/config.schema.json

---

*All examples from the original Mermaid configuration schema are preserved in this documentation.*