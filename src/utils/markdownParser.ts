/**
 * Lightweight markdown → HTML renderer (no external deps).
 * Supports: headings, bold, italic, inline code, code blocks,
 *           blockquotes, unordered lists, ordered lists,
 *           horizontal rules, tables, and links.
 */
export function renderMarkdown(md: string): string {
  let html = md
    // Escape HTML entities first
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');

  // Fenced code blocks (```lang\n...\n```)
  html = html.replace(
    /```(\w*)\n([\s\S]*?)```/g,
    (_, lang, code) =>
      `<pre class="md-pre"><code class="md-code-block"${lang ? ` data-lang="${lang}"` : ''}>${code.trimEnd()}</code></pre>`
  );

  // Blockquotes
  html = html.replace(/^&gt; (.+)$/gm, '<blockquote class="md-blockquote">$1</blockquote>');

  // Tables (| col | col |)
  html = html.replace(
    /(\|.+\|\n)((?:\|[-: ]+)+\|\n)((?:\|.+\|\n?)*)/g,
    (_, header, _sep, rows) => {
      const th = header
        .trim().split('|').filter(Boolean)
        .map((c: string) => `<th class="md-th">${c.trim()}</th>`).join('');
      const trs = rows.trim().split('\n').filter(Boolean).map((row: string) =>
        `<tr>${row.split('|').filter(Boolean)
          .map((c: string) => `<td class="md-td">${c.trim()}</td>`).join('')}</tr>`
      ).join('');
      return `<table class="md-table"><thead><tr>${th}</tr></thead><tbody>${trs}</tbody></table>`;
    }
  );

  // Headings
  html = html.replace(/^###### (.+)$/gm, '<h6 class="md-h6">$1</h6>');
  html = html.replace(/^##### (.+)$/gm, '<h5 class="md-h5">$1</h5>');
  html = html.replace(/^#### (.+)$/gm, '<h4 class="md-h4">$1</h4>');
  html = html.replace(/^### (.+)$/gm, '<h3 class="md-h3">$1</h3>');
  html = html.replace(/^## (.+)$/gm, '<h2 class="md-h2">$1</h2>');
  html = html.replace(/^# (.+)$/gm, '<h1 class="md-h1">$1</h1>');

  // Horizontal rules
  html = html.replace(/^---$/gm, '<hr class="md-hr" />');

  // Unordered lists (convert consecutive list items into <ul>)
  html = html.replace(/((?:^- .+\n?)+)/gm, (block) => {
    const items = block.trim().split('\n')
      .map(l => `<li class="md-li">${l.replace(/^- /, '')}</li>`).join('');
    return `<ul class="md-ul">${items}</ul>`;
  });

  // Ordered lists
  html = html.replace(/((?:^\d+\. .+\n?)+)/gm, (block) => {
    const items = block.trim().split('\n')
      .map(l => `<li class="md-li">${l.replace(/^\d+\. /, '')}</li>`).join('');
    return `<ol class="md-ol">${items}</ol>`;
  });

  // Inline formatting
  html = html.replace(/\*\*(.+?)\*\*/g, '<strong class="md-bold">$1</strong>');
  html = html.replace(/\*(.+?)\*/g, '<em class="md-italic">$1</em>');
  html = html.replace(/`([^`]+)`/g, '<code class="md-code">$1</code>');

  // Links
  html = html.replace(
    /\[([^\]]+)\]\(([^)]+)\)/g,
    '<a class="md-link" href="$2" target="_blank" rel="noreferrer">$1</a>'
  );

  // Paragraphs — wrap double-newline separated text blocks
  html = html
    .split(/\n{2,}/)
    .map(block => {
      const trimmed = block.trim();
      if (!trimmed) return '';
      // Don't wrap block-level elements
      if (/^<(h[1-6]|ul|ol|pre|table|blockquote|hr)/.test(trimmed)) return trimmed;
      return `<p class="md-p">${trimmed.replace(/\n/g, '<br />')}</p>`;
    })
    .join('\n');

  return html;
}
