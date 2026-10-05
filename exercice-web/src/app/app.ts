import { Component } from '@angular/core';
import { SignupForm } from '../signup-form/signup-form';
import { PollutionForm, PollutionData } from '../pollution-form/pollution-form';
import { PollutionRecap } from '../pollution-recap/pollution-recap';

@Component({
  selector: 'app-root',
  imports: [SignupForm, PollutionForm, PollutionRecap],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  title = 'exercice-web';
  showPollution = false;
  pollutionData: PollutionData | null = null;

  onShowPollution(): void {
    this.showPollution = true;
  }

  onShowPollutionRecap(data: PollutionData): void {
    this.pollutionData = data;
  }
}

