import { Component } from '@angular/core';
import { SignupForm } from '../signup-form/signup-form';
import { Bienvenue } from '../bienvenue/bienvenue';
import { PollutionForm } from '../pollution-form/pollution-form';
import type { PollutionData } from '../types/types';
import { PollutionRecap } from '../pollution-recap/pollution-recap';
import type { UserData } from '../types/types';

@Component({
  selector: 'app-root',
  imports: [SignupForm, Bienvenue, PollutionForm, PollutionRecap],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  title = 'exercice-web';
  showPollution = false;
  pollutionData: PollutionData | null = null;
  signupData: UserData | null = null;

  onSignupSuccess(data: UserData): void {
    this.signupData = data;
  }

  onShowPollution(): void {
    this.showPollution = true;
  }

  onShowPollutionRecap(data: PollutionData): void {
    this.pollutionData = data;
  }
}
