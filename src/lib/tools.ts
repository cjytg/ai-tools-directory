import toolsData from "@/data/tools.json";
import { Tool } from "@/types";

export function getAllTools(): Tool[] {
  return toolsData as Tool[];
}

export function getToolBySlug(slug: string): Tool | undefined {
  return toolsData.find((t) => t.slug === slug) as Tool | undefined;
}

export function getToolsByCategory(category: string): Tool[] {
  return toolsData.filter((t) => t.category === category) as Tool[];
}

export function getCategories(): string[] {
  const cats = new Set(toolsData.map((t) => t.category));
  return Array.from(cats);
}

export function searchTools(query: string): Tool[] {
  const q = query.toLowerCase();
  return toolsData.filter(
    (t) =>
      t.name.toLowerCase().includes(q) ||
      t.description.toLowerCase().includes(q) ||
      t.category.toLowerCase().includes(q)
  ) as Tool[];
}

export function getAlternatives(slug: string): Tool[] {
  const tool = getToolBySlug(slug);
  if (!tool) return [];
  return tool.alternatives
    .map((alt) => getToolBySlug(alt))
    .filter(Boolean) as Tool[];
}
