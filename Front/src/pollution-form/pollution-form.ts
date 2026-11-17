import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  EventEmitter,
  inject,
  Input,
  OnChanges,
  OnInit,
  Output,
  signal,
} from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { EMPTY, switchMap } from 'rxjs';
import type { PollutionData } from '../types/types';
import { PollutionService } from '../services/Pollution/pollution-service';
import type { CanComponentDeactivate } from '../guards/unsaved-changes.guard';

@Component({
  selector: 'app-pollution-form',
  imports: [ReactiveFormsModule],
  templateUrl: './pollution-form.html',
  styleUrl: './pollution-form.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PollutionForm implements OnInit, OnChanges, CanComponentDeactivate {
  @Input() isEdit: boolean = false;
  @Input() pollution: PollutionData | null = null;

  @Output() pollutionCreated = new EventEmitter<void>();
  @Output() cancel = new EventEmitter<void>();

  private pollutionService = inject(PollutionService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private destroyRef = inject(DestroyRef);

  errorMessage = signal<string>('');
  private isSubmitted = signal<boolean>(false);

  today = new Date().toISOString().split('T')[0];

  pollutionForm = new FormGroup({
    title: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.minLength(3), Validators.maxLength(100)],
    }),
    typePollution: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    description: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.minLength(10)],
    }),
    date: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    lieu: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    latitude: new FormControl(0, {
      nonNullable: true,
      validators: [Validators.required, Validators.min(-90), Validators.max(90)],
    }),
    longitude: new FormControl(0, {
      nonNullable: true,
      validators: [Validators.required, Validators.min(-180), Validators.max(180)],
    }),
    niveau: new FormControl(0, {
      nonNullable: true,
      validators: [Validators.required, Validators.min(0)],
    }),
    photo: new FormControl<string | null>(null),
  });

  ngOnInit(): void {
    this.fillFormIfEdit();

    this.route.paramMap
      .pipe(
        switchMap((params) => {
          const idParam = params.get('id');
          if (!idParam) {
            return EMPTY;
          }
          const id = Number(idParam);
          if (Number.isNaN(id)) {
            return EMPTY;
          }
          this.isEdit = true;
          return this.pollutionService.readPollution(id);
        }),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe({
        next: (data) => {
          this.pollution = data;
          this.fillFormIfEdit();
        },
        error: (err) => {
          console.error('Erreur lors de la récupération de la pollution à modifier', err);
          this.errorMessage.set('Impossible de charger les données de cette pollution.');
        },
      });
  }

  ngOnChanges(): void {
    this.fillFormIfEdit();
  }

  private fillFormIfEdit(): void {
    if (this.isEdit && this.pollution) {
      this.pollutionForm.patchValue(this.pollution);
      this.pollutionForm.markAsPristine();
    }
  }

  canDeactivate(): boolean {
    if (this.pollutionForm.dirty && !this.isSubmitted()) {
      return window.confirm(
        'Vous avez des modifications non enregistrées. Voulez-vous vraiment quitter cette page ?'
      );
    }
    return true;
  }

  onSubmit(): void {
    if (this.pollutionForm.valid) {
      const rawValue = this.pollutionForm.getRawValue();

      if (this.isEdit && this.pollution) {
        const id = this.pollution.id;
        const pollutionData: PollutionData = {
          ...rawValue,
          id,
        };

        this.pollutionService.updatePollution(id, pollutionData).subscribe({
          next: () => {
            this.isSubmitted.set(true);
            this.pollutionForm.reset();
            this.pollutionCreated.emit();
            this.router.navigate(['/pollutions']);
          },
          error: (err) => {
            console.error('Erreur lors de la modification de la pollution', err);
            this.errorMessage.set(
              'Une erreur est survenue lors de la modification de la pollution.'
            );
          },
        });
      } else {
        this.pollutionService.createPollution(rawValue).subscribe({
          next: () => {
            this.isSubmitted.set(true);
            this.pollutionForm.reset();
            this.pollutionCreated.emit();
            this.router.navigate(['/pollutions']);
          },
          error: (err) => {
            console.error("Erreur lors de l'ajout de la pollution", err);
            this.errorMessage.set("Une erreur est survenue lors de l'ajout de la pollution.");
          },
        });
      }
    } else {
      this.pollutionForm.markAllAsTouched();
    }
  }

  onCancel(): void {
    this.cancel.emit();
    this.router.navigate(['/pollutions']);
  }
}
