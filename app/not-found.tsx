import Link from 'next/link';

export default function NotFound() {
  return (
    <section className="section-hero bg-cream min-h-screen flex items-center">
      <div className="container-max text-center">
        <h1 className="text-6xl md:text-8xl font-black text-coral mb-4">404</h1>
        <h2 className="text-3xl md:text-4xl text-teal mb-4">Page Not Found</h2>
        <p className="text-lg text-charcoal mb-8 max-w-xl mx-auto">
          Oops! The page you're looking for doesn't exist. It might have been moved or deleted.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/" className="btn btn-primary">
            Go Home
          </Link>
          <Link href="/blog" className="btn btn-secondary">
            Read the Blog
          </Link>
        </div>
      </div>
    </section>
  );
}
