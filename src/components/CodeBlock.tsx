import React, { useMemo } from 'react';
import Prism from 'prismjs';

import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-typescript';
import 'prismjs/components/prism-jsx';
import 'prismjs/components/prism-tsx';
import 'prismjs/components/prism-css';
import 'prismjs/components/prism-python';
import 'prismjs/components/prism-json';
import 'prismjs/components/prism-bash';
import 'prismjs/components/prism-sql';
import 'prismjs/components/prism-diff';
import 'prismjs/components/prism-markdown';

interface CodeBlockProps {
  code: string;
  language?: string;
  showLineNumbers?: boolean;
  theme?: 'dark' | 'light';
}

export const CodeBlock: React.FC<CodeBlockProps> = ({
  code,
  language = 'text',
  showLineNumbers = true,
  theme = 'dark',
}) => {
  const cleanCode = code.replace(/\n$/, '');
  const lines = cleanCode.split('\n');

  const highlightedHtml = useMemo(() => {
    const lang = language.toLowerCase();
    const grammar = Prism.languages[lang] || Prism.languages.javascript || Prism.languages.markup;
    try {
      return Prism.highlight(cleanCode, grammar, lang);
    } catch {
      return cleanCode;
    }
  }, [cleanCode, language]);

  return (
    <div
      className={`my-3 overflow-hidden rounded-lg border font-mono text-[12px] sm:text-[13px] leading-relaxed ${
        theme === 'light'
          ? 'border-gray-200 bg-gray-50 text-gray-800'
          : 'border-white/10 bg-[#0d1117] text-[#c9d1d9]'
      }`}
    >
      {/* Code block header bar */}
      <div
        className={`flex items-center justify-between border-b px-3 py-1 text-[11px] font-medium select-none ${
          theme === 'light'
            ? 'border-gray-200 bg-gray-100 text-gray-500'
            : 'border-white/10 bg-[#161b22] text-gray-400'
        }`}
      >
        <div className="flex items-center gap-1.5">
          <span className="flex h-1.5 w-1.5 rounded-full bg-emerald-500" />
          <span className="uppercase tracking-wider text-[10px] font-semibold">
            {language || 'code'}
          </span>
        </div>
        <span className="text-[10px] opacity-60">
          {lines.length} lines
        </span>
      </div>

      {/* Code body with line numbers */}
      <div className="overflow-x-auto p-3">
        <pre className="flex font-mono">
          {showLineNumbers && (
            <div
              className={`mr-3 flex flex-col select-none text-right font-mono text-[11px] opacity-35 ${
                theme === 'light' ? 'text-gray-600' : 'text-gray-400'
              }`}
            >
              {lines.map((_, i) => (
                <span key={i} className="leading-relaxed">
                  {i + 1}
                </span>
              ))}
            </div>
          )}
          <code
            className="flex-1 font-mono text-[12px] sm:text-[13px] leading-relaxed outline-none"
            dangerouslySetInnerHTML={{ __html: highlightedHtml }}
          />
        </pre>
      </div>
    </div>
  );
};
