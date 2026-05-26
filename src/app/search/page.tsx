import { searchTools, getAllTools } from "@/lib/tools";
import { getAllPosts } from "@/lib/blog";
import { CATEGORIES, type Tool } from "@/types";
import Link from "next/link";
import ToolLogo from "@/components/ToolLogo";
import type { BlogPost } from "@/lib/blog";

export const metadata = {
  title: "Search AI Tools - Toolio",
  description: "Search across 100+ AI tools, reviews, and comparisons.",
  alternates: {
    canonical: "https://toolio-ai.com/search",
  },
};

export default function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  return <SearchContent searchParams={searchParams} />;
}

async function SearchContent({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const { q } = await searchParams;
  const query = q || "";

  let tools: Tool[] = [];
  let posts: BlogPost[] = [];

  if (query.length >= 2) {
    tools = searchTools(query);
    const allPosts = getAllPosts();
    const ql = query.toLowerCase();
    posts = allPosts.filter(
      (p) =>
        p.title.toLowerCase().includes(ql) ||
        p.description.toLowerCase().includes(ql) ||
        p.category.toLowerCase().includes(ql) ||
        p.slug.toLowerCase().includes(ql)
    );
  }

  // Popular search suggestions
  const suggestions = [
    "chatgpt",
    "midjourney",
    "cursor",
    "claude",
    "coding",
    "writing",
    "image",
    "free",
    "video",
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-8">Search AI Tools</h1>

      {/* Search Input */}
      <form className="relative mb-8">
        <input
          type="text"
          name="q"
          defaultValue={query}
          placeholder="Search tools, categories, or articles..."
          className="w-full px-4 py-3 bg-[#18181b] border border-[#27272a] rounded-lg text-white placeholder-[#71717a] focus:outline-none focus:border-[#3b82f6] pl-12"
          autoFocus
        />
        <span className="absolute left-4 top-3.5 text-[#71717a]">
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
        </span>
        <button
          type="submit"
          className="absolute right-2 top-2 px-4 py-1.5 bg-[#3b82f6] text-white rounded-md text-sm hover:bg-[#2563eb] transition"
        >
          Search
        </button>
      </form>

      {!query && (
        <div className="text-center py-12 text-[#71717a]">
          <p className="mb-6">
            Start typing to search tools and articles
          </p>
          <div className="flex flex-wrap justify-center gap-2">
            {suggestions.map((term) => (
              <Link
                key={term}
                href={`/search?q=${term}`}
                className="px-3 py-1.5 bg-[#18181b] border border-[#27272a] rounded-lg text-sm hover:border-[#3b82f6] transition"
              >
                {term}
              </Link>
            ))}
          </div>
        </div>
      )}

      {query.length >= 2 && tools.length === 0 && posts.length === 0 && (
        <div className="text-center py-12 text-[#71717a]">
          <p className="text-lg mb-2">No results for &quot;{query}&quot;</p>
          <p className="text-sm">Try different keywords or browse all tools</p>
          <Link
            href="/tools"
            className="inline-block mt-4 text-[#3b82f6] hover:underline"
          >
            Browse all tools →
          </Link>
        </div>
      )}

      {(tools.length > 0 || posts.length > 0) && (
        <div>
          <p className="text-sm text-[#71717a] mb-6">
            {tools.length + posts.length} result
            {tools.length + posts.length !== 1 ? "s" : ""} for
            &quot;{query}&quot;
          </p>

          {/* Tools Results */}
          {tools.length > 0 && (
            <section className="mb-10">
              <h2 className="text-lg font-bold mb-4">
                Tools ({tools.length})
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {tools.map((tool) => (
                  <Link
                    key={tool.slug}
                    href={`/tools/${tool.slug}`}
                    className="group p-5 bg-[#18181b] border border-[#27272a] rounded-xl hover:border-[#3b82f6] transition-all"
                  >
                    <div className="flex items-center gap-3 mb-2">
                      <ToolLogo
                        name={tool.name}
                        slug={tool.slug}
                        size="sm"
                        website={tool.website}
                      />
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold truncate">
                          {tool.name}
                        </h3>
                        <span className="text-sm text-[#71717a]">
                          {CATEGORIES[tool.category] || tool.category}
                        </span>
                      </div>
                      <span className="text-sm text-[#3b82f6] font-medium">
                        ★ {tool.rating}
                      </span>
                    </div>
                    <p className="text-sm text-[#71717a] line-clamp-2">
                      {tool.description}
                    </p>
                    <div className="mt-2 text-sm text-[#a1a1aa]">
                      {tool.price} · {tool.pricing}
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          )}

          {/* Blog Results */}
          {posts.length > 0 && (
            <section>
              <h2 className="text-lg font-bold mb-4">
                Articles ({posts.length})
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {posts.map((post) => (
                  <Link
                    key={post.slug}
                    href={`/blog/${post.slug}`}
                    className="group p-5 bg-[#18181b] border border-[#27272a] rounded-xl hover:border-[#3b82f6] transition-all"
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-xs px-2 py-1 bg-[#27272a] rounded capitalize">
                        {post.category}
                      </span>
                      <span className="text-xs text-[#71717a]">
                        {post.date}
                      </span>
                    </div>
                    <h3 className="font-semibold mb-1 line-clamp-2 group-hover:text-[#3b82f6] transition-colors">
                      {post.title}
                    </h3>
                    <p className="text-sm text-[#71717a] line-clamp-2">
                      {post.description}
                    </p>
                  </Link>
                ))}
              </div>
            </section>
          )}
        </div>
      )}
    </div>
  );
}
