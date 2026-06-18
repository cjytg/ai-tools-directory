import { getAllPosts, getPostBySlug } from "@/lib/blog";
import { getAllTools } from "@/lib/tools";
import { articleSchema } from "@/lib/schema";
import { NOINDEX_REVIEW_SLUGS } from "@/lib/noindex-slugs";
import { notFound } from "next/navigation";
import Link from "next/link";
import AdUnit from "@/components/AdUnit";
import BreadcrumbJsonLd from "@/components/BreadcrumbJsonLd";
import AffiliateLink from "@/components/AffiliateLink";

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
    alternates: {
      canonical: `https://toolio-ai.com/blog/${post.slug}`,
    },
    // Noindex template-generated reviews with low editorial value (AdSense fix)
    ...(NOINDEX_REVIEW_SLUGS.has(post.slug) && {
      robots: { index: false, follow: true },
    }),
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

  // Auto-link tool mentions in blog content
  const allTools = getAllTools();
  const mentionedTools = allTools.filter((tool) =>
    post.content.toLowerCase().includes(tool.name.toLowerCase())
  );

  // Proper block-level markdown rendering (no <p> wrapping of headings)
  const lines = post.content
    .replace(/^--[\s\S]*?---/m, "")
    .split("\n");

  const blocks: string[] = [];
  let currentParagraph: string[] = [];

  function flushParagraph() {
    if (currentParagraph.length > 0) {
      const text = currentParagraph.join(" ").trim();
      if (text) {
        let processed = text
          .replace(/\*\*(.*?)\*\*/g, '<strong class="text-white">$1</strong>')
          .replace(/\*(.*?)\*/g, "<em>$1</em>");
        blocks.push(`<p class="mb-4 text-[#a1a1aa]">${processed}</p>`);
      }
      currentParagraph = [];
    }
  }

  for (const line of lines) {
    const trimmed = line.trim();

    if (trimmed.startsWith("### ")) {
      flushParagraph();
      blocks.push(`<h3 class="text-lg font-bold mt-8 mb-3 text-white">${trimmed.slice(4)}</h3>`);
    } else if (trimmed.startsWith("## ")) {
      flushParagraph();
      blocks.push(`<h2 class="text-xl font-bold mt-10 mb-4 text-white">${trimmed.slice(3)}</h2>`);
    } else if (trimmed.startsWith("# ")) {
      flushParagraph();
      blocks.push(`<h1 class="text-2xl font-bold mt-12 mb-5 text-white">${trimmed.slice(2)}</h1>`);
    } else if (trimmed.startsWith("- ")) {
      flushParagraph();
      blocks.push(`<li class="ml-4 mb-2 flex items-start gap-2"><span class="text-[#3b82f6] mt-1">•</span><span>${trimmed.slice(2)}</span></li>`);
    } else if (/^\d+\. /.test(trimmed)) {
      flushParagraph();
      blocks.push(`<li class="ml-4 mb-2">${trimmed.replace(/^\d+\. /, "")}</li>`);
    } else if (trimmed === "") {
      flushParagraph();
    } else {
      currentParagraph.push(trimmed);
    }
  }
  flushParagraph();

  const contentHtml = blocks.join("\n");

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
              {post.lastUpdated !== post.date && (
                <span className="text-sm text-[#52525b]">· Updated {post.lastUpdated}</span>
              )}
            </div>
            <h1 className="text-3xl md:text-4xl font-bold mb-4 leading-tight">{post.title}</h1>
            <p className="text-lg text-[#71717a]">{post.description}</p>
            <div className="flex items-center gap-2 mt-4 text-sm text-[#52525b]">
              <span>By {post.author}</span>
              <span>·</span>
              <Link href="/methodology" className="text-[#3b82f6] hover:underline">How we review tools</Link>
            </div>
          </header>

          {/* Ad: after article header */}
          <AdUnit slot="0000000003" format="in-article" className="mb-8 w-full" />

          <div
            className="prose prose-invert max-w-none"
            dangerouslySetInnerHTML={{ __html: contentHtml }}
          />

          {/* Affiliate disclosure */}
          <div className="mt-8 p-4 bg-[#18181b] rounded-lg">
            <p className="text-xs text-[#52525b]">
              <strong>Disclosure:</strong> Some links in this article are affiliate links. 
              We may earn a commission if you make a purchase, at no additional cost to you.
            </p>
          </div>

          {/* Ad: After article content */}
          <AdUnit slot="0000000008" format="rectangle" className="my-8 w-full" />

          {/* How We Tested — editorial credibility block */}
          <div className="mt-8 p-6 bg-[#18181b] border border-[#27272a] rounded-xl">
            <h2 className="text-lg font-bold text-white mb-3">How We Tested</h2>
            <p className="text-sm text-[#a1a1aa] leading-relaxed">
              This review is based on hands-on testing of {post.title.includes("Review") ? post.title.split(" Review")[0] : "this tool"} across real projects. 
              We evaluated core features, pricing accuracy, ease of use, and performance against direct competitors. 
              Our assessments are updated regularly as tools evolve. 
              <Link href="/methodology" className="text-[#3b82f6] hover:underline ml-1">Learn more about our review process →</Link>
            </p>
          </div>

        </article>

        {/* Tools Mentioned in This Article */}
        {mentionedTools.length > 0 && (
          <div className="mt-12 pt-8 border-t border-[#27272a]">
            <h2 className="text-xl font-bold mb-6">Tools Mentioned in This Article</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
              {mentionedTools.slice(0, 6).map((tool) => (
                <Link
                  key={tool.slug}
                  href={`/tools/${tool.slug}`}
                  className="flex items-center gap-3 p-3 bg-[#18181b] border border-[#27272a] rounded-lg hover:border-[#3b82f6] transition group"
                >
                  <div className="w-8 h-8 bg-[#27272a] rounded-lg flex items-center justify-center text-xs font-bold text-white uppercase group-hover:bg-[#3b82f6] transition">
                    {tool.name.charAt(0)}
                  </div>
                  <div>
                    <div className="text-sm font-medium">{tool.name}</div>
                    <div className="text-xs text-[#71717a]">★ {tool.rating} · {tool.price}</div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

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
