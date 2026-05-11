import type { Metadata } from "next";
import Link from "next/link";
import CookieBanner from "@/components/CookieBanner";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Toolio - Find the Best AI Tools",
    template: "%s | Toolio",
  },
  description: "Discover and compare 100+ AI tools for writing, coding, design, marketing, and more. Honest reviews, real pricing, no fluff.",
  keywords: ["AI tools", "artificial intelligence", "AI software", "best AI tools", "AI reviews", "compare AI tools"],
  authors: [{ name: "Toolio" }],
  creator: "Toolio",
  publisher: "Toolio",
  metadataBase: new URL("https://toolio.dev"),
  alternates: {
    canonical: "https://toolio.dev",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://toolio.dev",
    siteName: "Toolio",
    title: "Toolio - Find the Best AI Tools",
    description: "Discover and compare 100+ AI tools. Honest reviews, real pricing, no fluff.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Toolio - Find the Best AI Tools",
    description: "Discover and compare 100+ AI tools. Honest reviews, real pricing, no fluff.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </head>
      <body className="antialiased">
        <header className="border-b border-[#27272a] bg-[#09090b]/80 backdrop-blur-sm sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2.5 group">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center text-white font-bold text-sm group-hover:scale-105 transition-transform">
                T
              </div>
              <span className="text-xl font-bold tracking-tight">Toolio</span>
            </Link>
            <nav className="hidden md:flex items-center gap-6 text-sm text-[#71717a]">
              <Link href="/tools" className="hover:text-white transition">Tools</Link>
              <Link href="/categories" className="hover:text-white transition">Categories</Link>
              <Link href="/compare" className="hover:text-white transition">Compare</Link>
              <Link href="/blog" className="hover:text-white transition">Blog</Link>
            </nav>
            <div className="flex items-center gap-3">
              <Link
                href="/search"
                className="px-3 py-2 bg-[#18181b] border border-[#27272a] rounded-lg text-sm text-[#71717a] hover:border-[#3b82f6] transition flex items-center gap-2"
              >
                <span>🔍</span>
                <span className="hidden sm:inline">Search...</span>
              </Link>
            </div>
          </div>
        </header>
        <main className="min-h-screen">{children}</main>
        <footer className="border-t border-[#27272a] py-12 mt-16">
          <div className="max-w-7xl mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-6 h-6 bg-gradient-to-br from-blue-500 to-purple-600 rounded flex items-center justify-center text-white text-xs font-bold">T</div>
                  <span className="font-bold">Toolio</span>
                </div>
                <p className="text-sm text-[#71717a]">Find the best AI tools. Honest reviews, real pricing.</p>
              </div>
              <div>
                <h3 className="font-bold mb-4 text-sm">Browse</h3>
                <ul className="space-y-2 text-sm text-[#71717a]">
                  <li><Link href="/tools" className="hover:text-white transition">All Tools</Link></li>
                  <li><Link href="/categories" className="hover:text-white transition">Categories</Link></li>
                  <li><Link href="/compare" className="hover:text-white transition">Compare</Link></li>
                  <li><Link href="/blog" className="hover:text-white transition">Blog</Link></li>
                </ul>
              </div>
              <div>
                <h3 className="font-bold mb-4 text-sm">Categories</h3>
                <ul className="space-y-2 text-sm text-[#71717a]">
                  <li><Link href="/categories/chatbot" className="hover:text-white transition">AI Chatbots</Link></li>
                  <li><Link href="/categories/image" className="hover:text-white transition">AI Image</Link></li>
                  <li><Link href="/categories/coding" className="hover:text-white transition">AI Coding</Link></li>
                  <li><Link href="/categories/writing" className="hover:text-white transition">AI Writing</Link></li>
                </ul>
              </div>
              <div>
                <h3 className="font-bold mb-4 text-sm">Company</h3>
                <ul className="space-y-2 text-sm text-[#71717a]">
                  <li><Link href="/about" className="hover:text-white transition">About</Link></li>
                  <li><Link href="/contact" className="hover:text-white transition">Contact</Link></li>
                  <li><Link href="/advertise" className="hover:text-white transition">Advertise</Link></li>
                  <li><Link href="/submit" className="hover:text-white transition">Submit Tool</Link></li>
                </ul>
              </div>
            </div>
            <div className="border-t border-[#27272a] pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
              <p className="text-sm text-[#71717a]">© 2026 Toolio. All rights reserved.</p>
              <div className="flex items-center gap-4 text-sm text-[#71717a]">
                <Link href="/privacy" className="hover:text-white transition">Privacy</Link>
                <Link href="/terms" className="hover:text-white transition">Terms</Link>
                <Link href="/faq" className="hover:text-white transition">FAQ</Link>
              </div>
            </div>
          </div>
        </footer>
        <CookieBanner />
      </body>
    </html>
  );
}
