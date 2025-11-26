# Mermaid – Text‑Based Diagramming Library

Mermaid lets you create diagrams and visualizations using plain text.  
It is a JavaScript‑based renderer that turns Markdown‑style definitions into SVG charts.

> **Why Mermaid?**  
> Documentation that changes with code is hard to maintain.  
> Mermaid keeps diagrams in sync with the source by letting you write them in the same language you already use.

---

## Table of Contents

| Section | Description |
|--------|------------|
| [Getting Started](#getting-started) | Install, CDN, CLI |
| [Diagram Types](#diagram-types) | Flowchart, Sequence, Gantt, Class, Git Graph, ER, Journey, Quadrant, XY |
| [Syntax & Configuration](#syntax--configuration) | Basic syntax, theming, API |
| [Examples](#examples) | Full code snippets for each diagram |
| [Security](#security) | Sandbox rendering, sanitization |
| [Contributing](#contributing) | How to help |
| [Resources](#resources) | Live editor, CLI, docs |

---

## Getting Started

### Install

```bash
# npm
npm i mermaid

# yarn
yarn add mermaid

# pnpm
pnpm add mermaid
```

### CDN

```html
<script type="module">
  import mermaid from 'https://cdn.jsdelivr.net/npm/mermaid@11/dist/mermaid.esm.min.mjs';
  mermaid.initialize({ startOnLoad: true });
</script>
```

### CLI

```bash
npm i -g @mermaid-js/mermaid-cli
mmdc -i diagram.mmd -o diagram.svg
```

---

## Diagram Types

| Diagram | Code | Rendered |
|--------|------|---------|
| **Flowchart** | `graph TD; A-->B;` | ![Flowchart](https://mermaid.live/flowchart.png) |
| **Sequence** | `sequenceDiagram ...` | ![Sequence](https://mermaid.live/sequence.png) |
| **Gantt** | `gantt ...` | ![Gantt](https://mermaid.live/gantt.png) |
| **Class** | `classDiagram ...` | ![Class](https://mermaid.live/class.png) |
| **Git Graph** | `gitGraph ...` | ![Git Graph](https://mermaid.live/gitgraph.png) |
| **ER Diagram** | `erDiagram ...` | ![ER](https://mermaid.live/er.png) |
| **Journey** | `journey ...` | ![Journey](https://mermaid.live/journey.png) |
| **Quadrant** | `quadrantChart ...` | ![Quadrant](https://mermaid.live/quadrant.png) |
| **XY Chart** | `xychart-beta ...` | ![XY](https://mermaid.live/xy.png) |

> **Tip** – Use the *Mermaid Live Editor* to preview diagrams instantly.

---

## Syntax & Configuration

### Basic Syntax

```mermaid
graph TD;
    A-->B;
    A-->C;
    B-->D;
    C-->D;
```

### Theming

```js
mermaid.initialize({
  theme: 'forest',
  themeVariables: {
    primaryColor: '#ff0000'
  }
});
```

### API

```js
mermaid.initialize({
  startOnLoad: true,
  securityLevel: 'strict', // or 'loose'
  logLevel: 'debug'
});
```

---

## Full Examples

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

### Entity Relationship Diagram

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

Mermaid sanitizes diagram code but it can still contain malicious scripts.  
Use the sandboxed rendering mode:

```js
mermaid.initialize({
  securityLevel: 'sandboxed'
});
```

> **Note** – Sandbox mode disables some interactive features.

---

## Contributing

- Fork the repo: `git clone https://github.com/mermaid-js/mermaid.git`
- Install dependencies: `pnpm install`
- Run tests: `pnpm test`
- Submit PRs – we welcome new diagram types, bug fixes, and documentation improvements.

---

## Resources

- **Live Editor** – https://mermaid.live
- **CLI** – https://github.com/mermaid-js/mermaid-cli
- **Docs** – https://mermaid-js.github.io/mermaid/#/
- **Community** – Discord, GitHub Discussions

---

*Mermaid was created by Knut Sveidqvist.  
Thanks to the community for keeping the project alive.*