import { Component, inject, signal } from '@angular/core';
import { SignupForm } from '../signup-form/signup-form';
import { Bienvenue } from '../bienvenue/bienvenue';
import { PollutionList } from '../pollution-list/pollution-list';
import { PollutionForm } from '../pollution-form/pollution-form';
import { PollutionRecap } from '../pollution-recap/pollution-recap';
import { PollutionService } from '../services/Pollution/pollution-service';
import type { PollutionData, UserData } from '../types/types';

@Component({
  selector: 'app-root',
  imports: [SignupForm, Bienvenue, PollutionList, PollutionForm, PollutionRecap],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  title = 'exercice-web';
  private pollutionService = inject(PollutionService);

  showPollutionList = signal(false);
  showPollutionForm = signal(false);
  pollutionData = signal<PollutionData | null>(null);
  signupData = signal<UserData | null>(null);
  isEdit = signal(false);

  onSignupSuccess(data: UserData): void {
    this.signupData.set(data);
    this.showPollutionList.set(false);
    this.showPollutionForm.set(false);
    this.pollutionData.set(null);
  }

  onShowPollutionList(): void {
    this.isEdit.set(false);
    this.showPollutionList.set(true);
    this.showPollutionForm.set(false);
    this.pollutionData.set(null);
  }

  onShowPollutionForm(): void {
    this.isEdit.set(false);
    this.showPollutionForm.set(true);
    this.showPollutionList.set(false);
    this.pollutionData.set(null);
  }

  onPollutionCreated(): void {
    this.isEdit.set(false);
    this.pollutionData.set(null);
    this.showPollutionForm.set(false);
    this.showPollutionList.set(true);
  }

  onViewPollutionDetail(id: number): void {
    this.pollutionService.readPollution(id).subscribe({
      next: (data) => {
        this.pollutionData.set(data);
        this.showPollutionList.set(false);
        this.showPollutionForm.set(false);
      },
      error: (err) => {
        console.error('Erreur lors de la récupération des détails de la pollution', err);
      }
    });
  }

  onBackToList(): void {
    this.pollutionData.set(null);
    this.showPollutionList.set(true);
    this.showPollutionForm.set(false);
  }

  onUpdatePollution(id: number): void {
    this.isEdit.set(true);
    this.showPollutionForm.set(true);
    this.showPollutionList.set(false);
    this.pollutionData.set(null);
    this.pollutionService.readPollution(id).subscribe({
      next: (data: PollutionData) => {
        this.pollutionData.set(data);
      },
      error: (err) => {
        console.error('Erreur lors de la récupération des détails de la pollution', err);
      }
    });
  }
}
