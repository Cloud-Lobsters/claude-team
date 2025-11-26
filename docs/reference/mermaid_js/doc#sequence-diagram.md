# Mermaid – Text‑Based Diagramming Library

Mermaid lets you create diagrams and visualizations using plain text.  
It is a JavaScript‑based tool that renders Markdown‑style definitions into SVG charts, making it easy to keep documentation up‑to‑date and shareable.

> **Why Mermaid?**  
> Documentation that is out of sync with code is a productivity killer.  
> Mermaid solves this by letting you write diagrams in the same language you use for code – plain text – and embed them directly in Markdown, HTML, or any other text‑based format.

---

## Table of Contents

1. [Getting Started](#getting-started)  
2. [Diagram Types](#diagram-types)  
   - [Flowchart](#flowchart)  
   - [Sequence Diagram](#sequence-diagram)  
   - [Gantt Diagram](#gantt-diagram)  
   - [Class Diagram](#class-diagram)  
   - [Git Graph](#git-graph)  
   - [Entity‑Relationship Diagram](#entity-relationship-diagram)  
   - [User Journey Diagram](#user-journey-diagram)  
   - [Quadrant Chart](#quadrant-chart)  
   - [XY Chart](#xy-chart)  
3. [Installation](#installation)  
4. [Configuration](#configuration)  
5. [Security](#security)  
6. [Contributing](#contributing)  
7. [License](#license)

---

## Getting Started

Mermaid can be used in three main ways:

1. **Via CDN** – Add a `<script>` tag to your page.  
2. **Node package** – `npm i mermaid` (or `yarn add mermaid`).  
3. **CLI** – `npx mermaid-cli` for generating SVGs from the command line.

### CDN Example

```html
<script type="module">
  import mermaid from 'https://cdn.jsdelivr.net/npm/mermaid@11/dist/mermaid.esm.min.mjs';
  mermaid.initialize({ startOnLoad: true });
</script>
```

Mermaid will automatically render any `<div>` or `<pre>` with `class="mermaid"`.

---

## Diagram Types

Below are the supported diagram types with minimal syntax and a working example for each.

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

## Installation

### CDN

```text
https://cdn.jsdelivr.net/npm/mermaid@<version>/dist/
```

Replace `<version>` with the desired release (e.g. `11`).

### Node Package

```bash
npm i mermaid
# or
yarn add mermaid
# or
pnpm add mermaid
```

### CLI

```bash
npx mermaid-cli -i input.mmd -o output.svg
```

---

## Configuration

Mermaid can be configured via `mermaid.initialize({ ... })`.  
Common options:

| Option | Description |
|-------|------------|
| `startOnLoad` | Auto‑render diagrams on page load |
| `theme` | `default`, `forest`, `dark`, `neutral` |
| `themeVariables` | Override theme colors |
| `securityLevel` | `strict`, `loose`, `sandbox` |

Example:

```js
mermaid.initialize({
  startOnLoad: true,
  theme: 'dark',
  securityLevel: 'sandbox'
});
```

---

## Security

Mermaid sanitizes diagram code to prevent XSS.  
For highly untrusted input, set `securityLevel: 'sandbox'` to render diagrams inside a sandboxed iframe, disabling JavaScript execution in the diagram code.

---

## Contributing

Mermaid is an open‑source project.  
If you’d like to contribute:

1. Fork the repo: `git clone https://github.com/mermaid-js/mermaid.git`
2. Install dependencies: `pnpm install`
3. Run tests: `pnpm test`
4. Submit a pull request.

See the [CONTRIBUTING.md](https://github.com/mermaid-js/mermaid/blob/main/CONTRIBUTING.md) for details.

---

## License

Mermaid is released under the MIT license.  
See the [LICENSE](https://github.com/mermaid-js/mermaid/blob/main/LICENSE) file for details.