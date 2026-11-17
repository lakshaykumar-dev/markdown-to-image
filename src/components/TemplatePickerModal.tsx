import React from 'react';
import { X, Sparkles } from 'lucide-react';
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

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/80 backdrop-blur-xs animate-fade-in">
      <div className="w-full sm:max-w-md rounded-t-2xl sm:rounded-2xl bg-[#141824] border border-white/10 shadow-2xl overflow-hidden flex flex-col max-h-[80vh]">
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-white/10">
          <div className="flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-purple-400" />
            <h2 className="text-sm font-semibold text-white">Choose a Template</h2>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-gray-400 hover:text-white"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Templates List */}
        <div className="p-3 overflow-y-auto space-y-2">
          {MARKDOWN_TEMPLATES.map((tmpl) => (
            <button
              key={tmpl.id}
              type="button"
              onClick={() => {
                onSelectTemplate(tmpl);
                onClose();
              }}
              className="w-full text-left p-3 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 active:scale-[0.99] transition-all flex items-center justify-between"
            >
              <div>
                <h3 className="font-semibold text-xs text-white">
                  {tmpl.name}
                </h3>
                <p className="text-[11px] text-gray-400 mt-0.5">
                  {tmpl.description}
                </p>
              </div>
              <span className="text-xs text-purple-400 font-medium shrink-0 ml-2">
                Use →
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
