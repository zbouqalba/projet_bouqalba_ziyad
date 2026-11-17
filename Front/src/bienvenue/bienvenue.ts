import { ChangeDetectionStrategy, Component, computed, EventEmitter, inject, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/Auth/auth.service';
import type { UserData } from '../types/types';

@Component({
  selector: 'app-bienvenue',
  standalone: true,
  templateUrl: './bienvenue.html',
  styleUrl: './bienvenue.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Bienvenue {
  private authService = inject(AuthService);
  private router = inject(Router);

  @Input() data?: UserData | null;
  @Output() continue = new EventEmitter<void>();

  readonly userData = computed<UserData | null>(() => {
    return this.data ?? this.authService.currentUser();
  });

  onBienvenueClick(): void {
    this.continue.emit();
    this.router.navigate(['/pollutions']);
  }
}
