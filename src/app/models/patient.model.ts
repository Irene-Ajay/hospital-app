export interface Patient {
  id: string;
  name: string;
  email: string;
  password?: string;
  phone: string;
  dob: string;
  bloodGroup: string;
  medicalHistory: string[];
}