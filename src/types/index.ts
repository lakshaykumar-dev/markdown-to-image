export type WindowStyle = 'macos' | 'minimal' | 'terminal' | 'none';

export type FontFamily = 
  | 'inter' 
  | 'jetbrains-mono' 
  | 'fira-code' 
  | 'plus-jakarta' 
  | 'serif';

export type CardTheme = 'dark' | 'light' | 'midnight';

export interface BackgroundPreset {
  id: string;
  name: string;
  value: string;
  textColor?: string;
}

export interface CanvasConfig {
  title: string;
  background: string;
  cardTheme: CardTheme;
  windowStyle: WindowStyle;
  fontFamily: FontFamily;
  fontSize: number; // 14, 16, 18
  padding: number; // 12 (compact), 24 (normal), 40 (spacious)
  cardWidth: number; // 0 for auto/full width, or fixed width
  borderRadius: number;
  shadow: 'soft' | 'medium' | 'dramatic' | 'none';
  showLineNumbers: boolean;
  watermark: {
    enabled: boolean;
    text: string;
  };
  exportScale: 1 | 2;
}

export interface MarkdownTemplate {
  id: string;
  name: string;
  description: string;
  markdown: string;
}
