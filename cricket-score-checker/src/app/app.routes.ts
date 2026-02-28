import { Routes } from '@angular/router';
import { HomeComponent } from './home/home';
import { ScoreboardComponent } from './scoreboard/scoreboard';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'match/:id', component: ScoreboardComponent },
  { path: '**', redirectTo: '' }
];
