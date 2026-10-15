import { Component, EventEmitter, inject, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SignupService } from '../services/signupService'

@Component({
  selector: 'app-signup-form',
  imports: [FormsModule],
  templateUrl: './signup-form.html',
  styleUrl: './signup-form.scss',
})
export class SignupForm {
  @Output() showPollutionForm = new EventEmitter<void>();
  private signupService = inject(SignupService)

  user = {
    login: '',
    password: '',
    passwordConfirm: '',
    firstName: '',
    lastName: '',
    email: '',
  };

  submittedData: any = null;
  errorMessage: string = '';

  onSubmit(formValid: boolean | null): void {
    if (formValid && this.user.password === this.user.passwordConfirm) {
      const { passwordConfirm, ...userDataToSubmit } = this.user;

      this.signupService.signUp(userDataToSubmit).subscribe({
        next: (response) => {
          this.submittedData = {
            ...userDataToSubmit,
            ...response,
          };
          this.errorMessage = '';
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

  onBienvenueClick(): void {
    this.showPollutionForm.emit();
  }

  resetForm(): void {
    this.submittedData = null;
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
