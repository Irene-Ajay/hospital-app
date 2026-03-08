export interface Patient {
  id: number;
  name: string;
  email: string;
  password?: string;
  phone: string;
  dob: string;
  bloodGroup: string;
  medicalHistory: string[];
}