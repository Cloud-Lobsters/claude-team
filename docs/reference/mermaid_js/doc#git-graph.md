# Mermaid – Text‑Based Diagramming Library

Mermaid is a JavaScript‑based diagramming and charting tool that renders Markdown‑inspired text definitions into SVG visualisations.  
It is designed to keep documentation in sync with code, to be embeddable in web pages, static sites, and CI pipelines.

---

## Table of Contents

| Section | Description |
|--------|------------|
| [Getting Started](#getting-started) | Quick installation and first diagram |
| [Diagram Types](#diagram-types) | Overview of supported diagram types |
| [Syntax & Configuration](#syntax--configuration) | Basic syntax, configuration options |
| [Examples](#examples) | Full code snippets for each diagram |
| [Installation](#installation) | CDN, npm, yarn, pnpm |
| [API Usage](#api-usage) | Embedding Mermaid in a page |
| [Security](#security) | Sanitisation & sandboxing |
| [Contributing](#contributing) | How to help |
| [FAQ & Resources](#faq--resources) | Links to docs, community, etc. |

---

## Getting Started

```bash
# Using npm
npm i mermaid

# Using yarn
yarn add mermaid

# Using pnpm
pnpm add mermaid
```

```html
<!-- Example: Embedding Mermaid in a static page -->
<script type="module">
  import mermaid from 'https://cdn.jsdelivr.net/npm/mermaid@11/dist/mermaid.esm.min.mjs';
  mermaid.initialize({ startOnLoad: true });
</script>
```

Mermaid will automatically render any `<div>` or `<pre>` element with `class="mermaid"`.

---

## Diagram Types

| Diagram | Typical Use |
|--------|------------|
| **Flowchart** | Process flows |
| **Sequence Diagram** | Interaction between actors |
| **Gantt** | Project timelines |
| **Class Diagram** | UML class relationships |
| **Git Graph** | Git commit history |
| **ER Diagram** | Entity‑Relationship |
| **Journey** | User journey |
| **Quadrant Chart** | Four‑quadrant analysis |
| **XY Chart** | Scatter / line / bar |
| **Mindmap, Gantt, etc.** | Experimental / community extensions |

---

## Syntax & Configuration

Mermaid syntax is Markdown‑like.  
A diagram starts with a keyword (`graph`, `sequenceDiagram`, `gantt`, etc.) followed by diagram‑specific statements.

```mermaid
graph TD;
    A-->B;
    A-->C;
    B-->D;
    C-->D;
```

Configuration options are passed to `mermaid.initialize()`:

```js
mermaid.initialize({
  startOnLoad: true,
  theme: 'forest',
  // ...other options
});
```

See the full list of options in the [Mermaid API Configuration](https://mermaid.js.org/api/mermaid.html#mermaidinitialize) docs.

---

## Examples

Below are complete, runnable snippets for each diagram type.  
Copy the code into a file with a `.md` extension or a `<pre class="mermaid">` block and run it in the Mermaid Live Editor or any page that loads Mermaid.

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

### Entity Relationship Diagram (experimental)

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

### XY Chart (beta)

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

```html
<script type="module">
  import mermaid from 'https://cdn.jsdelivr.net/npm/mermaid@11/dist/mermaid.esm.min.mjs';
  mermaid.initialize({ startOnLoad: true });
</script>
```

### npm / yarn / pnpm

```bash
npm i mermaid
# or
yarn add mermaid
# or
pnpm add mermaid
```

---

## API Usage

```js
import mermaid from 'mermaid';

mermaid.initialize({
  startOnLoad: true,
  theme: 'forest',
  // other options
});
```

Mermaid will automatically parse `<div class="mermaid">` or `<pre class="mermaid">` tags.

---

## Security

Mermaid sanitises diagram code to prevent XSS.  
For extra safety, you can render diagrams in a sandboxed `<iframe>`:

```html
<iframe sandbox="allow-scripts" srcdoc="
  <script type='module'>
    import mermaid from 'https://cdn.jsdelivr.net/npm/mermaid@11/dist/mermaid.esm.min.mjs';
    mermaid.initialize({ startOnLoad: true });
  </script>
  <pre class='mermaid'>graph TD; A-->B;</pre>
"></iframe>
```

---

## Contributing

- Fork the repo: `git clone https://github.com/mermaid-js/mermaid.git`
- Install dependencies: `pnpm install`
- Run tests: `pnpm test`
- Submit PRs with linted code (`pnpm lint`)

See the [Contribution Guidelines](https://github.com/mermaid-js/mermaid/blob/main/CONTRIBUTING.md) for details.

---

## FAQ & Resources

- **Docs**: https://mermaid.js.org
- **Live Editor**: https://mermaid.live
- **CLI**: https://github.com/mermaid-js/mermaid-cli
- **Community Integrations**: https://mermaid.js.org/integrations
- **Security**: email `security@mermaid.live`

---

*Mermaid was created by Knut Sveidqvist. Thanks to the community for continuous contributions.*