import type { BackgroundPreset, FontFamily, ShadowPreset, WindowStyle } from '../types';

export const BACKGROUND_PRESETS: BackgroundPreset[] = [
  // Vibrant & Modern Gradients
  {
    id: 'hyper-violet',
    name: 'Hyper Violet',
    type: 'gradient',
    value: 'linear-gradient(135deg, #6366f1 0%, #a855f7 50%, #ec4899 100%)',
    category: 'vibrant',
  },
  {
    id: 'sunset-blaze',
    name: 'Sunset Blaze',
    type: 'gradient',
    value: 'linear-gradient(135deg, #f97316 0%, #ef4444 50%, #8b5cf6 100%)',
    category: 'vibrant',
  },
  {
    id: 'oceanic-breeze',
    name: 'Oceanic Breeze',
    type: 'gradient',
    value: 'linear-gradient(135deg, #06b6d4 0%, #3b82f6 50%, #6366f1 100%)',
    category: 'vibrant',
  },
  {
    id: 'emerald-aurora',
    name: 'Emerald Aurora',
    type: 'gradient',
    value: 'linear-gradient(135deg, #10b981 0%, #06b6d4 50%, #3b82f6 100%)',
    category: 'vibrant',
  },
  {
    id: 'neon-cyberpunk',
    name: 'Cyberpunk Neon',
    type: 'gradient',
    value: 'linear-gradient(135deg, #ff007f 0%, #7928ca 50%, #00dfd8 100%)',
    category: 'vibrant',
  },
  {
    id: 'peach-glow',
    name: 'Peach Glow',
    type: 'gradient',
    value: 'linear-gradient(135deg, #ff9a9e 0%, #fecfef 99%, #fecfef 100%)',
    category: 'gradient',
  },
  {
    id: 'velvet-royale',
    name: 'Velvet Royale',
    type: 'gradient',
    value: 'linear-gradient(135deg, #1e1b4b 0%, #312e81 40%, #4338ca 100%)',
    category: 'dark',
  },
  {
    id: 'midnight-nebula',
    name: 'Midnight Nebula',
    type: 'gradient',
    value: 'radial-gradient(circle at 20% 20%, #3b0764 0%, #0f172a 70%, #020617 100%)',
    category: 'dark',
  },
  {
    id: 'carbon-stealth',
    name: 'Carbon Stealth',
    type: 'gradient',
    value: 'linear-gradient(135deg, #18181b 0%, #27272a 50%, #09090b 100%)',
    category: 'dark',
  },
  {
    id: 'frost-glass',
    name: 'Frosted Sky',
    type: 'gradient',
    value: 'linear-gradient(135deg, #e0f2fe 0%, #bae6fd 50%, #7dd3fc 100%)',
    category: 'minimal',
  },
  {
    id: 'soft-pastel',
    name: 'Soft Cotton',
    type: 'gradient',
    value: 'linear-gradient(135deg, #fdfbf7 0%, #eef2f6 100%)',
    category: 'minimal',
  },
  {
    id: 'warm-amber',
    name: 'Warm Amber',
    type: 'gradient',
    value: 'linear-gradient(135deg, #f59e0b 0%, #d97706 50%, #b45309 100%)',
    category: 'vibrant',
  },
  // Solid Colors
  {
    id: 'solid-slate',
    name: 'Deep Slate',
    type: 'solid',
    value: '#0f172a',
    category: 'minimal',
  },
  {
    id: 'solid-pure-dark',
    name: 'OLED Black',
    type: 'solid',
    value: '#000000',
    category: 'minimal',
  },
  {
    id: 'solid-pure-white',
    name: 'Studio White',
    type: 'solid',
    value: '#ffffff',
    category: 'minimal',
  },
  // Transparent
  {
    id: 'transparent-canvas',
    name: 'Transparent (PNG)',
    type: 'transparent',
    value: 'transparent',
    category: 'minimal',
  },
];

export const FONT_OPTIONS: { id: FontFamily; name: string; fontClass: string; sample: string }[] = [
  { id: 'inter', name: 'Inter (Clean Sans)', fontClass: 'font-sans', sample: 'Modern & crisp UI readability' },
  { id: 'jetbrains-mono', name: 'JetBrains Mono', fontClass: 'font-mono', sample: 'Ideal for code & technical notes' },
  { id: 'fira-code', name: 'Fira Code', fontClass: 'font-mono', sample: 'Coding ligature style font' },
  { id: 'plus-jakarta', name: 'Plus Jakarta Sans', fontClass: 'font-sans', sample: 'Geometric elegance for marketing' },
  { id: 'outfit', name: 'Outfit', fontClass: 'font-sans', sample: 'Friendly and modern rounded sans' },
  { id: 'serif', name: 'Playfair (Serif)', fontClass: 'font-serif', sample: 'Editorial, classic, literary look' },
];

export const SHADOW_PRESETS: Record<ShadowPreset, string> = {
  none: 'shadow-none',
  soft: 'shadow-md shadow-black/10',
  medium: 'shadow-xl shadow-black/20',
  dramatic: 'shadow-2xl shadow-black/35 ring-1 ring-white/10',
  glow: 'shadow-[0_0_50px_rgba(168,85,247,0.35)] ring-1 ring-purple-500/30',
  retro: 'shadow-[8px_8px_0px_0px_rgba(0,0,0,0.85)] border-2 border-black',
};

export const WINDOW_STYLES: { id: WindowStyle; name: string; description: string }[] = [
  { id: 'macos', name: 'macOS Traffic Lights', description: 'Red, yellow, green titlebar dots' },
  { id: 'windows', name: 'Windows Fluent', description: 'Min, max, and close controls' },
  { id: 'terminal', name: 'Console Path', description: 'Terminal status bar with file path' },
  { id: 'glass', name: 'Glassmorphism', description: 'Translucent title bar with sheen' },
  { id: 'minimal', name: 'Minimalist Dot', description: 'Single subtle status indicator' },
  { id: 'none', name: 'Frameless', description: 'No window controls, borderless' },
];

export const DEFAULT_CONFIG = {
  title: 'README.md',
  background: BACKGROUND_PRESETS[0].value,
  bgType: BACKGROUND_PRESETS[0].type,
  cardTheme: 'dark' as const,
  windowStyle: 'macos' as const,
  fontFamily: 'inter' as const,
  fontSize: 16,
  padding: 48,
  cardWidth: 800,
  aspectRatio: 'auto' as const,
  borderRadius: 20,
  shadow: 'dramatic' as const,
  cardOpacity: 100,
  showLineNumbers: true,
  watermark: {
    enabled: true,
    text: 'Made with MarkSnap',
    icon: 'globe' as const,
  },
  exportScale: 2 as const,
};
