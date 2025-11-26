# Mermaid – Text‑Based Diagramming Library

Mermaid is a JavaScript‑based diagramming tool that turns plain‑text definitions into SVG charts.  
It is inspired by Markdown, so anyone familiar with Markdown can start writing diagrams immediately.

> **Why Mermaid?**  
> Documentation that is out‑of‑date is costly. Mermaid lets you keep diagrams in sync with code, making them easy to edit, version‑control, and embed in any web page or documentation system.

---

## Table of Contents

| Section | Description |
|--------|------------|
| [Installation](#installation) | CDN, npm, yarn, pnpm |
| [Getting Started](#getting-started) | Quick example |
| [Configuration](#configuration) | `mermaid.initialize` options |
| [Diagram Types](#diagram-types) | Flowchart, Sequence, Gantt, Class, Git Graph, ER, Journey, Quadrant, XY |
| [Examples](#examples) | Full code snippets for each diagram |
| [Security](#security) | Sandbox rendering |
| [Contribution](#contribution) | How to help |
| [License](#license) | MIT |

---

## Installation

### CDN

```html
<script type="module">
  import mermaid from 'https://cdn.jsdelivr.net/npm/mermaid@11/dist/mermaid.esm.min.mjs';
  mermaid.initialize({ startOnLoad: true });
</script>
```

### npm / yarn / pnpm

```bash
# npm
npm i mermaid

# yarn
yarn add mermaid

# pnpm
pnpm add mermaid
```

---

## Getting Started

Add a `<div class="mermaid">` or `<pre class="mermaid">` to your page and write Mermaid syntax inside.

```html
<div class="mermaid">
graph TD;
    A-->B;
    A-->C;
    B-->D;
    C-->D;
</div>
```

Mermaid will automatically render the diagram on page load.

---

## Configuration

```js
mermaid.initialize({
  startOnLoad: true,          // Render diagrams on page load
  theme: 'default',         // 'default', 'forest', 'dark', 'neutral'
  themeVariables: {          // Override theme colors
    primaryColor: '#ff0000'
  },
  securityLevel: 'strict',  // 'strict', 'loose', 'sandbox'
  // ... other options
});
```

- **`securityLevel`**  
  *`strict`* – sanitizes input.  
  *`loose`* – minimal sanitization.  
  *`sandbox`* – renders diagrams inside a sandboxed iframe (no JS execution).

---

## Diagram Types

| Diagram | Syntax | Example |
|--------|-------|--------|
| **Flowchart** | `graph TD; ...` | See below |
| **Sequence Diagram** | `sequenceDiagram` | See below |
| **Gantt** | `gantt` | See below |
| **Class Diagram** | `classDiagram` | See below |
| **Git Graph** | `gitGraph` | See below |
| **Entity‑Relationship** | `erDiagram` | See below |
| **User Journey** | `journey` | See below |
| **Quadrant Chart** | `quadrantChart` | See below |
| **XY Chart** | `xychart-beta` | See below |

---

## Examples

### Flowchart

```mermaid
graph TD;
    A-->B;
    A-->C;
    B-->D;
    C-->D;
```

### Sequence Diagram

```mermaid
sequenceDiagram
    participant Alice
    participant Bob
    Alice->>John: Hello John, how are you?
    loop HealthCheck
        John->>John: Fight against hypochondria
    end
    Note right of John: Rational thoughts <br/>prevail!
    John-->>Alice: Great!
    John->>Bob: How about you?
    Bob-->>John: Jolly good!
```

### Gantt Diagram

```mermaid
gantt
    dateFormat  YYYY-MM-DD
    title Adding GANTT diagram to mermaid
    excludes weekdays 2014-01-10

    section A section
    Completed task            :done,    des1, 2014-01-06,2014-01-08
    Active task               :active,  des2, 2014-01-09, 3d
    Future task               :         des3, after des2, 5d
    Future task2             :         des4, after des3, 5d
```

### Class Diagram

```mermaid
classDiagram
    Class01 <|-- AveryLongClass : Cool
    Class03 *-- Class04
    Class05 o-- Class06
    Class07 .. Class08
    Class09 --> C2 : Where am i?
    Class09 --* C3
    Class09 --|> Class07
    Class07 : equals()
    Class07 : Object[] elementData
    Class01 : size()
    Class01 : int chimp
    Class01 : int gorilla
    Class08 <--> C2: Cool label
```

### Git Graph

```mermaid
gitGraph
   commit
   commit
   branch develop
   commit
   commit
   commit
   checkout main
   commit
   commit
```

### Entity‑Relationship Diagram

```mermaid
erDiagram
    CUSTOMER ||--o{ ORDER : places
    ORDER ||--|{ LINE-ITEM : contains
    CUSTOMER }|..|{ DELIVERY-ADDRESS : uses
```

### User Journey Diagram

```mermaid
journey
    title My working day
    section Go to work
      Make tea: 5: Me
      Go upstairs: 3: Me
      Do work: 1: Me, Cat
    section Go home
      Go downstairs: 5: Me
      Sit down: 5: Me
```

### Quadrant Chart

```mermaid
quadrantChart
    title Reach and engagement of campaigns
    x-axis Low Reach --> High Reach
    y-axis Low Engagement --> High Engagement
    quadrant-1 We should expand
    quadrant-2 Need to promote
    quadrant-3 Re-evaluate
    quadrant-4 May be improved
    Campaign A: [0.3, 0.6]
    Campaign B: [0.45, 0.23]
    Campaign C: [0.57, 0.69]
    Campaign D: [0.78, 0.34]
    Campaign E: [0.40, 0.34]
    Campaign F: [0.35, 0.78]
```

### XY Chart

```mermaid
xychart-beta
    title "Sales Revenue"
    x-axis [jan, feb, mar, apr, may, jun, jul, aug, sep, oct, nov, dec]
    y-axis "Revenue (in $)" 4000 --> 11000
    bar [5000, 6000, 7500, 8200, 9500, 10500, 11000, 10200, 9200, 8500, 7000, 6000]
    line [5000, 6000, 7500, 8200, 9500, 10500, 11000, 10200, 9200, 8500, 7000, 6000]
```

---

## Security

Mermaid sanitizes diagram code to prevent XSS.  
For sites that accept user‑generated diagrams, you can enable sandbox rendering:

```js
mermaid.initialize({
  securityLevel: 'sandbox'
});
```

This renders each diagram inside a sandboxed `<iframe>`, blocking any JavaScript execution from the diagram code.

---

## Contribution

- Fork the repo: `git clone https://github.com/mermaid-js/mermaid.git`
- Install dependencies:  
  ```bash
  pnpm install
  ```
- Run tests: `pnpm test`
- Submit PRs – we welcome new diagram types, bug fixes, and documentation improvements.

---

## License

MIT © Mermaid

---