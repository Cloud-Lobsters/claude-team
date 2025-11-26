# Mermaid – Text‑Based Diagramming Library

Mermaid is a JavaScript‑based diagramming and charting tool that renders Markdown‑style text definitions into SVG diagrams.  
It is designed to keep documentation in sync with code, to be embeddable in web pages, Markdown files, and CI pipelines.

---

## Table of Contents

| Section | Description |
|--------|------------|
| [Getting Started](#getting-started) | Quick start, CDN, npm |
| [Diagram Types](#diagram-types) | Overview of supported diagrams |
| [Installation](#installation) | CDN, npm, Yarn, pnpm |
| [Usage](#usage) | How to embed diagrams |
| [Examples](#examples) | Full code snippets for each diagram |
| [Security](#security) | Sandbox rendering |
| [Contributing](#contributing) | How to help |
| [License](#license) | MIT |

---

## Getting Started

```bash
# CDN
<script type="module">
  import mermaid from 'https://cdn.jsdelivr.net/npm/mermaid@11/dist/mermaid.esm.min.mjs';
  mermaid.initialize({ startOnLoad: true });
</script>
```

Mermaid will automatically render any `<div>` or `<pre>` element with `class="mermaid"`.

---

## Diagram Types

| Diagram | Syntax | Example |
|--------|-------|--------|
| **Flowchart** | `graph TD;` | See below |
| **Sequence Diagram** | `sequenceDiagram` | See below |
| **Gantt** | `gantt` | See below |
| **Class Diagram** | `classDiagram` | See below |
| **Git Graph** | `gitGraph` | See below |
| **Entity‑Relationship** | `erDiagram` | See below |
| **User Journey** | `journey` | See below |
| **Quadrant Chart** | `quadrantChart` | See below |
| **XY Chart** | `xychart-beta` | See below |

---

## Installation

| Method | Command |
|-------|--------|
| **CDN** | `https://cdn.jsdelivr.net/npm/mermaid@<version>/dist/` |
| **npm** | `npm i mermaid` |
| **Yarn** | `yarn add mermaid` |
| **pnpm** | `pnpm add mermaid` |

> Replace `<version>` with the desired version number (e.g. `11`).

---

## Usage

Add a `<div>` or `<pre>` with `class="mermaid"` and put the diagram definition inside.

```html
<div class="mermaid">
  graph TD;
    A-->B;
    A-->C;
    B-->D;
    C-->D;
</div>
```

Mermaid will parse the text and render an SVG.

---

## Examples

Below are the full code snippets for each diagram type.  
Copy the code into a file with `class="mermaid"` or run it in the Mermaid Live Editor.

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

### 6. Entity‑Relationship Diagram

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

### 9. XY Chart

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

Mermaid sanitizes diagram code, but for public sites you can enable sandboxed rendering:

```js
mermaid.initialize({
  startOnLoad: true,
  securityLevel: 'sandbox'
});
```

This renders diagrams inside a sandboxed `<iframe>` to prevent execution of malicious scripts.

---

## Contributing

- Fork the repo: `git clone https://github.com/mermaid-js/mermaid.git`
- Install dependencies: `pnpm install`
- Run tests: `pnpm test`
- Submit PRs with linted code (`pnpm lint`)

See the [CONTRIBUTING.md](https://github.com/mermaid-js/mermaid/blob/main/CONTRIBUTING.md) for details.

---

## License

MIT © Mermaid

---