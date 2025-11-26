# Mermaid Security Documentation

This document summarizes the security‑related guidance for Mermaid users and developers.  
It covers how to report vulnerabilities, best practices for keeping your
environment safe, and how to configure the built‑in DOMPurify sanitizer.

---

## 1. Reporting Vulnerabilities

If you discover a security issue in Mermaid, please follow the steps below:

| Step | Action |
|------|--------|
| **1. Prepare a detailed report** | Include: <br>• A clear description of the issue <br>• Steps to reproduce <br>• Affected Mermaid versions <br>• Any known mitigations |
| **2. Send an email** | `security@mermaid.live` |
| **3. Await response** | We aim to reply within **three working days** (often sooner). |
| **4. Follow up** | If you do not receive a timely reply, contact us again or use the public Discord channels (but keep the vulnerability details private). |

> **Tip:** Do **not** disclose vulnerability details publicly before a fix is released.

---

## 2. Best Practices

| Recommendation | Why it matters |
|---------------|---------------|
| **Stay current** | Mermaid releases frequent security patches. |
| **Keep dependencies up to date** | Avoid pinning to specific versions; regularly check for updates. |
| **Audit your dependencies** | Ensure that any third‑party libraries are also current. |

---

## 3. Configuring DOMPurify

Mermaid uses a **baseline DOMPurify** configuration by default.  
You can override this configuration by adding a `dompurifyConfig` key to the Mermaid options.

```js
// Example: Override DOMPurify options
mermaid.initialize({
  dompurifyConfig: {
    ALLOWED_TAGS: ['div', 'span', 'svg', 'path'],
    ALLOWED_ATTR: ['class', 'style', 'stroke', 'fill']
  }
});
```

> **Warning:**  
> Overriding DOMPurify may break Mermaid output. Use this feature with caution.

---

### Quick Reference

| Feature | Default | Override Example |
|--------|--------|-----------------|
| `dompurifyConfig` | Baseline config | See code block above |

---

### Contact & Support

- **Email:** `security@mermaid.live`  
- **Discord:** Public channels (use email for vulnerability reports)

---

**End of Security Documentation**