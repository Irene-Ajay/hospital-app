export type UserRole = 'patient' | 'doctor' | 'receptionist';

export interface AuthUser {
  id: number;
  name: string;
  email: string;
  role: UserRole;
}