import { useState, useRef } from 'react';
import { Navbar } from './components/Navbar';
import { Editor } from './components/Editor';
import { PreviewCanvas } from './components/PreviewCanvas';
import { ControlsPanel } from './components/ControlsPanel';
import { TemplatePickerModal } from './components/TemplatePickerModal';
import { ExportModal } from './components/ExportModal';
import { NetlifyDeployModal } from './components/NetlifyDeployModal';
import { DEFAULT_CONFIG } from './constants/themes';
import { MARKDOWN_TEMPLATES } from './constants/templates';
import type { CanvasConfig, MarkdownTemplate } from './types';
import { copyCanvasToClipboard } from './utils/exportImage';
import { X } from 'lucide-react';

export default function App() {
  const [markdown, setMarkdown] = useState<string>(MARKDOWN_TEMPLATES[0].markdown);
  const [config, setConfig] = useState<CanvasConfig>({
    ...DEFAULT_CONFIG,
    title: MARKDOWN_TEMPLATES[0].suggestedConfig?.title || 'feature-showcase.md',
  });

  const [activeTab, setActiveTab] = useState<'split' | 'editor' | 'preview'>('split');
  const [isControlsOpen, setIsControlsOpen] = useState(true);
  const [isTemplatesModalOpen, setIsTemplatesModalOpen] = useState(false);
  const [isExportModalOpen, setIsExportModalOpen] = useState(false);
  const [isNetlifyModalOpen, setIsNetlifyModalOpen] = useState(false);

  const [isQuickCopying, setIsQuickCopying] = useState(false);
  const [quickCopied, setQuickCopied] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const canvasRef = useRef<HTMLDivElement>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleConfigChange = (updated: Partial<CanvasConfig>) => {
    setConfig((prev) => ({ ...prev, ...updated }));
  };

  const handleQuickCopy = async () => {
    const el = canvasRef.current;
    if (!el) return;

    setIsQuickCopying(true);
    try {
      await copyCanvasToClipboard(el, config.exportScale);
      setQuickCopied(true);
      showToast('Image copied directly to clipboard!');
      setTimeout(() => setQuickCopied(false), 2000);
    } catch {
      showToast('Clipboard copy not supported. Use the Export button instead.');
    } finally {
      setIsQuickCopying(false);
    }
  };

  const handleSelectTemplate = (template: MarkdownTemplate) => {
    setMarkdown(template.markdown);
    if (template.suggestedConfig) {
      setConfig((prev) => ({ ...prev, ...template.suggestedConfig }));
    }
    showToast(`Loaded "${template.name}" template`);
  };

  const handleUploadFile = (filename: string, content: string) => {
    setMarkdown(content);
    setConfig((prev) => ({ ...prev, title: filename }));
    showToast(`Loaded ${filename}`);
  };

  const handleReset = () => {
    setMarkdown(MARKDOWN_TEMPLATES[0].markdown);
    setConfig(DEFAULT_CONFIG);
    showToast('Reset to default template');
  };

  return (
    <div className="flex flex-col h-screen w-screen bg-[#090b10] text-gray-100 overflow-hidden select-none">
      {/* Top Navigation */}
      <Navbar
        onOpenTemplates={() => setIsTemplatesModalOpen(true)}
        onOpenExport={() => setIsExportModalOpen(true)}
        onOpenNetlify={() => setIsNetlifyModalOpen(true)}
        onQuickCopy={handleQuickCopy}
        isQuickCopying={isQuickCopying}
        quickCopied={quickCopied}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        isControlsOpen={isControlsOpen}
        setIsControlsOpen={setIsControlsOpen}
      />

      {/* Main Workspace Area */}
      <div className="flex-1 flex overflow-hidden relative">
        {/* Left Side: Markdown Editor (hidden if preview tab selected on small screens) */}
        <div
          className={`${
            activeTab === 'preview' ? 'hidden' : 'flex'
          } ${
            activeTab === 'split' ? 'w-full lg:w-[45%]' : 'w-full'
          } flex-col h-full border-r border-white/10`}
        >
          <Editor
            value={markdown}
            onChange={setMarkdown}
            onReset={handleReset}
            onLoadTemplate={() => setIsTemplatesModalOpen(true)}
            onUploadFile={handleUploadFile}
          />
        </div>

        {/* Middle: Canvas Live Preview */}
        <div
          className={`${
            activeTab === 'editor' ? 'hidden' : 'flex'
          } flex-1 flex flex-col h-full bg-[#0d1017] overflow-auto relative`}
        >
          <div className="flex-1 flex items-center justify-center p-4 min-h-[500px]">
            <PreviewCanvas
              ref={canvasRef}
              markdown={markdown}
              config={config}
            />
          </div>
        </div>

        {/* Right Side: Floating / Docked Controls Panel */}
        {isControlsOpen && (
          <aside className="w-80 border-l border-white/10 h-full bg-[#10141f] shadow-2xl flex flex-col z-20 transition-all absolute right-0 top-0 bottom-0 lg:relative">
            <div className="flex items-center justify-between px-4 py-3 border-b border-white/10 bg-[#141926]">
              <span className="font-semibold text-xs tracking-wider text-white uppercase">
                Customization Studio
              </span>
              <button
                type="button"
                onClick={() => setIsControlsOpen(false)}
                className="p-1 rounded-md text-gray-400 hover:text-white hover:bg-white/10"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto">
              <ControlsPanel config={config} onChange={handleConfigChange} />
            </div>
          </aside>
        )}
      </div>

      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-5 left-1/2 -translate-x-1/2 z-50 bg-[#1c2233] border border-purple-500/40 text-purple-200 px-4 py-2 rounded-xl shadow-2xl text-xs font-medium flex items-center gap-2 animate-bounce">
          <span className="h-2 w-2 rounded-full bg-purple-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Modals */}
      <TemplatePickerModal
        isOpen={isTemplatesModalOpen}
        onClose={() => setIsTemplatesModalOpen(false)}
        onSelectTemplate={handleSelectTemplate}
      />

      <ExportModal
        isOpen={isExportModalOpen}
        onClose={() => setIsExportModalOpen(false)}
        canvasElement={canvasRef.current}
        defaultTitle={config.title}
        defaultScale={config.exportScale}
      />

      <NetlifyDeployModal
        isOpen={isNetlifyModalOpen}
        onClose={() => setIsNetlifyModalOpen(false)}
      />
    </div>
  );
}
