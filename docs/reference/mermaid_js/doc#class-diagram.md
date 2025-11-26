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
| [Diagram Types](#diagram-types) | Flowchart, Sequence, Gantt, Class, Git Graph, ER, Journey, Quadrant, XY |
| [Configuration](#configuration) | `mermaid.initialize` options |
| [Security](#security) | Sandbox rendering |
| [Contributing](#contributing) | How to help |
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

Create a `<div class="mermaid">` or `<pre class="mermaid">` block and write your diagram:

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

## Diagram Types

Below are the supported diagram types with full examples.  
Copy the code blocks into a `<pre class="mermaid">` element or the Mermaid Live Editor.

### 1. Flowchart

```mermaid
graph TD;
    A-->B;
    A-->C;
    B-->D;
    C-->D;
```

### 2. Sequence Diagram

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

### 3. Gantt Diagram

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

### 4. Class Diagram

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

### 5. Git Graph

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

### 6. Entity‑Relationship Diagram (experimental)

```mermaid
erDiagram
    CUSTOMER ||--o{ ORDER : places
    ORDER ||--|{ LINE-ITEM : contains
    CUSTOMER }|..|{ DELIVERY-ADDRESS : uses
```

### 7. User Journey Diagram

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

### 8. Quadrant Chart

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

### 9. XY Chart (beta)

```mermaid
xychart-beta
    title "Sales Revenue"
    x-axis [jan, feb, mar, apr, may, jun, jul, aug, sep, oct, nov, dec]
    y-axis "Revenue (in $)" 4000 --> 11000
    bar [5000, 6000, 7500, 8200, 9500, 10500, 11000, 10200, 9200, 8500, 7000, 6000]
    line [5000, 6000, 7500, 8200, 9500, 10500, 11000, 10200, 9200, 8500, 7000, 6000]
```

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

## Security

Mermaid sanitizes diagram code to prevent XSS.  
For public sites, you can enable the sandbox mode:

```js
mermaid.initialize({
  securityLevel: 'sandbox'
});
```

This renders the diagram in an iframe that blocks JavaScript execution from the diagram code.

---

## Contributing

- Fork the repo: `git clone https://github.com/mermaid-js/mermaid.git`
- Install dependencies:  
  ```bash
  pnpm install
  ```
- Run tests: `pnpm test`
- Submit PRs with tests and linting (`pnpm lint`).

See the [CONTRIBUTING.md](https://github.com/mermaid-js/mermaid/blob/main/CONTRIBUTING.md) for details.

---

## License

MIT © Knut Sveidqvist and contributors

---