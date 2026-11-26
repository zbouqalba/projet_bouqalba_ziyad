import { ChangeDetectionStrategy, Component, EventEmitter, inject, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngxs/store';
import { AuthState } from '../states/auth/auth.state';

@Component({
  selector: 'app-bienvenue',
  standalone: true,
  templateUrl: './bienvenue.html',
  styleUrl: './bienvenue.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Bienvenue {
  private store = inject(Store);
  private router = inject(Router);

  @Output() continue = new EventEmitter<void>();

  readonly user = this.store.selectSignal(AuthState.user);

  onBienvenueClick(): void {
    this.continue.emit();
    this.router.navigate(['/pollutions']);
  }
}
