import { useState, useMemo } from 'react';
import { Search, Plus, Filter, RotateCcw } from 'lucide-react';
import { INITIAL_COLUMNS } from '../../data/initialTasks';
import { ColumnId, Priority } from '../../types/kanban';
import { useKanban } from '../../hooks/useKanban';
import { KanbanColumn } from './KanbanColumn';
import { NewTaskModal } from './NewTaskModal';

export function KanbanBoard() {
  const { tasks, moveTask, addTask, deleteTask, resetToDefault } = useKanban();
  const [searchQuery, setSearchQuery] = useState('');
  const [priorityFilter, setPriorityFilter] = useState<'all' | Priority>('all');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalTargetColumn, setModalTargetColumn] = useState<ColumnId>('backlog');

  const filteredTasks = useMemo(() => {
    return tasks.filter((task) => {
      const matchesSearch =
        task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        task.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        task.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));

      const matchesPriority =
        priorityFilter === 'all' || task.priority === priorityFilter;

      return matchesSearch && matchesPriority;
    });
  }, [tasks, searchQuery, priorityFilter]);

  const handleOpenAddModal = (status: ColumnId) => {
    setModalTargetColumn(status);
    setIsModalOpen(true);
  };

  return (
    <div className="flex flex-col h-full space-y-4">
      {/* Action & Filter Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-slate-900/60 border border-slate-800 p-3 rounded-xl backdrop-blur">
        <div className="flex items-center gap-3 flex-1 min-w-[280px]">
          {/* Search Bar */}
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search tasks, descriptions, or tags..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-800/80 border border-slate-700/80 rounded-lg pl-9 pr-3 py-1.5 text-xs text-slate-200 placeholder-slate-400 focus:outline-none focus:border-indigo-500 transition"
            />
          </div>

          {/* Priority Filter */}
          <div className="flex items-center gap-1.5 bg-slate-800/80 border border-slate-700/80 rounded-lg px-2.5 py-1.5 text-xs text-slate-300">
            <Filter className="h-3.5 w-3.5 text-slate-400" />
            <select
              value={priorityFilter}
              onChange={(e) => setPriorityFilter(e.target.value as 'all' | Priority)}
              className="bg-transparent text-xs text-slate-200 focus:outline-none cursor-pointer"
            >
              <option value="all" className="bg-slate-900">All Priorities</option>
              <option value="high" className="bg-slate-900">High</option>
              <option value="medium" className="bg-slate-900">Medium</option>
              <option value="low" className="bg-slate-900">Low</option>
            </select>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex items-center gap-2">
          <button
            onClick={resetToDefault}
            className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-slate-200 px-3 py-1.5 rounded-lg border border-slate-800 hover:bg-slate-800/60 transition"
            title="Reset to default mock tasks"
          >
            <RotateCcw className="h-3.5 w-3.5" />
            Reset Data
          </button>

          <button
            onClick={() => handleOpenAddModal('backlog')}
            className="flex items-center gap-1.5 text-xs font-semibold bg-indigo-600 hover:bg-indigo-500 text-white px-3.5 py-1.5 rounded-lg transition shadow-lg shadow-indigo-600/20"
          >
            <Plus className="h-4 w-4" />
            Add Task
          </button>
        </div>
      </div>

      {/* Columns Container */}
      <div className="flex-1 overflow-x-auto pb-4">
        <div className="flex gap-4 min-w-max h-full">
          {INITIAL_COLUMNS.map((column) => (
            <KanbanColumn
              key={column.id}
              column={column}
              tasks={filteredTasks.filter((t) => t.status === column.id)}
              onMoveTask={moveTask}
              onDeleteTask={deleteTask}
              onOpenAddModal={handleOpenAddModal}
            />
          ))}
        </div>
      </div>

      {/* New Task Modal */}
      <NewTaskModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        defaultStatus={modalTargetColumn}
        onAddTask={addTask}
      />
    </div>
  );
}
