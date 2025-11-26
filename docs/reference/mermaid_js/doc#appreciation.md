# Mermaid – Text‑Based Diagramming Library

Mermaid lets you create diagrams and visualizations using plain text.  
It is a JavaScript‑based tool that renders Markdown‑style definitions into SVG charts and diagrams.  
If you are familiar with Markdown, learning Mermaid is almost trivial.

---

## Table of Contents

1. [Introduction](#introduction)  
2. [Getting Started](#getting-started)  
3. [Syntax & Configuration](#syntax--configuration)  
4. [Diagram Types](#diagram-types)  
5. [Installation](#installation)  
6. [Deployment](#deployment)  
7. [Security](#security)  
8. [Contributing](#contributing)  

---

## 1. Introduction

Mermaid is a lightweight, JavaScript‑based diagramming tool that renders Markdown‑inspired text definitions into SVG charts.  
It is designed to keep documentation up‑to‑date by allowing diagrams to be edited alongside code.

---

## 2. Getting Started

### 2.1 CDN

```html
<script type="module">
  import mermaid from 'https://cdn.jsdelivr.net/npm/mermaid@11/dist/mermaid.esm.min.mjs';
  mermaid.initialize({ startOnLoad: true });
</script>
```

Mermaid will automatically render any `<div>` or `<pre>` tags with `class="mermaid"`.

### 2.2 Node Installation

```bash
# Using npm
npm i mermaid

# Using yarn
yarn add mermaid

# Using pnpm
pnpm add mermaid
```

---

## 3. Syntax & Configuration

Mermaid uses a simple, Markdown‑like syntax.  
Below are the most common diagram types with full examples.

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

| Diagram | Description |
|--------|------------|
| Flowchart | Directed graphs |
| Sequence Diagram | Interaction between participants |
| Gantt | Project timelines |
| Class Diagram | UML class relationships |
| Git Graph | Git commit history |
| ER Diagram | Entity‑Relationship |
| User Journey | User flow |
| Quadrant Chart | 2‑D quadrant analysis |
| XY Chart | Scatter/line/bar plots |

---

## 5. Installation

### 5.1 CDN

```text
https://cdn.jsdelivr.net/npm/mermaid@<version>/dist/
```

Replace `<version>` with the desired release (e.g., `11`).

### 5.2 Node

```bash
# npm
npm i mermaid

# yarn
yarn add mermaid

# pnpm
pnpm add mermaid
```

---

## 6. Deployment

1. Install Node v16+ (recommended via `volta`).
2. Install Mermaid (`npm i mermaid`).
3. Add the script tag shown in **Getting Started** to your HTML.

---

## 7. Security

Mermaid sanitizes diagram code, but because diagrams contain many characters that are also HTML, sanitization is non‑trivial.  
For public sites, consider rendering diagrams in a sandboxed `<iframe>` to prevent execution of malicious scripts.

---

## 8. Contributing

Mermaid is an open‑source project.  
If you want to help:

1. Fork the repo: `git clone https://github.com/mermaid-js/mermaid.git`
2. Install dependencies: `pnpm install`
3. Run tests: `pnpm test`
4. Submit a pull request.

For more details, see the [Contribution Guidelines](https://github.com/mermaid-js/mermaid/blob/main/CONTRIBUTING.md).

---

### Acknowledgements

- d3 & dagre-d3 for layout libraries  
- js‑sequence‑diagram for sequence grammar  
- Jessica Peter for inspiration  
- Tyler Long for long‑term collaboration  

---