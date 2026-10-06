'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <nav className="container-max px-6 py-3 md:px-12 lg:px-20">
        <div className="flex justify-between items-center">
          <Link href="/" className="no-underline flex items-center gap-3 hover:opacity-80 transition-opacity">
            <img
              src="/rbgdata/logo-icon.png"
              alt="RBG Data"
              className="h-12 w-auto"
            />
            <img
              src="/rbgdata/logo-wordmark.png"
              alt="RBG Data"
              className="hidden sm:block h-auto w-32 md:w-40"
            />
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex gap-8 items-center">
            <Link href="/blog" className="text-charcoal hover:text-coral transition-colors">
              Blog
            </Link>
            <Link href="/shop" className="text-charcoal hover:text-coral transition-colors">
              Shop
            </Link>
            <Link href="/about" className="text-charcoal hover:text-coral transition-colors">
              About
            </Link>
            <a
              href="https://www.youtube.com/@rbgdata"
              target="_blank"
              rel="noopener noreferrer"
              className="text-charcoal hover:text-coral transition-colors"
            >
              YouTube
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden flex flex-col gap-1 focus:outline-2 focus:outline-offset-2 focus:outline-teal"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            <span
              className={`w-6 h-0.5 bg-charcoal transition-all ${
                isOpen ? 'rotate-45 translate-y-2' : ''
              }`}
            ></span>
            <span
              className={`w-6 h-0.5 bg-charcoal transition-all ${
                isOpen ? 'opacity-0' : ''
              }`}
            ></span>
            <span
              className={`w-6 h-0.5 bg-charcoal transition-all ${
                isOpen ? '-rotate-45 -translate-y-2' : ''
              }`}
            ></span>
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden mt-6 pb-6 flex flex-col gap-4 border-t border-gray-200 pt-6">
            <Link
              href="/blog"
              className="text-charcoal hover:text-coral transition-colors"
              onClick={() => setIsOpen(false)}
            >
              Blog
            </Link>
            <Link
              href="/shop"
              className="text-charcoal hover:text-coral transition-colors"
              onClick={() => setIsOpen(false)}
            >
              Shop
            </Link>
            <Link
              href="/about"
              className="text-charcoal hover:text-coral transition-colors"
              onClick={() => setIsOpen(false)}
            >
              About
            </Link>
            <a
              href="https://www.youtube.com/@rbgdata"
              target="_blank"
              rel="noopener noreferrer"
              className="text-charcoal hover:text-coral transition-colors"
            >
              YouTube
            </a>
          </div>
        )}
      </nav>
    </header>
  );
}
