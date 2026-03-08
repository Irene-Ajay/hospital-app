import { Pipe, PipeTransform } from '@angular/core';
import { Doctor } from '../models/doctor.model';

@Pipe({
  name: 'filterDoctor',
  standalone: true
})
export class FilterDoctorPipe implements PipeTransform {
  transform(doctors: Doctor[], specialization: string): Doctor[] {
    if (!specialization || specialization === 'All') return doctors;
    return doctors.filter(d => d.specialization === specialization);
  }
}