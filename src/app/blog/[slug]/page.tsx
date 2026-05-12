import { getAllPosts, getPostBySlug } from "@/lib/blog";
import { articleSchema } from "@/lib/schema";
import { notFound } from "next/navigation";
import Link from "next/link";
import AdUnit from "@/components/AdUnit";
import BreadcrumbJsonLd from "@/components/BreadcrumbJsonLd";

export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return { title: "Post Not Found" };
  return {
    title: post.title,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      type: "article",
      publishedTime: post.date,
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
    },
  };
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const schema = articleSchema(post);
  const allPosts = getAllPosts();
  const relatedPosts = allPosts
    .filter((p) => p.category === post.category && p.slug !== post.slug)
    .slice(0, 3);

  // Simple markdown rendering
  const contentHtml = post.content
    .replace(/^--[\s\S]*?---/m, "")
    .replace(/^### (.*$)/gm, '<h3 class="text-lg font-bold mt-8 mb-3 text-white">$1</h3>')
    .replace(/^## (.*$)/gm, '<h2 class="text-xl font-bold mt-10 mb-4 text-white">$1</h2>')
    .replace(/^# (.*$)/gm, '<h1 class="text-2xl font-bold mt-12 mb-5 text-white">$1</h1>')
    .replace(/\*\*(.*?)\*\*/g, '<strong class="text-white">$1</strong>')
    .replace(/\*(.*?)\*/g, '<em>$1</em>')
    .replace(/^- (.*$)/gm, '<li class="ml-4 mb-2 flex items-start gap-2"><span class="text-[#3b82f6] mt-1">•</span><span>$1</span></li>')
    .replace(/^\d+\. (.*$)/gm, '<li class="ml-4 mb-2">$1</li>')
    .replace(/\n\n/g, '</p><p class="mb-4 text-[#a1a1aa]">')
    .replace(/\n/g, "<br/>");

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: "https://toolio-ai.com" },
          { name: "Blog", url: "https://toolio-ai.com/blog" },
          { name: post.title, url: `https://toolio-ai.com/blog/${post.slug}` },
        ]}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <div className="max-w-3xl mx-auto px-4 py-12">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-[#71717a] mb-8">
          <Link href="/" className="hover:text-white transition">Home</Link>
          <span>/</span>
          <Link href="/blog" className="hover:text-white transition">Blog</Link>
          <span>/</span>
          <span className="text-white capitalize">{post.category}</span>
        </nav>

        <article>
          <header className="mb-10">
            <div className="flex items-center gap-3 mb-4">
              <Link
                href={`/categories/${post.category}`}
                className="text-xs px-2 py-1 bg-[#27272a] rounded capitalize hover:bg-[#3b82f6]/10 hover:text-[#3b82f6] transition"
              >
                {post.category}
              </Link>
              <span className="text-sm text-[#71717a]">{post.date}</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold mb-4 leading-tight">{post.title}</h1>
            <p className="text-lg text-[#71717a]">{post.description}</p>
          </header>

          {/* Ad: after article header */}
          <AdUnit slot="0000000003" format="in-article" className="mb-8 w-full" />

          <div
            className="prose prose-invert max-w-none"
            dangerouslySetInnerHTML={{ __html: `<p class="mb-4 text-[#a1a1aa]">${contentHtml}</p>` }}
          />

          {/* Affiliate disclosure */}
          <div className="mt-8 p-4 bg-[#18181b] rounded-lg">
            <p className="text-xs text-[#52525b]">
              <strong>Disclosure:</strong> Some links in this article are affiliate links. 
              We may earn a commission if you make a purchase, at no additional cost to you.
            </p>
          </div>
        </article>

        {/* Related articles */}
        {relatedPosts.length > 0 && (
          <div className="mt-12 pt-8 border-t border-[#27272a]">
            <h2 className="text-xl font-bold mb-6">Related Articles</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {relatedPosts.map((related) => (
                <Link
                  key={related.slug}
                  href={`/blog/${related.slug}`}
                  className="p-4 bg-[#18181b] border border-[#27272a] rounded-lg hover:border-[#3b82f6] transition"
                >
                  <span className="text-xs text-[#71717a] capitalize">{related.category}</span>
                  <h3 className="font-medium mt-1 line-clamp-2 text-sm">{related.title}</h3>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* CTA */}
        <div className="mt-12 p-8 bg-[#18181b] border border-[#27272a] rounded-xl text-center">
          <h2 className="text-xl font-bold mb-2">Explore More AI Tools</h2>
          <p className="text-[#71717a] mb-4">Browse our collection of 100+ AI tools with honest reviews.</p>
          <Link
            href="/tools"
            className="inline-block px-6 py-3 bg-[#3b82f6] text-white rounded-lg font-medium hover:bg-[#2563eb] transition"
          >
            Browse All Tools
          </Link>
        </div>
      </div>
    </>
  );
}
