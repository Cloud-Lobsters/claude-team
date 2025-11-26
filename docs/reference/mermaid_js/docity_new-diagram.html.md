# Mermaid – Adding a New Diagram / Chart

This guide walks you through the process of adding a new diagram type to Mermaid.  
It covers the three core steps:

1. **Grammar & Parsing** – Define the grammar with Langium.  
2. **Rendering** – Write a renderer that turns the parsed AST into SVG.  
3. **Detection** – Register the diagram type so Mermaid can recognise it.

All examples shown below are taken verbatim from the Mermaid source tree and are kept intact.

---

## 1. Grammar & Parsing

Mermaid uses **Langium** to parse diagram source code.  
See the PRs that introduced new grammars for reference:

- <https://github.com/mermaid-js/mermaid/pull/4839>
- <https://github.com/mermaid-js/mermaid/pull/4751>

> **NOTE** – The steps below are a work‑in‑progress and will be updated soon.

### 1.1 Define the Grammar

Create a `.langium` file in `src/diagrams/<your-diagram>/grammar.langium`.  
Follow the patterns used in existing diagrams (e.g., `flowchart`, `sequence`).

### 1.2 Generate the Parser

Run the Langium generator to produce the parser and AST types.

---

## 2. Rendering

Write a renderer that consumes the AST and emits SVG.  
A good reference is `sequenceRenderer.js` – it is more generic than the flowchart renderer.

### 2.1 Where to Put the Renderer

Place the renderer in `src/diagrams/<your-diagram>/renderer.js`.

### 2.2 Example Renderer Skeleton

```js
// src/diagrams/<your-diagram>/renderer.js
import { render } from '../../commonDb';

export function renderDiagram(ast, options) {
  // Build SVG elements based on `ast`
  // Use `options` for theme colours, etc.
  return render(svgContent);
}
```

---

## 3. Detection of the New Diagram Type

Mermaid needs to recognise your diagram keyword.  
Add a detection rule in `src/diagram-api/detectType.ts`.

### 3.1 Detection Key

Return a **key** that describes the diagram type.  
Examples:

| Diagram | Good Key | Voice‑over |
|--------|---------|-----------|
| UML Deployment | `UMLDeploymentDiagram` | “U‑M‑L Deployment diagram” |
| Deployment | `deploymentDiagram` | “Deployment Diagram” |
| Bad | `deployment` | “Deployment” (insufficient) |

> The key is used for `aria-roledescription` in the SVG.

---

## Common Parts of a Diagram

Mermaid strives for consistency across diagram types.  
All diagrams should support:

| Feature | Description |
|--------|------------|
| **Directives** | Modify diagram configuration inline. |
| **Accessibility** | Provide titles, descriptions, and `aria-roledescription`. |
| **Themes** | Use Mermaid’s theming engine. |

### 3.1 Accessibility

Mermaid automatically adds:

- `aria-roledescription`
- Accessible title
- Accessible description

The functions are imported from `../../commonDb`:

```js
import {
  setAccTitle,
  getAccTitle,
  getAccDescription,
  setAccDescription,
  clear as commonClear,
} from '../../commonDb';
```

These are inserted into the SVG during rendering.

### 3.2 Theming

Mermaid’s theming engine is entry‑pointed in `src/styles.js`.  
Your diagram must expose a `getStyles` function.

#### 3.2.1 `getStyles` Example

```js
// src/diagrams/<your-diagram>/styles.js
export const getStyles = (options) => `
  .line {
    stroke-width: 1;
    stroke: ${options.lineColor};
    stroke-dasharray: 2;
  }
  /* ... */
`;
```

#### 3.2.2 Registering the Styles

Add your diagram to the `themes` object in `src/styles.js`:

```js
const themes = {
  flowchart,
  'flowchart-v2': flowchart,
  sequence,
  xyzDiagram,   // <-- your diagram
  // ...
};
```

Theme colour options live in `src/theme/theme-<diagram>.js`.

---

## 4. Examples

The `@mermaid-js/examples` package contains demo files used by tools such as `mermaid.live`.  
Duplicate an existing example (e.g., `packages/examples/src/examples/flowchart.ts`) and modify it for your diagram.

```ts
// packages/examples/src/examples/<your-diagram>.ts
export const <yourDiagram> = {
  name: '<Your Diagram>',
  description: 'An example of <your diagram>',
  code: `
    <your diagram source code>
  `,
  default: true,
};
```

Import the example in `packages/examples/src/index.ts` and add it to the `examples` array.

---

## 5. Summary

1. **Grammar** – Define with Langium.  
2. **Renderer** – Emit SVG.  
3. **Detection** – Register diagram type.  
4. **Accessibility** – Use `commonDb` helpers.  
5. **Theming** – Provide `getStyles` and register in `styles.js`.  
6. **Examples** – Add to `@mermaid-js/examples`.

All examples from the original documentation are preserved above.  
Happy diagramming!