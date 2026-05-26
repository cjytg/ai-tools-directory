export interface Tool {
  slug: string;
  name: string;
  category: string;
  pricing: string;
  price: string;
  description: string;
  overview?: string;
  indepth_analysis?: string;
  features: string[];
  pros: string[];
  cons: string[];
  alternatives: string[];
  website: string;
  company: string;
  founded: number;
  rating: number;
  use_cases: string[];
  target_users: string[];
  affiliate_url?: string;
}

export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  category: string;
  date: string;
  content: string;
}

export const CATEGORIES: Record<string, string> = {
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
