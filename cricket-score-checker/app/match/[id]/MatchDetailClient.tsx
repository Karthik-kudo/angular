"use client";
import { useState } from "react";
import Link from "next/link";
import { useLiveScore } from "../../hooks/useLiveScore";
import BattingTable from "../../components/BattingTable";
import BowlingTable from "../../components/BowlingTable";
import LivePanel from "../../components/LivePanel";

export default function MatchDetailClient({ id }: { id: string }) {
  const matches = useLiveScore();
  const match = matches.find((m) => m.id === Number(id));
  const [selectedInnings, setSelectedInnings] = useState(0);

  if (!match) {
    return (
      <div className="flex flex-col items-center justify-center py-24 text-center">
        <div className="text-6xl mb-4">🏏</div>
        <h2 className="text-2xl font-bold text-gray-700 mb-2">Match not found</h2>
        <p className="text-gray-500 mb-6">This match doesn&apos;t exist or has been removed.</p>
        <Link href="/" className="bg-indigo-600 text-white px-5 py-2.5 rounded-xl font-semibold hover:bg-indigo-700 transition-colors">
          ← Back to Matches
        </Link>
      </div>
    );
  }

  const statusBadgeClass =
    match.status === "Live"
      ? "bg-red-600"
      : match.status === "Completed"
      ? "bg-emerald-600"
      : "bg-amber-500";

  const inningsWithData = match.innings.filter((i) => i.battingScorecard.length > 0);
  const curInnings = match.innings[selectedInnings];

  return (
    <div className="space-y-6">
      {/* Match Header */}
      <div className="rounded-2xl overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-indigo-900 text-white">
        {/* Status bar */}
        <div className="px-6 py-2 flex items-center gap-3 border-b border-white/10">
          <span className="text-xs font-bold bg-white/15 px-3 py-1 rounded-full uppercase tracking-wider">
            {match.matchType}
          </span>
          <span className={`text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1.5 ${statusBadgeClass} text-white`}>
            {match.status === "Live" && (
              <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
            )}
            {match.status}
          </span>
        </div>

        <div className="px-6 py-5">
          <h1 className="text-xl md:text-2xl font-extrabold mb-3">{match.title}</h1>
          <div className="flex flex-wrap gap-x-6 gap-y-1 text-sm text-white/60 mb-3">
            <span>📍 {match.venue}</span>
            <span>📅 {match.date}</span>
          </div>
          {match.tossWinner && (
            <div className="text-sm text-white/70 bg-white/10 inline-block px-3 py-1 rounded-lg">
              🪙 {match.tossWinner} won toss &amp; elected to{" "}
              <strong className="text-white">{match.tossDecision}</strong>
            </div>
          )}
        </div>

        {/* Score Cards Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 divide-y sm:divide-y-0 sm:divide-x divide-white/10 border-t border-white/10">
          {match.innings.filter((i) => i.battingTeam).map((inn, idx) => (
            <div
              key={idx}
              className={`px-6 py-4 ${idx === match.currentInningsIndex && match.status === "Live" ? "bg-white/5" : ""}`}
            >
              <div className="flex items-center gap-2 mb-1.5">
                <span className="text-xl">
                  {inn.battingTeam === match.homeTeam ? match.homeTeamFlag : match.awayTeamFlag}
                </span>
                <span className="font-bold text-white/90">{inn.battingTeam}</span>
                {match.matchType === "Test" && (
                  <span className="text-xs text-white/40 ml-1">Inn {inn.inningsNumber}</span>
                )}
                {idx === match.currentInningsIndex && match.status === "Live" && (
                  <span className="ml-auto text-xs font-bold text-red-300 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-red-400 animate-pulse" /> batting
                  </span>
                )}
              </div>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-black text-white">
                  {inn.totalRuns}/{inn.wickets}
                </span>
                <span className="text-white/50 text-sm">
                  ({inn.overs}.{inn.balls} ov)
                </span>
              </div>
              <div className="text-xs text-white/50 mt-1 flex gap-4">
                <span>
                  CRR: <strong className="text-white/70">{inn.runRate}</strong>
                </span>
                {inn.targetScore && !inn.isComplete && (
                  <span>
                    Target: <strong className="text-amber-300">{inn.targetScore}</strong>
                  </span>
                )}
                {inn.requiredRunRate && !inn.isComplete && (
                  <span>
                    RRR: <strong className="text-red-300">{inn.requiredRunRate}</strong>
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Result */}
        {match.result && (
          <div className="px-6 py-3 bg-emerald-900/50 border-t border-white/10 flex flex-wrap items-center gap-3">
            <span className="text-base">🏆</span>
            <span className="font-bold text-emerald-300">{match.result}</span>
            {match.playerOfMatch && (
              <span className="text-sm text-white/60">
                ⭐ Player of Match:{" "}
                <strong className="text-yellow-300">{match.playerOfMatch}</strong>
              </span>
            )}
          </div>
        )}
      </div>

      {/* Live Panel */}
      {match.status === "Live" && <LivePanel match={match} />}

      {/* Innings Tabs */}
      {inningsWithData.length > 1 && (
        <div className="flex gap-2 overflow-x-auto pb-1">
          {inningsWithData.map((inn) => {
            const realIdx = match.innings.indexOf(inn);
            return (
              <button
                key={realIdx}
                onClick={() => setSelectedInnings(realIdx)}
                className={`flex-shrink-0 px-4 py-2 rounded-xl text-sm font-semibold border-2 transition-all ${
                  selectedInnings === realIdx
                    ? "bg-indigo-600 border-indigo-600 text-white"
                    : "bg-white border-gray-200 text-gray-600 hover:border-indigo-300 hover:text-indigo-600"
                }`}
              >
                {inn.battingTeam}
                {match.matchType === "Test" ? ` – Inn ${inn.inningsNumber}` : ""}
              </button>
            );
          })}
        </div>
      )}

      {/* Scorecard */}
      {curInnings && curInnings.battingScorecard.length > 0 && (
        <div className="space-y-4">
          <BattingTable innings={curInnings} />
          <BowlingTable
            innings={curInnings}
            isLive={
              match.status === "Live" && selectedInnings === match.currentInningsIndex
            }
          />
        </div>
      )}

      {/* Upcoming placeholder */}
      {match.status === "Upcoming" && (
        <div className="bg-white rounded-2xl border border-gray-100 p-10 text-center shadow-sm">
          <div className="text-5xl mb-3">🗓</div>
          <h3 className="text-lg font-bold text-gray-700 mb-1">
            Match hasn&apos;t started yet
          </h3>
          <p className="text-gray-400">Check back on {match.date} for live scores.</p>
        </div>
      )}

      <div className="pt-2">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm font-semibold text-indigo-600 hover:text-indigo-800 border-2 border-indigo-200 hover:border-indigo-400 px-4 py-2 rounded-xl transition-colors"
        >
          ← Back to All Matches
        </Link>
      </div>
    </div>
  );
}
