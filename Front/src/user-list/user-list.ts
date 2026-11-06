import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SignupService } from '../services/Signup/signupService';
import type { UserData } from '../types/types';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './user-list.html',
  styleUrl: './user-list.scss',
})
export class UserList implements OnInit {
  private signupService = inject(SignupService);

  users = signal<UserData[]>([]);
  loading = signal<boolean>(true);
  errorMessage = signal<string>('');

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this.loading.set(true);
    this.signupService.getUsers().subscribe({
      next: (data) => {
        this.users.set(data || []);
        this.loading.set(false);
      },
      error: (err) => {
        console.error('Erreur chargement utilisateurs', err);
        this.errorMessage.set('Impossible de charger les utilisateurs.');
        this.loading.set(false);
      }
    });
  }

  deleteUser(id?: number): void {
    if (!id) return;

    this.signupService.deleteUser(id).subscribe({
      next: () => {
        this.users.update((current) => current.filter((u) => u.id !== id));
      },
      error: (err) => {
        console.error('Erreur suppression utilisateur', err);
        this.errorMessage.set("Erreur lors de la suppression de l'utilisateur.");
      }
    });
  }
}

