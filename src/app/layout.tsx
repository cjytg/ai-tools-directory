import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "AI Tools Directory - Find the Best AI Tools",
  description: "Discover and compare the best AI tools for writing, coding, design, marketing, and more. Updated daily with honest reviews.",
  keywords: ["AI tools", "artificial intelligence", "AI software", "best AI tools"],
  openGraph: {
    title: "AI Tools Directory",
    description: "Find the best AI tools for your needs",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        <header className="border-b border-[#27272a] bg-[#09090b]/80 backdrop-blur-sm sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
            <a href="/" className="text-xl font-bold">
              AI Tools Directory
            </a>
            <nav className="hidden md:flex items-center gap-6 text-sm text-[#71717a]">
              <a href="/tools" className="hover:text-white transition">Tools</a>
              <a href="/categories" className="hover:text-white transition">Categories</a>
              <a href="/blog" className="hover:text-white transition">Blog</a>
              <a href="/about" className="hover:text-white transition">About</a>
            </nav>
          </div>
        </header>
        <main className="min-h-screen">
          {children}
        </main>
        <footer className="border-t border-[#27272a] py-8 mt-16">
          <div className="max-w-7xl mx-auto px-4 text-center text-sm text-[#71717a]">
            <p>© 2026 AI Tools Directory. All rights reserved.</p>
            <div className="mt-4 flex justify-center gap-6">
              <a href="/privacy" className="hover:text-white transition">Privacy Policy</a>
              <a href="/terms" className="hover:text-white transition">Terms of Service</a>
              <a href="/contact" className="hover:text-white transition">Contact</a>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
