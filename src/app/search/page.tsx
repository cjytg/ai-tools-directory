"use client";

import { useState, useMemo } from "react";
import Link from "next/link";

// Mock data for client-side search
const CATEGORIES: Record<string, string> = {
  chatbot: "AI Chatbots",
  image: "AI Image Generators",
  coding: "AI Coding Assistants",
  writing: "AI Writing Tools",
  video: "AI Video Tools",
  audio: "AI Audio Tools",
  design: "AI Design Tools",
  productivity: "AI Productivity Tools",
  marketing: "AI Marketing Tools",
  search: "AI Search Engines",
  translation: "AI Translation Tools",
};

// Popular search suggestions
const SUGGESTIONS = [
  "chatgpt", "midjourney", "cursor", "claude", 
  "coding", "writing", "image", "free", "video"
];

export default function SearchPage() {
  const [query, setQuery] = useState("");

  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-8">Search</h1>

      <div className="relative mb-8">
        <input
          type="text"
          placeholder="Search tools, categories, or articles..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full px-4 py-3 bg-[#18181b] border border-[#27272a] rounded-lg text-white placeholder-[#71717a] focus:outline-none focus:border-[#3b82f6] pl-12"
          autoFocus
        />
        <span className="absolute left-4 top-3.5 text-[#71717a] text-lg">🔍</span>
      </div>

      {query.length < 2 && (
        <div className="text-center py-12 text-[#71717a]">
          <p className="mb-6">Start typing to search tools and articles</p>
          <div className="flex flex-wrap justify-center gap-2">
            {SUGGESTIONS.map((term) => (
              <button
                key={term}
                onClick={() => setQuery(term)}
                className="px-3 py-1.5 bg-[#18181b] border border-[#27272a] rounded-lg text-sm hover:border-[#3b82f6] transition"
              >
                {term}
              </button>
            ))}
          </div>
        </div>
      )}

      {query.length >= 2 && (
        <div className="space-y-4">
          <p className="text-sm text-[#71717a]">
            Search results for &quot;{query}&quot;
          </p>
          
          {/* Direct links to relevant pages */}
          <div className="space-y-3">
            {CATEGORIES[query.toLowerCase()] && (
              <Link
                href={`/categories/${query.toLowerCase()}`}
                className="block p-4 bg-[#18181b] border border-[#27272a] rounded-lg hover:border-[#3b82f6] transition"
              >
                <div className="font-medium">Browse {CATEGORIES[query.toLowerCase()]}</div>
                <div className="text-sm text-[#71717a]">View all tools in this category</div>
              </Link>
            )}
            
            <Link
              href={`/blog/best-${query.toLowerCase()}-tools`}
              className="block p-4 bg-[#18181b] border border-[#27272a] rounded-lg hover:border-[#3b82f6] transition"
            >
              <div className="font-medium">Best {query} tools</div>
              <div className="text-sm text-[#71717a]">Read our guide</div>
            </Link>

            <Link
              href={`/tools/${query.toLowerCase()}`}
              className="block p-4 bg-[#18181b] border border-[#27272a] rounded-lg hover:border-[#3b82f6] transition"
            >
              <div className="font-medium">{query} review</div>
              <div className="text-sm text-[#71717a]">Read detailed review</div>
            </Link>
          </div>

          <div className="mt-8 text-center">
            <Link
              href="/tools"
              className="text-[#3b82f6] hover:underline"
            >
              Browse all tools →
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
