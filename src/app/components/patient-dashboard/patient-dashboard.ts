import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { AuthService } from '../../services/auth';
import { AppointmentService } from '../../services/appointment';
import { PatientService } from '../../services/patient';
import { Appointment } from '../../models/appointment.model';
import { Patient } from '../../models/patient.model';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog';
import { StatusColorPipe } from '../../pipes/status-color-pipe';

@Component({
  selector: 'app-patient-dashboard',
  standalone: true,
  imports: [
    CommonModule, RouterLink, MatCardModule, MatTableModule, MatButtonModule,
    MatIconModule, MatChipsModule, MatDialogModule, MatSnackBarModule,
    MatTooltipModule, StatusColorPipe
  ],
  templateUrl: './patient-dashboard.html',
  styleUrls: ['./patient-dashboard.css']
})
export class PatientDashboardComponent implements OnInit {
  appointments: Appointment[] = [];
  patient: Patient | null = null;
  displayedColumns = ['doctor', 'specialization', 'date', 'time', 'status', 'fee', 'actions'];
  isReceptionist = false;

  constructor(
    private authService: AuthService,
    private appointmentService: AppointmentService,
    private patientService: PatientService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    const user = this.authService.currentUser;
    if (!user) return;
    this.isReceptionist = user.role === 'receptionist';
    if (this.isReceptionist) {
      this.appointmentService.getAppointments().subscribe(data => this.appointments = data);
      // No patient profile for receptionist
    } else {
      this.appointmentService.getByPatient(user.id).subscribe(data => this.appointments = data);
      this.patientService.getPatientById(user.id).subscribe({
        next: (data) => this.patient = data,
        error: (err) => {
          console.error('Error loading patient data:', err);
          this.patient = null;
        }
      });
    }
  }

  cancelAppointment(id: string): void {
    const ref = this.dialog.open(ConfirmDialogComponent, {
      data: { message: 'Are you sure you want to cancel this appointment?' }
    });
    ref.afterClosed().subscribe(confirmed => {
      if (confirmed) {
        this.appointmentService.cancel(id).subscribe({
          next: () => {
            this.appointments = this.appointments.map(a =>
              a.id === id ? { ...a, status: 'cancelled' as const } : a
            );
            this.snackBar.open('Appointment cancelled', 'Close', { duration: 3000 });
          },
          error: (err) => {
            console.error('Error cancelling appointment:', err);
            this.snackBar.open('Error cancelling appointment', 'Close', { duration: 3000 });
          }
        });
      }
    });
  }
}