# Mermaid – Text‑Based Diagramming Library

Mermaid lets you create diagrams and visualizations using plain text.  
It is a JavaScript‑based renderer that turns Markdown‑style definitions into SVG charts.  
The following documentation covers the essentials: installation, usage, diagram types, and examples.

---

## Table of Contents

1. [Installation](#installation)  
2. [Basic Usage](#basic-usage)  
3. [Diagram Types & Examples](#diagram-types)  
4. [Configuration & API](#configuration)  
5. [Security](#security)  
6. [Contributing](#contributing)  

---

## 1. Installation

### CDN

```html
<script type="module">
  import mermaid from 'https://cdn.jsdelivr.net/npm/mermaid@11/dist/mermaid.esm.min.mjs';
  mermaid.initialize({ startOnLoad: true });
</script>
```

### npm / Yarn / pnpm

```bash
# npm
npm i mermaid

# yarn
yarn add mermaid

# pnpm
pnpm add mermaid
```

---

## 2. Basic Usage

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

## 3. Diagram Types & Examples

Below are the supported diagram types with a minimal example for each.

| Diagram | Code | Rendered |
|--------|------|---------|
| **Flowchart** | ```mermaid graph TD; A-->B; A-->C; B-->D; C-->D;``` | ![Flowchart](https://mermaid.ink/img/graph%20TD%3B%20A-->B%3B%20A-->C%3B%20B-->D%3B%20C-->D) |
| **Sequence Diagram** | ```mermaid sequenceDiagram participant Alice participant Bob Alice->>John: Hello John, how are you? loop HealthCheck John->>John: Fight against hypochondria end Note right of John: Rational thoughts <br/>prevail! John-->>Alice: Great! John->>Bob: How about you? Bob-->>John: Jolly good!``` | ![Sequence](https://mermaid.ink/img/sequenceDiagram%20participant%20Alice%20participant%20Bob%20Alice->>John:%20Hello%20John,%20how%20are%20you?%20loop%20HealthCheck%20John->>John:%20Fight%20against%20hypochondria%20end%20Note%20right%20of%20John:%20Rational%20thoughts%20%3Cbr%2F%3Eprevail!%20John-->>Alice:%20Great!%20John->>Bob:%20How%20about%20you?%20Bob-->>John:%20Jolly%20good!) |
| **Gantt** | ```mermaid gantt dateFormat  YYYY-MM-DD title Adding GANTT diagram to mermaid excludes weekdays 2014-01-10 section A section Completed task :done, des1, 2014-01-06,2014-01-08 Active task :active, des2, 2014-01-09, 3d Future task : des3, after des2, 5d Future task2 : des4, after des3, 5d``` | ![Gantt](https://mermaid.ink/img/gantt%20dateFormat%20%20YYYY-MM-DD%20title%20Adding%20GANTT%20diagram%20to%20mermaid%20excludes%20weekdays%202014-01-10%20section%20A%20section%20Completed%20task%20:done,%20des1,%202014-01-06,%201014-01-08%20Active%20task%20:active,%20des2,%202014-01-09,%203d%20Future%20task%20:%20des3,%20after%20des2,%205d%20Future%20task2%20:%20des4,%20after%20des3,%205d) |
| **Class Diagram** | ```mermaid classDiagram Class01 <|-- AveryLongClass : Cool Class03 *-- Class04 Class05 o-- Class06 Class07 .. Class08 Class09 --> C2 : Where am i? Class09 --* C3 Class09 --|> Class07 Class07 : equals() Class07 : Object[] elementData Class01 : size() Class01 : int chimp Class01 : int gorilla Class08 <--> C2: Cool label``` | ![Class](https://mermaid.ink/img/classDiagram%20Class01%20%3C|--%20AveryLongClass%20%3ACool%20Class03%20*--%20Class04%20Class05%20o--%20Class06%20Class07%20..%20Class08%20Class09%20--%3E%20C2%20%3A%20Where%20am%20i%3F%20Class09%20--*%20C3%20Class09%20--|>%20Class07%20Class07%20%3A%20equals()%20Class07%20%3A%20Object%5B%5D%20elementData%20Class01%20%3A%20size()%20Class01%20%3A%20int%20chimp%20Class01%20%3A%20int%20gorilla%20Class08%20<-->%20C2%3ACool%20label) |
| **Git Graph** | ```mermaid gitGraph commit commit branch develop commit commit commit checkout main commit commit``` | ![Git Graph](https://mermaid.ink/img/gitGraph%20commit%20commit%20branch%20develop%20commit%20commit%20commit%20checkout%20main%20commit%20commit) |
| **Entity Relationship Diagram** | ```mermaid erDiagram CUSTOMER ||--o{ ORDER : places ORDER ||--|{ LINE-ITEM : contains CUSTOMER }|..|{ DELIVERY-ADDRESS : uses``` | ![ER](https://mermaid.ink/img/erDiagram%20CUSTOMER%20||--o%7B%20ORDER%20%3A%20places%20ORDER%20||--|%7B%20LINE-ITEM%20%3A%20contains%20CUSTOMER%20}%7B%20DELIVERY-ADDRESS%20%3A%20uses) |
| **User Journey** | ```mermaid journey title My working day section Go to work Make tea: 5: Me Go upstairs: 3: Me Do work: 1: Me, Cat section Go home Go downstairs: 5: Me Sit down: 5: Me``` | ![Journey](https://mermaid.ink/img/journey%20title%20My%20working%20day%20section%20Go%20to%20work%20Make%20tea:%205:%20Me%20Go%20upstairs:%203:%20Me%20Do%20work:%201:%20Me,%20Cat%20section%20Go%20home%20Go%20downstairs:%205:%20Me%20Sit%20down:%205:%20Me) |
| **Quadrant Chart** | ```mermaid quadrantChart title Reach and engagement of campaigns x-axis Low Reach --> High Reach y-axis Low Engagement --> High Engagement quadrant-1 We should expand quadrant-2 Need to promote quadrant-3 Re-evaluate quadrant-4 May be improved Campaign A: [0.3, 0.6] Campaign B: [0.45, 0.23] Campaign C: [0.57, 0.69] Campaign D: [0.78, 0.34] Campaign E: [0.40, 0.34] Campaign F: [0.35, 0.78]``` | ![Quadrant](https://mermaid.ink/img/quadrantChart%20title%20Reach%20and%20engagement%20of%20campaigns%20x-axis%20Low%20Reach%20-->%20High%20Reach%20y-axis%20Low%20Engagement%20-->%20High%20Engagement%20quadrant-1%20We%20should%20expand%20quadrant-2%20Need%20to%20promote%20quadrant-3%20Re-evaluate%20quadrant-4%20May%20be%20improved%20Campaign%20A:%20[0.3,%200.6]%20Campaign%20B:%20[0.45,%200.23]%20Campaign%20C:%20[0.57,%200.69]%20Campaign%20D:%20[0.78,%200.34]%20Campaign%20E:%20[0.40,%200.34]%20Campaign%20F:%20[0.35,%200.78]) |
| **XY Chart** | ```mermaid xychart-beta title "Sales Revenue" x-axis [jan, feb, mar, apr, may, jun, jul, aug, sep, oct, nov, dec] y-axis "Revenue (in $)" 4000 --> 11000 bar [5000, 6000, 7500, 8200, 9500, 10500, 11000, 10200, 9200, 8500, 7000, 6000] line [5000, 6000, 7500, 8200, 9500, 10500, 11000, 10200, 9200, 8500, 7000, 6000]``` | ![XY](https://mermaid.ink/img/xychart-beta%20title%20%22Sales%20Revenue%22%20x-axis%20[jan,%20feb,%20mar,%20apr,%20may,%20jun,%20jul,%20aug,%20sep,%20oct,%20nov,%20dec]%20y-axis%20%22Revenue%20(in%20$)%22%204000%20-->%2011000%20bar%20[5000,%206000,%207500,%208200,%209500,%2010500,%2011000,%2010200,%209200,%208500,%207000,%206000]%20line%20[5000,%206000,%207500,%208200,%209500,%2010500,%2011000,%2010200,%209200,%208500,%207000,%206000]) |

> **Tip** – Use the Mermaid Live Editor (https://mermaid.live) to experiment with syntax in real time.

---

## 4. Configuration & API

```js
mermaid.initialize({
  startOnLoad: true,          // Render diagrams on page load
  theme: 'default',         // 'default', 'forest', 'dark', 'neutral'
  securityLevel: 'strict',  // 'strict', 'loose', 'sandbox'
  // ...other options
});
```

### Security Levels

| Level | Description |
|------|-------------|
| **strict** | Sanitizes input aggressively. |
| **loose** | Default; allows more characters. |
| **sandbox** | Renders diagrams inside a sandboxed `<iframe>` to block JS execution. |

---

## 5. Security

Mermaid sanitizes diagram code to prevent XSS. For public sites, consider using the `sandbox` security level to render diagrams in an isolated iframe. This blocks JavaScript execution while still allowing interactive features.

---

## 6. Contributing

- Fork the repo: https://github.com/mermaid-js/mermaid
- Install dependencies:

```bash
git clone https://github.com/mermaid-js/mermaid.git
cd mermaid
pnpm install
```

- Run tests:

```bash
pnpm test
```

- Submit PRs with tests and linting (`pnpm lint`).

For security issues, email `security@mermaid.live`.

---

**Enjoy creating diagrams with Mermaid!**