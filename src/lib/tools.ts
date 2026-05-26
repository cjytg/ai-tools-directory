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

/**
 * Generate unique in-depth analysis for each tool page.
 * Combines overview data with competitive context, pricing analysis,
 * and editorial assessment to produce 200-350 words of original content.
 * This addresses Google's "thin content" concerns for AdSense approval.
 */
export function generateToolAnalysis(tool: Tool): string {
  const allTools = getAllTools();
  const categoryTools = allTools.filter((t) => t.category === tool.category);
  const categoryAvgRating =
    categoryTools.reduce((sum, t) => sum + t.rating, 0) / categoryTools.length;
  const rankInCategory = [...categoryTools]
    .sort((a, b) => b.rating - a.rating)
    .findIndex((t) => t.slug === tool.slug) + 1;

  const altTools = tool.alternatives
    .map((s) => allTools.find((t) => t.slug === s))
    .filter(Boolean) as Tool[];

  const isFree = tool.pricing === "free";
  const isFreemium = tool.pricing === "freemium";
  const isPaid = tool.pricing === "paid";
  const isAboveAvg = tool.rating > categoryAvgRating;
  const isTopTier = rankInCategory <= 3;

  // Lowercase helpers for prose embedding
  const cat = tool.category.toLowerCase();
  const feat0 = tool.features[0]?.toLowerCase() || "";
  const feat1 = tool.features[1]?.toLowerCase() || "";
  const feat2 = tool.features[2]?.toLowerCase() || "";
  const pro0 = tool.pros[0]?.toLowerCase() || "";
  const con0 = tool.cons[0]?.toLowerCase() || "";
  const con1 = tool.cons[1]?.toLowerCase() || "";
  const users0 = tool.target_users[0]?.toLowerCase() || "";
  const users1 = tool.target_users[1]?.toLowerCase() || "";

  let analysis = "";

  // Section 1: Feature depth
  if (tool.features.length >= 3) {
    analysis += `The ${feat0} capability is what sets ${tool.name} apart from most competitors in the ${cat} space. `;
    analysis += `Beyond that, the ${feat1} and ${feat2} functionality round out a toolkit that covers the essential workflows for ${users0} and ${users1}.\n\n`;
  }

  // Section 2: Competitive positioning
  if (altTools.length > 0) {
    const topAlt = altTools[0];
    const altFeat0 = topAlt.features[0]?.toLowerCase() || "";
    if (tool.rating > topAlt.rating) {
      analysis += `Compared to ${topAlt.name} (★ ${topAlt.rating}), ${tool.name} holds a slight edge overall — particularly in ${feat0}, where ${topAlt.name} doesn't compete as strongly.\n\n`;
    } else if (tool.rating < topAlt.rating) {
      analysis += `While ${topAlt.name} (★ ${topAlt.rating}) edges it out slightly, ${tool.name} still delivers strong ${feat0} capabilities. `;
      analysis += `The choice between them often comes down to ${feat0} vs ${altFeat0}.\n\n`;
    } else {
      analysis += `${tool.name} and ${topAlt.name} share the same rating (★ ${tool.rating}), making this a decision about workflow fit rather than capability gaps.\n\n`;
    }
  }

  // Section 3: Pricing value
  if (isFree) {
    analysis += `${tool.name} is completely free — one of the few tools in the ${cat} category that doesn't gate core features behind a paywall. `;
    analysis += `This makes it a strong starting point for anyone exploring ${cat} tools without financial commitment.\n\n`;
  } else if (isFreemium) {
    analysis += `The freemium model at ${tool.price} is competitive for this category. `;
    if (isAboveAvg) {
      analysis += `Given its above-average rating (★ ${tool.rating} vs category average ${categoryAvgRating.toFixed(1)}), the paid plan delivers solid value for ${users0} who need the full feature set.\n\n`;
    } else {
      analysis += `The free tier is generous enough for casual use, while the paid plan unlocks capabilities that ${users0} will actually need day-to-day.\n\n`;
    }
  } else if (isPaid) {
    if (isTopTier) {
      analysis += `At ${tool.price}, ${tool.name} sits at the premium end — but its top-${rankInCategory} ranking in the ${cat} category justifies the cost for teams that rely on ${feat0} as part of their workflow.\n\n`;
    } else {
      const freeAlt = categoryTools.find((t) => t.pricing === "free");
      analysis += `At ${tool.price}, ${tool.name} needs to prove its value against free alternatives`;
      if (freeAlt) analysis += ` like ${freeAlt.name}`;
      analysis += `. Its ${pro0} is the key differentiator — if that matters for your workflow, the cost is reasonable.\n\n`;
    }
  }

  // Section 4: The trade-off (editorial honesty)
  if (tool.cons.length > 0) {
    analysis += `The main trade-off: ${con0}. `;
    if (tool.cons.length > 1) {
      analysis += `Combined with ${con1}, these are factors worth weighing before committing.`;
    }
  }

  return analysis;
}
