import { getAllTools, getCategories } from "@/lib/tools";
import { getAllPosts } from "@/lib/blog";
import { MetadataRoute } from "next";

// Only index core tools — matches tools/[slug]/page.tsx INDEXED_TOOLS
const INDEXED_TOOL_SLUGS = new Set([
  'chatgpt', 'claude', 'gemini', 'perplexity-ai', 'deepseek',
  'github-copilot', 'cursor', 'codeium', 'windsurf', 'sourcegraph-cody',
  'midjourney', 'dall-e-3', 'stable-diffusion', 'adobe-firefly', 'leonardo-ai',
  'grammarly', 'jasper', 'copy-ai', 'writesonic', 'rytr',
  'runway', 'synthesia', 'heygen', 'descript',
  'elevenlabs', 'murf', 'play-ht',
  'canva-ai', 'figma', 'looka', 'remove-bg', 'framer',
  'notion-ai', 'otter-ai', 'reclaim-ai',
  'hubspot-ai', 'semrush', 'ahrefs', 'mailchimp',
  'perplexity', 'kagi', 'elicit', 'notebooklm',
  'deepl', 'google-translate', 'lokalise',
]);

// Only index high-value compare pages — matches compare/[slug]/page.tsx
const INDEXED_COMPARE_SLUGS = new Set([
  'chatgpt-vs-claude', 'chatgpt-vs-gemini', 'cursor-vs-github-copilot',
  'midjourney-vs-dall-e-3', 'midjourney-vs-stable-diffusion',
  'elevenlabs-vs-murf', 'runway-vs-synthesia', 'deepl-vs-google-translate',
  'jasper-vs-copy-ai', 'semrush-vs-ahrefs', 'figma-vs-canva-ai',
  'perplexity-vs-chatgpt', 'descript-vs-runway', 'copy-ai-vs-jasper',
  'github-copilot-vs-cursor',
]);

// Only index core blog reviews — matches blog/[slug]/page.tsx
const INDEXED_BLOG_SLUGS = new Set([
  "chatgpt-review", "claude-review", "gemini-review", "perplexity-ai-review", "deepseek-review",
  "github-copilot-review", "cursor-review", "codeium-review", "windsurf-review", "sourcegraph-cody-review",
  "midjourney-review", "dall-e-3-review", "stable-diffusion-review", "adobe-firefly-review", "leonardo-ai-review",
  "grammarly-review", "jasper-review", "copy-ai-review", "writesonic-review", "rytr-review",
  "runway-review", "synthesia-review", "heygen-review", "descript-review",
  "elevenlabs-review", "murf-review", "play-ht-review",
  "canva-ai-review", "figma-review", "looka-review", "remove-bg-review", "framer-review",
  "notion-ai-review", "otter-ai-review", "reclaim-ai-review",
  "hubspot-ai-review", "semrush-review", "ahrefs-review", "mailchimp-review",
  "perplexity-review", "kagi-review", "elicit-review", "notebooklm-review",
  "deepl-review", "google-translate-review", "lokalise-review",
]);

export default function sitemap(): MetadataRoute.Sitemap {
  const tools = getAllTools();
  const categories = getCategories();
  const posts = getAllPosts();

  const baseUrl = "https://toolio-ai.com";

  // Only include core tool pages
  const toolPages = tools
    .filter((t) => INDEXED_TOOL_SLUGS.has(t.slug))
    .map((tool) => ({
      url: `${baseUrl}/tools/${tool.slug}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.8,
    }));

  const categoryPages = categories.map((cat) => ({
    url: `${baseUrl}/categories/${cat}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));

  // Only include core blog reviews
  const blogPages = posts
    .filter((post) => INDEXED_BLOG_SLUGS.has(post.slug))
    .map((post) => ({
      url: `${baseUrl}/blog/${post.slug}`,
      lastModified: new Date(post.date),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    }));

  // Only include high-value compare pages
  const comparePages = Array.from(INDEXED_COMPARE_SLUGS).map((slug) => ({
    url: `${baseUrl}/compare/${slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1,
    },
    {
      url: `${baseUrl}/tools`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/categories`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/compare`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.5,
    },
    {
      url: `${baseUrl}/methodology`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${baseUrl}/privacy`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${baseUrl}/terms`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.3,
    },
    ...toolPages,
    ...categoryPages,
    ...blogPages,
    ...comparePages,
  ];
}
