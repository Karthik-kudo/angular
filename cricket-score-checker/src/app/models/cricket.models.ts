export interface Player {
  id: number;
  name: string;
  country: string;
}

export interface BatsmanScore {
  player: Player;
  runs: number;
  balls: number;
  fours: number;
  sixes: number;
  strikeRate: number;
  isOut: boolean;
  dismissal?: string;
  bowler?: string;
  isOnStrike?: boolean;
}

export interface BowlerFigure {
  player: Player;
  overs: number;
  maidens: number;
  runs: number;
  wickets: number;
  economy: number;
  noBalls: number;
  wides: number;
}

export interface FallOfWicket {
  wicketNumber: number;
  score: number;
  overs: number;
  playerName: string;
}

export interface Innings {
  inningsNumber: number;
  battingTeam: string;
  bowlingTeam: string;
  totalRuns: number;
  wickets: number;
  overs: number;
  balls: number;
  extras: {
    total: number;
    byes: number;
    legByes: number;
    wides: number;
    noBalls: number;
  };
  runRate: number;
  requiredRunRate?: number;
  targetScore?: number;
  battingScorecard: BatsmanScore[];
  bowlingFigures: BowlerFigure[];
  fallOfWickets: FallOfWicket[];
  isComplete: boolean;
}

export interface Match {
  id: number;
  title: string;
  matchType: 'Test' | 'ODI' | 'T20';
  status: 'Live' | 'Completed' | 'Upcoming';
  venue: string;
  date: string;
  homeTeam: string;
  awayTeam: string;
  homeTeamFlag: string;
  awayTeamFlag: string;
  innings: Innings[];
  result?: string;
  tossWinner?: string;
  tossDecision?: string;
  playerOfMatch?: string;
  currentInningsIndex: number;
}
