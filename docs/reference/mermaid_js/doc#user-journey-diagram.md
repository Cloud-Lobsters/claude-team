# Mermaid – Text‑Based Diagramming Library  
*(Sanitized & Reformatted Documentation)*  

---

## 1. Overview  

Mermaid is a **JavaScript‑based** diagramming tool that turns plain‑text definitions into SVG visualisations.  
It is inspired by Markdown, so anyone familiar with Markdown can pick it up quickly.

> **Why Mermaid?**  
> • Keeps documentation in sync with code.  
> • Enables non‑programmers to author diagrams.  
> • Can be embedded in CI/CD pipelines, static site generators, or any web page.

---

## 2. Getting Started

### 2.1 Install

| Package Manager | Command |
|----------------|--------|
| npm | `npm i mermaid` |
| yarn | `yarn add mermaid` |
| pnpm | `pnpm add mermaid` |

### 2.2 CDN

```html
<script type="module">
  import mermaid from 'https://cdn.jsdelivr.net/npm/mermaid@11/dist/mermaid.esm.min.mjs';
  mermaid.initialize({ startOnLoad: true });
</script>
```

Mermaid will automatically render any `<div>` or `<pre>` with `class="mermaid"`.

---

## 3. Diagram Types & Syntax

Below are the supported diagram types with **complete examples**.  
Copy the code blocks into a file with a `.mmd` extension or wrap them in a `<pre class="mermaid">` tag.

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

### 3.6 Entity‑Relationship Diagram (Experimental)

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

## 4. Security & Sanitisation

Mermaid sanitises incoming diagram code, but for public sites it is recommended to:

1. Render diagrams inside a sandboxed `<iframe>`.  
2. Disable interactive features that could execute malicious scripts.

---

## 5. Development & Contribution

### 5.1 Development Setup

```bash
git clone https://github.com/mermaid-js/mermaid.git
cd mermaid
npx pnpm install
pnpm test
pnpm lint
```

### 5.2 Contributing

- Fork the repo.  
- Create a feature branch.  
- Submit a pull request.  
- Follow the [contribution guidelines](https://github.com/mermaid-js/mermaid/blob/main/CONTRIBUTING.md).

---

## 6. Release & Publishing

```bash
# Update version in package.json
npm publish
```

---

## 7. Contact & Security

- **Security**: `security@mermaid.live`  
- **General**: `contact@mermaid.live`

---

## 8. Acknowledgements

- d3 & dagre-d3 for layout engines.  
- js‑sequence‑diagram for sequence grammar.  
- Contributors: Knut Sveidqvist, Tyler Long, and many others.

---