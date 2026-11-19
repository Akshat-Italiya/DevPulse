import { useState } from 'react';
import {
  LayoutDashboard,
  Kanban,
  Code2,
  FileText,
  Activity,
  Terminal,
  Github,
  CheckCircle2,
  Clock,
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { KanbanBoard } from './components/kanban/KanbanBoard';
import { CodeVault } from './components/vault/CodeVault';

export default function App() {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'kanban' | 'vault' | 'notes'>('dashboard');

  return (
    <div className="flex h-screen bg-slate-950 text-slate-100 font-sans">
      {/* Sidebar */}
      <aside className="w-64 border-r border-slate-800 bg-slate-900/60 p-4 flex flex-col justify-between backdrop-blur">
        <div>
          <div className="flex items-center gap-3 px-2 py-4 mb-4">
            <div className="h-9 w-9 rounded-xl bg-gradient-to-tr from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg shadow-indigo-500/20">
              <Sparkles className="h-5 w-5 text-white" />
            </div>
            <div>
              <h1 className="font-bold text-base tracking-tight text-white">DevPulse</h1>
              <p className="text-xs text-indigo-400 font-medium">Developer & Agent Hub</p>
            </div>
          </div>

          <nav className="space-y-1">
            <button
              onClick={() => setActiveTab('dashboard')}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                activeTab === 'dashboard'
                  ? 'bg-indigo-600/20 text-indigo-300 border border-indigo-500/30'
                  : 'text-slate-400 hover:bg-slate-800/60 hover:text-slate-200'
              }`}
            >
              <LayoutDashboard className="h-4 w-4" />
              Overview
            </button>
            <button
              onClick={() => setActiveTab('kanban')}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                activeTab === 'kanban'
                  ? 'bg-indigo-600/20 text-indigo-300 border border-indigo-500/30'
                  : 'text-slate-400 hover:bg-slate-800/60 hover:text-slate-200'
              }`}
            >
              <Kanban className="h-4 w-4" />
              Tasks & Sprints
            </button>
            <button
              onClick={() => setActiveTab('vault')}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                activeTab === 'vault'
                  ? 'bg-indigo-600/20 text-indigo-300 border border-indigo-500/30'
                  : 'text-slate-400 hover:bg-slate-800/60 hover:text-slate-200'
              }`}
            >
              <Code2 className="h-4 w-4" />
              Code & Prompt Vault
            </button>
            <button
              onClick={() => setActiveTab('notes')}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                activeTab === 'notes'
                  ? 'bg-indigo-600/20 text-indigo-300 border border-indigo-500/30'
                  : 'text-slate-400 hover:bg-slate-800/60 hover:text-slate-200'
              }`}
            >
              <FileText className="h-4 w-4" />
              Markdown Docs
            </button>
          </nav>
        </div>

        {/* System & IDE Footer badge */}
        <div className="p-3 bg-slate-800/40 border border-slate-800 rounded-xl">
          <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
            <span className="flex items-center gap-1.5 font-medium text-slate-300">
              <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse"></span>
              Agent Sync
            </span>
            <span className="text-[10px] bg-slate-700/60 px-1.5 py-0.5 rounded text-slate-300">Active</span>
          </div>
          <p className="text-[11px] text-slate-500">Antigravity + VS Code connected</p>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto flex flex-col">
        {/* Top Header */}
        <header className="h-16 border-b border-slate-800 px-8 flex items-center justify-between bg-slate-900/30 backdrop-blur">
          <div className="flex items-center gap-3">
            <span className="text-xs uppercase tracking-wider text-slate-400 font-semibold">Workspace</span>
            <span className="text-slate-600">/</span>
            <span className="text-sm font-medium text-slate-200">DevPulse Core</span>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 bg-slate-800/70 border border-slate-700/50 rounded-lg px-3 py-1.5 text-xs text-slate-300">
              <Terminal className="h-3.5 w-3.5 text-indigo-400" />
              <span>Vite + React 18 + TS</span>
            </div>
            <a
              href="https://github.com/Akshat-Italiya/DevPulse"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs px-3 py-1.5 rounded-lg border border-slate-700 transition"
            >
              <Github className="h-3.5 w-3.5" />
              GitHub Repo
            </a>
          </div>
        </header>

        {/* Tab Views */}
        <div className="p-8 max-w-7xl mx-auto w-full flex-1 flex flex-col">
          {activeTab === 'dashboard' && (
            <div className="space-y-6">
              {/* Welcome Banner */}
              <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-indigo-900/40 via-purple-900/30 to-slate-900 border border-indigo-500/20 p-8 shadow-2xl">
                <div className="relative z-10 max-w-2xl">
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 mb-3">
                    <Sparkles className="h-3 w-3" /> Learning Lab Active
                  </span>
                  <h2 className="text-2xl font-bold text-white tracking-tight mb-2">
                    Welcome to your DevPulse Learning Project
                  </h2>
                  <p className="text-sm text-slate-300 leading-relaxed mb-4">
                    This project is tailored to master <strong>React & TypeScript</strong> while learning the depths of <strong>VS Code</strong> and <strong>Antigravity</strong> workflows side-by-side.
                  </p>
                  <button
                    onClick={() => setActiveTab('kanban')}
                    className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold rounded-lg shadow-lg shadow-indigo-600/30 transition"
                  >
                    Open Sprint Board <ArrowRight className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>

              {/* Quick Metrics */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-5 hover:border-slate-700 transition">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-medium text-slate-400">Project Status</span>
                    <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                  </div>
                  <div className="text-2xl font-bold text-white mb-1">Live on GitHub</div>
                  <p className="text-xs text-slate-400">Pushed to Akshat-Italiya/DevPulse</p>
                </div>

                <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-5 hover:border-slate-700 transition">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-medium text-slate-400">VS Code Debugging</span>
                    <Clock className="h-4 w-4 text-indigo-400" />
                  </div>
                  <div className="text-2xl font-bold text-white mb-1">F5 Ready</div>
                  <p className="text-xs text-slate-400">launch.json configured with Chrome</p>
                </div>

                <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-5 hover:border-slate-700 transition">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-medium text-slate-400">Sprint Kanban</span>
                    <Activity className="h-4 w-4 text-purple-400" />
                  </div>
                  <div className="text-2xl font-bold text-white mb-1">Interactive</div>
                  <p className="text-xs text-slate-400">Local state & storage sync active</p>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'kanban' && <KanbanBoard />}

          {activeTab === 'vault' && <CodeVault />}

          {activeTab === 'notes' && (
            <div className="flex-1 flex flex-col items-center justify-center p-12 border border-dashed border-slate-800 rounded-2xl text-center">
              <FileText className="h-10 w-10 text-indigo-400 mb-3" />
              <h3 className="text-lg font-semibold text-white mb-1">Markdown Documentation</h3>
              <p className="text-xs text-slate-400 max-w-sm">
                Module 3 will introduce live split-pane markdown editing and instant previewing.
              </p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
