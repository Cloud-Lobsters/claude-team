# Mermaid – Text‑Based Diagramming Library

Mermaid lets you create diagrams and visualizations using plain text.  
It is a JavaScript‑based renderer that turns Markdown‑style definitions into SVG charts.

> **Why Mermaid?**  
> * Keeps documentation up‑to‑date.  
> * Works in Markdown, HTML, VS Code, GitHub, GitLab, etc.  
> * Extensible – add new diagram types or plug‑ins.

---

## 1. Installation

| Method | Command |
|-------|--------|
| **CDN** | `https://cdn.jsdelivr.net/npm/mermaid@<version>/dist/` |
| **npm** | `npm i mermaid` |
| **yarn** | `yarn add mermaid` |
| **pnpm** | `pnpm add mermaid` |

> Replace `<version>` with the desired release (e.g. `11`).

### Quick CDN Example

```html
<script type="module">
  import mermaid from 'https://cdn.jsdelivr.net/npm/mermaid@11/dist/mermaid.esm.min.mjs';
  mermaid.initialize({ startOnLoad: true });
</script>
```

Mermaid will automatically render any `<div>` or `<pre>` with `class="mermaid"`.

---

## 2. Basic Usage

Add a diagram definition inside a `<pre class="mermaid">` block:

```html
<pre class="mermaid">
graph TD;
    A-->B;
    A-->C;
    B-->D;
    C-->D;
</pre>
```

Mermaid will parse the text and replace the block with an SVG diagram.

---

## 3. Diagram Types & Examples

Below are the supported diagram types.  
Each example is wrapped in a fenced code block (`mermaid`) so it can be copied directly.

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

### 3.6 Entity‑Relationship Diagram (experimental)

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

### 3.9 XY Chart (beta)

```mermaid
xychart-beta
    title "Sales Revenue"
    x-axis [jan, feb, mar, apr, may, jun, jul, aug, sep, oct, nov, dec]
    y-axis "Revenue (in $)" 4000 --> 11000
    bar [5000, 6000, 7500, 8200, 9500, 10500, 11000, 10200, 9200, 8500, 7000, 6000]
    line [5000, 6000, 7500, 8200, 9500, 10500, 11000, 10200, 9200, 8500, 7000, 6000]
```

---

## 4. Security

Mermaid sanitizes diagram code, but for public sites you can enable sandboxed rendering:

```js
mermaid.initialize({
  startOnLoad: true,
  securityLevel: 'sandboxed'
});
```

> **Note:** Interactive features may be limited in sandboxed mode.

---

## 5. Development & Contribution

* **Repo:** https://github.com/mermaid-js/mermaid  
* **Tests:** `pnpm test`  
* **Lint:** `pnpm lint`  
* **Release:** bump `package.json`, `npm publish`

Feel free to open issues, submit PRs, or join the community.

---

## 6. Resources

| Resource | Link |
|---------|------|
| Live Editor | https://mermaid.live |
| CLI | https://github.com/mermaid-js/mermaid-cli |
| Documentation | https://mermaid-js.github.io/mermaid/ |
| Community Integrations | https://github.com/mermaid-js/mermaid/tree/main/packages |

---