import { useState } from 'react';
import { Copy, Check, Star, Trash2, Tag, Calendar, ChevronDown, ChevronUp } from 'lucide-react';
import { Snippet } from '../../types/vault';
import { LANGUAGE_COLORS, LANGUAGE_LABELS } from '../../data/initialSnippets';
import { clsx } from 'clsx';

interface SnippetDetailProps {
  snippet: Snippet;
  onToggleFavorite: (id: string) => void;
  onDelete: (id: string) => void;
}

export function SnippetDetail({ snippet, onToggleFavorite, onDelete }: SnippetDetailProps) {
  const [copied, setCopied] = useState(false);
  const [codeExpanded, setCodeExpanded] = useState(true);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(snippet.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const lineCount = snippet.code.split('\n').length;
  const charCount = snippet.code.length;

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="p-5 border-b border-slate-800">
        <div className="flex items-start justify-between gap-3 mb-3">
          <div className="flex items-center gap-2 flex-wrap">
            <span
              className={clsx(
                'text-[10px] font-semibold uppercase tracking-wide px-2 py-1 rounded border',
                LANGUAGE_COLORS[snippet.language]
              )}
            >
              {LANGUAGE_LABELS[snippet.language]}
            </span>
            <span className={clsx(
              'text-[10px] font-semibold uppercase tracking-wide px-2 py-1 rounded border',
              snippet.type === 'prompt'
                ? 'text-purple-400 bg-purple-500/10 border-purple-500/20'
                : 'text-indigo-400 bg-indigo-500/10 border-indigo-500/20'
            )}>
              {snippet.type}
            </span>
            {snippet.isFavorite && (
              <span className="text-[10px] font-semibold text-amber-400 bg-amber-500/10 border border-amber-500/20 px-2 py-1 rounded flex items-center gap-1">
                <Star className="h-2.5 w-2.5 fill-amber-400" /> Favorite
              </span>
            )}
          </div>

          {/* Actions */}
          <div className="flex items-center gap-1 shrink-0">
            <button
              onClick={handleCopy}
              className="flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 bg-indigo-600/20 hover:bg-indigo-600/30 text-indigo-300 border border-indigo-500/30 rounded-lg transition"
            >
              {copied ? (
                <>
                  <Check className="h-3.5 w-3.5 text-emerald-400" />
                  <span className="text-emerald-400">Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="h-3.5 w-3.5" />
                  Copy
                </>
              )}
            </button>
            <button
              onClick={() => onToggleFavorite(snippet.id)}
              title={snippet.isFavorite ? 'Remove favorite' : 'Add to favorites'}
              className="p-1.5 rounded-lg border border-slate-700 hover:border-amber-500/40 hover:bg-amber-500/5 text-slate-400 hover:text-amber-400 transition"
            >
              <Star className={clsx('h-3.5 w-3.5', snippet.isFavorite && 'fill-amber-400 text-amber-400')} />
            </button>
            <button
              onClick={() => onDelete(snippet.id)}
              title="Delete snippet"
              className="p-1.5 rounded-lg border border-slate-700 hover:border-rose-500/40 hover:bg-rose-500/5 text-slate-400 hover:text-rose-400 transition"
            >
              <Trash2 className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>

        <h2 className="text-base font-bold text-white tracking-tight mb-1">
          {snippet.title}
        </h2>
        <p className="text-xs text-slate-400 leading-relaxed">
          {snippet.description}
        </p>

        {/* Meta row */}
        <div className="flex items-center gap-4 mt-3 text-[11px] text-slate-500">
          <span className="flex items-center gap-1">
            <Calendar className="h-3 w-3" />
            {snippet.createdAt}
          </span>
          <span>{lineCount} lines</span>
          <span>{charCount} chars</span>
        </div>
      </div>

      {/* Tags */}
      {snippet.tags.length > 0 && (
        <div className="px-5 py-3 border-b border-slate-800 flex flex-wrap gap-1.5">
          {snippet.tags.map((tag) => (
            <span
              key={tag}
              className="inline-flex items-center gap-1 text-[11px] text-slate-300 bg-slate-800 px-2 py-1 rounded-full border border-slate-700/60"
            >
              <Tag className="h-2.5 w-2.5 text-indigo-400" />
              {tag}
            </span>
          ))}
        </div>
      )}

      {/* Code block */}
      <div className="flex-1 overflow-hidden flex flex-col">
        {/* Code block header bar */}
        <div
          className="flex items-center justify-between px-5 py-2.5 bg-slate-950/60 border-b border-slate-800 cursor-pointer select-none"
          onClick={() => setCodeExpanded(!codeExpanded)}
        >
          <span className="text-[11px] font-mono text-slate-500 uppercase tracking-widest">
            {snippet.type === 'prompt' ? '— Prompt —' : '— Source Code —'}
          </span>
          <div className="flex items-center gap-2">
            <button
              onClick={(e) => { e.stopPropagation(); handleCopy(); }}
              className="text-[11px] text-slate-500 hover:text-slate-200 flex items-center gap-1 transition"
            >
              <Copy className="h-3 w-3" /> Copy
            </button>
            {codeExpanded
              ? <ChevronUp className="h-3.5 w-3.5 text-slate-500" />
              : <ChevronDown className="h-3.5 w-3.5 text-slate-500" />}
          </div>
        </div>

        {codeExpanded && (
          <div className="flex-1 overflow-auto bg-slate-950/40">
            <pre className="p-5 text-xs text-slate-300 font-mono leading-relaxed whitespace-pre overflow-x-auto selection:bg-indigo-500/30">
              {/* Line numbers + code */}
              {snippet.code.split('\n').map((line, i) => (
                <div key={i} className="flex group/line hover:bg-white/[0.02] rounded">
                  <span className="select-none w-8 shrink-0 text-right text-slate-600 group-hover/line:text-slate-500 mr-4 leading-relaxed transition">
                    {i + 1}
                  </span>
                  <span className="flex-1 leading-relaxed">{line || '\u00A0'}</span>
                </div>
              ))}
            </pre>
          </div>
        )}
      </div>
    </div>
  );
}
