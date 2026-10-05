'use client';

import { useEffect } from 'react';

export function CalculatedFieldsRenderer() {
  useEffect(() => {
    // Render calculated field components from placeholders
    function renderCalculatedFields() {
      console.log('[RBG Data] renderCalculatedFields called');
      const placeholders = document.querySelectorAll('.field-placeholder');
      console.log('[RBG Data] Found', placeholders.length, 'placeholders');

      placeholders.forEach(function (placeholder, index) {
        const name = placeholder.getAttribute('data-field-name');
        const formula = placeholder.getAttribute('data-field-formula');
        console.log('[RBG Data] Placeholder', index, '- name:', name, 'formula:', formula);

        if (name && formula) {
          // Create the field element
          const fieldDiv = document.createElement('div');
          fieldDiv.className = 'calculated-field';

          const header = document.createElement('div');
          header.className = 'calculated-field-header';

          const nameSpan = document.createElement('span');
          nameSpan.className = 'calculated-field-name';
          nameSpan.textContent = name;

          const button = document.createElement('button');
          button.className = 'calculated-field-copy-btn';
          button.setAttribute('aria-label', 'Copy ' + name + ' formula');
          button.innerHTML = '<span class="copy-icon">📋</span><span class="copy-text">Copy</span>';

          button.addEventListener('click', function (e) {
            e.preventDefault();
            navigator.clipboard.writeText(formula).then(function () {
              const originalHTML = button.innerHTML;
              button.innerHTML = '<span class="copy-icon">✓</span><span class="copy-text">Copied!</span>';
              setTimeout(function () {
                button.innerHTML = originalHTML;
              }, 2000);
            });
          });

          header.appendChild(nameSpan);
          header.appendChild(button);

          const pre = document.createElement('pre');
          pre.className = 'calculated-field-formula';
          const code = document.createElement('code');
          code.textContent = formula;
          pre.appendChild(code);

          fieldDiv.appendChild(header);
          fieldDiv.appendChild(pre);

          placeholder.replaceWith(fieldDiv);
          console.log('[RBG Data] Rendered field:', name);
        }
      });
    }

    // Call immediately on mount
    console.log('[RBG Data] CalculatedFieldsRenderer mounted');
    renderCalculatedFields();

    // Also call after a small delay to catch any late-loading placeholders
    const timeout = setTimeout(renderCalculatedFields, 100);
    return () => clearTimeout(timeout);
  }, []);

  // This component doesn't render anything visible
  return null;
}
