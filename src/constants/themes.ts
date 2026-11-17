import type { BackgroundPreset, CanvasConfig } from '../types';

export const BACKGROUND_PRESETS: BackgroundPreset[] = [
  {
    id: 'hyper-violet',
    name: 'Violet',
    value: 'linear-gradient(135deg, #6366f1 0%, #a855f7 50%, #ec4899 100%)',
  },
  {
    id: 'sunset-blaze',
    name: 'Sunset',
    value: 'linear-gradient(135deg, #f97316 0%, #ef4444 50%, #8b5cf6 100%)',
  },
  {
    id: 'oceanic-breeze',
    name: 'Ocean',
    value: 'linear-gradient(135deg, #06b6d4 0%, #3b82f6 50%, #6366f1 100%)',
  },
  {
    id: 'emerald-aurora',
    name: 'Emerald',
    value: 'linear-gradient(135deg, #10b981 0%, #06b6d4 50%, #3b82f6 100%)',
  },
  {
    id: 'midnight-nebula',
    name: 'Midnight',
    value: 'linear-gradient(135deg, #1e1b4b 0%, #0f172a 60%, #020617 100%)',
  },
  {
    id: 'dark-carbon',
    name: 'Carbon',
    value: 'linear-gradient(135deg, #18181b 0%, #27272a 100%)',
  },
  {
    id: 'clean-white',
    name: 'Light',
    value: 'linear-gradient(135deg, #f1f5f9 0%, #e2e8f0 100%)',
  },
  {
    id: 'pure-black',
    name: 'OLED',
    value: '#000000',
  },
];

export const DEFAULT_CONFIG: CanvasConfig = {
  title: 'note.md',
  background: BACKGROUND_PRESETS[0].value,
  cardTheme: 'dark',
  windowStyle: 'macos',
  fontFamily: 'inter',
  fontSize: 15,
  padding: 16, // mobile-friendly compact default!
  cardWidth: 0, // 0 = 100% fluid max-w-2xl
  borderRadius: 16,
  shadow: 'dramatic',
  showLineNumbers: true,
  watermark: {
    enabled: true,
    text: 'Made with MarkSnap',
  },
  exportScale: 2,
};
