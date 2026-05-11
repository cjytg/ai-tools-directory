import { getAllPosts, getPostBySlug } from "@/lib/blog";
import { notFound } from "next/navigation";
import Link from "next/link";

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
  };
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  // Simple markdown-like rendering
  const contentHtml = post.content
    .replace(/^---[\s\S]*?---/m, "") // Remove frontmatter
    .replace(/^### (.*$)/gm, '<h3 class="text-lg font-bold mt-6 mb-3">$1</h3>')
    .replace(/^## (.*$)/gm, '<h2 class="text-xl font-bold mt-8 mb-4">$1</h2>')
    .replace(/^# (.*$)/gm, '<h1 class="text-2xl font-bold mt-10 mb-5">$1</h1>')
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.*?)\*/g, '<em>$1</em>')
    .replace(/^- (.*$)/gm, '<li class="ml-4 mb-1">• $1</li>')
    .replace(/^\d+\. (.*$)/gm, '<li class="ml-4 mb-1">$1</li>')
    .replace(/^\|.*\|$/gm, (match) => {
      const cells = match.split("|").filter(Boolean).map(c => c.trim());
      if (cells.every(c => c.match(/^-+$/))) return "";
      return `<tr>${cells.map(c => `<td class="border border-[#27272a] px-3 py-2">${c}</td>`).join("")}</tr>`;
    })
    .replace(/\n\n/g, '</p><p class="mb-4">')
    .replace(/\n/g, "<br/>");

  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-[#71717a] mb-8">
        <Link href="/blog" className="hover:text-white transition">Blog</Link>
        <span>/</span>
        <span className="capitalize">{post.category}</span>
      </div>

      <article>
        <header className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-xs px-2 py-1 bg-[#27272a] rounded capitalize">
              {post.category}
            </span>
            <span className="text-sm text-[#71717a]">{post.date}</span>
          </div>
          <h1 className="text-3xl font-bold mb-4">{post.title}</h1>
          <p className="text-lg text-[#71717a]">{post.description}</p>
        </header>

        <div 
          className="prose prose-invert max-w-none"
          dangerouslySetInnerHTML={{ __html: `<p class="mb-4">${contentHtml}</p>` }}
        />
      </article>

      {/* Related articles */}
      <div className="mt-12 pt-8 border-t border-[#27272a]">
        <h2 className="text-xl font-bold mb-4">More Articles</h2>
        <div className="flex gap-4">
          <Link href="/blog" className="text-[#3b82f6] hover:underline">
            View all articles →
          </Link>
        </div>
      </div>
    </div>
  );
}
