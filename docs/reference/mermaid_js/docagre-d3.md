# dagre-d3 – A D3‑based Renderer for Dagre

`dagre-d3` is a lightweight front‑end that renders directed graphs laid out by the
[Dagre](https://github.com/dagrejs/dagre) layout engine using
[D3](https://d3js.org/).  It exposes a small API that lets you build a
`dagre.graphlib.Graph`, feed it to Dagre for layout, and then render the
resulting graph with D3.

> **NOTE** – The repository contains the source code, tests, and CI
> configuration.  The documentation below focuses on the public API
> and how to use the library in a browser or Node environment.

---

## Table of Contents

1. [Installation](#installation)
2. [Basic Usage](#basic-usage)
3. [API Reference](#api-reference)
   - [Graph Construction](#graph-construction)
   - [Layout](#layout)
   - [Rendering](#rendering)
4. [Configuration Options](#configuration-options)
5. [License](#license)

---

## 1. Installation

```bash
# npm
npm install dagre-d3

# yarn
yarn add dagre-d3
```

The library is available as an ES module and as a UMD build that can be
included directly in a browser via a `<script>` tag.

```html
<script src="https://unpkg.com/dagre-d3@latest/dist/dagre-d3.min.js"></script>
```

---

## 2. Basic Usage

Below is a minimal example that demonstrates the typical workflow:

1. **Create a graph** – add nodes and edges.
2. **Run layout** – let Dagre compute positions.
3. **Render** – use D3 to draw the graph.

```js
// Import the library (ES module)
import dagreD3 from 'dagre-d3';
import * as d3 from 'd3';

// 1. Create a graph
const g = new dagreD3.graphlib.Graph()
  .setGraph({})
  .setDefaultEdgeLabel(() => ({}));

// Add nodes
g.setNode('a', { label: 'Node A' });
g.setNode('b', { label: 'Node B' });
g.setNode('c', { label: 'Node C' });

// Add edges
g.setEdge('a', 'b');
g.setEdge('b', 'c');

// 2. Layout
dagreD3.layout(g);

// 3. Render
const svg = d3.select('svg');
const inner = svg.append('g');

inner.call(dagreD3.render(), g);
```

> **Tip** – The `setGraph({})` call initializes the graph’s
> configuration.  You can pass layout options here (see
> [Configuration Options](#configuration-options)).

---

## 3. API Reference

### Graph Construction

| Method | Description | Example |
|-------|------------|--------|
| `new dagreD3.graphlib.Graph()` | Creates a new graph instance. | `const g = new dagreD3.graphlib.Graph();` |
| `g.setGraph(opts)` | Sets graph options. | `g.setGraph({ rankdir: 'LR' });` |
| `g.setDefaultEdgeLabel(fn)` | Sets a default edge label factory. | `g.setDefaultEdgeLabel(() => ({}));` |
| `g.setNode(id, label)` | Adds a node. | `g.setNode('a', { label: 'A' });` |
| `g.setEdge(v, w, label)` | Adds an edge. | `g.setEdge('a', 'b');` |

### Layout

| Function | Description |
|---------|------------|
| `dagreD3.layout(graph)` | Runs Dagre’s layout algorithm on the supplied graph. |
| `graph.graph()` | Returns the graph’s configuration object. |
| `graph.node(id)` | Returns the node data for `id`. |
| `graph.edge(v, w)` | Returns the edge data for the edge from `v` to `w`. |

### Rendering

| Function | Description |
|---------|------------|
| `dagreD3.render()` | Returns a D3 function that renders the graph. |
| `render.call(selection, graph)` | Renders the graph into the supplied D3 selection. |

---

## 4. Configuration Options

The graph configuration (`graph.setGraph(opts)`) accepts the following
options (defaults shown):

| Option | Type | Default | Description |
|-------|------|--------|------------|
| `rankdir` | `string` | `'TB'` | Direction of the layout (`'TB'`, `'BT'`, `'LR'`, `'RL'`). |
| `ranksep` | `number` | `50` | Vertical separation between ranks. |
| `nodesep` | `number` | `50` | Horizontal separation between nodes. |
| `ranker` | `string` | `'network-simplex'` | Ranking algorithm. |
| `nodesep` | `number` | `50` | Horizontal separation between nodes. |
| `ranksep` | `number` | `50` | Vertical separation between ranks. |
| `align` | `string` | `'UL'` | Alignment of nodes. |

> **Note** – These options are passed directly to Dagre’s layout
> engine and influence the final positions of nodes and edges.

---

## 5. License

`dagre-d3` is released under the MIT License.  See the
[LICENSE](LICENSE) file for full details.

---

### Further Reading

* [Dagre Documentation](https://github.com/dagrejs/dagre)
* [D3 Documentation](https://github.com/d3/d3)
* [Wiki – Examples & Configuration](https://github.com/dagrejs/dagre-d3/wiki)

---