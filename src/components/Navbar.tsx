import React from 'react';
import { 
  Sparkles, 
  Copy, 
  Download, 
  Check, 
  PenTool, 
  Eye, 
  Loader2 
} from 'lucide-react';

interface NavbarProps {
  activeTab: 'editor' | 'preview';
  setActiveTab: (tab: 'editor' | 'preview') => void;
  onCopyImage: () => void;
  onDownloadImage: () => void;
  isCopying: boolean;
  copied: boolean;
  isDownloading: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  onCopyImage,
  onDownloadImage,
  isCopying,
  copied,
  isDownloading,
}) => {
  return (
    <header className="h-14 border-b border-white/10 bg-[#0e121b] px-3 sm:px-4 flex items-center justify-between select-none shrink-0 z-30">
      {/* Brand logo */}
      <div className="flex items-center gap-2">
        <div className="h-7 w-7 rounded-lg bg-gradient-to-tr from-purple-600 to-pink-500 flex items-center justify-center shadow-md shadow-purple-500/30">
          <Sparkles className="h-4 w-4 text-white" />
        </div>
        <span className="font-bold text-sm sm:text-base text-white tracking-tight">
          MarkSnap
        </span>
      </div>

      {/* Center Segment Tabs: Write vs Preview */}
      <div className="flex items-center bg-white/5 border border-white/10 rounded-xl p-0.5">
        <button
          type="button"
          onClick={() => setActiveTab('editor')}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
            activeTab === 'editor'
              ? 'bg-purple-600 text-white shadow-xs'
              : 'text-gray-400 hover:text-white'
          }`}
        >
          <PenTool className="h-3.5 w-3.5" />
          <span>Write</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('preview')}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
            activeTab === 'preview'
              ? 'bg-purple-600 text-white shadow-xs'
              : 'text-gray-400 hover:text-white'
          }`}
        >
          <Eye className="h-3.5 w-3.5" />
          <span>Preview</span>
        </button>
      </div>

      {/* Quick Action Buttons */}
      <div className="flex items-center gap-1.5">
        {/* Copy Image Button */}
        <button
          type="button"
          onClick={onCopyImage}
          disabled={isCopying}
          className="flex items-center gap-1 px-2.5 sm:px-3 py-1.5 rounded-lg border border-white/15 bg-white/10 hover:bg-white/15 active:scale-95 text-white text-xs font-medium transition-all disabled:opacity-50"
          title="Copy Image to Clipboard"
        >
          {copied ? (
            <>
              <Check className="h-3.5 w-3.5 text-emerald-400" />
              <span className="hidden sm:inline text-emerald-400">Copied!</span>
            </>
          ) : isCopying ? (
            <>
              <Loader2 className="h-3.5 w-3.5 animate-spin" />
              <span className="hidden sm:inline">Copying...</span>
            </>
          ) : (
            <>
              <Copy className="h-3.5 w-3.5 text-purple-400" />
              <span>Copy</span>
            </>
          )}
        </button>

        {/* Download Button */}
        <button
          type="button"
          onClick={onDownloadImage}
          disabled={isDownloading}
          className="flex items-center gap-1 px-2.5 sm:px-3 py-1.5 rounded-lg bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 active:scale-95 text-white text-xs font-semibold shadow-md shadow-purple-600/30 transition-all disabled:opacity-50"
          title="Download PNG Image"
        >
          {isDownloading ? (
            <Loader2 className="h-3.5 w-3.5 animate-spin" />
          ) : (
            <Download className="h-3.5 w-3.5" />
          )}
          <span className="hidden sm:inline">PNG</span>
        </button>
      </div>
    </header>
  );
};
