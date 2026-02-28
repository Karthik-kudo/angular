import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Match } from '../models/cricket.models';

@Component({
  selector: 'app-match-card',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './match-card.html',
  styleUrl: './match-card.scss'
})
export class MatchCardComponent {
  @Input() match!: Match;

  get routerLink(): string {
    return this.match.status === 'Live' ? '/match/live' : `/match/${this.match.id}`;
  }

  get homeScore(): string {
    const innings = this.match.innings.filter(i => i.battingTeam === this.match.homeTeam);
    if (!innings.length) return '';
    return innings.map(i => `${i.totalRuns}/${i.wickets} (${i.overs}.${i.balls})`).join(' & ');
  }

  get awayScore(): string {
    const innings = this.match.innings.filter(i => i.battingTeam === this.match.awayTeam);
    if (!innings.length) return '';
    return innings.map(i => `${i.totalRuns}/${i.wickets} (${i.overs}.${i.balls})`).join(' & ');
  }

  get matchSummary(): string {
    if (this.match.status === 'Upcoming') return 'Match starts soon';
    if (this.match.result) return this.match.result;
    const currentInnings = this.match.innings[this.match.currentInningsIndex];
    if (!currentInnings) return '';
    if (currentInnings.targetScore) {
      const need = currentInnings.targetScore - currentInnings.totalRuns;
      const wktsLeft = 10 - currentInnings.wickets;
      return `${currentInnings.battingTeam} need ${need} runs (${wktsLeft} wkts)`;
    }
    return `${currentInnings.battingTeam} batting`;
  }
}
