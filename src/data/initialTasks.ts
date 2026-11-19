import { Task, Column } from '../types/kanban';

export const INITIAL_COLUMNS: Column[] = [
  { id: 'backlog', title: 'Sprint Backlog', color: 'border-slate-600' },
  { id: 'in-progress', title: 'In Progress', color: 'border-amber-500/50' },
  { id: 'review', title: 'Review & Test', color: 'border-indigo-500/50' },
  { id: 'done', title: 'Completed', color: 'border-emerald-500/50' },
];

export const INITIAL_TASKS: Task[] = [
  {
    id: 'task-1',
    title: 'Practice F5 Debugger in VS Code',
    description: 'Set a red breakpoint dot in KanbanBoard.tsx, hit F5, and inspect the state tree in the left debugger panel.',
    status: 'in-progress',
    priority: 'high',
    tags: ['VS Code', 'Debugging'],
    assignee: 'Akshat',
    createdAt: '2026-11-19',
  },
  {
    id: 'task-2',
    title: 'Explore Multi-Cursor & F2 Rename',
    description: 'Try pressing Cmd+D to select repeating words or F2 to rename a TypeScript symbol across all project files.',
    status: 'backlog',
    priority: 'medium',
    tags: ['VS Code', 'Productivity'],
    assignee: 'Akshat',
    createdAt: '2026-11-19',
  },
  {
    id: 'task-3',
    title: 'Review Antigravity Agent Rules',
    description: 'Inspect .agent/rules/coding-standards.md to see how the AI maintains strict code conventions.',
    status: 'review',
    priority: 'low',
    tags: ['Antigravity', 'Config'],
    assignee: 'Agent',
    createdAt: '2026-11-19',
  },
  {
    id: 'task-4',
    title: 'Scaffold DevPulse Core & GitHub Link',
    description: 'Vite + React 18 + Tailwind setup pushed to github.com/Akshat-Italiya/DevPulse.',
    status: 'done',
    priority: 'high',
    tags: ['Setup', 'Git'],
    assignee: 'Akshat',
    createdAt: '2026-11-19',
  },
];
