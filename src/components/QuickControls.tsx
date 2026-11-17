import React from 'react';
import type { CanvasConfig } from '../types';
import { BACKGROUND_PRESETS } from '../constants/themes';
import { Sun, Moon, Frame, Maximize2 } from 'lucide-react';

interface QuickControlsProps {
  config: CanvasConfig;
  onChange: (updated: Partial<CanvasConfig>) => void;
}

export const QuickControls: React.FC<QuickControlsProps> = ({ config, onChange }) => {
  return (
    <div className="w-full bg-[#121622] border-t border-white/10 p-3 space-y-2.5 select-none">
      {/* Background Gradients Row */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
        <span className="text-[11px] font-medium text-gray-400 uppercase tracking-wider shrink-0 mr-1">
          Theme:
        </span>
        {BACKGROUND_PRESETS.map((preset) => {
          const isSelected = config.background === preset.value;
          return (
            <button
              key={preset.id}
              type="button"
              onClick={() => onChange({ background: preset.value })}
              title={preset.name}
              className={`h-7 w-7 rounded-full shrink-0 border transition-all active:scale-95 ${
                isSelected
                  ? 'ring-2 ring-purple-400 scale-110 border-white'
                  : 'border-white/20 hover:border-white/40'
              }`}
              style={{ background: preset.value }}
            />
          );
        })}
      </div>

      {/* Quick Action Toggles */}
      <div className="flex items-center justify-between gap-2 overflow-x-auto text-xs">
        <div className="flex items-center gap-1.5">
          {/* Dark / Light Toggle */}
          <button
            type="button"
            onClick={() =>
              onChange({ cardTheme: config.cardTheme === 'dark' ? 'light' : 'dark' })
            }
            className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-white/5 border border-white/10 text-gray-300 active:scale-95"
          >
            {config.cardTheme === 'dark' ? (
              <>
                <Moon className="h-3.5 w-3.5 text-purple-400" />
                <span>Dark</span>
              </>
            ) : (
              <>
                <Sun className="h-3.5 w-3.5 text-amber-400" />
                <span>Light</span>
              </>
            )}
          </button>

          {/* Window Frame Toggle */}
          <button
            type="button"
            onClick={() =>
              onChange({ windowStyle: config.windowStyle === 'macos' ? 'none' : 'macos' })
            }
            className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-white/5 border border-white/10 text-gray-300 active:scale-95"
          >
            <Frame className="h-3.5 w-3.5 text-blue-400" />
            <span>{config.windowStyle === 'macos' ? 'Mac Frame' : 'Frameless'}</span>
          </button>

          {/* Padding Toggle */}
          <button
            type="button"
            onClick={() =>
              onChange({ padding: config.padding === 16 ? 28 : 16 })
            }
            className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-white/5 border border-white/10 text-gray-300 active:scale-95"
          >
            <Maximize2 className="h-3.5 w-3.5 text-emerald-400" />
            <span>{config.padding === 16 ? 'Compact' : 'Spacious'}</span>
          </button>
        </div>

        {/* Title Input */}
        <div className="flex items-center">
          <input
            type="text"
            value={config.title}
            onChange={(e) => onChange({ title: e.target.value })}
            placeholder="title.md"
            className="w-24 sm:w-32 px-2 py-1 text-[11px] bg-white/5 border border-white/10 rounded-lg text-gray-200 outline-none font-mono text-center"
          />
        </div>
      </div>
    </div>
  );
};
