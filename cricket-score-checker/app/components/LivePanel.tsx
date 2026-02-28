import { Match } from "../types/cricket";

export default function LivePanel({ match }: { match: Match }) {
  const innings = match.innings[match.currentInningsIndex];
  if (!innings) return null;

  const batters = innings.battingScorecard.filter((b) => !b.isOut);
  const currentBowler = innings.bowlingFigures[innings.bowlingFigures.length - 1];

  return (
    <div className="bg-white rounded-2xl shadow-sm border-2 border-red-100 overflow-hidden">
      {/* Live Header */}
      <div className="bg-gradient-to-r from-red-600 to-red-500 px-5 py-3 flex items-center gap-3">
        <span className="inline-flex items-center gap-1.5 text-white text-sm font-bold">
          <span className="w-2.5 h-2.5 rounded-full bg-white animate-pulse" />
          LIVE
        </span>
        <span className="text-white/80 text-sm">
          {innings.battingTeam} vs {innings.bowlingTeam}
        </span>
        <span className="ml-auto text-white font-bold text-lg">
          {innings.totalRuns}/{innings.wickets}{" "}
          <span className="text-white/70 font-normal text-sm">
            ({innings.overs}.{innings.balls} ov)
          </span>
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-0 divide-y md:divide-y-0 md:divide-x divide-gray-100">
        {/* Batters */}
        <div className="p-4">
          <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wide mb-3">
            At the Crease
          </h4>
          <table className="w-full text-sm">
            <thead>
              <tr className="text-xs text-gray-400 uppercase">
                <th className="text-left pb-2">Batter</th>
                <th className="text-center pb-2">R</th>
                <th className="text-center pb-2">B</th>
                <th className="text-center pb-2">4s</th>
                <th className="text-center pb-2">6s</th>
                <th className="text-center pb-2">SR</th>
              </tr>
            </thead>
            <tbody>
              {batters.map((bat, i) => (
                <tr key={i} className={bat.isOnStrike ? "bg-amber-50" : ""}>
                  <td className="py-2 pr-3 font-semibold text-gray-800 whitespace-nowrap">
                    {bat.isOnStrike && <span className="text-amber-500 mr-1">⚡</span>}
                    {bat.player.name}
                  </td>
                  <td className="py-2 text-center font-bold text-gray-900 text-base">
                    {bat.runs}
                  </td>
                  <td className="py-2 text-center text-gray-500">{bat.balls}</td>
                  <td className="py-2 text-center text-gray-500">{bat.fours}</td>
                  <td className="py-2 text-center text-gray-500">{bat.sixes}</td>
                  <td className="py-2 text-center text-gray-500">
                    {bat.balls > 0 ? bat.strikeRate.toFixed(1) : "—"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Current Bowler */}
        <div className="p-4">
          <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wide mb-3">
            Bowling
          </h4>
          {currentBowler ? (
            <table className="w-full text-sm">
              <thead>
                <tr className="text-xs text-gray-400 uppercase">
                  <th className="text-left pb-2">Bowler</th>
                  <th className="text-center pb-2">O</th>
                  <th className="text-center pb-2">M</th>
                  <th className="text-center pb-2">R</th>
                  <th className="text-center pb-2">W</th>
                  <th className="text-center pb-2">Eco</th>
                </tr>
              </thead>
              <tbody>
                {innings.bowlingFigures.slice(-2).map((bowl, i) => {
                  const isCurrent = i === innings.bowlingFigures.slice(-2).length - 1;
                  return (
                    <tr key={i} className={isCurrent ? "bg-red-50/60" : ""}>
                      <td className="py-2 pr-3 font-semibold text-gray-800 whitespace-nowrap">
                        {bowl.player.name}
                        {isCurrent && <span className="ml-1.5 text-red-500 text-xs">🎯</span>}
                      </td>
                      <td className="py-2 text-center text-gray-600">{bowl.overs}</td>
                      <td className="py-2 text-center text-gray-600">{bowl.maidens}</td>
                      <td className="py-2 text-center text-gray-600">{bowl.runs}</td>
                      <td className="py-2 text-center font-bold text-indigo-600">
                        {bowl.wickets}/{bowl.runs}
                      </td>
                      <td className="py-2 text-center text-gray-600">{bowl.economy}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          ) : (
            <p className="text-gray-400 text-sm">No bowling data</p>
          )}

          {/* Run Rate info */}
          <div className="mt-4 flex gap-4 text-sm">
            <div className="bg-gray-50 rounded-lg px-3 py-2">
              <div className="text-xs text-gray-400 uppercase font-semibold">CRR</div>
              <div className="font-bold text-gray-800">{innings.runRate}</div>
            </div>
            {innings.targetScore && !innings.isComplete && (
              <>
                <div className="bg-amber-50 rounded-lg px-3 py-2">
                  <div className="text-xs text-amber-600 uppercase font-semibold">Target</div>
                  <div className="font-bold text-amber-800">{innings.targetScore}</div>
                </div>
                <div className="bg-red-50 rounded-lg px-3 py-2">
                  <div className="text-xs text-red-500 uppercase font-semibold">Need</div>
                  <div className="font-bold text-red-700">
                    {innings.targetScore - innings.totalRuns}
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
