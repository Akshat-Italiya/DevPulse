import { useState } from 'react';
import { X, Sparkles } from 'lucide-react';
import { ColumnId, Priority } from '../../types/kanban';

interface NewTaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultStatus: ColumnId;
  onAddTask: (task: {
    title: string;
    description: string;
    priority: Priority;
    status: ColumnId;
    tags: string[];
    assignee?: string;
  }) => void;
}

export function NewTaskModal({
  isOpen,
  onClose,
  defaultStatus,
  onAddTask,
}: NewTaskModalProps) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState<Priority>('medium');
  const [status, setStatus] = useState<ColumnId>(defaultStatus);
  const [tagsInput, setTagsInput] = useState('');
  const [assignee, setAssignee] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    const tags = tagsInput
      .split(',')
      .map((t) => t.trim())
      .filter(Boolean);

    onAddTask({
      title: title.trim(),
      description: description.trim(),
      priority,
      status,
      tags,
      assignee: assignee.trim() || undefined,
    });

    // Reset and close
    setTitle('');
    setDescription('');
    setTagsInput('');
    setAssignee('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-md bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl p-6">
        <div className="flex items-center justify-between pb-4 border-b border-slate-800 mb-4">
          <div className="flex items-center gap-2">
            <div className="h-7 w-7 rounded-lg bg-indigo-500/10 flex items-center justify-center text-indigo-400">
              <Sparkles className="h-4 w-4" />
            </div>
            <h3 className="text-base font-semibold text-white">Create New Task</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1.5">
              Task Title *
            </label>
            <input
              type="text"
              required
              placeholder="e.g. Implement VS Code debugger test"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full bg-slate-800/80 border border-slate-700 rounded-lg px-3 py-2 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-indigo-500 transition"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1.5">
              Description
            </label>
            <textarea
              rows={3}
              placeholder="Add key context, steps or acceptance criteria..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full bg-slate-800/80 border border-slate-700 rounded-lg px-3 py-2 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-indigo-500 transition resize-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1.5">
                Priority
              </label>
              <select
                value={priority}
                onChange={(e) => setPriority(e.target.value as Priority)}
                className="w-full bg-slate-800/80 border border-slate-700 rounded-lg px-3 py-2 text-sm text-slate-100 focus:outline-none focus:border-indigo-500 transition"
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1.5">
                Initial Column
              </label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value as ColumnId)}
                className="w-full bg-slate-800/80 border border-slate-700 rounded-lg px-3 py-2 text-sm text-slate-100 focus:outline-none focus:border-indigo-500 transition"
              >
                <option value="backlog">Backlog</option>
                <option value="in-progress">In Progress</option>
                <option value="review">Review</option>
                <option value="done">Done</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1.5">
                Tags (comma-separated)
              </label>
              <input
                type="text"
                placeholder="React, Hook, Bug"
                value={tagsInput}
                onChange={(e) => setTagsInput(e.target.value)}
                className="w-full bg-slate-800/80 border border-slate-700 rounded-lg px-3 py-2 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-indigo-500 transition"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1.5">
                Assignee
              </label>
              <input
                type="text"
                placeholder="e.g. Akshat"
                value={assignee}
                onChange={(e) => setAssignee(e.target.value)}
                className="w-full bg-slate-800/80 border border-slate-700 rounded-lg px-3 py-2 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-indigo-500 transition"
              />
            </div>
          </div>

          <div className="pt-3 border-t border-slate-800 flex items-center justify-end gap-2.5">
            <button
              type="button"
              onClick={onClose}
              className="px-3.5 py-2 text-xs font-medium text-slate-400 hover:text-slate-200 hover:bg-slate-800 rounded-lg transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-xs font-semibold bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg transition shadow-lg shadow-indigo-600/20"
            >
              Create Task
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
