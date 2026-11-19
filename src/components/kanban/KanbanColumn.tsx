import { Plus } from 'lucide-react';
import { Column, Task, ColumnId } from '../../types/kanban';
import { TaskCard } from './TaskCard';

interface KanbanColumnProps {
  column: Column;
  tasks: Task[];
  onMoveTask: (taskId: string, target: ColumnId) => void;
  onDeleteTask: (taskId: string) => void;
  onOpenAddModal: (status: ColumnId) => void;
}

export function KanbanColumn({
  column,
  tasks,
  onMoveTask,
  onDeleteTask,
  onOpenAddModal,
}: KanbanColumnProps) {
  return (
    <div className="flex flex-col w-80 shrink-0 bg-slate-900/70 border border-slate-800 rounded-2xl p-3.5 backdrop-blur">
      {/* Column Header */}
      <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-800">
        <div className="flex items-center gap-2">
          <span className={`h-2.5 w-2.5 rounded-full border-2 ${column.color} bg-slate-800`} />
          <h3 className="text-sm font-semibold text-slate-200">{column.title}</h3>
          <span className="text-xs bg-slate-800 text-slate-400 px-2 py-0.5 rounded-full font-mono">
            {tasks.length}
          </span>
        </div>

        <button
          onClick={() => onOpenAddModal(column.id)}
          className="p-1 hover:bg-slate-800 text-slate-400 hover:text-slate-100 rounded-lg transition"
          title="Add task to this column"
        >
          <Plus className="h-4 w-4" />
        </button>
      </div>

      {/* Task List */}
      <div className="flex-1 space-y-3 overflow-y-auto min-h-[300px] pr-1">
        {tasks.map((task) => (
          <TaskCard
            key={task.id}
            task={task}
            onMove={onMoveTask}
            onDelete={onDeleteTask}
          />
        ))}

        {tasks.length === 0 && (
          <div className="h-32 border-2 border-dashed border-slate-800/80 rounded-xl flex flex-col items-center justify-center text-center p-4">
            <p className="text-xs text-slate-500 mb-2">No tasks in this stage</p>
            <button
              onClick={() => onOpenAddModal(column.id)}
              className="text-xs text-indigo-400 hover:text-indigo-300 font-medium"
            >
              + Create a task
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
