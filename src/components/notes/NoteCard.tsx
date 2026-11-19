import { Star, Trash2, FileText } from 'lucide-react';
import { Note } from '../../types/notes';
import { clsx } from 'clsx';

interface NoteCardProps {
  note: Note;
  isSelected: boolean;
  onSelect: (id: string) => void;
  onToggleFavorite: (id: string) => void;
  onDelete: (id: string) => void;
}

export function NoteCard({ note, isSelected, onSelect, onToggleFavorite, onDelete }: NoteCardProps) {
  const preview = note.content
    .replace(/^#+\s.+$/m, '')     // strip first heading
    .replace(/[#*`>_\-|]/g, '')   // strip markdown symbols
    .replace(/\n+/g, ' ')
    .trim()
    .slice(0, 90);

  const wordCount = note.content.split(/\s+/).filter(Boolean).length;

  return (
    <div
      onClick={() => onSelect(note.id)}
      className={clsx(
        'group relative p-4 rounded-xl border cursor-pointer transition-all duration-150 select-none',
        isSelected
          ? 'bg-indigo-600/10 border-indigo-500/40'
          : 'bg-slate-900/50 border-slate-800/80 hover:bg-slate-800/50 hover:border-slate-700'
      )}
    >
      {/* Top row */}
      <div className="flex items-start justify-between gap-2 mb-2">
        <div className="flex items-center gap-1.5 min-w-0">
          <FileText className={clsx('h-3.5 w-3.5 shrink-0', isSelected ? 'text-indigo-400' : 'text-slate-500')} />
          <span className="text-sm font-semibold text-slate-100 truncate leading-tight">
            {note.title}
          </span>
        </div>

        {/* Actions */}
        <div className={clsx(
          'flex items-center gap-0.5 shrink-0 transition-opacity',
          isSelected ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
        )}>
          <button
            onClick={e => { e.stopPropagation(); onToggleFavorite(note.id); }}
            className="p-1 rounded hover:bg-slate-700 text-slate-400 hover:text-amber-400 transition"
          >
            <Star className={clsx('h-3.5 w-3.5', note.isFavorite && 'fill-amber-400 text-amber-400')} />
          </button>
          <button
            onClick={e => { e.stopPropagation(); onDelete(note.id); }}
            className="p-1 rounded hover:bg-slate-700 text-slate-400 hover:text-rose-400 transition"
          >
            <Trash2 className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>

      {/* Preview text */}
      <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed mb-3">
        {preview || 'Empty note…'}
      </p>

      {/* Footer */}
      <div className="flex items-center justify-between text-[11px] text-slate-500">
        <span>{note.updatedAt}</span>
        <span>{wordCount}w</span>
      </div>

      {/* Tags */}
      {note.tags.length > 0 && (
        <div className="flex flex-wrap gap-1 mt-2">
          {note.tags.slice(0, 3).map(tag => (
            <span key={tag} className="text-[10px] text-slate-400 bg-slate-800 px-1.5 py-0.5 rounded border border-slate-700/60">
              {tag}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
