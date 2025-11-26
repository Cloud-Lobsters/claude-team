# Mermaid – Text‑Based Diagramming Library

Mermaid lets you create diagrams and visualizations using plain text.  
It is a JavaScript‑based renderer that turns Markdown‑style definitions into SVG charts, making documentation easier to maintain and share.

> **Why Mermaid?**  
> Documentation that is out‑of‑date costs developers time. Mermaid keeps diagrams in sync with code by letting you edit them in the same place as your source.

---

## Table of Contents

1. [Getting Started](#getting-started)  
2. [Diagram Types](#diagram-types)  
3. [Syntax & Configuration](#syntax--configuration)  
4. [Installation](#installation)  
5. [Mermaid API](#mermaid-api)  
6. [Security](#security)  
7. [Contributing](#contributing)  

---

## 1. Getting Started

Mermaid is inspired by Markdown. If you know Markdown, you’ll pick up Mermaid quickly.

```mermaid
graph TD;
    A-->B;
    A-->C;
    B-->D;
    C-->D;
```

> **Tip** – Use the [Mermaid Live Editor](https://mermaid.live) to experiment interactively.

---

## 2. Diagram Types

Below are the supported diagram types with a minimal example for each.

| Diagram | Example |
|--------|--------|
| **Flowchart** | `graph TD; A-->B;` |
| **Sequence Diagram** | `sequenceDiagram ...` |
| **Gantt** | `gantt ...` |
| **Class Diagram** | `classDiagram ...` |
| **Git Graph** | `gitGraph ...` |
| **Entity‑Relationship Diagram** | `erDiagram ...` |
| **User Journey** | `journey ...` |
| **Quadrant Chart** | `quadrantChart ...` |
| **XY Chart** | `xychart-beta ...` |

### 2.1 Flowchart

```mermaid
graph TD;
    A-->B;
    A-->C;
    B-->D;
    C-->D;
```

### 2.2 Sequence Diagram

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

### 2.3 Gantt Diagram

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

### 2.4 Class Diagram

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

### 2.5 Git Graph

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

### 2.6 Entity‑Relationship Diagram

```mermaid
erDiagram
    CUSTOMER ||--o{ ORDER : places
    ORDER ||--|{ LINE-ITEM : contains
    CUSTOMER }|..|{ DELIVERY-ADDRESS : uses
```

### 2.7 User Journey Diagram

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

### 2.8 Quadrant Chart

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

### 2.9 XY Chart

```mermaid
xychart-beta
    title "Sales Revenue"
    x-axis [jan, feb, mar, apr, may, jun, jul, aug, sep, oct, nov, dec]
    y-axis "Revenue (in $)" 4000 --> 11000
    bar [5000, 6000, 7500, 8200, 9500, 10500, 11000, 10200, 9200, 8500, 7000, 6000]
    line [5000, 6000, 7500, 8200, 9500, 10500, 11000, 10200, 9200, 8500, 7000, 6000]
```

---

## 3. Syntax & Configuration

Mermaid uses a simple, Markdown‑like syntax.  
All diagrams are wrapped in a `<div class="mermaid">` or `<pre class="mermaid">` tag, or you can embed them directly in Markdown with triple backticks and the `mermaid` language hint.

```html
<div class="mermaid">
graph TD;
    A-->B;
</div>
```

### 3.1 Configuration Options

```js
mermaid.initialize({
    startOnLoad: true,
    theme: 'default',
    // other options...
});
```

Available options include:

| Option | Description |
|-------|------------|
| `startOnLoad` | Auto‑render diagrams on page load |
| `theme` | `default`, `dark`, `forest`, `neutral` |
| `themeVariables` | Override theme colors |
| `securityLevel` | `strict`, `loose`, `sandbox` |

---

## 4. Installation

### 4.1 CDN

```html
<script type="module">
  import mermaid from 'https://cdn.jsdelivr.net/npm/mermaid@11/dist/mermaid.esm.min.mjs';
  mermaid.initialize({ startOnLoad: true });
</script>
```

### 4.2 npm / Yarn / pnpm

```bash
npm i mermaid
# or
yarn add mermaid
# or
pnpm add mermaid
```

### 4.3 Node & CLI

```bash
# Install Node (v16+ recommended)
npx pnpm install
pnpm test
```

---

## 5. Mermaid API

Mermaid can be used programmatically:

```js
import mermaid from 'mermaid';

mermaid.render('diagramId', 'graph TD; A-->B;', (svgCode) => {
    document.getElementById('diagramContainer').innerHTML = svgCode;
});
```

---

## 6. Security

Mermaid sanitizes diagram code, but for public sites you can enable a sandboxed iframe:

```js
mermaid.initialize({
    securityLevel: 'sandbox'
});
```

> **Note** – Some interactive features may be disabled in sandbox mode.

---

## 7. Contributing

Mermaid is open source. Contributions are welcome!  
- **Add new diagram types** (mindmaps, ER diagrams, etc.)  
- **Improve existing diagrams**  
- **Fix bugs**  
- **Write documentation**  

See the [contribution guidelines](https://github.com/mermaid-js/mermaid/blob/main/CONTRIBUTING.md) for details.

---

## 8. Resources

- **Mermaid Live Editor** – https://mermaid.live  
- **Mermaid CLI** – https://github.com/mermaid-js/mermaid-cli  
- **Mermaid Tiny** – https://github.com/mermaid-js/mermaid-tiny  
- **Mermaid Webpack Demo** – https://github.com/mermaid-js/mermaid-webpack-demo  

---

*Mermaid was created by Knut Sveidqvist. Thanks to the community for their contributions.*