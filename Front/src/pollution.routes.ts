import { Routes } from '@angular/router';
import { unsavedChangesGuard } from './guards/unsaved-changes.guard';

export const POLLUTION_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./pollution-list/pollution-list').then((m) => m.PollutionList),
  },
  {
    path: 'new',
    canDeactivate: [unsavedChangesGuard],
    loadComponent: () =>
      import('./pollution-form/pollution-form').then((m) => m.PollutionForm),
  },
  {
    path: ':id',
    loadComponent: () =>
      import('./pollution-recap/pollution-recap').then((m) => m.PollutionRecap),
  },
  {
    path: ':id/edit',
    canDeactivate: [unsavedChangesGuard],
    loadComponent: () =>
      import('./pollution-form/pollution-form').then((m) => m.PollutionForm),
  },
];

