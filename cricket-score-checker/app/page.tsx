"use client";
import { useLiveScore } from "./hooks/useLiveScore";
import MatchCard from "./components/MatchCard";
import { Match } from "./types/cricket";

function Section({ title, dot, matches }: { title: string; dot: string; matches: Match[] }) {
  if (!matches.length) return null;
  return (
    <section className="mb-10">
      <div className="flex items-center gap-2.5 mb-4">
        <span className={`w-3 h-3 rounded-full ${dot}`} />
        <h2 className="text-lg font-bold text-gray-800">{title}</h2>
        <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-gray-100 text-gray-500">
          {matches.length}
        </span>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {matches.map((m) => (
          <MatchCard key={m.id} match={m} />
        ))}
      </div>
    </section>
  );
}

export default function HomePage() {
  const matches = useLiveScore();
  const live = matches.filter((m) => m.status === "Live");
  const completed = matches.filter((m) => m.status === "Completed");
  const upcoming = matches.filter((m) => m.status === "Upcoming");

  return (
    <>
      {/* Hero */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-indigo-950 via-indigo-800 to-purple-900 text-white px-8 py-10 mb-10">
        <div className="relative z-10">
          <div className="text-5xl mb-3">🏏</div>
          <h1 className="text-3xl md:text-4xl font-extrabold mb-2 bg-gradient-to-r from-white to-indigo-200 bg-clip-text text-transparent">
            Cricket Score Checker
          </h1>
          <p className="text-indigo-200 text-base mb-6">
            Live scores, full scorecards &amp; match stats — T20 · ODI · Test
          </p>
          <div className="flex flex-wrap gap-3">
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur border border-white/20 rounded-full px-4 py-1.5 text-sm font-semibold">
              <span className="w-2 h-2 rounded-full bg-red-400 animate-pulse" />
              {live.length} Live
            </div>
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur border border-white/20 rounded-full px-4 py-1.5 text-sm font-semibold">
              ✓ {completed.length} Completed
            </div>
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur border border-white/20 rounded-full px-4 py-1.5 text-sm font-semibold">
              🗓 {upcoming.length} Upcoming
            </div>
          </div>
        </div>
        <div className="absolute -right-8 -top-8 text-[160px] opacity-5 rotate-12 select-none pointer-events-none">
          🏏
        </div>
      </div>

      <Section
        title="Live Now"
        dot="bg-red-500"
        matches={live}
      />
      <Section title="Recent Results" dot="bg-emerald-500" matches={completed} />
      <Section title="Upcoming Matches" dot="bg-amber-400" matches={upcoming} />
    </>
  );
}
