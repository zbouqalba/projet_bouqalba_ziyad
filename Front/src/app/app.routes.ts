import { Routes } from '@angular/router';
import { authGuard, authMatchGuard, guestGuard } from '../guards/auth.guard';

export const routes: Routes = [
  { path: '', redirectTo: 'pollutions', pathMatch: 'full' },
  {
    path: 'signup',
    canActivate: [guestGuard],
    loadComponent: () =>
      import('../signup-form/signup-form').then((m) => m.SignupForm),
  },
  {
    path: 'bienvenue',
    canActivate: [authGuard],
    loadComponent: () =>
      import('../bienvenue/bienvenue').then((m) => m.Bienvenue),
  },
  {
    path: 'pollutions',
    canActivate: [authGuard],
    canMatch: [authMatchGuard],
    loadChildren: () =>
      import('../pollution.routes').then((m) => m.POLLUTION_ROUTES),
  },
  {
    path: 'users',
    canActivate: [authGuard],
    loadComponent: () =>
      import('../user-list/user-list').then((m) => m.UserList),
  },
  { path: '**', redirectTo: 'pollutions' },
];
