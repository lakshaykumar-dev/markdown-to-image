import React from 'react';
import { X, Sparkles, Code2, Tag, Sigma, CheckSquare, Quote } from 'lucide-react';
import { MARKDOWN_TEMPLATES } from '../constants/templates';
import type { MarkdownTemplate } from '../types';

interface TemplatePickerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectTemplate: (template: MarkdownTemplate) => void;
}

export const TemplatePickerModal: React.FC<TemplatePickerModalProps> = ({
  isOpen,
  onClose,
  onSelectTemplate,
}) => {
  if (!isOpen) return null;

  const renderIcon = (iconName: string) => {
    switch (iconName) {
      case 'Sparkles':
        return <Sparkles className="h-5 w-5 text-purple-400" />;
      case 'Code2':
        return <Code2 className="h-5 w-5 text-blue-400" />;
      case 'Tag':
        return <Tag className="h-5 w-5 text-emerald-400" />;
      case 'Sigma':
        return <Sigma className="h-5 w-5 text-pink-400" />;
      case 'CheckSquare':
        return <CheckSquare className="h-5 w-5 text-amber-400" />;
      case 'Quote':
      default:
        return <Quote className="h-5 w-5 text-cyan-400" />;
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-fade-in">
      <div className="w-full max-w-2xl rounded-2xl bg-[#141824] border border-white/10 shadow-2xl overflow-hidden flex flex-col max-h-[85vh]">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/10">
          <div className="flex items-center gap-2.5">
            <Sparkles className="h-5 w-5 text-purple-400" />
            <h2 className="text-base font-semibold text-white">Choose a Markdown Preset</h2>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-gray-400 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Templates Grid */}
        <div className="p-6 overflow-y-auto grid grid-cols-1 sm:grid-cols-2 gap-4">
          {MARKDOWN_TEMPLATES.map((tmpl) => (
            <div
              key={tmpl.id}
              onClick={() => {
                onSelectTemplate(tmpl);
                onClose();
              }}
              className="group cursor-pointer rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 hover:border-purple-500/50 p-4 transition-all hover:scale-[1.02] flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 rounded-lg bg-black/30 border border-white/5">
                    {renderIcon(tmpl.icon)}
                  </div>
                  <h3 className="font-semibold text-sm text-white group-hover:text-purple-300 transition-colors">
                    {tmpl.name}
                  </h3>
                </div>
                <p className="text-xs text-gray-400 leading-relaxed">
                  {tmpl.description}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between text-[11px] text-gray-500 font-mono">
                <span>{tmpl.markdown.split('\n').length} lines</span>
                <span className="text-purple-400 font-sans font-medium group-hover:translate-x-1 transition-transform">
                  Apply Preset →
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
