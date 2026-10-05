import Link from 'next/link';
import { getPostBySlug, getPostSlugs } from '@/lib/posts';
import { markdownToHtml } from '@/lib/markdown';
import { notFound } from 'next/navigation';

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  const slugs = await getPostSlugs();
  return slugs.map((slug) => ({
    slug,
  }));
}

export default async function BlogPost({ params }: PageProps) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const htmlContent = markdownToHtml(post.content);

  return (
    <>
      <article>
        {/* Hero Section */}
        <section className="section-hero bg-cream border-b-4 border-coral">
          <div className="container-max">
            <Link href="/blog" className="text-sm text-teal hover:text-coral mb-4 inline-block">
              ← Back to Blog
            </Link>
            <h1 className="text-teal mb-4">{post.title}</h1>
            <div className="flex flex-col sm:flex-row sm:items-center gap-4 text-sm text-charcoal">
              <time dateTime={post.date}>{post.date}</time>
              {post.updated && <span className="text-coral italic">Updated {post.updated}</span>}
              {post.author && <span>by {post.author}</span>}
            </div>
            {post.tags && post.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-6">
                {post.tags.map((tag) => (
                  <span key={tag} className="bg-teal bg-opacity-20 text-teal text-sm px-3 py-1">
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* Content Section */}
        <section className="section bg-white">
          <div className="prose-content-wrapper">
            <div
              className="prose-content"
              dangerouslySetInnerHTML={{ __html: htmlContent }}
            />
          </div>
        </section>

        {/* Back to Blog */}
        <section className="section bg-cream">
          <div className="container-max text-center">
            <Link href="/blog" className="btn btn-primary">
              ← Back to All Posts
            </Link>
          </div>
        </section>
      </article>

      <style>{`
        .prose-content-wrapper {
          padding: 0 1.5rem;
        }

        .prose-content {
          max-width: 48rem;
          margin: 0 auto;
        }

        .prose-content h1,
        .prose-content h2,
        .prose-content h3,
        .prose-content h4,
        .prose-content h5,
        .prose-content h6 {
          color: #174f5b;
          margin-top: 1.5em;
          margin-bottom: 0.5em;
          font-weight: 700;
        }

        .prose-content h2 {
          border-bottom: 2px solid #e56b52;
          padding-bottom: 0.5em;
        }

        .prose-content h1 {
          font-size: 2em;
        }

        .prose-content h2 {
          font-size: 1.5em;
        }

        .prose-content p {
          line-height: 1.75;
          color: #25282a;
          margin-bottom: 1em;
        }

        .prose-content a {
          color: #174f5b;
          text-decoration: underline;
        }

        .prose-content a:hover {
          color: #e56b52;
        }

        .prose-content ul,
        .prose-content ol {
          margin-left: 2em;
          margin-bottom: 1em;
        }

        .prose-content li {
          margin-bottom: 0.5em;
          color: #25282a;
        }

        .prose-content code {
          background-color: #f7f1e7;
          color: #e56b52;
          padding: 0.2em 0.4em;
          border-radius: 3px;
          font-family: 'Monaco', 'Courier New', monospace;
          font-size: 0.9em;
        }

        .prose-content pre {
          background-color: #25282a;
          color: #f7f1e7;
          padding: 1em;
          border-left: 4px solid #174f5b;
          overflow-x: auto;
          margin-bottom: 1em;
        }

        .prose-content pre code {
          background-color: transparent;
          color: #f7f1e7;
          padding: 0;
        }

        .prose-content blockquote {
          border-left: 4px solid #d6a84b;
          padding-left: 1em;
          margin-left: 0;
          margin-bottom: 1em;
          color: #25282a;
          font-style: italic;
        }

        .prose-content img {
          max-width: 100%;
          height: auto;
          margin: 1.5em 0;
          border: 1px solid #e56b52;
        }

        .prose-content table {
          border-collapse: collapse;
          width: 100%;
          margin-bottom: 1em;
        }

        .prose-content th,
        .prose-content td {
          border: 1px solid #174f5b;
          padding: 0.75em;
          text-align: left;
        }

        .prose-content th {
          background-color: #174f5b;
          color: #f7f1e7;
          font-weight: bold;
        }

        .prose-content hr {
          border: none;
          height: 2px;
          background-color: #e56b52;
          margin: 2em 0;
        }

        @media (max-width: 768px) {
          .prose-content-wrapper {
            padding: 0 1rem;
          }
        }
      `}</style>
      <script
        dangerouslySetInnerHTML={{
          __html: `
            // Handle copy button clicks for calculated fields
            document.addEventListener('click', function(e) {
              if (e.target.closest('.calculated-field-copy-btn')) {
                const btn = e.target.closest('.calculated-field-copy-btn');
                const formula = btn.getAttribute('data-formula');
                if (formula) {
                  navigator.clipboard.writeText(formula).then(function() {
                    const originalHTML = btn.innerHTML;
                    btn.innerHTML = '<span class="copy-icon">✓</span><span class="copy-text">Copied!</span>';
                    setTimeout(function() {
                      btn.innerHTML = originalHTML;
                    }, 2000);
                  });
                }
              }
            });
          `,
        }}
      />
    </>
  );
}
