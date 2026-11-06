import { Component, inject, OnInit, signal } from '@angular/core';
import { SignupForm } from '../signup-form/signup-form';
import { Bienvenue } from '../bienvenue/bienvenue';
import { PollutionList } from '../pollution-list/pollution-list';
import { PollutionForm } from '../pollution-form/pollution-form';
import { PollutionRecap } from '../pollution-recap/pollution-recap';
import { UserList } from '../user-list/user-list';
import { PollutionService } from '../services/Pollution/pollution-service';
import type { PollutionData, UserData } from '../types/types';

const STORAGE_KEY_USER = 'app_current_user';

@Component({
  selector: 'app-root',
  imports: [SignupForm, Bienvenue, PollutionList, PollutionForm, PollutionRecap, UserList],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App implements OnInit {
  title = 'exercice-web';
  private pollutionService = inject(PollutionService);

  showPollutionList = signal(false);
  showPollutionForm = signal(false);
  showUserList = signal(false);
  pollutionData = signal<PollutionData | null>(null);
  signupData = signal<UserData | null>(null);
  isEdit = signal(false);

  ngOnInit(): void {
    const saved = localStorage.getItem(STORAGE_KEY_USER);
    if (saved) {
      try {
        const user = JSON.parse(saved);
        this.signupData.set(user);
        this.showPollutionList.set(true);
      } catch {
        localStorage.removeItem(STORAGE_KEY_USER);
      }
    }
  }

  onSignupSuccess(data: UserData): void {
    localStorage.setItem(STORAGE_KEY_USER, JSON.stringify(data));
    this.signupData.set(data);
    this.showPollutionList.set(false);
    this.showPollutionForm.set(false);
    this.showUserList.set(false);
    this.pollutionData.set(null);
  }

  onLogout(): void {
    localStorage.removeItem(STORAGE_KEY_USER);
    this.signupData.set(null);
    this.showPollutionList.set(false);
    this.showPollutionForm.set(false);
    this.showUserList.set(false);
    this.pollutionData.set(null);
  }

  onShowPollutionList(): void {
    this.isEdit.set(false);
    this.showPollutionList.set(true);
    this.showPollutionForm.set(false);
    this.showUserList.set(false);
    this.pollutionData.set(null);
  }

  onShowUserList(): void {
    this.showUserList.set(true);
    this.showPollutionList.set(false);
    this.showPollutionForm.set(false);
    this.pollutionData.set(null);
  }

  onShowPollutionForm(): void {
    this.isEdit.set(false);
    this.showPollutionForm.set(true);
    this.showPollutionList.set(false);
    this.showUserList.set(false);
    this.pollutionData.set(null);
  }

  onPollutionCreated(): void {
    this.isEdit.set(false);
    this.pollutionData.set(null);
    this.showPollutionForm.set(false);
    this.showUserList.set(false);
    this.showPollutionList.set(true);
  }

  onViewPollutionDetail(id: number): void {
    this.pollutionService.readPollution(id).subscribe({
      next: (data) => {
        this.pollutionData.set(data);
        this.showPollutionList.set(false);
        this.showPollutionForm.set(false);
        this.showUserList.set(false);
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
    this.showUserList.set(false);
  }

  onUpdatePollution(id: number): void {
    this.isEdit.set(true);
    this.showPollutionForm.set(true);
    this.showPollutionList.set(false);
    this.showUserList.set(false);
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
