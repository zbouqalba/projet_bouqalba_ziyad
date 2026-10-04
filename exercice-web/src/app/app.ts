import { Component } from '@angular/core';
import { SignupForm } from '../signup-form/signup-form';
import { PollutionForm } from '../pollution-form/pollution-form';

@Component({
  selector: 'app-root',
  imports: [SignupForm, PollutionForm],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  title = 'exercice-web';
  showPollution = false;

  onShowPollution(): void {
    this.showPollution = true;
  }
}

