import { ChangeDetectionStrategy, Component, EventEmitter, inject, Output, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { SignupService } from '../services/Signup/signupService';
import { AuthService } from '../services/Auth/auth.service';
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
  private signupService = inject(SignupService);
  private authService = inject(AuthService);
  private router = inject(Router);

  isLoginMode = signal<boolean>(true);

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

  onSubmit(formValid: boolean | null): void {
    if (!formValid) {
      return;
    }

    if (this.isLoginMode()) {
      // Mode Connexion
      this.signupService.login({ login: this.user.login, password: this.user.password }).subscribe({
        next: (response) => {
          this.errorMessage.set('');
          const loggedInUser: UserData = {
            ...this.user,
            ...response,
          };
          this.authService.setSession(loggedInUser);
          this.signupSuccess.emit(loggedInUser);
          this.router.navigate(['/pollutions']);
        },
        error: (err) => {
          console.error('Erreur lors de la connexion', err);
          const msg = err.error?.message || 'Identifiant ou mot de passe incorrect.';
          this.errorMessage.set(msg);
        },
      });
    } else {
      // Mode Inscription
      if (this.user.password !== this.user.passwordConfirm) {
        this.errorMessage.set('Les mots de passe ne correspondent pas.');
        return;
      }

      this.signupService.signUp(this.user).subscribe({
        next: (response) => {
          this.errorMessage.set('');
          const registeredUser: UserData = {
            ...this.user,
            ...response,
          };
          this.authService.setSession(registeredUser);
          this.signupSuccess.emit(registeredUser);
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

  resetForm(): void {
    this.user = {
      login: '',
      password: '',
      passwordConfirm: '',
      firstName: '',
      lastName: '',
      email: '',
    };
    this.errorMessage.set('');
  }
}
