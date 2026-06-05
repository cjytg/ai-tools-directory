import fs from "fs";
import path from "path";
import matter from "gray-matter";

const blogDir = path.join(process.cwd(), "src/content/blog");

export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  category: string;
  date: string;
  content: string;
  author?: string;
  lastUpdated?: string;
}

export function getAllPosts(): BlogPost[] {
  if (!fs.existsSync(blogDir)) return [];
  
  const files = fs.readdirSync(blogDir).filter((f) => f.endsWith(".mdx"));
  
  return files.map((file) => {
    const filePath = path.join(blogDir, file);
    const fileContent = fs.readFileSync(filePath, "utf-8");
    const { data, content } = matter(fileContent);
    
    return {
      slug: file.replace(".mdx", ""),
      title: data.title || file.replace(".mdx", ""),
      description: data.description || "",
      category: data.category || "",
      date: data.date || "",
      content,
      author: data.author || "Toolio Editorial Team",
      lastUpdated: data.lastUpdated || data.date || "",
    };
  }).sort((a, b) => b.date.localeCompare(a.date));
}

export function getPostBySlug(slug: string): BlogPost | undefined {
  const filePath = path.join(blogDir, `${slug}.mdx`);
  if (!fs.existsSync(filePath)) return undefined;
  
  const fileContent = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(fileContent);
  
  return {
    slug,
    title: data.title || slug,
    description: data.description || "",
    category: data.category || "",
    date: data.date || "",
    content,
    author: data.author || "Toolio Editorial Team",
    lastUpdated: data.lastUpdated || data.date || "",
  };
}

export function getExistingPostSlugs(): string[] {
  if (!fs.existsSync(blogDir)) return [];
  return fs.readdirSync(blogDir)
    .filter(f => f.endsWith(".mdx"))
    .map(f => f.replace(".mdx", ""));
}

export function getPostsByCategory(category: string): BlogPost[] {
  return getAllPosts().filter((p) => p.category === category);
}
