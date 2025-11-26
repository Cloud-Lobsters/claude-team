# Mermaid – Text‑Based Diagramming Library

Mermaid is a JavaScript‑based diagramming and charting tool that renders Markdown‑style text definitions into SVG diagrams.  
It is designed to keep documentation in sync with code, to be embeddable in web pages, static sites, and documentation generators.

---

## Table of Contents

1. [Getting Started](#getting-started)  
2. [Installation](#installation)  
3. [Configuration](#configuration)  
4. [Diagram Types & Examples](#diagram-types)  
5. [API Usage](#api-usage)  
6. [Security](#security)  
7. [Contributing](#contributing)  

---

## 1. Getting Started

```bash
# Install via npm
npm i mermaid
```

```html
<script type="module">
  import mermaid from 'https://cdn.jsdelivr.net/npm/mermaid@11/dist/mermaid.esm.min.mjs';
  mermaid.initialize({ startOnLoad: true });
</script>
```

Mermaid will automatically render any `<div>` or `<pre>` element with `class="mermaid"`.

---

## 2. Installation

| Method | Command |
|-------|--------|
| **npm** | `npm i mermaid` |
| **yarn** | `yarn add mermaid` |
| **pnpm** | `pnpm add mermaid` |
| **CDN** | `https://cdn.jsdelivr.net/npm/mermaid@<version>/dist/` (replace `<version>` with the desired release) |

---

## 3. Configuration

```js
mermaid.initialize({
  startOnLoad: true,          // Render diagrams on page load
  theme: 'default',         // 'default', 'forest', 'dark', 'neutral'
  // ...other options
});
```

See the full list of options in the [Configuration Guide](https://mermaid.js.org/configuration.html).

---

## 4. Diagram Types & Examples

Below are the supported diagram types. Each example is wrapped in a fenced code block with the `mermaid` language identifier.

### 4.1 Flowchart

```mermaid
graph TD;
    A-->B;
    A-->C;
    B-->D;
    C-->D;
```

### 4.2 Sequence Diagram

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

### 4.3 Gantt Diagram

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

### 4.4 Class Diagram

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

### 4.5 Git Graph

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

### 4.6 Entity Relationship Diagram (Experimental)

```mermaid
erDiagram
    CUSTOMER ||--o{ ORDER : places
    ORDER ||--|{ LINE-ITEM : contains
    CUSTOMER }|..|{ DELIVERY-ADDRESS : uses
```

### 4.7 User Journey Diagram

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

### 4.8 Quadrant Chart

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

### 4.9 XY Chart (Beta)

```mermaid
xychart-beta
    title "Sales Revenue"
    x-axis [jan, feb, mar, apr, may, jun, jul, aug, sep, oct, nov, dec]
    y-axis "Revenue (in $)" 4000 --> 11000
    bar [5000, 6000, 7500, 8200, 9500, 10500, 11000, 10200, 9200, 8500, 7000, 6000]
    line [5000, 6000, 7500, 8200, 9500, 10500, 11000, 10200, 9200, 8500, 7000, 6000]
```

---

## 5. API Usage

```js
import mermaid from 'mermaid';

mermaid.initialize({
  startOnLoad: true,
  theme: 'forest',
  // other options
});
```

Mermaid exposes a `render` method for programmatic rendering:

```js
mermaid.render('diagramId', 'graph TD; A-->B;', (svgCode, bindFunctions) => {
  document.getElementById('diagramContainer').innerHTML = svgCode;
});
```

---

## 6. Security

Mermaid sanitizes diagram code to prevent XSS. For highly untrusted input, consider rendering inside a sandboxed `<iframe>`:

```html
<iframe sandbox="allow-scripts" srcdoc="..."></iframe>
```

---

## 7. Contributing

- Fork the repo: `git clone https://github.com/mermaid-js/mermaid.git`
- Install dependencies: `pnpm install`
- Run tests: `pnpm test`
- Submit PRs with linted code (`pnpm lint`)

For more details, see the [Contribution Guide](https://mermaid.js.org/contributing.html).

---

**Mermaid** – *Make documentation easier to write, maintain, and share.*