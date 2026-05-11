import Link from "next/link";

export default function NotFound() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-20 text-center">
      <h1 className="text-6xl font-bold mb-4">404</h1>
      <h2 className="text-2xl font-semibold mb-6">Page Not Found</h2>
      <p className="text-[#71717a] mb-8">
        The page you&apos;re looking for doesn&apos;t exist or has been moved.
      </p>
      <div className="flex gap-4 justify-center">
        <Link
          href="/"
          className="px-6 py-3 bg-[#3b82f6] hover:bg-[#2563eb] rounded-lg transition"
        >
          Go Home
        </Link>
        <Link
          href="/tools"
          className="px-6 py-3 border border-[#27272a] hover:border-[#3b82f6] rounded-lg transition"
        >
          Browse Tools
        </Link>
      </div>
    </div>
  );
}
