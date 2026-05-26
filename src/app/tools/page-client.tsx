"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import ToolLogo from "@/components/ToolLogo";
import { CATEGORIES } from "@/types";

type Tool = {
  slug: string;
  name: string;
  category: string;
  pricing: string;
  price: string;
  description: string;
  rating: number;
  company: string;
  founded: number;
  website: string;
};

type SortBy = "rating" | "name" | "founded";
type PricingFilter = "all" | "free" | "freemium" | "paid";

export default function ToolsPageClient({ tools }: { tools: Tool[] }) {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [pricing, setPricing] = useState<PricingFilter>("all");
  const [sortBy, setSortBy] = useState<SortBy>("rating");

  const categories = [...new Set(tools.map(t => t.category))];

  const filteredTools = useMemo(() => {
    let result = [...tools];

    if (search) {
      const q = search.toLowerCase();
      result = result.filter(
        (t) =>
          t.name.toLowerCase().includes(q) ||
          t.description.toLowerCase().includes(q) ||
          t.company.toLowerCase().includes(q)
      );
    }

    if (category !== "all") {
      result = result.filter((t) => t.category === category);
    }

    if (pricing !== "all") {
      result = result.filter((t) => t.pricing === pricing);
    }

    result.sort((a, b) => {
      switch (sortBy) {
        case "rating":
          return b.rating - a.rating;
        case "name":
          return a.name.localeCompare(b.name);
        case "founded":
          return b.founded - a.founded;
        default:
          return 0;
      }
    });

    return result;
  }, [tools, search, category, pricing, sortBy]);

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-2">All AI Tools</h1>
      <p className="text-[#71717a] mb-8">{tools.length} tools available</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="relative">
          <input
            type="text"
            placeholder="Search tools..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full px-4 py-2.5 bg-[#18181b] border border-[#27272a] rounded-lg text-sm focus:outline-none focus:border-[#3b82f6] pl-10"
          />
          <span className="absolute left-3 top-2.5 text-[#71717a]">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8"/>
              <line x1="21" y1="21" x2="16.65" y2="16.65"/>
            </svg>
          </span>
        </div>

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="px-4 py-2.5 bg-[#18181b] border border-[#27272a] rounded-lg text-sm focus:outline-none focus:border-[#3b82f6]"
        >
          <option value="all">All Categories</option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {CATEGORIES[cat] || cat}
            </option>
          ))}
        </select>

        <select
          value={pricing}
          onChange={(e) => setPricing(e.target.value as PricingFilter)}
          className="px-4 py-2.5 bg-[#18181b] border border-[#27272a] rounded-lg text-sm focus:outline-none focus:border-[#3b82f6]"
        >
          <option value="all">All Pricing</option>
          <option value="free">Free</option>
          <option value="freemium">Freemium</option>
          <option value="paid">Paid</option>
        </select>

        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value as SortBy)}
          className="px-4 py-2.5 bg-[#18181b] border border-[#27272a] rounded-lg text-sm focus:outline-none focus:border-[#3b82f6]"
        >
          <option value="rating">Sort by Rating</option>
          <option value="name">Sort by Name</option>
          <option value="founded">Sort by Newest</option>
        </select>
      </div>

      <p className="text-sm text-[#71717a] mb-4">
        Showing {filteredTools.length} of {tools.length} tools
      </p>

      <div className="grid grid-cols-1 gap-4">
        {filteredTools.map((tool) => (
          <Link
            key={tool.slug}
            href={`/tools/${tool.slug}`}
            className="group p-6 bg-[#18181b] border border-[#27272a] rounded-xl hover:border-[#3b82f6] transition-all flex items-start gap-4"
          >
            <ToolLogo name={tool.name} slug={tool.slug} size="md" website={tool.website} />
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-3 mb-1 flex-wrap">
                <h2 className="font-semibold text-lg">{tool.name}</h2>
                <span className="text-xs px-2 py-0.5 bg-[#27272a] rounded">
                  {CATEGORIES[tool.category] || tool.category}
                </span>
                <span className="text-xs px-2 py-0.5 bg-[#3b82f6]/10 text-[#3b82f6] rounded">
                  ★ {tool.rating}
                </span>
              </div>
              <p className="text-[#71717a] mb-2 line-clamp-2">{tool.description}</p>
              <div className="flex items-center gap-4 text-sm text-[#71717a]">
                <span>{tool.price}</span>
                <span>{tool.company}</span>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {filteredTools.length === 0 && (
        <div className="text-center py-12">
          <p className="text-[#71717a] mb-4">No tools found matching your criteria.</p>
          <button
            onClick={() => {
              setSearch("");
              setCategory("all");
              setPricing("all");
            }}
            className="text-[#3b82f6] hover:underline"
          >
            Clear filters
          </button>
        </div>
      )}
    </div>
  );
}
