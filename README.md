# ⚡ MarkSnap — Convert Markdown to Rich High-Resolution Images

**MarkSnap** is a modern, high-performance web application designed to turn Markdown documents, code snippets, documentation, and notes into beautiful, presentation-ready images. Ready to deploy directly to **Netlify** with zero configuration.

![MarkSnap Banner](https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80)

---

## ✨ Features

- **Rich Markdown Formatting**:
  - Full **GitHub Flavored Markdown (GFM)**: Tables, task lists (`- [x]`), inline styles, strikethrough.
  - **Syntax Highlighting**: Supports 50+ programming languages with line numbering and badge tags.
  - **GitHub Alerts / Callouts**: Beautifully styled `[!NOTE]`, `[!TIP]`, `[!IMPORTANT]`, `[!WARNING]`, and `[!CAUTION]`.
  - **LaTeX & KaTeX Equations**: Full support for inline (`$...$`) and block (`$$...$$`) math formulas.
- **Customizable Card & Frame**:
  - **Window Styles**: macOS traffic lights, Windows Fluent, Terminal path, Glassmorphism, Minimalist dot, Frameless.
  - **Dynamic Backgrounds**: Vibrant gradients (Hyper Violet, Sunset Blaze, Oceanic, Cyberpunk, etc.), sleek solid colors, OLED dark, and transparent canvas.
  - **Themes**: Dark, Light, Midnight Navy, Sepia.
  - **Shadows & Rounding**: Configurable border radii (0px - 32px) and shadow depth (soft, medium, dramatic, neon glow, retro 3D).
  - **Typography**: Inter, JetBrains Mono, Fira Code, Outfit, Plus Jakarta Sans, Playfair Serif.
  - **Custom Footer Watermark**: Add your handle, brand attribution, or personal logo icon.
- **Developer Experience**:
  - Drag & drop any `.md` or `.markdown` file directly into the editor.
  - Pre-built templates (Feature Showcase, Release Notes, Code Tutorial, Math/Science, Sprint Checklist, Quote).
  - Live split-view editor with real-time preview.
  - One-click **Copy to Clipboard** directly as an image (PNG blob).
  - Multi-resolution export: **1x (Standard)**, **2x (Retina)**, and **3x (Ultra 4K)**.
  - Supports **PNG**, **JPEG**, and **SVG** vector formats.

---

## 🚀 Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Start Local Development Server
```bash
npm run dev
```
Open your browser at `http://localhost:5173`.

### 3. Production Build
```bash
npm run build
```
Generates optimized, minified production assets in the `dist` folder.

---

## 🌐 Deploy to Netlify

This project is pre-configured for **Netlify** with:
- `netlify.toml` (build command `npm run build`, publish directory `dist`, SPA rewrite rule `/* -> /index.html`, and caching headers)
- `public/_redirects`

### Method A: One-Command CLI Deploy
Run:
```bash
npm run deploy
```
*(or `npx netlify deploy --prod --dir=dist`)*

If you are not yet authenticated with Netlify, it will guide you through a one-time browser login, ask for your site name, and deploy your site immediately.

### Method B: Continuous Deployment via Git
1. Push this folder to your GitHub / GitLab repository:
   ```bash
   git init
   git add .
   git commit -m "feat: MarkSnap markdown to image generator"
   git branch -M main
   git remote add origin https://github.com/<your-username>/markdown-to-image.git
   git push -u origin main
   ```
2. Go to [app.netlify.com](https://app.netlify.com).
3. Click **"Add new site" → "Import an existing project"**.
4. Select your GitHub repository. Netlify automatically detects:
   - **Build command**: `npm run build`
   - **Publish directory**: `dist`
5. Click **Deploy Site**!

---

## 🛠️ Tech Stack
- **Framework**: React 19 + TypeScript
- **Bundler**: Vite 8
- **Styling**: Tailwind CSS v4
- **Markdown**: `react-markdown`, `remark-gfm`, `remark-math`, `rehype-katex`
- **Math Rendering**: KaTeX
- **Code Syntax**: PrismJS
- **Rasterization & Vector Export**: `html-to-image`
- **Icons**: Lucide Icons
- **Hosting**: Netlify

---

## 📄 License
MIT License. Free for personal and commercial use.
