import { Component, Output, EventEmitter } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

export interface PollutionData {
  title: string;
  typePollution: string;
  description: string;
  date: string;
  lieu: string;
  latitude: string;
  longitude: string;
  photo: string;
}

@Component({
  selector: 'app-pollution-form',
  imports: [ReactiveFormsModule],
  templateUrl: './pollution-form.html',
  styleUrl: './pollution-form.scss',
})
export class PollutionForm {
  @Output() showPollutionRecap = new EventEmitter<PollutionData>();

  pollutionForm = new FormGroup({
    title: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    typePollution: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    description: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    date: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    lieu: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    latitude: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    longitude: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    photo: new FormControl('', { nonNullable: true }),
  });

  onSubmit() {
    if (this.pollutionForm.valid) {
      this.showPollutionRecap.emit(this.pollutionForm.getRawValue());
      this.pollutionForm.reset();
    }
  }
}

