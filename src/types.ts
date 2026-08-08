export type UserRole = 'patient' | 'admin';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  phone?: string;
  age?: number;
  gender?: string;
  bloodType?: string;
  dob?: string;
  address?: string;
  medicalId?: string;
  insuranceProvider?: string;
  insurancePolicyNo?: string;
  emergencyContact?: string;
  createdAt: string;
}

export interface Vitals {
  bloodPressure?: string;
  heartRate?: number;
  temperature?: string;
  oxygenLevel?: number;
  glucose?: number;
  weight?: string;
}

export interface Prescription {
  medicine: string;
  dosage: string;
  frequency: string;
  duration: string;
  instructions: string;
}

export interface LabResultItem {
  testName: string;
  value: string;
  unit: string;
  referenceRange: string;
  flag?: 'Normal' | 'High' | 'Low';
}

export interface PatientRecord {
  id: string;
  patientId: string;
  patientName: string;
  doctorName: string;
  departmentName: string;
  recordType: 'Lab Test' | 'Prescription' | 'Diagnostic Scan' | 'Discharge Summary' | 'Consultation Note' | 'Vitals Assessment';
  title: string;
  date: string;
  status: 'Finalized' | 'Pending Review' | 'Completed';
  summary: string;
  details: string;
  vitals?: Vitals;
  prescriptions?: Prescription[];
  labResults?: LabResultItem[];
  fileUrl?: string;
}

export interface Department {
  id: string;
  name: string;
  slug: string;
  tagline: string;
  description: string;
  headDoctor: string;
  doctorsCount: number;
  icon: string;
  image: string;
  services: string[];
  roomNumbers?: string;
  contactPhone?: string;
}

export interface Doctor {
  id: string;
  name: string;
  departmentId: string;
  departmentName: string;
  title: string;
  qualification: string;
  experience: string;
  rating: number;
  availableDays: string[];
  timeSlot: string;
  image: string;
  bio: string;
  consultationFee: number;
}

export interface Appointment {
  id: string;
  patientId: string;
  patientName: string;
  patientEmail: string;
  patientPhone: string;
  doctorId: string;
  doctorName: string;
  departmentName: string;
  date: string;
  time: string;
  reason: string;
  status: 'Confirmed' | 'Pending' | 'Completed' | 'Cancelled';
  notes?: string;
  createdAt: string;
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  phone: string;
  department?: string;
  subject: string;
  message: string;
  date: string;
  status: 'Unread' | 'Read' | 'Replied';
}

export interface HospitalStats {
  totalPatients: number;
  specialistDoctors: number;
  departmentCount: number;
  surgeriesCompleted: number;
  emergencyUnits: number;
  customerSatisfaction: number;
}
