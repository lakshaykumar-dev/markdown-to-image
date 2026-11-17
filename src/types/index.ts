export type WindowStyle = 'macos' | 'windows' | 'minimal' | 'glass' | 'terminal' | 'none';

export type FontFamily = 
  | 'inter' 
  | 'jetbrains-mono' 
  | 'fira-code' 
  | 'outfit' 
  | 'plus-jakarta' 
  | 'serif';

export type ShadowPreset = 'none' | 'soft' | 'medium' | 'dramatic' | 'glow' | 'retro';

export type AspectRatio = 'auto' | '1:1' | '16:9' | '4:5' | 'custom';

export type CardTheme = 'dark' | 'light' | 'midnight' | 'sepia' | 'system';

export interface BackgroundPreset {
  id: string;
  name: string;
  type: 'gradient' | 'solid' | 'mesh' | 'transparent';
  value: string;
  category: 'gradient' | 'minimal' | 'vibrant' | 'dark';
}

export interface CanvasConfig {
  title: string;
  background: string;
  bgType: 'gradient' | 'solid' | 'mesh' | 'transparent';
  cardTheme: CardTheme;
  windowStyle: WindowStyle;
  fontFamily: FontFamily;
  fontSize: number; // 14, 16, 18, 20
  padding: number; // 16, 32, 48, 64, 80
  cardWidth: number; // 600 - 1200
  aspectRatio: AspectRatio;
  borderRadius: number; // 0, 8, 16, 24, 32
  shadow: ShadowPreset;
  cardOpacity: number; // 50 - 100
  showLineNumbers: boolean;
  watermark: {
    enabled: boolean;
    text: string;
    icon: 'user' | 'twitter' | 'github' | 'globe';
  };
  exportScale: 1 | 2 | 3;
}

export interface MarkdownTemplate {
  id: string;
  name: string;
  description: string;
  icon: string;
  markdown: string;
  suggestedConfig?: Partial<CanvasConfig>;
}
