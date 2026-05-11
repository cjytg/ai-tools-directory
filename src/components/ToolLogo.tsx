"use client";

// Fallback colors for when favicon fails to load
const FALLBACK_COLORS: Record<string, string> = {
  chatgpt: "#10a37f",
  claude: "#d4a574",
  midjourney: "#5865f2",
  "dall-e-3": "#10a37f",
  "stable-diffusion": "#a855f7",
  "github-copilot": "#000",
  cursor: "#000",
  gemini: "#4285f4",
  copilot: "#00a4ef",
  llama: "#1877f2",
  mistral: "#ff7000",
  runway: "#000",
  suno: "#000",
  pika: "#000",
  kling: "#000",
  perplexity: "#20b2aa",
  "notion-ai": "#000",
  jasper: "#eb4a4a",
  grammarly: "#15c39a",
  "canva-ai": "#00c4cc",
  figma: "#f24e1e",
  "adobe-firefly": "#ff0000",
  zoom: "#2d8cff",
  slack: "#4a154b",
  notion: "#000",
  descript: "#000",
  elevenlabs: "#000",
  gamma: "#8b5cf6",
  "surfer-seo": "#000",
  deepl: "#042b48",
  obsidian: "#7c3aed",
  zapier: "#ff4a00",
  make: "#6d28d9",
};

interface ToolLogoProps {
  name: string;
  slug: string;
  size?: "sm" | "md" | "lg";
  website?: string;
}

export default function ToolLogo({ name, slug, size = "md", website }: ToolLogoProps) {
  const sizeClasses = {
    sm: "w-8 h-8",
    md: "w-12 h-12",
    lg: "w-16 h-16",
  };

  const fallbackBg = FALLBACK_COLORS[slug] || "#27272a";
  
  // Try to get favicon from Google Favicon API
  // Falls back to domain root favicon if no website URL provided
  const domain = website ? new URL(website).hostname : slug;
  const faviconUrl = `https://www.google.com/s2/favicons?domain=${domain}&sz=64`;

  return (
    <div
      className={`${sizeClasses[size]} rounded-lg flex items-center justify-center flex-shrink-0 overflow-hidden bg-zinc-800`}
    >
      <img
        src={faviconUrl}
        alt={`${name} logo`}
        className="w-full h-full object-contain p-1"
        onError={(e) => {
          // Fallback to letter avatar if favicon fails
          const target = e.target as HTMLImageElement;
          target.style.display = "none";
          const parent = target.parentElement;
          if (parent && !parent.querySelector(".fallback-letter")) {
            const fallback = document.createElement("span");
            fallback.className = "fallback-letter font-bold text-white text-lg";
            fallback.textContent = name.charAt(0);
            parent.appendChild(fallback);
            (parent as HTMLElement).style.backgroundColor = fallbackBg;
          }
        }}
      />
    </div>
  );
}
