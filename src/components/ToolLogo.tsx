const LOGO_COLORS: Record<string, string> = {
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
}

export default function ToolLogo({ name, slug, size = "md" }: ToolLogoProps) {
  const sizeClasses = {
    sm: "w-8 h-8 text-sm",
    md: "w-12 h-12 text-lg",
    lg: "w-16 h-16 text-2xl",
  };

  const bgColor = LOGO_COLORS[slug] || "#27272a";
  const textColor = bgColor === "#000" || bgColor === "#27272a" ? "#fff" : "#fff";

  return (
    <div
      className={`${sizeClasses[size]} rounded-lg flex items-center justify-center font-bold flex-shrink-0`}
      style={{ backgroundColor: bgColor, color: textColor }}
    >
      {name.charAt(0)}
    </div>
  );
}
