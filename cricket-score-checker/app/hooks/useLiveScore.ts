"use client";
import { useState, useEffect, useCallback } from "react";
import { Match, Innings } from "../types/cricket";
import { matchesData } from "../data/matches";

function deepClone<T>(obj: T): T {
  return JSON.parse(JSON.stringify(obj));
}

function simulateUpdate(match: Match): Match {
  const m = deepClone(match);
  const innings: Innings = m.innings[m.currentInningsIndex];
  if (!innings || innings.isComplete || innings.battingScorecard.length === 0) return m;

  const runs = Math.floor(Math.random() * 7);
  const isWicket = Math.random() < 0.06 && innings.wickets < 9;
  const isExtra = Math.random() < 0.07 && runs > 0;
  const legalDelivery = !isExtra || Math.random() > 0.5;

  innings.totalRuns += runs;
  if (isExtra) innings.extras.total += 1;

  if (legalDelivery) {
    innings.balls += 1;
    if (innings.balls >= 6) {
      innings.balls = 0;
      innings.overs += 1;
    }
  }

  if (isWicket) {
    innings.wickets += 1;
    innings.fallOfWickets.push({
      wicketNumber: innings.wickets,
      score: innings.totalRuns,
      overs: parseFloat(`${innings.overs}.${innings.balls}`),
      playerName: innings.battingScorecard[innings.wickets - 1]?.player.name || "Unknown",
    });
    const outBat = innings.battingScorecard.find((b) => !b.isOut && !b.isOnStrike);
    if (outBat) outBat.isOut = true;
  }

  // Update striker
  const striker = innings.battingScorecard.find((b) => b.isOnStrike && !b.isOut);
  if (striker && runs > 0) {
    striker.runs += runs;
    if (legalDelivery) striker.balls += 1;
    if (runs === 4) striker.fours += 1;
    if (runs === 6) striker.sixes += 1;
    striker.strikeRate = striker.balls > 0 ? Math.round((striker.runs / striker.balls) * 1000) / 10 : 0;
  }

  // Rotate strike on odd runs
  if (runs % 2 !== 0) {
    innings.battingScorecard.forEach((b) => {
      if (!b.isOut) b.isOnStrike = !b.isOnStrike;
    });
  }

  // Update current bowler
  const bowler = innings.bowlingFigures[innings.bowlingFigures.length - 1];
  if (bowler) {
    bowler.runs += runs;
    if (isWicket) bowler.wickets += 1;
    if (legalDelivery) {
      const bowlerBalls = Math.round((bowler.overs % 1) * 10) + 1;
      bowler.overs = bowlerBalls >= 6 ? Math.floor(bowler.overs) + 1 : Math.floor(bowler.overs) + bowlerBalls / 10;
    }
    const totalOvers = bowler.overs > 0 ? bowler.overs : 0.1;
    bowler.economy = Math.round((bowler.runs / totalOvers) * 10) / 10;
  }

  const totalOvers = innings.overs + innings.balls / 6;
  innings.runRate = totalOvers > 0 ? Math.round((innings.totalRuns / totalOvers) * 100) / 100 : 0;

  const maxOvers = m.matchType === "T20" ? 20 : 50;
  if (innings.wickets >= 10 || innings.overs >= maxOvers || (innings.targetScore && innings.totalRuns >= innings.targetScore)) {
    innings.isComplete = true;
    if (m.currentInningsIndex < m.innings.length - 1) {
      m.currentInningsIndex += 1;
    }
  }
  return m;
}

export function useLiveScore() {
  const [matches, setMatches] = useState<Match[]>(() => deepClone(matchesData));

  const update = useCallback(() => {
    setMatches((prev) =>
      prev.map((m) => (m.status === "Live" ? simulateUpdate(m) : m))
    );
  }, []);

  useEffect(() => {
    const id = setInterval(update, 7000);
    return () => clearInterval(id);
  }, [update]);

  return matches;
}
