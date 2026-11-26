import { ChangeDetectionStrategy, Component, EventEmitter, inject, Output, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngxs/store';
import { SignupService } from '../services/Signup/signupService';
import { Login } from '../states/auth/auth.actions';
import { UserData } from '../types/types';

@Component({
  selector: 'app-signup-form',
  imports: [FormsModule],
  templateUrl: './signup-form.html',
  styleUrl: './signup-form.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SignupForm {
  @Output() signupSuccess = new EventEmitter<UserData>();
  private store = inject(Store);
  private signupService = inject(SignupService);
  private router = inject(Router);

  isLoginMode = signal<boolean>(true);

  // Profil simulé pour l'action NGXS Login(payload: { email: string; nom: string })
  loginProfile = {
    nom: 'Jean Dupont',
    email: 'jean.dupont@test.fr',
  };

  user: UserData = {
    login: '',
    password: '',
    passwordConfirm: '',
    firstName: '',
    lastName: '',
    email: '',
  };

  errorMessage = signal<string>('');

  toggleMode(): void {
    this.isLoginMode.update((mode) => !mode);
    this.errorMessage.set('');
  }

  onSimulatedLogin(): void {
    const nom = this.loginProfile.nom.trim() || 'Jean Dupont';
    const email = this.loginProfile.email.trim() || 'jean.dupont@test.fr';

    this.store.dispatch(new Login({ email, nom }));
    this.router.navigate(['/pollutions']);
  }

  onSubmit(formValid: boolean | null): void {
    if (this.isLoginMode()) {
      if (!formValid) {
        return;
      }
      this.onSimulatedLogin();
      return;
    }

    if (!formValid) {
      return;
    }

    if (this.user.password !== this.user.passwordConfirm) {
      this.errorMessage.set('Les mots de passe ne correspondent pas.');
      return;
    }

    const { passwordConfirm, ...payload } = this.user;

    this.signupService.signUp(payload).subscribe({
      next: (response) => {
        this.errorMessage.set('');
        const fullName = `${response.firstName} ${response.lastName}`.trim();
        this.store.dispatch(
          new Login({
            email: response.email,
            nom: fullName || response.login,
          })
        );
        this.signupSuccess.emit(response);
        this.router.navigate(['/bienvenue']);
      },
      error: (err) => {
        console.error("Erreur lors de l'inscription", err);
        const msg = err.error?.message || "Une erreur est survenue lors de l'inscription.";
        this.errorMessage.set(msg);
      },
    });
  }
}
