import { Note } from '../types/notes';

export const INITIAL_NOTES: Note[] = [
  {
    id: 'note-1',
    title: 'VS Code Power Shortcuts',
    isFavorite: true,
    tags: ['VS Code', 'Learning'],
    createdAt: '2026-11-19',
    updatedAt: '2026-11-19',
    content: `# VS Code Power Shortcuts

Master these and your productivity will skyrocket. Each one is worth practising until it's muscle memory.

---

## Navigation

| Shortcut | Action |
|---|---|
| \`Cmd + P\` | Quick open any file by name |
| \`Cmd + Shift + P\` | Command Palette — run any action |
| \`Cmd + T\` | Search TypeScript symbols across the project |
| \`F12\` | Go to definition |
| \`Alt + F12\` | Peek definition (inline popup) |
| \`Cmd + B\` | Toggle sidebar |

## Editing

| Shortcut | Action |
|---|---|
| \`Cmd + D\` | Select next occurrence (multi-cursor) |
| \`Cmd + Shift + L\` | Select ALL occurrences at once |
| \`F2\` | Rename symbol everywhere in the project |
| \`Alt + ↑/↓\` | Move line up / down |
| \`Cmd + Shift + K\` | Delete entire line |
| \`Cmd + /\` | Toggle line comment |

## Debugging

- **\`F5\`** — Start debugger (uses \`.vscode/launch.json\`)
- **\`F9\`** — Toggle breakpoint on current line
- **\`F10\`** — Step over (next line)
- **\`F11\`** — Step into (go inside function call)
- **\`Shift + F11\`** — Step out of current function

> **Tip:** Set a breakpoint in \`useKanban.ts\` on the \`moveTask\` function and press F5. Watch VS Code pause when you click an arrow on a task card!
`,
  },
  {
    id: 'note-2',
    title: 'Antigravity Workflow Guide',
    isFavorite: true,
    tags: ['Antigravity', 'Learning', 'AI'],
    createdAt: '2026-11-19',
    updatedAt: '2026-11-19',
    content: `# Antigravity Workflow Guide

Antigravity is not just a code assistant — it's a full **autonomous development environment**. Here's how to use it at its best.

---

## Core Concepts

### 1. Agent Rules (\`.agent/rules/\`)
Files in this folder are read by the agent before every task. In DevPulse, we have:

\`\`\`
.agent/rules/coding-standards.md
\`\`\`

This tells the agent to use **strict TypeScript**, **Tailwind CSS**, **lucide-react**, and to never use \`any\` types.

### 2. Sandboxed Command Execution
Antigravity runs terminal commands in a **secure sandbox** — it can build, test, and lint your code without risking your OS environment.

### 3. Subagents
For large tasks, Antigravity spawns **subagents** that work in parallel. For example, building Module 2 and Module 3 simultaneously.

---

## Slash Commands

| Command | What it does |
|---|---|
| \`/plan\` | Generates an interactive plan artifact before writing any code |
| \`/boost\` | Activates deep thinking + multi-perspective verification |
| \`/goal\` | Long-running overnight mode — runs until the full goal is achieved |
| \`/teamwork\` | Spins up a whole team of agents for large projects |

---

## Tips for DevPulse

1. Ask Antigravity to **refactor a component** — it reads the agent rules and applies your style automatically.
2. Use \`/plan\` before adding a new feature to get a phased breakdown.
3. After a bug, describe it in natural language — the agent reads your code, identifies the root cause, and applies a surgical fix.
`,
  },
  {
    id: 'note-3',
    title: 'React Hooks Reference',
    isFavorite: false,
    tags: ['React', 'TypeScript', 'Reference'],
    createdAt: '2026-11-19',
    updatedAt: '2026-11-19',
    content: `# React Hooks Quick Reference

A concise cheat sheet for the hooks used in DevPulse.

---

## useState

Manages a local state value. Re-renders the component when it changes.

\`\`\`typescript
const [count, setCount] = useState<number>(0);
// Always use the updater function for derived state:
setCount(prev => prev + 1);
\`\`\`

## useEffect

Runs a side effect after render. The dependency array controls *when* it runs.

\`\`\`typescript
useEffect(() => {
  localStorage.setItem('key', JSON.stringify(value));
}, [value]); // runs whenever \`value\` changes
\`\`\`

## useMemo

Returns a **memoized value** — only recomputes when dependencies change. Prevents expensive re-calculations on every render.

\`\`\`typescript
const filtered = useMemo(() => {
  return items.filter(item => item.title.includes(query));
}, [items, query]);
\`\`\`

## useCallback

Returns a **memoized function reference**. Use when passing callbacks to child components to prevent unnecessary re-renders.

\`\`\`typescript
const handleClick = useCallback((id: string) => {
  setSelectedId(id);
}, []); // stable reference — never recreated
\`\`\`

---

> **Rule of thumb:** Reach for \`useMemo\` / \`useCallback\` only when you *measure* a performance problem. Premature optimisation adds noise.
`,
  },
];
