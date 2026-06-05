import { getAllTools, getCategories } from "@/lib/tools";
import { getAllPosts } from "@/lib/blog";
import { CATEGORIES } from "@/types";
import Link from "next/link";
import Icon from "@/components/Icon";
import ToolLogo from "@/components/ToolLogo";
import AdUnit from "@/components/AdUnit";
import SpotlightCard from "@/components/SpotlightCard";
import ShinyText from "@/components/ShinyText";
import DotField from "@/components/DotField";

export const metadata = {
  alternates: {
    canonical: "https://toolio-ai.com",
  },
};

export default function Home() {
  const tools = getAllTools();
  const categories = getCategories();
  const featuredTools = tools.filter((t) => t.rating >= 4.5).slice(0, 6);
  const latestPosts = getAllPosts().slice(0, 6);

  return (
    <div>
      {/* Hero */}
      <section className="relative py-20 px-4 overflow-hidden">
        {/* DotField background */}
        <div className="absolute inset-0 opacity-60">
          <DotField
            dotRadius={1.2}
            dotSpacing={18}
            cursorRadius={400}
            bulgeStrength={50}
            gradientFrom="rgba(59, 130, 246, 0.12)"
            gradientTo="rgba(139, 92, 246, 0.08)"
            glowColor="#3b82f6"
          />
        </div>

        <div className="relative max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#18181b] border border-[#27272a] rounded-full text-sm text-[#71717a] mb-6">
            <span className="w-2 h-2 bg-green-500 rounded-full"></span>
            Updated daily
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
            Find the{" "}
            <ShinyText
              text="best AI tools"
              speed={4}
              className="bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent"
            />{" "}
            for your workflow
          </h1>
          <p className="text-lg text-[#71717a] mb-8 max-w-2xl mx-auto">
            {tools.length}+ AI tools reviewed and compared. Honest takes, real
            pricing, no affiliate BS.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/tools"
              className="px-6 py-3 bg-[#3b82f6] text-white rounded-lg font-medium hover:bg-[#2563eb] transition"
            >
              Browse {tools.length}+ Tools
            </Link>
            <Link
              href="/blog"
              className="px-6 py-3 border border-[#3f3f46] text-white rounded-lg font-medium hover:border-[#3b82f6] transition"
            >
              Read Reviews
            </Link>
          </div>
        </div>
      </section>

      {/* Trusted by */}
      <section className="py-8 px-4 border-y border-[#27272a]">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-sm text-[#52525b] mb-4">
            Trusted by developers and teams at
          </p>
          <div className="flex flex-wrap items-center justify-center gap-8 text-[#3f3f46]">
            <span className="text-lg font-semibold">Google</span>
            <span className="text-lg font-semibold">Microsoft</span>
            <span className="text-lg font-semibold">Meta</span>
            <span className="text-lg font-semibold">OpenAI</span>
            <span className="text-lg font-semibold">Stripe</span>
          </div>
        </div>
      </section>

      {/* Ad: below trusted-by section */}
      <section className="py-4 px-4">
        <div className="max-w-4xl mx-auto">
          <AdUnit slot="0000000004" format="leaderboard" className="w-full" />
        </div>
      </section>

      {/* Featured Tools */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl font-bold">Top Rated Tools</h2>
              <p className="text-sm text-[#71717a] mt-1">
                Our highest-rated AI tools based on real testing
              </p>
            </div>
            <Link
              href="/tools"
              className="text-[#3b82f6] text-sm hover:underline"
            >
              View all &rarr;
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {featuredTools.map((tool, i) => (
              <SpotlightCard
                key={tool.slug}
                className="rounded-xl border border-[#27272a] bg-[#18181b]"
              >
                <Link
                  href={`/tools/${tool.slug}`}
                  className="group block p-6"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <ToolLogo
                      name={tool.name}
                      slug={tool.slug}
                      size="sm"
                      website={tool.website}
                    />
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold truncate">{tool.name}</h3>
                      <span className="text-sm text-[#71717a]">
                        {tool.company}
                      </span>
                    </div>
                    {i === 0 && (
                      <span className="px-2 py-0.5 bg-yellow-500/10 text-yellow-500 text-xs rounded-full font-medium">
                        #1
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-[#71717a] mb-4 line-clamp-2">
                    {tool.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm px-2 py-1 bg-[#27272a] rounded">
                      {tool.price}
                    </span>
                    <span className="text-sm text-[#3b82f6] font-medium">
                      ★ {tool.rating}
                    </span>
                  </div>
                </Link>
              </SpotlightCard>
            ))}
          </div>
        </div>
      </section>

      {/* Ad: After Featured Tools */}
      <section className="py-8 px-4">
        <div className="max-w-7xl mx-auto">
          <AdUnit slot="0000000005" format="leaderboard" className="w-full" />
        </div>
      </section>

      {/* Categories */}
      <section className="py-16 px-4 bg-[#0f0f0f]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-2xl font-bold mb-2">Browse by Category</h2>
            <p className="text-[#71717a]">
              Find the right AI tool for your specific needs
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {categories.map((cat) => {
              const count = tools.filter((t) => t.category === cat).length;
              return (
                <Link
                  key={cat}
                  href={`/categories/${cat}`}
                  className="group p-5 bg-[#18181b] border border-[#27272a] rounded-xl hover:border-[#3b82f6] transition-all hover:shadow-lg hover:shadow-blue-500/5"
                >
                  <div className="mb-3 text-[#a1a1aa]">
                    <Icon name={cat} size="lg" />
                  </div>
                  <div className="font-semibold mb-1 group-hover:text-[#3b82f6] transition-colors">
                    {CATEGORIES[cat] || cat}
                  </div>
                  <div className="text-sm text-[#71717a]">{count} tools</div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Ad: After Categories */}
      <section className="py-8 px-4">
        <div className="max-w-7xl mx-auto">
          <AdUnit slot="0000000006" format="leaderboard" className="w-full" />
        </div>
      </section>

      {/* Latest Posts */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl font-bold">Latest Reviews & Guides</h2>
              <p className="text-sm text-[#71717a] mt-1">
                In-depth analysis to help you choose
              </p>
            </div>
            <Link
              href="/blog"
              className="text-[#3b82f6] text-sm hover:underline"
            >
              View all &rarr;
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {latestPosts.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group p-6 bg-[#18181b] border border-[#27272a] rounded-xl hover:border-[#3b82f6] transition-all"
              >
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-xs px-2 py-1 bg-[#27272a] rounded capitalize">
                    {post.category}
                  </span>
                  <span className="text-xs text-[#71717a]">{post.date}</span>
                </div>
                <h3 className="font-semibold mb-2 line-clamp-2 group-hover:text-[#3b82f6] transition-colors">
                  {post.title}
                </h3>
                <p className="text-sm text-[#71717a] line-clamp-2">
                  {post.description}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-16 px-4 bg-[#0f0f0f]">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-2xl font-bold mb-2">Stay updated</h2>
          <p className="text-[#71717a] mb-6">
            Get the latest AI tool reviews and recommendations. No spam,
            unsubscribe anytime.
          </p>
          <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 bg-[#18181b] border border-[#27272a] rounded-lg text-white placeholder-[#71717a] focus:outline-none focus:border-[#3b82f6]"
            />
            <button
              type="submit"
              className="px-6 py-3 bg-[#3b82f6] hover:bg-[#2563eb] text-white rounded-lg font-medium transition"
            >
              Subscribe
            </button>
          </form>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">
            Ready to find your AI tool?
          </h2>
          <p className="text-[#71717a] mb-8">
            Browse {tools.length}+ AI tools with honest reviews and real
            pricing.
          </p>
          <Link
            href="/tools"
            className="inline-block px-8 py-3 bg-[#3b82f6] text-white rounded-lg font-medium hover:bg-[#2563eb] transition"
          >
            Explore All Tools
          </Link>
        </div>
      </section>
    </div>
  );
}
