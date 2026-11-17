import type { MarkdownTemplate } from '../types';

export const MARKDOWN_TEMPLATES: MarkdownTemplate[] = [
  {
    id: 'quick-note',
    name: 'Quick Note',
    description: 'Header, checklist, note & badges',
    markdown: `# 💡 Idea & Action Plan

> [!NOTE]
> MarkSnap turns markdown text into **crisp, shareable images** right from your phone.

### 📋 To Do Today
- [x] Write daily summary
- [x] Export snapshot to PNG
- [ ] Share with the team on Slack / X

> [!TIP]
> Tap any theme below to change the vibe instantly!
`,
  },
  {
    id: 'code-snippet',
    name: 'Code Snippet',
    description: 'Highlighted code snippet & callout',
    markdown: `# ⚡ Fast Image Export

\`\`\`typescript
async function copyImage(node: HTMLElement) {
  const blob = await toBlob(node, { pixelRatio: 2 });
  await navigator.clipboard.write([
    new ClipboardItem({ 'image/png': blob })
  ]);
  console.log("Copied to clipboard!");
}
\`\`\`

> [!TIP]
> Ready to paste into Slack, Twitter, or Notion.
`,
  },
  {
    id: 'release-notes',
    name: 'Release v2.0',
    description: 'Changelog with badges',
    markdown: `# 🚀 Release v2.0 — Mobile First

### ✨ What's New
- **Mobile Friendly UI**: Designed for one-hand use
- **Instant Clipboard Copy**: Tap to copy image
- **Crisp Retina Output**: 2x high resolution

| Feature | Mobile | Desktop |
| :--- | :---: | :---: |
| **Speed** | ⚡ Fast | ⚡ Fast |
| **Retina 2x** | ✅ Yes | ✅ Yes |
`,
  },
  {
    id: 'math-formula',
    name: 'Math Formula',
    description: 'LaTeX equations',
    markdown: `# 📐 Quantum Physics

### Einstein's Mass-Energy Equivalence:
$$E = m c^2$$

### Gaussian Distribution:
$$f(x) = \\frac{1}{\\sigma \\sqrt{2\\pi}} e^{-\\frac{(x-\\mu)^2}{2\\sigma^2}}$$
`,
  },
];
