import { getAllTools } from "@/lib/tools";
import Link from "next/link";
import BreadcrumbJsonLd from "@/components/BreadcrumbJsonLd";

const LANDING_PAGES = [
  { slug: "research", name: "Research", count: 25, desc: "Literature review, paper discovery, and data analysis" },
  { slug: "social-media", name: "Social Media", count: 18, desc: "Content creation, graphics, and video for social platforms" },
  { slug: "content-creation", name: "Content Creation", count: 16, desc: "Blog posts, articles, and creative content workflows" },
  { slug: "coding", name: "Coding", count: 16, desc: "IDE assistants, debuggers, and code generation" },
  { slug: "marketing", name: "Marketing", count: 14, desc: "Campaign automation, analytics, and content marketing" },
  { slug: "email-marketing", name: "Email Marketing", count: 13, desc: "Campaign creation, personalization, and automation" },
  { slug: "project-management", name: "Project Management", count: 9, desc: "Task tracking, team coordination, and scheduling" },
  { slug: "productivity", name: "Productivity", count: 9, desc: "Notes, planning, calendar, and knowledge management" },
  { slug: "video-creation", name: "Video Creation", count: 8, desc: "Scripting, editing, generation, and publishing" },
  { slug: "design", name: "Design", count: 7, desc: "Logos, UI, branding, and graphic design" },
  { slug: "academic-writing", name: "Academic Writing", count: 6, desc: "Papers, citations, editing, and research drafting" },
  { slug: "customer-support", name: "Customer Support", count: 5, desc: "Chatbots, help desks, ticketing, and self-service" },
  { slug: "seo", name: "SEO", count: 5, desc: "Keyword research, content optimization, and analytics" },
];

export default function BestPage() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: "https://toolio-ai.com" },
          { name: "Best AI Tools", url: "https://toolio-ai.com/best" },
        ]}
      />
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="mb-10">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Best AI Tools by Use Case — 2026</h1>
          <p className="text-lg text-[#a1a1aa]">
            Find the perfect AI tools for your specific needs. Each list compares tools side-by-side so you can pick the best one for your workflow.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {LANDING_PAGES.map((lp) => (
            <Link
              key={lp.slug}
              href={`/best/${lp.slug}`}
              className="p-6 bg-[#18181b] border border-[#27272a] rounded-xl hover:border-[#3b82f6] transition group"
            >
              <div className="flex items-start justify-between">
                <div>
                  <h2 className="text-lg font-bold group-hover:text-[#3b82f6] transition">Best AI Tools for {lp.name}</h2>
                  <p className="text-sm text-[#71717a] mt-1">{lp.desc}</p>
                </div>
                <span className="shrink-0 px-2 py-1 bg-[#3b82f6]/10 text-[#3b82f6] rounded text-xs font-medium">
                  {lp.count} tools
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}
