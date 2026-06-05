import { getAllTools, getCategories } from "@/lib/tools";
import { getAllPosts } from "@/lib/blog";
import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const tools = getAllTools();
  const categories = getCategories();
  const posts = getAllPosts();

  const baseUrl = "https://toolio-ai.com";

  // Exclude low-rated tools (rating < 4.0) from sitemap — noindexed
  const qualifiedTools = tools.filter((t) => t.rating >= 4.0);

  const toolPages = qualifiedTools.map((tool) => ({
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

  const blogPages = posts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  // Compare pages excluded from sitemap — temporarily noindexed pending content upgrade
  // const comparePages = [];
  // for (let i = 0; i < tools.length; i++) {
  //   for (let j = i + 1; j < tools.length; j++) {
  //     if (tools[i].category === tools[j].category) {
  //       comparePages.push({
  //         url: `${baseUrl}/compare/${tools[i].slug}-vs-${tools[j].slug}`,
  //         lastModified: new Date(),
  //         changeFrequency: "monthly" as const,
  //         priority: 0.6,
  //       });
  //     }
  //   }
  // }
  const comparePages: never[] = [];

  const bestPages = [
    "research", "social-media", "content-creation", "coding", "marketing",
    "email-marketing", "project-management", "productivity", "video-creation",
    "design", "academic-writing", "customer-support", "seo",
  ].map((slug) => ({
    url: `${baseUrl}/best/${slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.8,
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
      url: `${baseUrl}/best`,
      lastModified: new Date(),
      changeFrequency: "weekly",
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
    ...bestPages,
  ];
}
