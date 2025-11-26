# Mermaid – Text‑Based Diagramming Library

Mermaid lets you create diagrams and visualizations using plain text.  
It is a JavaScript‑based tool that renders Markdown‑style definitions into SVG charts and diagrams.  
If you are familiar with Markdown, learning Mermaid is straightforward.

---

## Table of Contents

1. [Introduction](#introduction)
2. [Getting Started](#getting-started)
3. [Diagram Syntax](#diagram-syntax)
4. [Diagram Types](#diagram-types)
5. [Installation & Deployment](#installation--deployment)
6. [Mermaid API](#mermaid-api)
7. [Security](#security)
8. [Contributing](#contributing)
9. [References](#references)

---

## 1. Introduction

Mermaid is a JavaScript library that renders diagrams from text definitions.  
It is useful for:

* Keeping documentation up‑to‑date
* Embedding diagrams in Markdown, wikis, blogs, and web pages
* Automating diagram generation in CI/CD pipelines

---

## 2. Getting Started

### 2.1 CDN

```html
<script type="module">
  import mermaid from 'https://cdn.jsdelivr.net/npm/mermaid@11/dist/mermaid.esm.min.mjs';
  mermaid.initialize({ startOnLoad: true });
</script>
```

Mermaid will automatically render any `<div>` or `<pre>` with `class="mermaid"`.

### 2.2 NPM / Yarn / Pnpm

```bash
# npm
npm i mermaid

# yarn
yarn add mermaid

# pnpm
pnpm add mermaid
```

---

## 3. Diagram Syntax

Mermaid uses a Markdown‑inspired syntax.  
Each diagram type has its own keyword (e.g., `graph`, `sequenceDiagram`, `gantt`, etc.).

### 3.1 Flowchart

```mermaid
graph TD;
    A-->B;
    A-->C;
    B-->D;
    C-->D;
```

### 3.2 Sequence Diagram

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

### 3.3 Gantt Diagram

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

### 3.4 Class Diagram

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

### 3.5 Git Graph

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

### 3.6 Entity Relationship Diagram (Experimental)

```mermaid
erDiagram
    CUSTOMER ||--o{ ORDER : places
    ORDER ||--|{ LINE-ITEM : contains
    CUSTOMER }|..|{ DELIVERY-ADDRESS : uses
```

### 3.7 User Journey Diagram

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

### 3.8 Quadrant Chart

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

### 3.9 XY Chart (Beta)

```mermaid
xychart-beta
    title "Sales Revenue"
    x-axis [jan, feb, mar, apr, may, jun, jul, aug, sep, oct, nov, dec]
    y-axis "Revenue (in $)" 4000 --> 11000
    bar [5000, 6000, 7500, 8200, 9500, 10500, 11000, 10200, 9200, 8500, 7000, 6000]
    line [5000, 6000, 7500, 8200, 9500, 10500, 11000, 10200, 9200, 8500, 7000, 6000]
```

---

## 4. Diagram Types

| Diagram | Keyword | Description |
|--------|--------|------------|
| Flowchart | `graph` | Directed or undirected graphs |
| Sequence Diagram | `sequenceDiagram` | Interaction between participants |
| Gantt | `gantt` | Project timelines |
| Class Diagram | `classDiagram` | UML class relationships |
| Git Graph | `gitGraph` | Git commit history |
| ER Diagram | `erDiagram` | Entity‑Relationship models |
| User Journey | `journey` | User experience flows |
| Quadrant Chart | `quadrantChart` | 2‑D quadrant visualisation |
| XY Chart | `xychart-beta` | Scatter/line/bar plots |

---

## 5. Installation & Deployment

### 5.1 Node Environment

```bash
# Install Node 16+ (recommended via volta)
volta install node
volta install pnpm
```

### 5.2 Clone & Build

```bash
git clone https://github.com/mermaid-js/mermaid.git
cd mermaid
pnpm install
pnpm test
```

### 5.3 Linting

```bash
pnpm lint
```

### 5.4 Publishing

```bash
# Update version in package.json
npm publish
```

---

## 6. Mermaid API

```js
import mermaid from 'https://cdn.jsdelivr.net/npm/mermaid@11/dist/mermaid.esm.min.mjs';
mermaid.initialize({ startOnLoad: true });
```

Mermaid will parse `<div class="mermaid">` or `<pre class="mermaid">` tags and render SVG.

---

## 7. Security

Mermaid sanitises diagram code, but user‑supplied content can still contain malicious scripts.  
For high‑risk environments, render diagrams inside a sandboxed `<iframe>` to block JavaScript execution.

---

## 8. Contributing

* Add new diagram types (mindmaps, ER‑diagrams, etc.)
* Improve existing diagrams
* Fix bugs, improve docs

See the [contribution guidelines](https://github.com/mermaid-js/mermaid/blob/main/CONTRIBUTING.md).

---

## 9. References

* [Mermaid Live Editor](https://mermaid.live)
* [Mermaid CLI](https://github.com/mermaid-js/mermaid-cli)
* [Mermaid Tiny](https://github.com/mermaid-js/mermaid-tiny)
* [Mermaid Webpack Demo](https://github.com/mermaid-js/mermaid-webpack-demo)
* [Mermaid Parcel Demo](https://github.com/mermaid-js/mermaid-parcel-demo)

---