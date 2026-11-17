import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import { 
  Info, 
  Lightbulb, 
  AlertTriangle, 
  AlertOctagon, 
  Flame, 
  Check, 
  ExternalLink 
} from 'lucide-react';
import { CodeBlock } from './CodeBlock';
import type { CardTheme } from '../types';

interface MarkdownRendererProps {
  content: string;
  theme?: CardTheme;
  showLineNumbers?: boolean;
}

export const MarkdownRenderer: React.FC<MarkdownRendererProps> = ({
  content,
  theme = 'dark',
  showLineNumbers = true,
}) => {
  const isLight = theme === 'light';

  return (
    <div
      className={`markdown-preview-body transition-colors select-text ${
        isLight ? 'text-gray-900' : 'text-gray-100'
      }`}
    >
      <ReactMarkdown
        remarkPlugins={[remarkGfm, remarkMath]}
        rehypePlugins={[rehypeKatex]}
        components={{
          // Code & Syntax Highlighting
          code({ className, children, ...props }) {
            const match = /language-(\w+)/.exec(className || '');
            const isInline = !match && !String(children).includes('\n');

            if (isInline) {
              return (
                <code
                  className={`rounded px-1.5 py-0.5 font-mono text-[0.85em] font-medium border ${
                    isLight
                      ? 'border-gray-200 bg-gray-100 text-pink-600'
                      : 'border-white/10 bg-white/10 text-pink-400'
                  }`}
                  {...props}
                >
                  {children}
                </code>
              );
            }

            return (
              <CodeBlock
                code={String(children)}
                language={match ? match[1] : 'text'}
                showLineNumbers={showLineNumbers}
                theme={isLight ? 'light' : 'dark'}
              />
            );
          },

          // Headers
          h1({ children }) {
            return (
              <h1 className="mt-1 mb-3 text-lg sm:text-2xl font-bold tracking-tight">
                {children}
              </h1>
            );
          },
          h2({ children }) {
            return (
              <h2 className="mt-4 mb-2 text-base sm:text-xl font-bold tracking-tight pb-1 border-b border-white/10">
                {children}
              </h2>
            );
          },
          h3({ children }) {
            return (
              <h3 className="mt-3.5 mb-1.5 text-sm sm:text-lg font-semibold tracking-tight">
                {children}
              </h3>
            );
          },
          h4({ children }) {
            return (
              <h4 className="mt-3 mb-1 text-xs sm:text-base font-semibold">
                {children}
              </h4>
            );
          },

          // Paragraphs & Lists
          p({ children }) {
            return <p className="my-2 leading-relaxed text-xs sm:text-[15px]">{children}</p>;
          },
          ul({ children }) {
            return <ul className="my-2 ml-4 list-disc space-y-1 text-xs sm:text-[15px]">{children}</ul>;
          },
          ol({ children }) {
            return <ol className="my-2 ml-4 list-decimal space-y-1 text-xs sm:text-[15px]">{children}</ol>;
          },
          li({ children, className }) {
            const isTaskList = className?.includes('task-list-item');
            if (isTaskList) {
              return (
                <li className="flex items-start gap-2 my-1 text-xs sm:text-[15px] list-none -ml-4">
                  {children}
                </li>
              );
            }
            return <li className="leading-relaxed">{children}</li>;
          },

          // Checkbox Inputs
          input({ type, checked, ...props }) {
            if (type === 'checkbox') {
              return (
                <span
                  className={`inline-flex items-center justify-center h-3.5 w-3.5 rounded mt-0.5 shrink-0 transition-all ${
                    checked
                      ? 'bg-emerald-500 text-white'
                      : isLight
                      ? 'border border-gray-300 bg-white'
                      : 'border border-white/30 bg-white/5'
                  }`}
                >
                  {checked && <Check className="h-2.5 w-2.5 stroke-[3]" />}
                </span>
              );
            }
            return <input type={type} {...props} />;
          },

          // Blockquotes with GitHub Callouts Parsing
          blockquote({ children }) {
            let alertType: 'note' | 'tip' | 'important' | 'warning' | 'caution' | null = null;
            const displayChildren = children;

            const fullText = React.Children.map(children, (child) => {
              if (React.isValidElement(child) && (child.props as { children?: React.ReactNode })?.children) {
                return (child.props as { children?: React.ReactNode }).children;
              }
              return '';
            })?.join(' ') || '';

            if (fullText.includes('[!NOTE]')) alertType = 'note';
            else if (fullText.includes('[!TIP]')) alertType = 'tip';
            else if (fullText.includes('[!IMPORTANT]')) alertType = 'important';
            else if (fullText.includes('[!WARNING]')) alertType = 'warning';
            else if (fullText.includes('[!CAUTION]')) alertType = 'caution';

            if (alertType) {
              const alertConfigs = {
                note: { title: 'Note', icon: Info, style: 'border-blue-500/40 bg-blue-500/10 text-blue-400' },
                tip: { title: 'Tip', icon: Lightbulb, style: 'border-emerald-500/40 bg-emerald-500/10 text-emerald-400' },
                important: { title: 'Important', icon: Flame, style: 'border-purple-500/40 bg-purple-500/10 text-purple-400' },
                warning: { title: 'Warning', icon: AlertTriangle, style: 'border-amber-500/40 bg-amber-500/10 text-amber-400' },
                caution: { title: 'Caution', icon: AlertOctagon, style: 'border-rose-500/40 bg-rose-500/10 text-rose-400' },
              };

              const cfg = alertConfigs[alertType];
              const IconComp = cfg.icon;

              return (
                <div
                  className={`my-3 rounded-lg border p-3 text-xs sm:text-sm transition-all ${cfg.style}`}
                >
                  <div className="flex items-center gap-1.5 mb-1.5 font-semibold">
                    <IconComp className="h-3.5 w-3.5" />
                    <span className="uppercase text-[10px] tracking-wider font-bold">
                      {cfg.title}
                    </span>
                  </div>
                  <div className={`leading-relaxed ${isLight ? 'text-gray-800' : 'text-gray-200'}`}>
                    {displayChildren}
                  </div>
                </div>
              );
            }

            return (
              <blockquote
                className={`my-3 rounded-r-lg border-l-3 py-1.5 px-3 italic text-xs sm:text-sm ${
                  isLight
                    ? 'border-purple-500 bg-purple-50/50 text-gray-700'
                    : 'border-purple-400 bg-white/5 text-gray-300'
                }`}
              >
                {children}
              </blockquote>
            );
          },

          // Tables
          table({ children }) {
            return (
              <div className="my-3 overflow-x-auto max-w-full rounded-lg border border-white/10">
                <table className="w-full text-left text-xs sm:text-sm border-collapse">
                  {children}
                </table>
              </div>
            );
          },
          thead({ children }) {
            return (
              <thead
                className={`border-b ${
                  isLight ? 'border-gray-200 bg-gray-100 text-gray-800' : 'border-white/10 bg-white/10 text-white'
                }`}
              >
                {children}
              </thead>
            );
          },
          th({ children }) {
            return <th className="px-3 py-2 font-semibold text-[11px] sm:text-xs uppercase">{children}</th>;
          },
          td({ children }) {
            return (
              <td
                className={`px-3 py-2 border-t text-[11px] sm:text-xs ${
                  isLight ? 'border-gray-100' : 'border-white/5'
                }`}
              >
                {children}
              </td>
            );
          },

          // Horizontal rule
          hr() {
            return (
              <hr
                className={`my-4 border-0 h-px ${
                  isLight ? 'bg-gray-200' : 'bg-white/10'
                }`}
              />
            );
          },

          // Links
          a({ href, children }) {
            return (
              <a
                href={href}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1 font-medium text-purple-400 underline decoration-purple-400/40 underline-offset-2"
              >
                {children}
                <ExternalLink className="h-3 w-3 inline opacity-70" />
              </a>
            );
          },

          // Images
          img({ src, alt }) {
            return (
              <span className="my-3 block overflow-hidden rounded-lg border border-white/10">
                <img
                  src={src}
                  alt={alt || ''}
                  className="w-full object-cover max-h-[350px]"
                />
              </span>
            );
          },
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
};
