import { forwardRef } from 'react';
import { Terminal as TerminalIcon } from 'lucide-react';
import type { CanvasConfig } from '../types';
import { MarkdownRenderer } from './MarkdownRenderer';

interface PreviewCanvasProps {
  markdown: string;
  config: CanvasConfig;
}

export const PreviewCanvas = forwardRef<HTMLDivElement, PreviewCanvasProps>(
  ({ markdown, config }, ref) => {
    const isLightCard = config.cardTheme === 'light';
    const isMidnight = config.cardTheme === 'midnight';

    const getCardThemeClasses = () => {
      if (isLightCard) {
        return 'bg-white text-gray-900 border-gray-200/90 shadow-xl shadow-black/10';
      }
      if (isMidnight) {
        return 'bg-[#0a0e17] text-slate-100 border-indigo-950/60 shadow-2xl shadow-black/40';
      }
      return 'bg-[#12161f] text-gray-100 border-white/10 shadow-2xl shadow-black/40';
    };

    return (
      <div className="w-full flex items-center justify-center">
        {/* The rasterization container targeted by html-to-image */}
        <div
          ref={ref}
          id="marksnap-canvas-node"
          style={{
            background: config.background,
            padding: `${config.padding}px`,
          }}
          className="w-full max-w-xl transition-all flex items-center justify-center select-text rounded-2xl"
        >
          {/* Inner Card Container */}
          <div
            style={{
              borderRadius: `${config.borderRadius}px`,
            }}
            className={`w-full border backdrop-blur-md transition-all overflow-hidden ${getCardThemeClasses()}`}
          >
            {/* Title Bar Header */}
            {config.windowStyle !== 'none' && (
              <div
                className={`flex items-center justify-between px-3.5 py-2.5 border-b text-xs ${
                  isLightCard
                    ? 'border-gray-200 bg-gray-50 text-gray-600'
                    : isMidnight
                    ? 'border-indigo-950/60 bg-[#060911] text-slate-300'
                    : 'border-white/10 bg-black/25 text-gray-300'
                }`}
              >
                {/* Window buttons */}
                <div className="flex items-center gap-1.5">
                  {config.windowStyle === 'macos' && (
                    <>
                      <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f56]" />
                      <span className="h-2.5 w-2.5 rounded-full bg-[#ffbd2e]" />
                      <span className="h-2.5 w-2.5 rounded-full bg-[#27c93f]" />
                    </>
                  )}
                  {config.windowStyle === 'terminal' && (
                    <div className="flex items-center gap-1.5 font-mono text-[11px] text-emerald-400">
                      <TerminalIcon className="h-3 w-3" />
                      <span>~/notes</span>
                    </div>
                  )}
                  {config.windowStyle === 'minimal' && (
                    <span className="h-2 w-2 rounded-full bg-purple-500 animate-pulse" />
                  )}
                </div>

                {/* Title */}
                <span className="font-medium text-[11px] sm:text-xs opacity-80 truncate max-w-[200px]">
                  {config.title || 'untitled.md'}
                </span>

                <span className="text-[10px] font-mono opacity-50">MD</span>
              </div>
            )}

            {/* Markdown Content Area */}
            <div
              style={{ fontSize: `${config.fontSize}px` }}
              className="p-4 sm:p-6"
            >
              <MarkdownRenderer
                content={markdown}
                theme={config.cardTheme}
                showLineNumbers={config.showLineNumbers}
              />
            </div>

            {/* Watermark */}
            {config.watermark.enabled && config.watermark.text && (
              <div
                className={`flex items-center justify-between px-4 py-2 border-t text-[10px] ${
                  isLightCard
                    ? 'border-gray-100 bg-gray-50/70 text-gray-500'
                    : 'border-white/5 bg-black/20 text-gray-400'
                }`}
              >
                <span>{config.watermark.text}</span>
                <span className="opacity-40 font-mono">marksnap</span>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
);

PreviewCanvas.displayName = 'PreviewCanvas';
