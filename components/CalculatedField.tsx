'use client';

import { useState } from 'react';

interface CalculatedFieldProps {
  name: string;
  formula: string;
}

export default function CalculatedField({ name, formula }: CalculatedFieldProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(formula);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  return (
    <div className="calculated-field">
      <div className="calculated-field-header">
        <span className="calculated-field-name">{name}</span>
        <button
          onClick={handleCopy}
          className="calculated-field-copy-btn"
          title="Copy formula to clipboard"
          aria-label={`Copy ${name} formula`}
        >
          {copied ? (
            <>
              <span className="copy-icon">✓</span>
              <span className="copy-text">Copied!</span>
            </>
          ) : (
            <>
              <span className="copy-icon">📋</span>
              <span className="copy-text">Copy</span>
            </>
          )}
        </button>
      </div>
      <pre className="calculated-field-formula">
        <code>{formula}</code>
      </pre>
    </div>
  );
}
