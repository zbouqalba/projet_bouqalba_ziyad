import { Component, EventEmitter, inject, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SignupService } from '../services/Signup/signupService';

@Component({
  selector: 'app-signup-form',
  imports: [FormsModule],
  templateUrl: './signup-form.html',
  styleUrl: './signup-form.scss',
})
export class SignupForm {
  @Output() signupSuccess = new EventEmitter<any>();
  private signupService = inject(SignupService);

  user = {
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
      const { passwordConfirm, ...userDataToSubmit } = this.user;

      this.signupService.signUp(userDataToSubmit).subscribe({
        next: (response) => {
          this.errorMessage = '';
          this.signupSuccess.emit({
            ...userDataToSubmit,
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
