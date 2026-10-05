import Link from 'next/link';
import { getPosts } from '@/lib/posts';

export default async function BlogPage() {
  const posts = await getPosts();

  return (
    <>
      <section className="section-hero bg-cream">
        <div className="container-max">
          <h1 className="text-teal mb-4">Blog</h1>
          <p className="text-lg text-charcoal">
            Data stories, visualization insights, and accessibility tips
          </p>
          <div className="w-16 h-1 bg-coral mt-6"></div>
        </div>
      </section>

      <section className="section bg-white">
        <div className="container-max">
          {posts.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500 mb-4">No posts yet. Check back soon!</p>
              <Link href="/" className="btn btn-primary">
                Back Home
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {posts.map((post) => (
                <Link
                  key={post.slug}
                  href={`/blog/${post.slug}`}
                  className="no-underline group"
                >
                  <article className="card group-hover:border-coral transition-all h-full">
                    <div>
                      <h3 className="text-teal group-hover:text-coral transition-colors mb-3">
                        {post.title}
                      </h3>
                      <p className="text-charcoal mb-4 leading-relaxed">{post.excerpt}</p>
                      <div className="flex justify-between items-center pt-4 border-t border-gray-200">
                        <time className="text-xs text-gray-500">{post.date}</time>
                        {post.tags && post.tags.length > 0 && (
                          <div className="flex gap-2">
                            {post.tags.slice(0, 2).map((tag) => (
                              <span
                                key={tag}
                                className="text-xs bg-teal bg-opacity-10 text-teal px-2 py-1"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </article>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
