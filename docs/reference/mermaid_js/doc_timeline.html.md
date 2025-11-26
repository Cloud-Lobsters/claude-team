# Mermaid Timeline Diagram – Code Documentation

---

## 1. Overview

A **Timeline** diagram is an experimental Mermaid diagram type that visualises a chronology of events, dates, or periods of time.  
It is rendered as a horizontal line with labelled time‑periods and events.  
The syntax is stable; only the icon integration is experimental.

---

## 2. Syntax

```mermaid
timeline
    title <Title Text>
    <time period> : <event>
    <time period> : <event> : <event>
    <time period> : <event>
              : <event>
              : <event>
```

* `timeline` – keyword that starts the diagram.  
* `title` – optional keyword to set the diagram title.  
* `<time period>` – any text (not limited to numbers).  
* `<event>` – any text.  
* Multiple events per time‑period are separated by `:`.  
* Events can be continued on the next line by starting the line with `:`.

---

## 3. Grouping (Sections / Ages)

Sections group time‑periods.  
All following time‑periods belong to the current section until a new section is declared.

```mermaid
timeline
    title <Title>
    section <Section Name>
        <time period> : <event>
    section <Another Section>
        <time period> : <event>
```

If no section is defined, all time‑periods belong to a default section.

---

## 4. Text Wrapping

* Long text is automatically wrapped.  
* `<br>` forces a line break.

```mermaid
timeline
    title Long Text Example
    section Some Section
        2000 : This is a very long event description that will wrap automatically.
        2001 : Another event with a forced line break<br>Here it is.
```

---

## 5. Styling

### 5.1 Default Colour Scheme

Each time‑period (and its events) gets its own colour scheme when no section is defined.

```mermaid
timeline
    title Default Colour
    2002 : LinkedIn
    2004 : Facebook : Google
    2005 : YouTube
    2006 : Twitter
```

### 5.2 Disable Multi‑Colour

All time‑periods share the same colour scheme.

```mermaid
---
config:
  logLevel: 'debug'
  theme: 'base'
  timeline:
    disableMulticolor: true
---
timeline
    title Same Colour
    2002 : LinkedIn
    2004 : Facebook : Google
    2005 : YouTube
    2006 : Twitter
```

### 5.3 Custom Colour Scheme

Use `cScale0 … cScale11` (background) and `cScaleLabel0 … cScaleLabel11` (foreground) theme variables.

```mermaid
---
config:
  logLevel: 'debug'
  theme: 'default'
  themeVariables:
    cScale0: '#ff0000'
    cScaleLabel0: '#ffffff'
    cScale1: '#00ff00'
    cScaleLabel1: '#000000'
    cScale2: '#0000ff'
    cScaleLabel2: '#ffffff'
---
timeline
    title Custom Colours
    2002 : LinkedIn
    2004 : Facebook : Google
    2005 : YouTube
    2006 : Twitter
    2007 : Tumblr
    2008 : Instagram
    2010 : Pinterest
```

---

## 6. Themes

Mermaid supports several pre‑defined themes.  
Set the theme via the `theme` option in the configuration.

| Theme | Example |
|-------|--------|
| `base` | ![Base Theme](#) |
| `forest` | ![Forest Theme](#) |
| `dark` | ![Dark Theme](#) |
| `default` | ![Default Theme](#) |
| `neutral` | ![Neutral Theme](#) |

### 6.1 Base Theme Example

```mermaid
---
config:
  logLevel: 'debug'
  theme: 'base'
---
timeline
    title History of Social Media Platform
    2002 : LinkedIn
    2004 : Facebook : Google
    2005 : YouTube
    2006 : Twitter
    2007 : Tumblr
    2008 : Instagram
    2010 : Pinterest
```

### 6.2 Forest Theme Example

```mermaid
---
config:
  logLevel: 'debug'
  theme: 'forest'
---
timeline
    title History of Social Media Platform
    2002 : LinkedIn
    2004 : Facebook : Google
    2005 : YouTube
    2006 : Twitter
    2007 : Tumblr
    2008 : Instagram
    2010 : Pinterest
```

*(Repeat for `dark`, `default`, `neutral` – same diagram, different theme.)*

---

## 7. Integration with a Web Page

```html
<script type="module">
  import mermaid from 'https://cdn.jsdelivr.net/npm/mermaid@11/dist/mermaid.esm.min.mjs';
</script>
```

Mermaid’s Timeline uses experimental lazy loading & async rendering.  
Refer to the live editor for the full implementation.

---

## 8. Full Example – Industrial Revolution Timeline

```mermaid
timeline
    title Timeline of Industrial Revolution
    section 17th-20th century
        Industry 1.0 : Machinery, Water power, Steam <br>power
        Industry 2.0 : Electricity, Internal combustion engine, Mass production
        Industry 3.0 : Electronics, Computers, Automation
    section 21st century
        Industry 4.0 : Internet, Robotics, Internet of Things
        Industry 5.0 : Artificial intelligence, Big data, 3D printing
```

---

### End of Documentation