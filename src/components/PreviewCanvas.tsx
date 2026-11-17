import React, { forwardRef } from 'react';
import { 
  Globe, 
  User, 
  Terminal as TerminalIcon, 
  Minus, 
  Square, 
  X 
} from 'lucide-react';
import type { CanvasConfig } from '../types';
import { MarkdownRenderer } from './MarkdownRenderer';
import { SHADOW_PRESETS } from '../constants/themes';

interface PreviewCanvasProps {
  markdown: string;
  config: CanvasConfig;
}

export const PreviewCanvas = forwardRef<HTMLDivElement, PreviewCanvasProps>(
  ({ markdown, config }, ref) => {
    const isLightCard = config.cardTheme === 'light';
    const isMidnight = config.cardTheme === 'midnight';
    const isSepia = config.cardTheme === 'sepia';

    // Card background color & styles based on theme
    const getCardThemeClasses = () => {
      if (isLightCard) {
        return 'bg-white/95 text-gray-900 border-gray-200/80';
      }
      if (isMidnight) {
        return 'bg-[#090d16]/95 text-slate-100 border-indigo-900/40';
      }
      if (isSepia) {
        return 'bg-[#fbf0d9]/95 text-[#433422] border-[#e4d1b3]';
      }
      return 'bg-[#12161f]/95 text-gray-100 border-white/10';
    };

    // Card Title Bar Header Render
    const renderWindowControls = () => {
      if (config.windowStyle === 'none') return null;

      if (config.windowStyle === 'macos') {
        return (
          <div className="flex items-center gap-2">
            <span className="h-3 w-3 rounded-full bg-[#ff5f56] border border-[#e0443e]/50 shadow-xs" />
            <span className="h-3 w-3 rounded-full bg-[#ffbd2e] border border-[#dea123]/50 shadow-xs" />
            <span className="h-3 w-3 rounded-full bg-[#27c93f] border border-[#1aab29]/50 shadow-xs" />
          </div>
        );
      }

      if (config.windowStyle === 'windows') {
        return (
          <div className="flex items-center gap-3 opacity-60">
            <Minus className="h-3.5 w-3.5" />
            <Square className="h-3 w-3" />
            <X className="h-3.5 w-3.5" />
          </div>
        );
      }

      if (config.windowStyle === 'terminal') {
        return (
          <div className="flex items-center gap-2 text-xs font-mono opacity-70">
            <TerminalIcon className="h-3.5 w-3.5 text-emerald-400" />
            <span className="text-emerald-400 font-semibold">user@box:</span>
            <span className="text-purple-300">~/docs</span>
          </div>
        );
      }

      if (config.windowStyle === 'glass') {
        return (
          <div className="flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-white/40 backdrop-blur-md" />
            <span className="h-2.5 w-2.5 rounded-full bg-white/20 backdrop-blur-md" />
            <span className="h-2.5 w-2.5 rounded-full bg-white/10 backdrop-blur-md" />
          </div>
        );
      }

      // Minimal
      return (
        <div className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-purple-500 animate-pulse" />
        </div>
      );
    };

    // Watermark Icon
    const renderWatermarkIcon = () => {
      switch (config.watermark.icon) {
        case 'github':
          return (
            <svg className="h-3 w-3 fill-current" viewBox="0 0 24 24">
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
            </svg>
          );
        case 'twitter':
          return (
            <svg className="h-3 w-3 fill-current" viewBox="0 0 24 24">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
            </svg>
          );
        case 'user':
          return <User className="h-3 w-3" />;
        case 'globe':
        default:
          return <Globe className="h-3 w-3" />;
      }
    };

    // Font Family Class
    const getFontFamilyClass = () => {
      switch (config.fontFamily) {
        case 'jetbrains-mono':
        case 'fira-code':
          return 'font-mono';
        case 'serif':
          return 'font-serif';
        case 'plus-jakarta':
        case 'outfit':
        case 'inter':
        default:
          return 'font-sans';
      }
    };

    // Calculate background style
    const backgroundStyle: React.CSSProperties = {
      background: config.background,
      padding: `${config.padding}px`,
    };

    return (
      <div className="w-full flex items-center justify-center p-2 sm:p-4 overflow-auto">
        {/* The rasterization container targeted by html-to-image */}
        <div
          ref={ref}
          id="marksnap-canvas-node"
          style={backgroundStyle}
          className={`relative transition-all duration-300 flex items-center justify-center select-text ${
            config.bgType === 'transparent' ? 'bg-transparent checkerboard-bg' : ''
          }`}
        >
          {/* Inner Card Container */}
          <div
            style={{
              width: `${config.cardWidth}px`,
              maxWidth: '100%',
              borderRadius: `${config.borderRadius}px`,
              opacity: config.cardOpacity / 100,
            }}
            className={`border backdrop-blur-xl transition-all duration-200 overflow-hidden ${getCardThemeClasses()} ${
              SHADOW_PRESETS[config.shadow]
            } ${getFontFamilyClass()}`}
          >
            {/* Title Bar Header */}
            {config.windowStyle !== 'none' && (
              <div
                className={`flex items-center justify-between px-5 py-3 border-b text-xs ${
                  isLightCard
                    ? 'border-gray-200/80 bg-gray-50/70 text-gray-600'
                    : isMidnight
                    ? 'border-indigo-950/60 bg-[#060911]/80 text-slate-300'
                    : 'border-white/10 bg-black/20 text-gray-300'
                }`}
              >
                <div className="flex items-center gap-3">
                  {renderWindowControls()}
                </div>

                {/* Title in center */}
                <span className="font-medium tracking-wide text-xs opacity-80 truncate max-w-[260px]">
                  {config.title || 'untitled.md'}
                </span>

                {/* Right decorative or format badge */}
                <div className="flex items-center gap-1.5 opacity-60 text-[11px] font-mono">
                  <span>MD</span>
                </div>
              </div>
            )}

            {/* Markdown Content Area */}
            <div
              style={{ fontSize: `${config.fontSize}px` }}
              className="p-6 sm:p-8"
            >
              <MarkdownRenderer
                content={markdown}
                theme={config.cardTheme}
                showLineNumbers={config.showLineNumbers}
              />
            </div>

            {/* Watermark / Attribution Footer */}
            {config.watermark.enabled && config.watermark.text && (
              <div
                className={`flex items-center justify-between px-6 py-2.5 border-t text-[11px] tracking-wide ${
                  isLightCard
                    ? 'border-gray-200/60 bg-gray-50/50 text-gray-500'
                    : 'border-white/5 bg-black/20 text-gray-400'
                }`}
              >
                <div className="flex items-center gap-1.5 opacity-75">
                  {renderWatermarkIcon()}
                  <span>{config.watermark.text}</span>
                </div>
                <span className="opacity-40 font-mono text-[10px]">marksnap</span>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
);

PreviewCanvas.displayName = 'PreviewCanvas';
