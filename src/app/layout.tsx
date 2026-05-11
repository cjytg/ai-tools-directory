import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "AI Tools Directory - Find the Best AI Tools",
    template: "%s | AI Tools Directory",
  },
  description: "Discover and compare the best AI tools for writing, coding, design, marketing, and more. Updated daily with honest reviews.",
  keywords: ["AI tools", "artificial intelligence", "AI software", "best AI tools", "AI reviews"],
  openGraph: {
    title: "AI Tools Directory",
    description: "Find the best AI tools for your needs",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "AI Tools Directory",
    description: "Find the best AI tools for your needs",
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
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className="antialiased">
        <header className="border-b border-[#27272a] bg-[#09090b]/80 backdrop-blur-sm sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
            <Link href="/" className="text-xl font-bold flex items-center gap-2">
              <span className="w-8 h-8 bg-[#3b82f6] rounded-lg flex items-center justify-center text-sm">AI</span>
              <span className="hidden sm:inline">AI Tools Directory</span>
              <span className="sm:hidden">AI Tools</span>
            </Link>
            <nav className="hidden md:flex items-center gap-6 text-sm text-[#71717a]">
              <Link href="/tools" className="hover:text-white transition">Tools</Link>
              <Link href="/categories" className="hover:text-white transition">Categories</Link>
              <Link href="/blog" className="hover:text-white transition">Blog</Link>
              <Link href="/compare" className="hover:text-white transition">Compare</Link>
            </nav>
            <div className="flex items-center gap-4">
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
        <main className="min-h-screen">
          {children}
        </main>
        <footer className="border-t border-[#27272a] py-12 mt-16">
          <div className="max-w-7xl mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
              <div>
                <h3 className="font-bold mb-4">AI Tools</h3>
                <ul className="space-y-2 text-sm text-[#71717a]">
                  <li><Link href="/tools" className="hover:text-white transition">All Tools</Link></li>
                  <li><Link href="/categories" className="hover:text-white transition">Categories</Link></li>
                  <li><Link href="/compare" className="hover:text-white transition">Compare</Link></li>
                  <li><Link href="/search" className="hover:text-white transition">Search</Link></li>
                </ul>
              </div>
              <div>
                <h3 className="font-bold mb-4">Categories</h3>
                <ul className="space-y-2 text-sm text-[#71717a]">
                  <li><Link href="/categories/chatbot" className="hover:text-white transition">AI Chatbots</Link></li>
                  <li><Link href="/categories/image" className="hover:text-white transition">AI Image</Link></li>
                  <li><Link href="/categories/coding" className="hover:text-white transition">AI Coding</Link></li>
                  <li><Link href="/categories/writing" className="hover:text-white transition">AI Writing</Link></li>
                </ul>
              </div>
              <div>
                <h3 className="font-bold mb-4">Resources</h3>
                <ul className="space-y-2 text-sm text-[#71717a]">
                  <li><Link href="/blog" className="hover:text-white transition">Blog</Link></li>
                  <li><Link href="/about" className="hover:text-white transition">About</Link></li>
                  <li><Link href="/contact" className="hover:text-white transition">Contact</Link></li>
                </ul>
              </div>
              <div>
                <h3 className="font-bold mb-4">Legal</h3>
                <ul className="space-y-2 text-sm text-[#71717a]">
                  <li><Link href="/privacy" className="hover:text-white transition">Privacy Policy</Link></li>
                  <li><Link href="/terms" className="hover:text-white transition">Terms of Service</Link></li>
                </ul>
              </div>
            </div>
            <div className="border-t border-[#27272a] pt-8 text-center text-sm text-[#71717a]">
              <p>© 2026 AI Tools Directory. All rights reserved.</p>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
