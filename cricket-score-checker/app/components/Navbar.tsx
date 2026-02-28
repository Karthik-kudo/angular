import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur border-b border-gray-200 shadow-sm">
      <div className="max-w-6xl mx-auto px-4 h-14 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 font-extrabold text-indigo-600 text-lg tracking-tight">
          <span>🏏</span>
          <span>CricketScore</span>
        </Link>
        <div className="flex items-center gap-1">
          <Link
            href="/"
            className="text-sm font-semibold text-gray-600 hover:text-indigo-600 hover:bg-indigo-50 px-3 py-1.5 rounded-lg transition-colors"
          >
            Home
          </Link>
          <Link
            href="/match/1"
            className="text-sm font-semibold text-red-600 hover:bg-red-50 px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1.5"
          >
            <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
            Live
          </Link>
        </div>
      </div>
    </nav>
  );
}
