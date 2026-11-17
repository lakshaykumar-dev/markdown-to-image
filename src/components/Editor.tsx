import React, { useRef } from 'react';
import { 
  Bold, 
  Italic, 
  Code, 
  List, 
  CheckSquare, 
  Quote, 
  Upload, 
  Trash2, 
  Sparkles,
  ArrowRight
} from 'lucide-react';

interface EditorProps {
  value: string;
  onChange: (val: string) => void;
  onOpenTemplates: () => void;
  onGoToPreview?: () => void;
  onUploadFile: (filename: string, content: string) => void;
}

export const Editor: React.FC<EditorProps> = ({
  value,
  onChange,
  onOpenTemplates,
  onGoToPreview,
  onUploadFile,
}) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

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

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      const content = ev.target?.result as string;
      if (content !== undefined) {
        onUploadFile(file.name, content);
      }
    };
    reader.readAsText(file);
  };

  return (
    <div className="flex flex-col h-full bg-[#0d1017]">
      {/* Horizontal Touch-friendly Toolbar */}
      <div className="flex items-center gap-1.5 p-2 bg-[#121622] border-b border-white/10 overflow-x-auto select-none shrink-0">
        <button
          type="button"
          onClick={onOpenTemplates}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-purple-600/25 border border-purple-500/40 text-purple-300 text-xs font-medium whitespace-nowrap active:scale-95 transition-all"
        >
          <Sparkles className="h-3.5 w-3.5" />
          <span>Templates</span>
        </button>

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
          className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-white/5 border border-white/10 text-gray-300 text-xs whitespace-nowrap active:scale-95"
          title="Import .md file"
        >
          <Upload className="h-3.5 w-3.5" />
          <span>Upload</span>
        </button>

        <div className="h-4 w-px bg-white/10 mx-1 shrink-0" />

        <button
          type="button"
          onClick={() => insertSyntax('**', '**', 'bold text')}
          className="p-2 rounded-lg bg-white/5 text-gray-300 hover:text-white active:scale-95"
          title="Bold"
        >
          <Bold className="h-3.5 w-3.5" />
        </button>

        <button
          type="button"
          onClick={() => insertSyntax('*', '*', 'italic text')}
          className="p-2 rounded-lg bg-white/5 text-gray-300 hover:text-white active:scale-95"
          title="Italic"
        >
          <Italic className="h-3.5 w-3.5" />
        </button>

        <button
          type="button"
          onClick={() => insertSyntax('```typescript\n', '\n```', 'console.log("hello");')}
          className="p-2 rounded-lg bg-white/5 text-gray-300 hover:text-white active:scale-95"
          title="Code Block"
        >
          <Code className="h-3.5 w-3.5" />
        </button>

        <button
          type="button"
          onClick={() => insertSyntax('\n> [!NOTE]\n> ', '', 'Note message')}
          className="p-2 rounded-lg bg-white/5 text-blue-400 active:scale-95"
          title="Note Callout"
        >
          <Quote className="h-3.5 w-3.5" />
        </button>

        <button
          type="button"
          onClick={() => insertSyntax('\n- ', '', 'List item')}
          className="p-2 rounded-lg bg-white/5 text-gray-300 active:scale-95"
          title="List"
        >
          <List className="h-3.5 w-3.5" />
        </button>

        <button
          type="button"
          onClick={() => insertSyntax('\n- [x] ', '', 'Done task')}
          className="p-2 rounded-lg bg-white/5 text-emerald-400 active:scale-95"
          title="Checklist"
        >
          <CheckSquare className="h-3.5 w-3.5" />
        </button>

        <button
          type="button"
          onClick={() => onChange('')}
          className="p-2 rounded-lg bg-white/5 text-red-400/80 hover:text-red-400 active:scale-95 ml-auto"
          title="Clear text"
        >
          <Trash2 className="h-3.5 w-3.5" />
        </button>
      </div>

      {/* Editor Body */}
      <div className="flex-1 p-3 relative">
        <textarea
          ref={textareaRef}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="# Type or paste Markdown here..."
          className="w-full h-full bg-transparent text-gray-200 placeholder-gray-500 font-mono text-[16px] sm:text-[14px] leading-relaxed resize-none outline-none selection:bg-purple-600/40"
          spellCheck={false}
        />
      </div>

      {/* Mobile Bottom Quick Switch Button */}
      {onGoToPreview && (
        <div className="p-3 bg-[#121622] border-t border-white/10 lg:hidden">
          <button
            type="button"
            onClick={onGoToPreview}
            className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-semibold text-sm flex items-center justify-center gap-2 shadow-lg shadow-purple-600/30 active:scale-[0.98] transition-all"
          >
            <span>Preview & Export Image</span>
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      )}
    </div>
  );
};
