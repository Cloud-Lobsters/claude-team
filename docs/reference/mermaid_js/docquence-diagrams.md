# js‑sequence‑diagrams

A lightweight JavaScript library that turns plain‑text descriptions into vector UML sequence diagrams.  
Inspired by [websequencediagrams.com](https://www.websequencediagrams.com/), it uses **Jison** for parsing and **Snap.svg** for rendering.

---

## Table of Contents

1. [Overview](#overview)
2. [Installation](#installation)
3. [Usage](#usage)
   * [Manual Parsing](#manual-parsing)
   * [jQuery Integration](#jquery-integration)
4. [Syntax](#syntax)
5. [Examples](#examples)
6. [Themes](#themes)
7. [Participants & Ordering](#participants--ordering)
8. [License](#license)

---

## 1. Overview

`js-sequence-diagrams` converts a simple textual description into a scalable SVG diagram.  
It supports:

- Normal, dashed, and open arrows
- Notes (left, right, over)
- Participant ordering
- Themes (`simple`, `hand`)

---

## 2. Installation

The library depends on **Snap.svg** and **Underscore.js** (or lodash).  
You can install via Bower or download the files manually.

```bash
bower install bramp/js-sequence-diagrams
```

Include the following scripts in your HTML:

```html
<script src="webfont.js"></script>
<script src="snap.svg-min.js"></script>
<script src="underscore-min.js"></script>
<script src="sequence-diagram-min.js"></script>
```

---

## 3. Usage

### Manual Parsing

```html
<div id="diagram"></div>
<script>
  var diagram = Diagram.parse("A->B: Message");
  diagram.drawSVG("diagram", {theme: 'hand'});
</script>
```

### jQuery Integration

```html
<div class="diagram">A->B: Message</div>
<script>
  $(".diagram").sequenceDiagram({theme: 'hand'});
</script>
```

---

## 4. Syntax

The grammar is defined in Bison format (see the source).  
Below is a concise diagram of the syntax:

```
Diagram ::= Title? Participant* Note* Message*
Title    ::= "Title:" <text>
Participant ::= "participant" <name>
Message  ::= <sender> "->" <receiver> ":" <text>
Note     ::= "Note" (left|right|over) <target> ":" <text>
```

---

## 5. Examples

### Basic Diagram

```
Title: Here is a title
A->B: Normal line
B-->C: Dashed line
C->>D: Open arrow
D-->>A: Dashed open arrow
```

### Notes

```
# Example of a comment.
Note left of A: Note to the\n left of A
Note right of A: Note to the\n right of A
Note over A: Note over A
Note over A,B: Note over both A and B
```

### Participant Ordering

```
participant C
participant B
participant A
Note right of A: By listing the participants\n you can change their order
```

---

## 6. Themes

| Theme | Description |
|-------|------------|
| `simple` | Clean, flat design |
| `hand`  | Hand‑drawn style |

Use the `theme` option when drawing:

```js
diagram.drawSVG("diagram", {theme: 'hand'});
```

---

## 7. Participants & Ordering

Participants are declared with `participant <name>`.  
The order in which they appear determines the horizontal layout.

---

## 8. License

MIT © Andrew Brampton

---