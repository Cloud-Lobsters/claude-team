# Mermaid Live Editor

> Edit, preview and share Mermaid charts/diagrams in real‑time.

The Mermaid Live Editor is a web application that lets you create, edit, and preview Mermaid diagrams (flowcharts, sequence diagrams, Gantt charts, etc.) instantly.  
It can be run locally, deployed as a Docker container, or used via the public web‑app at <https://mermaid.live>.

---

## Table of Contents

- [Features](#features)
- [Getting Started](#getting-started)
  - [Docker](#docker)
  - [Local Development](#local-development)
- [Configuration](#configuration)
  - [Renderer URL](#renderer-url)
  - [Kroki Instance URL](#kroki-instance-url)
  - [Analytics](#analytics)
  - [Mermaid Chart Links](#mermaid-chart-links)
- [Examples](#examples)
- [Development Workflow](#development-workflow)
- [License](#license)

---

## Features

| Feature | Description |
|--------|------------|
| **Live preview** | Edit Mermaid syntax and see the diagram update instantly. |
| **Export** | Save the diagram as an SVG file. |
| **Share** | Get a link to view or edit the diagram. |
| **Docker** | Run the editor in a container. |
| **Customizable** | Configure renderer, Kroki, analytics, and promotional banners. |

---

## Getting Started

### Docker

```bash
# Pull the latest image
docker pull ghcr.io/mermaid-js/mermaid-live-editor

# Run the container
docker run --platform linux/amd64 \
  --publish 8000:8080 \
  ghcr.io/mermaid-js/mermaid-live-editor
```

The editor will be available at `http://localhost:8000`.

> **Tip**: If you want to expose the editor on a different port, change the `--publish` flag accordingly.

### Local Development

> **Prerequisites**  
> - Node.js (current LTS)  
> - pnpm (install via `corepack enable pnpm`)

```bash
# Clone the repo
git clone https://github.com/mermaid-js/mermaid-live-editor.git
cd mermaid-live-editor

# Install dependencies
pnpm install

# Start the dev server
pnpm dev -- --open
```

The editor will open automatically in your default browser.

---

## Configuration

When building the Docker image you can override several build arguments to customize the editor.

| Build Argument | Default | Description |
|---------------|--------|------------|
| `MERMAID_RENDERER_URL` | `https://mermaid.ink` | URL of the Mermaid renderer service. Set to an empty string to disable PNG/SVG links. |
| `MERMAID_KROKI_RENDERER_URL` | `https://kroki.io` | URL of a Kroki instance. Set to an empty string to disable Kroki links. |
| `MERMAID_ANALYTICS_URL` | `""` | Plausible analytics endpoint. |
| `MERMAID_DOMAIN` | `""` | Domain for analytics. |
| `MERMAID_IS_ENABLED_MERMAID_CHART_LINKS` | `""` | Set to `true` to enable the “Save to Mermaid Chart” button and promotional banner. |

**Example Docker build with custom renderer:**

```bash
docker build \
  --build-arg MERMAID_RENDERER_URL=https://custom-renderer.com \
  -t mermaid-js/mermaid-live-editor .
```

---

## Examples

### Docker Run

```bash
docker run --platform linux/amd64 \
  --publish 8000:8080 \
  ghcr.io/mermaid-js/mermaid-live-editor
```

### Docker Compose

```yaml
# docker-compose.yml
services:
  mermaid-editor:
    image: ghcr.io/mermaid-js/mermaid-live-editor
    ports:
      - "8000:8080"
```

### Local Development

```bash
pnpm dev -- --open
```

---

## Development Workflow

1. **Fork** the repository: <https://github.com/mermaid-js/mermaid-live-editor/fork>
2. **Create a branch** for your feature or bug fix.
3. **Commit** changes with clear messages.
4. **Open a Pull Request** targeting `develop`.
5. The CI pipeline will build, test, and deploy the PR to Netlify.
6. Once merged into `master`, the release is automatically published.

---

## License

MIT © Mermaid Live Editor contributors

---