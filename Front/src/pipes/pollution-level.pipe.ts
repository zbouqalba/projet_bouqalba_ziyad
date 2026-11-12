import { Pipe, PipeTransform } from '@angular/core';

export type PollutionStatus = 'Faible' | 'Modérée' | 'Élevée' | 'Dangereuse';

@Pipe({
  name: 'pollutionLevel',
  standalone: true,
})
export class PollutionLevelPipe implements PipeTransform {
  transform(value: number | null | undefined): PollutionStatus {
    const level = Number(value ?? 0);

    if (level <= 20) {
      return 'Faible';
    }
    if (level <= 50) {
      return 'Modérée';
    }
    if (level <= 100) {
      return 'Élevée';
    }
    return 'Dangereuse';
  }
}

