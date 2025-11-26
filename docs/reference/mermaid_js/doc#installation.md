# Mermaid – Text‑Based Diagramming Library

Mermaid lets you create diagrams and visualizations using plain text.  
It is a JavaScript‑based tool that renders Markdown‑style definitions into SVG charts.  
If you are familiar with Markdown, Mermaid is almost a drop‑in replacement for the diagram syntax.

---

## Table of Contents

1. [Introduction](#introduction)
2. [Getting Started](#getting-started)
3. [Diagram Types](#diagram-types)
4. [Syntax & Configuration](#syntax--configuration)
5. [Installation](#installation)
6. [Deployment](#deployment)
7. [Examples](#examples)
8. [Security](#security)
9. [Contributing](#contributing)
10. [License](#license)

---

## 1. Introduction

Mermaid is a JavaScript library that renders diagrams from text definitions.  
It is useful for:

* Keeping documentation up‑to‑date
* Embedding diagrams in Markdown, wikis, blogs, etc.
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

### 2.2 Node / NPM

```bash
npm i mermaid          # npm
yarn add mermaid       # yarn
pnpm add mermaid       # pnpm
```

---

## 3. Diagram Types

| Diagram | Syntax |
|--------|-------|
| Flowchart | `graph TD; ...` |
| Sequence Diagram | `sequenceDiagram` |
| Gantt | `gantt` |
| Class Diagram | `classDiagram` |
| Git Graph | `gitGraph` |
| Entity‑Relationship | `erDiagram` |
| User Journey | `journey` |
| Quadrant Chart | `quadrantChart` |
| XY Chart | `xychart-beta` |
| … | (see full list in the original docs) |

---

## 4. Syntax & Configuration

Mermaid uses a Markdown‑inspired syntax.  
Configuration is done via `mermaid.initialize({ ... })`.  
See the full API reference for options such as theming, icons, directives, etc.

---

## 5. Installation

### 5.1 CDN

```text
https://cdn.jsdelivr.net/npm/mermaid@<version>/dist/
```

Replace `<version>` with the desired release (e.g. `11`).

### 5.2 Node

```bash
# Node 16+ required
npm i mermaid
```

---

## 6. Deployment

Insert the script tag shown in **2.1** into your HTML.  
Mermaid will parse `<div class="mermaid">` or `<pre class="mermaid">` tags.

---

## 7. Examples

Below are the core diagram types with working code snippets.

### 7.1 Flowchart

```mermaid
graph TD;
    A-->B;
    A-->C;
    B-->D;
    C-->D;
```

### 7.2 Sequence Diagram

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

### 7.3 Gantt Diagram

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

### 7.4 Class Diagram

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

### 7.5 Git Graph

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

### 7.6 Entity‑Relationship Diagram

```mermaid
erDiagram
    CUSTOMER ||--o{ ORDER : places
    ORDER ||--|{ LINE-ITEM : contains
    CUSTOMER }|..|{ DELIVERY-ADDRESS : uses
```

### 7.7 User Journey Diagram

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

### 7.8 Quadrant Chart

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

### 7.9 XY Chart

```mermaid
xychart-beta
    title "Sales Revenue"
    x-axis [jan, feb, mar, apr, may, jun, jul, aug, sep, oct, nov, dec]
    y-axis "Revenue (in $)" 4000 --> 11000
    bar [5000, 6000, 7500, 8200, 9500, 10500, 11000, 10200, 9200, 8500, 7000, 6000]
    line [5000, 6000, 7500, 8200, 9500, 10500, 11000, 10200, 9200, 8500, 7000, 6000]
```

---

## 8. Security

Mermaid sanitizes diagram code, but because diagrams contain many HTML‑like characters, sanitization is non‑trivial.  
For public sites, you can enable a sandboxed iframe rendering mode to prevent JavaScript execution inside diagrams.

---

## 9. Contributing

* Fork the repo: `git clone https://github.com/mermaid-js/mermaid.git`
* Install dependencies:  
  ```bash
  pnpm install
  ```
* Run tests: `pnpm test`
* Submit PRs – we welcome new diagram types, bug fixes, and documentation improvements.

---

## 10. License

Mermaid is released under the MIT license.  
See the `LICENSE` file in the repository for details.

---