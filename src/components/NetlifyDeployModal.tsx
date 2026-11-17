import React, { useState } from 'react';
import { X, Cloud, Terminal, CheckCircle2, ExternalLink, Copy, Check } from 'lucide-react';

interface NetlifyDeployModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const NetlifyDeployModal: React.FC<NetlifyDeployModalProps> = ({ isOpen, onClose }) => {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  if (!isOpen) return null;

  const copyCode = (code: string, index: number) => {
    navigator.clipboard.writeText(code);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 1500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-fade-in">
      <div className="w-full max-w-xl rounded-2xl bg-[#141824] border border-white/10 shadow-2xl overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/10">
          <div className="flex items-center gap-2.5">
            <div className="p-1.5 rounded-lg bg-[#00ad9f]/20 text-[#00ad9f] border border-[#00ad9f]/30">
              <Cloud className="h-5 w-5" />
            </div>
            <div>
              <h2 className="text-base font-semibold text-white">Deploy to Netlify</h2>
              <p className="text-xs text-gray-400">Pre-configured with netlify.toml and SPA redirects</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-gray-400 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-5 text-sm text-gray-300 overflow-y-auto max-h-[70vh]">
          {/* Method 1: Netlify CLI */}
          <div className="rounded-xl border border-white/10 bg-white/5 p-4">
            <div className="flex items-center gap-2 mb-2 font-semibold text-white text-xs uppercase tracking-wider text-[#00ad9f]">
              <Terminal className="h-4 w-4" />
              <span>Option 1: Quick Deploy via Terminal</span>
            </div>
            <p className="text-xs text-gray-400 mb-3">
              Deploy in seconds directly using the Netlify CLI:
            </p>

            <div className="relative rounded-lg bg-[#0a0d14] p-3 font-mono text-xs text-emerald-400 border border-white/10 flex items-center justify-between">
              <code>npx netlify deploy --prod --dir=dist</code>
              <button
                type="button"
                onClick={() => copyCode('npx netlify deploy --prod --dir=dist', 1)}
                className="p-1 rounded hover:bg-white/10 text-gray-400 hover:text-white transition-colors"
                title="Copy Command"
              >
                {copiedIndex === 1 ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Copy className="h-3.5 w-3.5" />}
              </button>
            </div>
          </div>

          {/* Method 2: Git Continuous Deployment */}
          <div className="rounded-xl border border-white/10 bg-white/5 p-4">
            <div className="flex items-center gap-2 mb-2 font-semibold text-white text-xs uppercase tracking-wider text-purple-400">
              <CheckCircle2 className="h-4 w-4" />
              <span>Option 2: Continuous Git Deployment</span>
            </div>
            <ol className="text-xs text-gray-400 space-y-2 list-decimal ml-4">
              <li>Push this repository to your GitHub / GitLab account</li>
              <li>Log in to <span className="text-white font-medium">app.netlify.com</span> and click <strong className="text-white">"Add new site" → "Import an existing project"</strong></li>
              <li>Select your repository. Netlify will auto-detect the configuration:
                <div className="my-1.5 p-2 rounded bg-[#0a0d14] font-mono text-[11px] text-gray-300 border border-white/10">
                  Build command: <span className="text-emerald-400">npm run build</span><br />
                  Publish directory: <span className="text-emerald-400">dist</span>
                </div>
              </li>
              <li>Click <strong className="text-white">Deploy Site</strong>!</li>
            </ol>
          </div>

          {/* Configuration status */}
          <div className="flex items-center gap-2.5 p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs">
            <CheckCircle2 className="h-4 w-4 shrink-0" />
            <span><code>netlify.toml</code> is already generated with security headers, asset caching, and SPA redirect rules.</span>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-white/10 bg-white/5 flex items-center justify-between">
          <a
            href="https://app.netlify.com"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-1.5 text-xs font-medium text-[#00ad9f] hover:underline"
          >
            <span>Open Netlify Dashboard</span>
            <ExternalLink className="h-3.5 w-3.5" />
          </a>
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/15 text-white text-xs font-semibold transition-colors"
          >
            Got it
          </button>
        </div>
      </div>
    </div>
  );
};
