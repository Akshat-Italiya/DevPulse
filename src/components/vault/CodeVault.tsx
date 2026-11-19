import { useState } from 'react';
import {
  Search,
  Plus,
  Code2,
  Star,
  Filter,
  BookOpen,
  Sparkles,
} from 'lucide-react';
import { clsx } from 'clsx';
import { useVault } from '../../hooks/useVault';
import { SnippetCard } from './SnippetCard';
import { SnippetDetail } from './SnippetDetail';
import { AddSnippetModal } from './AddSnippetModal';
import { Language, SnippetType } from '../../types/vault';

const LANGUAGES: Array<{ value: 'all' | Language; label: string }> = [
  { value: 'all', label: 'All' },
  { value: 'typescript', label: 'TS' },
  { value: 'javascript', label: 'JS' },
  { value: 'python', label: 'PY' },
  { value: 'bash', label: 'SH' },
  { value: 'json', label: 'JSON' },
  { value: 'text', label: 'TXT' },
];

export function CodeVault() {
  const {
    filtered,
    selectedSnippet,
    selectedId,
    setSelectedId,
    searchQuery,
    setSearchQuery,
    typeFilter,
    setTypeFilter,
    languageFilter,
    setLanguageFilter,
    favoritesOnly,
    setFavoritesOnly,
    addSnippet,
    toggleFavorite,
    deleteSnippet,
  } = useVault();

  const [isModalOpen, setIsModalOpen] = useState(false);

  const totalFavorites = filtered.filter((s) => s.isFavorite).length;

  return (
    <div className="flex flex-col h-full gap-4">
      {/* Top toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-slate-900/60 border border-slate-800 p-3 rounded-xl backdrop-blur shrink-0">
        {/* Left: search & filters */}
        <div className="flex flex-wrap items-center gap-2 flex-1">
          {/* Search */}
          <div className="relative min-w-[220px] flex-1 max-w-sm">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search snippets, code, tags…"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-800/80 border border-slate-700/80 rounded-lg pl-9 pr-3 py-1.5 text-xs text-slate-200 placeholder-slate-400 focus:outline-none focus:border-indigo-500 transition"
            />
          </div>

          {/* Type filter */}
          <div className="flex items-center bg-slate-800/80 border border-slate-700/80 rounded-lg p-0.5 text-xs gap-0.5">
            {(['all', 'code', 'prompt'] as Array<'all' | SnippetType>).map((t) => (
              <button
                key={t}
                onClick={() => setTypeFilter(t)}
                className={clsx(
                  'px-2.5 py-1 rounded-md font-medium capitalize transition',
                  typeFilter === t
                    ? 'bg-indigo-600 text-white shadow'
                    : 'text-slate-400 hover:text-slate-200'
                )}
              >
                {t === 'all' ? 'All Types' : t === 'code' ? '{ } Code' : '✦ Prompt'}
              </button>
            ))}
          </div>

          {/* Language chips */}
          <div className="flex items-center gap-1">
            <Filter className="h-3.5 w-3.5 text-slate-500 ml-1" />
            {LANGUAGES.map(({ value, label }) => (
              <button
                key={value}
                onClick={() => setLanguageFilter(value)}
                className={clsx(
                  'text-[11px] font-semibold px-2 py-0.5 rounded border transition',
                  languageFilter === value
                    ? 'bg-slate-200 text-slate-900 border-slate-200'
                    : 'text-slate-400 border-slate-700/80 hover:border-slate-500 hover:text-slate-200'
                )}
              >
                {label}
              </button>
            ))}
          </div>

          {/* Favorites toggle */}
          <button
            onClick={() => setFavoritesOnly(!favoritesOnly)}
            className={clsx(
              'flex items-center gap-1.5 text-xs px-2.5 py-1.5 rounded-lg border transition',
              favoritesOnly
                ? 'bg-amber-500/10 text-amber-400 border-amber-500/30'
                : 'text-slate-400 border-slate-700 hover:text-amber-400 hover:border-amber-500/30'
            )}
          >
            <Star className={clsx('h-3.5 w-3.5', favoritesOnly && 'fill-amber-400')} />
            {favoritesOnly ? `Favorites (${totalFavorites})` : 'Favorites'}
          </button>
        </div>

        {/* Add button */}
        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-1.5 text-xs font-semibold bg-indigo-600 hover:bg-indigo-500 text-white px-3.5 py-1.5 rounded-lg transition shadow-lg shadow-indigo-600/20 shrink-0"
        >
          <Plus className="h-4 w-4" />
          Add Snippet
        </button>
      </div>

      {/* Main 2-column layout */}
      <div className="flex flex-1 gap-4 overflow-hidden min-h-0">
        {/* Left sidebar: list */}
        <aside className="w-80 shrink-0 flex flex-col bg-slate-900/50 border border-slate-800 rounded-xl overflow-hidden">
          {/* Count bar */}
          <div className="px-4 py-2.5 border-b border-slate-800 bg-slate-900/60 flex items-center justify-between">
            <div className="flex items-center gap-1.5 text-xs text-slate-400">
              <BookOpen className="h-3.5 w-3.5 text-indigo-400" />
              <span>
                <span className="text-slate-200 font-semibold">{filtered.length}</span> snippet
                {filtered.length !== 1 ? 's' : ''}
              </span>
            </div>
            <div className="flex items-center gap-1 text-[11px] text-slate-500">
              <Code2 className="h-3 w-3" />
              {filtered.filter((s) => s.type === 'code').length} code
              <Sparkles className="h-3 w-3 ml-1 text-purple-400" />
              {filtered.filter((s) => s.type === 'prompt').length} prompts
            </div>
          </div>

          {/* Snippet cards */}
          <div className="flex-1 overflow-y-auto p-3 space-y-2">
            {filtered.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-40 text-center">
                <Code2 className="h-8 w-8 text-slate-700 mb-2" />
                <p className="text-xs text-slate-500">No snippets match your filters.</p>
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="mt-2 text-xs text-indigo-400 hover:text-indigo-300"
                >
                  + Add a snippet
                </button>
              </div>
            ) : (
              filtered.map((snippet) => (
                <SnippetCard
                  key={snippet.id}
                  snippet={snippet}
                  isSelected={snippet.id === selectedId}
                  onSelect={setSelectedId}
                  onToggleFavorite={toggleFavorite}
                  onDelete={deleteSnippet}
                />
              ))
            )}
          </div>
        </aside>

        {/* Right panel: detail view */}
        <div className="flex-1 bg-slate-900/50 border border-slate-800 rounded-xl overflow-hidden">
          {selectedSnippet ? (
            <SnippetDetail
              snippet={selectedSnippet}
              onToggleFavorite={toggleFavorite}
              onDelete={deleteSnippet}
            />
          ) : (
            <div className="h-full flex flex-col items-center justify-center text-center p-12">
              <Code2 className="h-12 w-12 text-slate-700 mb-3" />
              <h3 className="text-base font-semibold text-slate-400 mb-1">Select a snippet</h3>
              <p className="text-xs text-slate-500 max-w-xs">
                Choose a snippet from the list on the left to view its code or prompt content.
              </p>
            </div>
          )}
        </div>
      </div>

      <AddSnippetModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAdd={addSnippet}
      />
    </div>
  );
}
