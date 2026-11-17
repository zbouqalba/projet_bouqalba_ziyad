import {
  ChangeDetectionStrategy,
  Component,
  computed,
  DestroyRef,
  EventEmitter,
  inject,
  Input,
  OnInit,
  Output,
  signal,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { EMPTY, switchMap } from 'rxjs';
import { PollutionService } from '../services/Pollution/pollution-service';
import { PollutionLevelPipe } from '../pipes/pollution-level.pipe';
import { HighlightPollutionDirective } from '../directives/highlight-pollution.directive';
import type { PollutionData } from '../types/types';

@Component({
  selector: 'app-pollution-recap',
  standalone: true,
  imports: [CommonModule, PollutionLevelPipe, HighlightPollutionDirective],
  templateUrl: './pollution-recap.html',
  styleUrl: './pollution-recap.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PollutionRecap implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private pollutionService = inject(PollutionService);
  private destroyRef = inject(DestroyRef);

  private inputData = signal<PollutionData | null>(null);
  private routeData = signal<PollutionData | null>(null);

  @Input()
  set data(value: PollutionData | null | undefined) {
    this.inputData.set(value ?? null);
  }

  readonly pollution = computed(() => this.inputData() ?? this.routeData());

  @Output() backToList = new EventEmitter<void>();

  ngOnInit(): void {
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
          return this.pollutionService.readPollution(id);
        }),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe({
        next: (pollutionData) => {
          this.routeData.set(pollutionData);
        },
        error: (err) => {
          console.error('Erreur lors de la récupération des détails de la pollution', err);
        },
      });
  }

  onBackToList(): void {
    this.backToList.emit();
    this.router.navigate(['/pollutions']);
  }
}
