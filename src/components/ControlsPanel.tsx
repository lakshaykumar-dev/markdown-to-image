import React from 'react';
import { 
  Palette, 
  Layout, 
  Type, 
  Sparkles, 
  Sliders, 
  ShieldCheck 
} from 'lucide-react';
import type { 
  CanvasConfig, 
  CardTheme, 
  FontFamily, 
  ShadowPreset, 
  WindowStyle 
} from '../types';
import { 
  BACKGROUND_PRESETS, 
  FONT_OPTIONS, 
  WINDOW_STYLES 
} from '../constants/themes';

interface ControlsPanelProps {
  config: CanvasConfig;
  onChange: (updated: Partial<CanvasConfig>) => void;
}

export const ControlsPanel: React.FC<ControlsPanelProps> = ({ config, onChange }) => {
  return (
    <div className="w-full h-full overflow-y-auto bg-[#10141f] text-gray-200 p-4 space-y-6 text-sm">
      {/* Background Section */}
      <div>
        <div className="flex items-center gap-2 mb-3 text-xs font-semibold uppercase tracking-wider text-purple-400">
          <Palette className="h-3.5 w-3.5" />
          <span>Canvas Background</span>
        </div>

        {/* Preset Grids */}
        <div className="grid grid-cols-4 gap-2">
          {BACKGROUND_PRESETS.map((preset) => {
            const isSelected = config.background === preset.value;
            const isTransparent = preset.type === 'transparent';

            return (
              <button
                key={preset.id}
                type="button"
                onClick={() =>
                  onChange({
                    background: preset.value,
                    bgType: preset.type,
                  })
                }
                title={preset.name}
                className={`group relative h-9 rounded-lg border transition-all overflow-hidden flex items-center justify-center ${
                  isSelected
                    ? 'border-purple-500 ring-2 ring-purple-500/50 scale-105'
                    : 'border-white/15 hover:border-white/40'
                } ${isTransparent ? 'checkerboard-bg' : ''}`}
                style={isTransparent ? {} : { background: preset.value }}
              >
                {isSelected && (
                  <span className="flex h-2 w-2 rounded-full bg-white shadow-md" />
                )}
              </button>
            );
          })}
        </div>

        {/* Custom Color Input */}
        <div className="mt-3 flex items-center gap-2">
          <label className="text-xs text-gray-400">Custom:</label>
          <div className="flex items-center gap-2 flex-1">
            <input
              type="color"
              value={config.background.startsWith('#') ? config.background : '#6366f1'}
              onChange={(e) =>
                onChange({ background: e.target.value, bgType: 'solid' })
              }
              className="h-7 w-8 rounded cursor-pointer bg-transparent border border-white/20"
            />
            <span className="text-xs text-gray-400 font-mono truncate">
              {config.background.length > 25
                ? `${config.background.substring(0, 25)}...`
                : config.background}
            </span>
          </div>
        </div>
      </div>

      <hr className="border-white/10" />

      {/* Window & Card Layout */}
      <div>
        <div className="flex items-center gap-2 mb-3 text-xs font-semibold uppercase tracking-wider text-blue-400">
          <Layout className="h-3.5 w-3.5" />
          <span>Window Frame & Theme</span>
        </div>

        {/* Window Style selector */}
        <div className="mb-4">
          <label className="block text-xs text-gray-400 mb-1.5 font-medium">Window Style</label>
          <div className="grid grid-cols-3 gap-1.5">
            {WINDOW_STYLES.map((ws) => (
              <button
                key={ws.id}
                type="button"
                onClick={() => onChange({ windowStyle: ws.id as WindowStyle })}
                className={`px-2 py-1.5 rounded-lg text-xs font-medium border text-center truncate transition-colors ${
                  config.windowStyle === ws.id
                    ? 'border-blue-500 bg-blue-500/20 text-blue-300'
                    : 'border-white/10 bg-white/5 hover:bg-white/10 text-gray-300'
                }`}
              >
                {ws.name.split(' ')[0]}
              </button>
            ))}
          </div>
        </div>

        {/* Title text input */}
        <div className="mb-4">
          <label className="block text-xs text-gray-400 mb-1.5 font-medium">Card Title</label>
          <input
            type="text"
            value={config.title}
            onChange={(e) => onChange({ title: e.target.value })}
            placeholder="e.g. README.md"
            className="w-full px-3 py-1.5 text-xs bg-white/5 border border-white/10 rounded-lg text-gray-200 focus:outline-none focus:border-blue-500 font-mono"
          />
        </div>

        {/* Card Theme */}
        <div className="mb-4">
          <label className="block text-xs text-gray-400 mb-1.5 font-medium">Card Theme</label>
          <div className="grid grid-cols-4 gap-1.5">
            {(['dark', 'light', 'midnight', 'sepia'] as CardTheme[]).map((theme) => (
              <button
                key={theme}
                type="button"
                onClick={() => onChange({ cardTheme: theme })}
                className={`py-1.5 rounded-lg text-xs capitalize font-medium border transition-colors ${
                  config.cardTheme === theme
                    ? 'border-blue-500 bg-blue-500/20 text-blue-300'
                    : 'border-white/10 bg-white/5 hover:bg-white/10 text-gray-300'
                }`}
              >
                {theme}
              </button>
            ))}
          </div>
        </div>

        {/* Shadow Preset */}
        <div>
          <label className="block text-xs text-gray-400 mb-1.5 font-medium">Card Shadow</label>
          <div className="grid grid-cols-3 gap-1.5">
            {(['none', 'soft', 'medium', 'dramatic', 'glow', 'retro'] as ShadowPreset[]).map(
              (s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => onChange({ shadow: s })}
                  className={`py-1.5 rounded-lg text-xs capitalize font-medium border transition-colors ${
                    config.shadow === s
                      ? 'border-blue-500 bg-blue-500/20 text-blue-300'
                      : 'border-white/10 bg-white/5 hover:bg-white/10 text-gray-300'
                  }`}
                >
                  {s}
                </button>
              )
            )}
          </div>
        </div>
      </div>

      <hr className="border-white/10" />

      {/* Sizing & Spacing */}
      <div>
        <div className="flex items-center gap-2 mb-3 text-xs font-semibold uppercase tracking-wider text-emerald-400">
          <Sliders className="h-3.5 w-3.5" />
          <span>Sizing & Padding</span>
        </div>

        {/* Canvas Padding Slider */}
        <div className="mb-3">
          <div className="flex justify-between text-xs text-gray-400 mb-1">
            <span>Canvas Padding</span>
            <span className="font-mono">{config.padding}px</span>
          </div>
          <input
            type="range"
            min={16}
            max={80}
            step={8}
            value={config.padding}
            onChange={(e) => onChange({ padding: Number(e.target.value) })}
            className="w-full accent-emerald-500 cursor-pointer"
          />
        </div>

        {/* Card Width Slider */}
        <div className="mb-3">
          <div className="flex justify-between text-xs text-gray-400 mb-1">
            <span>Card Width</span>
            <span className="font-mono">{config.cardWidth}px</span>
          </div>
          <input
            type="range"
            min={550}
            max={1100}
            step={25}
            value={config.cardWidth}
            onChange={(e) => onChange({ cardWidth: Number(e.target.value) })}
            className="w-full accent-emerald-500 cursor-pointer"
          />
        </div>

        {/* Border Radius */}
        <div>
          <div className="flex justify-between text-xs text-gray-400 mb-1">
            <span>Border Radius</span>
            <span className="font-mono">{config.borderRadius}px</span>
          </div>
          <input
            type="range"
            min={0}
            max={32}
            step={4}
            value={config.borderRadius}
            onChange={(e) => onChange({ borderRadius: Number(e.target.value) })}
            className="w-full accent-emerald-500 cursor-pointer"
          />
        </div>
      </div>

      <hr className="border-white/10" />

      {/* Typography Section */}
      <div>
        <div className="flex items-center gap-2 mb-3 text-xs font-semibold uppercase tracking-wider text-pink-400">
          <Type className="h-3.5 w-3.5" />
          <span>Typography & Code</span>
        </div>

        {/* Font Selection */}
        <div className="mb-3">
          <label className="block text-xs text-gray-400 mb-1.5 font-medium">Font Family</label>
          <select
            value={config.fontFamily}
            onChange={(e) => onChange({ fontFamily: e.target.value as FontFamily })}
            className="w-full px-3 py-1.5 text-xs bg-white/5 border border-white/10 rounded-lg text-gray-200 focus:outline-none focus:border-pink-500"
          >
            {FONT_OPTIONS.map((f) => (
              <option key={f.id} value={f.id} className="bg-[#121622] text-white">
                {f.name}
              </option>
            ))}
          </select>
        </div>

        {/* Font Size Slider */}
        <div className="mb-3">
          <div className="flex justify-between text-xs text-gray-400 mb-1">
            <span>Base Font Size</span>
            <span className="font-mono">{config.fontSize}px</span>
          </div>
          <input
            type="range"
            min={13}
            max={20}
            step={1}
            value={config.fontSize}
            onChange={(e) => onChange({ fontSize: Number(e.target.value) })}
            className="w-full accent-pink-500 cursor-pointer"
          />
        </div>

        {/* Line Numbers Toggle */}
        <label className="flex items-center justify-between cursor-pointer py-1">
          <span className="text-xs text-gray-300">Show Code Line Numbers</span>
          <input
            type="checkbox"
            checked={config.showLineNumbers}
            onChange={(e) => onChange({ showLineNumbers: e.target.checked })}
            className="h-4 w-4 rounded accent-pink-500 cursor-pointer"
          />
        </label>
      </div>

      <hr className="border-white/10" />

      {/* Watermark & Attribution */}
      <div>
        <div className="flex items-center gap-2 mb-3 text-xs font-semibold uppercase tracking-wider text-amber-400">
          <Sparkles className="h-3.5 w-3.5" />
          <span>Footer Attribution</span>
        </div>

        <label className="flex items-center justify-between cursor-pointer mb-2.5">
          <span className="text-xs text-gray-300">Enable Footer Watermark</span>
          <input
            type="checkbox"
            checked={config.watermark.enabled}
            onChange={(e) =>
              onChange({
                watermark: { ...config.watermark, enabled: e.target.checked },
              })
            }
            className="h-4 w-4 rounded accent-amber-500 cursor-pointer"
          />
        </label>

        {config.watermark.enabled && (
          <div className="space-y-2 mt-2">
            <input
              type="text"
              value={config.watermark.text}
              onChange={(e) =>
                onChange({
                  watermark: { ...config.watermark, text: e.target.value },
                })
              }
              placeholder="e.g. @yourname or Made with MarkSnap"
              className="w-full px-3 py-1.5 text-xs bg-white/5 border border-white/10 rounded-lg text-gray-200 focus:outline-none focus:border-amber-500"
            />

            {/* Icon picker */}
            <div className="flex items-center gap-2">
              <span className="text-xs text-gray-400">Icon:</span>
              {(['globe', 'twitter', 'github', 'user'] as const).map((ic) => (
                <button
                  key={ic}
                  type="button"
                  onClick={() =>
                    onChange({
                      watermark: { ...config.watermark, icon: ic },
                    })
                  }
                  className={`px-2 py-1 rounded text-xs capitalize border ${
                    config.watermark.icon === ic
                      ? 'border-amber-500 bg-amber-500/20 text-amber-300'
                      : 'border-white/10 bg-white/5 text-gray-400'
                  }`}
                >
                  {ic}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      <hr className="border-white/10" />

      {/* Export Scale Multiplier */}
      <div>
        <div className="flex items-center gap-2 mb-3 text-xs font-semibold uppercase tracking-wider text-purple-400">
          <ShieldCheck className="h-3.5 w-3.5" />
          <span>Export Quality Scale</span>
        </div>
        <div className="grid grid-cols-3 gap-2">
          {([1, 2, 3] as const).map((scale) => (
            <button
              key={scale}
              type="button"
              onClick={() => onChange({ exportScale: scale })}
              className={`py-2 rounded-lg text-xs font-semibold border flex flex-col items-center gap-0.5 transition-colors ${
                config.exportScale === scale
                  ? 'border-purple-500 bg-purple-500/20 text-purple-200'
                  : 'border-white/10 bg-white/5 text-gray-400 hover:text-white'
              }`}
            >
              <span>{scale}x</span>
              <span className="text-[10px] font-normal opacity-70">
                {scale === 1 ? 'Standard' : scale === 2 ? 'Retina (Crisp)' : 'Ultra 4K'}
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
