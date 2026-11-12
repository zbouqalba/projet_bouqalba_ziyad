import { Directive, ElementRef, Input, OnChanges, Renderer2, inject } from '@angular/core';

@Directive({
  selector: '[appHighlightPollution]',
  standalone: true,
})
export class HighlightPollutionDirective implements OnChanges {
  @Input('appHighlightPollution') level: number | string | null | undefined;

  private el = inject(ElementRef<HTMLElement>);
  private renderer = inject(Renderer2);

  ngOnChanges(): void {
    const status = this.resolveStatus(this.level);
    const { bg, border } = this.getStyles(status);
    this.renderer.setStyle(this.el.nativeElement, 'backgroundColor', bg);
    this.renderer.setStyle(this.el.nativeElement, 'borderColor', border);
  }

  private resolveStatus(val: number | string | null | undefined): string {
    if (typeof val === 'string' && ['Faible', 'Modérée', 'Élevée', 'Dangereuse'].includes(val)) {
      return val;
    }
    const num = Number(val ?? 0);
    if (num <= 20) return 'Faible';
    if (num <= 50) return 'Modérée';
    if (num <= 100) return 'Élevée';
    return 'Dangereuse';
  }

  private getStyles(status: string): { bg: string; border: string } {
    switch (status) {
      case 'Faible':
        // Vert clair doux
        return { bg: '#dcfce7', border: '#86efac' };
      case 'Modérée':
        // Jaune doux
        return { bg: '#fef9c3', border: '#fde047' };
      case 'Élevée':
        // Orange doux
        return { bg: '#ffedd5', border: '#fdba74' };
      case 'Dangereuse':
        // Rouge doux
        return { bg: '#fee2e2', border: '#fca5a5' };
      default:
        return { bg: '#ffffff', border: '#e2e8f0' };
    }
  }
}
