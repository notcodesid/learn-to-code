import type { Metadata } from "next";
import Link from "next/link";
import { getAllBlogPosts } from "@/lib/blog-posts";

export const metadata: Metadata = {
  title: "Blog - Rust Learning Guides and Tutorials",
  description: "Expert guides on learning Rust programming through interactive practice, online compilers, and hands-on tutorials.",
  canonical: "https://learntocode.notcodesid.com/blog",
};

export default function BlogPage() {
  const posts = getAllBlogPosts();

  return (
    <main className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="border-b border-border/30">
        <div className="max-w-4xl mx-auto px-6 py-8">
          <div className="flex items-center gap-2 mb-4">
            <Link href="/" className="text-accent hover:text-accent/80 text-sm">
              ← Back to Learn to Code
            </Link>
          </div>
          <h1 className="text-4xl font-bold tracking-tight mb-4">
            Rust Learning Blog
          </h1>
          <p className="text-lg text-muted max-w-2xl">
            Expert guides on mastering Rust through interactive practice, online compilers, and hands-on learning approaches.
          </p>
        </div>
      </header>

      {/* Posts Grid */}
      <section className="max-w-4xl mx-auto px-6 py-12">
        <div className="grid gap-8 md:gap-12">
          {posts.map((post) => (
            <article key={post.slug} className="border-b border-border/20 pb-8 last:border-b-0">
              <div className="flex items-center gap-3 text-sm text-muted mb-3">
                <span className="bg-surface px-2 py-1 rounded-md font-medium">
                  {post.category}
                </span>
                <time dateTime={post.publishedAt}>
                  {new Date(post.publishedAt).toLocaleDateString('en-US', {
                    month: 'long',
                    day: 'numeric',
                    year: 'numeric'
                  })}
                </time>
                <span>·</span>
                <span>{post.readingTime} min read</span>
              </div>
              
              <h2 className="text-2xl font-bold mb-3 hover:text-accent transition-colors">
                <Link href={`/blog/${post.slug}`}>
                  {post.title}
                </Link>
              </h2>
              
              <p className="text-muted leading-relaxed mb-4">
                {post.description}
              </p>
              
              <Link 
                href={`/blog/${post.slug}`}
                className="inline-flex items-center text-accent hover:text-accent/80 font-medium"
              >
                Read article →
              </Link>
            </article>
          ))}
        </div>
      </section>

      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Blog",
            "name": "Learn to Code Blog",
            "description": "Expert guides on learning Rust programming through interactive practice",
            "url": "https://learntocode.notcodesid.com/blog",
            "publisher": {
              "@type": "Organization",
              "name": "Learn to Code",
              "url": "https://learntocode.notcodesid.com"
            },
            "blogPost": posts.map(post => ({
              "@type": "BlogPosting",
              "headline": post.title,
              "description": post.description,
              "url": `https://learntocode.notcodesid.com/blog/${post.slug}`,
              "datePublished": post.publishedAt,
              "dateModified": post.updatedAt || post.publishedAt
            }))
          })
        }}
      />
    </main>
  );
}