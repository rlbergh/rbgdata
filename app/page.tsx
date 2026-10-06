import Link from 'next/link';
import { getLatestPosts } from '@/lib/posts';

export default async function Home() {
  const latestPosts = await getLatestPosts(3);

  return (
    <>
      {/* Hero Section */}
      <section className="section-hero bg-cream">
        <div className="container-max">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <img
                src="/rbgdata/logo-primary.png"
                alt="RBG Data - Data Visualization, Storytelling, Design"
                className="w-full max-w-2xl h-auto mb-8"
              />
              <p className="text-lg mb-6 leading-relaxed">
                Exploring data visualization, Tableau insights, and accessibility in data design.
                Learn how to frame problems, build solutions, and validate results through data.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/blog" className="btn btn-primary">
                  Read Blog
                </Link>
              </div>
            </div>
            <div className="flex items-center justify-center">
              <div className="relative">
                {/* Geometric decoration */}
                <div className="absolute -top-8 -right-8 w-32 h-32 bg-coral opacity-10 rounded-none"></div>
                <div className="absolute -bottom-4 -left-4 w-24 h-24 bg-teal opacity-10 rounded-none"></div>
                <div className="relative z-10 bg-white p-8 border-l-4 border-teal">
                  <img
                    src="/rbgdata/logo-submark.png"
                    alt="RBG Data methodology"
                    className="w-64 h-auto mb-6"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Latest Posts */}
      <section className="section bg-white">
        <div className="container-max">
          <div className="mb-12">
            <h2 className="text-teal">Latest Articles</h2>
            <div className="w-16 h-1 bg-coral mt-4"></div>
          </div>
          <div className="grid grid-geometric md:grid-cols-3">
            {latestPosts.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="no-underline group"
              >
                <article className="card hover:shadow-lg transition-all duration-200">
                  <h3 className="text-teal group-hover:text-coral transition-colors mb-3">
                    {post.title}
                  </h3>
                  <p className="text-sm text-charcoal mb-4">{post.excerpt}</p>
                  <p className="text-xs text-gray-500">{post.date}</p>
                </article>
              </Link>
            ))}
          </div>
          <div className="mt-12 text-center">
            <Link href="/blog" className="btn btn-primary">
              View All Articles
            </Link>
          </div>
        </div>
      </section>

      {/* YouTube Section */}
      <section className="section bg-cream">
        <div className="container-max">
          <h2 className="text-teal mb-4">Latest on YouTube</h2>
          <div className="w-16 h-1 bg-coral mb-12"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <p className="text-lg mb-6">
                Check out my YouTube channel for data visualization tutorials, case studies, and insights.
              </p>
              <a
                href="https://www.youtube.com/@rbgdata"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-coral inline-block"
              >
                Visit YouTube Channel
              </a>
            </div>
            
          </div>
        </div>
      </section>
    </>
  );
}
