import { useState, useRef } from 'react';
import { Navbar } from './components/Navbar';
import { Editor } from './components/Editor';
import { PreviewCanvas } from './components/PreviewCanvas';
import { QuickControls } from './components/QuickControls';
import { TemplatePickerModal } from './components/TemplatePickerModal';
import { DEFAULT_CONFIG } from './constants/themes';
import { MARKDOWN_TEMPLATES } from './constants/templates';
import type { CanvasConfig, MarkdownTemplate } from './types';
import { copyCanvasToClipboard, exportCanvasAsImage } from './utils/exportImage';
import { Copy, Download, Check, Loader2 } from 'lucide-react';

export default function App() {
  const [markdown, setMarkdown] = useState<string>(MARKDOWN_TEMPLATES[0].markdown);
  const [config, setConfig] = useState<CanvasConfig>(DEFAULT_CONFIG);

  const [activeTab, setActiveTab] = useState<'editor' | 'preview'>('editor');
  const [isTemplatesOpen, setIsTemplatesOpen] = useState(false);

  const [isCopying, setIsCopying] = useState(false);
  const [copied, setCopied] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const canvasRef = useRef<HTMLDivElement>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 2500);
  };

  const handleConfigChange = (updated: Partial<CanvasConfig>) => {
    setConfig((prev) => ({ ...prev, ...updated }));
  };

  const handleCopyImage = async () => {
    const el = canvasRef.current;
    if (!el) {
      setActiveTab('preview');
      setTimeout(() => handleCopyImage(), 200);
      return;
    }

    setIsCopying(true);
    try {
      await copyCanvasToClipboard(el, config.exportScale);
      setCopied(true);
      showToast('Image copied to clipboard! Ready to paste.');
      setTimeout(() => setCopied(false), 2000);
    } catch {
      showToast('Clipboard copy not supported. Downloading image instead...');
      handleDownloadImage();
    } finally {
      setIsCopying(false);
    }
  };

  const handleDownloadImage = async () => {
    const el = canvasRef.current;
    if (!el) {
      setActiveTab('preview');
      setTimeout(() => handleDownloadImage(), 200);
      return;
    }

    setIsDownloading(true);
    try {
      await exportCanvasAsImage(el, {
        scale: config.exportScale,
        filename: config.title.replace(/\.[^/.]+$/, '') || 'marksnap',
        format: 'png',
      });
      showToast('Downloaded high-resolution PNG!');
    } catch {
      showToast('Failed to export image.');
    } finally {
      setIsDownloading(false);
    }
  };

  const handleSelectTemplate = (template: MarkdownTemplate) => {
    setMarkdown(template.markdown);
    showToast(`Loaded ${template.name}`);
  };

  const handleUploadFile = (filename: string, content: string) => {
    setMarkdown(content);
    setConfig((prev) => ({ ...prev, title: filename }));
    showToast(`Imported ${filename}`);
  };

  return (
    <div className="flex flex-col h-[100dvh] w-screen bg-[#090b10] text-gray-100 overflow-hidden select-none">
      {/* Top Navbar */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onCopyImage={handleCopyImage}
        onDownloadImage={handleDownloadImage}
        isCopying={isCopying}
        copied={copied}
        isDownloading={isDownloading}
      />

      {/* Main Container */}
      <div className="flex-1 flex overflow-hidden relative">
        {/* Editor Screen */}
        <div
          className={`${
            activeTab === 'editor' ? 'flex' : 'hidden'
          } lg:flex lg:w-1/2 w-full flex-col h-full border-r border-white/10`}
        >
          <Editor
            value={markdown}
            onChange={setMarkdown}
            onOpenTemplates={() => setIsTemplatesOpen(true)}
            onGoToPreview={() => setActiveTab('preview')}
            onUploadFile={handleUploadFile}
          />
        </div>

        {/* Preview Screen */}
        <div
          className={`${
            activeTab === 'preview' ? 'flex' : 'hidden'
          } lg:flex lg:w-1/2 w-full flex-col h-full bg-[#090c14] overflow-hidden`}
        >
          {/* Scrollable Canvas View */}
          <div className="flex-1 overflow-y-auto p-3 sm:p-6 flex items-center justify-center">
            <PreviewCanvas
              ref={canvasRef}
              markdown={markdown}
              config={config}
            />
          </div>

          {/* Quick Style Customization Bar */}
          <QuickControls
            config={config}
            onChange={handleConfigChange}
          />

          {/* Mobile Bottom Action Bar */}
          <div className="p-3 bg-[#0d1017] border-t border-white/10 flex items-center gap-2 lg:hidden shrink-0">
            <button
              type="button"
              onClick={handleCopyImage}
              disabled={isCopying}
              className="flex-1 py-3 px-4 rounded-xl border border-white/15 bg-white/10 active:scale-95 text-white font-semibold text-xs flex items-center justify-center gap-1.5 transition-all disabled:opacity-50"
            >
              {copied ? (
                <>
                  <Check className="h-4 w-4 text-emerald-400" />
                  <span className="text-emerald-400">Copied!</span>
                </>
              ) : isCopying ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  <span>Copying...</span>
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
              onClick={handleDownloadImage}
              disabled={isDownloading}
              className="flex-1 py-3 px-4 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 active:scale-95 text-white font-semibold text-xs flex items-center justify-center gap-1.5 shadow-md shadow-purple-600/30 transition-all disabled:opacity-50"
            >
              {isDownloading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Download className="h-4 w-4" />
              )}
              <span>Download PNG</span>
            </button>
          </div>
        </div>
      </div>

      {/* Floating Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-16 sm:bottom-6 left-1/2 -translate-x-1/2 z-50 bg-[#1e2333] border border-purple-500/40 text-purple-200 px-4 py-2 rounded-xl shadow-2xl text-xs font-medium flex items-center gap-2 animate-fade-in pointer-events-none">
          <span className="h-2 w-2 rounded-full bg-purple-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Templates Modal */}
      <TemplatePickerModal
        isOpen={isTemplatesOpen}
        onClose={() => setIsTemplatesOpen(false)}
        onSelectTemplate={handleSelectTemplate}
      />
    </div>
  );
}
