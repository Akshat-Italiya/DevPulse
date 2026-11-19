import { useState, useRef, useEffect } from 'react';
import { clsx } from 'clsx';
import { Note, EditorView } from '../../types/notes';
import { NoteToolbar } from './NoteToolbar';
import { MarkdownPreview } from './MarkdownPreview';

interface MarkdownEditorProps {
  note: Note;
  onUpdateContent: (id: string, content: string) => void;
  onUpdateTitle: (id: string, title: string) => void;
  onToggleFavorite: (id: string) => void;
  onDelete: (id: string) => void;
  onExport: (note: Note) => void;
}

export function MarkdownEditor({
  note,
  onUpdateContent,
  onUpdateTitle,
  onToggleFavorite,
  onDelete,
  onExport,
}: MarkdownEditorProps) {
  const [view, setView] = useState<EditorView>('split');
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Focus textarea when note changes
  useEffect(() => {
    if (view !== 'preview') textareaRef.current?.focus();
  }, [note.id, view]);

  const wordCount = note.content.split(/\s+/).filter(Boolean).length;
  const lineCount = note.content.split('\n').length;

  // Insert markdown shortcuts via keyboard
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    const ta = textareaRef.current;
    if (!ta) return;
    const { selectionStart: start, selectionEnd: end } = ta;
    const selected = note.content.slice(start, end);

    const wrap = (prefix: string, suffix = prefix) => {
      e.preventDefault();
      const newContent =
        note.content.slice(0, start) + prefix + selected + suffix + note.content.slice(end);
      onUpdateContent(note.id, newContent);
      requestAnimationFrame(() => {
        ta.selectionStart = start + prefix.length;
        ta.selectionEnd = end + prefix.length;
      });
    };

    if (e.metaKey || e.ctrlKey) {
      if (e.key === 'b') wrap('**');
      if (e.key === 'i') wrap('*');
      if (e.key === '`') wrap('`');
    }

    // Tab inserts 2 spaces instead of moving focus
    if (e.key === 'Tab') {
      e.preventDefault();
      const newContent = note.content.slice(0, start) + '  ' + note.content.slice(end);
      onUpdateContent(note.id, newContent);
      requestAnimationFrame(() => {
        ta.selectionStart = ta.selectionEnd = start + 2;
      });
    }
  };

  const editorPane = (
    <div className="flex flex-col h-full border-r border-slate-800 last:border-r-0">
      <div className="shrink-0 px-6 pt-5 pb-2 bg-slate-950/20 border-b border-slate-800/50">
        <div className="text-[10px] uppercase tracking-widest text-slate-600 mb-1 font-mono">Editor</div>
        <input
          type="text"
          value={note.title}
          onChange={e => onUpdateTitle(note.id, e.target.value)}
          className="w-full text-xl font-bold text-white bg-transparent border-none outline-none placeholder-slate-600 tracking-tight"
          placeholder="Note title…"
        />
      </div>
      <div className="shrink-0 px-6 py-2 bg-slate-950/20 border-b border-slate-800/40 flex flex-wrap gap-2">
        {[
          { label: 'H1', action: () => onUpdateContent(note.id, `# Heading\n` + note.content) },
          { label: 'H2', action: () => onUpdateContent(note.id, `## Heading\n` + note.content) },
          { label: 'B',  action: () => { const ta = textareaRef.current; if (ta) { const s = ta.selectionStart, e2 = ta.selectionEnd, sel = note.content.slice(s, e2); onUpdateContent(note.id, note.content.slice(0, s) + `**${sel || 'bold'}**` + note.content.slice(e2)); } } },
          { label: 'I',  action: () => { const ta = textareaRef.current; if (ta) { const s = ta.selectionStart, e2 = ta.selectionEnd, sel = note.content.slice(s, e2); onUpdateContent(note.id, note.content.slice(0, s) + `*${sel || 'italic'}*` + note.content.slice(e2)); } } },
          { label: '`',  action: () => { const ta = textareaRef.current; if (ta) { const s = ta.selectionStart, e2 = ta.selectionEnd, sel = note.content.slice(s, e2); onUpdateContent(note.id, note.content.slice(0, s) + `\`${sel || 'code'}\`` + note.content.slice(e2)); } } },
          { label: '---', action: () => onUpdateContent(note.id, note.content + '\n\n---\n') },
          { label: '- List', action: () => onUpdateContent(note.id, note.content + '\n- Item\n') },
          { label: '> Quote', action: () => onUpdateContent(note.id, note.content + '\n> Quote\n') },
        ].map(({ label, action }) => (
          <button
            key={label}
            onClick={action}
            className="text-[11px] font-mono text-slate-400 hover:text-slate-200 bg-slate-800/80 hover:bg-slate-700 border border-slate-700/80 px-2 py-0.5 rounded transition"
          >
            {label}
          </button>
        ))}
      </div>
      <textarea
        ref={textareaRef}
        value={note.content}
        onChange={e => onUpdateContent(note.id, e.target.value)}
        onKeyDown={handleKeyDown}
        spellCheck={false}
        className="flex-1 resize-none bg-transparent px-8 py-5 text-sm text-slate-200 font-mono leading-7 placeholder-slate-600 focus:outline-none"
        placeholder="# Your Note Title&#10;&#10;Start writing in Markdown…"
      />
    </div>
  );

  const previewPane = (
    <div className="flex flex-col h-full overflow-hidden">
      <div className="shrink-0 px-6 pt-5 pb-3 border-b border-slate-800/50 bg-slate-950/20">
        <div className="text-[10px] uppercase tracking-widest text-slate-600 font-mono">Preview</div>
        <h2 className="text-xl font-bold text-white tracking-tight mt-1">{note.title}</h2>
      </div>
      <MarkdownPreview content={note.content} />
    </div>
  );

  return (
    <div className="flex flex-col h-full overflow-hidden">
      <NoteToolbar
        note={note}
        view={view}
        onViewChange={setView}
        onExport={() => onExport(note)}
        onToggleFavorite={() => onToggleFavorite(note.id)}
        onDelete={() => onDelete(note.id)}
        wordCount={wordCount}
        lineCount={lineCount}
      />

      <div className="flex-1 overflow-hidden">
        {view === 'edit' && (
          <div className="h-full">{editorPane}</div>
        )}
        {view === 'preview' && (
          <div className="h-full">{previewPane}</div>
        )}
        {view === 'split' && (
          <div className={clsx('grid h-full', 'grid-cols-2')}>
            {editorPane}
            {previewPane}
          </div>
        )}
      </div>
    </div>
  );
}
