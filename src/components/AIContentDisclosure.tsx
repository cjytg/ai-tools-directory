export default function AIContentDisclosure({ className = "" }: { className?: string }) {
  return (
    <div className={`p-4 bg-[#18181b] border border-[#27272a] rounded-lg ${className}`}>
      <p className="text-xs text-[#71717a]">
        <strong className="text-[#a1a1aa]">Content Disclosure:</strong> This content was created with 
        AI assistance and reviewed by humans for accuracy. Last updated: January 2026.
      </p>
    </div>
  );
}
