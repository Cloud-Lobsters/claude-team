# mermaid-webpack-demo – Documentation

This repository contains a minimal demo that shows how to use **Mermaid** diagrams in a Webpack‑based project.  
The demo is intentionally lightweight so you can copy the structure into your own projects.

---

## Table of Contents

- [Overview](#overview)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Build & Watch](#build--watch)
- [Running the Demo](#running-the-demo)
- [Project Structure](#project-structure)
- [Configuration Files](#configuration-files)
  - [`package.json`](#packagejson)
  - [`webpack.config.babel.js`](#webpackconfigbabeljs)
  - [`.babelrc`](#babelrc)
- [Source Files](#source-files)
  - [`index.html`](#indexhtml)
  - [`index.js`](#indexjs)
- [Extending the Demo](#extending-the-demo)
- [License](#license)

---

## Overview

Mermaid is a JavaScript library that generates diagrams and flowcharts from text in a Markdown‑like syntax.  
This demo shows how to:

1. Install Mermaid via npm.
2. Bundle it with Webpack.
3. Render a diagram in the browser.

---

## Prerequisites

- Node.js (≥ 12.x recommended)
- npm or Yarn

---

## Installation

```bash
# Clone the repo
git clone https://github.com/mermaidjs/mermaid-webpack-demo.git
cd mermaid-webpack-demo

# Install dependencies
yarn install   # or npm install
```

---

## Build & Watch

```bash
# Build once
yarn build

# Watch for changes
yarn build:watch
```

Webpack will output the bundled assets to `dist/`.

---

## Running the Demo

After building, open `index.html` in a browser:

```bash
open index.html   # macOS
xdg-open index.html   # Linux
start index.html   # Windows
```

You should see a Mermaid diagram rendered automatically.

---

## Project Structure

```
mermaid-webpack-demo/
├─ index.html
├─ index.js
├─ webpack.config.babel.js
├─ .babelrc
├─ package.json
├─ yarn.lock
└─ README.md
```

---

## Configuration Files

### `package.json`

```json
{
  "name": "mermaid-webpack-demo",
  "version": "1.0.0",
  "description": "A simple demo for using mermaid with webpack.",
  "scripts": {
    "build": "webpack --mode production",
    "build:watch": "webpack --watch"
  },
  "dependencies": {
    "mermaid": "^8.13.5"
  },
  "devDependencies": {
    "@babel/core": "^7.12.3",
    "@babel/preset-env": "^7.12.1",
    "babel-loader": "^8.1.0",
    "webpack": "^5.0.0",
    "webpack-cli": "^4.0.0"
  }
}
```

> **Note**: The exact Mermaid version may differ; adjust as needed.

### `webpack.config.babel.js`

```js
const path = require('path');

module.exports = {
  entry: './index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      }
    ]
  },
  mode: 'development'
};
```

### `.babelrc`

```json
{
  "presets": ["@babel/preset-env"]
}
```

---

## Source Files

### `index.html`

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Mermaid Demo</title>
</head>
<body>
  <h1>Mermaid Demo</h1>
  <div class="mermaid">
    graph TD;
      A-->B;
      A-->C;
      B-->D;
      C-->D;
  </div>

  <!-- Bundle -->
  <script src="dist/bundle.js"></script>
</body>
</html>
```

> The `<div class="mermaid">` block contains Mermaid syntax.  
> When the page loads, Mermaid will parse this block and render the diagram.

### `index.js`

```js
import mermaid from 'mermaid';

mermaid.initialize({
  startOnLoad: true
});
```

> This script imports Mermaid and tells it to render diagrams on page load.

---

## Extending the Demo

1. **Add More Diagrams**  
   Add more `<div class="mermaid">` blocks anywhere in `index.html`.

2. **Custom Configuration**  
   Pass options to `mermaid.initialize()`:

   ```js
   mermaid.initialize({
     startOnLoad: true,
     theme: 'forest',
     flowchart: { curve: 'basis' }
   });
   ```

3. **Use Other Mermaid Types**  
   Replace the graph syntax with flowcharts, sequence diagrams, etc.

---

## License

This demo is released under the MIT License. See the repository’s `LICENSE` file for details.

---