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
      className={`markdown-preview-body transition-colors ${
        isLight ? 'text-gray-800' : 'text-gray-100'
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
                  className={`rounded-md px-1.5 py-0.5 font-mono text-[0.875em] font-medium border ${
                    isLight
                      ? 'border-gray-200 bg-gray-100/80 text-pink-600'
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
              <h1 className="mt-2 mb-4 text-2xl md:text-3xl font-extrabold tracking-tight flex items-center gap-2">
                {children}
              </h1>
            );
          },
          h2({ children }) {
            return (
              <h2 className="mt-6 mb-3 text-xl md:text-2xl font-bold tracking-tight pb-1.5 border-b border-white/10">
                {children}
              </h2>
            );
          },
          h3({ children }) {
            return (
              <h3 className="mt-5 mb-2 text-lg md:text-xl font-semibold tracking-tight">
                {children}
              </h3>
            );
          },
          h4({ children }) {
            return (
              <h4 className="mt-4 mb-2 text-base font-semibold">
                {children}
              </h4>
            );
          },

          // Paragraphs & Lists
          p({ children }) {
            return <p className="my-2.5 leading-relaxed text-[15px]">{children}</p>;
          },
          ul({ children }) {
            return <ul className="my-3 ml-5 list-disc space-y-1.5 text-[15px]">{children}</ul>;
          },
          ol({ children }) {
            return <ol className="my-3 ml-5 list-decimal space-y-1.5 text-[15px]">{children}</ol>;
          },
          li({ children, className }) {
            // Task list items
            const isTaskList = className?.includes('task-list-item');
            if (isTaskList) {
              return (
                <li className="flex items-start gap-2 my-1.5 text-[15px] list-none -ml-5">
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
                  className={`inline-flex items-center justify-center h-4 w-4 rounded mt-1 transition-all ${
                    checked
                      ? 'bg-emerald-500 text-white shadow-sm'
                      : isLight
                      ? 'border border-gray-300 bg-white'
                      : 'border border-white/30 bg-white/5'
                  }`}
                >
                  {checked && <Check className="h-3 w-3 stroke-[3]" />}
                </span>
              );
            }
            return <input type={type} {...props} />;
          },

          // Blockquotes with GitHub Callouts Parsing
          blockquote({ children }) {
            let alertType: 'note' | 'tip' | 'important' | 'warning' | 'caution' | null = null;
            const displayChildren = children;

            // Simple inspection of children string
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
                note: {
                  title: 'Note',
                  icon: Info,
                  style: 'border-blue-500/40 bg-blue-500/10 text-blue-400',
                },
                tip: {
                  title: 'Tip',
                  icon: Lightbulb,
                  style: 'border-emerald-500/40 bg-emerald-500/10 text-emerald-400',
                },
                important: {
                  title: 'Important',
                  icon: Flame,
                  style: 'border-purple-500/40 bg-purple-500/10 text-purple-400',
                },
                warning: {
                  title: 'Warning',
                  icon: AlertTriangle,
                  style: 'border-amber-500/40 bg-amber-500/10 text-amber-400',
                },
                caution: {
                  title: 'Caution',
                  icon: AlertOctagon,
                  style: 'border-rose-500/40 bg-rose-500/10 text-rose-400',
                },
              };

              const cfg = alertConfigs[alertType];
              const IconComp = cfg.icon;

              return (
                <div
                  className={`my-4 rounded-xl border p-4 text-[14px] transition-all backdrop-blur-sm ${cfg.style}`}
                >
                  <div className="flex items-center gap-2 mb-2 font-semibold">
                    <IconComp className="h-4 w-4" />
                    <span className="uppercase text-[11px] tracking-wider font-bold">
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
                className={`my-4 rounded-r-xl border-l-4 py-2.5 px-4 italic text-[15px] ${
                  isLight
                    ? 'border-purple-500/80 bg-purple-50/50 text-gray-700'
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
              <div className="my-4 overflow-hidden rounded-xl border border-white/10 shadow-sm">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-sm border-collapse">
                    {children}
                  </table>
                </div>
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
            return <th className="px-4 py-3 font-semibold text-xs uppercase tracking-wider">{children}</th>;
          },
          td({ children }) {
            return (
              <td
                className={`px-4 py-3 border-t text-[13px] ${
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
                className={`my-6 border-0 h-px ${
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
                className="inline-flex items-center gap-1 font-medium text-purple-400 hover:text-purple-300 underline decoration-purple-400/40 hover:decoration-purple-300 underline-offset-2"
              >
                {children}
                <ExternalLink className="h-3 w-3 inline opacity-70" />
              </a>
            );
          },

          // Images
          img({ src, alt }) {
            return (
              <span className="my-4 block overflow-hidden rounded-xl border border-white/10 shadow-lg">
                <img
                  src={src}
                  alt={alt || ''}
                  className="w-full object-cover max-h-[450px]"
                />
                {alt && (
                  <span className="block p-2 text-center text-xs opacity-60">
                    {alt}
                  </span>
                )}
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
