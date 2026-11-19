import {
  Edit3,
  Columns2,
  Eye,
  Download,
  Star,
  Trash2,
  Clock,
} from 'lucide-react';
import { Note, EditorView } from '../../types/notes';
import { clsx } from 'clsx';

interface NoteToolbarProps {
  note: Note;
  view: EditorView;
  onViewChange: (v: EditorView) => void;
  onExport: () => void;
  onToggleFavorite: () => void;
  onDelete: () => void;
  wordCount: number;
  lineCount: number;
}

const VIEW_BUTTONS: { view: EditorView; icon: React.ReactNode; label: string }[] = [
  { view: 'edit',    icon: <Edit3 className="h-3.5 w-3.5" />,    label: 'Edit' },
  { view: 'split',   icon: <Columns2 className="h-3.5 w-3.5" />,  label: 'Split' },
  { view: 'preview', icon: <Eye className="h-3.5 w-3.5" />,       label: 'Preview' },
];

export function NoteToolbar({
  note,
  view,
  onViewChange,
  onExport,
  onToggleFavorite,
  onDelete,
  wordCount,
  lineCount,
}: NoteToolbarProps) {
  return (
    <div className="flex items-center justify-between gap-3 px-5 py-3 border-b border-slate-800 bg-slate-900/50 shrink-0">
      {/* Meta */}
      <div className="flex items-center gap-3 text-[11px] text-slate-500 min-w-0">
        <span className="flex items-center gap-1">
          <Clock className="h-3 w-3" />
          {note.updatedAt}
        </span>
        <span className="hidden sm:inline">{wordCount} words</span>
        <span className="hidden sm:inline">{lineCount} lines</span>
        <span className="hidden md:inline text-slate-600">
          {note.content.length} chars
        </span>
      </div>

      {/* View toggle */}
      <div className="flex items-center bg-slate-800/80 border border-slate-700/80 rounded-lg p-0.5">
        {VIEW_BUTTONS.map(({ view: v, icon, label }) => (
          <button
            key={v}
            onClick={() => onViewChange(v)}
            title={label}
            className={clsx(
              'flex items-center gap-1.5 px-2.5 py-1.5 rounded-md text-xs font-medium transition',
              view === v
                ? 'bg-indigo-600 text-white shadow'
                : 'text-slate-400 hover:text-slate-200'
            )}
          >
            {icon}
            <span className="hidden sm:inline">{label}</span>
          </button>
        ))}
      </div>

      {/* Actions */}
      <div className="flex items-center gap-1.5">
        <button
          onClick={onExport}
          title="Export as .md file"
          className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-slate-200 px-2.5 py-1.5 rounded-lg border border-slate-700 hover:border-slate-600 hover:bg-slate-800/60 transition"
        >
          <Download className="h-3.5 w-3.5" />
          <span className="hidden sm:inline">Export</span>
        </button>
        <button
          onClick={onToggleFavorite}
          title={note.isFavorite ? 'Remove from favorites' : 'Add to favorites'}
          className={clsx(
            'p-1.5 rounded-lg border transition',
            note.isFavorite
              ? 'text-amber-400 border-amber-500/30 bg-amber-500/10 hover:bg-amber-500/20'
              : 'text-slate-400 border-slate-700 hover:border-amber-500/30 hover:text-amber-400'
          )}
        >
          <Star className={clsx('h-3.5 w-3.5', note.isFavorite && 'fill-amber-400')} />
        </button>
        <button
          onClick={onDelete}
          title="Delete note"
          className="p-1.5 rounded-lg border border-slate-700 hover:border-rose-500/30 hover:bg-rose-500/5 text-slate-400 hover:text-rose-400 transition"
        >
          <Trash2 className="h-3.5 w-3.5" />
        </button>
      </div>
    </div>
  );
}
