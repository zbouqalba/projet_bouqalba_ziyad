import { Component, Input } from '@angular/core';
import { PollutionData } from '../pollution-form/pollution-form';
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
}
