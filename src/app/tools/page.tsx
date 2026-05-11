"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import ToolLogo from "@/components/ToolLogo";

// Inline tools data for client component
const toolsData = [
  {slug:"chatgpt",name:"ChatGPT",category:"chatbot",pricing:"freemium",price:"$20/mo",description:"AI chatbot by OpenAI for conversation, writing, coding, and analysis.",rating:4.5,company:"OpenAI",founded:2022,website:"https://chat.openai.com"},
  {slug:"claude",name:"Claude",category:"chatbot",pricing:"freemium",price:"$20/mo",description:"AI assistant by Anthropic focused on safety and helpfulness.",rating:4.6,company:"Anthropic",founded:2023,website:"https://claude.ai"},
  {slug:"midjourney",name:"Midjourney",category:"image",pricing:"paid",price:"$10-60/mo",description:"AI image generation tool known for artistic quality.",rating:4.7,company:"Midjourney",founded:2022,website:"https://midjourney.com"},
  {slug:"cursor",name:"Cursor",category:"coding",pricing:"freemium",price:"$20/mo",description:"AI-native code editor built for pair programming with AI.",rating:4.6,company:"Anysphere",founded:2023,website:"https://cursor.sh"},
  {slug:"github-copilot",name:"GitHub Copilot",category:"coding",pricing:"freemium",price:"$10/mo",description:"AI pair programmer that helps write code faster.",rating:4.5,company:"GitHub/Microsoft",founded:2021,website:"https://github.com/features/copilot"},
  {slug:"gemini",name:"Gemini",category:"chatbot",pricing:"freemium",price:"$20/mo",description:"Google's AI chatbot with strong multimodal capabilities.",rating:4.3,company:"Google",founded:2023,website:"https://gemini.google.com"},
  {slug:"perplexity",name:"Perplexity",category:"search",pricing:"freemium",price:"$20/mo",description:"AI-powered search engine that provides answers with sources.",rating:4.4,company:"Perplexity",founded:2022,website:"https://perplexity.ai"},
  {slug:"grammarly",name:"Grammarly",category:"writing",pricing:"freemium",price:"$12/mo",description:"AI writing assistant for grammar, clarity, and tone.",rating:4.5,company:"Grammarly",founded:2009,website:"https://grammarly.com"},
  {slug:"notion-ai",name:"Notion AI",category:"productivity",pricing:"freemium",price:"$10/mo",description:"AI writing assistant integrated into Notion workspace.",rating:4.2,company:"Notion",founded:2023,website:"https://notion.so/product/ai"},
  {slug:"figma",name:"Figma",category:"design",pricing:"freemium",price:"$15/mo",description:"Collaborative design tool with AI features for UI/UX.",rating:4.7,company:"Figma",founded:2012,website:"https://figma.com"},
  {slug:"runway",name:"Runway",category:"video",pricing:"freemium",price:"$12-76/mo",description:"AI video generation and editing platform.",rating:4.4,company:"Runway",founded:2018,website:"https://runwayml.com"},
  {slug:"elevenlabs",name:"ElevenLabs",category:"audio",pricing:"freemium",price:"$5-99/mo",description:"AI voice generation and cloning platform.",rating:4.5,company:"ElevenLabs",founded:2022,website:"https://elevenlabs.io"},
  {slug:"suno",name:"Suno",category:"audio",pricing:"freemium",price:"$10/mo",description:"AI music generation tool that creates complete songs from text.",rating:4.3,company:"Suno",founded:2023,website:"https://suno.com"},
  {slug:"jasper",name:"Jasper",category:"writing",pricing:"paid",price:"$39-125/mo",description:"AI marketing copywriting platform for businesses.",rating:4.1,company:"Jasper",founded:2021,website:"https://jasper.ai"},
  {slug:"surfer-seo",name:"Surfer SEO",category:"marketing",pricing:"paid",price:"$49-199/mo",description:"AI-powered SEO content optimization tool.",rating:4.4,company:"Surfer",founded:2017,website:"https://surferseo.com"},
  {slug:"deepl",name:"DeepL",category:"translation",pricing:"freemium",price:"$9-40/mo",description:"AI translation tool known for high-quality translations.",rating:4.6,company:"DeepL",founded:2017,website:"https://deepl.com"},
  {slug:"canva-ai",name:"Canva AI",category:"design",pricing:"freemium",price:"$12.99/mo",description:"AI design tools integrated into Canva platform.",rating:4.3,company:"Canva",founded:2012,website:"https://canva.com"},
  {slug:"gamma",name:"Gamma",category:"productivity",pricing:"freemium",price:"$10/mo",description:"AI-powered presentation and document creator.",rating:4.3,company:"Gamma",founded:2020,website:"https://gamma.app"},
  {slug:"obsidian",name:"Obsidian",category:"productivity",pricing:"free",price:"Free / $50/year sync",description:"Knowledge management app with bidirectional linking.",rating:4.6,company:"Dynalist",founded:2020,website:"https://obsidian.md"},
  {slug:"zapier",name:"Zapier",category:"productivity",pricing:"freemium",price:"$19.99/mo",description:"Automation platform connecting 5000+ apps with AI features.",rating:4.5,company:"Zapier",founded:2011,website:"https://zapier.com"},
];

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

type SortBy = "rating" | "name" | "founded";
type PricingFilter = "all" | "free" | "freemium" | "paid";

export default function ToolsPage() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [pricing, setPricing] = useState<PricingFilter>("all");
  const [sortBy, setSortBy] = useState<SortBy>("rating");

  const categories = [...new Set(toolsData.map(t => t.category))];

  const filteredTools = useMemo(() => {
    let result = [...toolsData];

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
  }, [search, category, pricing, sortBy]);

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-2">All AI Tools</h1>
      <p className="text-[#71717a] mb-8">{toolsData.length} tools available</p>

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
        Showing {filteredTools.length} of {toolsData.length} tools
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

      <div className="mt-8 text-center">
        <p className="text-sm text-[#71717a]">
          Showing top 20 tools. <Link href="/categories" className="text-[#3b82f6] hover:underline">Browse by category</Link> for more.
        </p>
      </div>
    </div>
  );
}
