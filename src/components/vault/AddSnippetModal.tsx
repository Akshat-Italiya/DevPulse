import { useState } from 'react';
import { X, Code2 } from 'lucide-react';
import { Language, SnippetType } from '../../types/vault';

interface AddSnippetModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (data: {
    title: string;
    description: string;
    type: SnippetType;
    language: Language;
    code: string;
    tags: string[];
  }) => void;
}

const LANGUAGES: Language[] = [
  'typescript', 'javascript', 'python', 'bash', 'json', 'css', 'html', 'markdown', 'text',
];

export function AddSnippetModal({ isOpen, onClose, onAdd }: AddSnippetModalProps) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [type, setType] = useState<SnippetType>('code');
  const [language, setLanguage] = useState<Language>('typescript');
  const [code, setCode] = useState('');
  const [tagsInput, setTagsInput] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !code.trim()) return;

    const tags = tagsInput
      .split(',')
      .map((t) => t.trim())
      .filter(Boolean);

    onAdd({ title: title.trim(), description: description.trim(), type, language, code: code.trim(), tags });

    // Reset form
    setTitle(''); setDescription(''); setCode(''); setTagsInput('');
    setType('code'); setLanguage('typescript');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
      <div className="relative w-full max-w-2xl bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl flex flex-col max-h-[90vh]">
        {/* Modal header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 shrink-0">
          <div className="flex items-center gap-2">
            <div className="h-7 w-7 rounded-lg bg-indigo-500/10 flex items-center justify-center">
              <Code2 className="h-4 w-4 text-indigo-400" />
            </div>
            <h3 className="text-base font-semibold text-white">Add to Vault</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white transition"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Form body — scrollable */}
        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-6 space-y-4">
          {/* Type toggle */}
          <div className="flex gap-2">
            {(['code', 'prompt'] as SnippetType[]).map((t) => (
              <button
                key={t}
                type="button"
                onClick={() => { setType(t); if (t === 'prompt') setLanguage('text'); }}
                className={`flex-1 py-2 text-sm font-semibold rounded-lg border transition ${
                  type === t
                    ? 'bg-indigo-600/20 text-indigo-300 border-indigo-500/40'
                    : 'text-slate-400 border-slate-700 hover:border-slate-600 hover:text-slate-200'
                }`}
              >
                {t === 'code' ? '{ } Code Snippet' : '✦ AI Prompt'}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="col-span-2">
              <label className="block text-xs font-medium text-slate-300 mb-1.5">Title *</label>
              <input
                type="text"
                required
                placeholder="e.g. useFetch custom hook"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full bg-slate-800/80 border border-slate-700 rounded-lg px-3 py-2 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-indigo-500 transition"
              />
            </div>

            <div className="col-span-2">
              <label className="block text-xs font-medium text-slate-300 mb-1.5">Description</label>
              <input
                type="text"
                placeholder="Short description of this snippet's purpose"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full bg-slate-800/80 border border-slate-700 rounded-lg px-3 py-2 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-indigo-500 transition"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1.5">Language</label>
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value as Language)}
                className="w-full bg-slate-800/80 border border-slate-700 rounded-lg px-3 py-2 text-sm text-slate-100 focus:outline-none focus:border-indigo-500 transition"
              >
                {LANGUAGES.map((l) => (
                  <option key={l} value={l} className="bg-slate-900 capitalize">{l}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1.5">Tags (comma-separated)</label>
              <input
                type="text"
                placeholder="React, Hook, TypeScript"
                value={tagsInput}
                onChange={(e) => setTagsInput(e.target.value)}
                className="w-full bg-slate-800/80 border border-slate-700 rounded-lg px-3 py-2 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-indigo-500 transition"
              />
            </div>
          </div>

          {/* Code area */}
          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1.5">
              {type === 'prompt' ? 'Prompt Text *' : 'Code *'}
            </label>
            <textarea
              required
              rows={12}
              spellCheck={false}
              placeholder={
                type === 'prompt'
                  ? 'Write your AI prompt template here...'
                  : '// Paste your code here...'
              }
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="w-full bg-slate-950/60 border border-slate-700 rounded-lg px-4 py-3 text-xs text-slate-200 font-mono placeholder-slate-600 focus:outline-none focus:border-indigo-500 transition leading-relaxed resize-none"
            />
          </div>
        </form>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-slate-800 flex justify-end gap-2.5 shrink-0">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-xs font-medium text-slate-400 hover:text-slate-200 hover:bg-slate-800 rounded-lg transition"
          >
            Cancel
          </button>
          <button
            type="submit"
            form=""
            onClick={handleSubmit as unknown as React.MouseEventHandler}
            className="px-5 py-2 text-xs font-semibold bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg transition shadow-lg shadow-indigo-600/20"
          >
            Save to Vault
          </button>
        </div>
      </div>
    </div>
  );
}
