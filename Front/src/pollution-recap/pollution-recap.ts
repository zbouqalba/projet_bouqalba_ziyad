import { Component, EventEmitter, Input, Output } from '@angular/core';
import type { PollutionData } from '../types/types';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-pollution-recap',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pollution-recap.html',
  styleUrl: './pollution-recap.scss'
})
export class PollutionRecap {
  @Input({ required: true }) data!: PollutionData;
  @Output() backToList = new EventEmitter<void>();

  onBackToList(): void {
    this.backToList.emit();
  }
}
