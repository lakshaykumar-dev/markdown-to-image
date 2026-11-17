import React, { useRef, useState } from 'react';
import { 
  Bold, 
  Italic, 
  Code, 
  List, 
  CheckSquare, 
  Table, 
  Quote, 
  Upload, 
  RotateCcw, 
  Trash2, 
  Sparkles, 
  Sigma
} from 'lucide-react';

interface EditorProps {
  value: string;
  onChange: (val: string) => void;
  onReset: () => void;
  onLoadTemplate: () => void;
  onUploadFile: (filename: string, content: string) => void;
}

export const Editor: React.FC<EditorProps> = ({
  value,
  onChange,
  onReset,
  onLoadTemplate,
  onUploadFile,
}) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  // Helper to insert markdown syntax at cursor position
  const insertSyntax = (prefix: string, suffix: string = '', defaultText: string = '') => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = value.substring(start, end) || defaultText;

    const replacement = `${prefix}${selectedText}${suffix}`;
    const newValue = value.substring(0, start) + replacement + value.substring(end);
    onChange(newValue);

    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(
        start + prefix.length,
        start + prefix.length + selectedText.length
      );
    }, 0);
  };

  const handleFileUpload = (file: File) => {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      const content = e.target?.result as string;
      if (content !== undefined) {
        onUploadFile(file.name, content);
      }
    };
    reader.readAsText(file);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFileUpload(file);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) {
      handleFileUpload(file);
    }
  };

  const wordCount = value.trim() ? value.trim().split(/\s+/).length : 0;
  const lineCount = value.split('\n').length;

  return (
    <div className="flex flex-col h-full bg-[#11141d] border-r border-white/10 select-none">
      {/* Top Editor Toolbar */}
      <div className="flex flex-wrap items-center justify-between border-b border-white/10 px-3 py-2 bg-[#161a26] text-gray-300 gap-1.5">
        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={() => insertSyntax('**', '**', 'bold text')}
            className="p-1.5 rounded-md hover:bg-white/10 hover:text-white transition-colors"
            title="Bold (**text**)"
          >
            <Bold className="h-4 w-4" />
          </button>
          <button
            type="button"
            onClick={() => insertSyntax('*', '*', 'italic text')}
            className="p-1.5 rounded-md hover:bg-white/10 hover:text-white transition-colors"
            title="Italic (*text*)"
          >
            <Italic className="h-4 w-4" />
          </button>
          <button
            type="button"
            onClick={() => insertSyntax('```typescript\n', '\n```', 'console.log("hello world");')}
            className="p-1.5 rounded-md hover:bg-white/10 hover:text-white transition-colors"
            title="Code Block"
          >
            <Code className="h-4 w-4" />
          </button>
          <button
            type="button"
            onClick={() => insertSyntax('\n> [!NOTE]\n> ', '', 'Your important message')}
            className="p-1.5 rounded-md hover:bg-white/10 hover:text-white transition-colors text-blue-400"
            title="GitHub Alert Callout"
          >
            <Quote className="h-4 w-4" />
          </button>
          <button
            type="button"
            onClick={() => insertSyntax('\n- ', '', 'List item')}
            className="p-1.5 rounded-md hover:bg-white/10 hover:text-white transition-colors"
            title="Bullet List"
          >
            <List className="h-4 w-4" />
          </button>
          <button
            type="button"
            onClick={() => insertSyntax('\n- [x] ', '', 'Completed task')}
            className="p-1.5 rounded-md hover:bg-white/10 hover:text-white transition-colors text-emerald-400"
            title="Task Checklist"
          >
            <CheckSquare className="h-4 w-4" />
          </button>
          <button
            type="button"
            onClick={() =>
              insertSyntax(
                '\n| Header 1 | Header 2 |\n| :--- | :--- |\n| Row 1 | Data 1 |\n| Row 2 | Data 2 |\n'
              )
            }
            className="p-1.5 rounded-md hover:bg-white/10 hover:text-white transition-colors"
            title="Insert Table"
          >
            <Table className="h-4 w-4" />
          </button>
          <button
            type="button"
            onClick={() => insertSyntax('$$', '$$', 'E = mc^2')}
            className="p-1.5 rounded-md hover:bg-white/10 hover:text-white transition-colors text-purple-400"
            title="LaTeX Math Formula"
          >
            <Sigma className="h-4 w-4" />
          </button>
        </div>

        {/* Quick action buttons */}
        <div className="flex items-center gap-1.5">
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            accept=".md,.markdown,.txt"
            className="hidden"
          />
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium rounded-md bg-white/10 hover:bg-white/15 text-white transition-colors border border-white/10"
            title="Upload .md file"
          >
            <Upload className="h-3.5 w-3.5 text-purple-400" />
            <span className="hidden sm:inline">Upload .md</span>
          </button>
          <button
            type="button"
            onClick={onLoadTemplate}
            className="flex items-center gap-1 px-2.5 py-1 text-xs font-medium rounded-md bg-purple-600/30 hover:bg-purple-600/40 text-purple-300 transition-colors border border-purple-500/30"
            title="Browse Templates"
          >
            <Sparkles className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">Templates</span>
          </button>
          <button
            type="button"
            onClick={onReset}
            className="p-1 rounded-md hover:bg-white/10 text-gray-400 hover:text-white transition-colors"
            title="Reset to default"
          >
            <RotateCcw className="h-3.5 w-3.5" />
          </button>
          <button
            type="button"
            onClick={() => onChange('')}
            className="p-1 rounded-md hover:bg-red-500/20 text-gray-400 hover:text-red-400 transition-colors"
            title="Clear all"
          >
            <Trash2 className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>

      {/* Editor Body with Drag & Drop */}
      <div
        className={`relative flex-1 p-3 transition-all ${
          isDragging ? 'bg-purple-950/20 ring-2 ring-purple-500 ring-inset' : ''
        }`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <textarea
          ref={textareaRef}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="# Type or paste Markdown here...&#10;&#10;Drop any .md file to instantly preview!"
          className="w-full h-full bg-transparent text-gray-200 placeholder-gray-500 font-mono text-[13.5px] leading-relaxed resize-none outline-none selection:bg-purple-600/40"
          spellCheck={false}
        />

        {isDragging && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/70 backdrop-blur-xs pointer-events-none text-purple-300">
            <Upload className="h-10 w-10 mb-2 animate-bounce" />
            <p className="font-semibold text-sm">Drop your .md file here to import</p>
          </div>
        )}
      </div>

      {/* Editor Footer Status */}
      <div className="flex items-center justify-between border-t border-white/10 px-4 py-2 text-[11px] font-mono text-gray-400 bg-[#0d1017]">
        <div className="flex items-center gap-3">
          <span>{lineCount} lines</span>
          <span>•</span>
          <span>{wordCount} words</span>
          <span>•</span>
          <span>{value.length} chars</span>
        </div>
        <div className="text-[11px] text-gray-500">
          Markdown • GFM • KaTeX
        </div>
      </div>
    </div>
  );
};
