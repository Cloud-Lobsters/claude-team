# Mermaid – Text‑Based Diagramming Library

Mermaid is a JavaScript‑based tool that turns plain‑text diagram definitions into SVG visualisations.  
It is inspired by Markdown, so anyone familiar with that syntax can start drawing diagrams immediately.

> **Why Mermaid?**  
> Documentation that grows with code, keeps diagrams up‑to‑date, and can be embedded in Markdown, HTML, or any JavaScript project.

---

## Table of Contents

| Section | Description |
|--------|-------------|
| [Installation](#installation) | CDN, npm, yarn, pnpm |
| [Getting Started](#getting-started) | Quick examples |
| [Diagram Types](#diagram-types) | Flowchart, Sequence, Gantt, Class, Git, ER, Journey, Quadrant, XY |
| [Configuration](#configuration) | `mermaid.initialize`, themes, directives |
| [Security](#security) | Sanitisation, sandboxed rendering |
| [Contribution](#contribution) | How to help |
| [References](#references) | Links to docs, live editor, CLI |

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

Mermaid looks for `<div>` or `<pre>` tags with `class="mermaid"` and renders the diagram inside.

```html
<div class="mermaid">
  graph TD;
    A-->B;
    A-->C;
    B-->D;
    C-->D;
</div>
```

---

## Diagram Types

Below are the most common diagram types with full examples.  
Copy the code block into a `<pre class="mermaid">` tag or the Mermaid Live Editor.

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
  startOnLoad: true,
  theme: 'default',          // 'dark', 'forest', 'neutral', etc.
  themeVariables: {          // Override theme colours
    primaryColor: '#ff0000'
  },
  // Directives
  // e.g. %%{init: {'theme': 'dark'}}%%
});
```

- **Themes** – `default`, `dark`, `forest`, `neutral`, `base`, `base2`, `base3`.
- **Directives** – Inline YAML to override settings per diagram.

---

## Security

Mermaid sanitises diagram code before rendering.  
For sites that accept user‑generated diagrams, you can enable sandboxed rendering:

```js
mermaid.initialize({
  securityLevel: 'sandboxed'   // Prevents JS execution inside diagrams
});
```

> **Note**: Sandbox mode disables interactive features (e.g., zoom).

---

## Contribution

- **Issues** – Report bugs or request features on GitHub.
- **Pull Requests** – Add new diagram types, improve existing ones, or fix bugs.
- **Documentation** – Help keep the docs up‑to‑date.

See the [Contribution Guidelines](https://github.com/mermaid-js/mermaid/blob/main/CONTRIBUTING.md).

---

## References

- **Live Editor** – https://mermaid.live
- **CLI** – `npx mermaid-cli`
- **Docs** – https://mermaid-js.github.io/mermaid/#/
- **Community Integrations** – Plugins for VS Code, Obsidian, etc.

---

*Mermaid was created by Knut Sveidqvist. It is maintained by a growing community of contributors.*