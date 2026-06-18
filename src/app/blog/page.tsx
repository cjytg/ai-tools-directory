import { getAllPosts } from "@/lib/blog";
import { NOINDEX_REVIEW_SLUGS } from "@/lib/noindex-slugs";
import Link from "next/link";

export const metadata = {
  title: "AI Tools Blog - Guides, Reviews & Tutorials",
  description: "Learn about AI tools with our in-depth guides, reviews, and tutorials.",
  alternates: {
    canonical: "https://toolio-ai.com/blog",
  },
};

export default function BlogPage() {
  const posts = getAllPosts().filter((p) => !NOINDEX_REVIEW_SLUGS.has(p.slug));

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-2">Blog</h1>
      <p className="text-[#71717a] mb-8">{posts.length} articles about AI tools</p>

      <div className="space-y-4">
        {posts.map((post) => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            className="block p-6 bg-[#18181b] border border-[#27272a] rounded-xl hover:border-[#3b82f6] transition"
          >
            <div className="flex items-center gap-3 mb-2">
              <span className="text-xs px-2 py-1 bg-[#27272a] rounded capitalize">
                {post.category}
              </span>
              <span className="text-xs text-[#71717a]">{post.date}</span>
            </div>
            <h2 className="font-semibold text-lg mb-2">{post.title}</h2>
            <p className="text-sm text-[#71717a] line-clamp-2">{post.description}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
