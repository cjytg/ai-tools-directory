import type { Metadata } from "next";
import Script from "next/script";
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
  metadataBase: new URL("https://toolio-ai.com"),
  alternates: {
    canonical: "https://toolio-ai.com",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://toolio-ai.com",
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
        <link rel="icon" href="/favicon-32x32.png" sizes="32x32" />
        <link rel="icon" href="/favicon-16x16.png" sizes="16x16" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="icon" href="/favicon.ico" sizes="any" />
        {/* Preconnect to external resources for faster logo/ad loading */}
        <link rel="preconnect" href="https://www.google.com" />
        <link rel="preconnect" href="https://pagead2.googlesyndication.com" />
        <link rel="preconnect" href="https://www.googletagmanager.com" />
        {/* Google AdSense — replace pub ID in .env.local once approved */}
        {process.env.NEXT_PUBLIC_ADSENSE_PUBLISHER_ID && (
          <Script
            async
            src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${process.env.NEXT_PUBLIC_ADSENSE_PUBLISHER_ID}`}
            strategy="afterInteractive"
          />
        )}
        {/* Google Analytics 4 — replace ID in .env.local */}
        {process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID && (
          <>
            <Script
              async
              src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID}`}
              strategy="afterInteractive"
            />
            <Script id="google-analytics" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID}');
              `}
            </Script>
          </>
        )}
      </head>
      <body className="antialiased">
        <header className="border-b border-[#27272a] bg-[#09090b]/80 backdrop-blur-sm sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2 group">
              <img src="/logo.png" alt="Toolio" width={32} height={32} className="group-hover:scale-105 transition-transform" />
              <img src="/toolio.png" alt="Toolio" height={24} className="h-6 w-auto" />
            </Link>
            <nav className="hidden md:flex items-center gap-6 text-sm text-[#71717a]">
              <Link href="/tools" className="hover:text-white transition">Tools</Link>
              <Link href="/categories" className="hover:text-white transition">Categories</Link>
              <Link href="/compare" className="hover:text-white transition">Compare</Link>
              <Link href="/best" className="hover:text-white transition">Best</Link>
              <Link href="/blog" className="hover:text-white transition">Blog</Link>
            </nav>
            <div className="flex items-center gap-3">
              <Link
                href="/search"
                className="px-3 py-2 bg-[#18181b] border border-[#27272a] rounded-lg text-sm text-[#71717a] hover:border-[#3b82f6] transition flex items-center gap-2"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="11" cy="11" r="8"/>
                  <line x1="21" y1="21" x2="16.65" y2="16.65"/>
                </svg>
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
                  <img src="/logo.png" alt="Toolio" width={24} height={24} />
                  <img src="/toolio.png" alt="Toolio" height={20} className="h-5 w-auto" />
                </div>
                <p className="text-sm text-[#71717a]">Find the best AI tools. Honest reviews, real pricing.</p>
              </div>
              <div>
                <h3 className="font-bold mb-4 text-sm">Browse</h3>
                <ul className="space-y-2 text-sm text-[#71717a]">
                  <li><Link href="/tools" className="hover:text-white transition">All Tools</Link></li>
                  <li><Link href="/best" className="hover:text-white transition">Best by Use Case</Link></li>
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
