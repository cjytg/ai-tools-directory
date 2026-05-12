import { getAllTools } from "@/lib/tools";
import { CATEGORIES } from "@/types";
import Link from "next/link";
import { notFound } from "next/navigation";
import AdUnit from "@/components/AdUnit";
import AffiliateLink from "@/components/AffiliateLink";
import BreadcrumbJsonLd from "@/components/BreadcrumbJsonLd";
import type { Tool } from "@/types";

interface LandingPage {
  slug: string;
  name: string;
  title: string;
  description: string;
  keywords: string[];
  intro: string;
}

const LANDING_PAGES: LandingPage[] = [
  {
    slug: "content-creation",
    name: "Content Creation",
    title: "16 Best AI Tools for Content Creation in 2026 — Compared",
    description: "Discover the top AI tools for content creation. Compare features, pricing, and reviews to find the perfect tool for your content workflow.",
    keywords: ["content creation", "content", "blog posts", "blog writing", "creative projects"],
    intro: "Content creation is one of the most popular uses for AI in 2026. Whether you're writing blog posts, creating social media content, or brainstorming campaign ideas, the right AI tool can cut your production time in half. We've compared 16 tools to help you find the best fit.",
  },
  {
    slug: "coding",
    name: "Coding",
    title: "16 Best AI Coding Tools in 2026 — IDE Assistants & Debuggers Compared",
    description: "Compare the top AI coding assistants, debuggers, and code review tools. Find the right AI pair programmer for your tech stack.",
    keywords: ["coding", "code writing", "code completion", "code refactoring", "debugging", "code review", "code help", "full-stack development", "code generation", "code search", "git workflows"],
    intro: "AI coding assistants have transformed how developers write, review, and debug code. From autocomplete to full-stack generation, these tools can boost your productivity by 30-50%. Here are the 16 best AI coding tools ranked and compared.",
  },
  {
    slug: "marketing",
    name: "Marketing",
    title: "14 Best AI Marketing Tools in 2026 — Automation & Analytics Compared",
    description: "Find the best AI tools for marketing automation, campaign management, content marketing, and analytics. Compare pricing and features.",
    keywords: ["marketing", "marketing copy", "content marketing", "marketing materials", "marketing visuals", "marketing automation"],
    intro: "AI is reshaping marketing — from copy generation to campaign optimization. These 14 tools cover the full marketing stack: content creation, email campaigns, social media, and analytics. Here's how they stack up.",
  },
  {
    slug: "research",
    name: "Research",
    title: "25 Best AI Research Tools in 2026 — Literature Review to Data Analysis",
    description: "Compare top AI research tools for academic research, paper discovery, literature review, and data analysis. Find the right tool for your workflow.",
    keywords: ["research", "academic research", "research tasks", "technical research", "ai research", "paper discovery", "literature review"],
    intro: "AI research tools can accelerate your workflow from paper discovery to data analysis. Whether you're writing a literature review, synthesizing findings, or running experiments, these 25 tools cover every stage of the research process.",
  },
  {
    slug: "social-media",
    name: "Social Media",
    title: "18 Best AI Tools for Social Media in 2026 — Content, Graphics & Video",
    description: "Discover the best AI tools for social media management, content creation, graphics, and video. Compare features and pricing.",
    keywords: ["social media", "social media content", "social media graphics", "social media videos", "tiktok content"],
    intro: "Managing social media at scale is impossible without AI. These 18 tools handle everything from content scheduling to graphic generation, video creation, and engagement analytics. Here's what works in 2026.",
  },
  {
    slug: "email-marketing",
    name: "Email Marketing",
    title: "13 Best AI Email Marketing Tools in 2026 — Campaigns & Automation",
    description: "Compare AI email marketing tools for campaign creation, personalization, automation, and analytics. Find the best fit for your email strategy.",
    keywords: ["email marketing", "email campaigns", "email writing", "emails", "email drafts", "newsletters"],
    intro: "AI-powered email marketing tools can dramatically improve open rates and conversions. From subject line optimization to personalized content generation, these 13 tools cover the full email marketing stack.",
  },
  {
    slug: "project-management",
    name: "Project Management",
    title: "9 Best AI Project Management Tools in 2026 — Task & Team Coordination",
    description: "Compare AI project management tools for task tracking, team coordination, scheduling, and workflow automation.",
    keywords: ["project management", "task management", "team tasks", "work management", "project tracking", "work tracking", "scheduling"],
    intro: "AI project management tools go beyond traditional task boards — they can predict delays, auto-assign work, and generate status reports. These 9 tools help teams ship faster with less overhead.",
  },
  {
    slug: "productivity",
    name: "Productivity",
    title: "9 Best AI Productivity Tools in 2026 — Notes, Planning & Knowledge Management",
    description: "Find the best AI tools to boost personal productivity. Compare note-taking, calendar management, knowledge bases, and more.",
    keywords: ["productivity", "note-taking", "personal organization", "calendar", "calendar management", "time tracking", "gtd", "knowledge management"],
    intro: "AI productivity tools are more than smart to-do lists. They can summarize meetings, organize your notes, manage your calendar, and even suggest your next priority. Here are 9 tools that actually move the needle.",
  },
  {
    slug: "video-creation",
    name: "Video Creation",
    title: "8 Best AI Video Creation Tools in 2026 — From Script to Publish",
    description: "Compare AI video creation tools for scriptwriting, editing, generation, and publishing. Find the right tool for your video workflow.",
    keywords: ["video creation", "video production", "film production", "short videos", "marketing videos", "marketing clips", "explainer videos", "product demos"],
    intro: "AI video tools have evolved from simple text-to-video generators to full production suites. These 8 tools handle scripting, editing, avatar generation, and publishing — often at a fraction of traditional production costs.",
  },
  {
    slug: "design",
    name: "Design",
    title: "7 Best AI Design Tools in 2026 — Logos, UI, Branding & More",
    description: "Discover the best AI design tools for logos, UI design, branding, and graphics. Compare features, pricing, and quality.",
    keywords: ["design", "ui design", "logo design", "brand identity", "social media graphics", "quick designs", "marketing visuals"],
    intro: "AI design tools can generate logos, UI mockups, and brand assets in minutes. Whether you're a designer looking to speed up your workflow or a non-designer who needs professional results, these 7 tools deliver.",
  },
  {
    slug: "academic-writing",
    name: "Academic Writing",
    title: "6 Best AI Academic Writing Tools in 2026 — Papers, Citations & Editing",
    description: "Compare AI tools for academic writing, citation management, editing, and research paper drafting. Find the best fit for your academic work.",
    keywords: ["academic writing", "academic work", "academic papers"],
    intro: "Academic writing has unique requirements — proper citations, formal tone, and rigorous structure. These 6 AI tools are specifically designed to help researchers and students produce better academic work, faster.",
  },
  {
    slug: "customer-support",
    name: "Customer Support",
    title: "5 Best AI Customer Support Tools in 2026 — Chatbots & Help Desks",
    description: "Compare AI customer support tools for chatbots, help desks, ticketing, and self-service. Find the right solution for your team.",
    keywords: ["customer support", "help desk", "ticketing", "self-service", "customer engagement"],
    intro: "AI customer support tools can handle 60-80% of routine inquiries without human intervention. These 5 tools cover chatbots, ticket routing, knowledge base management, and self-service portals.",
  },
  {
    slug: "seo",
    name: "SEO",
    title: "5 Best AI SEO Tools in 2026 — Keyword Research, Content & Analytics",
    description: "Compare AI SEO tools for keyword research, content optimization, competitor analysis, and link building. Improve your search rankings.",
    keywords: ["seo", "seo content", "seo strategy", "keyword research", "competitor analysis", "link building", "content optimization"],
    intro: "AI has transformed SEO from guesswork to data-driven strategy. These 5 tools handle keyword research, content optimization, competitor analysis, and link building — giving you a clear edge in search rankings.",
  },
];

function getLandingPageBySlug(slug: string): LandingPage | undefined {
  return LANDING_PAGES.find((lp) => lp.slug === slug);
}

function getToolsForPage(page: LandingPage, allTools: Tool[]): Tool[] {
  const matching = allTools.filter((tool) => {
    const toolUC = tool.use_cases.map((uc) => uc.toLowerCase());
    return page.keywords.some((kw) => toolUC.includes(kw));
  });
  // Sort by rating descending
  return matching.sort((a, b) => b.rating - a.rating);
}

export async function generateStaticParams() {
  return LANDING_PAGES.map((lp) => ({ slug: lp.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const page = getLandingPageBySlug(slug);
  if (!page) return { title: "Page Not Found" };
  return {
    title: page.title,
    description: page.description,
    openGraph: {
      title: page.title,
      description: page.description,
      type: "article",
    },
  };
}

export default async function BestPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const page = getLandingPageBySlug(slug);
  if (!page) notFound();

  const allTools = getAllTools();
  const tools = getToolsForPage(page, allTools);

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: "https://toolio-ai.com" },
          { name: "Best AI Tools", url: "https://toolio-ai.com/best" },
          { name: page.name, url: `https://toolio-ai.com/best/${page.slug}` },
        ]}
      />
      <div className="max-w-5xl mx-auto px-4 py-12">
        {/* Header */}
        <div className="mb-10">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">{page.title}</h1>
          <p className="text-lg text-[#a1a1aa] leading-relaxed">{page.intro}</p>
          <div className="mt-4 flex items-center gap-3 text-sm text-[#71717a]">
            <span>{tools.length} tools compared</span>
            <span>·</span>
            <span>Updated for 2026</span>
          </div>
        </div>

        {/* Ad: after intro */}
        <AdUnit slot="0000000009" format="leaderboard" className="mb-8 w-full" />

        {/* Tool Cards */}
        <div className="space-y-4">
          {tools.map((tool, i) => (
            <div
              key={tool.slug}
              className="p-6 bg-[#18181b] border border-[#27272a] rounded-xl hover:border-[#3b82f6]/50 transition group"
            >
              <div className="flex flex-col md:flex-row md:items-center gap-4">
                {/* Rank + Name */}
                <div className="flex items-center gap-4 flex-1">
                  <div className="w-10 h-10 bg-[#27272a] rounded-lg flex items-center justify-center text-sm font-bold text-[#3b82f6]">
                    #{i + 1}
                  </div>
                  <div>
                    <Link href={`/tools/${tool.slug}`} className="text-lg font-bold hover:text-[#3b82f6] transition">
                      {tool.name}
                    </Link>
                    <div className="text-sm text-[#71717a]">{tool.description}</div>
                  </div>
                </div>

                {/* Quick Stats */}
                <div className="flex items-center gap-4 text-sm">
                  <div className="flex items-center gap-1">
                    <span className="text-[#3b82f6]">★</span>
                    <span className="font-medium">{tool.rating}</span>
                  </div>
                  <div className="text-[#71717a]">{tool.price}</div>
                  <div className="px-2 py-1 bg-[#27272a] rounded text-xs capitalize">{tool.pricing}</div>
                </div>

                {/* CTA */}
                <AffiliateLink
                  href={tool.website}
                  affiliateUrl={tool.affiliate_url}
                  className="shrink-0 px-5 py-2 bg-[#3b82f6] hover:bg-[#2563eb] rounded-lg text-sm font-medium text-white transition"
                >
                  Visit {tool.name} →
                </AffiliateLink>
              </div>

              {/* Matching Use Cases */}
              <div className="mt-3 flex flex-wrap gap-2">
                {tool.use_cases
                  .filter((uc) => page.keywords.some((kw) => uc.toLowerCase() === kw))
                  .slice(0, 4)
                  .map((uc, j) => (
                    <span key={j} className="px-2 py-1 bg-[#3b82f6]/10 text-[#3b82f6] rounded text-xs">
                      {uc}
                    </span>
                  ))}
              </div>
            </div>
          ))}
        </div>

        {/* Ad: after tool list */}
        <AdUnit slot="0000000010" format="rectangle" className="mt-8 mb-8 w-full" />

        {/* Related Best Pages */}
        <div className="mt-12 pt-8 border-t border-[#27272a]">
          <h2 className="text-xl font-bold mb-6">Also Check Out</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
            {LANDING_PAGES.filter((lp) => lp.slug !== page.slug)
              .slice(0, 6)
              .map((lp) => {
                const lpTools = getToolsForPage(lp, allTools);
                return (
                  <Link
                    key={lp.slug}
                    href={`/best/${lp.slug}`}
                    className="p-4 bg-[#18181b] border border-[#27272a] rounded-lg hover:border-[#3b82f6] transition"
                  >
                    <div className="font-medium text-sm">{lp.title.split(" — ")[0]}</div>
                    <div className="text-xs text-[#71717a] mt-1">{lpTools.length} tools · Updated 2026</div>
                  </Link>
                );
              })}
          </div>
        </div>

        {/* CTA */}
        <div className="mt-12 p-8 bg-[#18181b] border border-[#27272a] rounded-xl text-center">
          <h2 className="text-xl font-bold mb-2">Can&apos;t find what you need?</h2>
          <p className="text-[#71717a] mb-4">Browse our full collection of 170+ AI tools across 11 categories.</p>
          <div className="flex justify-center gap-3">
            <Link href="/tools" className="px-6 py-3 bg-[#3b82f6] text-white rounded-lg font-medium hover:bg-[#2563eb] transition">
              Browse All Tools
            </Link>
            <Link href="/compare" className="px-6 py-3 border border-[#27272a] rounded-lg font-medium hover:border-[#3b82f6] transition">
              Compare Tools
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
