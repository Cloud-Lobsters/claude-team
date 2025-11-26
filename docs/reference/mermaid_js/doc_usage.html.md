# Mermaid – JavaScript Diagram Library

Mermaid is a JavaScript tool that renders diagrams and charts from a Markdown‑based syntax.  
The library can be used in a browser, via npm, or through the Mermaid API.

---

## 1.  Getting Started

### 1.1  CDN

```html
<script type="module">
  import mermaid from 'https://cdn.jsdelivr.net/npm/mermaid@11/dist/mermaid.esm.min.mjs';
</script>
```

### 1.2  npm / Yarn / PNPM

```bash
# npm
npm install mermaid

# yarn
yarn add mermaid

# pnpm
pnpm add mermaid
```

---

## 2.  Hosting Mermaid on a Web Page

Mermaid looks for `<pre>` elements with the class `mermaid` and renders them as SVG.

```html
<!doctype html>
<html lang="en">
  <body>
    <pre class="mermaid">
      graph LR
        A --- B
        B --> C[fa:fa-ban forbidden]
        B --> D(fa:fa-spinner);
    </pre>

    <script type="module">
      import mermaid from 'https://cdn.jsdelivr.net/npm/mermaid@11/dist/mermaid.esm.min.mjs';
    </script>
  </body>
</html>
```

*Mermaid automatically starts rendering on page load.*

---

## 3.  Tiny Mermaid

A lightweight build (~½ size) that omits:

* Mindmap Diagrams
* Architecture Diagrams
* KaTeX rendering
* Lazy loading

Use it when you don’t need those features.

---

## 4.  Security – `securityLevel`

Mermaid protects against malicious diagrams.  
Set the level before rendering:

```js
mermaid.initialize({
  securityLevel: 'loose',   // options: 'sandbox', 'strict', 'loose', 'antiscript'
});
```

| Level      | Description |
|------------|------------|
| `strict` | Default. HTML tags are encoded, click disabled. |
| `antiscript` | HTML tags allowed (scripts removed), click enabled. |
| `loose` | HTML tags allowed, click enabled. |
| `sandbox` | Rendering occurs in a sandboxed iframe. |

---

## 5.  Rendering with the API

### 5.1  Basic Render

```js
import mermaid from './mermaid.esm.mjs';

mermaid.initialize({ startOnLoad: false });

async function drawDiagram() {
  const element = document.querySelector('#graphDiv');
  const graphDefinition = 'graph TB\na-->b';
  const { svg } = await mermaid.render('graphDiv', graphDefinition);
  element.innerHTML = svg;
}

await drawDiagram();
```

### 5.2  Detect Diagram Type

```js
import mermaid from './mermaid.esm.mjs';

const graphDefinition = `
sequenceDiagram
  Pumbaa->>Timon:I ate like a pig.
  Timon->>Pumbaa:Pumbaa, you ARE a pig.
`;

try {
  const type = mermaid.detectType(graphDefinition);
  console.log(type); // 'sequence'
} catch (error) {
  // UnknownDiagramError
}
```

### 5.3  Binding Events

```js
async function drawDiagram() {
  const element = document.querySelector('#graphDiv');
  const graphDefinition = 'graph TB\na-->b';
  const { svg, bindFunctions } = await mermaid.render('graphDiv', graphDefinition);
  element.innerHTML = svg;
  if (bindFunctions) {
    bindFunctions(element);   // bind click/tooltip events
  }
}
```

---

## 6.  Advanced Rendering

### 6.1  `mermaid.run`

Preferred over the deprecated `mermaid.init`.

```js
mermaid.initialize({ startOnLoad: false });

await mermaid.run({
  querySelector: '.someOtherClass',
});

await mermaid.run({
  nodes: [
    document.getElementById('someId'),
    document.getElementById('anotherId')
  ],
});

await mermaid.run({
  suppressErrors: true,
});
```

### 6.2  Syntax Validation

```js
mermaid.parseError = function (err, hash) {
  displayErrorInGui(err);
};

async function textFieldUpdated() {
  const textStr = getTextFromFormField('code');
  if (await mermaid.parse(textStr)) {
    reRender(textStr);
  }
}
```

---

## 7.  Configuration

Preferred method:

```js
import mermaid from './mermaid.esm.mjs';

const config = {
  startOnLoad: true,
  flowchart: { useMaxWidth: false, htmlLabels: true }
};

mermaid.initialize(config);
```

Deprecated (kept for backward compatibility):

```js
mermaid.startOnLoad = true;
mermaid.htmlLabels = true;
```

---

## 8.  Marked Renderer Example

```js
const renderer = new marked.Renderer();

renderer.code = function (code, language) {
  if (code.match(/^sequenceDiagram/) || code.match(/^graph/)) {
    return '<pre class="mermaid">' + code + '</pre>';
  } else {
    return '<pre><code>' + code + '</code></pre>';
  }
};
```

CoffeeScript variant:

```coffee
marked = require 'marked'

module.exports = (options) ->
  hasMermaid = false
  renderer = new marked.Renderer()
  renderer.defaultCode = renderer.code
  renderer.code = (code, language) ->
    if language is 'mermaid'
      html = ''
      if not hasMermaid
        hasMermaid = true
        html += '<script src="'+options.mermaidPath+'"></script>'
      html + '<pre class="mermaid">'+code+'</pre>'
    else
      @defaultCode(code, language)
```

---

## 9.  Summary

* **Installation** – CDN or npm.
* **Rendering** – `<pre class="mermaid">` or API `render`.
* **Security** – `securityLevel`.
* **Advanced** – `mermaid.run`, `parse`, `detectType`.
* **Configuration** – `initialize` (preferred) or deprecated `mermaid` object.

All examples above are ready to copy‑paste into your project.