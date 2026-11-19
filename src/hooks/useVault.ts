import { useState, useEffect, useMemo } from 'react';
import { Snippet, SnippetType, Language } from '../types/vault';
import { INITIAL_SNIPPETS } from '../data/initialSnippets';

const STORAGE_KEY = 'devpulse_vault_snippets';

export function useVault() {
  const [snippets, setSnippets] = useState<Snippet[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) return JSON.parse(saved) as Snippet[];
    } catch {
      /* ignore parse errors */
    }
    return INITIAL_SNIPPETS;
  });

  const [searchQuery, setSearchQuery] = useState('');
  const [typeFilter, setTypeFilter] = useState<'all' | SnippetType>('all');
  const [languageFilter, setLanguageFilter] = useState<'all' | Language>('all');
  const [favoritesOnly, setFavoritesOnly] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(snippets[0]?.id ?? null);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(snippets));
    } catch {
      /* ignore */
    }
  }, [snippets]);

  const filtered = useMemo(() => {
    const q = searchQuery.toLowerCase();
    return snippets.filter((s) => {
      if (favoritesOnly && !s.isFavorite) return false;
      if (typeFilter !== 'all' && s.type !== typeFilter) return false;
      if (languageFilter !== 'all' && s.language !== languageFilter) return false;
      if (!q) return true;
      return (
        s.title.toLowerCase().includes(q) ||
        s.description.toLowerCase().includes(q) ||
        s.code.toLowerCase().includes(q) ||
        s.tags.some((t) => t.toLowerCase().includes(q))
      );
    });
  }, [snippets, searchQuery, typeFilter, languageFilter, favoritesOnly]);

  const selectedSnippet = snippets.find((s) => s.id === selectedId) ?? null;

  const addSnippet = (data: Omit<Snippet, 'id' | 'createdAt' | 'isFavorite'>) => {
    const snippet: Snippet = {
      ...data,
      id: `snip-${Date.now()}`,
      createdAt: new Date().toISOString().split('T')[0],
      isFavorite: false,
    };
    setSnippets((prev) => [snippet, ...prev]);
    setSelectedId(snippet.id);
  };

  const toggleFavorite = (id: string) => {
    setSnippets((prev) =>
      prev.map((s) => (s.id === id ? { ...s, isFavorite: !s.isFavorite } : s))
    );
  };

  const deleteSnippet = (id: string) => {
    setSnippets((prev) => {
      const remaining = prev.filter((s) => s.id !== id);
      if (selectedId === id) setSelectedId(remaining[0]?.id ?? null);
      return remaining;
    });
  };

  return {
    snippets,
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
  };
}
