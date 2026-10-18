import { Component, EventEmitter, inject, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SignupService } from '../services/Signup/signupService';
import { UserData } from '../types/types';

@Component({
  selector: 'app-signup-form',
  imports: [FormsModule],
  templateUrl: './signup-form.html',
  styleUrl: './signup-form.scss',
})
export class SignupForm {
  @Output() signupSuccess = new EventEmitter<UserData>();
  private signupService = inject(SignupService);

  user: UserData = {
    login: '',
    password: '',
    passwordConfirm: '',
    firstName: '',
    lastName: '',
    email: '',
  };

  errorMessage: string = '';

  onSubmit(formValid: boolean | null): void {
    if (formValid && this.user.password === this.user.passwordConfirm) {

      this.signupService.signUp(this.user).subscribe({
        next: (response) => {
          this.errorMessage = '';
          this.signupSuccess.emit({
            ...this.user,
            ...response,
          });
        },
        error: (err) => {
          console.error('Erreur lors de l\'inscription', err);
          this.errorMessage = 'Une erreur est survenue lors de l\'inscription.';
        }
      });
    } else if (this.user.password !== this.user.passwordConfirm) {
      this.errorMessage = 'Les mots de passe ne correspondent pas.';
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
  }
}
