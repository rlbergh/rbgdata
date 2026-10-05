'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <nav className="container-max px-6 py-3 md:px-12 lg:px-20">
        <div className="flex justify-between items-center">
          <Link href="/" className="no-underline flex items-center gap-3 hover:opacity-80 transition-opacity">
            <Image
              src="/logo-icon.png"
              alt="RBG Data"
              width={40}
              height={40}
              priority
              className="w-10 h-10"
            />
            <Image
              src="/logo-wordmark.png"
              alt="RBG Data"
              width={150}
              height={40}
              priority
              className="hidden sm:block h-8 w-auto"
            />
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex gap-8 items-center">
            <Link href="/blog" className="text-charcoal hover:text-coral transition-colors">
              Blog
            </Link>
            <Link href="/portfolio" className="text-charcoal hover:text-coral transition-colors">
              Portfolio
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
              href="/portfolio"
              className="text-charcoal hover:text-coral transition-colors"
              onClick={() => setIsOpen(false)}
            >
              Portfolio
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
