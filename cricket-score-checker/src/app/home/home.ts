import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { Match } from '../models/cricket.models';
import { CricketDataService } from '../cricket-data.service';
import { MatchCardComponent } from '../match-card/match-card';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, MatchCardComponent],
  templateUrl: './home.html',
  styleUrl: './home.scss'
})
export class HomeComponent implements OnInit, OnDestroy {
  matches: Match[] = [];
  liveMatch: Match | null = null;
  private sub = new Subscription();

  constructor(private cricketService: CricketDataService) {}

  ngOnInit(): void {
    this.matches = this.cricketService.getMatches();
    this.sub.add(
      this.cricketService.liveMatch$.subscribe(match => {
        this.liveMatch = match;
        // Update live match in list
        const idx = this.matches.findIndex(m => m.id === match.id);
        if (idx !== -1) {
          this.matches = [...this.matches];
          this.matches[idx] = match;
        }
      })
    );
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  get liveMatches(): Match[] {
    return this.matches.filter(m => m.status === 'Live');
  }

  get completedMatches(): Match[] {
    return this.matches.filter(m => m.status === 'Completed');
  }

  get upcomingMatches(): Match[] {
    return this.matches.filter(m => m.status === 'Upcoming');
  }
}
