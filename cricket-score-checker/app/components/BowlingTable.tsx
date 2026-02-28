import { Innings } from "../types/cricket";

export default function BowlingTable({
  innings,
  isLive,
}: {
  innings: Innings;
  isLive?: boolean;
}) {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="flex items-center gap-2 px-5 py-4 border-b border-gray-100 bg-gray-50">
        <span className="text-lg">⚾</span>
        <span className="font-bold text-gray-800">{innings.bowlingTeam} Bowling</span>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-gray-50 text-xs text-gray-500 uppercase tracking-wide">
              <th className="text-left px-4 py-3 font-semibold">Bowler</th>
              <th className="px-3 py-3 font-semibold text-center">O</th>
              <th className="px-3 py-3 font-semibold text-center">M</th>
              <th className="px-3 py-3 font-semibold text-center">R</th>
              <th className="px-3 py-3 font-semibold text-center">W</th>
              <th className="px-3 py-3 font-semibold text-center">Eco</th>
              <th className="px-3 py-3 font-semibold text-center">NB</th>
              <th className="px-3 py-3 font-semibold text-center">Wd</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {innings.bowlingFigures.map((bowl, idx) => {
              const isCurrentBowler = isLive && idx === innings.bowlingFigures.length - 1;
              return (
                <tr
                  key={idx}
                  className={`transition-colors hover:bg-gray-50
                    ${bowl.wickets >= 5 ? "bg-purple-50/60" : ""}
                    ${isCurrentBowler ? "bg-red-50/40" : ""}
                  `}
                >
                  <td className="px-4 py-3 font-semibold text-gray-800 whitespace-nowrap">
                    {bowl.player.name}
                    {isCurrentBowler && <span className="ml-1.5 text-red-500">🎯</span>}
                  </td>
                  <td className="px-3 py-3 text-center text-gray-600">{bowl.overs}</td>
                  <td className="px-3 py-3 text-center text-gray-600">{bowl.maidens}</td>
                  <td className="px-3 py-3 text-center text-gray-600">{bowl.runs}</td>
                  <td className={`px-3 py-3 text-center font-bold
                    ${bowl.wickets >= 5 ? "text-purple-600" : bowl.wickets >= 3 ? "text-indigo-600" : "text-gray-800"}`}>
                    {bowl.wickets}/{bowl.runs}
                  </td>
                  <td className="px-3 py-3 text-center text-gray-600">{bowl.economy}</td>
                  <td className="px-3 py-3 text-center text-gray-500">{bowl.noBalls}</td>
                  <td className="px-3 py-3 text-center text-gray-500">{bowl.wides}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
