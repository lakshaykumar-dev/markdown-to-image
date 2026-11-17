import type { MarkdownTemplate } from '../types';

export const MARKDOWN_TEMPLATES: MarkdownTemplate[] = [
  {
    id: 'showcase',
    name: 'Feature Showcase',
    description: 'Headings, badges, code, GitHub alerts, tables & checks',
    icon: 'Sparkles',
    markdown: `# ⚡ MarkSnap Engine v2.0
> [!NOTE]
> Transform ordinary markdown text into **stunning, publication-ready images** in seconds.

### 🚀 Key Capabilities
- **Syntax Highlighting** for 50+ languages
- **GitHub Flavored Markdown** tables & checklists
- **Mathematical Equations** via $\\LaTeX$ formulas

---

### 💻 Code Snippet
\`\`\`typescript
interface ImageOptions {
  theme: 'dark' | 'light';
  format: 'png' | 'svg' | 'webp';
  scale: 1 | 2 | 3;
}

export function generateSnapshot(md: string): Promise<Blob> {
  console.log("Generating crisp image snapshot...");
  return renderer.render(md);
}
\`\`\`

### 📊 Benchmark Comparison
| Engine | Render Speed | Retina 3x | Dark Mode |
| :--- | :---: | :---: | :---: |
| **MarkSnap** | **12ms** | ✅ Yes | ✅ Native |
| Traditional | 140ms | ⚠️ 1x Only | ❌ Poor |

- [x] High-DPI Canvas Rendering
- [x] One-Click Clipboard Copy
- [ ] Direct Social Scheduling

> [!TIP]
> Drag and drop any \`.md\` file to instantly generate your snapshot!
`,
    suggestedConfig: {
      title: 'feature-showcase.md',
      cardTheme: 'dark',
      padding: 48,
    },
  },
  {
    id: 'release-notes',
    name: 'Version Release Notes',
    description: 'Changelog, bugfixes, breaking changes, and author tags',
    icon: 'Tag',
    markdown: `# 📦 Release v3.4.0 — Turbo Speed

### ✨ Highlights & What's New
- **Faster Image Exporting:** Render times reduced by up to **65%**.
- **Vector SVG Support:** Lossless infinite scaling for banners and documentation.
- **Glassmorphism Window Style:** Modern translucent acrylic cards.

---

### ⚠️ Breaking Changes
> [!WARNING]
> The deprecated \`exportCanvasSync()\` method has been removed. Please migrate to \`exportImageAsync()\` instead.

\`\`\`diff
- const image = MarkSnap.exportSync(data);
+ const image = await MarkSnap.exportAsync(data, { scale: 2 });
\`\`\`

### 🐛 Bug Fixes
- Fixed table border alignment on Safari macOS
- Resolved KaTeX inline formula line height jumping
- Corrected custom color picker saturation bounds

**Special thanks to our contributors:** @alex, @sarah_dev, and @jordan!
`,
    suggestedConfig: {
      title: 'CHANGELOG.md',
      cardTheme: 'dark',
      padding: 48,
    },
  },
  {
    id: 'code-tutorial',
    name: 'Code Snippet & Architecture',
    description: 'In-depth code explanation with callouts and steps',
    icon: 'Code2',
    markdown: `# 🧠 Building a Custom React Hook

A clean pattern to debounce rapid input state changes with cleanup:

\`\`\`tsx
import { useState, useEffect } from 'react';

export function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => clearTimeout(handler);
  }, [value, delay]);

  return debouncedValue;
}
\`\`\`

> [!TIP]
> Use this hook for instant-search input bars to avoid spamming network requests on every keystroke!
`,
    suggestedConfig: {
      title: 'useDebounce.tsx',
      cardTheme: 'dark',
      padding: 40,
    },
  },
  {
    id: 'math-science',
    name: 'Math & Physics Theorems',
    description: 'KaTeX formulas, matrices, and scientific notation',
    icon: 'Sigma',
    markdown: `# 📐 Quantum & Relativistic Formulas

### 1. Einstein's Energy-Momentum Relation
In special relativity, the energy $E$ of a body with rest mass $m_0$ and momentum $p$ is:

$$E^2 = (pc)^2 + (m_0 c^2)^2$$

When the particle is at rest ($p = 0$), this simplifies to the famous:
$$E = m c^2$$

---

### 2. Gaussian Normal Distribution
The probability density function for normal distribution $\\mathcal{N}(\\mu, \\sigma^2)$ is:

$$f(x) = \\frac{1}{\\sigma \\sqrt{2\\pi}} \\exp\\left( -\\frac{(x - \\mu)^2}{2\\sigma^2} \\right)$$

> [!NOTE]
> The total integral $\\int_{-\\infty}^{\\infty} f(x) dx = 1$, representing unity probability.
`,
    suggestedConfig: {
      title: 'physics_notes.md',
      cardTheme: 'dark',
      padding: 48,
    },
  },
  {
    id: 'weekly-checklist',
    name: 'Product Sprint & Checklist',
    description: 'Task tracking, sprint roadmap, and status badges',
    icon: 'CheckSquare',
    markdown: `# 🎯 Sprint 42: Launch Prep

### 🗓️ Timeline: Nov 18 — Nov 25

---

### 📋 Critical Path Tasks
- [x] Connect continuous deployment with **Netlify CI/CD**
- [x] Configure DNS custom domain & automatic SSL certificates
- [x] Audit Lighthouse performance score (Current: **99/100**)
- [ ] Complete end-to-end user acceptance testing
- [ ] Publish announcement post to X / LinkedIn

---

### 💡 Priority Focus
> [!IMPORTANT]
> Zero regression policy on image export fidelity. Ensure font rendering is crisp across all mobile and desktop browsers.
`,
    suggestedConfig: {
      title: 'sprint-42.md',
      cardTheme: 'midnight',
      padding: 44,
    },
  },
  {
    id: 'quote-card',
    name: 'Inspirational Quote & Wisdom',
    description: 'Minimalist philosophical quote card',
    icon: 'Quote',
    markdown: `# *"Simplicity is prerequisite for reliability."*

> "Program testing can be used to show the presence of bugs, but never to show their absence!"
> 
> — **Edsger W. Dijkstra**  
> *Turing Award Laureate, 1972*

---

Craft your tools with intention, keep interfaces minimal, and measure twice.
`,
    suggestedConfig: {
      title: 'wisdom.md',
      cardTheme: 'light',
      fontFamily: 'serif',
      padding: 56,
    },
  },
];
