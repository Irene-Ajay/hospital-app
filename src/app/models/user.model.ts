export type UserRole = 'patient' | 'doctor' | 'receptionist';

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  role: UserRole;
}