import { Search, Plus, FileText, Star } from 'lucide-react';
import { clsx } from 'clsx';
import { useNotes } from '../../hooks/useNotes';
import { NoteCard } from './NoteCard';
import { MarkdownEditor } from './MarkdownEditor';

export function MarkdownNotes() {
  const {
    filteredNotes,
    notes,
    selectedNote,
    selectedId,
    setSelectedId,
    searchQuery,
    setSearchQuery,
    updateContent,
    updateTitle,
    createNote,
    deleteNote,
    toggleFavorite,
    exportNote,
  } = useNotes();

  const favCount = notes.filter(n => n.isFavorite).length;

  return (
    <div className="flex flex-col h-full gap-4">
      {/* Top bar */}
      <div className="flex items-center justify-between gap-3 bg-slate-900/60 border border-slate-800 p-3 rounded-xl backdrop-blur shrink-0">
        <div className="flex items-center gap-2 flex-1">
          <div className="relative min-w-[200px] max-w-sm flex-1">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search notes…"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full bg-slate-800/80 border border-slate-700/80 rounded-lg pl-9 pr-3 py-1.5 text-xs text-slate-200 placeholder-slate-400 focus:outline-none focus:border-indigo-500 transition"
            />
          </div>
          <span className="hidden sm:flex items-center gap-1 text-xs text-slate-500">
            <FileText className="h-3.5 w-3.5" />
            {filteredNotes.length} note{filteredNotes.length !== 1 ? 's' : ''}
          </span>
          {favCount > 0 && (
            <span className="hidden sm:flex items-center gap-1 text-xs text-amber-400">
              <Star className="h-3 w-3 fill-amber-400" />
              {favCount} favourite{favCount !== 1 ? 's' : ''}
            </span>
          )}
        </div>
        <button
          onClick={createNote}
          className="flex items-center gap-1.5 text-xs font-semibold bg-indigo-600 hover:bg-indigo-500 text-white px-3.5 py-1.5 rounded-lg transition shadow-lg shadow-indigo-600/20 shrink-0"
        >
          <Plus className="h-4 w-4" />
          New Note
        </button>
      </div>

      {/* 2-column layout */}
      <div className="flex flex-1 gap-4 overflow-hidden min-h-0">
        {/* Notes list sidebar */}
        <aside className="w-72 shrink-0 flex flex-col bg-slate-900/50 border border-slate-800 rounded-xl overflow-hidden">
          <div className="flex-1 overflow-y-auto p-3 space-y-2">
            {filteredNotes.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-40 text-center">
                <FileText className="h-8 w-8 text-slate-700 mb-2" />
                <p className="text-xs text-slate-500 mb-2">No notes found.</p>
                <button
                  onClick={createNote}
                  className="text-xs text-indigo-400 hover:text-indigo-300"
                >
                  + Create a note
                </button>
              </div>
            ) : (
              filteredNotes.map(note => (
                <NoteCard
                  key={note.id}
                  note={note}
                  isSelected={note.id === selectedId}
                  onSelect={setSelectedId}
                  onToggleFavorite={toggleFavorite}
                  onDelete={deleteNote}
                />
              ))
            )}
          </div>
        </aside>

        {/* Editor / Preview pane */}
        <div className={clsx(
          'flex-1 bg-slate-900/50 border border-slate-800 rounded-xl overflow-hidden',
        )}>
          {selectedNote ? (
            <MarkdownEditor
              note={selectedNote}
              onUpdateContent={updateContent}
              onUpdateTitle={updateTitle}
              onToggleFavorite={toggleFavorite}
              onDelete={deleteNote}
              onExport={exportNote}
            />
          ) : (
            <div className="h-full flex flex-col items-center justify-center text-center p-12">
              <FileText className="h-12 w-12 text-slate-700 mb-3" />
              <h3 className="text-base font-semibold text-slate-400 mb-1">No note selected</h3>
              <p className="text-xs text-slate-500 max-w-xs mb-4">
                Choose a note from the list or create a new one.
              </p>
              <button
                onClick={createNote}
                className="text-xs font-semibold text-indigo-400 hover:text-indigo-300 border border-indigo-500/30 hover:border-indigo-500/60 px-4 py-2 rounded-lg transition"
              >
                + Create first note
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
