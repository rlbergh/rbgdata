import MarkdownIt from 'markdown-it';
import { tableauUrlToMarkdownImage } from './tableauUrlHelper';
import { youtubeUrlToEmbed } from './youtubeHelper';

const md = new MarkdownIt({
  html: true,
  linkify: true,
  typographer: true,
  breaks: true,
});

// Allow all HTML 
md.renderer.rules.html_block = function(tokens, idx) {
  return tokens[idx].content;
};

md.renderer.rules.html_inline = function(tokens, idx) {
  return tokens[idx].content;
};

export function markdownToHtml(markdown: string): string {
  // Process calculated fields FIRST: convert {field:Name|Formula} to React component calls
  let processed = markdown.replace(
    /\{field:([^|]+)\|([^\}]+)\}/g,
    (match, name, formula) => {
      // Escape the formula for HTML/React - handle newlines and special chars
      const escapedName = name.trim().replace(/"/g, '&quot;');
      const escapedFormula = formula
        .trim()
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/\n/g, '&#10;');
      // Return HTML that will be preserved
      return `<div data-field-name="${escapedName}" data-field-formula="${escapedFormula}" class="field-placeholder"></div>`;
    }
  );

  // Process Tableau URLs: convert {tableau:URL} to markdown image links
  processed = processed.replace(
    /\{tableau:https:\/\/public\.tableau\.com\/views\/[^\}]+\}/g,
    (match) => {
      const url = match.slice(9, -1); // Extract URL from {tableau:...}
      return tableauUrlToMarkdownImage(url);
    }
  );

  // Process YouTube URLs: convert {youtube:URL} to responsive embeds
  processed = processed.replace(
    /\{youtube:(https:\/\/(?:www\.)?(?:youtube\.com|youtu\.be)\/[^\}]+|[a-zA-Z0-9_-]{11})\}/g,
    (match) => {
      const url = match.slice(9, -1); // Extract URL from {youtube:...}
      return youtubeUrlToEmbed(url);
    }
  );

  return md.render(processed);
}
