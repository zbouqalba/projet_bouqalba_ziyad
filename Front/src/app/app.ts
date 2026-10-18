import { ChangeDetectorRef, Component, inject } from '@angular/core';
import { SignupForm } from '../signup-form/signup-form';
import { Bienvenue } from '../bienvenue/bienvenue';
import { PollutionForm, PollutionData } from '../pollution-form/pollution-form';
import { PollutionRecap } from '../pollution-recap/pollution-recap';

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
  signupData: any = null;
  private cdr = inject(ChangeDetectorRef);

  onSignupSuccess(data: any): void {
    this.signupData = data;
    this.cdr.markForCheck();
  }

  onShowPollution(): void {
    this.showPollution = true;
  }

  onShowPollutionRecap(data: PollutionData): void {
    this.pollutionData = data;
  }
}
