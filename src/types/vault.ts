export type SnippetType = 'code' | 'prompt';
export type Language =
  | 'typescript'
  | 'javascript'
  | 'python'
  | 'bash'
  | 'json'
  | 'css'
  | 'html'
  | 'markdown'
  | 'text';

export interface Snippet {
  id: string;
  title: string;
  description: string;
  type: SnippetType;
  language: Language;
  code: string;
  tags: string[];
  isFavorite: boolean;
  createdAt: string;
}
