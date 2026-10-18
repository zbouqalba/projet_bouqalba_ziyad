import { Component, Output, EventEmitter, inject, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import type { PollutionData } from '../types/types';
import { PollutionService } from '../services/Pollution/pollution-service';


@Component({
  selector: 'app-pollution-form',
  imports: [ReactiveFormsModule],
  templateUrl: './pollution-form.html',
  styleUrl: './pollution-form.scss',
})
export class PollutionForm {
  @Output() pollutionCreated = new EventEmitter<void>();
  @Output() cancel = new EventEmitter<void>();
  private pollutionService = inject(PollutionService);
  errorMessage = signal<string>('');

  today = new Date().toISOString().split('T')[0];

  pollutionForm = new FormGroup({
    title: new FormControl('', { nonNullable: true, validators: [Validators.required, Validators.minLength(3), Validators.maxLength(100)] }),
    typePollution: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    description: new FormControl('', { nonNullable: true, validators: [Validators.required, Validators.minLength(10)] }),
    date: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    lieu: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    latitude: new FormControl(0, { nonNullable: true, validators: [Validators.required, Validators.min(-90), Validators.max(90)] }),
    longitude: new FormControl(0, { nonNullable: true, validators: [Validators.required, Validators.min(-180), Validators.max(180)] }),
    photo: new FormControl<string | null>(null),
  });

  onSubmit() {
    if (this.pollutionForm.valid) {
      const pollutionData: PollutionData = {
        ...this.pollutionForm.getRawValue(),
        id: Math.floor(Math.random() * 1000),
      };

      this.pollutionService.createPollution(pollutionData).subscribe({
        next: (response) => {
          this.pollutionForm.reset();
          this.pollutionCreated.emit();
        },
        error: (err) => {
          console.error('Erreur lors de l\'ajout de la pollution', err);
          this.errorMessage.set('Une erreur est survenue lors de l\'ajout de la pollution.');
        }
      });
    } else {
      this.pollutionForm.markAllAsTouched();
    }
  }

  onCancel(): void {
    this.cancel.emit();
  }
}

