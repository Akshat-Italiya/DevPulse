import { useState } from 'react';
import { Copy, Check, Star, Trash2, Tag } from 'lucide-react';
import { Snippet } from '../../types/vault';
import { LANGUAGE_COLORS, LANGUAGE_LABELS } from '../../data/initialSnippets';
import { clsx } from 'clsx';

interface SnippetCardProps {
  snippet: Snippet;
  isSelected: boolean;
  onSelect: (id: string) => void;
  onToggleFavorite: (id: string) => void;
  onDelete: (id: string) => void;
}

export function SnippetCard({
  snippet,
  isSelected,
  onSelect,
  onToggleFavorite,
  onDelete,
}: SnippetCardProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async (e: React.MouseEvent) => {
    e.stopPropagation();
    await navigator.clipboard.writeText(snippet.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  };

  const typeEmoji = snippet.type === 'prompt' ? '✦' : '{ }';

  return (
    <div
      onClick={() => onSelect(snippet.id)}
      className={clsx(
        'group relative p-4 rounded-xl border cursor-pointer transition-all duration-150 select-none',
        isSelected
          ? 'bg-indigo-600/10 border-indigo-500/40 shadow-lg shadow-indigo-900/10'
          : 'bg-slate-900/50 border-slate-800/80 hover:bg-slate-800/50 hover:border-slate-700'
      )}
    >
      {/* Top row: type badge + actions */}
      <div className="flex items-start justify-between gap-2 mb-2">
        <div className="flex items-center gap-1.5 flex-wrap">
          {/* Type badge */}
          <span className="text-[10px] font-mono font-bold text-indigo-400 bg-indigo-500/10 border border-indigo-500/20 px-1.5 py-0.5 rounded">
            {typeEmoji}
          </span>
          {/* Language badge */}
          <span
            className={clsx(
              'text-[10px] font-semibold uppercase tracking-wide px-1.5 py-0.5 rounded border',
              LANGUAGE_COLORS[snippet.language]
            )}
          >
            {LANGUAGE_LABELS[snippet.language]}
          </span>
        </div>

        {/* Action buttons - visible on hover or selection */}
        <div
          className={clsx(
            'flex items-center gap-1 transition-opacity',
            isSelected ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
          )}
        >
          <button
            onClick={handleCopy}
            title="Copy code"
            className="p-1 rounded-md hover:bg-slate-700 text-slate-400 hover:text-emerald-400 transition"
          >
            {copied ? (
              <Check className="h-3.5 w-3.5 text-emerald-400" />
            ) : (
              <Copy className="h-3.5 w-3.5" />
            )}
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); onToggleFavorite(snippet.id); }}
            title={snippet.isFavorite ? 'Remove from favorites' : 'Add to favorites'}
            className="p-1 rounded-md hover:bg-slate-700 text-slate-400 hover:text-amber-400 transition"
          >
            <Star
              className={clsx('h-3.5 w-3.5', snippet.isFavorite && 'fill-amber-400 text-amber-400')}
            />
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); onDelete(snippet.id); }}
            title="Delete snippet"
            className="p-1 rounded-md hover:bg-slate-700 text-slate-400 hover:text-rose-400 transition"
          >
            <Trash2 className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>

      {/* Title */}
      <h4 className={clsx(
        'text-sm font-semibold tracking-tight mb-1 leading-tight',
        isSelected ? 'text-white' : 'text-slate-200'
      )}>
        {snippet.title}
      </h4>

      {/* Description */}
      <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed mb-3">
        {snippet.description}
      </p>

      {/* Tags */}
      {snippet.tags.length > 0 && (
        <div className="flex flex-wrap gap-1">
          {snippet.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="inline-flex items-center gap-1 text-[10px] text-slate-400 bg-slate-800 px-1.5 py-0.5 rounded border border-slate-700/60"
            >
              <Tag className="h-2.5 w-2.5 text-indigo-400/70" />
              {tag}
            </span>
          ))}
          {snippet.tags.length > 3 && (
            <span className="text-[10px] text-slate-500 px-1">
              +{snippet.tags.length - 3}
            </span>
          )}
        </div>
      )}
    </div>
  );
}
