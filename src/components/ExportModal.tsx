import React, { useState } from 'react';
import { 
  X, 
  Download, 
  Copy, 
  Check, 
  Loader2, 
  FileImage 
} from 'lucide-react';
import type { ExportFormat } from '../utils/exportImage';
import { exportCanvasAsImage, copyCanvasToClipboard } from '../utils/exportImage';

interface ExportModalProps {
  isOpen: boolean;
  onClose: () => void;
  canvasElement: HTMLElement | null;
  defaultTitle: string;
  defaultScale: 1 | 2 | 3;
}

export const ExportModal: React.FC<ExportModalProps> = ({
  isOpen,
  onClose,
  canvasElement,
  defaultTitle,
  defaultScale,
}) => {
  const [format, setFormat] = useState<ExportFormat>('png');
  const [scale, setScale] = useState<number>(defaultScale);
  const [filename, setFilename] = useState<string>(
    defaultTitle.replace(/\.[^/.]+$/, '') || 'marksnap-snapshot'
  );
  const [isExporting, setIsExporting] = useState(false);
  const [copied, setCopied] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleDownload = async () => {
    if (!canvasElement) return;
    setIsExporting(true);
    setErrorMsg(null);

    try {
      await exportCanvasAsImage(canvasElement, {
        format,
        scale,
        filename: filename || 'marksnap-render',
      });
      setTimeout(() => {
        onClose();
      }, 500);
    } catch (err: unknown) {
      console.error(err);
      setErrorMsg('Failed to export image. Please try again.');
    } finally {
      setIsExporting(false);
    }
  };

  const handleCopyClipboard = async () => {
    if (!canvasElement) return;
    setIsExporting(true);
    setErrorMsg(null);

    try {
      await copyCanvasToClipboard(canvasElement, scale);
      setCopied(true);
      setTimeout(() => {
        setCopied(false);
        onClose();
      }, 1200);
    } catch (err: unknown) {
      console.error(err);
      setErrorMsg('Could not copy directly to clipboard. You can download the image instead.');
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-fade-in">
      <div className="w-full max-w-md rounded-2xl bg-[#141824] border border-white/10 shadow-2xl overflow-hidden flex flex-col">
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/10">
          <div className="flex items-center gap-2">
            <FileImage className="h-5 w-5 text-purple-400" />
            <h2 className="text-base font-semibold text-white">Export Image</h2>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-gray-400 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-5 text-sm text-gray-200">
          {/* Format selection */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-gray-400 mb-2">
              Image Format
            </label>
            <div className="grid grid-cols-3 gap-2">
              {(
                [
                  { id: 'png', name: 'PNG', badge: 'High-res' },
                  { id: 'jpeg', name: 'JPEG', badge: 'Compact' },
                  { id: 'svg', name: 'SVG', badge: 'Vector' },
                ] as const
              ).map((f) => (
                <button
                  key={f.id}
                  type="button"
                  onClick={() => setFormat(f.id)}
                  className={`p-3 rounded-xl border flex flex-col items-center gap-1 transition-all ${
                    format === f.id
                      ? 'border-purple-500 bg-purple-500/20 text-purple-200 shadow-md'
                      : 'border-white/10 bg-white/5 hover:bg-white/10 text-gray-400'
                  }`}
                >
                  <span className="font-bold text-sm">{f.name}</span>
                  <span className="text-[10px] opacity-70">{f.badge}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Scale Resolution Selection */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-gray-400 mb-2">
              Resolution Scale
            </label>
            <div className="grid grid-cols-3 gap-2">
              {[1, 2, 3].map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => setScale(s)}
                  className={`py-2 rounded-xl border flex flex-col items-center gap-0.5 transition-all ${
                    scale === s
                      ? 'border-purple-500 bg-purple-500/20 text-purple-200 shadow-md'
                      : 'border-white/10 bg-white/5 hover:bg-white/10 text-gray-400'
                  }`}
                >
                  <span className="font-semibold text-xs">{s}x</span>
                  <span className="text-[10px] opacity-70">
                    {s === 1 ? '1080p' : s === 2 ? 'Retina 2x' : 'Ultra 4K'}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Filename input */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-gray-400 mb-1.5">
              File Name
            </label>
            <div className="flex items-center rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-xs">
              <input
                type="text"
                value={filename}
                onChange={(e) => setFilename(e.target.value)}
                placeholder="marksnap-render"
                className="bg-transparent flex-1 text-white outline-none font-mono"
              />
              <span className="text-gray-500 font-mono">.{format}</span>
            </div>
          </div>

          {errorMsg && (
            <div className="p-3 rounded-xl bg-red-500/20 border border-red-500/30 text-red-300 text-xs">
              {errorMsg}
            </div>
          )}
        </div>

        {/* Modal Actions */}
        <div className="p-6 pt-0 space-y-2">
          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={handleCopyClipboard}
              disabled={isExporting}
              className="flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl border border-white/15 bg-white/10 hover:bg-white/20 text-white font-medium text-xs transition-colors disabled:opacity-50"
            >
              {copied ? (
                <>
                  <Check className="h-4 w-4 text-emerald-400" />
                  <span className="text-emerald-400">Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="h-4 w-4 text-purple-400" />
                  <span>Copy Image</span>
                </>
              )}
            </button>

            <button
              type="button"
              onClick={handleDownload}
              disabled={isExporting}
              className="flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-semibold text-xs shadow-lg shadow-purple-600/30 transition-all disabled:opacity-50"
            >
              {isExporting ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  <span>Rendering...</span>
                </>
              ) : (
                <>
                  <Download className="h-4 w-4" />
                  <span>Download Image</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
