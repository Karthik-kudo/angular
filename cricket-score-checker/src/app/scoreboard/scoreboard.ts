import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Subscription } from 'rxjs';
import { Match, Innings } from '../models/cricket.models';
import { CricketDataService } from '../cricket-data.service';

@Component({
  selector: 'app-scoreboard',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './scoreboard.html',
  styleUrl: './scoreboard.scss'
})
export class ScoreboardComponent implements OnInit, OnDestroy {
  match: Match | null = null;
  selectedInningsIndex = 0;
  private subscription = new Subscription();

  constructor(
    private route: ActivatedRoute,
    private cricketService: CricketDataService
  ) {}

  ngOnInit(): void {
    const matchId = this.route.snapshot.paramMap.get('id');
    if (matchId === 'live') {
      this.subscription.add(
        this.cricketService.liveMatch$.subscribe(match => {
          this.match = match;
          if (!this.match.innings[this.selectedInningsIndex]) {
            this.selectedInningsIndex = 0;
          }
        })
      );
    } else if (matchId) {
      this.match = this.cricketService.getMatchById(+matchId) || null;
    }
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  get selectedInnings(): Innings | null {
    if (!this.match || !this.match.innings.length) return null;
    return this.match.innings[this.selectedInningsIndex] || null;
  }

  selectInnings(index: number): void {
    this.selectedInningsIndex = index;
  }

  getOversDisplay(innings: Innings): string {
    return `${innings.overs}.${innings.balls}`;
  }

  get currentOversDisplay(): string {
    if (!this.match) return '0.0';
    const innings = this.match.innings[this.match.currentInningsIndex];
    if (!innings) return '0.0';
    return `${innings.overs}.${innings.balls}`;
  }

  get currentScore(): string {
    if (!this.match) return '0/0';
    const innings = this.match.innings[this.match.currentInningsIndex];
    if (!innings) return '0/0';
    return `${innings.totalRuns}/${innings.wickets}`;
  }

  getBattingTeamScore(inningsIdx: number): string {
    const innings = this.match?.innings[inningsIdx];
    if (!innings) return '';
    return `${innings.totalRuns}/${innings.wickets} (${innings.overs}.${innings.balls})`;
  }
}
