import { useState, useEffect, useCallback } from 'react';
import { Note } from '../types/notes';
import { INITIAL_NOTES } from '../data/initialNotes';

const STORAGE_KEY = 'devpulse_notes';

export function useNotes() {
  const [notes, setNotes] = useState<Note[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) return JSON.parse(saved) as Note[];
    } catch { /* ignore */ }
    return INITIAL_NOTES;
  });

  const [selectedId, setSelectedId] = useState<string | null>(notes[0]?.id ?? null);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(notes)); }
    catch { /* ignore */ }
  }, [notes]);

  const selectedNote = notes.find(n => n.id === selectedId) ?? null;

  const updateContent = useCallback((id: string, content: string) => {
    setNotes(prev => prev.map(n =>
      n.id === id
        ? { ...n, content, updatedAt: new Date().toISOString().split('T')[0] }
        : n
    ));
  }, []);

  const updateTitle = useCallback((id: string, title: string) => {
    setNotes(prev => prev.map(n =>
      n.id === id ? { ...n, title, updatedAt: new Date().toISOString().split('T')[0] } : n
    ));
  }, []);

  const createNote = useCallback(() => {
    const note: Note = {
      id: `note-${Date.now()}`,
      title: 'Untitled Note',
      content: `# Untitled Note\n\nStart writing here...\n`,
      tags: [],
      isFavorite: false,
      createdAt: new Date().toISOString().split('T')[0],
      updatedAt: new Date().toISOString().split('T')[0],
    };
    setNotes(prev => [note, ...prev]);
    setSelectedId(note.id);
    return note.id;
  }, []);

  const deleteNote = useCallback((id: string) => {
    setNotes(prev => {
      const remaining = prev.filter(n => n.id !== id);
      if (selectedId === id) setSelectedId(remaining[0]?.id ?? null);
      return remaining;
    });
  }, [selectedId]);

  const toggleFavorite = useCallback((id: string) => {
    setNotes(prev => prev.map(n =>
      n.id === id ? { ...n, isFavorite: !n.isFavorite } : n
    ));
  }, []);

  const exportNote = useCallback((note: Note) => {
    const blob = new Blob([note.content], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${note.title.replace(/\s+/g, '-').toLowerCase()}.md`;
    a.click();
    URL.revokeObjectURL(url);
  }, []);

  const filteredNotes = notes.filter(n => {
    const q = searchQuery.toLowerCase();
    if (!q) return true;
    return (
      n.title.toLowerCase().includes(q) ||
      n.content.toLowerCase().includes(q) ||
      n.tags.some(t => t.toLowerCase().includes(q))
    );
  });

  return {
    notes,
    filteredNotes,
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
  };
}
