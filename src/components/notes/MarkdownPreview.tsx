import { useMemo } from 'react';
import { renderMarkdown } from '../../utils/markdownParser';

interface MarkdownPreviewProps {
  content: string;
}

export function MarkdownPreview({ content }: MarkdownPreviewProps) {
  const html = useMemo(() => renderMarkdown(content), [content]);

  return (
    <div
      className="markdown-body h-full overflow-y-auto px-8 py-6 text-slate-200 text-sm leading-relaxed"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
