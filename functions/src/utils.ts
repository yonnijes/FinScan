/**
 * Simple HTML cleaner to reduce token usage before sending to LLM.
 * Removes style, script tags and collapses whitespace.
 */
export function cleanHtml(html: string): string {
  let text = html;

  // 1. Remove style and script tags and their content
  text = text.replace(/<(style|script)[^>]*>[\s\S]*?<\/\1>/gi, '');

  // 2. Remove all remaining HTML tags
  text = text.replace(/<[^>]+>/g, ' ');

  // 3. Unescape common HTML entities
  text = text.replace(/&nbsp;/g, ' ')
             .replace(/&lt;/g, '<')
             .replace(/&gt;/g, '>')
             .replace(/&amp;/g, '&')
             .replace(/&quot;/g, '"');

  // 4. Collapse multiple spaces and newlines
  text = text.replace(/\s+/g, ' ').trim();

  return text;
}
