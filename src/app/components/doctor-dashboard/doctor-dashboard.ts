import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { AppointmentService } from '../../services/appointment';
import { AuthService } from '../../services/auth';
import { Appointment } from '../../models/appointment.model';
import { StatusColorPipe } from '../../pipes/status-color-pipe';

@Component({
  selector: 'app-doctor-dashboard',
  standalone: true,
  imports: [
    CommonModule, MatTableModule, MatButtonModule,
    MatIconModule, MatSnackBarModule, MatCardModule, StatusColorPipe
  ],
  templateUrl: './doctor-dashboard.html',
  styleUrls: ['./doctor-dashboard.css']
})
export class DoctorDashboardComponent implements OnInit {
  appointments: Appointment[] = [];
  displayedColumns = ['patient', 'date', 'time', 'notes', 'status', 'actions'];
  totalAppointments = 0;
  pendingAppointments = 0;
  confirmedAppointments = 0;
  completedAppointments = 0;

  constructor(
    private appointmentService: AppointmentService,
    private authService: AuthService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    const user = this.authService.currentUser;
    if (user?.role === 'doctor') {
      this.appointmentService.getByDoctor(user.id).subscribe(data => {
        this.appointments = data;
        this.calculateStats();
      });
    } else {
      this.appointmentService.getAppointments().subscribe(data => {
        this.appointments = data;
        this.calculateStats();
      });
    }
  }

  calculateStats(): void {
    this.totalAppointments = this.appointments.length;
    this.pendingAppointments = this.appointments.filter(a => a.status === 'pending').length;
    this.confirmedAppointments = this.appointments.filter(a => a.status === 'confirmed').length;
    this.completedAppointments = this.appointments.filter(a => a.status === 'completed').length;
  }

  updateStatus(id: string, status: string): void {
    this.appointmentService.updateStatus(id, status).subscribe(() => {
      this.appointments = this.appointments.map(a =>
        a.id === id ? { ...a, status: status as any } : a
      );
      this.calculateStats();
      this.snackBar.open(`Appointment ${status}`, 'Close', { duration: 2000 });
    });
  }
}