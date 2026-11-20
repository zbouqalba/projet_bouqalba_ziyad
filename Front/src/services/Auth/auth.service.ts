import { Injectable, computed, signal } from '@angular/core';
import type { UserData } from '../../types/types';

const STORAGE_KEY_USER = 'app_current_user';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly currentUserSignal = signal<UserData | null>(this.loadUserFromStorage());

  readonly currentUser = this.currentUserSignal.asReadonly();
  readonly isAuthenticated = computed(() => this.currentUserSignal() !== null);

  private loadUserFromStorage(): UserData | null {
    if (typeof localStorage === 'undefined') {
      return null;
    }
    const saved = localStorage.getItem(STORAGE_KEY_USER);
    if (!saved) {
      return null;
    }
    try {
      return JSON.parse(saved) as UserData;
    } catch {
      localStorage.removeItem(STORAGE_KEY_USER);
      return null;
    }
  }

  setSession(user: UserData): void {
    localStorage.setItem(STORAGE_KEY_USER, JSON.stringify(user));
    this.currentUserSignal.set({ ...user });
  }

  logout(): void {
    localStorage.removeItem(STORAGE_KEY_USER);
    this.currentUserSignal.set(null);
  }
}

