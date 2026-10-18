import { Component, EventEmitter, Input, Output } from '@angular/core';

export interface UserData {
  login: string;
  firstName: string;
  lastName: string;
  email: string;
}

@Component({
  selector: 'app-bienvenue',
  standalone: true,
  templateUrl: './bienvenue.html',
  styleUrl: './bienvenue.scss',
})
export class Bienvenue {
  @Input({ required: true }) data!: UserData;
  @Output() continue = new EventEmitter<void>();

  onBienvenueClick(): void {
    this.continue.emit();
  }
}
