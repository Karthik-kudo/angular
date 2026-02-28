"use client";
import Link from "next/link";
import { Match } from "../types/cricket";

function getTeamScore(match: Match, team: string): string {
  const innings = match.innings.filter((i) => i.battingTeam === team);
  if (!innings.length) return "";
  return innings.map((i) => `${i.totalRuns}/${i.wickets} (${i.overs}.${i.balls})`).join(" & ");
}

function getSummary(match: Match): string {
  if (match.status === "Upcoming") return "Match starts soon";
  if (match.result) return match.result;
  const cur = match.innings[match.currentInningsIndex];
  if (!cur) return "";
  if (cur.targetScore) {
    const need = cur.targetScore - cur.totalRuns;
    const wkts = 10 - cur.wickets;
    return `${cur.battingTeam} need ${need} runs (${wkts} wkts left)`;
  }
  return `${cur.battingTeam} batting`;
}

export default function MatchCard({ match }: { match: Match }) {
  const href = `/match/${match.id}`;
  const homeScore = getTeamScore(match, match.homeTeam);
  const awayScore = getTeamScore(match, match.awayTeam);
  const summary = getSummary(match);
  const curBatting = match.innings[match.currentInningsIndex]?.battingTeam;

  const statusColor =
    match.status === "Live"
      ? "bg-red-50 text-red-600 border-red-200"
      : match.status === "Completed"
      ? "bg-emerald-50 text-emerald-700 border-emerald-200"
      : "bg-amber-50 text-amber-700 border-amber-200";

  return (
    <Link href={href} className="block group">
      <div className="bg-white rounded-2xl border-2 border-gray-100 p-5 shadow-sm hover:shadow-lg hover:border-indigo-300 hover:-translate-y-1 transition-all duration-200 relative overflow-hidden cursor-pointer">
        {/* top gradient stripe */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-indigo-500 to-purple-500" />

        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wide bg-indigo-50 text-indigo-600 border border-indigo-200 px-2.5 py-0.5 rounded-full">
              {match.matchType}
            </span>
            <span className={`text-xs font-bold px-2.5 py-0.5 rounded-full border flex items-center gap-1.5 ${statusColor}`}>
              {match.status === "Live" && (
                <span className="inline-block w-2 h-2 rounded-full bg-red-500 animate-pulse" />
              )}
              {match.status}
            </span>
          </div>
          <span className="text-xs text-gray-400">{match.date}</span>
        </div>

        {/* Teams */}
        <div className="space-y-1 mb-4">
          <div className={`flex items-center gap-3 px-3 py-2 rounded-xl transition-colors ${match.status === "Live" && curBatting === match.homeTeam ? "bg-indigo-50" : ""}`}>
            <span className="text-2xl">{match.homeTeamFlag}</span>
            <span className="font-bold text-gray-800 flex-1">{match.homeTeam}</span>
            <span className="font-bold text-gray-700 tabular-nums">{homeScore}</span>
          </div>
          <div className="text-center text-xs text-gray-300 font-bold tracking-widest">VS</div>
          <div className={`flex items-center gap-3 px-3 py-2 rounded-xl transition-colors ${match.status === "Live" && curBatting === match.awayTeam ? "bg-indigo-50" : ""}`}>
            <span className="text-2xl">{match.awayTeamFlag}</span>
            <span className="font-bold text-gray-800 flex-1">{match.awayTeam}</span>
            <span className="font-bold text-gray-700 tabular-nums">{awayScore}</span>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between pt-3 border-t border-gray-100">
          <span className={`text-xs font-semibold ${match.result ? "text-emerald-600" : "text-gray-500"}`}>
            {summary}
          </span>
          <span className="text-xs font-bold text-indigo-500 group-hover:text-indigo-700">
            View Scorecard →
          </span>
        </div>
        <p className="text-xs text-gray-400 mt-1.5">📍 {match.venue}</p>
      </div>
    </Link>
  );
}
