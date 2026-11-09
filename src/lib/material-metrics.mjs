export function plainText(markdown = '') {
  return markdown
    .replace(/^---[\s\S]*?---\s*/u, '')
    .replace(/<!--([\s\S]*?)-->/g, ' ')
    .replace(/```[\s\S]*?```/g, ' ')
    .replace(/!\[[^\]]*\]\([^)]*\)/g, ' ')
    .replace(/\[([^\]]+)\]\([^)]*\)/g, '$1')
    .replace(/^#{1,6}\s+/gm, '')
    .replace(/^[-*>]\s+/gm, '')
    .replace(/[*_`~]/g, '')
    .replace(/\s+/g, ' ')
    .trim();
}

export function leadParagraph(markdown = '') {
  const paragraph = markdown
    .split(/\n\s*\n/)
    .map(part => part.trim())
    .find(part => part && !part.startsWith('#') && !part.startsWith('-') && !part.startsWith('>') && !part.startsWith('<!--'));
  return plainText(paragraph || markdown);
}

export function cardExcerpt(markdown = '') {
  const paragraphs = markdown
    .split(/\n\s*\n/)
    .map(part => part.trim())
    .filter(part => part
      && !part.startsWith('---')
      && !part.startsWith('#')
      && !part.startsWith('-')
      && !part.startsWith('>')
      && !part.startsWith('<!--'));
  const selected = [];
  let length = 0;
  for (const paragraph of paragraphs) {
    const text = plainText(paragraph);
    if (!text) continue;
    selected.push(text);
    length += text.length;
    if (length >= 420 || selected.length >= 8) break;
  }
  return selected.join(' ') || plainText(markdown);
}

export function readingMetrics(markdown = '') {
  const text = plainText(markdown);
  const words = text ? text.split(/\s+/u).length : 0;
  return { words, readingMinutes: Math.max(1, Math.ceil(words / 220)) };
}
