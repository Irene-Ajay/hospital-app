import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'statusColor',
  standalone: true
})
export class StatusColorPipe implements PipeTransform {
  transform(status: string): string {
    const colors: Record<string, string> = {
      confirmed: '#4caf50',
      pending: '#ff9800',
      cancelled: '#f44336',
      completed: '#2196f3'
    };
    return colors[status] || '#9e9e9e';
  }
}