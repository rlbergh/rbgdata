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
  // Process Tableau URLs: convert {tableau:URL} to markdown image links
  let processed = markdown.replace(
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

  // Process calculated fields: convert {field:Name|Formula} to React component calls
  processed = processed.replace(
    /\{field:([^|]+)\|([^\}]+)\}/g,
    (match, name, formula) => {
      // Escape the formula for HTML/React
      const escapedName = name.trim();
      const escapedFormula = formula.trim().replace(/"/g, '&quot;').replace(/\n/g, '&#10;');
      // Return a placeholder that will be replaced after markdown rendering
      return `<div data-field-name="${escapedName}" data-field-formula="${escapedFormula}" class="field-placeholder"></div>`;
    }
  );

  return md.render(processed);
}
