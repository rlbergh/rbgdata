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
  // Process calculated fields FIRST: convert {field:Name|Formula} to HTML components
  let processed = markdown.replace(
    /\{field:([^|]+)\|([^\}]+)\}/g,
    (match, name, formula) => {
      // Escape the formula for HTML - handle special chars but NOT entities (we want raw HTML)
      const escapedName = name.trim();
      const escapedFormula = formula.trim();
      
      // Return complete HTML for the calculated field component
      return `<div class="calculated-field">
  <div class="calculated-field-header">
    <span class="calculated-field-name">${escapedName}</span>
    <button class="calculated-field-copy-btn" data-formula="${escapedFormula
      .replace(/"/g, '&quot;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')}" aria-label="Copy ${escapedName} formula">
      <span class="copy-icon">📋</span><span class="copy-text">Copy</span>
    </button>
  </div>
  <pre class="calculated-field-formula"><code>${escapedFormula
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')}</code></pre>
</div>`;
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

