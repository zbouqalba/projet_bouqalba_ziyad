import { Component, computed, EventEmitter, inject, OnInit, Output, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PollutionService } from '../services/Pollution/pollution-service';
import type { PollutionData } from '../types/types';

@Component({
  selector: 'app-pollution-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pollution-list.html',
  styleUrl: './pollution-list.scss',
})
export class PollutionList implements OnInit {
  private pollutionService = inject(PollutionService);

  pollutions = signal<PollutionData[]>([]);
  searchTerm = signal<string>('');
  selectedType = signal<string>('');

  filteredPollutions = computed(() => {
    const term = this.searchTerm().trim().toLowerCase();
    const type = this.selectedType();

    return this.pollutions().filter((pollution) => {
      const matchesTerm =
        !term ||
        pollution.title.toLowerCase().includes(term) ||
        pollution.lieu.toLowerCase().includes(term) ||
        pollution.description.toLowerCase().includes(term);

      const matchesType = !type || pollution.typePollution === type;

      return matchesTerm && matchesType;
    });
  });

  @Output() addPollution = new EventEmitter<void>();
  @Output() viewDetail = new EventEmitter<number>();

  ngOnInit(): void {
    this.loadPollutions();
  }

  loadPollutions(): void {
    this.pollutionService.listPollutions().subscribe({
      next: (response: PollutionData[]) => {
        this.pollutions.set(response || []);
      },
      error: (err) => {
        console.error('Erreur lors de la récupération des pollutions', err);
      }
    });
  }

  deletePollution(id: number): void {
    this.pollutionService.deletePollution(id).subscribe({
      next: () => {
        this.pollutions.update((items) => items.filter((p) => p.id !== id));
      },
      error: (err) => {
        console.error('Erreur lors de la suppression', err);
      }
    });
  }

  onUpdate(id: number): void {
    console.log('Modifier la pollution', id);
  }

  onViewDetail(id: number): void {
    this.viewDetail.emit(id);
  }

  onAddPollution(): void {
    this.addPollution.emit();
  }

  onSearchInput(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.searchTerm.set(target.value);
  }

  onTypeChange(event: Event): void {
    const target = event.target as HTMLSelectElement;
    this.selectedType.set(target.value);
  }

  resetFilters(): void {
    this.searchTerm.set('');
    this.selectedType.set('');
  }
}
