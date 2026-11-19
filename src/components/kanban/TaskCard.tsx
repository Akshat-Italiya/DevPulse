import { ArrowLeft, ArrowRight, Trash2, Tag, Calendar, User } from 'lucide-react';
import { Task, ColumnId } from '../../types/kanban';

interface TaskCardProps {
  task: Task;
  onMove: (taskId: string, target: ColumnId) => void;
  onDelete: (taskId: string) => void;
}

const COLUMN_ORDER: ColumnId[] = ['backlog', 'in-progress', 'review', 'done'];

export function TaskCard({ task, onMove, onDelete }: TaskCardProps) {
  const currentIndex = COLUMN_ORDER.indexOf(task.status);
  const canMoveLeft = currentIndex > 0;
  const canMoveRight = currentIndex < COLUMN_ORDER.length - 1;

  const priorityColors = {
    low: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
    medium: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
    high: 'bg-rose-500/10 text-rose-400 border-rose-500/20',
  };

  return (
    <div className="group relative bg-slate-800/80 hover:bg-slate-800 border border-slate-700/60 hover:border-slate-600 rounded-xl p-4 shadow-sm transition-all duration-150">
      <div className="flex items-start justify-between gap-2 mb-2">
        <span
          className={`text-[10px] uppercase font-semibold px-2 py-0.5 rounded-full border ${priorityColors[task.priority]}`}
        >
          {task.priority}
        </span>

        <button
          onClick={() => onDelete(task.id)}
          className="opacity-0 group-hover:opacity-100 text-slate-500 hover:text-rose-400 transition-opacity p-1 rounded"
          title="Delete task"
        >
          <Trash2 className="h-3.5 w-3.5" />
        </button>
      </div>

      <h4 className="text-sm font-semibold text-white tracking-tight mb-1.5">
        {task.title}
      </h4>

      <p className="text-xs text-slate-400 line-clamp-3 mb-3 leading-relaxed">
        {task.description}
      </p>

      {/* Tags */}
      {task.tags.length > 0 && (
        <div className="flex flex-wrap gap-1 mb-3">
          {task.tags.map((tag) => (
            <span
              key={tag}
              className="inline-flex items-center gap-1 text-[11px] bg-slate-900/80 text-slate-300 px-2 py-0.5 rounded border border-slate-800"
            >
              <Tag className="h-2.5 w-2.5 text-indigo-400" />
              {tag}
            </span>
          ))}
        </div>
      )}

      {/* Card Footer: Metadata and Status Shift Buttons */}
      <div className="pt-2 border-t border-slate-700/40 flex items-center justify-between text-[11px] text-slate-400">
        <div className="flex items-center gap-2">
          {task.assignee && (
            <span className="flex items-center gap-1 text-slate-300">
              <User className="h-3 w-3 text-slate-500" />
              {task.assignee}
            </span>
          )}
          <span className="flex items-center gap-1 text-slate-500">
            <Calendar className="h-3 w-3" />
            {task.createdAt}
          </span>
        </div>

        <div className="flex items-center gap-1">
          {canMoveLeft && (
            <button
              onClick={() => onMove(task.id, COLUMN_ORDER[currentIndex - 1])}
              className="p-1 hover:bg-slate-700 rounded text-slate-300 hover:text-white transition"
              title={`Move to ${COLUMN_ORDER[currentIndex - 1]}`}
            >
              <ArrowLeft className="h-3.5 w-3.5" />
            </button>
          )}
          {canMoveRight && (
            <button
              onClick={() => onMove(task.id, COLUMN_ORDER[currentIndex + 1])}
              className="p-1 hover:bg-slate-700 rounded text-slate-300 hover:text-white transition"
              title={`Move to ${COLUMN_ORDER[currentIndex + 1]}`}
            >
              <ArrowRight className="h-3.5 w-3.5" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
