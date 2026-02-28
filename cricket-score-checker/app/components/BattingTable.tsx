import { Innings } from "../types/cricket";

export default function BattingTable({ innings }: { innings: Innings }) {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100 bg-gray-50">
        <div className="flex items-center gap-2">
          <span className="text-lg">🏏</span>
          <span className="font-bold text-gray-800">{innings.battingTeam} Batting</span>
        </div>
        <span className="text-sm font-semibold text-gray-500">
          {innings.totalRuns}/{innings.wickets} ({innings.overs}.{innings.balls} ov)
        </span>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-gray-50 text-xs text-gray-500 uppercase tracking-wide">
              <th className="text-left px-4 py-3 font-semibold">Batter</th>
              <th className="text-left px-4 py-3 font-semibold">Dismissal</th>
              <th className="px-3 py-3 font-semibold text-center">R</th>
              <th className="px-3 py-3 font-semibold text-center">B</th>
              <th className="px-3 py-3 font-semibold text-center">4s</th>
              <th className="px-3 py-3 font-semibold text-center">6s</th>
              <th className="px-3 py-3 font-semibold text-center">SR</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {innings.battingScorecard.map((bat, idx) => {
              const didNotBat = !bat.isOut && bat.balls === 0 && innings.isComplete;
              const notOut = !bat.isOut && (bat.balls > 0 || !innings.isComplete);
              return (
                <tr
                  key={idx}
                  className={`transition-colors ${notOut ? "bg-emerald-50/60" : ""} hover:bg-gray-50`}
                >
                  <td className="px-4 py-3 font-semibold text-gray-800 whitespace-nowrap">
                    {bat.isOnStrike && !bat.isOut && (
                      <span className="mr-1 text-amber-500">⚡</span>
                    )}
                    {bat.player.name}
                  </td>
                  <td className="px-4 py-3 text-gray-500">
                    {notOut && <span className="text-emerald-600 font-semibold italic">not out</span>}
                    {didNotBat && <span className="text-gray-400 italic">did not bat</span>}
                    {bat.isOut && bat.dismissal}
                  </td>
                  <td className={`px-3 py-3 text-center font-bold whitespace-nowrap
                    ${bat.runs >= 100 ? "text-amber-600 text-base" : bat.runs >= 50 ? "text-emerald-600" : "text-gray-800"}`}>
                    {bat.runs}
                  </td>
                  <td className="px-3 py-3 text-center text-gray-600">{bat.balls}</td>
                  <td className="px-3 py-3 text-center text-gray-600">{bat.fours}</td>
                  <td className="px-3 py-3 text-center text-gray-600">{bat.sixes}</td>
                  <td className="px-3 py-3 text-center text-gray-600">
                    {bat.balls > 0 ? bat.strikeRate.toFixed(1) : "—"}
                  </td>
                </tr>
              );
            })}
          </tbody>
          <tfoot>
            <tr className="bg-gray-50 text-xs text-gray-500 border-t border-gray-200">
              <td className="px-4 py-2.5 font-semibold" colSpan={2}>Extras</td>
              <td className="px-3 py-2.5 text-center" colSpan={5}>
                {innings.extras.total} (b {innings.extras.byes}, lb {innings.extras.legByes}, w {innings.extras.wides}, nb {innings.extras.noBalls})
              </td>
            </tr>
            <tr className="bg-indigo-50/40 font-semibold border-t border-gray-200">
              <td className="px-4 py-3 text-gray-800" colSpan={2}>
                TOTAL{" "}
                <span className="text-gray-500 font-normal text-xs">
                  {innings.isComplete ? "(All Out)" : `(${innings.wickets} wkts)`}
                </span>
              </td>
              <td className="px-3 py-3 text-center text-gray-800 font-bold" colSpan={5}>
                {innings.totalRuns}{" "}
                <span className="text-gray-500 font-normal text-xs">
                  ({innings.overs}.{innings.balls} Ov, RR: {innings.runRate})
                </span>
              </td>
            </tr>
          </tfoot>
        </table>
      </div>

      {/* Fall of Wickets */}
      {innings.fallOfWickets.length > 0 && (
        <div className="px-5 py-3 bg-amber-50 border-t border-amber-100">
          <span className="text-xs font-bold text-amber-800 uppercase tracking-wide mr-2">
            Fall of Wickets:
          </span>
          {innings.fallOfWickets.map((fow, i) => (
            <span key={i} className="text-xs text-amber-700">
              <strong>{fow.score}-{fow.wicketNumber}</strong>{" "}
              <span className="text-amber-600">({fow.playerName}, {fow.overs} ov)</span>
              {i < innings.fallOfWickets.length - 1 && " · "}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
