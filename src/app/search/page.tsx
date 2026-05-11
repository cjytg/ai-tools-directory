"use client";

import { useState } from "react";
import { getAllTools } from "@/lib/tools";
import { CATEGORIES } from "@/types";
import Link from "next/link";

export default function SearchPage() {
  const [query, setQuery] = useState("");
  const tools = getAllTools();
  
  const filteredTools = query.length > 0
    ? tools.filter(
        (t) =>
          t.name.toLowerCase().includes(query.toLowerCase()) ||
          t.description.toLowerCase().includes(query.toLowerCase()) ||
          t.category.toLowerCase().includes(query.toLowerCase()) ||
          t.company.toLowerCase().includes(query.toLowerCase())
      )
    : [];

  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-8">Search AI Tools</h1>
      
      <div className="relative mb-8">
        <input
          type="text"
          placeholder="Search tools, categories, or companies..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full px-4 py-3 bg-[#18181b] border border-[#27272a] rounded-lg text-white placeholder-[#71717a] focus:outline-none focus:border-[#3b82f6]"
        />
        <span className="absolute right-4 top-3 text-[#71717a]">🔍</span>
      </div>

      {query.length > 0 && (
        <p className="text-sm text-[#71717a] mb-4">
          {filteredTools.length} results for &quot;{query}&quot;
        </p>
      )}

      <div className="space-y-4">
        {filteredTools.map((tool) => (
          <Link
            key={tool.slug}
            href={`/tools/${tool.slug}`}
            className="block p-4 bg-[#18181b] border border-[#27272a] rounded-lg hover:border-[#3b82f6] transition"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-[#27272a] rounded-lg flex items-center justify-center text-lg font-bold">
                {tool.name.charAt(0)}
              </div>
              <div>
                <h3 className="font-semibold">{tool.name}</h3>
                <div className="flex items-center gap-2 text-sm text-[#71717a]">
                  <span className="capitalize">{CATEGORIES[tool.category] || tool.category}</span>
                  <span>•</span>
                  <span>{tool.price}</span>
                  <span>•</span>
                  <span>★ {tool.rating}</span>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {query.length === 0 && (
        <div className="text-center py-12 text-[#71717a]">
          <p>Start typing to search {tools.length} AI tools</p>
        </div>
      )}
    </div>
  );
}
