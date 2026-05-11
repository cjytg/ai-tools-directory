import { getAllTools, getCategories } from "@/lib/tools";
import { getAllPosts } from "@/lib/blog";
import { CATEGORIES } from "@/types";
import Link from "next/link";

export default function Home() {
  const tools = getAllTools();
  const categories = getCategories();
  const featuredTools = tools.filter((t) => t.rating >= 4.5).slice(0, 6);
  const latestPosts = getAllPosts().slice(0, 6);

  return (
    <div>
      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Find the Best AI Tools
          </h1>
          <p className="text-lg text-[#71717a] mb-8">
            Discover, compare, and choose from {tools.length}+ AI tools.
            Honest reviews, real pricing, no fluff.
          </p>
          <div className="flex gap-4 justify-center">
            <a
              href="/tools"
              className="px-6 py-3 bg-[#3b82f6] hover:bg-[#2563eb] rounded-lg font-medium transition"
            >
              Browse All Tools
            </a>
            <a
              href="/blog"
              className="px-6 py-3 border border-[#27272a] hover:border-[#3b82f6] rounded-lg font-medium transition"
            >
              Read Reviews
            </a>
          </div>
        </div>
      </section>

      {/* Featured Tools */}
      <section className="py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold">Top Rated AI Tools</h2>
            <Link href="/tools" className="text-[#3b82f6] text-sm hover:underline">
              View all →
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {featuredTools.map((tool) => (
              <Link
                key={tool.slug}
                href={`/tools/${tool.slug}`}
                className="p-6 bg-[#18181b] border border-[#27272a] rounded-xl hover:border-[#3b82f6] transition"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 bg-[#27272a] rounded-lg flex items-center justify-center text-lg font-bold">
                    {tool.name.charAt(0)}
                  </div>
                  <div>
                    <h3 className="font-semibold">{tool.name}</h3>
                    <span className="text-sm text-[#71717a]">{tool.company}</span>
                  </div>
                </div>
                <p className="text-sm text-[#71717a] mb-4 line-clamp-2">{tool.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-sm px-2 py-1 bg-[#27272a] rounded">
                    {tool.price}
                  </span>
                  <span className="text-sm text-[#3b82f6]">
                    ★ {tool.rating}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-12 px-4 bg-[#0f0f0f]">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl font-bold mb-8">Browse by Category</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {categories.map((cat) => {
              const count = tools.filter((t) => t.category === cat).length;
              return (
                <Link
                  key={cat}
                  href={`/categories/${cat}`}
                  className="p-4 bg-[#18181b] border border-[#27272a] rounded-lg hover:border-[#3b82f6] transition text-center"
                >
                  <div className="text-2xl mb-2">
                    {cat === "chatbot" && "💬"}
                    {cat === "image" && "🎨"}
                    {cat === "coding" && "💻"}
                    {cat === "writing" && "✍️"}
                    {cat === "video" && "🎬"}
                    {cat === "audio" && "🎵"}
                    {cat === "design" && "🎯"}
                    {cat === "productivity" && "⚡"}
                    {cat === "marketing" && "📈"}
                    {cat === "search" && "🔍"}
                    {cat === "translation" && "🌐"}
                  </div>
                  <div className="font-medium">{CATEGORIES[cat] || cat}</div>
                  <div className="text-sm text-[#71717a]">{count} tools</div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Latest Blog Posts */}
      <section className="py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold">Latest Reviews & Guides</h2>
            <Link href="/blog" className="text-[#3b82f6] text-sm hover:underline">
              View all →
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {latestPosts.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="p-6 bg-[#18181b] border border-[#27272a] rounded-xl hover:border-[#3b82f6] transition"
              >
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-xs px-2 py-1 bg-[#27272a] rounded capitalize">
                    {post.category}
                  </span>
                  <span className="text-xs text-[#71717a]">{post.date}</span>
                </div>
                <h3 className="font-semibold mb-2 line-clamp-2">{post.title}</h3>
                <p className="text-sm text-[#71717a] line-clamp-2">{post.description}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 bg-[#0f0f0f]">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Find Your AI Tool?</h2>
          <p className="text-[#71717a] mb-8">
            Browse our collection of {tools.length} AI tools with honest reviews and real pricing.
          </p>
          <Link
            href="/tools"
            className="inline-block px-8 py-3 bg-[#3b82f6] hover:bg-[#2563eb] rounded-lg font-medium transition"
          >
            Explore All Tools
          </Link>
        </div>
      </section>
    </div>
  );
}
