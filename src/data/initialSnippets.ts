import { Snippet } from '../types/vault';

export const INITIAL_SNIPPETS: Snippet[] = [
  {
    id: 'snip-1',
    title: 'useKanban — Custom React Hook',
    description: 'The state management hook powering DevPulse sprint board with localStorage persistence.',
    type: 'code',
    language: 'typescript',
    tags: ['React', 'Hook', 'TypeScript', 'State'],
    isFavorite: true,
    createdAt: '2026-11-19',
    code: `import { useState, useEffect } from 'react';
import { Task, ColumnId } from '../types/kanban';

export function useKanban() {
  const [tasks, setTasks] = useState<Task[]>(() => {
    const saved = localStorage.getItem('devpulse_tasks');
    return saved ? JSON.parse(saved) : INITIAL_TASKS;
  });

  useEffect(() => {
    localStorage.setItem('devpulse_tasks', JSON.stringify(tasks));
  }, [tasks]);

  const moveTask = (taskId: string, target: ColumnId) => {
    setTasks(prev =>
      prev.map(t => t.id === taskId ? { ...t, status: target } : t)
    );
  };

  return { tasks, moveTask };
}`,
  },
  {
    id: 'snip-2',
    title: 'Tailwind Dark Card Component',
    description: 'Reusable dark-themed card with hover border and responsive grid layout.',
    type: 'code',
    language: 'typescript',
    tags: ['React', 'Tailwind', 'UI'],
    isFavorite: false,
    createdAt: '2026-11-19',
    code: `interface CardProps {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  className?: string;
}

export function Card({ title, subtitle, children, className }: CardProps) {
  return (
    <div className={\`bg-slate-900/80 border border-slate-800
      hover:border-slate-700 rounded-xl p-5 transition \${className}\`}>
      <h3 className="text-sm font-semibold text-white mb-1">{title}</h3>
      {subtitle && (
        <p className="text-xs text-slate-400 mb-4">{subtitle}</p>
      )}
      {children}
    </div>
  );
}`,
  },
  {
    id: 'snip-3',
    title: 'Fix a Bug Step-by-Step',
    description: 'Prompt for getting methodical debugging help from an AI agent.',
    type: 'prompt',
    language: 'text',
    tags: ['Antigravity', 'Debug', 'AI Prompt'],
    isFavorite: true,
    createdAt: '2026-11-19',
    code: `I have a bug in my React TypeScript application.

**Component**: [ComponentName]
**Expected Behavior**: [describe what should happen]
**Actual Behavior**: [describe what happens instead]
**Error message** (if any):
\`\`\`
[paste error here]
\`\`\`

**Relevant Code**:
\`\`\`tsx
[paste the relevant code]
\`\`\`

Please:
1. Identify the root cause
2. Explain why it happens
3. Provide a fix with the corrected code
4. Suggest how to prevent this in the future`,
  },
  {
    id: 'snip-4',
    title: 'TypeScript Strict useMemo Pattern',
    description: 'Properly typed memoized filtering with useMemo for derived state.',
    type: 'code',
    language: 'typescript',
    tags: ['TypeScript', 'Performance', 'React'],
    isFavorite: false,
    createdAt: '2026-11-19',
    code: `const filteredItems = useMemo<Item[]>(() => {
  if (!query.trim()) return items;

  const lower = query.toLowerCase();
  return items.filter(item =>
    item.title.toLowerCase().includes(lower) ||
    item.tags.some(tag => tag.toLowerCase().includes(lower))
  );
}, [items, query]);`,
  },
  {
    id: 'snip-5',
    title: 'Create a New React Component',
    description: 'Prompt to scaffold a complete, production-quality React + Tailwind component.',
    type: 'prompt',
    language: 'text',
    tags: ['Antigravity', 'Component', 'AI Prompt'],
    isFavorite: false,
    createdAt: '2026-11-19',
    code: `Create a React TypeScript component called [ComponentName].

**Purpose**: [describe what this component does]
**Props it should accept**:
- [propName]: [type] — [description]

**Styling**: Tailwind CSS dark theme (slate-900 background, slate-800 borders)
**Icons**: use lucide-react

Requirements:
- Strict TypeScript with a Props interface
- Handle loading/empty/error states if applicable
- Include hover/focus states on interactive elements
- Keep it accessible (aria labels where needed)`,
  },
  {
    id: 'snip-6',
    title: 'Git Feature Branch Workflow',
    description: 'Standard commands for creating, working on, and merging a feature branch.',
    type: 'code',
    language: 'bash',
    tags: ['Git', 'Workflow', 'DevOps'],
    isFavorite: false,
    createdAt: '2026-11-19',
    code: `# Start a new feature
git checkout -b feat/module-2-vault

# Stage specific files
git add src/components/vault/

# Commit with conventional commit message
git commit -m "feat: add code and prompt vault with search and favorites"

# Push and open PR
git push -u origin feat/module-2-vault

# After merge, clean up
git checkout main
git pull
git branch -d feat/module-2-vault`,
  },
];

export const LANGUAGE_LABELS: Record<string, string> = {
  typescript: 'TypeScript',
  javascript: 'JavaScript',
  python: 'Python',
  bash: 'Bash',
  json: 'JSON',
  css: 'CSS',
  html: 'HTML',
  markdown: 'Markdown',
  text: 'Plain Text',
};

export const LANGUAGE_COLORS: Record<string, string> = {
  typescript: 'text-blue-400 bg-blue-500/10 border-blue-500/20',
  javascript: 'text-yellow-400 bg-yellow-500/10 border-yellow-500/20',
  python: 'text-green-400 bg-green-500/10 border-green-500/20',
  bash: 'text-orange-400 bg-orange-500/10 border-orange-500/20',
  json: 'text-purple-400 bg-purple-500/10 border-purple-500/20',
  css: 'text-pink-400 bg-pink-500/10 border-pink-500/20',
  html: 'text-red-400 bg-red-500/10 border-red-500/20',
  markdown: 'text-slate-300 bg-slate-500/10 border-slate-500/20',
  text: 'text-slate-400 bg-slate-800/60 border-slate-700',
};
