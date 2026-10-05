export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-charcoal text-cream">
      <div className="container-max px-6 py-12 md:px-12 lg:px-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          <div>
            <h3 className="text-xl font-black mb-4 text-coral">RBG Data</h3>
            <p className="text-sm leading-relaxed">
              Data stories and visualization insights by Rebecca Gourley.
            </p>
          </div>
          <div>
            <h4 className="font-bold mb-4">Navigation</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="/blog" className="hover:text-coral transition-colors">
                  Blog
                </a>
              </li>
              <li>
                <a href="/portfolio" className="hover:text-coral transition-colors">
                  Portfolio
                </a>
              </li>
              <li>
                <a href="/about" className="hover:text-coral transition-colors">
                  About
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-4">Connect</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a
                  href="https://www.youtube.com/@rbgdata"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-coral transition-colors"
                >
                  YouTube
                </a>
              </li>
              <li>
                <a href="mailto:hello@rbgdata.com" className="hover:text-coral transition-colors">
                  Email
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-600 pt-8">
          <p className="text-sm text-center">
            © {currentYear} RBG Data. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
