import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-signup-form',
  imports: [FormsModule],
  templateUrl: './signup-form.html',
  styleUrl: './signup-form.scss',
})
export class SignupForm {
  @Output() showPollutionForm = new EventEmitter<void>();

  user = {
    login: '',
    password: '',
    passwordConfirm: '',
    firstName: '',
    lastName: '',
    email: '',
  };

  submittedData: any = null;

  onSubmit(formValid: boolean | null): void {
    if (formValid && this.user.password === this.user.passwordConfirm) {
      this.submittedData = { ...this.user };
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
