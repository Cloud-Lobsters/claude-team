# Mermaid Sankey Diagram Documentation

> **Note** – The Sankey diagram is an experimental feature in Mermaid (v10.3.0+).  
> Its syntax is close to plain CSV and will be extended in the future.

---

## 1. Overview

A Sankey diagram visualises flows from one set of values to another.  
In Mermaid the diagram is created with the `sankey-beta` keyword followed by CSV‑style data.

---

## 2. Syntax

```mermaid
sankey-beta

%% source,target,value
Electricity grid,Over generation / exports,104.453
Electricity grid,Heating and cooling - homes,113.726
Electricity grid,H2 conversion,27.14
```

* **Three columns only** – `source`, `target`, `value`.  
* Empty lines are allowed for readability.  
* Commas inside a node name must be wrapped in double quotes.  
* Double quotes inside a quoted string are escaped by doubling them.

---

## 3. Examples

### 3.1 Basic Example

```mermaid
sankey-beta

%% source,target,value
Electricity grid,Over generation / exports,104.453
Electricity grid,Heating and cooling - homes,113.726
Electricity grid,H2 conversion,27.14
```

### 3.2 Empty Lines

```mermaid
sankey-beta

Bio-conversion,Losses,26.862

Bio-conversion,Solid,280.322

Bio-conversion,Gas,81.144
```

### 3.3 Commas in Node Names

```mermaid
sankey-beta

Pumped heat,"Heating and cooling, homes",193.026
Pumped heat,"Heating and cooling, commercial",70.672
```

### 3.4 Double Quotes in Node Names

```mermaid
sankey-beta

Pumped heat,"Heating and cooling, ""homes""",193.026
Pumped heat,"Heating and cooling, ""commercial""",70.672
```

### 3.5 Full Example (from Observable)

```mermaid
---
config:
  sankey:
    showValues: false
---
sankey-beta

Agricultural 'waste',Bio-conversion,124.729
Bio-conversion,Liquid,0.597
Bio-conversion,Losses,26.862
Bio-conversion,Solid,280.322
Bio-conversion,Gas,81.144
Biofuel imports,Liquid,35
Biomass imports,Solid,35
Coal imports,Coal,11.606
Coal reserves,Coal,63.965
Coal,Solid,75.571
District heating,Industry,10.639
District heating,Heating and cooling - commercial,22.505
District heating,Heating and cooling - homes,46.184
Electricity grid,Over generation / exports,104.453
Electricity grid,Heating and cooling - homes,113.726
Electricity grid,H2 conversion,27.14
Electricity grid,Industry,342.165
Electricity grid,Road transport,37.797
Electricity grid,Agriculture,4.412
Electricity grid,Heating and cooling - commercial,40.858
Electricity grid,Losses,56.691
Electricity grid,Rail transport,7.863
Electricity grid,Lighting & appliances - commercial,90.008
Electricity grid,Lighting & appliances - homes,93.494
Gas imports,Ngas,40.719
Gas reserves,Ngas,82.233
Gas,Heating and cooling - commercial,0.129
Gas,Losses,1.401
Gas,Thermal generation,151.891
Gas,Agriculture,2.096
Gas,Industry,48.58
Geothermal,Electricity grid,7.013
H2 conversion,H2,20.897
H2 conversion,Losses,6.242
H2,Road transport,20.897
Hydro,Electricity grid,6.995
Liquid,Industry,121.066
Liquid,International shipping,128.69
Liquid,Road transport,135.835
Liquid,Domestic aviation,14.458
Liquid,International aviation,206.267
Liquid,Agriculture,3.64
Liquid,National navigation,33.218
Liquid,Rail transport,4.413
Marine algae,Bio-conversion,4.375
Ngas,Gas,122.952
Nuclear,Thermal generation,839.978
Oil imports,Oil,504.287
Oil reserves,Oil,107.703
Oil,Liquid,611.99
Other waste,Solid,56.587
Other waste,Bio-conversion,77.81
Pumped heat,Heating and cooling - homes,193.026
Pumped heat,Heating and cooling - commercial,70.672
Solar PV,Electricity grid,59.901
Solar Thermal,Heating and cooling - homes,19.263
Solar,Solar Thermal,19.263
Solar,Solar PV,59.901
Solid,Agriculture,0.882
Solid,Thermal generation,400.12
Solid,Industry,46.477
Thermal generation,Electricity grid,525.531
Thermal generation,Losses,787.129
Thermal generation,District heating,79.329
Tidal,Electricity grid,9.452
UK land based bioenergy,Bio-conversion,182.01
Wave,Electricity grid,19.013
Wind,Electricity grid,289.366
```

---

## 4. Configuration

You can customise the diagram via Mermaid’s configuration API.

```html
<script>
  const config = {
    startOnLoad: true,
    securityLevel: 'loose',
    sankey: {
      width: 800,
      height: 400,
      linkColor: 'source',   // source | target | gradient | hex
      nodeAlignment: 'left', // justify | center | left | right
    },
  };
  mermaid.initialize(config);
</script>
```

### 4.1 Link Coloring

| `linkColor` value | Effect |
|------------------|--------|
| `source` | Link adopts the source node’s color |
| `target` | Link adopts the target node’s color |
| `gradient` | Link shows a gradient between source and target colors |
| `#hexcode` | Custom hex color |

### 4.2 Node Alignment

| `nodeAlignment` | Layout |
|-----------------|-------|
| `justify` | Nodes spread evenly |
| `center` | Nodes centered |
| `left` | Nodes left‑aligned |
| `right` | Nodes right‑aligned |

---

## 5. FAQ

* **Can I use more than three columns?**  
  No – the CSV must contain exactly three columns: source, target, value.

* **Can I hide node values?**  
  Yes, set `showValues: false` in the diagram configuration.

* **Is the Sankey diagram stable?**  
  It is experimental; expect future changes.

---

**Happy diagramming!**