import { useState } from 'react';

export default function PromptCard({
  prompt,
  onDelete,
  categoryLabel,
  deleteTitle,
  copyLabel,
  copiedLabel,
}) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(prompt.text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback for environments without clipboard API
      const el = document.createElement('textarea');
      el.value = prompt.text;
      document.body.appendChild(el);
      el.select();
      document.execCommand('copy');
      document.body.removeChild(el);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const categoryColors = {
    work: 'bg-blue-100 text-blue-700',
    creative: 'bg-pink-100 text-pink-700',
    technical: 'bg-emerald-100 text-emerald-700',
    learning: 'bg-amber-100 text-amber-700',
    other: 'bg-slate-100 text-slate-600',
  };

  const badgeClass = categoryColors[prompt.category] ?? 'bg-slate-100 text-slate-600';

  return (
    <div className="bg-white border border-slate-200 rounded-xl p-5 flex flex-col gap-3 shadow-sm hover:shadow-md transition-shadow group">
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-slate-800 text-base leading-snug truncate">
            {prompt.title}
          </h3>
          <span className={`inline-block mt-1 text-xs font-medium px-2 py-0.5 rounded-full ${badgeClass}`}>
            {categoryLabel}
          </span>
        </div>
        <button
          onClick={onDelete}
          className="opacity-0 group-hover:opacity-100 text-slate-300 hover:text-red-400 transition-all text-lg leading-none mt-0.5"
          title={deleteTitle}
        >
          ×
        </button>
      </div>

      <p className="text-sm text-slate-500 leading-relaxed line-clamp-4 flex-1">
        {prompt.text}
      </p>

      <button
        onClick={handleCopy}
        className={`self-end flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg transition-all ${
          copied
            ? 'bg-emerald-100 text-emerald-700'
            : 'bg-violet-50 text-violet-600 hover:bg-violet-100'
        }`}
      >
        {copied ? (
          <>
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
            </svg>
            {copiedLabel}
          </>
        ) : (
          <>
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
            </svg>
            {copyLabel}
          </>
        )}
      </button>
    </div>
  );
}
