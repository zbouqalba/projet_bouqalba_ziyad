import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { Store } from '@ngxs/store';
import { AuthState } from '../states/auth/auth.state';
import { Logout } from '../states/auth/auth.actions';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './app.html',
  styleUrl: './app.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class App {
  title = 'exercice-web';
  private store = inject(Store);
  private router = inject(Router);

  user = this.store.selectSignal(AuthState.user);
  isAuthenticated = this.store.selectSignal(AuthState.isAuthenticated);
  username = this.store.selectSignal(AuthState.username);

  onLogout(): void {
    this.store.dispatch(new Logout());
    this.router.navigate(['/login']);
  }
}
