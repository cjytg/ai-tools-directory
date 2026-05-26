import { getAllTools } from "@/lib/tools";
import ToolsPageClient from "./page-client";

export const metadata = {
  title: "Browse All AI Tools - Toolio",
  description: "Browse 170+ AI tools with honest reviews, real pricing, and side-by-side comparisons.",
  alternates: {
    canonical: "https://toolio-ai.com/tools",
  },
};

export default function ToolsPage() {
  const tools = getAllTools();
  return <ToolsPageClient tools={tools} />;
}
