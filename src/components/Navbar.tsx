import React from 'react';
import { 
  Sparkles, 
  Copy, 
  Download, 
  Cloud, 
  Check, 
  Layers, 
  SlidersHorizontal,
  Code,
  Eye,
  Columns
} from 'lucide-react';

interface NavbarProps {
  onOpenTemplates: () => void;
  onOpenExport: () => void;
  onOpenNetlify: () => void;
  onQuickCopy: () => void;
  isQuickCopying: boolean;
  quickCopied: boolean;
  activeTab: 'split' | 'editor' | 'preview';
  setActiveTab: (tab: 'split' | 'editor' | 'preview') => void;
  isControlsOpen: boolean;
  setIsControlsOpen: (open: boolean) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenTemplates,
  onOpenExport,
  onOpenNetlify,
  onQuickCopy,
  isQuickCopying,
  quickCopied,
  activeTab,
  setActiveTab,
  isControlsOpen,
  setIsControlsOpen,
}) => {
  return (
    <header className="h-14 border-b border-white/10 bg-[#0e121b]/90 backdrop-blur-md px-4 flex items-center justify-between z-30 select-none">
      {/* Brand logo & tagline */}
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-xl bg-gradient-to-tr from-purple-600 via-indigo-500 to-pink-500 flex items-center justify-center shadow-lg shadow-purple-500/25 ring-1 ring-white/20">
            <Sparkles className="h-4 w-4 text-white" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-bold text-base text-white tracking-tight">MarkSnap</span>
              <span className="px-1.5 py-0.2 rounded-full text-[10px] font-semibold bg-purple-500/20 text-purple-300 border border-purple-500/30">
                PRO
              </span>
            </div>
            <p className="hidden md:block text-[10px] text-gray-400">
              Markdown to Rich Image Studio
            </p>
          </div>
        </div>
      </div>

      {/* Center View Selector for Responsive */}
      <div className="flex items-center rounded-xl bg-white/5 border border-white/10 p-0.5">
        <button
          type="button"
          onClick={() => setActiveTab('editor')}
          className={`flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-medium transition-colors ${
            activeTab === 'editor'
              ? 'bg-purple-600 text-white shadow-xs'
              : 'text-gray-400 hover:text-white'
          }`}
          title="Markdown Editor"
        >
          <Code className="h-3.5 w-3.5" />
          <span className="hidden sm:inline">Editor</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('split')}
          className={`hidden lg:flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-medium transition-colors ${
            activeTab === 'split'
              ? 'bg-purple-600 text-white shadow-xs'
              : 'text-gray-400 hover:text-white'
          }`}
          title="Split View"
        >
          <Columns className="h-3.5 w-3.5" />
          <span>Split</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('preview')}
          className={`flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-medium transition-colors ${
            activeTab === 'preview'
              ? 'bg-purple-600 text-white shadow-xs'
              : 'text-gray-400 hover:text-white'
          }`}
          title="Live Preview"
        >
          <Eye className="h-3.5 w-3.5" />
          <span className="hidden sm:inline">Preview</span>
        </button>
      </div>

      {/* Right Controls & Export Buttons */}
      <div className="flex items-center gap-2">
        {/* Toggle Controls Sidepanel (mobile/tablet/desktop) */}
        <button
          type="button"
          onClick={() => setIsControlsOpen(!isControlsOpen)}
          className={`p-2 rounded-xl border transition-colors ${
            isControlsOpen
              ? 'border-purple-500 bg-purple-500/20 text-purple-300'
              : 'border-white/10 bg-white/5 text-gray-300 hover:bg-white/10'
          }`}
          title="Customize Theme & Frame"
        >
          <SlidersHorizontal className="h-4 w-4" />
        </button>

        {/* Templates */}
        <button
          type="button"
          onClick={onOpenTemplates}
          className="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white text-xs font-medium transition-colors"
        >
          <Layers className="h-3.5 w-3.5 text-purple-400" />
          <span>Templates</span>
        </button>

        {/* Netlify Deploy Guide */}
        <button
          type="button"
          onClick={onOpenNetlify}
          className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-xl border border-[#00ad9f]/30 bg-[#00ad9f]/10 hover:bg-[#00ad9f]/20 text-[#00ad9f] text-xs font-medium transition-colors"
          title="Host on Netlify"
        >
          <Cloud className="h-3.5 w-3.5" />
          <span className="hidden sm:inline">Netlify</span>
        </button>

        {/* Quick Copy */}
        <button
          type="button"
          onClick={onQuickCopy}
          disabled={isQuickCopying}
          className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-white/15 bg-white/10 hover:bg-white/15 text-white text-xs font-medium transition-colors disabled:opacity-50"
          title="Copy Image Directly to Clipboard"
        >
          {quickCopied ? (
            <>
              <Check className="h-3.5 w-3.5 text-emerald-400" />
              <span className="text-emerald-400">Copied!</span>
            </>
          ) : (
            <>
              <Copy className="h-3.5 w-3.5 text-purple-400" />
              <span>Copy</span>
            </>
          )}
        </button>

        {/* Export / Download */}
        <button
          type="button"
          onClick={onOpenExport}
          className="flex items-center gap-1.5 px-3 sm:px-4 py-1.5 rounded-xl bg-gradient-to-r from-purple-600 via-indigo-600 to-pink-600 hover:from-purple-500 hover:to-indigo-500 text-white text-xs font-semibold shadow-md shadow-purple-600/30 transition-all hover:scale-105"
        >
          <Download className="h-3.5 w-3.5" />
          <span>Export</span>
        </button>
      </div>
    </header>
  );
};
